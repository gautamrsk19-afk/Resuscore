import React, { useState } from 'react';
import { 
  FileText, 
  RotateCcw, 
  Award, 
  TrendingUp, 
  SlidersHorizontal, 
  Plus, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { HistoryRun } from '../types/resume';

interface HistoryLedgerProps {
  historyRuns: HistoryRun[];
  onViewReport: (run: HistoryRun) => void;
  onNewIteration: () => void;
}

export const HistoryLedger: React.FC<HistoryLedgerProps> = ({
  historyRuns,
  onViewReport,
  onNewIteration,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [sortType, setSortType] = useState<'recency' | 'score' | 'delta'>('recency');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Filter runs
  const filteredRuns = historyRuns.filter((run) => {
    if (filterType === 'all') return true;
    if (filterType === 'strong') return run.matchType === 'Strong Match';
    if (filterType === 'moderate') return run.matchType === 'Moderate Match';
    if (filterType === 'needs_polish') return run.matchType === 'Needs Polish';
    return true;
  });

  // Sort runs
  const sortedRuns = [...filteredRuns].sort((a, b) => {
    if (sortType === 'score') return b.compositeScore - a.compositeScore;
    if (sortType === 'delta') return parseInt(b.scoreDelta) - parseInt(a.scoreDelta);
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono-code text-slate-500 uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>HISTORICAL TELEMETRY</span>
            <span>•</span>
            <span>AUDIT LOG</span>
          </div>
          <h1 className="font-display font-semibold text-3xl text-[#0f172a] tracking-tight">
            Score History
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Previous resume iterations, diagnostic deltas, and automated version comparisons.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-[#cbd5e1] rounded-md hover:bg-[#f8fafc] flex items-center gap-2 transition-colors shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>Filter Runs</span>
              {filterType !== 'all' && (
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
              )}
            </button>

            {showFilterDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setShowFilterDropdown(false)} 
                />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#e2e8f0] rounded-md shadow-lg py-1 z-40">
                  <div className="px-3 py-1.5 text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">
                    Match Classification
                  </div>
                  {[
                    { id: 'all', label: 'All Iterations' },
                    { id: 'strong', label: 'Strong Match (85+)' },
                    { id: 'moderate', label: 'Moderate Match' },
                    { id: 'needs_polish', label: 'Needs Polish' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setFilterType(item.id);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                        filterType === item.id
                          ? 'bg-[#f1f5f9] text-[#0f172a] font-medium'
                          : 'text-slate-600 hover:bg-[#f8fafc]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={onNewIteration}
            className="px-4 py-2 text-xs font-medium text-white bg-[#0f172a] rounded-md hover:bg-slate-800 flex items-center gap-2 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Iteration</span>
          </button>
        </div>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Evaluated Assets */}
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-500 uppercase tracking-wider mb-3">
            <span>EVALUATED ASSETS</span>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <div className="font-display font-bold text-3xl text-[#0f172a]">
              6 <span className="text-sm font-normal text-slate-500">versions</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              All parsed via ATS V4 pipeline
            </p>
          </div>
        </div>

        {/* Average Score */}
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-500 uppercase tracking-wider mb-3">
            <span>AVERAGE SCORE</span>
            <RotateCcw className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <div className="font-display font-bold text-3xl text-[#0f172a]">
              84 <span className="text-sm font-normal text-slate-500">/ 100</span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-1.5 flex-1 bg-[#e2e8f0] rounded-full overflow-hidden">
                <div className="h-full bg-[#0f172a] rounded-full w-[84%]" />
              </div>
              <span className="text-[11px] font-mono-code text-slate-600 font-medium">
                Top 12%
              </span>
            </div>
          </div>
        </div>

        {/* Peak Benchmark */}
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-500 uppercase tracking-wider mb-3">
            <span>PEAK BENCHMARK</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="font-display font-bold text-3xl text-[#006c4a]">
              92 <span className="text-sm font-normal text-slate-500">/ 100</span>
            </div>
            <p className="text-xs text-[#006c4a] font-medium mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +14 pts progression cycle
            </p>
          </div>
        </div>

        {/* Score Trajectory Sparkline */}
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-500 uppercase tracking-wider mb-2">
            <span>SCORE TRAJECTORY</span>
            <span className="text-[10px] font-mono-code font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              STEEP GAIN
            </span>
          </div>
          <div>
            {/* SVG Sparkline */}
            <div className="h-10 w-full flex items-center">
              <svg className="w-full h-8 overflow-visible" viewBox="0 0 160 32">
                <defs>
                  <linearGradient id="sparklineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0d9488" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                <path
                  d="M 5,26 C 35,24 60,18 95,14 C 125,10 145,5 155,4"
                  fill="none"
                  stroke="url(#sparklineGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="5" cy="26" r="3" fill="#0d9488" />
                <circle cx="95" cy="14" r="3" fill="#059669" />
                <circle cx="155" cy="4" r="3.5" fill="#006c4a" stroke="#ffffff" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="flex justify-between text-[10px] font-mono-code text-slate-500 mt-1">
              <span>v1.0 (68)</span>
              <span>v3.2 (92)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation History List */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] shadow-xs overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <h2 className="font-display font-semibold text-base text-[#0f172a]">
              Evaluation History
            </h2>
            <span className="text-xs text-slate-500 font-mono-code">
              {sortedRuns.length} recent files
            </span>
          </div>

          {/* Sort selector */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="text-xs font-mono-code text-slate-600 flex items-center gap-1.5 hover:text-slate-900 transition-colors"
            >
              <span>SORT BY</span>
              <span className="font-semibold capitalize text-slate-900">{sortType}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {showSortDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setShowSortDropdown(false)} 
                />
                <div className="absolute right-0 mt-2 w-36 bg-white border border-[#e2e8f0] rounded-md shadow-lg py-1 z-40">
                  {[
                    { id: 'recency', label: 'Recency' },
                    { id: 'score', label: 'Highest Score' },
                    { id: 'delta', label: 'Score Uplift' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSortType(s.id as any);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs ${
                        sortType === s.id
                          ? 'bg-[#f1f5f9] text-[#0f172a] font-medium'
                          : 'text-slate-600 hover:bg-[#f8fafc]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-[#f1f5f9]">
          {sortedRuns.map((run) => {
            const isStrong = run.matchType === 'Strong Match';
            const isPolish = run.matchType === 'Needs Polish';
            const isModerate = run.matchType === 'Moderate Match';

            return (
              <div
                key={run.id}
                className="p-5 sm:px-6 hover:bg-[#f8fafc] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: File details */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-mono-code font-semibold text-sm text-[#0f172a]">
                        {run.fileName}
                      </span>
                      <span
                        className={`text-[10px] font-mono-code font-semibold px-2 py-0.5 rounded-full border ${
                          isStrong
                            ? 'bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0]'
                            : isPolish
                            ? 'bg-[#fff1f2] text-[#be123c] border-[#fecdd3]'
                            : isModerate
                            ? 'bg-[#f1f5f9] text-[#475569] border-[#cbd5e1]'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {run.matchType}
                      </span>
                      <span className="text-xs text-slate-400">
                        {run.relativeTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap font-sans">
                      <span>{run.targetRole}</span>
                      <span>·</span>
                      <span className="font-mono-code text-slate-600">
                        ATS Parsed {run.atsParsedPercent}%
                      </span>
                      <span>·</span>
                      <span className="font-mono-code font-medium text-emerald-700">
                        {run.scoreDelta}
                      </span>
                      {run.formatFlags && (
                        <>
                          <span>·</span>
                          <span className="text-amber-700 flex items-center gap-1 font-mono-code">
                            <AlertTriangle className="w-3 h-3" />
                            {run.formatFlags} Format Flags detected
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Center / Right: Progress badge & Score */}
                <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10 pt-2 md:pt-0 border-t md:border-t-0 border-[#f1f5f9]">
                  {/* Highlight bar */}
                  <div className="flex flex-col items-start md:items-end min-w-[140px]">
                    <span className="text-xs font-mono-code text-slate-600 mb-1 flex items-center gap-1">
                      {run.deltaHighlight}
                    </span>
                    <div className="w-32 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#006c4a] rounded-full"
                        style={{ width: `${run.atsParsedPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <div className="font-display font-bold text-2xl text-[#0f172a] leading-none">
                      {run.compositeScore}
                      <span className="text-xs font-mono-code font-normal text-slate-500 ml-1">
                        /100
                      </span>
                    </div>
                    <span className="text-[10px] font-mono-code tracking-wider text-slate-400 uppercase">
                      COMP. SCORE
                    </span>
                  </div>

                  {/* View Report Button */}
                  <button
                    onClick={() => onViewReport(run)}
                    className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#0f172a] rounded hover:bg-slate-800 transition-colors shadow-xs whitespace-nowrap"
                  >
                    View Report
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: What You Improved!! */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h3 className="font-display font-semibold text-lg text-[#0f172a]">
              What You Improved!!
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono-code">Aggregated Net Lift</span>
            <span className="font-mono-code text-xs font-bold text-[#006c4a] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-1 rounded-full">
              +20 Net Points
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-[#f8fafc] rounded-lg border border-[#e2e8f0] p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-500 uppercase tracking-wider mb-2">
                <span>ATS PARSABILITY</span>
                <span className="font-bold text-[#006c4a]">+18%</span>
              </div>
              <div className="font-display font-bold text-xl text-[#0f172a] mb-1">
                98 <span className="text-xs font-normal text-slate-500 font-mono-code">from 80</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Eliminated multi-column table layout errors.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#f8fafc] rounded-lg border border-[#e2e8f0] p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-500 uppercase tracking-wider mb-2">
                <span>ACTION VERB IMPACT</span>
                <span className="font-bold text-[#006c4a]">+22%</span>
              </div>
              <div className="font-display font-bold text-xl text-[#0f172a] mb-1">
                91 <span className="text-xs font-normal text-slate-500 font-mono-code">from 69</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Transformed passive responsibilities into metrics.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#f8fafc] rounded-lg border border-[#e2e8f0] p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-500 uppercase tracking-wider mb-2">
                <span>BREVITY & FOCUS</span>
                <span className="font-bold text-[#006c4a]">+14%</span>
              </div>
              <div className="font-display font-bold text-xl text-[#0f172a] mb-1">
                86 <span className="text-xs font-normal text-slate-500 font-mono-code">from 72</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Trimmed redundant 2018 junior internship summaries.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#f8fafc] rounded-lg border border-[#e2e8f0] p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-500 uppercase tracking-wider mb-2">
                <span>KEYWORD DENSITY</span>
                <span className="font-bold text-[#006c4a]">+26%</span>
              </div>
              <div className="font-display font-bold text-xl text-[#0f172a] mb-1">
                89 <span className="text-xs font-normal text-slate-500 font-mono-code">from 63</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Integrated distributed systems & Golang keywords.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
