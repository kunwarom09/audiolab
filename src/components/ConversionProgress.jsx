'use client';

import React from 'react';
import { Upload, Cpu, Disc3, HardDrive, CheckCircle2 } from 'lucide-react';

export default function ConversionProgress({ progress, status, fileName, fromFormat, toFormat }) {
  const steps = [
    { key: 'uploading', label: 'Uploading input file', icon: Upload },
    { key: 'analyzing', label: 'Analyzing audio codec & sample rate', icon: Cpu },
    { key: 'converting', label: 'Converting audio track (FFmpeg)', icon: Disc3 },
    { key: 'saving', label: 'Storing and signing output file', icon: HardDrive },
  ];

  const getStepStatus = (stepKey) => {
    const statusOrder = ['uploading', 'analyzing', 'converting', 'saving', 'completed'];
    const currentIdx = statusOrder.indexOf(status);
    const stepIdx = statusOrder.indexOf(stepKey);

    if (currentIdx > stepIdx) return 'done';
    if (currentIdx === stepIdx) return 'current';
    return 'pending';
  };

  return (
    <div className="w-full max-w-xl mx-auto glass-panel rounded-3xl p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
        <div>
          <h3 className="text-base font-extrabold text-[var(--text-primary)]">
            Converting File...
          </h3>
          <p className="text-xs text-[var(--text-muted)] truncate max-w-[280px] sm:max-w-md mt-0.5" title={fileName}>
            {fileName}
          </p>
        </div>
        <div className="text-right">
          <span className="text-lg font-black text-[#0088ff]">{progress}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 h-2.5 rounded-full progress-fill-transition"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Steps List */}
      <div className="space-y-4 pt-2">
        {steps.map((step) => {
          const Icon = step.icon;
          const stepStatus = getStepStatus(step.key);

          return (
            <div key={step.key} className="flex items-center gap-4">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  stepStatus === 'done'
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : stepStatus === 'current'
                    ? 'bg-blue-500/15 text-[#0088ff] border border-blue-500/40 animate-pulse'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-white/5'
                }`}
              >
                {stepStatus === 'done' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Icon className={`w-5 h-5 ${stepStatus === 'current' ? 'animate-spin-slow' : ''}`} />
                )}
              </div>

              <div className="flex-1">
                <p
                  className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                    stepStatus === 'done'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : stepStatus === 'current'
                      ? 'text-[#0088ff] font-extrabold'
                      : 'text-[var(--text-secondary)]'
                  }`}
                >
                  {step.label}
                </p>
                {stepStatus === 'current' && (
                  <span className="text-[10px] text-blue-500 font-bold block mt-0.5 animate-pulse">
                    Processing... Please do not close this window
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
