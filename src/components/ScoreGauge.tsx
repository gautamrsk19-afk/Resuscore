import React from 'react';

interface ScoreGaugeProps {
  score: number; // 0 to 100
  size?: number;
  matchRating?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  size = 140,
  matchRating = 'Excellent candidate match',
}) => {
  const strokeWidth = 7;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  // Calculate dash offset based on score (0-100)
  const offset = circumference - (score / 100) * circumference;

  // Color selection based on score threshold
  const getStrokeColor = (val: number) => {
    if (val >= 85) return '#059669'; // Emerald
    if (val >= 75) return '#0d9488'; // Teal
    if (val >= 65) return '#d97706'; // Amber
    return '#e11d48'; // Rose
  };

  const strokeColor = getStrokeColor(score);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg 
          width={size} 
          height={size} 
          className="transform -rotate-90"
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress stroke */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </svg>

        {/* Center score typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
          <span className="font-display font-bold text-4xl text-[#0f172a] tracking-tight leading-none">
            {score}
          </span>
          <span className="text-[12px] font-mono-code text-slate-500 font-medium mt-1">
            / 100
          </span>
        </div>
      </div>

      {/* Match Rating text below */}
      <div className="mt-3 text-center">
        <span className="text-xs font-semibold tracking-tight text-[#006c4a]">
          {matchRating}
        </span>
      </div>
    </div>
  );
};
