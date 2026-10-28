import React from 'react';
import { CheckCircle2, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

interface FeedbackCardProps {
  strengths: string[];
  fixes: string[];
  parserSignal: string;
  itemsValidated: number;
  estimatedUplift: string;
  onFixClick?: (fix: string) => void;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  strengths,
  fixes,
  parserSignal,
  itemsValidated,
  estimatedUplift,
  onFixClick,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {/* Key Strengths Card */}
      <div className="bg-[#f8fafc] rounded-lg border border-[#e2e8f0] p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3.5">
            <CheckCircle2 className="w-4 h-4 text-[#006c4a]" />
            <h3 className="font-display font-semibold text-sm text-[#0f172a]">
              Key Strengths
            </h3>
          </div>

          <ul className="space-y-3">
            {strengths.map((item, idx) => {
              const colonIndex = item.indexOf(':');
              const title = colonIndex !== -1 ? item.substring(0, colonIndex + 1) : '';
              const desc = colonIndex !== -1 ? item.substring(colonIndex + 1) : item;

              return (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c4a] mt-1.5 shrink-0" />
                  <span>
                    {title && <span className="font-semibold text-slate-900">{title}</span>}
                    {desc}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-5 pt-3.5 border-t border-[#e2e8f0] flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-500">
            <span>Parser signal:</span>
            <span className="font-medium text-slate-900">{parserSignal}</span>
          </div>
          <div className="font-mono-code font-medium text-[#006c4a]">
            {itemsValidated} items validated
          </div>
        </div>
      </div>

      {/* Priority Fixes Card */}
      <div className="bg-[#f8fafc] rounded-lg border border-[#e2e8f0] p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3.5">
            <SlidersHorizontal className="w-4 h-4 text-slate-700" />
            <h3 className="font-display font-semibold text-sm text-[#0f172a]">
              Priority Fixes
            </h3>
          </div>

          <ul className="space-y-3">
            {fixes.map((item, idx) => {
              const colonIndex = item.indexOf(':');
              const title = colonIndex !== -1 ? item.substring(0, colonIndex + 1) : '';
              const desc = colonIndex !== -1 ? item.substring(colonIndex + 1) : item;

              return (
                <li 
                  key={idx} 
                  onClick={() => onFixClick?.(item)}
                  className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed cursor-pointer hover:bg-white p-1 rounded transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-[#0f172a] mt-1.5 shrink-0" />
                  <span>
                    {title && <span className="font-semibold text-slate-900">{title}</span>}
                    {desc}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-5 pt-3.5 border-t border-[#e2e8f0] flex items-center justify-between text-[11px]">
          <span className="text-slate-500">Estimated uplift</span>
          <span className="font-mono-code font-bold text-[#0f172a]">
            {estimatedUplift}
          </span>
        </div>
      </div>
    </div>
  );
};
