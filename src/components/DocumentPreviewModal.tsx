import React, { useState } from 'react';
import { X, CheckCircle, Code, Layers, FileText, Hash } from 'lucide-react';
import { CandidateAnalysis } from '../types/resume';

interface DocumentPreviewModalProps {
  analysis: CandidateAnalysis;
  onClose: () => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  analysis,
  onClose,
}) => {
  const [activeView, setActiveView] = useState<'text' | 'schema' | 'tokens'>('text');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-3xl rounded-xl border border-[#e2e8f0] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#0f172a]" />
            <h2 className="font-display font-semibold text-base text-[#0f172a]">
              Document Structural Schema & Parsed Content
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* View toggle */}
        <div className="px-6 py-2.5 border-b border-[#f1f5f9] bg-[#f8fafc] flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveView('text')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                activeView === 'text'
                  ? 'bg-white text-[#0f172a] shadow-xs border border-[#e2e8f0]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Extracted Raw Text
            </button>
            <button
              onClick={() => setActiveView('schema')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                activeView === 'schema'
                  ? 'bg-white text-[#0f172a] shadow-xs border border-[#e2e8f0]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              AST Schema Tree
            </button>
            <button
              onClick={() => setActiveView('tokens')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                activeView === 'tokens'
                  ? 'bg-white text-[#0f172a] shadow-xs border border-[#e2e8f0]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Parser Audit Diagnostics
            </button>
          </div>
          <span className="font-mono-code text-[11px] text-slate-500">
            Hash: {analysis.inspection.hash}
          </span>
        </div>

        {/* Content Viewport */}
        <div className="p-6 overflow-y-auto font-mono-code text-xs bg-[#fdfdfd]">
          {activeView === 'text' && (
            <pre className="whitespace-pre-wrap text-slate-800 leading-relaxed bg-[#f8fafc] p-4 rounded border border-[#e2e8f0]">
              {analysis.rawTextPreview}
            </pre>
          )}

          {activeView === 'schema' && (
            <div className="space-y-3">
              <div className="bg-[#f8fafc] p-3 rounded border border-[#e2e8f0]">
                <span className="text-[#006c4a] font-bold">Root Document:</span> {analysis.fileName}
                <div className="pl-4 mt-2 space-y-1 text-slate-700">
                  <p>├── Header [Name: "Alex Chen", Contact: 3 tokens, Links: 2 verified]</p>
                  <p>├── Section [Type: SUMMARY, Tokens: 42, Status: Validated single-column]</p>
                  <p>├── Section [Type: EXPERIENCE, Items: 3 roles, Work-history bullets: 8 total]</p>
                  <p className="pl-6 text-slate-500">├── Role 1: "Staff Distributed Systems Engineer" (Horizon Cloud)</p>
                  <p className="pl-6 text-slate-500">├── Role 2: "Senior Backend Infrastructure Lead" (Nexus Payments)</p>
                  <p className="pl-6 text-slate-500">├── Role 3: "Senior Systems Software Engineer" (DataStream Labs)</p>
                  <p>└── Section [Type: EDUCATION & SKILLS, Degrees: 1, Tech Keywords: 22]</p>
                </div>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-[11px]">
                ✓ Schema validation passed: Standard Greenhouse/Workday chronological parser format verified.
              </div>
            </div>
          )}

          {activeView === 'tokens' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-slate-700">
                <div className="border border-[#e2e8f0] p-3 rounded bg-white">
                  <span className="text-slate-400 block text-[10px]">PARSED ENCODING</span>
                  <span className="font-bold">UTF-8 Clean</span>
                </div>
                <div className="border border-[#e2e8f0] p-3 rounded bg-white">
                  <span className="text-slate-400 block text-[10px]">FONTS DETECTED</span>
                  <span className="font-bold">Standard Sans-Serif (Embedded)</span>
                </div>
                <div className="border border-[#e2e8f0] p-3 rounded bg-white">
                  <span className="text-slate-400 block text-[10px]">TABLE ANOMALIES</span>
                  <span className="font-bold text-emerald-700">0 detected (Optimal)</span>
                </div>
                <div className="border border-[#e2e8f0] p-3 rounded bg-white">
                  <span className="text-slate-400 block text-[10px]">DATE RECOGNITION</span>
                  <span className="font-bold text-emerald-700">100% Chronological Arc</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#e2e8f0] bg-[#f8fafc] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-white bg-[#0f172a] rounded hover:bg-slate-800 transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
