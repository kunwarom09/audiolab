'use client';

import React, { useState } from 'react';
import {
  ChevronStrokeIcon,
  MicStrokeIcon,
  RetryStrokeIcon,
  TrimHandlesIcon,
  UploadTrayIcon,
  WaveformIcon,
} from './AudioIcons';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YouTubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TikTokIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 2.498 6.34 6.34 0 0 0 1.087 8.581 6.342 6.342 0 0 0 8.784-.967 6.29 6.29 0 0 0 1.536-4.14V9.012a8.163 8.163 0 0 0 4.793 1.54V7.108a4.787 4.787 0 0 1-1.573-.422z" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const SnapchatIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M12 3c-3 0-5 2.2-5 5 0 1.3.4 2.4.9 3.2.2.3.1.8-.3 1-.6.3-1.4.5-2 .6-.4.1-.5.6-.2.9.8.6 1.9 1 2.7 1.1.2 0 .3.2.3.4-.1.7-.4 1.3-1 1.7-.3.2-.2.7.2.9.8.4 2 .7 3.4.7 1 0 1.9-.2 2.5-.5.3-.2.7-.2 1 0 .6.3 1.5.5 2.5.5 1.4 0 2.6-.3 3.4-.7.4-.2.5-.7.2-.9-.6-.4-.9-1-1-1.7 0-.2.1-.4.3-.4.8-.1 1.9-.5 2.7-1.1.3-.3.2-.8-.2-.9-.6-.1-1.4-.3-2-.6-.4-.2-.5-.7-.3-1 .5-.8.9-1.9.9-3.2 0-2.8-2-5-5-5z" />
  </svg>
);

