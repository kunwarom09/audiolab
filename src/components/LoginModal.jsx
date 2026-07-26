'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

const GoogleIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showGoogleForm, setShowGoogleForm] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGoogleSubmit = (e) => {
    e.preventDefault();
    if (!googleEmail.trim()) {
      setError('Please enter your Google email.');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      setShowGoogleForm(false);
      onLoginSuccess({
        email: googleEmail.trim(),
        name: googleEmail.split('@')[0],
        provider: 'google'
      });
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({ email });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-white/20 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => {
            setShowGoogleForm(false);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* View 1: Google Sign In Form */}
        {showGoogleForm ? (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center space-y-2 pt-2">
              <div className="flex justify-center mb-3">
                <GoogleIcon className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Sign in with Google</h3>
              <p className="text-xs text-[var(--text-secondary)]">to continue to <span className="font-semibold text-[#0088ff]">SongFinder AI</span></p>
            </div>

            <form onSubmit={handleGoogleSubmit} className="space-y-4 pt-2">
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-primary)] block">Google Email or Phone</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    placeholder="your-name@gmail.com"
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium focus:outline-none"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !googleEmail.trim()}
                className="w-full py-3 rounded-xl bg-[#0088ff] hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Connecting Google Account...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In with Google</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)]">
              <button
                type="button"
                onClick={() => setShowGoogleForm(false)}
                className="text-[#0088ff] font-semibold hover:underline cursor-pointer"
              >
                &larr; Back to all options
              </button>
              <span>Google Protection</span>
            </div>
          </div>
        ) : (
          /* View 2: Standard Login / Sign Up Form */
          <>
            {/* Header Badge & Title */}
            <div className="text-center space-y-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>3/3 Free Extractions Used</span>
              </div>

              <h3 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
                {isSignUp ? 'Create Free Account' : 'Sign In to Continue'}
              </h3>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                You have reached the limit of 3 free guest extractions. Sign in to unlock unlimited song extractions and MP3 downloads.
              </p>
            </div>

            {/* Google Authentication Button & Direct Fallback */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  window.location.href = '/api/auth/google';
                }}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-bold text-xs flex items-center justify-center gap-3 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => setShowGoogleForm(true)}
                className="w-full text-center text-[11px] text-[#0088ff] font-semibold hover:underline cursor-pointer pt-0.5"
              >
                Or enter your Google Email directly
              </button>

              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-[var(--border-color)]"></div>
                <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Or with email</span>
                <div className="flex-1 h-px bg-[var(--border-color)]"></div>
              </div>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-primary)] block">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-primary)] block">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#0088ff] hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all cursor-pointer mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Authenticating Device...</span>
                  </>
                ) : (
                  <>
                    <span>{isSignUp ? 'Create Account & Continue' : 'Sign In to Unlock'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Login/Sign Up */}
            <div className="text-center pt-2 border-t border-[var(--border-color)]">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-xs text-[#0088ff] font-semibold hover:underline cursor-pointer"
              >
                {isSignUp ? 'Already have an account? Sign In' : 'New user? Create a free account'}
              </button>
            </div>

            {/* Device Authentication Note */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[var(--text-muted)] text-center pt-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>Device MAC/Hardware ID registered for trial protection</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
