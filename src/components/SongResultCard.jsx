'use client';

import React, { useState, useRef } from 'react';
import {
  CheckStrokeIcon,
  CopyStrokeIcon,
  DownloadTrayIcon,
  ExternalLinkStrokeIcon,
  FileTagIcon,
  RetryStrokeIcon,
  WaveformIcon,
} from './AudioIcons';
import LyricsViewer from './LyricsViewer';
import OfficialVideoCard from './OfficialVideoCard';

const YouTubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const SpotifyIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.217.357-.681.469-1.038.252-2.838-1.734-6.411-2.127-10.617-1.164-.403.092-.808-.16-.901-.563-.092-.403.16-.808.563-.901 4.604-1.053 8.556-.605 11.741 1.341.357.217.469.681.252 1.035zm1.472-3.275c-.273.444-.856.586-1.3.314-3.248-1.996-8.2-2.576-12.043-1.409-.497.151-1.025-.13-1.176-.628-.151-.497.13-1.025.628-1.176 4.394-1.332 9.845-.688 13.577 1.601.444.272.586.855.314 1.298zm.135-3.415C15.228 8.441 8.784 8.223 5.023 9.364c-.611.185-1.254-.167-1.439-.778-.185-.611.167-1.254.778-1.439 4.316-1.31 11.44-1.06 15.918 1.597.55.326.734 1.042.408 1.592-.326.55-1.042.734-1.592.408z" />
  </svg>
);

const PlayStrokeIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <polygon points="7,5 19,12 7,19" />
  </svg>
);

const PauseStrokeIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <line x1="8" y1="5" x2="8" y2="19" />
    <line x1="16" y1="5" x2="16" y2="19" />
  </svg>
);

