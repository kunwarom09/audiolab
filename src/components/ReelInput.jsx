'use client';

import React, { useState } from 'react';
import { Search, Clipboard, X, ArrowRight } from 'lucide-react';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TikTokIcon = (props) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 2.498 6.34 6.34 0 0 0 1.087 8.581 6.342 6.342 0 0 0 8.784-.967 6.29 6.29 0 0 0 1.536-4.14V9.012a8.163 8.163 0 0 0 4.793 1.54V7.108a4.787 4.787 0 0 1-1.573-.422z"/>
  </svg>
);

const SnapchatIcon = (props) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
    <path d="M12.004 2c-3.75 0-6.177 2.656-6.177 5.766 0 1.542.482 2.88 1.135 3.864.214.321.36.711.13 1.054-.3.448-1.517.65-2.22.75-.417.06-.693.393-.574.801.378 1.295 2.115 1.565 3.09 1.677.214.025.378.21.362.425-.078 1.05-.286 1.838-1.127 2.41-.334.227-.478.63-.306.985.497 1.026 2.378 1.488 4.394 1.488 1.303 0 2.893-.194 3.738-.724.32-.202.738-.172 1.01.096.793.784 1.764 1.173 2.825 1.173.348 0 .692-.042 1.03-.127.608-.153 1.014-.693.948-1.314-.078-.738-.283-1.62-.05-2.486.065-.24.275-.414.523-.427 1.098-.057 3.018-.28 3.42-1.687.124-.436-.188-.804-.636-.856-.757-.087-2.03-.275-2.338-.76-.23-.362-.09-.757.135-1.09.684-1.013 1.183-2.38 1.183-3.951C18.18 4.656 15.755 2 12.004 2z"/>
  </svg>
);

const YouTubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function ReelInput({ onExtract, isLoading }) {
  const [url, setUrl] = useState('');

  const sampleReels = [
    {
      label: 'YouTube Shorts',
      icon: YouTubeIcon,
      url: 'https://www.youtube.com/shorts/dQw4w9WgXcQ'
    },
    {
      label: 'Instagram Reel',
      icon: InstagramIcon,
      url: 'https://www.instagram.com/reel/espresso-sabrina-carpenter'
    },
    {
      label: 'Facebook Reel',
      icon: FacebookIcon,
      url: 'https://www.facebook.com/reel/birds-of-a-feather-billie-eilish'
    },
    {
      label: 'TikTok Video',
      icon: TikTokIcon,
      url: 'https://www.tiktok.com/@creator/video/739123456789'
    },
    {
      label: 'Snapchat Spotlight',
      icon: SnapchatIcon,
      url: 'https://www.snapchat.com/spotlight/dua-lipa-houdini'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onExtract(url.trim());
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
      }
    } catch (err) {
      console.error('Clipboard paste error:', err);
    }
  };

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-[var(--color-surface)] rounded-[12px] p-1.5 gap-2 border border-[var(--color-border)]">
          <div className="flex items-center flex-1 min-w-0">
            <div className="pl-3 text-[var(--color-brand)] shrink-0">
              <Search className="w-5 h-5" />
            </div>

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Instagram, TikTok, YouTube Shorts, Facebook, or Snapchat link..."
              className="w-full min-h-[52px] bg-transparent px-[20px] text-[length:var(--text-base)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none font-medium"
              disabled={isLoading}
            />

            {url && (
              <button
                type="button"
                onClick={() => setUrl('')}
                aria-label="Clear link"
                className="min-w-[48px] min-h-[48px] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] rounded-[8px] cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePaste}
              className="w-full sm:w-auto min-h-[52px] px-[20px] flex items-center justify-center gap-2 text-[length:var(--text-base)] font-semibold text-[var(--color-text)] bg-[var(--color-bg)] hover:border-[var(--color-text)] rounded-[8px] border border-[var(--color-border)] cursor-pointer"
              title="Paste from clipboard"
            >
              <Clipboard className="w-5 h-5" />
              <span>Paste</span>
            </button>

            <button
              type="submit"
              disabled={!url.trim() || isLoading}
              className={`w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] font-bold text-[length:var(--text-base)] text-white flex items-center justify-center gap-2 shrink-0 ${
                !url.trim() || isLoading
                  ? 'bg-[var(--color-disabled-bg)] text-[var(--color-disabled-fg)] cursor-not-allowed'
                  : 'bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] cursor-pointer'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Finding Song...</span>
                </>
              ) : (
                <>
                  <span>Find Song</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Sample Links */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-[length:var(--text-base)]">
        <span className="text-[var(--color-text-muted)] font-bold">Try sample:</span>
        {sampleReels.map((sample, idx) => {
          const Icon = sample.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setUrl(sample.url);
                onExtract(sample.url);
              }}
              className="min-h-[48px] px-[20px] py-[12px] rounded-[8px] bg-[var(--color-bg)] hover:border-[var(--color-brand)] border border-[var(--color-border)] text-[var(--color-text)] font-bold flex items-center gap-2 cursor-pointer"
            >
              <Icon className="w-5 h-5 text-[var(--color-brand)] shrink-0" />
              <span>{sample.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
