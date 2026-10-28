import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { analyzeResume } from '../services/aiService.js';
import { sendResumeAnalysisEmail } from '../services/emailService.js';

const router = Router();

router.get('/history', async (req, res) => {
  try {
    const email = typeof req.query.email === 'string' ? req.query.email.trim().toLowerCase() : '';

    const runs = await prisma.analysisRun.findMany({
      where: email
        ? {
            user: {
              email,
            },
          }
        : {},
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: { user: true },
    });

    const history = runs.map((run) => ({
      id: run.id,
      fileName: run.fileName,
      targetRole: run.targetRole,
      overallScore: run.overallScore,
      atsCompatibility: run.atsCompatibility,
      impactMetrics: run.impactMetrics,
      skillsAlignment: run.skillsAlignment,
      brevityStructure: run.brevityStructure,
      summary: run.summary,
      priorityFixes: run.priorityFixes ? run.priorityFixes.split('\n') : [],
      estimatedUplift: run.estimatedUplift,
      createdAt: run.createdAt,
      email: run.user?.email ?? email,
    }));

    return res.json({ history });
  } catch (error) {
    console.error('History fetch failed:', error);
    return res.status(500).json({
      message: 'History fetch failed.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

router.post('/analyze', async (req, res) => {
  const { resumeText, targetRole, fileName, email } = req.body || {};

  if (typeof resumeText !== 'string' || resumeText.trim().length < 20) {
    return res.status(400).json({
      message: 'A resumeText string with at least 20 characters is required.',
    });
  }

  try {
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : null;
    const resolvedTargetRole = typeof targetRole === 'string' ? targetRole : 'Software Engineer';
    const resolvedFileName = typeof fileName === 'string' ? fileName : 'resume.txt';

    const result = await analyzeResume({
      resumeText,
      targetRole: resolvedTargetRole,
      fileName: resolvedFileName,
    });

    const user = normalizedEmail
      ? await prisma.user.upsert({
          where: { email: normalizedEmail },
          update: {},
          create: { email: normalizedEmail },
        })
      : null;

    const savedRun = await prisma.analysisRun.create({
      data: {
        userId: user?.id ?? null,
        fileName: resolvedFileName,
        targetRole: resolvedTargetRole,
        overallScore: result.overallScore,
        atsCompatibility: result.atsCompatibility,
        impactMetrics: result.impactMetrics,
        skillsAlignment: result.skillsAlignment,
        brevityStructure: result.brevityStructure,
        summary: result.summary,
        priorityFixes: result.priorityFixes.join('\n'),
        estimatedUplift: result.estimatedUplift,
      },
    });

    if (normalizedEmail) {
      await sendResumeAnalysisEmail({
        to: normalizedEmail,
        fileName: resolvedFileName,
        targetRole: resolvedTargetRole,
        overallScore: result.overallScore,
        atsCompatibility: result.atsCompatibility,
        impactMetrics: result.impactMetrics,
        skillsAlignment: result.skillsAlignment,
        brevityStructure: result.brevityStructure,
        summary: result.summary,
        priorityFixes: result.priorityFixes,
        estimatedUplift: result.estimatedUplift,
      }).catch((error) => {
        console.warn('Email delivery was skipped:', error);
      });
    }

    return res.json({
      success: true,
      analysis: {
        id: savedRun.id,
        ...result,
      },
    });
  } catch (error) {
    console.error('Resume analysis failed:', error);
    return res.status(500).json({
      message: 'Resume analysis failed.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