export default function SongResultCard({ data, onReset }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isDownloadingVideo, setIsDownloadingVideo] = useState(false);
  const [downloadVideoSuccess, setDownloadVideoSuccess] = useState(false);
  const [copiedInfo, setCopiedInfo] = useState(false);
  const [sharedSuccess, setSharedSuccess] = useState(false);
  const audioRef = useRef(null);

  if (!data || !data.song) return null;

  const { song, official_video, reel_source, spotify, media_info } = data;
  const spotifyUrl =
    spotify?.url ||
    song?.spotify_url ||
    `https://open.spotify.com/search/${encodeURIComponent(`${song.artist} ${song.title}`)}`;
  const isReelUrl =
    reel_source?.url && (reel_source.url.startsWith('http://') || reel_source.url.startsWith('https://'));
  const youtubeUrl =
    official_video?.url ||
    `https://www.youtube.com/results?search_query=${encodeURIComponent(`${song.artist} ${song.title} official music video`)}`;

  const handleCopySongInfo = async () => {
    try {
      await navigator.clipboard.writeText(`${song.artist} - ${song.title}`);
      setCopiedInfo(true);
      setTimeout(() => setCopiedInfo(false), 2500);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  };

  const handleShare = async () => {
    const shareText = `Found this track on iLoveAudios: ${song.artist} - ${song.title}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${song.artist} - ${song.title}`,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard if user dismissed share dialog
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
      setSharedSuccess(true);
      setTimeout(() => setSharedSuccess(false), 2500);
    } catch (err) {
      console.warn('Share clipboard fallback failed:', err);
    }
  };

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
        ...(official_video?.url ? { video_url: official_video.url } : {}),
      });

      const response = await fetch(`/api/download?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to download MP3');
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `${song.artist} - ${song.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Download MP3 error:', err);
      alert('Could not download MP3. Please check the backend connection or try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadVideo = async () => {
    const videoUrlToDownload = isReelUrl ? reel_source.url : official_video?.url || '';
    if (!videoUrlToDownload) return;

    setIsDownloadingVideo(true);
    setDownloadVideoSuccess(false);

    try {
      const queryParams = new URLSearchParams({
        url: videoUrlToDownload,
        title: song.title || 'Video',
        artist: song.artist || 'Unknown',
      });

      const response = await fetch(`/api/download_video?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to download video');
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `${song.artist} - ${song.title}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);

      setDownloadVideoSuccess(true);
      setTimeout(() => setDownloadVideoSuccess(false), 3000);
    } catch (err) {
      console.error('Download Video error:', err);
      alert('Could not download video. Please check the video source or try again.');
    } finally {
      setIsDownloadingVideo(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="w-full ui-card space-y-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="relative shrink-0 w-44 h-44 md:w-52 md:h-52 rounded-[8px] overflow-hidden border border-[var(--color-border)] bg-[var(--color-canvas)]">
            {song.cover_art ? (
              <img
                src={song.cover_art}
                alt={song.title}
                width={208}
                height={208}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[var(--color-muted)] gap-2">
                <WaveformIcon className="w-10 h-10 text-[var(--color-accent)]" />
                <span className="text-[length:var(--text-base)] font-medium">No cover art</span>
              </div>
            )}

            {song.preview_url && (
              <button
                type="button"
                onClick={toggleAudio}
                className="absolute bottom-3 right-3 min-w-[48px] min-h-[48px] w-12 h-12 rounded-[8px] bg-[var(--color-accent)] hover:bg-[#99161C] text-white flex items-center justify-center cursor-pointer"
                title={isPlaying ? 'Pause preview' : 'Play preview'}
                aria-label={isPlaying ? 'Pause audio preview' : 'Play audio preview'}
              >
                {isPlaying ? <PauseStrokeIcon className="w-5 h-5" /> : <PlayStrokeIcon className="w-5 h-5" />}
              </button>
            )}
          </div>

          <div className="flex-1 space-y-4 w-full min-w-0">
            <div className="space-y-2">
              {(media_info?.analyzed_segment || song.genre || song.release_year) && (
                <div className="flex flex-wrap items-center gap-2 text-[length:var(--text-base)] text-[var(--color-muted)]">
                  {media_info?.analyzed_segment && (
                    <span className="px-[20px] py-[12px] rounded-[8px] bg-[var(--color-canvas)] border border-[var(--color-border)] text-[var(--color-ink)]">
                      Segment {media_info.analyzed_segment}
                    </span>
                  )}
                  {song.genre && (
                    <span className="px-[20px] py-[12px] rounded-[8px] bg-[var(--color-canvas)] border border-[var(--color-border)] text-[var(--color-ink)]">
                      {song.genre}
                    </span>
                  )}
                  {song.release_year && (
                    <span className="px-[20px] py-[12px] rounded-[8px] bg-[var(--color-canvas)] border border-[var(--color-border)] text-[var(--color-ink)]">
                      {song.release_year}
                    </span>
                  )}
                </div>
              )}

              <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-ink)] leading-[var(--leading-heading)]">
                {song.title}
              </h2>
              <p className="text-[length:var(--text-lead)] font-semibold text-[var(--color-accent)]">
                {song.artist}
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleCopySongInfo}
                  className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-canvas)] hover:border-[var(--color-ink)] border border-[var(--color-border)] text-[var(--color-ink)] text-[length:var(--text-base)] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedInfo ? <CheckStrokeIcon className="w-5 h-5 text-[var(--color-accent)]" /> : <CopyStrokeIcon className="w-5 h-5" />}
                  <span>{copiedInfo ? 'Copied' : 'Copy Info'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-canvas)] hover:border-[var(--color-ink)] border border-[var(--color-border)] text-[var(--color-ink)] text-[length:var(--text-base)] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {sharedSuccess ? <CheckStrokeIcon className="w-5 h-5 text-[var(--color-accent)]" /> : <ExternalLinkStrokeIcon className="w-5 h-5" />}
                  <span>{sharedSuccess ? 'Copied' : 'Share'}</span>
                </button>

                {onReset && (
                  <button
                    type="button"
                    onClick={onReset}
                    className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-canvas)] hover:border-[var(--color-accent)] border border-[var(--color-border)] text-[var(--color-accent)] text-[length:var(--text-base)] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <RetryStrokeIcon className="w-5 h-5" />
                    <span>Find Another</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[length:var(--text-base)]">
              <div className="bg-[var(--color-canvas)] rounded-[8px] p-4 border border-[var(--color-border)] space-y-1">
                <span className="text-[var(--color-muted)] block">Album</span>
                <span className="font-semibold text-[var(--color-ink)] truncate block" title={song.album}>
                  {song.album || 'Single'}
                </span>
              </div>

              <div className="bg-[var(--color-canvas)] rounded-[8px] p-4 border border-[var(--color-border)] space-y-1">
                <span className="text-[var(--color-muted)] block">Record label</span>
                <span className="font-semibold text-[var(--color-ink)] truncate block" title={song.label}>
                  {song.label || 'Independent'}
                </span>
              </div>

              <div className="bg-[var(--color-canvas)] rounded-[8px] p-4 border border-[var(--color-border)] space-y-1">
                <span className="text-[var(--color-muted)] flex items-center gap-1.5">
                  <YouTubeIcon className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                  <span>YouTube</span>
                </span>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] py-[12px] font-semibold text-[var(--color-ink)] hover:text-[var(--color-accent)] hover:underline truncate flex items-center gap-1.5"
                  title={youtubeUrl}
                >
                  <span>Official video</span>
                  <ExternalLinkStrokeIcon className="w-4 h-4 shrink-0" />
                </a>
              </div>

              <div className="bg-[var(--color-canvas)] rounded-[8px] p-4 border border-[var(--color-border)] space-y-1">
                <span className="text-[var(--color-muted)] flex items-center gap-1.5">
                  <SpotifyIcon className="w-5 h-5 text-[var(--color-ink)] shrink-0" />
                  <span>Spotify</span>
                </span>
                <a
                  href={spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] py-[12px] font-semibold text-[var(--color-ink)] hover:text-[var(--color-accent)] hover:underline truncate flex items-center gap-1.5"
                  title={spotifyUrl}
                >
                  <span>Open Spotify</span>
                  <ExternalLinkStrokeIcon className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={handleDownloadMP3}
                disabled={isDownloading}
                className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] font-bold text-[length:var(--text-base)] text-white bg-[var(--color-accent)] hover:bg-[#99161C] flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 disabled:opacity-60"
              >
                {isDownloading ? (
                  <span>Downloading MP3...</span>
                ) : downloadSuccess ? (
                  <>
                    <CheckStrokeIcon className="w-5 h-5" />
                    <span>Downloaded MP3</span>
                  </>
                ) : (
                  <>
                    <DownloadTrayIcon className="w-5 h-5" />
                    <span>Download MP3</span>
                  </>
                )}
              </button>

              {(isReelUrl || official_video?.url) && (
                <button
                  type="button"
                  onClick={handleDownloadVideo}
                  disabled={isDownloadingVideo}
                  className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] font-bold text-[length:var(--text-base)] text-[var(--color-ink)] bg-[var(--color-canvas)] hover:border-[var(--color-ink)] border border-[var(--color-border)] flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 disabled:opacity-60"
                >
                  {isDownloadingVideo ? (
                    <span>{isReelUrl ? 'Downloading Reel...' : 'Downloading Video...'}</span>
                  ) : downloadVideoSuccess ? (
                    <>
                      <CheckStrokeIcon className="w-5 h-5 text-[var(--color-accent)]" />
                      <span>{isReelUrl ? 'Downloaded Reel' : 'Downloaded Video'}</span>
                    </>
                  ) : (
                    <>
                      <FileTagIcon className="w-5 h-5 text-[var(--color-accent)]" />
                      <span>{isReelUrl ? 'Download Reel Video' : 'Download Video (MP4)'}</span>
                    </>
                  )}
                </button>
              )}

              {song.preview_url && (
                <div className="w-full sm:flex-1">
                  <audio
                    ref={audioRef}
                    src={song.preview_url}
                    onEnded={() => setIsPlaying(false)}
                    className="hidden"
                  />
                  <div className="flex items-center gap-3 p-3 rounded-[8px] bg-[var(--color-canvas)] border border-[var(--color-border)]">
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className="min-w-[48px] min-h-[48px] w-12 h-12 rounded-[8px] bg-[var(--color-accent)] hover:bg-[#99161C] text-white flex items-center justify-center shrink-0 cursor-pointer"
                      aria-label={isPlaying ? 'Pause snippet' : 'Play snippet'}
                    >
                      {isPlaying ? <PauseStrokeIcon className="w-5 h-5" /> : <PlayStrokeIcon className="w-5 h-5" />}
                    </button>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between text-[length:var(--text-base)]">
                        <span className="font-semibold text-[var(--color-ink)]">Preview clip</span>
                        <span className="text-[var(--color-muted)]">{isPlaying ? 'Playing' : 'Ready'}</span>
                      </div>
                      <div className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[4px] h-2 overflow-hidden">
                        <div className={`h-full bg-[var(--color-accent)] ${isPlaying ? 'w-full transition-all duration-[30s] ease-linear' : 'w-0'}`} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--color-border)] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`min-h-[48px] px-[20px] py-[12px] rounded-[8px] text-[length:var(--text-base)] font-bold transition-colors cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[var(--color-accent)] text-white'
              : 'text-[var(--color-muted)] hover:text-[var(--color-ink)] bg-[var(--color-surface)] border border-[var(--color-border)]'
          }`}
        >
          All Information
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('lyrics')}
          className={`min-h-[48px] px-[20px] py-[12px] rounded-[8px] text-[length:var(--text-base)] font-bold transition-colors cursor-pointer ${
            activeTab === 'lyrics'
              ? 'bg-[var(--color-accent)] text-white'
              : 'text-[var(--color-muted)] hover:text-[var(--color-ink)] bg-[var(--color-surface)] border border-[var(--color-border)]'
          }`}
        >
          Full Lyrics
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('video')}
          className={`min-h-[48px] px-[20px] py-[12px] rounded-[8px] text-[length:var(--text-base)] font-bold transition-colors cursor-pointer ${
            activeTab === 'video'
              ? 'bg-[var(--color-accent)] text-white'
              : 'text-[var(--color-muted)] hover:text-[var(--color-ink)] bg-[var(--color-surface)] border border-[var(--color-border)]'
          }`}
        >
          Official Media &amp; Links
        </button>
      </div>

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
