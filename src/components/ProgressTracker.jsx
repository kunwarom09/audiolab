'use client';

import React, { useEffect, useState } from 'react';
import { Download, Disc3, FileText, CheckCircle2 } from 'lucide-react';

const YouTubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const STEPS = [
  { label: 'Downloading Reel Audio Stream', icon: Download, duration: 2500 },
  { label: 'Running Shazam Audio Fingerprinting', icon: Disc3, duration: 3500 },
  { label: 'Retrieving Lyrics & Metadata', icon: FileText, duration: 2000 },
  { label: 'Locating Official YouTube Music Video', icon: YouTubeIcon, duration: 2000 },
];

export default function ProgressTracker() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let timer;
    if (currentStep < STEPS.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, STEPS[currentStep].duration);
    }
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="w-full max-w-xl mx-auto glass-panel rounded-2xl p-6 shadow-2xl border border-[var(--border-color)] space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-purple-700 dark:text-purple-300 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-600 dark:bg-purple-400 animate-ping"></div>
          <span>Song Extraction in Progress...</span>
        </h3>
        <div className="flex items-center gap-1">
          <div className="audio-bar"></div>
          <div className="audio-bar"></div>
          <div className="audio-bar"></div>
          <div className="audio-bar"></div>
          <div className="audio-bar"></div>
        </div>
      </div>

      <div className="space-y-4">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isDone = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="flex items-center gap-4">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  isDone
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : isCurrent
                    ? 'bg-purple-600/15 text-purple-700 dark:text-purple-300 border border-purple-500/40 animate-pulse'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-white/5'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1">
                <p
                  className={`text-sm transition-colors ${
                    isDone
                      ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                      : isCurrent
                      ? 'text-[#0072ff] dark:text-cyan-300 font-black'
                      : 'text-[var(--text-secondary)] font-medium'
                  }`}
                >
                  {step.label}
                </p>
                {isCurrent && (
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1 mt-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 h-1 rounded-full animate-pulse w-full"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
