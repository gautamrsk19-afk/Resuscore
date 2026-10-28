import React, { useState } from 'react';
import { 
  Code2, 
  GitFork, 
  Cpu, 
  CheckCircle2, 
  Target, 
  ShieldCheck, 
  Info, 
  RotateCw, 
  ArrowRight, 
  Check, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { BenchmarkDomain, BenchmarkThreshold } from '../types/resume';
import { benchmarkDomains, benchmarkThresholds } from '../data/mockData';

interface BenchmarkMatrixProps {
  onOpenKeywordMatrix: () => void;
  onApplyDomain: (domain: BenchmarkDomain) => void;
}

export const BenchmarkMatrix: React.FC<BenchmarkMatrixProps> = ({
  onOpenKeywordMatrix,
  onApplyDomain,
}) => {
  const [selectedDomainId, setSelectedDomainId] = useState<string>('domain-2');
  const [isRecalibrating, setIsRecalibrating] = useState(false);
  const [recalibrationComplete, setRecalibrationComplete] = useState(false);
  const [confidenceMetrics, setConfidenceMetrics] = useState({
    headers: 99.8,
    dates: 95.4,
    metrics: 84.2,
    contact: 100,
  });

  const handleRecalibrate = () => {
    setIsRecalibrating(true);
    setTimeout(() => {
      setIsRecalibrating(false);
      setRecalibrationComplete(true);
      setConfidenceMetrics({
        headers: 99.9,
        dates: 96.8,
        metrics: 86.5,
        contact: 100,
      });
      setTimeout(() => setRecalibrationComplete(false), 3000);
    }, 700);
  };

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code2 className="w-4 h-4 text-slate-600" />;
      case 'network':
        return <GitFork className="w-4 h-4 text-[#006c4a]" />;
      case 'ai':
        return <Cpu className="w-4 h-4 text-slate-600" />;
      default:
        return <Code2 className="w-4 h-4 text-slate-600" />;
    }
  };

  const getThresholdIcon = (iconType: string) => {
    switch (iconType) {
      case 'check':
        return <CheckCircle2 className="w-4 h-4 text-slate-500" />;
      case 'star':
        return <Target className="w-4 h-4 text-[#006c4a]" />;
      case 'shield':
        return <ShieldCheck className="w-4 h-4 text-slate-600" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header section */}
      <div>
        <div className="flex items-center gap-2 text-[11px] font-mono-code text-slate-500 uppercase tracking-wider mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
          <span>BENCHMARKS & STANDARDS</span>
          <span>//</span>
          <span>Q1 2025</span>
        </div>
        <h1 className="font-display font-semibold text-3xl text-[#0f172a] tracking-tight">
          Industry Benchmarks
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          Compare your profile score against verified ATS pass thresholds and top 10th percentile candidate rubrics.
        </p>
      </div>

      {/* Top 3 Domain Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {benchmarkDomains.map((domain) => {
          const isSelected = selectedDomainId === domain.id;

          return (
            <div
              key={domain.id}
              onClick={() => {
                setSelectedDomainId(domain.id);
                onApplyDomain(domain);
              }}
              className={`bg-white rounded-lg border p-5 shadow-xs transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'border-[#006c4a] ring-2 ring-[#006c4a]/15 shadow-sm'
                  : 'border-[#e2e8f0] hover:border-[#cbd5e1]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#006c4a] rounded-t-lg" />
              )}

              <div>
                {/* Domain ID and Title */}
                <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-500 uppercase tracking-wider mb-1">
                  <span>{domain.domainNumber}</span>
                  {getDomainIcon(domain.iconName)}
                </div>
                <h3 className="font-display font-semibold text-sm text-[#0f172a] mb-4">
                  {domain.title}
                </h3>

                {/* Score & Percentile */}
                <div className="flex items-baseline justify-between mb-3">
                  <div className="font-display font-bold text-3xl text-[#0f172a]">
                    {domain.score} <span className="text-xs font-normal text-slate-500 font-mono-code">/ 100</span>
                  </div>
                  <span className="font-mono-code text-[11px] font-semibold text-[#006c4a] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-full">
                    {domain.percentile}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full bg-[#e2e8f0] rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-[#0f172a] rounded-full"
                    style={{ width: `${domain.score}%` }}
                  />
                </div>

                {/* Submetrics: Impact, Parsability, Keywords */}
                <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-[#f1f5f9] text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Impact</span>
                    <span className="font-mono-code font-semibold text-xs text-[#0f172a]">
                      {domain.impactScore}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Parsability</span>
                    <span className="font-mono-code font-semibold text-xs text-[#0f172a]">
                      {domain.parsabilityScore}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Keywords</span>
                    <span className="font-mono-code font-semibold text-xs text-[#0f172a]">
                      {domain.keywordsScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">
                  Verified sample: <span className="font-mono-code text-slate-700 font-medium">{domain.verifiedSample}</span>
                </span>
                <span className="font-medium text-[#0f172a] flex items-center gap-1 hover:underline text-[11px]">
                  Details <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Score Threshold Calibration */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
          <div>
            <h2 className="font-display font-semibold text-base text-[#0f172a]">
              Score Threshold Calibration
            </h2>
            <p className="text-xs text-slate-500">
              Operational standard for machine-scanned applications
            </p>
          </div>
          <span className="text-xs font-mono-code text-slate-400">
            SCALE 0-100
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {benchmarkThresholds.map((threshold, idx) => (
            <div
              key={idx}
              className={`rounded-lg border p-4.5 flex flex-col justify-between ${
                threshold.isHighlighted
                  ? 'border-[#006c4a] bg-[#ecfdf5]/20 ring-1 ring-[#006c4a]/30'
                  : 'border-[#e2e8f0] bg-[#f8fafc]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono-code font-bold text-sm text-[#0f172a]">
                    {threshold.range}
                  </span>
                  {getThresholdIcon(threshold.iconType)}
                </div>
                <h4 className="font-display font-semibold text-xs text-[#0f172a] mb-1.5">
                  {threshold.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {threshold.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Bottom Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Keyword Frequency & ATS Gap Analysis */}
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-6 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-display font-semibold text-sm text-[#0f172a]">
                  Keyword Frequency & ATS Gap Analysis
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Extracted from target role descriptions vs. analyzed document
                </p>
              </div>
              <span className="font-mono-code text-[10px] text-slate-600 bg-[#f1f5f9] border border-[#e2e8f0] px-2 py-0.5 rounded whitespace-nowrap">
                TF-IDF Model
              </span>
            </div>

            {/* Detected in Current Profile */}
            <div className="mb-5">
              <div className="flex items-center gap-1.5 text-[11px] font-mono-code uppercase tracking-wider text-slate-500 mb-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006c4a]" />
                <span>DETECTED IN CURRENT PROFILE (MATCHED)</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { tag: 'React', count: '4x' },
                  { tag: 'Python', count: '6x' },
                  { tag: 'FastAPI', count: '2x' },
                  { tag: 'TypeScript', count: '5x' },
                  { tag: 'Docker', count: '3x' },
                  { tag: 'PostgreSQL', count: '2x' },
                  { tag: 'REST APIs', count: '3x' },
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="font-mono-code text-xs px-2.5 py-1 bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0] rounded-md font-medium inline-flex items-center gap-1"
                  >
                    <span>{item.tag}</span>
                    <span className="text-emerald-700/80 font-normal">{item.count}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Additions */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono-code uppercase tracking-wider text-[#be123c] mb-2.5">
                <Info className="w-3.5 h-3.5" />
                <span>RECOMMENDED ADDITIONS (ATS HIGH-WEIGHT GAPS)</span>
              </div>

              <div className="space-y-2.5">
                <div className="bg-[#f8fafc] rounded-md border border-[#e2e8f0] p-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-900">System Design</span>
                    <span className="font-mono-code font-bold text-[#006c4a]">+8.4 pts impact</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Present in 87% of tier-1 senior tech postings. Add architecture keywords.
                  </p>
                </div>

                <div className="bg-[#f8fafc] rounded-md border border-[#e2e8f0] p-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-900">CI / CD Pipelines</span>
                    <span className="font-mono-code font-bold text-[#006c4a]">+5.1 pts impact</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Critical for DevOps and Full-stack parsers (GitHub Actions, Argo, Jenkins).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Footer */}
          <div className="mt-5 pt-3.5 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
            <span className="text-slate-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Current Overall Keyword Alignment: <strong className="font-mono-code text-slate-900 font-semibold">78.4%</strong>
            </span>
            <button
              onClick={onOpenKeywordMatrix}
              className="font-medium text-[#0f172a] hover:underline flex items-center gap-1 text-xs"
            >
              Full Matrix <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right: Parsing Engine Confidence */}
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-sm text-[#0f172a]">
                Parsing Engine Confidence
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono-code text-slate-400">Online</span>
              </div>
            </div>

            {/* Metric Bars */}
            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700">Section Header Recognition</span>
                  <span className="font-mono-code font-semibold text-slate-900">{confidenceMetrics.headers}%</span>
                </div>
                <div className="h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#006c4a] rounded-full transition-all duration-500" style={{ width: `${confidenceMetrics.headers}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700">Chronological Date Extraction</span>
                  <span className="font-mono-code font-semibold text-slate-900">{confidenceMetrics.dates}%</span>
                </div>
                <div className="h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#006c4a] rounded-full transition-all duration-500" style={{ width: `${confidenceMetrics.dates}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700">Metrics & Quantitative Outcomes</span>
                  <span className="font-mono-code font-semibold text-slate-900">{confidenceMetrics.metrics}%</span>
                </div>
                <div className="h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#006c4a] rounded-full transition-all duration-500" style={{ width: `${confidenceMetrics.metrics}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700">Contact & Metadata Extraction</span>
                  <span className="font-mono-code font-semibold text-slate-900">{confidenceMetrics.contact}%</span>
                </div>
                <div className="h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#006c4a] rounded-full transition-all duration-500" style={{ width: `${confidenceMetrics.contact}%` }} />
                </div>
              </div>
            </div>

            {/* Parser Advisory */}
            <div className="mt-5 p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-md flex items-start gap-2.5">
              <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-900 block mb-0.5">Parser Advisory</span>
                Multi-column PDF layouts risk up to 34% data scrambling in older Greenhouse/Workday instances. Single-column format verified.
              </div>
            </div>
          </div>

          {/* Engine Footer */}
          <div className="mt-5 pt-3.5 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono-code text-[11px]">
              Engine: <strong className="text-slate-700 font-semibold">ResuScan v4.2 Core</strong>
            </span>
            <button
              onClick={handleRecalibrate}
              disabled={isRecalibrating}
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#0f172a] rounded hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-xs disabled:opacity-50"
            >
              <RotateCw className={`w-3 h-3 ${isRecalibrating ? 'animate-spin' : ''}`} />
              <span>{isRecalibrating ? 'Scanning...' : recalibrationComplete ? 'Calibrated!' : 'Re-calibrate'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
