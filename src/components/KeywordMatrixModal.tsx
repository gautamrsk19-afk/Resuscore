import React, { useState } from 'react';
import { X, Search, CheckCircle2, AlertCircle, ArrowUpRight, Filter } from 'lucide-react';

interface KeywordMatrixModalProps {
  onClose: () => void;
}

export const KeywordMatrixModal: React.FC<KeywordMatrixModalProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const matrixData = [
    { name: 'React', category: 'Frontend', count: 4, weight: 'High', status: 'Matched', impact: '+4.2%' },
    { name: 'Python', category: 'Backend/AI', count: 6, weight: 'Critical', status: 'Matched', impact: '+8.1%' },
    { name: 'FastAPI', category: 'Backend', count: 2, weight: 'Medium', status: 'Matched', impact: '+3.5%' },
    { name: 'TypeScript', category: 'Frontend', count: 5, weight: 'High', status: 'Matched', impact: '+5.0%' },
    { name: 'Docker', category: 'DevOps', count: 3, weight: 'High', status: 'Matched', impact: '+4.8%' },
    { name: 'PostgreSQL', category: 'Database', count: 2, weight: 'High', status: 'Matched', impact: '+4.0%' },
    { name: 'REST APIs', category: 'Architecture', count: 3, weight: 'Medium', status: 'Matched', impact: '+3.2%' },
    { name: 'System Design', category: 'Architecture', count: 0, weight: 'Critical', status: 'Gap', impact: '+8.4%' },
    { name: 'CI / CD Pipelines', category: 'DevOps', count: 0, weight: 'High', status: 'Gap', impact: '+5.1%' },
    { name: 'Distributed Consensus', category: 'Architecture', count: 0, weight: 'High', status: 'Gap', impact: '+6.0%' },
    { name: 'Kubernetes', category: 'DevOps', count: 4, weight: 'Critical', status: 'Matched', impact: '+7.4%' },
    { name: 'Go / Golang', category: 'Backend', count: 3, weight: 'High', status: 'Matched', impact: '+5.5%' },
    { name: 'Kafka', category: 'Data/Event', count: 2, weight: 'Medium', status: 'Matched', impact: '+3.8%' },
    { name: 'gRPC', category: 'Architecture', count: 2, weight: 'Medium', status: 'Matched', impact: '+3.0%' },
  ];

  const filtered = matrixData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'all' || 
                       (activeCategory === 'matched' && item.status === 'Matched') ||
                       (activeCategory === 'gaps' && item.status === 'Gap');
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-3xl rounded-xl border border-[#e2e8f0] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-white">
          <div>
            <h2 className="font-display font-semibold text-base text-[#0f172a]">
              TF-IDF Keyword & ATS Weight Matrix
            </h2>
            <p className="text-xs text-slate-500">
              Evaluated against 4,120 top-tier candidate postings in your target domain
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="px-6 py-3 border-b border-[#f1f5f9] bg-[#f8fafc] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search keyword or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 bg-white border border-[#cbd5e1] rounded focus:outline-hidden focus:ring-1 focus:ring-[#0f172a]"
            />
          </div>

          <div className="flex items-center gap-1.5">
            {[
              { id: 'all', label: 'All Keywords' },
              { id: 'matched', label: 'Matched (11)' },
              { id: 'gaps', label: 'High-Weight Gaps (3)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  activeCategory === tab.id
                    ? 'bg-[#0f172a] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-[#e2e8f0] hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table list */}
        <div className="p-6 overflow-y-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#e2e8f0] text-[11px] font-mono-code text-slate-400 uppercase">
                <th className="pb-2.5 font-medium">Keyword / Token</th>
                <th className="pb-2.5 font-medium">Domain Area</th>
                <th className="pb-2.5 font-medium">Detected</th>
                <th className="pb-2.5 font-medium">ATS Weight</th>
                <th className="pb-2.5 font-medium text-right">Potential Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filtered.map((item, idx) => {
                const isGap = item.status === 'Gap';
                return (
                  <tr key={idx} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="py-2.5 font-medium text-slate-900 flex items-center gap-2">
                      {isGap ? (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#006c4a] shrink-0" />
                      )}
                      <span>{item.name}</span>
                    </td>
                    <td className="py-2.5 text-slate-500 font-mono-code text-[11px]">
                      {item.category}
                    </td>
                    <td className="py-2.5 font-mono-code">
                      {isGap ? (
                        <span className="text-slate-400">0x (Missing)</span>
                      ) : (
                        <span className="text-emerald-700 font-medium">{item.count}x present</span>
                      )}
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`text-[10px] font-mono-code px-2 py-0.5 rounded border ${
                          item.weight === 'Critical'
                            ? 'bg-rose-50 text-rose-700 border-rose-200 font-bold'
                            : item.weight === 'High'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 font-medium'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {item.weight}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-mono-code font-semibold text-[#006c4a]">
                      {item.impact}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#e2e8f0] bg-[#f8fafc] flex justify-between items-center text-xs">
          <span className="text-slate-500">
            Total Target Match: <strong className="text-slate-900">78.4%</strong> (Goal: &gt; 80% for top 10th percentile)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-white bg-[#0f172a] rounded hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
