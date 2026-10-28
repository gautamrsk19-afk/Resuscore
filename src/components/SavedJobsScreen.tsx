import React from 'react';
import { sampleJobPresets } from '../data/mockData';
import { Bookmark, ExternalLink, ArrowRight, Building2, MapPin } from 'lucide-react';

interface SavedJobsScreenProps {
  onScanJob: (job: typeof sampleJobPresets[0]) => void;
}

export const SavedJobsScreen: React.FC<SavedJobsScreenProps> = ({ onScanJob }) => {
  return (
    <div className="w-full bg-[#f8f9ff] py-8 px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0b1c30] font-['Plus_Jakarta_Sans']">
              Saved University Jobs & Benchmarks
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Track target postings and quickly trigger comparative ATS scans.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
            {sampleJobPresets.length} Tracked Roles
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleJobPresets.map((job) => (
            <div
              key={job.company}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {job.company[0]}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                        {job.jobTitle}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1 font-semibold text-slate-700">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          {job.company}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {job.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Bookmark className="w-4 h-4 text-indigo-600 fill-indigo-100" />
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.keywordsFound.slice(0, 3).map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold"
                    >
                      {kw}
                    </span>
                  ))}
                  {job.keywordsMissing.slice(0, 2).map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-semibold"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono font-medium text-slate-500">
                  {job.seniority}
                </span>
                <button
                  type="button"
                  onClick={() => onScanJob(job)}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>Scan Resume Against Spec</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
