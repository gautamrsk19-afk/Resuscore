import React, { useState } from 'react';
import { ScorecardReport, UserProfile } from '../data/mockData';
import {
  ArrowLeft,
  Info,
  Printer,
  SlidersHorizontal,
  Mail,
  CheckCircle,
  Copy,
  Download,
  ShieldAlert,
  ArrowDown,
  Sparkles,
  ExternalLink,
  Send,
  Check,
} from 'lucide-react';

interface EmailScorecardScreenProps {
  report: ScorecardReport;
  user: UserProfile;
  onBackToDashboard: () => void;
  onOpenResumeStudio: () => void;
  onResendEmail: (toEmail: string) => Promise<void>;
  isSendingEmail?: boolean;
}

export const EmailScorecardScreen: React.FC<EmailScorecardScreenProps> = ({
  report,
  user,
  onBackToDashboard,
  onOpenResumeStudio,
  onResendEmail,
  isSendingEmail = false,
}) => {
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [copiedBullet, setCopiedBullet] = useState(false);
  const [sendSuccessToast, setSendSuccessToast] = useState(false);

  const overallScore = report.overallScore || 76;
  const circumference = 2 * Math.PI * 50; // ~314.159
  const strokeDashoffset = circumference * (1 - overallScore / 100);

  const handleCopyBullet = () => {
    const textToCopy = report.impactDeficit.upgradedBullet.replace(/"/g, '');
    navigator.clipboard.writeText(textToCopy);
    setCopiedBullet(true);
    setTimeout(() => setCopiedBullet(false), 3000);
  };

  const handleDownloadPdf = () => {
    // Generate clean text-based ATS report download
    const reportText = `=====================================================
RESUSCORE AI - STUDENT ATS FIT SCORECARD (OFFICIAL AUDIT)
=====================================================
Candidate: ${report.candidateName} <${user.email}>
Target Position: ${report.jobTitle}
Company: ${report.company} (${report.location})
Audit Date: ${report.deliveredAt}
Status: Cryptographically Signed Node (DKIM / SPF: PASS)

-----------------------------------------------------
BENCHMARK ATS MATCH SCORE: ${report.overallScore} / 100
Tier Classification: ${report.tier}
Candidate Percentile: ${report.percentile}
-----------------------------------------------------
METRICS BREAKDOWN:
• Job Description Match: ${report.metrics.jobMatch}%
• Bullet Rigor & Kinetics: ${report.metrics.bulletRigor}%
• Plain-Text ATS Parsability: ${report.metrics.parsability}%

WHAT'S WORKING IN YOUR FAVOR:
${report.wins.map(w => `• ${w.title}: ${w.description}`).join('\n')}

CRITICAL GAPS TO REMEDY:
${report.criticalGaps.map(g => `• Missing: ${g.name} (${g.tag})`).join('\n')}
Expected Score Lift: ${report.expectedLift} (${report.targetTierNote})

RECOMMENDED REWRITE:
Original: ${report.impactDeficit.currentBullet}
Upgrade (+28% impact): ${report.impactDeficit.upgradedBullet}

=====================================================
ResuScore Collegiate Career Systems • Verified Node
=====================================================`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = report.pdfFileName.replace('.pdf', '_Audit.txt');
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendToUserEmail = async () => {
    await onResendEmail(user.email);
    setSendSuccessToast(true);
    setTimeout(() => setSendSuccessToast(false), 4000);
  };

  const handleOpenMailClient = () => {
    const subject = encodeURIComponent(`ResuScore ATS Scorecard: ${report.jobTitle} @ ${report.company} (${report.overallScore}/100)`);
    const body = encodeURIComponent(
      `Hello ${user.name},\n\nYour official ResuScore ATS Fit Scorecard for ${report.jobTitle} at ${report.company} is ready!\n\nOverall ATS Match: ${report.overallScore}/100 (${report.tier})\nJob Match: ${report.metrics.jobMatch}%\nBullet Rigor: ${report.metrics.bulletRigor}%\nATS Parsability: ${report.metrics.parsability}%\n\nHigh-Impact Rewrite:\n"${report.impactDeficit.upgradedBullet}"\n\nFull audit details dispatched to: ${user.email}\n`
    );
    window.location.href = `mailto:${user.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen">
      {/* Subheader Audit Banner */}
      <div className="w-full bg-[#eff4ff] border-b border-[#d3e4fe] px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToDashboard}
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-2xs"
              title="Back to Mailbox / Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#6cf8bb] text-[#00714d] text-[11px] font-bold uppercase tracking-wider">
                  Automated Audit
                </span>
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#006c49]">verified</span>
                  Cryptographically Signed Node
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-[#0b1c30] truncate mt-0.5 font-['Plus_Jakarta_Sans']">
                Your ResuScore Report: {report.jobTitle} @ {report.company} ({overallScore}/100 ATS Match)
              </h1>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              type="button"
              onClick={() => setShowEnvelope(!showEnvelope)}
              className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Info className="w-3.5 h-3.5 text-slate-500" />
              <span>{showEnvelope ? 'Hide Envelope' : 'View Envelope'}</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Print / Archive</span>
            </button>

            <button
              type="button"
              onClick={handleSendToUserEmail}
              disabled={isSendingEmail}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs disabled:bg-emerald-400"
              title="Dispatches live copy to your email address"
            >
              {isSendingEmail ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to My Email</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onBackToDashboard}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Re-scan with Edits</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real Email Dispatched Success Banner */}
      {sendSuccessToast && (
        <div className="max-w-4xl mx-auto px-4 mt-4">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                Scorecard successfully dispatched to <strong>{user.email}</strong>! Check your inbox or spam folder.
              </span>
            </div>
            <button
              onClick={handleOpenMailClient}
              className="underline text-emerald-800 hover:text-emerald-950 font-bold ml-2 flex items-center gap-1 flex-shrink-0"
            >
              Open in Mail App <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Main Email Container */}
      <div className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Email Envelope / Header Box */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-indigo-700 text-white flex items-center justify-center font-black text-lg shadow-sm flex-shrink-0 font-['Plus_Jakarta_Sans']">
                  RS
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-base text-[#0b1c30] font-['Plus_Jakarta_Sans']">
                      ResuScore AI Delivery
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      &lt;reports@resuscore.ai&gt;
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    To: <strong className="text-slate-900">{report.candidateName}</strong>{' '}
                    <span className="font-mono text-indigo-700 font-semibold">&lt;{user.email}&gt;</span>
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right flex-shrink-0">
                <div className="inline-flex items-center gap-1.5 text-[#006c49] text-xs font-bold bg-[#6cf8bb]/40 px-3 py-1 rounded-full border border-[#4edea3]">
                  <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
                  Just now (Delivered to Inbox)
                </div>
                <div className="text-xs text-slate-500 mt-1 font-mono">
                  {report.deliveredAt}
                </div>
              </div>
            </div>

            {/* Collapsible Envelope Metadata */}
            {showEnvelope && (
              <div className="bg-[#eff4ff] rounded-xl p-4 text-xs text-slate-700 space-y-1.5 border border-[#d3e4fe] animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-bold text-slate-900 w-32 flex-shrink-0">Recipient Inbox:</span>
                  <span className="font-mono text-indigo-700 font-bold">{user.email}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-bold text-slate-900 w-32 flex-shrink-0">Message-ID:</span>
                  <span className="font-mono text-slate-600 break-all">{report.envelope.messageId}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-bold text-slate-900 w-32 flex-shrink-0">DKIM / SPF:</span>
                  <span className="text-emerald-700 font-semibold">{report.envelope.dkim}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-bold text-slate-900 w-32 flex-shrink-0">Target ATS:</span>
                  <span className="text-slate-800">{report.envelope.targetAts}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-bold text-slate-900 w-32 flex-shrink-0">Benchmark cohort:</span>
                  <span className="text-slate-800">{report.envelope.benchmarkCohort}</span>
                </div>
                {report.previewUrl && (
                  <div className="pt-2 border-t border-[#d3e4fe] flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Live Ethereal Test Mailbox Link:</span>
                    <a
                      href={report.previewUrl as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-indigo-700 underline font-bold"
                    >
                      Open Ethereal Mail Receipt <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Main Official Scorecard Document */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden">
            {/* Gradient Banner Header */}
            <div className="bg-gradient-to-r from-indigo-700 via-[#2a14b4] to-[#5148d7] p-6 sm:p-8 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-[#e3dfff]" />
                  </div>
                  <div>
                    <span className="px-3 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider text-[#e3dfff] inline-block font-mono">
                      Official Audit Dispatch
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white font-['Plus_Jakarta_Sans']">
                      Student ATS Fit Scorecard
                    </h2>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-200 font-mono">
                    Candidate Target
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                    {report.jobTitle}
                  </div>
                  <div className="text-xs text-indigo-200">
                    {report.company} • {report.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Scorecard Body Content */}
            <div className="p-6 sm:p-8 lg:p-10 space-y-8 sm:space-y-10">
              {/* ATS Benchmark Score Overview Card */}
              <div className="bg-[#eff4ff] rounded-2xl p-6 sm:p-8 border border-[#d3e4fe] shadow-xs">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                  {/* Circular Score Gauge & Percentile */}
                  <div className="lg:col-span-5 flex items-center gap-5 justify-center lg:justify-start">
                    <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                        <circle
                          className="text-[#d3e4fe] stroke-current"
                          cx="60"
                          cy="60"
                          fill="transparent"
                          r="50"
                          strokeWidth="10"
                        />
                        <circle
                          className="text-emerald-500 stroke-current transition-all duration-1000 ease-out"
                          cx="60"
                          cy="60"
                          fill="transparent"
                          r="50"
                          strokeWidth="10"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-5xl font-extrabold leading-none text-[#0b1c30] tracking-tight font-['Plus_Jakarta_Sans']">
                          {overallScore}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1 font-mono">
                          out of 100
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6cf8bb] text-[#00714d] text-xs font-bold shadow-2xs">
                        <span className="material-symbols-outlined text-[15px]">stars</span>
                        {report.tier}
                      </span>
                      <p className="text-xs text-slate-600 leading-snug">
                        Your profile places in the <strong className="text-slate-900">{report.percentile}</strong> of applicants parsed for {report.company}'s university SWE cohort.
                      </p>
                    </div>
                  </div>

                  {/* 3 Metric Score Breakdowns */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {/* Job Match */}
                    <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                          <span>Job Match</span>
                          <span className="material-symbols-outlined text-[16px] text-indigo-700">work_outline</span>
                        </div>
                        <div className="text-2xl font-extrabold text-[#0b1c30] mt-1 font-['Plus_Jakarta_Sans']">
                          {report.metrics.jobMatch}%
                        </div>
                      </div>
                      <div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                          <div className="bg-indigo-700 h-full rounded-full" style={{ width: `${report.metrics.jobMatch}%` }}></div>
                        </div>
                        <span className="text-[11px] text-slate-500 mt-2 block font-medium">Solid tech alignment</span>
                      </div>
                    </div>

                    {/* Bullet Rigor */}
                    <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                          <span>Bullet Rigor</span>
                          <span className="material-symbols-outlined text-[16px] text-amber-600">trending_up</span>
                        </div>
                        <div className="text-2xl font-extrabold text-amber-700 mt-1 font-['Plus_Jakarta_Sans']">
                          {report.metrics.bulletRigor}%
                        </div>
                      </div>
                      <div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: `${report.metrics.bulletRigor}%` }}></div>
                        </div>
                        <span className="text-[11px] text-slate-500 mt-2 block font-medium">Metric gaps present</span>
                      </div>
                    </div>

                    {/* ATS Parsability */}
                    <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                          <span>ATS Parsability</span>
                          <span className="material-symbols-outlined text-[16px] text-emerald-600">code</span>
                        </div>
                        <div className="text-2xl font-extrabold text-emerald-700 mt-1 font-['Plus_Jakarta_Sans']">
                          {report.metrics.parsability}%
                        </div>
                      </div>
                      <div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${report.metrics.parsability}%` }}></div>
                        </div>
                        <span className="text-[11px] text-slate-500 mt-2 block font-medium">Near-perfect structure</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Working In Your Favor (3 High-Impact Wins) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#6cf8bb] text-[#00714d] flex items-center justify-center">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0b1c30] font-['Plus_Jakarta_Sans']">
                      What's Working in Your Favor
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    3 High-Impact Wins
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1: Strong Action Verbs */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-sm transition-shadow space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-emerald-600">bolt</span>
                      <h4 className="text-sm font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                        Strong Action Verbs
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-900 font-semibold">9 of 10</strong> experience bullets start with high-signal technical verbs: <em className="text-indigo-700 font-medium">"Architected"</em>, <em className="text-indigo-700 font-medium">"Spearheaded"</em>, and <em className="text-indigo-700 font-medium">"Optimized"</em>.
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {report.wins[0]?.verbs?.map((verb) => (
                        <span key={verb} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">
                          {verb}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card 2: Parser Readability */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-sm transition-shadow space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-emerald-600">text_fields</span>
                      <h4 className="text-sm font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                        Parser Readability
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Flawless UTF-8 plain-text parser fidelity. Standard single-page density (<strong className="text-slate-900 font-semibold">395 words</strong>) allows full tokenization by Greenhouse without table collisions.
                    </p>
                    <div className="text-emerald-700 font-semibold text-xs flex items-center gap-1 pt-1">
                      <span className="material-symbols-outlined text-[16px]">task_alt</span>
                      <span>0 OCR conversion faults</span>
                    </div>
                  </div>

                  {/* Card 3: Core Stack Match */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-sm transition-shadow space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-emerald-600">dataset</span>
                      <h4 className="text-sm font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                        Core Stack Match
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      High keyword correlation for fundamental infrastructure requirements:
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {report.wins[2]?.skills?.map((skill) => (
                        <span key={skill} className="px-2.5 py-0.5 rounded-full bg-[#eff4ff] text-[#00714d] text-[11px] font-bold border border-emerald-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Critical Areas to Improve Before Applying (Action Required) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0b1c30] font-['Plus_Jakarta_Sans']">
                      Critical Areas to Improve Before Applying
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                    Action Required
                  </span>
                </div>

                {/* Hard Missing Skills Card */}
                <div className="bg-[#eff4ff] rounded-2xl p-6 border border-[#d3e4fe] shadow-xs flex flex-col md:flex-row gap-6 justify-between items-start">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded bg-rose-100 text-rose-800 text-[11px] font-bold uppercase tracking-wider">
                        Hard Missing Skills
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                        Keywords Absent in Resume Text
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {report.company}'s job description explicitly cites these requirements in multiple responsibilities. Their absence lowers your rank in the initial algorithmic screening.
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2">
                      {report.criticalGaps.map((gap) => (
                        <div
                          key={gap.name}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-100 text-rose-900 text-xs font-semibold border border-rose-200"
                        >
                          <span className="material-symbols-outlined text-[15px]">add_circle</span>
                          <span>{gap.name}</span>
                          <span className="text-[10px] font-bold bg-white/70 px-1.5 py-0.2 rounded-full text-rose-800">
                            {gap.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expected Score Lift Widget */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs w-full md:w-64 flex-shrink-0">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Expected Score Lift
                    </div>
                    <div className="text-3xl font-extrabold text-emerald-600 mt-1 font-['Plus_Jakarta_Sans']">
                      {report.expectedLift}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-snug">
                      Adding contextual references to Go or container concepts moves you to <strong className="text-slate-900">90/100 (Tier 0 Fast-Track)</strong>.
                    </p>
                  </div>
                </div>

                {/* Quantifiable Impact Deficit & Rewrite Recommendation */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <h4 className="text-sm font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                        Quantifiable Impact Deficit
                      </h4>
                    </div>
                    <span className="text-[11px] font-bold bg-slate-100 px-2.5 py-1 rounded-full text-slate-600">
                      {report.impactDeficit.count} bullets lack metrics
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {report.impactDeficit.description}
                  </p>

                  {/* Rewrite Interactive Comparison Box */}
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Actionable Rewrite Recommendation
                    </div>

                    {/* Current Weak Bullet */}
                    <div className="p-4 bg-rose-50/70 rounded-xl border border-rose-200">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="material-symbols-outlined text-[16px] text-rose-600">close</span>
                        <span className="text-[11px] font-bold uppercase text-rose-700 tracking-wider">
                          Your Current Resume Bullet
                        </span>
                      </div>
                      <div className="text-xs text-slate-800 font-mono leading-relaxed">
                        {report.impactDeficit.currentBullet}
                      </div>
                    </div>

                    {/* Downward Transition Indicator */}
                    <div className="flex justify-center -my-1 z-10 relative">
                      <div className="w-7 h-7 rounded-full bg-indigo-700 text-white flex items-center justify-center shadow-xs">
                        <ArrowDown className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Upgraded High-Impact Bullet */}
                    <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span className="text-[11px] font-bold uppercase text-emerald-800 tracking-wider">
                            ResuScore High-Impact Upgrade
                          </span>
                        </div>
                        <span className="text-[11px] font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
                          {report.impactDeficit.impactGain}
                        </span>
                      </div>

                      <div className="text-xs font-semibold text-slate-900 leading-relaxed">
                        "Engineered fault-tolerant distributed key-value store in{' '}
                        <mark className="bg-[#6cf8bb] px-1 py-0.5 rounded text-[#005236] font-bold">
                          Go with Raft consensus
                        </mark>
                        , achieving{' '}
                        <mark className="bg-[#6cf8bb] px-1 py-0.5 rounded text-[#005236] font-bold">
                          10,000+ ops/sec throughput
                        </mark>{' '}
                        under simulated partition failovers."
                      </div>
                    </div>

                    {/* Copy Button */}
                    <div className="flex items-center justify-end pt-1">
                      <button
                        type="button"
                        onClick={handleCopyBullet}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs ${
                          copiedBullet
                            ? 'bg-[#6cf8bb] text-[#005236]'
                            : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
                        }`}
                      >
                        {copiedBullet ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Rewritten Bullet</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Step / Interactive Resume Studio CTA */}
              <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#eff4ff] via-[#e5eeff] to-[#d3e4fe] border border-[#c3c0ff] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 max-w-lg">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                    Next Step For {report.candidateName.split(' ')[0]}
                  </span>
                  <h4 className="text-lg font-bold text-[#0b1c30] font-['Plus_Jakarta_Sans']">
                    Ready to hit 90+ before applying?
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Apply one-click rewrites in the ResuScore Interactive Studio and generate your final customized PDF for {report.company}'s university career portal.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenResumeStudio}
                  className="w-full md:w-auto px-6 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group flex-shrink-0"
                >
                  <span>Open Interactive Resume Studio</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>

              {/* PDF Download Attachment Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[28px]">picture_as_pdf</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900 truncate font-['Plus_Jakarta_Sans']">
                      {report.pdfFileName}
                    </div>
                    <div className="text-xs text-slate-500">
                      {report.pdfFileSize}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-2 flex-shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Report</span>
                </button>
              </div>

              {/* Institutional Footer */}
              <div className="text-center text-xs text-slate-500 space-y-2 pt-4 border-t border-slate-100">
                <p>
                  Generated by <strong className="text-slate-800">ResuScore AI</strong> for collegiate career mobility. Sent directly to{' '}
                  <span className="text-indigo-700 underline font-semibold font-mono">{user.email}</span> because your university node has activated automatic ATS evaluation.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
                  <a href="#pref" onClick={(e) => e.preventDefault()} className="hover:text-indigo-600 transition-colors">
                    Notification Preferences
                  </a>
                  <span>•</span>
                  <a href="#cc" onClick={(e) => e.preventDefault()} className="hover:text-indigo-600 transition-colors">
                    University Career Center Integration
                  </a>
                  <span>•</span>
                  <a href="#ferpa" onClick={(e) => e.preventDefault()} className="hover:text-indigo-600 transition-colors">
                    Security & FERPA Protocol
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Security Verification Line */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 px-2 pb-8">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-emerald-600">shield_lock</span>
              <span>Verified email authenticity via TLS 1.3 • DKIM signed by resuscore.ai</span>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-slate-900 transition-colors font-medium"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
