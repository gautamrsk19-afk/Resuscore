import React from 'react';

interface MetricProgressBarProps {
  label: string;
  value: number; // 0 to 100
  color?: string;
  description?: string;
}

export const MetricProgressBar: React.FC<MetricProgressBarProps> = ({
  label,
  value,
  color = '#006c4a',
  description,
}) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-[#191c1e]">{label}</span>
        <span className="font-mono-code font-semibold text-[#191c1e] tabular-nums">
          {value}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-[#e2e8f0] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${Math.min(100, Math.max(0, value))}%`,
            backgroundColor: color,
          }}
        />
      </div>
      {description && (
        <p className="text-[11px] text-slate-500 leading-tight">{description}</p>
      )}
    </div>
  );
};
