'use client';

import React, { useState } from 'react';
import {
  CheckStrokeIcon,
  CloseCrossIcon,
  CopyStrokeIcon,
  ExternalLinkStrokeIcon,
} from './AudioIcons';

const YouTubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const SpotifyIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.217.357-.681.469-1.038.252-2.838-1.734-6.411-2.127-10.617-1.164-.403.092-.808-.16-.901-.563-.092-.403.16-.808.563-.901 4.604-1.053 8.556-.605 11.741 1.341.357.217.469.681.252 1.035zm1.472-3.275c-.273.444-.856.586-1.3.314-3.248-1.996-8.2-2.576-12.043-1.409-.497.151-1.025-.13-1.176-.628-.151-.497.13-1.025.628-1.176 4.394-1.332 9.845-.688 13.577 1.601.444.272.586.855.314 1.298zm.135-3.415C15.228 8.441 8.784 8.223 5.023 9.364c-.611.185-1.254-.167-1.439-.778-.185-.611.167-1.254.778-1.439 4.316-1.31 11.44-1.06 15.918 1.597.55.326.734 1.042.408 1.592-.326.55-1.042.734-1.592.408z" />
  </svg>
);

const PlayStrokeIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className={className} aria-hidden="true">
    <polygon points="8,5 19,12 8,19" />
  </svg>
);

export default function OfficialVideoCard({ video, spotify, songTitle, artist }) {
  const [showEmbed, setShowEmbed] = useState(false);
  const [copiedYt, setCopiedYt] = useState(false);
  const [copiedSp, setCopiedSp] = useState(false);

  const spotifyUrl =
    spotify?.url || `https://open.spotify.com/search/${encodeURIComponent(`${artist} ${songTitle}`)}`;

  if (!video || !video.url) return null;

  const handleCopyYt = async () => {
    try {
      await navigator.clipboard.writeText(video.url);
      setCopiedYt(true);
      setTimeout(() => setCopiedYt(false), 2000);
    } catch (err) {
      console.error('Failed to copy YouTube URL:', err);
    }
  };

  const handleCopySp = async () => {
    try {
      await navigator.clipboard.writeText(spotifyUrl);
      setCopiedSp(true);
      setTimeout(() => setCopiedSp(false), 2000);
    } catch (err) {
      console.error('Failed to copy Spotify URL:', err);
    }
  };

  return (
    <div className="w-full ui-card space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div className="flex items-center gap-2">
          <YouTubeIcon className="w-6 h-6 text-[var(--color-accent)] shrink-0" />
          <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-ink)]">Official Video &amp; Links</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-accent)] hover:bg-[#99161C] text-white text-[length:var(--text-base)] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>YouTube</span>
            <ExternalLinkStrokeIcon className="w-5 h-5 shrink-0" />
          </a>
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-canvas)] hover:border-[var(--color-ink)] border border-[var(--color-border)] text-[var(--color-ink)] text-[length:var(--text-base)] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Spotify</span>
            <ExternalLinkStrokeIcon className="w-5 h-5 shrink-0" />
          </a>
        </div>
      </div>

      {video.thumbnail ? (
        <div className="relative rounded-[8px] overflow-hidden aspect-video bg-[var(--color-ink)] border border-[var(--color-border)]">
          <img
            src={video.thumbnail}
            alt={video.title || `${songTitle} Official Video`}
            width={640}
            height={360}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setShowEmbed(true)}
              className="min-w-[56px] min-h-[56px] w-14 h-14 rounded-[8px] bg-[var(--color-accent)] hover:bg-[#99161C] text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Play Official Video"
              aria-label="Play official video"
            >
              <PlayStrokeIcon className="w-6 h-6" />
            </button>
          </div>
          {video.title && (
            <div className="bg-[var(--color-surface)] border-t border-[var(--color-border)] px-4 py-3 text-[length:var(--text-base)] text-[var(--color-ink)] truncate">
              {video.title}
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 rounded-[8px] bg-[var(--color-canvas)] border border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[length:var(--text-base)] font-semibold text-[var(--color-ink)] truncate">{video.title}</p>
            <p className="text-[length:var(--text-base)] text-[var(--color-muted)] truncate">{video.url}</p>
          </div>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-accent)] text-white text-[length:var(--text-base)] font-bold flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Open</span>
            <ExternalLinkStrokeIcon className="w-5 h-5" />
          </a>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 p-4 rounded-[8px] bg-[var(--color-canvas)] border border-[var(--color-border)]">
        <YouTubeIcon className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[length:var(--text-base)] font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] hover:underline truncate flex-1 min-w-0"
          title={video.url}
        >
          {video.url}
        </a>
        <button
          type="button"
          onClick={handleCopyYt}
          className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-ink)] text-[var(--color-ink)] text-[length:var(--text-base)] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
        >
          {copiedYt ? <CheckStrokeIcon className="w-5 h-5 text-[var(--color-accent)]" /> : <CopyStrokeIcon className="w-5 h-5" />}
          <span>{copiedYt ? 'Copied' : 'Copy YouTube'}</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 p-4 rounded-[8px] bg-[var(--color-canvas)] border border-[var(--color-border)]">
        <SpotifyIcon className="w-5 h-5 text-[var(--color-ink)] shrink-0" />
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[length:var(--text-base)] font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] hover:underline truncate flex-1 min-w-0"
          title={spotifyUrl}
        >
          {spotifyUrl}
        </a>
        <button
          type="button"
          onClick={handleCopySp}
          className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-ink)] text-[var(--color-ink)] text-[length:var(--text-base)] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
        >
          {copiedSp ? <CheckStrokeIcon className="w-5 h-5 text-[var(--color-accent)]" /> : <CopyStrokeIcon className="w-5 h-5" />}
          <span>{copiedSp ? 'Copied' : 'Copy Spotify'}</span>
        </button>
      </div>

      {showEmbed && video.embed_url && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="site-container bg-[var(--color-surface)] rounded-[12px] overflow-hidden border border-[var(--color-border)] p-4 space-y-3">
            <div className="flex items-center justify-between gap-3 px-2">
              <h4 className="text-[length:var(--text-lead)] font-bold text-[var(--color-ink)] truncate">
                {video.title || `${songTitle} - ${artist}`}
              </h4>
              <button
                type="button"
                onClick={() => setShowEmbed(false)}
                aria-label="Close video player"
                className="min-w-[48px] min-h-[48px] flex items-center justify-center rounded-[8px] bg-[var(--color-canvas)] border border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-ink)] cursor-pointer shrink-0"
              >
                <CloseCrossIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full rounded-[8px] overflow-hidden bg-black">
              <iframe
                src={`${video.embed_url}?autoplay=1`}
                title={video.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
