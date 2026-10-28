import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, GraduationCap, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface AuthScreenProps {
  onSignIn: (email: string, name: string) => void;
  defaultEmail?: string;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onSignIn,
  defaultEmail = 'Gautam.RSK19@gmail.com',
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const candidateName = email.includes('alex') ? 'Alex Chen' : email.includes('ananya') ? 'Ananya Patel' : 'Gautam R';
    onSignIn(email.trim() || 'Gautam.RSK19@gmail.com', candidateName);
  };

  const handleStudentSSO = () => {
    onSignIn('alex.chen@university.edu', 'Alex Chen');
  };

  const handleSocialLogin = (provider: string) => {
    onSignIn(email.trim() || defaultEmail, 'Alex Chen');
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f9ff] flex items-stretch">
      {/* Left Column: Form & Brand */}
      <div className="w-full lg:w-[54%] bg-white p-6 sm:p-12 lg:p-16 flex flex-col justify-between shadow-lg z-10">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 mb-10">
            <div className="flex items-center gap-2">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1V-3fVqtAn4qu-wPIcLl6vHFNbjN4eo7P8Wzyh9R4Y-I6oJzYUh2bEOuAeeUJ8rHgLI1Pr8WqbhvvWaxTlwrRIujHDnHDEFxsPv0umSyW6UI6ifxbzkO8PVqqo1SR8hSLqRbfYS9CCEsuLIf6Siunw3_cGRuJFRYIceXEK_fWaHda0IbQpbBOTsk7ab5uztTzVG1niullRLJHBgOkjSYbNZXtvhKxwrsSAHa5fFMdfCxCdmRVah-X3jYz4"
                alt="ResuScore"
                className="h-8 w-auto object-contain"
              />
              <span className="font-extrabold text-2xl tracking-tight text-[#0b1c30] font-['Plus_Jakarta_Sans']">
                ResuScore
              </span>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-[#eff4ff] text-[#372abf] rounded-full border border-[#d3e4fe] uppercase tracking-wider font-mono">
              V2.4 CANDIDATE EDITION
            </span>
          </div>

          {/* Heading */}
          <div className="max-w-xl mb-8">
            <span className="text-xs font-bold text-[#372abf] tracking-wider uppercase block mb-2 font-['Inter']">
              The AI Resume Scorer Built For College Students
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] leading-tight font-extrabold text-[#0b1c30] tracking-tight font-['Plus_Jakarta_Sans'] mb-3">
              Land more interviews this recruiting season.
            </h1>
            <p className="text-slate-600 text-base sm:text-lg">
              Check your ATS match rate against any job description in 30 seconds.
            </p>
          </div>

          {/* Student Single Sign-On Banner */}
          <div className="max-w-xl mb-4">
            <button
              onClick={handleStudentSSO}
              type="button"
              className="w-full p-4 rounded-xl bg-[#f0f4ff] hover:bg-[#e5eeff] border border-[#c3c0ff] transition-all flex items-center justify-between group shadow-sm text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-indigo-700 text-white flex items-center justify-center shadow-sm">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0b1c30] group-hover:text-indigo-800 transition-colors">
                    Continue with Student Email (.edu)
                  </div>
                  <div className="text-xs text-slate-500">
                    Instant institutional single sign-on
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-[#6cf8bb] text-[#005236] rounded-full uppercase tracking-wider shadow-xs whitespace-nowrap">
                ✓ Free Pro For Students
              </span>
            </button>
          </div>

          {/* Social Sign-in Buttons */}
          <div className="max-w-xl grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="py-2.5 px-4 rounded-lg bg-[#eff4ff] hover:bg-[#e2e8f0] text-slate-800 text-sm font-semibold border border-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              <span className="w-4 h-4 rounded-full bg-indigo-700 text-white flex items-center justify-center text-[10px] font-bold">G</span>
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('GitHub')}
              className="py-2.5 px-4 rounded-lg bg-[#eff4ff] hover:bg-[#e2e8f0] text-slate-800 text-sm font-semibold border border-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              <span className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">⌘</span>
              <span>GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="max-w-xl flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              Or continue with work/personal email
            </span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.chen@alumni.edu"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f8f9ff] border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs font-semibold text-indigo-700 hover:text-indigo-800">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#f8f9ff] border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 text-xs font-medium text-slate-700 cursor-pointer">
                Remember this device for 30 days
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>Sign In to ResuScore</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Footer University Trust */}
        <div className="mt-12 pt-6 border-t border-slate-100 max-w-xl">
          <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2 font-['Inter']">
            Trusted by students across 400+ universities
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-600">
            <span>Stanford</span>
            <span>•</span>
            <span>MIT</span>
            <span>•</span>
            <span>UC Berkeley</span>
            <span>•</span>
            <span>NYU</span>
            <span>•</span>
            <span>Carnegie Mellon</span>
          </div>
        </div>
      </div>

      {/* Right Column: Hero Visual, Scorecard Preview & Testimonials */}
      <div className="hidden lg:flex lg:w-[46%] bg-[#2a14b4] text-white p-10 xl:p-14 flex-col justify-between relative overflow-hidden">
        {/* Background Dot Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Top Header Tag */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#2a14b4] text-xs font-bold shadow-sm">
            <Zap className="w-3.5 h-3.5 fill-current text-[#2a14b4]" />
            <span>Live Parsing Engine</span>
          </div>
          <span className="text-xs font-bold tracking-wider text-indigo-200 uppercase font-mono">
            Fall 2025 Cycle
          </span>
        </div>

        {/* Central Display Card */}
        <div className="relative z-10 my-auto py-6 space-y-4">
          {/* Target Job Header Tag */}
          <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-emerald-300">description</span>
              <div>
                <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider block">Target Job Posting</span>
                <span className="text-sm font-bold text-white">Stripe • SWE Intern (Backend)</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold text-white">
              Match active
            </span>
          </div>

          {/* Main White Score Preview Card */}
          <div className="bg-white rounded-2xl p-6 text-[#0b1c30] shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  ATS Benchmark Score
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-5xl font-extrabold text-[#0b1c30] font-['Plus_Jakarta_Sans'] tracking-tight">
                    88
                  </span>
                  <span className="text-lg font-bold text-slate-600">/100</span>
                </div>
              </div>

              {/* Circular Gauge Graphic */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 44 44">
                  <circle
                    className="text-slate-100 stroke-current"
                    cx="22"
                    cy="22"
                    fill="transparent"
                    r="18"
                    strokeWidth="4"
                  />
                  <circle
                    className="text-emerald-500 stroke-current"
                    cx="22"
                    cy="22"
                    fill="transparent"
                    r="18"
                    strokeWidth="4"
                    strokeDasharray="113.1"
                    strokeDashoffset="13.5"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Score Lift Pill */}
            <div className="mt-4 p-3 rounded-xl bg-[#eff4ff] flex items-center gap-3 border border-indigo-50">
              <span className="w-8 h-8 rounded-full bg-[#6cf8bb] text-[#005236] font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                +24
              </span>
              <p className="text-xs text-slate-700 leading-snug">
                <strong className="text-slate-900">+24 pts</strong> after fixing quantified impact verbs in experience bullets.
              </p>
            </div>

            {/* Critical Keyword Audits */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  Critical Keyword Audits
                </span>
                <span className="text-[11px] font-bold text-emerald-600">
                  4 Missing Added
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded bg-[#eff4ff] text-slate-700 font-semibold text-xs">
                  Distributed Systems
                </span>
                <span className="px-2.5 py-1 rounded bg-[#eff4ff] text-slate-700 font-semibold text-xs">
                  Go / Python
                </span>
                <span className="px-2.5 py-1 rounded bg-[#6cf8bb] text-[#005236] font-bold text-xs">
                  CI/CD Pipelines
                </span>
                <span className="px-2.5 py-1 rounded bg-[#eff4ff] text-slate-700 font-semibold text-xs">
                  Kafka
                </span>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
            <div className="flex items-center gap-1 text-amber-300 text-sm mb-1.5">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <p className="text-xs italic text-indigo-100 leading-relaxed mb-2">
              "Fixed my resume the night before the university career fair and got 3 recruiter phone screens the following week."
            </p>
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-white">Computer Science Junior</span>
              <span className="text-indigo-200">UC Berkeley • Class of '26</span>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof Metrics */}
        <div className="relative z-10 grid grid-cols-3 gap-2 text-center pt-4 border-t border-white/15">
          <div className="p-2.5 rounded-lg bg-white/5">
            <div className="text-lg font-extrabold text-white font-['Plus_Jakarta_Sans']">4.8/5</div>
            <div className="text-[10px] uppercase font-bold text-indigo-200 mt-0.5">Student Rating</div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/5">
            <div className="text-lg font-extrabold text-white font-['Plus_Jakarta_Sans']">250k+</div>
            <div className="text-[10px] uppercase font-bold text-indigo-200 mt-0.5">Resumes Scored</div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/5">
            <div className="text-lg font-extrabold text-white font-['Plus_Jakarta_Sans']">92%</div>
            <div className="text-[10px] uppercase font-bold text-indigo-200 mt-0.5">ATS Pass Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};
