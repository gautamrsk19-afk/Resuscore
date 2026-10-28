import React, { useState } from 'react';
import { X, ShieldCheck, BookOpen, Lock, CheckCircle2, AlertTriangle } from 'lucide-react';

interface GuidanceModalProps {
  initialTab?: 'guide' | 'privacy' | 'docs';
  onClose: () => void;
}

export const GuidanceModal: React.FC<GuidanceModalProps> = ({
  initialTab = 'guide',
  onClose,
}) => {
  const [tab, setTab] = useState<'guide' | 'privacy' | 'docs'>(initialTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl rounded-xl border border-[#e2e8f0] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            {tab === 'guide' && <ShieldCheck className="w-4 h-4 text-[#006c4a]" />}
            {tab === 'privacy' && <Lock className="w-4 h-4 text-[#006c4a]" />}
            {tab === 'docs' && <BookOpen className="w-4 h-4 text-[#006c4a]" />}
            <h2 className="font-display font-semibold text-base text-[#0f172a]">
              {tab === 'guide' && 'ATS Standard Guide & Scoring Heuristics'}
              {tab === 'privacy' && 'Privacy, Security & Data Handling'}
              {tab === 'docs' && 'ResuScan Engine Architecture & Documentation'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-6 py-2.5 border-b border-[#f1f5f9] bg-[#f8fafc] flex gap-2">
          <button
            onClick={() => setTab('guide')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              tab === 'guide'
                ? 'bg-white text-[#0f172a] shadow-xs border border-[#e2e8f0]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ATS Standard Guide
          </button>
          <button
            onClick={() => setTab('privacy')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              tab === 'privacy'
                ? 'bg-white text-[#0f172a] shadow-xs border border-[#e2e8f0]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Privacy & Security
          </button>
          <button
            onClick={() => setTab('docs')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              tab === 'docs'
                ? 'bg-white text-[#0f172a] shadow-xs border border-[#e2e8f0]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Documentation
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed">
          {tab === 'guide' && (
            <>
              <h3 className="font-semibold text-slate-900 text-sm">
                How Modern Applicant Tracking Systems (ATS) Parse Resumes
              </h3>
              <p>
                Enterprise platforms such as Workday, Greenhouse, Taleo, and Lever use schema tokenizers that convert raw PDF or Word files into standardized database objects.
              </p>
              <div className="space-y-2 border-l-2 border-[#006c4a] pl-3 py-1">
                <p>
                  <strong>Single-Column Hierarchy:</strong> Multi-column tables or floating text boxes frequently cause out-of-order date serialization. Single-column linear layout achieves &gt;99% extraction accuracy.
                </p>
                <p>
                  <strong>Quantified Bullet Structure:</strong> Top 10th percentile candidates utilize the standard formula: <em>[Action Verb] + [Context/Architecture] + [Hard Metric / Business Lift]</em>.
                </p>
                <p>
                  <strong>Word Density Window:</strong> Ideal single-page resumes should reside strictly in the 420–550 word window to maximize scannability without cognitive fatigue.
                </p>
              </div>
            </>
          )}

          {tab === 'privacy' && (
            <>
              <h3 className="font-semibold text-slate-900 text-sm">
                Zero-Retention Security Model
              </h3>
              <p>
                Your resumes contain sensitive career records, contact information, and intellectual property. ResuScore applies strict zero-storage client parsing and ephemeral sandboxes.
              </p>
              <ul className="space-y-2 list-disc pl-4 text-slate-600">
                <li>Uploaded resumes are parsed directly in-memory and hashed via SHA-256 for local version identity.</li>
                <li>No resume texts are written to permanent public storage or sold to third-party headhunters.</li>
                <li>Diagnostic telemetry is strictly candidate-authoritative.</li>
              </ul>
            </>
          )}

          {tab === 'docs' && (
            <>
              <h3 className="font-semibold text-slate-900 text-sm">
                ResuScan v4.2 Technical Architecture
              </h3>
              <p>
                ResuScore operates a dual-layer evaluation engine:
              </p>
              <div className="space-y-2 font-mono-code bg-[#f8fafc] p-3 rounded border border-[#e2e8f0] text-[11px]">
                <p><strong>Layer 1: Structural AST Parser:</strong> Scans PDF streams, validates font glyph encodings, identifies standard section headers, and verifies chronologic dates.</p>
                <p><strong>Layer 2: TF-IDF & Semantic Alignment:</strong> Cross-references role description requirements with candidate experience tokens and generates quantified uplift scores.</p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#e2e8f0] bg-[#f8fafc] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-white bg-[#0f172a] rounded hover:bg-slate-800 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
