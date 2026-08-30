'use client';

import React from 'react';
import { 
  HelpCircle, 
  RotateCcw, 
  UploadCloud, 
  Mic, 
  Search, 
  VolumeX, 
  Radio, 
  Sliders, 
  Info,
  ArrowRight
} from 'lucide-react';

export default function FailedRecognitionCard({ 
  message, 
  mediaInfo, 
  onRetrySection, 
  onSwitchToUpload, 
  onSwitchToRecord,
  onReset 
}) {
  const canRetrySection = mediaInfo?.can_retry_different_section || (mediaInfo?.total_duration && mediaInfo.total_duration > 20);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6 animate-in fade-in duration-300">
      
      {/* Header with clear message */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0">
          <Radio className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-[var(--text-primary)] tracking-tight">
            {message || "We couldn't identify the song from this section."}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            The acoustic fingerprint didn&apos;t match indexed tracks in the recognition catalog. This is common when background dialogue, ambient noise, or custom edits obscure the melody.
          </p>
        </div>
      </div>

      {/* Common Reasons Section */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-primary)]">
          <Info className="w-4 h-4 text-blue-500" />
          <span>Why this might happen:</span>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--text-secondary)] pl-1">
          <li className="flex items-start gap-2">
            <span className="text-[var(--iloveaudios-red)] font-bold">•</span>
            <span>Voices or laughter overlap the audio</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--iloveaudios-red)] font-bold">•</span>
            <span>Slowed, reverbed, or pitch-shifted remix</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--iloveaudios-red)] font-bold">•</span>
            <span>Music snippet is shorter than 5 seconds</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--iloveaudios-red)] font-bold">•</span>
            <span>Unreleased track or royalty-free sound</span>
          </li>
        </ul>
      </div>

      {/* Actionable Recovery Options */}
      <div className="space-y-3 pt-1">
        <h4 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)]">
          Try These Recovery Options
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {canRetrySection && (
            <button
              type="button"
              onClick={onRetrySection}
              className="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-left flex items-center justify-between gap-3 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-[var(--text-primary)]">Try Another Section</p>
                  <p className="text-[11px] text-[var(--text-muted)]">Sample a different timestamp</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          <button
            type="button"
            onClick={onSwitchToUpload}
            className="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-left flex items-center justify-between gap-3 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <UploadCloud className="w-4 h-4 text-blue-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">Upload Clearer Clip</p>
                <p className="text-[11px] text-[var(--text-muted)]">Upload MP4, MP3 or WAV</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onSwitchToRecord}
            className="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-left flex items-center justify-between gap-3 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <Mic className="w-4 h-4 text-emerald-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">Record Live Music</p>
                <p className="text-[11px] text-[var(--text-muted)]">Use browser microphone</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onReset}
            className="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-left flex items-center justify-between gap-3 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-[var(--iloveaudios-red)] shrink-0" />
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">Find Another Song</p>
                <p className="text-[11px] text-[var(--text-muted)]">Start a new search</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
