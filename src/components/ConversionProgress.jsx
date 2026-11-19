'use client';

import React from 'react';
import { Upload, Cpu, Disc3, HardDrive, CheckCircle2 } from 'lucide-react';

export default function ConversionProgress({ progress, status, fileName }) {
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
    <div className="w-full ui-card space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
            Converting File...
          </h3>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] truncate mt-1" title={fileName}>
            {fileName}
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[length:var(--text-lead)] font-bold text-[var(--color-brand)] tabular-nums">{progress}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-full h-3 overflow-hidden">
        <div
          className="bg-[var(--color-brand)] h-3 rounded-full progress-fill-transition"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="space-y-4 pt-2">
        {steps.map((step) => {
          const Icon = step.icon;
          const stepStatus = getStepStatus(step.key);

          return (
            <div key={step.key} className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-[12px] flex items-center justify-center shrink-0 border ${
                  stepStatus === 'done'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : stepStatus === 'current'
                    ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)]'
                    : 'bg-[var(--color-bg)] text-[var(--color-text-muted)] border-[var(--color-border)]'
                }`}
              >
                {stepStatus === 'done' ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Icon className={`w-6 h-6 ${stepStatus === 'current' ? 'animate-spin' : ''}`} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-[length:var(--text-base)] font-semibold ${
                    stepStatus === 'done'
                      ? 'text-emerald-700'
                      : stepStatus === 'current'
                      ? 'text-[var(--color-brand)] font-bold'
                      : 'text-[var(--color-text-muted)]'
                  }`}
                >
                  {step.label}
                </p>
                {stepStatus === 'current' && (
                  <span className="text-[length:var(--text-base)] text-[var(--color-brand)] font-semibold block mt-0.5">
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
