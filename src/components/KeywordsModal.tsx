import React from 'react';
import { X, Search, CheckCircle2, AlertCircle } from 'lucide-react';

interface KeywordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  keywords: {
    found: string[];
    missing: string[];
  };
}

export const KeywordsModal: React.FC<KeywordsModalProps> = ({
  isOpen,
  onClose,
  keywords,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[85vh] overflow-hidden flex flex-col border border-slate-200">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                Target Role Keyword Tokenizer
              </h3>
              <p className="text-xs text-slate-500">
                Extracted semantic entities & technical keywords from target posting
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Found Keywords */}
          <div>
            <div className="flex items-center gap-2 mb-2.5 text-emerald-800 font-bold uppercase tracking-wider text-[11px]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Matching Keywords Detected in Your Resume ({keywords.found.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.found.map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold"
                >
                  ✓ {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Keywords */}
          <div>
            <div className="flex items-center gap-2 mb-2.5 text-rose-800 font-bold uppercase tracking-wider text-[11px]">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Missing High-Weight Keywords ({keywords.missing.length})</span>
            </div>
            <p className="text-slate-600 mb-3 text-[11px]">
              ATS parsers scan for these exact token patterns. Adding them in relevant projects or coursework yields an immediate score lift.
            </p>
            <div className="flex flex-wrap gap-2">
              {keywords.missing.map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-900 border border-rose-200 font-semibold"
                >
                  + {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Total Entities Checked: {keywords.found.length + keywords.missing.length}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
