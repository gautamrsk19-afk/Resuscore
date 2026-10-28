import nodemailer from 'nodemailer';

export type ResumeEmailPayload = {
  to: string;
  fileName: string;
  targetRole: string;
  overallScore: number;
  atsCompatibility: number;
  impactMetrics: number;
  skillsAlignment: number;
  brevityStructure: number;
  summary: string;
  priorityFixes: string[];
  estimatedUplift: string;
};

function buildEmailHtml(payload: ResumeEmailPayload): string {
  const positives = [
    `Overall score: ${payload.overallScore}/100`,
    `ATS compatibility: ${payload.atsCompatibility}%`,
    `Skills alignment: ${payload.skillsAlignment}%`,
    `Impact & metrics: ${payload.impactMetrics}%`,
    `Brevity & structure: ${payload.brevityStructure}%`,
  ];

  const improvements = payload.priorityFixes.length
    ? payload.priorityFixes
        .map((item, index) => `<li style="margin-bottom: 10px;">${index + 1}. ${item}</li>`)
        .join('')
    : '<li>Continue tightening bullet wording and keyword alignment.</li>';

  return `
    <div style="font-family: Arial, sans-serif; background: #f5f7f5; padding: 24px; color: #14231e;">
      <div style="max-width: 700px; margin: 0 auto; background: white; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #103b32; padding: 24px 28px; color: white;">
          <div style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase; opacity: 0.9;">ResuScore</div>
          <h1 style="margin: 10px 0 0; font-size: 28px;">Resume Analysis Report</h1>
        </div>

        <div style="padding: 28px;">
          <p style="margin: 0 0 16px; font-size: 16px;">Hi,</p>
          <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6;">
            Your resume <strong>${payload.fileName}</strong> for the role <strong>${payload.targetRole}</strong> was analyzed successfully.
          </p>

          <div style="padding: 16px 18px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; margin-bottom: 22px;">
            <div style="font-size: 12px; letter-spacing: 1.4px; text-transform: uppercase; color: #065f46; margin-bottom: 8px;">Overall score</div>
            <div style="font-size: 36px; font-weight: bold; color: #065f46;">${payload.overallScore}/100</div>
            <div style="margin-top: 8px; color: #065f46; font-size: 14px;">Estimated uplift: <strong>${payload.estimatedUplift}</strong></div>
          </div>

          <div style="margin-bottom: 24px;">
            <h2 style="margin: 0 0 12px; font-size: 18px; color: #14231e;">What looks good</h2>
            <ul style="margin: 0; padding-left: 18px; color: #334155; line-height: 1.7;">
              ${positives.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 24px;">
            <h2 style="margin: 0 0 12px; font-size: 18px; color: #14231e;">What needs improvement</h2>
            <ul style="margin: 0; padding-left: 18px; color: #334155; line-height: 1.7;">
              ${improvements}
            </ul>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px 18px;">
            <h2 style="margin: 0 0 10px; font-size: 18px; color: #14231e;">Summary</h2>
            <p style="margin: 0; color: #475569; line-height: 1.7;">${payload.summary}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function sendResumeAnalysisEmail(payload: ResumeEmailPayload): Promise<{ delivered: boolean; messageId?: string; reason?: string }> {
  const enabled = (process.env.EMAIL_ENABLED || '').toLowerCase() === 'true';
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS?.trim();

  const missingConfig: string[] = [];

  if (!enabled) missingConfig.push('EMAIL_ENABLED');
  if (!smtpHost) missingConfig.push('SMTP_HOST');
  if (!smtpUser) missingConfig.push('SMTP_USER');
  if (!smtpPass) missingConfig.push('SMTP_PASS');

  if (missingConfig.length > 0) {
    const reason = missingConfig.includes('SMTP_PASS')
      ? 'missing_gmail_app_password'
      : 'missing_smtp_config';

    console.info(
      'Email delivery skipped: %s. For Gmail, SMTP_PASS must contain your 16-character App Password, not the normal account password.',
      missingConfig.join(', ')
    );

    return { delivered: false, reason };
  }

  const normalizedSmtpUser = smtpUser?.toLowerCase() ?? '';

  if (normalizedSmtpUser.endsWith('@gmail.com') && smtpPass && smtpPass.length < 10) {
    console.warn('Gmail SMTP is configured with an unusually short SMTP_PASS value. Use a Gmail App Password generated in Google Account > Security.');
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT || 587),
      secure: (process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: (process.env.SMTP_TLS_REJECT_UNAUTHORIZED || 'true').toLowerCase() !== 'false',
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || smtpUser,
      to: payload.to,
      subject: `ResuScore: ${payload.overallScore}/100 score for ${payload.fileName}`,
      text: [
        `Resume Analysis Report for ${payload.fileName}`,
        '',
        `Overall score: ${payload.overallScore}/100`,
        `Estimated uplift: ${payload.estimatedUplift}`,
        '',
        'What looks good:',
        `- ATS compatibility: ${payload.atsCompatibility}%`,
        `- Skills alignment: ${payload.skillsAlignment}%`,
        `- Impact & metrics: ${payload.impactMetrics}%`,
        `- Brevity & structure: ${payload.brevityStructure}%`,
        '',
        'What needs improvement:',
        ...payload.priorityFixes.map((item, index) => `${index + 1}. ${item}`),
        '',
        'Summary:',
        payload.summary,
      ].join('\n'),
      html: buildEmailHtml(payload),
    });

    return { delivered: true, messageId: info.messageId };
  } catch (error) {
    console.error('Resume analysis email delivery failed:', error);
    return {
      delivered: false,
      reason: error instanceof Error ? error.message : 'unknown_error',
    };
  }
}
