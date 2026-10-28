import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, FileCheck2, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';

interface AuthPageProps {
  onAuthenticated: (payload: {
    email: string;
    password: string;
    name?: string;
    mode: 'signin' | 'signup';
  }) => Promise<void>;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthenticated }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignup = mode === 'signup';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (isSignup && password.length < 8) {
      setError('Use at least 8 characters for your password.');
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setError('Those passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      await onAuthenticated({
        email: email.trim().toLowerCase(),
        password,
        name: name.trim(),
        mode,
      });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7f5] text-[#191c1e] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.88fr)]">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#103b32] px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
        <div className="absolute -right-24 -top-28 h-[460px] w-[460px] rounded-full border border-white/10" />
        <div className="absolute -right-10 -top-14 h-[330px] w-[330px] rounded-full border border-white/10" />
        <div className="absolute bottom-20 right-16 h-48 w-48 rounded-full bg-[#d4e8a8]/10 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#d4e8a8] text-[#103b32]">
            <FileCheck2 className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-semibold">ResuScore</span>
        </div>

        <div className="relative max-w-xl py-16">
          <p className="mb-5 font-mono-code text-xs uppercase tracking-[0.18em] text-[#d4e8a8]">RESUME DIAGNOSTICS</p>
          <h1 className="font-display max-w-lg text-5xl font-semibold leading-[1.08] xl:text-6xl">
            Make your next move count.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/70">
            Get a clearer read on how your resume performs, then make every revision more intentional.
          </p>

          <div className="mt-12 max-w-md border-t border-white/20 pt-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d4e8a8]" />
              <div>
                <p className="text-sm font-medium">Your workspace, ready when you are</p>
                <p className="mt-1 text-sm leading-6 text-white/60">Continue to resume upload, diagnostics, and score history.</p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative text-xs text-white/45">© 2025 ResuScore Labs</p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-[420px]">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#103b32] text-white">
              <FileCheck2 className="h-4 w-4" />
            </div>
            <span className="font-display text-lg font-semibold text-[#103b32]">ResuScore</span>
          </div>

          <div className="mb-8">
            <p className="font-mono-code text-[11px] uppercase tracking-[0.14em] text-[#527166]">
              {isSignup ? 'START YOUR WORKSPACE' : 'WELCOME BACK'}
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-[#14231e]">
              {isSignup ? 'Create your account' : 'Sign in to ResuScore'}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {isSignup ? 'Set up your account to start reviewing your resume.' : 'Enter your details to continue to your resume workspace.'}
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 border-b border-[#d9e1dc]" role="tablist" aria-label="Account access">
            <button
              type="button"
              role="tab"
              aria-selected={!isSignup}
              onClick={() => { setMode('signin'); setError(''); }}
              className={`border-b-2 px-3 py-3 text-sm font-medium transition-colors ${!isSignup ? 'border-[#17644e] text-[#17644e]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Sign in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isSignup}
              onClick={() => { setMode('signup'); setError(''); }}
              className={`border-b-2 px-3 py-3 text-sm font-medium transition-colors ${isSignup ? 'border-[#17644e] text-[#17644e]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-[#303a36]">Full name</span>
                <input
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="h-11 w-full rounded-md border border-[#cbd5cf] bg-white px-3 text-sm outline-none transition focus:border-[#17644e] focus:ring-2 focus:ring-[#17644e]/15"
                />
              </label>
            )}

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-[#303a36]">Email address</span>
              <span className="relative block">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-md border border-[#cbd5cf] bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#17644e] focus:ring-2 focus:ring-[#17644e]/15"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-[#303a36]">Password</span>
              <span className="relative block">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                  required
                  minLength={isSignup ? 8 : undefined}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={isSignup ? 'At least 8 characters' : 'Enter your password'}
                  className="h-11 w-full rounded-md border border-[#cbd5cf] bg-white pl-10 pr-11 text-sm outline-none transition focus:border-[#17644e] focus:ring-2 focus:ring-[#17644e]/15"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>

            {isSignup && (
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-[#303a36]">Confirm password</span>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Re-enter your password"
                  className="h-11 w-full rounded-md border border-[#cbd5cf] bg-white px-3 text-sm outline-none transition focus:border-[#17644e] focus:ring-2 focus:ring-[#17644e]/15"
                />
              </label>
            )}

            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#17644e] px-4 text-sm font-semibold text-white transition hover:bg-[#104f3d] focus:outline-none focus:ring-2 focus:ring-[#17644e]/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (isSignup ? 'Creating account...' : 'Signing in...') : isSignup ? 'Create account' : 'Sign in'}
              {!isSubmitting && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            </button>
          </form>

          <p className="mt-6 border-l-2 border-[#d4e8a8] pl-3 text-xs leading-5 text-slate-500">
            Authentication is connected to the local ResuScore database. Use an email and password to sign in or create an account.
          </p>
        </div>
      </section>
    </main>
  );
};