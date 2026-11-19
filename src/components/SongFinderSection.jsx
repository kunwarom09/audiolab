'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '@/components/AppClientWrapper';
import {
  CheckStrokeIcon,
  CloseCrossIcon,
  CopyStrokeIcon,
  DownloadTrayIcon,
  ExternalLinkStrokeIcon,
  FileTagIcon,
  MicStrokeIcon,
  RetryStrokeIcon,
  SpinnerStrokeIcon,
  TrackWaveformGraphic,
  TrimHandlesIcon,
  UploadTrayIcon,
  WaveformIcon,
} from '@/components/AudioIcons';

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

const StopGlyphIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className={className} aria-hidden="true">
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
);

function isValidHttpUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') && parsed.hostname.includes('.');
  } catch {
    return false;
  }
}

export default function SongFinderSection() {
  const { history, setHistory } = useApp();

  const [activeTab, setActiveTab] = useState('link');
  const [url, setUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [mediaDuration, setMediaDuration] = useState(0);
  const [useCustomSegment, setUseCustomSegment] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);
  const mediaRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [isPlayingRecord, setIsPlayingRecord] = useState(false);
  const [recordError, setRecordError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recordIntervalRef = useRef(null);
  const recordAudioElementRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [lastFileId, setLastFileId] = useState(null);
  const [lastStartTime, setLastStartTime] = useState(0);

  // In-panel result state controls
  const [isDownloadingMp3, setIsDownloadingMp3] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedInfo, setCopiedInfo] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const previewAudioRef = useRef(null);

  useEffect(() => {
    const handleHistorySelect = (e) => {
      if (e.detail) {
        setResult(e.detail);
        setError(null);
        setIsLoading(false);
        setShowLyrics(false);
      }
    };
    window.addEventListener('historySelect', handleHistorySelect);
    return () => window.removeEventListener('historySelect', handleHistorySelect);
  }, []);

  const pollJobStatus = async (jobId) => {
    const maxPolls = 60;
    for (let i = 0; i < maxPolls; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await fetch(`/api/jobs/${jobId}`);
      if (!res.ok) continue;
      const jobData = await res.json();

      if (jobData.status === 'completed' && jobData.result) {
        return jobData.result;
      } else if (jobData.status === 'failed') {
        throw new Error(jobData.error || 'Background processing task failed.');
      }
    }
    throw new Error('Task timed out. Please try again.');
  };

  const handleExtractLink = async (reelUrl) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setShowLyrics(false);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: reelUrl, async_mode: true }),
      });

      const data = await response.json();
      if (!response.ok && !data.message) {
        throw new Error(data.error || data.message || 'Could not process provided link.');
      }

      let finalResult = data;
      if (data.job_id && (data.status === 'queued' || data.status === 'processing')) {
        finalResult = await pollJobStatus(data.job_id);
      }

      setResult(finalResult);

      if (finalResult.success && finalResult.song) {
        const newHistoryItem = { ...finalResult, timestamp: Date.now() };
        const updatedHistory = [
          newHistoryItem,
          ...history.filter((h) => h.song?.title !== finalResult.song?.title),
        ].slice(0, 20);
        setHistory(updatedHistory);
        localStorage.setItem('extractor_history', JSON.stringify(updatedHistory));
      }
    } catch (err) {
      setError(err.message || 'Could not process this link.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdentifyFile = async (fileId, segmentStart, duration = 15) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setShowLyrics(false);
    setLastFileId(fileId);
    setLastStartTime(segmentStart || 0);

    try {
      const response = await fetch('/api/identify-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file_id: fileId,
          start_time: typeof segmentStart === 'number' ? segmentStart : undefined,
          duration,
          async_mode: true,
        }),
      });

      const data = await response.json();
      if (!response.ok && !data.message) {
        throw new Error(data.error || data.message || 'Could not identify song from uploaded file.');
      }

      let finalResult = data;
      if (data.job_id && (data.status === 'queued' || data.status === 'processing')) {
        finalResult = await pollJobStatus(data.job_id);
      }

      setResult(finalResult);

      if (finalResult.success && finalResult.song) {
        const newHistoryItem = { ...finalResult, timestamp: Date.now() };
        const updatedHistory = [
          newHistoryItem,
          ...history.filter((h) => h.song?.title !== finalResult.song?.title),
        ].slice(0, 20);
        setHistory(updatedHistory);
        localStorage.setItem('extractor_history', JSON.stringify(updatedHistory));
      }
    } catch (err) {
      setError(err.message || 'Could not identify song from the audio file.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text);
    } catch (err) {
      console.warn('Clipboard read failed:', err);
    }
  };

  const processSelectedFile = (file) => {
    setUploadError(null);
    if (file.size > 100 * 1024 * 1024) {
      setUploadError('File exceeds the 100 MB limit.');
      return;
    }
    setSelectedFile(file);
    setFilePreviewUrl(URL.createObjectURL(file));
    setStartTime(0);
    setUseCustomSegment(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processSelectedFile(file);
  };

  const handleUploadAndIdentify = async () => {
    if (!selectedFile || isLoading || isUploading) return;
    setIsUploading(true);
    setUploadProgress(20);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      setUploadProgress(50);

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      setUploadProgress(85);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload file.');
      }

      setUploadProgress(100);
      setIsUploading(false);
      handleIdentifyFile(data.file_id, useCustomSegment ? startTime : undefined, 15);
    } catch (err) {
      setUploadError(err.message || 'Failed to upload file.');
      setIsUploading(false);
    }
  };

  const startRecording = async () => {
    setRecordError(null);
    setRecordedBlob(null);
    setRecordedAudioUrl(null);
    setRecordSeconds(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const mimeType = mediaRecorder.mimeType || 'audio/webm';
        const blob = new Blob(chunks, { type: mimeType });
        setRecordedBlob(blob);
        setRecordedAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      recordIntervalRef.current = setInterval(() => {
        setRecordSeconds((prev) => {
          if (prev >= 14) {
            stopRecording();
            return 15;
          }
          return prev + 1;
        });
      }, 1000);
    } catch {
      setRecordError('Microphone access denied or unavailable.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
    setIsRecording(false);
  };

  const handleIdentifyRecording = async () => {
    if (!recordedBlob || isLoading || isUploading) return;
    setIsUploading(true);
    setRecordError(null);

    try {
      const file = new File([recordedBlob], 'recorded_audio.webm', { type: recordedBlob.type });
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload recorded audio.');
      }

      setIsUploading(false);
      handleIdentifyFile(data.file_id, 0, 15);
    } catch (err) {
      setRecordError(err.message || 'Failed to identify recorded audio.');
      setIsUploading(false);
    }
  };

  const togglePlayRecord = () => {
    if (!recordAudioElementRef.current) return;
    if (isPlayingRecord) {
      recordAudioElementRef.current.pause();
      setIsPlayingRecord(false);
    } else {
      recordAudioElementRef.current.play();
      setIsPlayingRecord(true);
    }
  };

  const handleDownloadMp3 = async () => {
    if (!result?.song || isDownloadingMp3) return;
    setIsDownloadingMp3(true);
    setDownloadSuccess(false);

    try {
      const params = new URLSearchParams({
        title: result.song.title || '',
        artist: result.song.artist || '',
        ...(result.official_video?.url ? { video_url: result.official_video.url } : {}),
      });
      const res = await fetch(`/api/download?${params.toString()}`);
      if (!res.ok) throw new Error('Download failed');

      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `${result.song.artist} - ${result.song.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch {
      alert('Could not download MP3. Please try again.');
    } finally {
      setIsDownloadingMp3(false);
    }
  };

  const handleCopyInfo = async () => {
    if (!result?.song) return;
    try {
      await navigator.clipboard.writeText(`${result.song.artist} - ${result.song.title}`);
      setCopiedInfo(true);
      setTimeout(() => setCopiedInfo(false), 2000);
    } catch {
      // Ignore clipboard failure
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setIsPlayingPreview(false);
    setShowLyrics(false);
  };

  const formatSeconds = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const hasValidUrl = isValidHttpUrl(url);
  const canRetrySection =
    result?.media_info?.can_retry_different_section ||
    (result?.media_info?.total_duration && result.media_info.total_duration > 20);

  const songLyricsText = result?.song?.lyrics;
  const hasLyrics =
    Boolean(songLyricsText) &&
    !songLyricsText.includes('Official music video available') &&
    !songLyricsText.includes('Lyrics not available') &&
    !songLyricsText.includes('Full song audio ready');

  return (
    <section
      aria-labelledby="home-heading"
      className="w-full bg-[var(--color-band-top)] border-b border-[var(--color-band-border)] py-8 lg:py-12"
    >
      <div className="site-container">
        <div className="w-full rounded-[20px] border border-[var(--color-band-border)] bg-[var(--color-surface)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Panel (5 cols): Editorial Record-Sleeve Dark Ink Panel */}
          <div className="lg:col-span-5 bg-[var(--color-studio-bg)] p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8 text-left">
            <div className="space-y-5">
              <h1
                id="home-heading"
                className="text-[length:var(--text-h1)] font-bold leading-[1.08] text-[var(--color-studio-text)]"
                style={{ textWrap: 'balance' }}
              >
                Find the Song Behind Any Video
              </h1>

              <p className="prose-measure text-[length:var(--text-lead)] text-[var(--color-studio-muted)] leading-[var(--leading-body)]">
                When a Reel, TikTok, or Short only says &ldquo;Original Audio,&rdquo; drop a link, clip, or live mic sample to uncover the real track, artist, lyrics, and MP3.
              </p>
            </div>

            <div className="border-t border-[var(--color-studio-border)] pt-6 space-y-4">
              <div
                aria-hidden="true"
                className="relative w-full h-9 overflow-hidden rounded-[4px] select-none"
                style={{ contain: 'layout paint' }}
              >
                {/* Base unplayed waveform (muted grey) */}
                <TrackWaveformGraphic
                  isProcessing={isLoading || isUploading}
                  className={`w-full h-9 transition-colors duration-200 ${
                    isLoading || isUploading
                      ? 'text-[var(--color-brand)]'
                      : 'text-[var(--color-studio-wave)]'
                  }`}
                />

                {/* Active played waveform (bright studio text) revealed up to the sweep playhead */}
                {!isLoading && !isUploading && (
                  <div
                    className="absolute inset-0 pointer-events-none waveform-progress-clip"
                    style={{ contain: 'layout paint' }}
                  >
                    <TrackWaveformGraphic
                      isProcessing={false}
                      className="w-full h-9 text-[var(--color-studio-text)]"
                    />
                  </div>
                )}

                {/* Precision laser playhead line */}
                <span
                  className={`pointer-events-none absolute inset-y-0 w-[2px] bg-[var(--color-brand)] shadow-[0_0_8px_rgba(200,30,43,0.85)] ${
                    isLoading || isUploading
                      ? 'waveform-playhead-scanning'
                      : 'waveform-playhead-sweep'
                  }`}
                />
              </div>

              <p className="text-[length:var(--text-base)] text-[var(--color-studio-muted)] leading-[var(--leading-body)]">
                Works with Instagram Reels, TikTok, YouTube Shorts, Facebook and Snapchat.
              </p>
            </div>
          </div>

          {/* Right Panel (7 cols): Crisp White Working Tool Desk */}
          <div className="lg:col-span-7 bg-[var(--color-surface)] p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8 w-full">
            <div className="w-full">
                {/* In-Place Result State (no page jump) */}
                {result && !isLoading ? (
                  result.success && result.song ? (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className="w-24 h-24 rounded-[8px] overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg)] shrink-0 flex items-center justify-center">
                          {result.song.cover_art ? (
                            <img
                              src={result.song.cover_art}
                              alt={result.song.title}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <WaveformIcon className="w-8 h-8 text-[var(--color-brand)]" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0 space-y-1.5">
                          <h2 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)] leading-[var(--leading-heading)]">
                            {result.song.title}
                          </h2>
                          <p className="text-[length:var(--text-base)] font-semibold text-[var(--color-brand)]">
                            {result.song.artist}
                          </p>
                          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)]">
                            Album: {result.song.album || 'Single'}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleReset}
                          className="w-full sm:w-auto min-h-[52px] min-w-[48px] px-[20px] rounded-[8px] border border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-text)] text-[length:var(--text-base)] font-semibold text-[var(--color-text)] flex items-center justify-center gap-2 cursor-pointer shrink-0"
                        >
                          <RetryStrokeIcon className="w-5 h-5" />
                          <span>New search</span>
                        </button>
                      </div>

                      {result.song.preview_url && (
                        <div className="flex items-center gap-3 p-4 rounded-[8px] bg-[var(--color-bg)] border border-[var(--color-border)]">
                          <audio
                            ref={previewAudioRef}
                            src={result.song.preview_url}
                            onEnded={() => setIsPlayingPreview(false)}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (!previewAudioRef.current) return;
                              if (isPlayingPreview) {
                                previewAudioRef.current.pause();
                                setIsPlayingPreview(false);
                              } else {
                                previewAudioRef.current.play();
                                setIsPlayingPreview(true);
                              }
                            }}
                            className="min-w-[48px] min-h-[48px] w-12 h-12 rounded-[8px] bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white flex items-center justify-center shrink-0 cursor-pointer"
                            aria-label={isPlayingPreview ? 'Pause preview' : 'Play preview'}
                          >
                            {isPlayingPreview ? <PauseStrokeIcon className="w-5 h-5" /> : <PlayStrokeIcon className="w-5 h-5" />}
                          </button>
                          <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-text)]">
                            {isPlayingPreview ? 'Playing audio preview' : 'Play audio preview'}
                          </span>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                        <button
                          type="button"
                          onClick={handleDownloadMp3}
                          disabled={isDownloadingMp3}
                          className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] font-semibold text-[length:var(--text-base)] bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                        >
                          {isDownloadingMp3 ? (
                            <SpinnerStrokeIcon className="w-5 h-5" />
                          ) : downloadSuccess ? (
                            <CheckStrokeIcon className="w-5 h-5" />
                          ) : (
                            <DownloadTrayIcon className="w-5 h-5" />
                          )}
                          <span>
                            {isDownloadingMp3
                              ? 'Downloading MP3'
                              : downloadSuccess
                              ? 'Downloaded MP3'
                              : 'Download MP3'}
                          </span>
                        </button>

                        {hasLyrics && (
                          <button
                            type="button"
                            onClick={() => setShowLyrics((prev) => !prev)}
                            className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] border border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-text)] text-[length:var(--text-base)] font-semibold text-[var(--color-text)] cursor-pointer"
                          >
                            {showLyrics ? 'Hide lyrics' : 'View lyrics'}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={handleCopyInfo}
                          className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] border border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-text)] text-[length:var(--text-base)] font-semibold text-[var(--color-text)] flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {copiedInfo ? <CheckStrokeIcon className="w-5 h-5 text-[var(--color-brand)]" /> : <CopyStrokeIcon className="w-5 h-5" />}
                          <span>{copiedInfo ? 'Copied' : 'Copy title'}</span>
                        </button>

                        {result.official_video?.url && (
                          <a
                            href={result.official_video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] border border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-brand)] text-[length:var(--text-base)] font-semibold text-[var(--color-text)] hover:text-[var(--color-brand)] flex items-center justify-center gap-2"
                          >
                            <span>Official video</span>
                            <ExternalLinkStrokeIcon className="w-5 h-5" />
                          </a>
                        )}
                      </div>

                      {showLyrics && hasLyrics && (
                        <div className="max-h-60 overflow-y-auto p-5 rounded-[8px] bg-[var(--color-bg)] border border-[var(--color-border)] text-[length:var(--text-base)] text-[var(--color-text)] whitespace-pre-line leading-[var(--leading-body)]">
                          {songLyricsText}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Failed recognition state inside panel */
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <h2 className="text-[length:var(--text-h3)] font-semibold text-[var(--color-text)] leading-[var(--leading-heading)]">
                          {result.message || 'No matching track found in this segment.'}
                        </h2>
                        <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
                          Try uploading a short clip directly or recording live audio with your microphone.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                        {canRetrySection && (
                          <button
                            type="button"
                            onClick={() => handleIdentifyFile(lastFileId, (lastStartTime || 0) + 15, 15)}
                            className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-brand)] text-white text-[length:var(--text-base)] font-semibold cursor-pointer"
                          >
                            Try another section
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('upload');
                            handleReset();
                          }}
                          className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] border border-[var(--color-border)] bg-[var(--color-bg)] text-[length:var(--text-base)] font-semibold text-[var(--color-text)] cursor-pointer"
                        >
                          Upload file
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('record');
                            handleReset();
                          }}
                          className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] border border-[var(--color-border)] bg-[var(--color-bg)] text-[length:var(--text-base)] font-semibold text-[var(--color-text)] cursor-pointer"
                        >
                          Record audio
                        </button>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[length:var(--text-base)] font-semibold text-[var(--color-text-muted)] cursor-pointer"
                        >
                          Try another link
                        </button>
                      </div>
                    </div>
                  )
                ) : (
                  /* Default Tool Input Panel */
                  <div className="space-y-5">
                    {/* Segmented Control: 3 real tab buttons */}
                    <div
                      role="tablist"
                      aria-label="Song Finder input method"
                      className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 p-1.5 rounded-[8px] bg-[var(--color-bg)] border border-[var(--color-border)]"
                    >
                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === 'link'}
                        onClick={() => {
                          setActiveTab('link');
                          setError(null);
                        }}
                        className={`flex-1 whitespace-nowrap min-h-[48px] px-[20px] py-[12px] rounded-[8px] text-[length:var(--text-base)] font-semibold transition-colors duration-150 cursor-pointer ${
                          activeTab === 'link'
                            ? 'bg-[var(--color-pill-active)] text-white'
                            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                        }`}
                      >
                        Paste link
                      </button>

                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === 'upload'}
                        onClick={() => {
                          setActiveTab('upload');
                          setError(null);
                        }}
                        className={`flex-1 whitespace-nowrap min-h-[48px] px-[20px] py-[12px] rounded-[8px] text-[length:var(--text-base)] font-semibold transition-colors duration-150 cursor-pointer ${
                          activeTab === 'upload'
                            ? 'bg-[var(--color-pill-active)] text-white'
                            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                        }`}
                      >
                        Upload file
                      </button>

                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === 'record'}
                        onClick={() => {
                          setActiveTab('record');
                          setError(null);
                        }}
                        className={`flex-1 whitespace-nowrap min-h-[48px] px-[20px] py-[12px] rounded-[8px] text-[length:var(--text-base)] font-semibold transition-colors duration-150 cursor-pointer ${
                          activeTab === 'record'
                            ? 'bg-[var(--color-pill-active)] text-white'
                            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                        }`}
                      >
                        Record audio
                      </button>
                    </div>

                    {/* Tab 1: Paste link */}
                    {activeTab === 'link' && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (hasValidUrl && !isLoading) {
                            handleExtractLink(url.trim());
                          }
                        }}
                        className="space-y-4"
                      >
                        <label htmlFor="song-finder-url-input" className="sr-only">
                          Video URL
                        </label>
                        <div className="relative flex flex-wrap sm:flex-nowrap items-center bg-[var(--color-bg)] border border-[var(--color-border)] focus-within:border-[var(--color-brand)] rounded-[8px] min-h-[56px] p-1 gap-1">
                          <input
                            id="song-finder-url-input"
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://www.instagram.com/reel/..."
                            disabled={isLoading}
                            className="flex-1 min-w-0 min-h-[52px] bg-transparent px-[20px] text-[length:var(--text-base)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
                          />

                          {url && (
                            <button
                              type="button"
                              onClick={() => setUrl('')}
                              aria-label="Clear URL"
                              className="min-w-[48px] min-h-[48px] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer shrink-0"
                            >
                              <CloseCrossIcon className="w-5 h-5" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={handlePaste}
                            disabled={isLoading}
                            className="min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text)] text-[length:var(--text-base)] font-semibold text-[var(--color-text)] cursor-pointer shrink-0"
                          >
                            Paste
                          </button>
                        </div>

                        <button
                          type="submit"
                          disabled={!hasValidUrl || isLoading}
                          className={`w-full min-h-[52px] px-[20px] rounded-[8px] text-[length:var(--text-base)] font-semibold flex items-center justify-center gap-2 transition-colors duration-150 ${
                            isLoading
                              ? 'bg-[var(--color-brand)] text-white cursor-wait'
                              : hasValidUrl
                              ? 'bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white cursor-pointer'
                              : 'bg-[var(--color-disabled-bg)] text-[var(--color-disabled-fg)] cursor-not-allowed'
                          }`}
                        >
                          {isLoading && <SpinnerStrokeIcon className="w-5 h-5" />}
                          <span>{isLoading ? 'Finding song' : 'Find song'}</span>
                        </button>
                      </form>
                    )}

                    {/* Tab 2: Upload file */}
                    {activeTab === 'upload' && (
                      <div className="space-y-4">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="video/mp4,video/quicktime,video/webm,video/x-matroska,audio/mpeg,audio/wav,audio/mp4,audio/aac,audio/ogg,audio/flac"
                          className="hidden"
                        />

                        {!selectedFile ? (
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={() => fileInputRef.current?.click()}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                fileInputRef.current?.click();
                              }
                            }}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setIsDragging(true);
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setIsDragging(false);
                              if (e.dataTransfer.files?.[0]) processSelectedFile(e.dataTransfer.files[0]);
                            }}
                            className={`w-full min-h-[280px] rounded-[12px] border-2 border-dashed p-6 sm:p-8 text-center cursor-pointer transition-colors duration-150 flex flex-col items-center justify-center gap-3 ${
                              isDragging
                                ? 'border-[var(--color-brand)] bg-[var(--color-bg)]'
                                : 'border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-brand)]'
                            }`}
                          >
                            <div className="w-12 h-12 rounded-[8px] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-brand)] flex items-center justify-center">
                              <UploadTrayIcon className="w-6 h-6" />
                            </div>
                            <p className="text-[1.5rem] font-semibold text-[var(--color-text)] leading-[var(--leading-heading)]">
                              Drop a file here or choose a file
                            </p>
                            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)]">
                              MP4, MOV, MP3, WAV. Up to 100 MB.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between gap-3 p-4 rounded-[8px] bg-[var(--color-bg)] border border-[var(--color-border)]">
                              <div className="flex items-center gap-3 min-w-0">
                                <FileTagIcon className="w-6 h-6 text-[var(--color-brand)] shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-[length:var(--text-base)] font-semibold text-[var(--color-text)] truncate">
                                    {selectedFile.name}
                                  </p>
                                  <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)]">
                                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedFile(null);
                                  setFilePreviewUrl(null);
                                }}
                                aria-label="Remove selected file"
                                className="min-w-[48px] min-h-[48px] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer shrink-0"
                              >
                                <CloseCrossIcon className="w-5 h-5" />
                              </button>
                            </div>

                            {filePreviewUrl && (
                              <div className="space-y-3">
                                {selectedFile.type.startsWith('video') ? (
                                  <video
                                    ref={mediaRef}
                                    src={filePreviewUrl}
                                    controls
                                    onLoadedMetadata={(e) => setMediaDuration(e.currentTarget.duration)}
                                    className="w-full max-h-48 rounded-[8px] bg-black object-contain"
                                  />
                                ) : (
                                  <audio
                                    ref={mediaRef}
                                    src={filePreviewUrl}
                                    controls
                                    onLoadedMetadata={(e) => setMediaDuration(e.currentTarget.duration)}
                                    className="w-full"
                                  />
                                )}

                                {mediaDuration > 20 && (
                                  <div className="bg-[var(--color-bg)] rounded-[8px] p-4 space-y-3 border border-[var(--color-border)] text-[length:var(--text-base)]">
                                    <label className="flex items-center gap-3 min-h-[48px] cursor-pointer font-semibold text-[var(--color-text)]">
                                      <input
                                        type="checkbox"
                                        checked={useCustomSegment}
                                        onChange={(e) => setUseCustomSegment(e.target.checked)}
                                        className="w-5 h-5 accent-[var(--color-brand)]"
                                      />
                                      <TrimHandlesIcon className="w-5 h-5 text-[var(--color-brand)]" />
                                      <span>Select 15-second segment</span>
                                    </label>

                                    {useCustomSegment && (
                                      <div className="space-y-2">
                                        <div className="flex justify-between text-[length:var(--text-base)] text-[var(--color-text-muted)]">
                                          <span>Start: {formatSeconds(startTime)}</span>
                                          <span>End: {formatSeconds(Math.min(startTime + 15, mediaDuration))}</span>
                                        </div>
                                        <input
                                          type="range"
                                          min="0"
                                          max={Math.max(0, mediaDuration - 10)}
                                          step="1"
                                          value={startTime}
                                          onChange={(e) => {
                                            const val = parseFloat(e.target.value);
                                            setStartTime(val);
                                            if (mediaRef.current) mediaRef.current.currentTime = val;
                                          }}
                                          className="w-full min-h-[48px] accent-[var(--color-brand)] cursor-pointer"
                                        />
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}

                            {isUploading && (
                              <div className="space-y-2">
                                <div className="flex justify-between text-[length:var(--text-base)] text-[var(--color-text-muted)]">
                                  <span>Uploading file</span>
                                  <span>{uploadProgress}%</span>
                                </div>
                                <div className="w-full h-2.5 rounded-full bg-[var(--color-bg)] overflow-hidden">
                                  <div
                                    className="h-full bg-[var(--color-brand)] transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                  />
                                </div>
                              </div>
                            )}

                            {uploadError && (
                              <p className="text-[length:var(--text-base)] font-semibold text-[var(--color-brand)]">
                                {uploadError}
                              </p>
                            )}

                            <button
                              type="button"
                              onClick={handleUploadAndIdentify}
                              disabled={isUploading || isLoading}
                              className={`w-full min-h-[52px] px-[20px] rounded-[8px] text-[length:var(--text-base)] font-semibold flex items-center justify-center gap-2 transition-colors duration-150 ${
                                isUploading || isLoading
                                  ? 'bg-[var(--color-brand)] text-white cursor-wait'
                                  : 'bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white cursor-pointer'
                              }`}
                            >
                              {(isUploading || isLoading) && <SpinnerStrokeIcon className="w-5 h-5" />}
                              <span>{isUploading || isLoading ? 'Finding song' : 'Find song'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tab 3: Record audio */}
                    {activeTab === 'record' && (
                      <div className="space-y-4">
                        {!recordedBlob ? (
                          <div className="w-full min-h-[280px] flex flex-col items-center justify-center p-6 space-y-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[12px]">
                            <button
                              type="button"
                              onClick={isRecording ? stopRecording : startRecording}
                              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                              className="w-16 h-16 min-w-[48px] min-h-[48px] rounded-full bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white flex items-center justify-center cursor-pointer transition-colors duration-150"
                            >
                              {isRecording ? <StopGlyphIcon className="w-6 h-6" /> : <MicStrokeIcon className="w-7 h-7" />}
                            </button>

                            <p className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)] tabular-nums">
                              {formatSeconds(recordSeconds)} / 0:15
                            </p>
                            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)]">
                              Records up to 15 seconds.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {recordedAudioUrl && (
                              <audio
                                ref={recordAudioElementRef}
                                src={recordedAudioUrl}
                                onEnded={() => setIsPlayingRecord(false)}
                                className="hidden"
                              />
                            )}
                            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-[8px] bg-[var(--color-bg)] border border-[var(--color-border)]">
                              <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-text)]">
                                Recorded clip ({formatSeconds(recordSeconds)})
                              </span>
                              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                                <button
                                  type="button"
                                  onClick={togglePlayRecord}
                                  className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[length:var(--text-base)] font-semibold text-[var(--color-text)] flex items-center justify-center gap-2 cursor-pointer"
                                >
                                  {isPlayingRecord ? <PauseStrokeIcon className="w-5 h-5" /> : <PlayStrokeIcon className="w-5 h-5" />}
                                  <span>{isPlayingRecord ? 'Pause' : 'Preview'}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setRecordedBlob(null);
                                    setRecordedAudioUrl(null);
                                    setRecordSeconds(0);
                                  }}
                                  className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[length:var(--text-base)] font-semibold text-[var(--color-text)] cursor-pointer"
                                >
                                  Reset
                                </button>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={handleIdentifyRecording}
                              disabled={isUploading || isLoading}
                              className={`w-full min-h-[52px] px-[20px] rounded-[8px] text-[length:var(--text-base)] font-semibold flex items-center justify-center gap-2 transition-colors duration-150 ${
                                isUploading || isLoading
                                  ? 'bg-[var(--color-brand)] text-white cursor-wait'
                                  : 'bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white cursor-pointer'
                              }`}
                            >
                              {(isUploading || isLoading) && <SpinnerStrokeIcon className="w-5 h-5" />}
                              <span>{isUploading || isLoading ? 'Finding song' : 'Find song'}</span>
                            </button>
                          </div>
                        )}

                        {recordError && (
                          <p className="text-[length:var(--text-base)] font-semibold text-[var(--color-brand)]">
                            {recordError}
                          </p>
                        )}
                      </div>
                    )}

                    {error && (
                      <div className="p-4 rounded-[8px] border border-[var(--color-brand)] bg-[var(--color-bg)] text-[length:var(--text-base)] text-[var(--color-brand)] font-semibold">
                        {error}
                      </div>
                    )}
                  </div>
                )}
            </div>

            <div className="border-t border-[var(--color-border)] pt-6 space-y-4">
              <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-[length:var(--text-base)]">
                {/* Step 01: Source Intake */}
                <li className="p-3.5 sm:p-4 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-bg)]/50 flex flex-col justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[length:var(--text-caption)] font-mono text-[var(--color-text-muted)]">
                      <span className="font-bold text-[var(--color-text)] tabular-nums">01</span>
                      <span className="tracking-wider text-[11px] font-semibold">SOURCE</span>
                    </div>
                    <div className="font-semibold text-[var(--color-text)] text-[length:var(--text-base)] leading-snug">
                      Paste or upload
                    </div>
                    <p className="text-[length:var(--text-sm)] text-[var(--color-text-muted)] leading-relaxed">
                      Add a public link, audio/video file, or mic recording.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 pt-2 border-t border-[var(--color-border)]/70">
                    <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">Link</span>
                    <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">File</span>
                    <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">Mic</span>
                  </div>
                </li>

                {/* Step 02: Acoustic Match Engine */}
                <li className="p-3.5 sm:p-4 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-bg)]/50 flex flex-col justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[length:var(--text-caption)] font-mono text-[var(--color-text-muted)]">
                      <span className="font-bold text-[var(--color-brand)] tabular-nums">02</span>
                      <span className="tracking-wider text-[11px] font-semibold text-[var(--color-brand)]">MATCH</span>
                    </div>
                    <div className="font-semibold text-[var(--color-text)] text-[length:var(--text-base)] leading-snug">
                      Acoustic scan
                    </div>
                    <p className="text-[length:var(--text-sm)] text-[var(--color-text-muted)] leading-relaxed">
                      We match a 15-second acoustic fingerprint in seconds.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]/70 text-[11px] font-mono text-[var(--color-text-muted)]">
                    <span className="inline-flex items-center gap-0.5 text-[var(--color-brand)]" aria-hidden="true">
                      <span className="w-1 h-2 bg-current rounded-full" />
                      <span className="w-1 h-3.5 bg-current rounded-full" />
                      <span className="w-1 h-4 bg-current rounded-full" />
                      <span className="w-1 h-2.5 bg-current rounded-full" />
                      <span className="w-1 h-1.5 bg-current rounded-full" />
                    </span>
                    <span>15s sample</span>
                  </div>
                </li>

                {/* Step 03: Result & Download */}
                <li className="p-3.5 sm:p-4 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-bg)]/50 flex flex-col justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[length:var(--text-caption)] font-mono text-[var(--color-text-muted)]">
                      <span className="font-bold text-[var(--color-text)] tabular-nums">03</span>
                      <span className="tracking-wider text-[11px] font-semibold">DELIVER</span>
                    </div>
                    <div className="font-semibold text-[var(--color-text)] text-[length:var(--text-base)] leading-snug">
                      Track &amp; MP3
                    </div>
                    <p className="text-[length:var(--text-sm)] text-[var(--color-text-muted)] leading-relaxed">
                      Get the track title, artist, full lyrics &amp; MP3 download.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 pt-2 border-t border-[var(--color-border)]/70">
                    <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold">192k MP3</span>
                    <span className="text-[11px] font-mono text-[var(--color-text-muted)]">+ Lyrics</span>
                  </div>
                </li>
              </ol>

              <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)]">
                Free, no account needed. Files are deleted automatically after processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

