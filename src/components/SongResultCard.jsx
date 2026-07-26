'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Disc, Calendar, Tag, Download, Check, ExternalLink } from 'lucide-react';
import LyricsViewer from './LyricsViewer';
import OfficialVideoCard from './OfficialVideoCard';

const YouTubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const SpotifyIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.217.357-.681.469-1.038.252-2.838-1.734-6.411-2.127-10.617-1.164-.403.092-.808-.16-.901-.563-.092-.403.16-.808.563-.901 4.604-1.053 8.556-.605 11.741 1.341.357.217.469.681.252 1.035zm1.472-3.275c-.273.444-.856.586-1.3.314-3.248-1.996-8.2-2.576-12.043-1.409-.497.151-1.025-.13-1.176-.628-.151-.497.13-1.025.628-1.176 4.394-1.332 9.845-.688 13.577 1.601.444.272.586.855.314 1.298zm.135-3.415C15.228 8.441 8.784 8.223 5.023 9.364c-.611.185-1.254-.167-1.439-.778-.185-.611.167-1.254.778-1.439 4.316-1.31 11.44-1.06 15.918 1.597.55.326.734 1.042.408 1.592-.326.55-1.042.734-1.592.408z"/>
  </svg>
);

export default function SongResultCard({ data }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const audioRef = useRef(null);

  if (!data || !data.song) return null;

  const { song, official_video, reel_source, spotify } = data;
  const spotifyUrl = spotify?.url || song?.spotify_url || `https://open.spotify.com/search/${encodeURIComponent(`${song.artist} ${song.title}`)}`;
  const youtubeUrl = official_video?.url || `https://www.youtube.com/results?search_query=${encodeURIComponent(`${song.artist} ${song.title} official music video`)}`;

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleDownloadMP3 = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);

    try {
      const queryParams = new URLSearchParams({
        title: song.title || '',
        artist: song.artist || '',
        ...(official_video?.url ? { video_url: official_video.url } : {})
      });

      const downloadUrl = `/api/download?${queryParams.toString()}`;
      
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${song.artist} - ${song.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Download MP3 error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Main Metadata Banner Card */}
      <div className="relative group overflow-hidden glass-panel rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Cover Art Image */}
          <div className="relative group/art shrink-0 w-44 h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-color)] bg-slate-900">
            {song.cover_art ? (
              <img
                src={song.cover_art}
                alt={song.title}
                className="w-full h-full object-cover group-hover/art:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-900/40 to-slate-900 text-blue-400">
                <Disc className="w-16 h-16 animate-spin-slow" />
                <span className="text-xs font-semibold mt-2">No Cover Art</span>
              </div>
            )}

            {/* Audio Preview Overlay Button */}
            {song.preview_url && (
              <button
                onClick={toggleAudio}
                className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover/art:opacity-100 transition-opacity duration-300 cursor-pointer"
                title={isPlaying ? 'Pause Audio Preview' : 'Play Audio Preview'}
              >
                <div className="w-14 h-14 rounded-full bg-[#0088ff] hover:bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/50 scale-95 group-hover/art:scale-100 transition-transform">
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current translate-x-0.5" />}
                </div>
              </button>
            )}
          </div>

          {/* Song Info & Details */}
          <div className="flex-1 space-y-4 text-center md:text-left w-full">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                {song.genre && (
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-semibold flex items-center gap-1 whitespace-nowrap">
                    <Tag className="w-3 h-3 shrink-0" />
                    {song.genre}
                  </span>
                )}
                {song.release_year && (
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 text-xs font-semibold flex items-center gap-1 whitespace-nowrap">
                    <Calendar className="w-3 h-3 shrink-0" />
                    {song.release_year}
                  </span>
                )}
              </div>

              <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
                {song.title}
              </h2>
              <p className="text-lg font-bold text-[#0088ff]">
                {song.artist}
              </p>
            </div>

            {/* Additional Attributes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs text-[var(--text-secondary)]">
              <div className="bg-[var(--bg-main)] rounded-xl p-2.5 border border-[var(--border-color)] space-y-1">
                <span className="text-[var(--text-muted)] font-medium block">Album</span>
                <span className="font-semibold text-[var(--text-primary)] truncate block" title={song.album}>
                  {song.album || 'Single'}
                </span>
              </div>

              <div className="bg-[var(--bg-main)] rounded-xl p-2.5 border border-[var(--border-color)] space-y-1">
                <span className="text-[var(--text-muted)] font-medium block">Record Label</span>
                <span className="font-semibold text-[var(--text-primary)] truncate block" title={song.label}>
                  {song.label || 'Independent'}
                </span>
              </div>

              {/* YouTube Link Card */}
              <div className="bg-[var(--bg-main)] rounded-xl p-2.5 border border-[var(--border-color)] space-y-1">
                <span className="text-[var(--text-muted)] font-medium block flex items-center gap-1">
                  <YouTubeIcon className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>YouTube</span>
                </span>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-red-500 hover:underline truncate flex items-center gap-1"
                  title={youtubeUrl}
                >
                  <span>Official Video</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>

              {/* Spotify Link Card */}
              <div className="bg-[var(--bg-main)] rounded-xl p-2.5 border border-[var(--border-color)] space-y-1">
                <span className="text-[var(--text-muted)] font-medium block flex items-center gap-1">
                  <SpotifyIcon className="w-3.5 h-3.5 text-[#1DB954] shrink-0" />
                  <span>Spotify</span>
                </span>
                <a
                  href={spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-500 hover:underline truncate flex items-center gap-1"
                  title={spotifyUrl}
                >
                  <span>Open Spotify</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            </div>

            {/* Quick Streaming Platforms Bar */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              <span className="text-xs font-semibold text-[var(--text-muted)] mr-1">Listen On:</span>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 text-red-500 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <YouTubeIcon className="w-4 h-4 text-red-500" />
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <SpotifyIcon className="w-4 h-4 text-[#1DB954]" />
                <span>Spotify</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Action Row: Download MP3 & Audio Snippet Player in SAME LINE */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 w-full">
              {/* Direct MP3 Download Button */}
              <button
                onClick={handleDownloadMP3}
                disabled={isDownloading}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs md:text-sm text-white flex items-center justify-center gap-2 transition-all btn-shazam cursor-pointer shrink-0 whitespace-nowrap"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Downloading MP3...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Downloaded MP3!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Full Song (MP3)</span>
                  </>
                )}
              </button>

              {/* Audio Snippet Audio Player (If preview URL exists) */}
              {song.preview_url && (
                <div className="w-full sm:flex-1">
                  <audio
                    ref={audioRef}
                    src={song.preview_url}
                    onEnded={() => setIsPlaying(false)}
                    className="hidden"
                  />
                  <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)]">
                    <button
                      onClick={toggleAudio}
                      className="w-9 h-9 rounded-xl bg-[#0088ff] hover:bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current translate-x-0.5" />}
                    </button>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-[#0088ff] whitespace-nowrap">Preview Audio Snippet</span>
                        <span className="text-[var(--text-muted)] whitespace-nowrap">{isPlaying ? 'Playing...' : 'Click to Play'}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div className={`h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full ${isPlaying ? 'w-full transition-all duration-[30s] ease-linear' : 'w-0'}`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center justify-center gap-2 border-b border-[var(--border-color)] pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#0088ff] text-white shadow-lg shadow-blue-500/30'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
          }`}
        >
          All Information
        </button>
        <button
          onClick={() => setActiveTab('lyrics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'lyrics'
              ? 'bg-[#0088ff] text-white shadow-lg shadow-blue-500/30'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
          }`}
        >
          Full Lyrics
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'video'
              ? 'bg-[#0088ff] text-white shadow-lg shadow-blue-500/30'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
          }`}
        >
          Official Media & Links
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LyricsViewer lyrics={song.lyrics} songTitle={song.title} artist={song.artist} />
          <OfficialVideoCard video={official_video} spotify={spotify || { url: spotifyUrl }} songTitle={song.title} artist={song.artist} />
        </div>
      )}

      {activeTab === 'lyrics' && (
        <LyricsViewer lyrics={song.lyrics} songTitle={song.title} artist={song.artist} />
      )}

      {activeTab === 'video' && (
        <OfficialVideoCard video={official_video} spotify={spotify || { url: spotifyUrl }} songTitle={song.title} artist={song.artist} />
      )}
    </div>
  );
}
