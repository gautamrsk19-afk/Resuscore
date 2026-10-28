import React, { useState } from 'react';
import {
  UserProfile,
  RecentScanItem,
  sampleJobPresets,
  sampleResumeText,
  ScorecardReport,
} from '../data/mockData';
import {
  Upload,
  FileText,
  X,
  History,
  Lightbulb,
  Link as LinkIcon,
  Sparkles,
  Rocket,
  Search,
  Filter,
  Download,
  RotateCw,
  CheckCircle,
  AlertTriangle,
  GraduationCap,
  Zap,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

interface DashboardScreenProps {
  user: UserProfile;
  recentScans: RecentScanItem[];
  onStartAnalysis: (payload: {
    resumeText: string;
    jobTitle: string;
    company: string;
    jobDescription: string;
    targetEmail: string;
  }) => Promise<void>;
  onViewReport: (reportId?: string) => void;
  onOpenInspectText: (text: string) => void;
  onOpenKeywordsPreview: (keywords: { found: string[]; missing: string[] }) => void;
  isAnalyzing: boolean;
  analyzingStep: string;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  recentScans,
  onStartAnalysis,
  onViewReport,
  onOpenInspectText,
  onOpenKeywordsPreview,
  isAnalyzing,
  analyzingStep,
}) => {
  // Resume state
  const [resumeFileName, setResumeFileName] = useState('Ananya_Patel_Software_Engineer_Resume_2025.pdf');
  const [resumeFileSize, setResumeFileSize] = useState('142 KB');
  const [resumeWordCount, setResumeWordCount] = useState(378);
  const [resumeContent, setResumeContent] = useState(sampleResumeText);
  const [isDragOver, setIsDragOver] = useState(false);

  // Job spec state (defaults to Datadog role from images)
  const defaultPreset = sampleJobPresets[0];
  const [jobUrl, setJobUrl] = useState('');
  const [jobTitle, setJobTitle] = useState(defaultPreset.jobTitle);
  const [company, setCompany] = useState(defaultPreset.company);
  const [seniority, setSeniority] = useState(defaultPreset.seniority);
  const [domain, setDomain] = useState(defaultPreset.domain);
  const [jobDescription, setJobDescription] = useState(defaultPreset.description);
  const [autoFetchNotice, setAutoFetchNotice] = useState<string | null>(null);

  // Quick preset selector
  const handleSelectPreset = (preset: typeof sampleJobPresets[0]) => {
    setCompany(preset.company);
    setJobTitle(preset.jobTitle);
    setSeniority(preset.seniority);
    setDomain(preset.domain);
    setJobDescription(preset.description);
    setAutoFetchNotice(`Loaded official ${preset.company} requirements spec!`);
    setTimeout(() => setAutoFetchNotice(null), 3000);
  };

  const handleAutoFetch = () => {
    if (!jobUrl.trim()) {
      // If empty, cycle or populate Datadog / Stripe
      handleSelectPreset(sampleJobPresets[0]);
      setAutoFetchNotice('Auto-fetched requirements spec for Datadog Early Talent SWE!');
    } else {
      const match = sampleJobPresets.find(p =>
        jobUrl.toLowerCase().includes(p.company.toLowerCase())
      ) || sampleJobPresets[0];
      handleSelectPreset(match);
      setAutoFetchNotice(`Extracted job schema from URL: ${match.company} - ${match.jobTitle}`);
    }
    setTimeout(() => setAutoFetchNotice(null), 3500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
      setResumeFileSize(`${Math.round(file.size / 1024)} KB`);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          setResumeContent(text);
          setResumeWordCount(text.split(/\s+/).filter(Boolean).length || 380);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setResumeFileName(file.name);
      setResumeFileSize(`${Math.round(file.size / 1024)} KB`);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          setResumeContent(text);
          setResumeWordCount(text.split(/\s+/).filter(Boolean).length || 380);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyze = async () => {
    await onStartAnalysis({
      resumeText: resumeContent,
      jobTitle,
      company,
      jobDescription,
      targetEmail: user.email,
    });
  };

  return (
    <div className="w-full bg-[#f8f9ff] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Hero Welcome Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#eff4ff] via-[#e5eeff] to-[#dce9ff] border border-[#c7c4d7]/40 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-700 text-white text-[11px] font-bold uppercase tracking-wider">
                Active Cycle
              </span>
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Spring 2025 Internship Cycle • 4 applications tracked
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30] tracking-tight font-['Plus_Jakarta_Sans']">
              Welcome back, {user.name.split(' ')[0]} 👋
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              Targeting a new role? Upload your resume and paste the job spec to benchmark your score with collegiate ATS algorithms.
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 flex items-center gap-3 min-w-[150px]">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">bar_chart</span>
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">
                  78.0
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Avg Match
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 flex items-center gap-3 min-w-[150px]">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">
                  3 of 4
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Ready to Send
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Scanning Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Step 1: Upload Your Resume (Left 5 Columns) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200/80 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-indigo-700 text-white font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <h2 className="text-lg font-bold text-[#0b1c30] font-['Plus_Jakarta_Sans']">
                  Upload Your Resume
                </h2>
              </div>
              <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                PDF, DOCX ≤ 10MB
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Our parser extracts bullet kinetics, impact verbs, and technical keywords without breaking your layout.
            </p>

            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`p-6 rounded-xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                isDragOver
                  ? 'border-indigo-600 bg-indigo-50/60'
                  : 'border-slate-300 hover:border-indigo-400 bg-[#f8f9ff]'
              }`}
              onClick={() => document.getElementById('resume-file-input')?.click()}
            >
              <div className="w-12 h-12 rounded-full bg-[#e5eeff] text-indigo-700 flex items-center justify-center mb-2 shadow-xs">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-800">
                Drag & drop your resume file
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                or <span className="text-indigo-600 underline font-medium">browse files</span> from your computer
              </p>
              <input
                id="resume-file-input"
                type="file"
                accept=".pdf,.docx,.txt"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {/* Parsed Active Resume Badge */}
            <div className="p-3.5 rounded-xl bg-[#eff4ff] border border-indigo-100 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-indigo-600 text-white flex-shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {resumeFileName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {resumeFileSize} • Uploaded today at 11:24 AM
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setResumeFileName('Alex_Chen_General_Resume.pdf');
                    setResumeContent(sampleResumeText);
                  }}
                  className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-indigo-100/60 text-[11px]">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Parsed successfully ({resumeWordCount} words, 1 page)
                </span>
                <button
                  type="button"
                  onClick={() => onOpenInspectText(resumeContent)}
                  className="text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer"
                >
                  Inspect text
                </button>
              </div>
            </div>

            {/* Quick Resume Switcher */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <History className="w-3.5 h-3.5 text-slate-500" />
                <span>Use previously scanned resume (V3 - Jan 2025)</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setResumeFileName('Alex_Chen_SWE_V3_Jan2025.pdf');
                  setResumeContent(sampleResumeText);
                }}
                className="text-[11px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-slate-200 hover:bg-indigo-50"
              >
                3 Versions
              </button>
            </div>

            {/* Pro ATS Tip */}
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-2.5 text-xs text-amber-900">
              <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong>ATS Tip:</strong> Avoid dual-column tables for contact headers. ResuScore checks standard plain-text parse order.
              </p>
            </div>
          </div>

          {/* Step 2: Target Job Information (Right 7 Columns) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200/80 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-indigo-700 text-white font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <h2 className="text-lg font-bold text-[#0b1c30] font-['Plus_Jakarta_Sans']">
                  Target Job Information
                </h2>
              </div>
              <span className="text-[11px] font-bold text-[#372abf] bg-[#eff4ff] px-2.5 py-0.5 rounded-full border border-[#c3c0ff]">
                AI Context Matching
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Specify the target role requirements so our matcher can pinpoint keyword gaps and quantify match probability.
            </p>

            {/* Quick Preset Buttons for fast role benchmarking */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Quick Role Presets:
              </span>
              <div className="flex flex-wrap gap-2">
                {sampleJobPresets.map((preset) => (
                  <button
                    key={preset.company}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-colors ${
                      company === preset.company
                        ? 'bg-indigo-600 text-white border-indigo-600 font-semibold shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.company} • {preset.jobTitle.split(' - ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* URL Auto-fetch Bar */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <LinkIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                    placeholder="Paste LinkedIn, Handshake, or Greenhouse URL..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all font-mono"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAutoFetch}
                  className="px-3.5 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition-colors flex items-center gap-1.5 flex-shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Auto-fetch</span>
                </button>
              </div>

              {autoFetchNotice && (
                <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 animate-in fade-in">
                  ✓ {autoFetchNotice}
                </div>
              )}
            </div>

            {/* Job Title & Company Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Job Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Software Engineer Intern - Summer 2025"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Company <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Datadog"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Seniority & Domain Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Seniority Level
                </label>
                <div className="relative">
                  <select
                    value={seniority}
                    onChange={(e) => setSeniority(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="Internship / Co-op">Internship / Co-op</option>
                    <option value="New Grad (0-1 YOE)">New Grad (0-1 YOE)</option>
                    <option value="Junior SWE (1-3 YOE)">Junior SWE (1-3 YOE)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Target Domain / Sub-track
                </label>
                <div className="relative">
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="Distributed Systems & Backend">Distributed Systems & Backend</option>
                    <option value="Frontend & Full-Stack">Frontend & Full-Stack</option>
                    <option value="Machine Learning & AI">Machine Learning & AI</option>
                    <option value="Mobile Engineering">Mobile Engineering</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Job Description Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-800">
                  Job Description / Requirements Spec <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {jobDescription.length.toLocaleString()} characters
                </span>
              </div>
              <textarea
                rows={5}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the complete job description or key responsibilities here..."
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white resize-none"
              />
            </div>

            {/* Email Dispatch Notice */}
            <div className="p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-100 flex items-center justify-between text-xs">
              <span className="text-indigo-900 font-medium">
                Scorecard automatically dispatches to your verified inbox:
              </span>
              <span className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                {user.email}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
              <button
                type="button"
                onClick={() =>
                  onOpenKeywordsPreview({
                    found: defaultPreset.keywordsFound,
                    missing: defaultPreset.keywordsMissing,
                  })
                }
                className="sm:col-span-5 px-3.5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5 text-slate-600" />
                <span>Preview Job Keywords (14 detected)</span>
              </button>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="sm:col-span-7 px-5 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 disabled:bg-indigo-400 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin text-white" />
                    <span>{analyzingStep || 'Analyzing & Scoring Resume...'}</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    <span>Analyze & Score Resume (Takes ~15s)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Target Key-Phrase Highlights Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                Target Key-Phrase Highlights
              </h3>
              <p className="text-[11px] text-slate-500">
                Real-time extracted ATS tokens from {company} spec
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
              Go / Golang • Found
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
              Python • Found
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
              REST APIs • Found
            </span>
            <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[11px] font-semibold">
              gRPC • Missing
            </span>
            <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[11px] font-semibold">
              Distributed Systems • Missing
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
              Docker • Found
            </span>
            <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
              +8 more
            </span>
          </div>
        </div>

        {/* Recent Scans & Score History Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#0b1c30] font-['Plus_Jakarta_Sans']">
                Recent Scans & Score History
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Review prior ATS evaluations and tailor iterations across your target companies.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert('Filter panel: Showing all university recruiting cycles')}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
              >
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span>Filter</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const csv = `Company,Role,Score,Tier,Date\nFigma,Frontend Engineer Intern,84,High ATS Match,2 days ago\nRobinhood,Product Management Intern,62,Needs Improvement,1 week ago\nSnowflake,Backend Developer Co-op,78,Good ATS Match,Jan 12 2025`;
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'ResuScore_History.csv';
                  a.click();
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-6">Target Position & Company</th>
                  <th className="py-3 px-6">ResuScore Match</th>
                  <th className="py-3 px-6">Status / Tier</th>
                  <th className="py-3 px-6">Scanned</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {recentScans.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Position & Company */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#eff4ff] text-indigo-700 font-extrabold text-sm flex items-center justify-center flex-shrink-0 shadow-2xs">
                          {item.initial}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">
                            {item.jobTitle}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {item.company} • {item.location}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* ResuScore Match */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2.5">
                        <span className="w-9 h-9 rounded-full bg-slate-100 text-slate-900 font-extrabold text-xs flex items-center justify-center border-2 border-indigo-600">
                          {item.score}
                        </span>
                        <div>
                          <div className="font-bold text-slate-800">{item.fitText}</div>
                          <div className="text-[11px] text-slate-500">{item.skillsCount}</div>
                        </div>
                      </div>
                    </td>

                    {/* Status / Tier */}
                    <td className="py-4 px-6">
                      {item.tier === 'High ATS Match' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6cf8bb]/60 text-[#005236] font-bold text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00714d]"></span>
                          High ATS Match
                        </span>
                      ) : item.tier === 'Needs Improvement' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                          Needs Improvement
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d3e4fe] text-[#2a14b4] font-bold text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                          Good ATS Match
                        </span>
                      )}
                    </td>

                    {/* Scanned Time */}
                    <td className="py-4 px-6 text-slate-500">
                      {item.scannedTime}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onViewReport(item.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs shadow-2xs transition-colors"
                        >
                          View Scorecard
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCompany(item.company);
                            setJobTitle(item.jobTitle);
                            handleAnalyze();
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          title="Re-scan this role"
                        >
                          <RotateCw className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Value Proposition Triad Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                Career Center Synced
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                UC Berkeley Career Center guidelines applied automatically to all your engineering technical bullets.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                Action Verb Engine
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                32 impact verbs quantified. We replace weak terms like "helped with" with high-impact kinetic formulations.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                FERPA Protected
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Your personal documents are strictly sandboxed for evaluation and never sold or used for public training.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
