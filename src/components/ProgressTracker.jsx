'use client';

import React, { useEffect, useState } from 'react';
import {
  CheckStrokeIcon,
  DownloadTrayIcon,
  FileTagIcon,
  WaveformIcon,
} from './AudioIcons';

const YouTubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const STEPS = [
  {
    title: 'Input received',
    desc: 'Extracting audio stream from the media source.',
    icon: DownloadTrayIcon,
    pct: 25,
    duration: 1800,
  },
  {
    title: 'Audio fingerprinting',
    desc: 'Generating frequency hashes from the selected segment.',
    icon: WaveformIcon,
    pct: 55,
    duration: 2200,
  },
  {
    title: 'Catalog match',
    desc: 'Comparing fingerprint against the music recognition index.',
    icon: FileTagIcon,
    pct: 80,
    duration: 2000,
  },
  {
    title: 'Fetching metadata and lyrics',
    desc: 'Loading track credits, lyrics, and streaming links.',
    icon: YouTubeIcon,
    pct: 95,
    duration: 1800,
  },
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
    <div className="w-full ui-card space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 gap-4">
        <div className="space-y-1">
          <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-ink)]">
            Identifying Song...
          </h3>
          <p className="text-[length:var(--text-base)] text-[var(--color-muted)]">
            Step {currentStep + 1} of {STEPS.length} — Processing audio stream
          </p>
        </div>

        <span className="px-[20px] py-[12px] rounded-[8px] bg-[var(--color-canvas)] text-[var(--color-accent)] border border-[var(--color-border)] font-bold text-[length:var(--text-base)] tabular-nums shrink-0">
          {displayPct}%
        </span>
      </div>

      <div className="w-full bg-[var(--color-canvas)] border border-[var(--color-border)] rounded-[8px] h-3 overflow-hidden">
        <div
          className="bg-[var(--color-accent)] h-full transition-all duration-500 ease-out"
          style={{ width: `${displayPct}%` }}
        />
      </div>

      <div className="space-y-3">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isDone = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-[8px] border ${
                isCurrent
                  ? 'bg-[var(--color-canvas)] border-[var(--color-accent)]'
                  : isDone
                  ? 'bg-[var(--color-canvas)] border-[var(--color-border)]'
                  : 'bg-[var(--color-surface)] border-[var(--color-border)] opacity-60'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-[8px] flex items-center justify-center shrink-0 border ${
                  isDone || isCurrent
                    ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                    : 'bg-[var(--color-canvas)] text-[var(--color-muted)] border-[var(--color-border)]'
                }`}
              >
                {isDone ? <CheckStrokeIcon className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[length:var(--text-base)] font-bold text-[var(--color-ink)]">
                    {step.title}
                  </p>
                  {isCurrent && (
                    <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-accent)] shrink-0">
                      Active
                    </span>
                  )}
                  {isDone && (
                    <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-muted)] shrink-0">
                      Done
                    </span>
                  )}
                </div>
                <p className="text-[length:var(--text-base)] text-[var(--color-muted)] mt-1">
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
