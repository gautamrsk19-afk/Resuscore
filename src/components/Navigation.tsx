import React, { useState } from 'react';
import { LogOut, CheckCircle, FileText, Settings, ShieldCheck } from 'lucide-react';

interface NavigationProps {
  activeTab: 'analyze' | 'history' | 'benchmarks';
  setActiveTab: (tab: 'analyze' | 'history' | 'benchmarks') => void;
  onOpenGuide: () => void;
  userEmail: string;
  onSignOut: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  onOpenGuide,
  userEmail,
  onSignOut,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="border-b border-[#e2e8f0] bg-white sticky top-0 z-40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Left Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('analyze')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-md bg-[#0f172a] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <svg 
                className="w-4 h-4 text-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <span className="font-display font-semibold text-lg tracking-tight text-[#0f172a]">
              ResuScore
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('analyze')}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'analyze'
                  ? 'bg-[#eceef0] text-[#0f172a] shadow-xs'
                  : 'text-[#45464d] hover:text-[#0f172a] hover:bg-[#f2f4f6]'
              }`}
            >
              Analyze
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'history'
                  ? 'bg-[#eceef0] text-[#0f172a] shadow-xs'
                  : 'text-[#45464d] hover:text-[#0f172a] hover:bg-[#f2f4f6]'
              }`}
            >
              Score History
            </button>

            <button
              onClick={() => setActiveTab('benchmarks')}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'benchmarks'
                  ? 'bg-[#eceef0] text-[#0f172a] shadow-xs'
                  : 'text-[#45464d] hover:text-[#0f172a] hover:bg-[#f2f4f6]'
              }`}
            >
              Benchmarks
            </button>
          </nav>
        </div>

        {/* Right Zone: User Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-full focus:outline-hidden focus:ring-2 focus:ring-[#0f172a]/20 transition-all p-0.5"
            title="Candidate Profile"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#cbd5e1] shadow-xs bg-[#e9f2ed] flex items-center justify-center text-xs font-semibold text-[#17644e]">
              {userEmail.charAt(0).toUpperCase()}
            </div>
          </button>

          {profileOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setProfileOpen(false)} 
              />
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg border border-[#e2e8f0] shadow-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-[#f1f5f9]">
                  <p className="text-xs font-semibold text-[#0f172a] truncate">{userEmail}</p>
                  <p className="text-xs text-slate-500">Signed in</p>
                  <span className="inline-block mt-1 font-mono-code text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ATS V4.2 Pro Pipeline
                  </span>
                </div>
                
                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveTab('analyze');
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-[#f8fafc] flex items-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    Active Resume Diagnostic
                  </button>
                  <button
                    onClick={() => {
                      onOpenGuide();
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-[#f8fafc] flex items-center gap-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                    ATS Compliance Guide
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('benchmarks');
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-[#f8fafc] flex items-center gap-2"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-slate-500" />
                    Verified Benchmark Calibration
                  </button>
                </div>

                <div className="border-t border-[#f1f5f9] pt-1">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      onSignOut();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-600 hover:bg-[#f8fafc] flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