export default function FailedRecognitionCard({
  message,
  mediaInfo,
  errorType,
  onRetrySection,
  onSwitchToUpload,
  onSwitchToRecord,
  onReset,
}) {
  const [showTips, setShowTips] = useState(false);
  const isPlatformRestricted = mediaInfo?.is_platform_restricted || errorType === 'PLATFORM_RESTRICTED';
  const platformName = mediaInfo?.platform || (isPlatformRestricted ? 'Instagram' : 'Platform');
  const canRetrySection = mediaInfo?.can_retry_different_section || (mediaInfo?.total_duration && mediaInfo.total_duration > 20);

  const renderPlatformIcon = () => {
    const p = (platformName || '').toLowerCase();
    if (p.includes('youtube') || p.includes('shorts')) return <YouTubeIcon />;
    if (p.includes('tiktok')) return <TikTokIcon />;
    if (p.includes('facebook')) return <FacebookIcon />;
    if (p.includes('snapchat')) return <SnapchatIcon />;
    return <InstagramIcon />;
  };

  if (isPlatformRestricted) {
    return (
      <div className="w-full ui-card space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-[8px] bg-[var(--color-canvas)] text-[var(--color-accent)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
            {renderPlatformIcon()}
          </div>
          <div className="space-y-2">
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-ink)]">
              {platformName} link requires login
            </h3>
            <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-muted)] leading-[var(--leading-body)]">
              This post blocks direct server downloads. Upload a short clip or screen recording instead, or record directly through your microphone.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            type="button"
            onClick={onSwitchToUpload}
            className="w-full min-h-[52px] p-6 rounded-[12px] bg-[var(--color-canvas)] hover:border-[var(--color-ink)] border border-[var(--color-border)] text-left flex flex-col justify-between gap-4 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-[8px] bg-[var(--color-accent)] text-white flex items-center justify-center">
              <UploadTrayIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[length:var(--text-lead)] font-bold text-[var(--color-ink)]">Upload clip or screen recording</p>
              <p className="text-[length:var(--text-base)] text-[var(--color-muted)] mt-1">
                Select an MP4, MOV, or audio file up to 100 MB.
              </p>
            </div>
            <span className="text-[length:var(--text-base)] font-bold text-[var(--color-accent)]">Choose File</span>
          </button>

          <button
            type="button"
            onClick={onSwitchToRecord}
            className="w-full min-h-[52px] p-6 rounded-[12px] bg-[var(--color-canvas)] hover:border-[var(--color-ink)] border border-[var(--color-border)] text-left flex flex-col justify-between gap-4 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-[8px] bg-[var(--color-surface)] text-[var(--color-accent)] border border-[var(--color-border)] flex items-center justify-center">
              <MicStrokeIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[length:var(--text-lead)] font-bold text-[var(--color-ink)]">Record audio from microphone</p>
              <p className="text-[length:var(--text-base)] text-[var(--color-muted)] mt-1">
                Play the video near your device and capture 5 to 15 seconds.
              </p>
            </div>
            <span className="text-[length:var(--text-base)] font-bold text-[var(--color-accent)]">Start Recording</span>
          </button>
        </div>

        <div className="bg-[var(--color-canvas)] rounded-[8px] border border-[var(--color-border)] overflow-hidden">
          <button
            type="button"
            onClick={() => setShowTips(!showTips)}
            className="w-full min-h-[52px] px-[20px] py-[12px] flex items-center justify-between text-[length:var(--text-base)] font-bold text-[var(--color-ink)] cursor-pointer text-left"
          >
            <span>How to identify a login-protected video</span>
            <ChevronStrokeIcon
              className={`w-5 h-5 text-[var(--color-muted)] transition-transform ${showTips ? 'rotate-180' : ''}`}
            />
          </button>

          {showTips && (
            <ol className="px-6 pb-5 pt-3 border-t border-[var(--color-border)] text-[length:var(--text-base)] text-[var(--color-muted)] space-y-2 list-decimal list-inside leading-[var(--leading-body)]">
              <li>Record 5 to 15 seconds of the video on your phone or computer.</li>
              <li>Switch to Upload File and choose the saved clip.</li>
              <li>Run identification to return track details and lyrics.</li>
            </ol>
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] border border-[var(--color-border)] bg-[var(--color-bg)] text-[length:var(--text-base)] text-[var(--color-ink)] flex items-center justify-center gap-2 transition-colors cursor-pointer font-semibold"
          >
            <RetryStrokeIcon className="w-5 h-5" />
            <span>Try another search or link</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full ui-card space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-[8px] bg-[var(--color-canvas)] text-[var(--color-accent)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
          <WaveformIcon className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-ink)]">
            {message || 'No matching track found in this segment.'}
          </h3>
          <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-muted)] leading-[var(--leading-body)]">
            Background dialogue, ambient noise, speed changes, or clips shorter than 5 seconds can prevent acoustic matching.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-[length:var(--text-base)] font-bold text-[var(--color-ink)]">
          Next steps
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {canRetrySection && (
            <button
              type="button"
              onClick={onRetrySection}
              className="w-full min-h-[52px] p-4 rounded-[8px] bg-[var(--color-canvas)] hover:border-[var(--color-ink)] border border-[var(--color-border)] text-left flex items-center gap-3 transition-colors cursor-pointer"
            >
              <TrimHandlesIcon className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
              <div>
                <p className="text-[length:var(--text-base)] font-bold text-[var(--color-ink)]">Try another section</p>
                <p className="text-[length:var(--text-base)] text-[var(--color-muted)]">Scan the next 15-second segment</p>
              </div>
            </button>
          )}

          <button
            type="button"
            onClick={onSwitchToUpload}
            className="w-full min-h-[52px] p-4 rounded-[8px] bg-[var(--color-canvas)] hover:border-[var(--color-ink)] border border-[var(--color-border)] text-left flex items-center gap-3 transition-colors cursor-pointer"
          >
            <UploadTrayIcon className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
            <div>
              <p className="text-[length:var(--text-base)] font-bold text-[var(--color-ink)]">Upload clearer clip</p>
              <p className="text-[length:var(--text-base)] text-[var(--color-muted)]">Upload MP4, MP3, or WAV</p>
            </div>
          </button>

          <button
            type="button"
            onClick={onSwitchToRecord}
            className="w-full min-h-[52px] p-4 rounded-[8px] bg-[var(--color-canvas)] hover:border-[var(--color-ink)] border border-[var(--color-border)] text-left flex items-center gap-3 transition-colors cursor-pointer"
          >
            <MicStrokeIcon className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
            <div>
              <p className="text-[length:var(--text-base)] font-bold text-[var(--color-ink)]">Record live audio</p>
              <p className="text-[length:var(--text-base)] text-[var(--color-muted)]">Use browser microphone</p>
            </div>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="w-full min-h-[52px] p-4 rounded-[8px] bg-[var(--color-canvas)] hover:border-[var(--color-ink)] border border-[var(--color-border)] text-left flex items-center gap-3 transition-colors cursor-pointer"
          >
            <RetryStrokeIcon className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
            <div>
              <p className="text-[length:var(--text-base)] font-bold text-[var(--color-ink)]">Start new search</p>
              <p className="text-[length:var(--text-base)] text-[var(--color-muted)]">Paste another URL</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
