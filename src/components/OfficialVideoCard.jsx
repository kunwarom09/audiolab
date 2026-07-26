'use client';

import React, { useState } from 'react';
import { ExternalLink, Play, X, Copy, Check } from 'lucide-react';

const YouTubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const SpotifyIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}>
    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.217.357-.681.469-1.038.252-2.838-1.734-6.411-2.127-10.617-1.164-.403.092-.808-.16-.901-.563-.092-.403.16-.808.563-.901 4.604-1.053 8.556-.605 11.741 1.341.357.217.469.681.252 1.035zm1.472-3.275c-.273.444-.856.586-1.3.314-3.248-1.996-8.2-2.576-12.043-1.409-.497.151-1.025-.13-1.176-.628-.151-.497.13-1.025.628-1.176 4.394-1.332 9.845-.688 13.577 1.601.444.272.586.855.314 1.298zm.135-3.415C15.228 8.441 8.784 8.223 5.023 9.364c-.611.185-1.254-.167-1.439-.778-.185-.611.167-1.254.778-1.439 4.316-1.31 11.44-1.06 15.918 1.597.55.326.734 1.042.408 1.592-.326.55-1.042.734-1.592.408z"/>
  </svg>
);

export default function OfficialVideoCard({ video, spotify, songTitle, artist }) {
  const [showEmbed, setShowEmbed] = useState(false);
  const [copiedYt, setCopiedYt] = useState(false);
  const [copiedSp, setCopiedSp] = useState(false);

  const spotifyUrl = spotify?.url || `https://open.spotify.com/search/${encodeURIComponent(`${artist} ${songTitle}`)}`;

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
    <div className="glass-panel rounded-2xl p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div className="flex items-center gap-2 shrink-0">
          <YouTubeIcon className="w-6 h-6 text-red-500 shrink-0" />
          <h3 className="text-lg font-bold text-[var(--text-primary)] whitespace-nowrap">Official Music Video & Links</h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-md shadow-red-600/20"
          >
            <span>YouTube</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-[#1DB954] hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-md shadow-emerald-500/20"
          >
            <span>Spotify</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
        </div>
      </div>

      {video.thumbnail ? (
        <div className="relative group rounded-xl overflow-hidden aspect-video bg-slate-900 border border-[var(--border-color)]">
          <img
            src={video.thumbnail}
            alt={video.title || `${songTitle} Official Video`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
            <button
              onClick={() => setShowEmbed(true)}
              className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 transition-all hover:scale-110 cursor-pointer"
              title="Play Official Video"
            >
              <Play className="w-7 h-7 fill-current translate-x-0.5" />
            </button>
          </div>
          <div className="absolute bottom-3 left-3 right-3 text-xs text-white font-medium drop-shadow truncate">
            {video.title}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center justify-between">
          <div className="flex-1 truncate mr-3">
            <p className="text-sm font-medium text-[var(--text-primary)] truncate">{video.title}</p>
            <p className="text-xs text-[var(--text-muted)] truncate">{video.url}</p>
          </div>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl btn-shazam text-xs font-bold text-white flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Open Link</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Official Direct YouTube Link Bar */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
        <YouTubeIcon className="w-4 h-4 text-red-500 shrink-0" />
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#0088ff] hover:underline truncate flex-1"
          title={video.url}
        >
          {video.url}
        </a>
        <button
          onClick={handleCopyYt}
          className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shrink-0"
        >
          {copiedYt ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
          <span>{copiedYt ? 'Copied' : 'Copy YouTube'}</span>
        </button>
      </div>

      {/* Spotify Direct Track Link Bar */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
        <SpotifyIcon className="w-4 h-4 text-[#1DB954] shrink-0" />
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-emerald-500 hover:underline truncate flex-1"
          title={spotifyUrl}
        >
          {spotifyUrl}
        </a>
        <button
          onClick={handleCopySp}
          className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shrink-0"
        >
          {copiedSp ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
          <span>{copiedSp ? 'Copied' : 'Copy Spotify'}</span>
        </button>
      </div>

      {/* Embedded Video Modal */}
      {showEmbed && video.embed_url && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl glass-panel rounded-2xl overflow-hidden border border-white/20 shadow-2xl space-y-2 p-2">
            <div className="flex items-center justify-between px-4 py-2">
              <h4 className="text-sm font-bold text-white truncate max-w-md">
                {video.title || `${songTitle} - ${artist}`}
              </h4>
              <button
                onClick={() => setShowEmbed(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
              <iframe
                src={`${video.embed_url}?autoplay=1`}
                title={video.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
