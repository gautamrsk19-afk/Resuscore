import React, { useState } from 'react';
import { UserProfile } from '../data/mockData';
import { Mail, Bell, Sparkles, LogOut, ChevronDown, Check } from 'lucide-react';

interface HeaderProps {
  currentTab: 'dashboard' | 'email-view' | 'resume-studio' | 'saved-jobs';
  onSelectTab: (tab: 'dashboard' | 'email-view' | 'resume-studio' | 'saved-jobs') => void;
  user: UserProfile;
  onUpdateEmail: (newEmail: string) => void;
  onSignOut: () => void;
  isInboxFrame?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  user,
  onUpdateEmail,
  onSignOut,
  isInboxFrame = false,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState(user.email);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempEmail.trim()) {
      onUpdateEmail(tempEmail.trim());
      setIsEditingEmail(false);
    }
  };

  return (
    <header className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and Product Label */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg p-1"
          >
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1V-3fVqtAn4qu-wPIcLl6vHFNbjN4eo7P8Wzyh9R4Y-I6oJzYUh2bEOuAeeUJ8rHgLI1Pr8WqbhvvWaxTlwrRIujHDnHDEFxsPv0umSyW6UI6ifxbzkO8PVqqo1SR8hSLqRbfYS9CCEsuLIf6Siunw3_cGRuJFRYIceXEK_fWaHda0IbQpbBOTsk7ab5uztTzVG1niullRLJHBgOkjSYbNZXtvhKxwrsSAHa5fFMdfCxCdmRVah-X3jYz4"
              alt="ResuScore Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="font-extrabold text-xl tracking-tight text-[#0b1c30] font-['Plus_Jakarta_Sans']">
              ResuScore
            </span>
          </button>

          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#c7c4d7]"></span>

          {isInboxFrame ? (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#464554] bg-[#eff4ff] px-2.5 py-1 rounded-md border border-[#d3e4fe]">
              <Mail className="w-3.5 h-3.5 text-indigo-600" />
              Student Inbox Frame
            </span>
          ) : (
            <span className="hidden sm:inline-block text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-wider">
              Student Beta
            </span>
          )}
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-[#eff4ff]'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onSelectTab('email-view')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              currentTab === 'email-view'
                ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-[#eff4ff]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Email View
          </button>
          <button
            onClick={() => onSelectTab('resume-studio')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              currentTab === 'resume-studio'
                ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-[#eff4ff]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Resume Studio
          </button>
          <button
            onClick={() => onSelectTab('saved-jobs')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'saved-jobs'
                ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-[#eff4ff]'
            }`}
          >
            Saved Jobs
          </button>
        </nav>

        {/* Action Controls & User Account */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('dashboard')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <span>+ Scan New Resume</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationToast(!showNotificationToast)}
              className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-[#eff4ff] relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </button>

            {showNotificationToast && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900 uppercase">Recent Activity</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">Live Dispatch</span>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="p-2 rounded-lg bg-[#eff4ff] text-xs">
                    <p className="font-semibold text-slate-800">Scorecard dispatched to your inbox</p>
                    <p className="text-slate-500 text-[11px] mt-0.5 truncate">To: {user.email}</p>
                    <span className="text-[10px] text-slate-400">Just now</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 text-xs">
                    <p className="font-semibold text-slate-800">Collegiate ATS benchmark updated</p>
                    <p className="text-slate-500 text-[11px]">Datadog Fall SWE cohort active</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
            >
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-[#0b1c30] leading-tight truncate max-w-[120px]">
                  {user.name}
                </div>
                <div className="text-[11px] text-slate-500 truncate max-w-[130px]">
                  {user.email}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-indigo-700 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {user.name.split(' ').map(n => n[0]).join('') || 'AC'}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 text-left">
                <div className="p-2 bg-[#f8f9ff] rounded-lg mb-2">
                  <p className="text-xs font-bold text-slate-900">{user.name}</p>
                  <p className="text-xs text-indigo-600 font-mono break-all">{user.email}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{user.university} • {user.gradYear}</p>
                </div>

                {isEditingEmail ? (
                  <form onSubmit={handleSaveEmail} className="p-2 bg-slate-50 rounded-lg mb-2">
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Target Email Address for Scorecards:
                    </label>
                    <input
                      type="email"
                      value={tempEmail}
                      onChange={(e) => setTempEmail(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white text-slate-900 mb-2 focus:ring-2 focus:ring-indigo-600 outline-none"
                      placeholder="e.g. Gautam.RSK19@gmail.com"
                      autoFocus
                      required
                    />
                    <div className="flex justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setIsEditingEmail(false)}
                        className="text-[11px] px-2 py-1 text-slate-600 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-[11px] px-2.5 py-1 bg-indigo-600 text-white rounded font-medium flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => {
                      setTempEmail(user.email);
                      setIsEditingEmail(true);
                    }}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-md flex items-center justify-between"
                  >
                    <span>Change Target Email</span>
                    <span className="text-[10px] text-indigo-600 font-semibold">Edit</span>
                  </button>
                )}

                <div className="my-1 border-t border-slate-100"></div>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onSignOut();
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-md flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out / Switch Account</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
