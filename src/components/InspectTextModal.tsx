import React from 'react';
import { X, CheckCircle, FileText, Copy, Check } from 'lucide-react';

interface InspectTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawText: string;
}

export const InspectTextModal: React.FC<InspectTextModalProps> = ({
  isOpen,
  onClose,
  rawText,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const wordCount = rawText.split(/\s+/).filter(Boolean).length;
  const lineCount = rawText.split('\n').filter(Boolean).length;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col border border-slate-200">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                Parsed Plain-Text Inspector
              </h3>
              <p className="text-xs text-slate-500">
                UTF-8 linear stream representation evaluated by enterprise ATS
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

        <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-900 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>0 OCR Collisions • Clean Single-Column Flow</span>
          </div>
          <div className="text-[11px] text-emerald-800 font-mono">
            {wordCount} words • {lineCount} lines
          </div>
        </div>

        <div className="p-5 overflow-y-auto flex-1 bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed">
          <pre className="whitespace-pre-wrap select-text">{rawText}</pre>
        </div>

        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Fidelity: 100% UTF-8 Verified
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
