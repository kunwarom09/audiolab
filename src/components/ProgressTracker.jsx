'use client';

import React, { useEffect, useState } from 'react';
import { Download, Disc3, FileText, CheckCircle2, Sparkles, Radio } from 'lucide-react';

const YouTubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const STEPS = [
  {
    title: 'Connecting & Demuxing Audio Stream',
    desc: 'Extracting clean audio track from the provided video URL',
    icon: Download,
    pct: 25,
    duration: 2000
  },
  {
    title: 'Acoustic Fingerprinting (Shazam AI Engine)',
    desc: 'Generating frequency spectrum and landmark hash fingerprint',
    icon: Radio,
    pct: 55,
    duration: 2500
  },
  {
    title: 'Matching Song Metadata & Line-by-Line Lyrics',
    desc: 'Querying global music catalogs and synchronized lyrics database',
    icon: FileText,
    pct: 80,
    duration: 2000
  },
  {
    title: 'Locating Official YouTube Video & MP3 Stream',
    desc: 'Assembling high-definition video embed and high-bitrate audio',
    icon: YouTubeIcon,
    pct: 95,
    duration: 2000
  }
];

export default function ProgressTracker() {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayPct, setDisplayPct] = useState(15);

  useEffect(() => {
    let timer;
    if (currentStep < STEPS.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, STEPS[currentStep].duration);
    }
    return () => clearTimeout(timer);
  }, [currentStep]);

  useEffect(() => {
    const targetPct = STEPS[currentStep].pct;
    const interval = setInterval(() => {
      setDisplayPct((prev) => {
        if (prev < targetPct) return prev + 1;
        return prev;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      
      {/* Header Banner with Status & Percentage */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--audiolab-red)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--audiolab-red)]"></span>
            </span>
            <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>Finding & Extracting Song...</span>
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
            </h3>
          </div>
          <p className="text-xs text-[var(--text-muted)] font-medium">
            Step {currentStep + 1} of {STEPS.length} — Processing audio stream
          </p>
        </div>

        {/* Dynamic Progress Percentage Badge & Waveform */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1">
            <div className="audio-bar" style={{ animationDelay: '0.1s' }}></div>
            <div className="audio-bar" style={{ animationDelay: '0.3s' }}></div>
            <div className="audio-bar" style={{ animationDelay: '0.2s' }}></div>
            <div className="audio-bar" style={{ animationDelay: '0.4s' }}></div>
            <div className="audio-bar" style={{ animationDelay: '0.15s' }}></div>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-red-500/10 text-[var(--audiolab-red)] border border-red-500/20 font-black text-sm tabular-nums">
            {displayPct}%
          </span>
        </div>
      </div>

      {/* Main Overall Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800/80 rounded-full h-2 overflow-hidden shadow-inner">
        <div 
          className="bg-gradient-to-r from-[var(--audiolab-red)] via-rose-500 to-amber-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${displayPct}%` }}
        ></div>
      </div>

      {/* Step Breakdown */}
      <div className="space-y-4 pt-1">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isDone = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={index}
              className={`flex items-start gap-4 p-3.5 rounded-2xl transition-all ${
                isCurrent
                  ? 'bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 shadow-xs'
                  : isDone
                  ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/15'
                  : 'bg-transparent border border-transparent opacity-50'
              }`}
            >
              {/* Step Icon Badge */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                  isDone
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : isCurrent
                    ? 'bg-[var(--audiolab-red)] text-white shadow-md shadow-red-500/20 animate-pulse'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>

              {/* Step Content Details */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`text-xs sm:text-sm font-bold tracking-tight transition-colors ${
                      isDone
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : isCurrent
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {step.title}
                  </p>
                  {isCurrent && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-500/10 text-[var(--audiolab-red)] border border-red-500/20 shrink-0">
                      Active
                    </span>
                  )}
                  {isDone && (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                      Done
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[var(--text-muted)] font-medium leading-relaxed mt-0.5 truncate sm:whitespace-normal">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
