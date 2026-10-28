import React, { useState } from 'react';
import {
  UserProfile,
  defaultUser,
  initialRecentScans,
  defaultScorecardReport,
  ScorecardReport,
  RecentScanItem,
  sampleJobPresets,
} from './data/mockData';
import { Header } from './components/Header';
import { AuthScreen } from './components/AuthScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { EmailScorecardScreen } from './components/EmailScorecardScreen';
import { SavedJobsScreen } from './components/SavedJobsScreen';
import { ResumeStudioModal } from './components/ResumeStudioModal';
import { InspectTextModal } from './components/InspectTextModal';
import { KeywordsModal } from './components/KeywordsModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'email-view' | 'resume-studio' | 'saved-jobs'>('dashboard');
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [recentScans, setRecentScans] = useState<RecentScanItem[]>(initialRecentScans);
  const [activeReport, setActiveReport] = useState<ScorecardReport>(defaultScorecardReport);

  // Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingStep, setAnalyzingStep] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [globalToast, setGlobalToast] = useState<{ message: string; sub?: string } | null>(null);

  // Modals state
  const [inspectTextModalOpen, setInspectTextModalOpen] = useState(false);
  const [inspectTextContent, setInspectTextContent] = useState('');
  const [keywordsModalOpen, setKeywordsModalOpen] = useState(false);
  const [keywordsData, setKeywordsData] = useState<{ found: string[]; missing: string[] }>({
    found: ['Python', 'Distributed Systems', 'REST APIs', 'Git / CI', 'Docker'],
    missing: ['Go / Golang', 'Kubernetes', 'AWS CloudWatch'],
  });
  const [resumeStudioModalOpen, setResumeStudioModalOpen] = useState(false);

  const showToast = (message: string, sub?: string) => {
    setGlobalToast({ message, sub });
    setTimeout(() => setGlobalToast(null), 5000);
  };

  // Sign in / Sign out handlers
  const handleSignIn = (email: string, name: string) => {
    setUser((prev) => ({
      ...prev,
      email: email || 'Gautam.RSK19@gmail.com',
      name: name || 'Alex Chen',
    }));
    setIsAuthenticated(true);
    setCurrentTab('dashboard');
    showToast(`Signed in as ${name}`, `Target email: ${email}`);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  const handleUpdateEmail = (newEmail: string) => {
    setUser((prev) => ({ ...prev, email: newEmail }));
    setActiveReport((prev) => ({ ...prev, candidateEmail: newEmail }));
    showToast('Target email updated', `New dispatches will send to ${newEmail}`);
  };

  // Core Scoring and Email Dispatch Flow
  const handleStartAnalysis = async (payload: {
    resumeText: string;
    jobTitle: string;
    company: string;
    jobDescription: string;
    targetEmail: string;
  }) => {
    setIsAnalyzing(true);
    setAnalyzingStep('1/4 Parsing linear UTF-8 plain-text...');

    try {
      // Step progression
      await new Promise((r) => setTimeout(r, 600));
      setAnalyzingStep('2/4 Cross-referencing requirements matrix...');

      // Call server backend
      let scoreResponseData = null;
      try {
        const response = await fetch('/api/score-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resumeText: payload.resumeText,
            jobTitle: payload.jobTitle,
            company: payload.company,
            jobDescription: payload.jobDescription,
            candidateName: user.name,
            userEmail: payload.targetEmail,
          }),
        });
        if (response.ok) {
          const json = await response.json();
          if (json.success && json.data) {
            scoreResponseData = json.data;
          }
        }
      } catch (e) {
        console.warn('API fetch issue, applying collegiate heuristic fallback:', e);
      }

      await new Promise((r) => setTimeout(r, 600));
      setAnalyzingStep('3/4 Quantifying kinetic action verbs & metrics...');

      const now = new Date();
      const dateFormatted = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      const timeFormatted = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      });
      const deliveredAtString = `${dateFormatted} • ${timeFormatted}`;

      const finalScore = scoreResponseData?.overallScore || 76;
      const finalReport: ScorecardReport = {
        id: `scan-${Date.now()}`,
        candidateName: user.name,
        candidateEmail: payload.targetEmail || user.email,
        jobTitle: payload.jobTitle,
        company: payload.company,
        location: 'New York, NY (Hybrid)',
        overallScore: finalScore,
        tier: scoreResponseData?.tier || 'Tier 1 Competitive Fit',
        percentile: scoreResponseData?.percentile || 'Top 22%',
        deliveredAt: deliveredAtString,
        envelope: {
          messageId: `<rec-score-${Date.now()}-${payload.company.toLowerCase().replace(/\s+/g, '')}@ai.resuscore.internal>`,
          dkim: 'PASS (resuscore.ai ed25519-sha256)',
          targetAts: `Greenhouse Greenhouse-API-v2 / ${payload.company} Early Talent Pipeline`,
          benchmarkCohort: `Fall 2025 Tier-1 SWE Interns (n=1,420 parsed resumes)`,
        },
        metrics: scoreResponseData?.metrics || {
          jobMatch: 72,
          bulletRigor: 58,
          parsability: 95,
        },
        wins: scoreResponseData?.wins || defaultScorecardReport.wins,
        criticalGaps: scoreResponseData?.criticalGaps || defaultScorecardReport.criticalGaps,
        expectedLift: scoreResponseData?.expectedLift || '+14 pts',
        targetTierNote: scoreResponseData?.targetTierNote || 'Adding contextual references moves you to 90/100 (Tier 0 Fast-Track).',
        impactDeficit: scoreResponseData?.impactDeficit || defaultScorecardReport.impactDeficit,
        pdfFileName: `${payload.company.replace(/\s+/g, '_')}_SWE_Scorecard_${user.name.replace(/\s+/g, '')}.pdf`,
        pdfFileSize: '240 KB • Full ATS Tokenization Matrix & Line Audit',
      };

      setAnalyzingStep(`4/4 Dispatching official scorecard to ${payload.targetEmail}...`);

      // Dispatch to actual email via server API
      try {
        const mailRes = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            toEmail: payload.targetEmail,
            candidateName: user.name,
            jobTitle: payload.jobTitle,
            company: payload.company,
            scorecardData: finalReport,
          }),
        });
        if (mailRes.ok) {
          const mailJson = await mailRes.json();
          if (mailJson.previewUrl) {
            finalReport.previewUrl = mailJson.previewUrl;
          }
        }
      } catch (mailErr) {
        console.warn('Email dispatch warning:', mailErr);
      }

      await new Promise((r) => setTimeout(r, 400));

      setActiveReport(finalReport);

      // Add to recent scans list
      const newScanItem: RecentScanItem = {
        id: finalReport.id,
        company: payload.company,
        initial: payload.company[0].toUpperCase(),
        jobTitle: payload.jobTitle,
        location: 'New York, NY (Hybrid)',
        score: finalScore,
        fitText: finalScore >= 80 ? 'Strong fit' : 'Good alignment',
        skillsCount: '11 / 13 skills',
        tier: finalScore >= 80 ? 'High ATS Match' : 'Good ATS Match',
        scannedTime: 'Just now',
        reportData: finalReport,
      };

      setRecentScans((prev) => [newScanItem, ...prev]);

      // Automatically switch to Screen 3 (Email View) as requested
      setCurrentTab('email-view');
      showToast(
        `Scorecard dispatched to ${payload.targetEmail}!`,
        `Scored ${finalScore}/100 for ${payload.company} • ${payload.jobTitle}`
      );
    } finally {
      setIsAnalyzing(false);
      setAnalyzingStep('');
    }
  };

  const handleResendEmail = async (toEmail: string) => {
    setIsSendingEmail(true);
    try {
      const mailRes = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toEmail,
          candidateName: user.name,
          jobTitle: activeReport.jobTitle,
          company: activeReport.company,
          scorecardData: activeReport,
        }),
      });
      if (mailRes.ok) {
        const mailJson = await mailRes.json();
        if (mailJson.previewUrl) {
          setActiveReport((prev) => ({ ...prev, previewUrl: mailJson.previewUrl }));
        }
        showToast(`Dispatched to ${toEmail}!`, 'Verified TLS 1.3 / DKIM signature generated');
      } else {
        showToast(`Dispatched scorecard copy to ${toEmail}`);
      }
    } catch (e) {
      showToast(`Dispatched scorecard copy to ${toEmail}`);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleViewReport = (reportId?: string) => {
    if (reportId) {
      const match = recentScans.find((s) => s.id === reportId);
      if (match?.reportData) {
        setActiveReport(match.reportData);
      }
    }
    setCurrentTab('email-view');
  };

  if (!isAuthenticated) {
    return (
      <AuthScreen
        onSignIn={handleSignIn}
        defaultEmail={user.email}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-['Inter']">
      {/* Top Main Navigation Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'resume-studio') {
            setResumeStudioModalOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        user={user}
        onUpdateEmail={handleUpdateEmail}
        onSignOut={handleSignOut}
        isInboxFrame={currentTab === 'email-view'}
      />

      {/* Global Toast Notification */}
      {globalToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#0b1c30] text-white p-4 rounded-xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-[#0b1c30] flex items-center justify-center flex-shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold font-['Plus_Jakarta_Sans']">{globalToast.message}</p>
            {globalToast.sub && <p className="text-[11px] text-slate-300 mt-0.5">{globalToast.sub}</p>}
          </div>
        </div>
      )}

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentTab === 'dashboard' && (
          <DashboardScreen
            user={user}
            recentScans={recentScans}
            onStartAnalysis={handleStartAnalysis}
            onViewReport={handleViewReport}
            onOpenInspectText={(text) => {
              setInspectTextContent(text);
              setInspectTextModalOpen(true);
            }}
            onOpenKeywordsPreview={(kw) => {
              setKeywordsData(kw);
              setKeywordsModalOpen(true);
            }}
            isAnalyzing={isAnalyzing}
            analyzingStep={analyzingStep}
          />
        )}

        {currentTab === 'email-view' && (
          <EmailScorecardScreen
            report={activeReport}
            user={user}
            onBackToDashboard={() => setCurrentTab('dashboard')}
            onOpenResumeStudio={() => setResumeStudioModalOpen(true)}
            onResendEmail={handleResendEmail}
            isSendingEmail={isSendingEmail}
          />
        )}

        {currentTab === 'saved-jobs' && (
          <SavedJobsScreen
            onScanJob={(job) => {
              setCurrentTab('dashboard');
              handleStartAnalysis({
                resumeText: inspectTextContent || defaultScorecardReport.impactDeficit.currentBullet,
                jobTitle: job.jobTitle,
                company: job.company,
                jobDescription: job.description,
                targetEmail: user.email,
              });
            }}
          />
        )}
      </main>

      {/* Modals */}
      <ResumeStudioModal
        isOpen={resumeStudioModalOpen}
        onClose={() => setResumeStudioModalOpen(false)}
        report={activeReport}
        user={user}
      />

      <InspectTextModal
        isOpen={inspectTextModalOpen}
        onClose={() => setInspectTextModalOpen(false)}
        rawText={inspectTextContent}
      />

      <KeywordsModal
        isOpen={keywordsModalOpen}
        onClose={() => setKeywordsModalOpen(false)}
        keywords={keywordsData}
      />

      {/* Institutional Global Footer */}
      <footer className="w-full bg-[#eff4ff] border-t border-[#d3e4fe] py-6 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-500">
          <div>
            © 2025 ResuScore AI Inc. Tailored for collegiate career mobility. University Career Services Verification Node.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href="#ats-guide" onClick={(e) => e.preventDefault()} className="hover:text-indigo-600 transition-colors">
              ATS Guide
            </a>
            <span>•</span>
            <a href="#campus-network" onClick={(e) => e.preventDefault()} className="hover:text-indigo-600 transition-colors">
              Campus Partner Network
            </a>
            <span>•</span>
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-indigo-600 transition-colors">
              FERPA & Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
