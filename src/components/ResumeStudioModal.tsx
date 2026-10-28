import React, { useState } from 'react';
import { ScorecardReport, UserProfile } from '../data/mockData';
import { X, Check, Sparkles, ArrowRight, Download, RotateCw } from 'lucide-react';

interface ResumeStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ScorecardReport;
  user: UserProfile;
}

export const ResumeStudioModal: React.FC<ResumeStudioModalProps> = ({
  isOpen,
  onClose,
  report,
  user,
}) => {
  const [appliedUpgrades, setAppliedUpgrades] = useState<number[]>([0]);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const bullets = [
    {
      id: 0,
      role: 'Fault-Tolerant Distributed Key-Value Store (CS162 Lab)',
      original: 'Built key-value store using Raft consensus algorithm for distributed systems lab.',
      upgraded: 'Engineered fault-tolerant distributed key-value store in Go with Raft consensus, achieving 10,000+ ops/sec throughput under simulated partition failovers.',
      impactGain: '+28% impact score',
      skillsAdded: ['Go / Golang', 'Raft Consensus', 'Partition Fault Tolerance'],
    },
    {
      id: 1,
      role: 'Campus Labs — Undergraduate Software Engineer Intern',
      original: 'Helped team with Docker containers and AWS monitoring for internal web apps.',
      upgraded: 'Containerized 4 core microservices using Docker & Kubernetes; configured AWS CloudWatch alarms and telemetry pipelines, cutting deployment rollback incidents by 40%.',
      impactGain: '+22% impact score',
      skillsAdded: ['Docker & Kubernetes', 'AWS CloudWatch', 'Telemetry Pipelines'],
    },
    {
      id: 2,
      role: 'Open-Source Distributed Systems Benchmarks',
      original: 'Wrote scripts to test network speed between servers.',
      upgraded: 'Benchmarked low-latency gRPC and Kafka messaging queues across multi-region VPCs, achieving sub-5ms p99 latency under 50k concurrent requests.',
      impactGain: '+19% impact score',
      skillsAdded: ['gRPC', 'Kafka', 'Low-Latency Systems'],
    },
  ];

  const currentScore = report.overallScore + (appliedUpgrades.length === 3 ? 15 : appliedUpgrades.length === 2 ? 10 : appliedUpgrades.length === 1 ? 5 : 0);

  const toggleUpgrade = (id: number) => {
    if (appliedUpgrades.includes(id)) {
      setAppliedUpgrades(appliedUpgrades.filter(item => item !== id));
    } else {
      setAppliedUpgrades([...appliedUpgrades, id]);
    }
  };

  const handleDownloadCustomizedResume = () => {
    const text = `ALEX CHEN (Tailored for ${report.company} ${report.jobTitle})
Contact: ${user.email} | UC Berkeley '26

HIGHLIGHTED TAILORED BULLETS:
${bullets
  .map(b => (appliedUpgrades.includes(b.id) ? `• [OPTIMIZED] ${b.upgraded}` : `• ${b.original}`))
  .join('\n\n')}

BENCHMARK ATS MATCH SCORE: ${currentScore}/100 (Tier 0 Fast-Track)`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.company}_Tailored_Resume_${report.candidateName.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-700 to-[#372abf] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#e3dfff]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-200">
                  Interactive Studio
                </span>
                <span className="px-2 py-0.2 rounded-full bg-[#6cf8bb] text-[#005236] text-[10px] font-bold">
                  Live ATS Simulation
                </span>
              </div>
              <h3 className="text-xl font-extrabold font-['Plus_Jakarta_Sans']">
                Kinetic Rewrite & Score Optimizer
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-indigo-200 block">Projected ATS Match</span>
              <span className="text-2xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
                {currentScore} <span className="text-sm font-semibold text-emerald-300">/ 100</span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="p-4 rounded-xl bg-[#eff4ff] border border-indigo-100 flex items-center justify-between text-xs">
            <p className="text-slate-700">
              Select one-click bullet upgrades tailored to <strong>{report.company}'s</strong> early talent requirements. Watch your ATS score climb into <strong className="text-indigo-700">Tier 0 Fast-Track</strong>.
            </p>
            <span className="font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-md border border-indigo-200 ml-3 flex-shrink-0">
              {appliedUpgrades.length} of {bullets.length} Applied
            </span>
          </div>

          <div className="space-y-4">
            {bullets.map((b) => {
              const isApplied = appliedUpgrades.includes(b.id);
              return (
                <div
                  key={b.id}
                  className={`p-5 rounded-xl border transition-all ${
                    isApplied
                      ? 'border-emerald-300 bg-emerald-50/40 shadow-xs'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800">{b.role}</span>
                    <button
                      type="button"
                      onClick={() => toggleUpgrade(b.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isApplied
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Applied to Draft</span>
                        </>
                      ) : (
                        <>
                          <span>Apply Upgrade</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-100/70 text-slate-600 font-mono text-[11px]">
                      <span className="text-rose-600 font-bold uppercase text-[9px] block">Current:</span>
                      "{b.original}"
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-100/60 text-slate-900 font-semibold text-xs border border-emerald-200">
                      <div className="flex items-center justify-between text-[10px] text-emerald-800 font-bold uppercase mb-1">
                        <span>ResuScore Kinetic Formulation</span>
                        <span>{b.impactGain}</span>
                      </div>
                      "{b.upgraded}"
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {b.skillsAdded.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-slate-700"
                        >
                          + {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            Targeting: <strong className="text-slate-900">{report.company} • {report.jobTitle}</strong>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
            >
              Close Studio
            </button>
            <button
              onClick={handleDownloadCustomizedResume}
              className="w-1/2 sm:w-auto px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess ? 'Downloaded!' : 'Export Tailored Draft'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
