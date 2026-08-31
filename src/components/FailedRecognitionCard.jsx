'use client';

import React, { useState } from 'react';
import { 
  RotateCcw, 
  UploadCloud, 
  Mic, 
  Radio, 
  Sliders, 
  Info,
  ArrowRight,
  ShieldAlert,
  Film,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function FailedRecognitionCard({ 
  message, 
  mediaInfo, 
  errorType,
  onRetrySection, 
  onSwitchToUpload, 
  onSwitchToRecord,
  onReset 
}) {
  const [showTips, setShowTips] = useState(false);
  const isPlatformRestricted = mediaInfo?.is_platform_restricted || errorType === 'PLATFORM_RESTRICTED';
  const platformName = mediaInfo?.platform || (isPlatformRestricted ? 'Instagram' : 'Platform');
  const canRetrySection = mediaInfo?.can_retry_different_section || (mediaInfo?.total_duration && mediaInfo.total_duration > 20);

  if (isPlatformRestricted) {
    return (
      <div className="w-full max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6 animate-in fade-in duration-300">
        {/* Header for Platform Login Wall */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-500 border border-pink-500/20 flex items-center justify-center shrink-0 shadow-inner">
            <InstagramIcon />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-[var(--text-primary)] tracking-tight">
                {platformName} Link Protected by Login Wall
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Meta/Instagram blocks direct server downloads for this post. Don&apos;t worry — you can still identify the song with 100% accuracy in seconds using the methods below!
            </p>
          </div>
        </div>

        {/* 2 Primary Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Action 1: Upload Video */}
          <button
            type="button"
            onClick={onSwitchToUpload}
            className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800 dark:to-slate-800/80 hover:from-blue-100/80 dark:hover:from-slate-700/90 border border-blue-200 dark:border-slate-700 text-left flex flex-col justify-between gap-3 transition-all cursor-pointer group shadow-xs hover:shadow-md"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <UploadCloud className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                Recommended
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">Upload Video or Screen Recording</p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Drop your MP4, MOV, or screen capture clip directly to extract the audio fingerprint.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
              <span>Choose File</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Action 2: Record Live */}
          <button
            type="button"
            onClick={onSwitchToRecord}
            className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-slate-800 dark:to-slate-800/80 hover:from-emerald-100/80 dark:hover:from-slate-700/90 border border-emerald-200 dark:border-slate-700 text-left flex flex-col justify-between gap-3 transition-all cursor-pointer group shadow-xs hover:shadow-md"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                <Mic className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Instant Mic
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">Record Audio Live</p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Play the Reel on your phone or speaker and let your browser mic listen for 5–10s.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Start Recording</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Expandable Fast How-To Guide */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setShowTips(!showTips)}
            className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-[var(--text-primary)] hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>How to get the audio in 5 seconds (Step-by-Step)</span>
            </div>
            {showTips ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {showTips && (
            <div className="p-4 pt-1 border-t border-slate-200 dark:border-slate-800 text-xs text-[var(--text-secondary)] space-y-2.5 animate-in fade-in">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[var(--iloveaudios-red)] text-white text-[11px] font-bold flex items-center justify-center shrink-0">1</span>
                <p>On your phone or computer, take a quick <strong>5-second screen recording</strong> of the Reel or tap <strong>Share &gt; Download</strong>.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[var(--iloveaudios-red)] text-white text-[11px] font-bold flex items-center justify-center shrink-0">2</span>
                <p>Click <strong>Upload File</strong> above, select the video, and click <strong>Identify Song</strong>.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center shrink-0">✓</span>
                <p>Our Shazam acoustic engine matches the audio frequencies and shows you the title, artist, album, and full lyrics instantly!</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Reset */}
        <div className="flex justify-center pt-1">
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors cursor-pointer font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try another search or link</span>
          </button>
        </div>
      </div>
    );
  }

  // Standard Song Fingerprint Missing Card
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
