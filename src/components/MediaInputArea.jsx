'use client';

import React, { useState, useRef } from 'react';
import {
  CloseCrossIcon,
  FileTagIcon,
  MicStrokeIcon,
  TrimHandlesIcon,
  UploadTrayIcon,
  WaveformIcon,
} from './AudioIcons';

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

const StopStrokeIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className={className} aria-hidden="true">
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
);

export default function MediaInputArea({
  onExtractLink,
  onIdentifyFile,
  isLoading,
  initialTab = 'link',
  initialFile = null,
  linkPlaceholder = 'Paste Instagram, TikTok, YouTube Shorts, Facebook, or Snapchat link',
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [prevInitialTab, setPrevInitialTab] = useState(initialTab);

  if (initialTab !== prevInitialTab) {
    setPrevInitialTab(initialTab);
    setActiveTab(initialTab);
  }

  const [url, setUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const [selectedFile, setSelectedFile] = useState(initialFile);
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

  const sampleReels = [
    { label: 'YouTube Shorts', url: 'https://www.youtube.com/shorts/dQw4w9WgXcQ' },
    { label: 'Instagram Reel', url: 'https://www.instagram.com/reel/espresso-sabrina-carpenter' },
    { label: 'TikTok Video', url: 'https://www.tiktok.com/@creator/video/739123456789' },
    { label: 'Facebook Reel', url: 'https://www.facebook.com/reel/birds-of-a-feather-billie-eilish' },
    { label: 'Snapchat Spotlight', url: 'https://www.snapchat.com/spotlight/dua-lipa-houdini' },
  ];

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onExtractLink(url.trim());
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
      }
    } catch (err) {
      console.warn('Clipboard read failed:', err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file) => {
    setUploadError(null);
    if (file.size > 100 * 1024 * 1024) {
      setUploadError('File exceeds the 100 MB limit for song identification.');
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setFilePreviewUrl(objectUrl);
    setStartTime(0);
    setUseCustomSegment(false);
  };

  const handleUploadAndIdentify = async () => {
    if (!selectedFile || isLoading || isUploading) return;
    setIsUploading(true);
    setUploadProgress(10);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      setUploadProgress(40);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      setUploadProgress(80);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload media.');
      }

      setUploadProgress(100);
      setIsUploading(false);

      const segmentStart = useCustomSegment ? startTime : undefined;
      onIdentifyFile(data.file_id, segmentStart, 15);
    } catch (err) {
      console.error('File upload error:', err);
      setUploadError(err.message || 'Failed to process uploaded file.');
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
        const audioUrl = URL.createObjectURL(blob);
        setRecordedAudioUrl(audioUrl);
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
    } catch (err) {
      console.error('Microphone access denied:', err);
      setRecordError('Microphone access denied or unavailable. Allow microphone permissions in your browser.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (recordIntervalRef.current) {
      clearInterval(recordIntervalRef.current);
    }
    setIsRecording(false);
  };

  const handleIdentifyRecording = async () => {
    if (!recordedBlob || isLoading || isUploading) return;
    setIsUploading(true);
    setUploadError(null);

    try {
      const file = new File([recordedBlob], 'recorded_audio.webm', { type: recordedBlob.type });
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload recorded audio.');
      }

      setIsUploading(false);
      onIdentifyFile(data.file_id, 0, 15);
    } catch (err) {
      console.error('Recording upload error:', err);
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

  const formatSeconds = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isSubmitDisabled = !url.trim() || isLoading;

  return (
    <div className="w-full space-y-5">
      {/* Responsive Segmented Tabs */}
      <div
        role="tablist"
        aria-label="Song finder input method"
        className="w-full grid grid-cols-3 sm:inline-flex sm:w-auto items-center gap-1 p-1 bg-[var(--color-bg)] rounded-[10px] border border-[var(--color-border)]"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'link'}
          onClick={() => setActiveTab('link')}
          className={`flex items-center justify-center gap-1.5 min-h-[44px] px-2.5 sm:px-4 py-2 rounded-[8px] text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
            activeTab === 'link'
              ? 'bg-[var(--color-pill-active)] text-white shadow-sm'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
          }`}
        >
          <WaveformIcon className="w-4 h-4 shrink-0" />
          <span>Paste Link</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'upload'}
          onClick={() => setActiveTab('upload')}
          className={`flex items-center justify-center gap-1.5 min-h-[44px] px-2.5 sm:px-4 py-2 rounded-[8px] text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
            activeTab === 'upload'
              ? 'bg-[var(--color-pill-active)] text-white shadow-sm'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
          }`}
        >
          <UploadTrayIcon className="w-4 h-4 shrink-0" />
          <span>Upload File</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'record'}
          onClick={() => setActiveTab('record')}
          className={`flex items-center justify-center gap-1.5 min-h-[44px] px-2.5 sm:px-4 py-2 rounded-[8px] text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
            activeTab === 'record'
              ? 'bg-[var(--color-pill-active)] text-white shadow-sm'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
          }`}
        >
          <MicStrokeIcon className="w-4 h-4 shrink-0" />
          <span>Record Audio</span>
        </button>
      </div>

      {activeTab === 'link' && (
        <div className="space-y-3">
          <form onSubmit={handleLinkSubmit} className="space-y-3">
            <label htmlFor="subpage-song-finder-url" className="sr-only">
              Video URL
            </label>
            <div className="relative flex items-center bg-[var(--color-bg)] rounded-[10px] p-1.5 border border-[var(--color-border)] focus-within:border-[var(--color-brand)] transition-colors">
              <input
                id="subpage-song-finder-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={linkPlaceholder}
                className="flex-1 min-w-0 min-h-[44px] sm:min-h-[48px] bg-transparent px-3 sm:px-4 text-sm sm:text-base text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
                disabled={isLoading}
              />

              {url && (
                <button
                  type="button"
                  onClick={() => setUrl('')}
                  aria-label="Clear URL"
                  className="w-9 h-9 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer shrink-0"
                >
                  <CloseCrossIcon className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={handlePaste}
                className="shrink-0 min-h-[38px] px-3.5 sm:px-4 rounded-[6px] text-xs sm:text-sm font-semibold text-[var(--color-text)] bg-[var(--color-surface)] hover:border-[var(--color-text)] border border-[var(--color-border)] cursor-pointer transition-colors"
              >
                Paste
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`w-full min-h-[48px] sm:min-h-[52px] px-5 rounded-[10px] font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-sm ${
                isSubmitDisabled
                  ? 'bg-[var(--color-disabled-bg)] text-[var(--color-disabled-fg)] cursor-not-allowed'
                  : 'bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white cursor-pointer active:scale-[0.99]'
              }`}
            >
              {isLoading ? 'Finding...' : 'Find Song'}
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-[var(--color-text-muted)] font-medium mr-1">Examples:</span>
            {sampleReels.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setUrl(sample.url);
                  onExtractLink(sample.url);
                }}
                className="px-2.5 py-1.5 rounded-full bg-[var(--color-bg)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-xs font-medium transition-colors cursor-pointer"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      )}

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
              className={`w-full min-h-[280px] p-6 sm:p-8 rounded-[16px] border-2 border-dashed transition-colors duration-150 cursor-pointer flex flex-col items-center justify-center text-center gap-4 ${
                isDragging
                  ? 'border-[var(--color-brand)] bg-[var(--color-bg)]'
                  : 'border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-brand)]'
              }`}
            >
              <div className="space-y-2">
                <p className="text-[1.5rem] font-semibold text-[var(--color-text)] leading-[var(--leading-heading)]">
                  Drop a video or audio file here, or click to browse
                </p>
                <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)]">
                  MP4, MOV, WebM, MKV, MP3, WAV, M4A, FLAC, OGG — max 100 MB
                </p>
              </div>
              <span className="inline-flex items-center justify-center min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-brand)] text-white text-[length:var(--text-base)] font-semibold shrink-0">
                Choose File
              </span>
            </div>
          ) : (
            <div className="bg-[var(--color-bg)] rounded-[16px] p-6 sm:p-8 border border-[var(--color-border)] space-y-4">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-[8px] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-brand)] flex items-center justify-center shrink-0">
                    <FileTagIcon className="w-6 h-6" />
                  </div>
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
                  className="min-w-[48px] min-h-[48px] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] rounded-[8px] cursor-pointer shrink-0"
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
                      className="w-full max-h-56 rounded-[8px] bg-black object-contain"
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
                    <div className="bg-[var(--color-surface)] rounded-[8px] p-4 space-y-2 border border-[var(--color-border)] text-[length:var(--text-base)]">
                      <label className="flex items-center gap-3 min-h-[48px] cursor-pointer font-semibold text-[var(--color-text)]">
                        <input
                          type="checkbox"
                          checked={useCustomSegment}
                          onChange={(e) => setUseCustomSegment(e.target.checked)}
                          className="w-5 h-5 accent-[var(--color-brand)]"
                        />
                        <TrimHandlesIcon className="w-5 h-5 text-[var(--color-brand)]" />
                        <span>Select 15-second segment to scan (optional)</span>
                      </label>

                      {useCustomSegment && (
                        <div className="space-y-2 pt-1">
                          <div className="flex items-center justify-between text-[length:var(--text-base)] text-[var(--color-text-muted)]">
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
                  <div className="flex justify-between text-[length:var(--text-base)] font-medium text-[var(--color-text-muted)]">
                    <span>Uploading media...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-[var(--color-brand)] h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {uploadError && (
                <div className="p-4 rounded-[8px] border border-[var(--color-brand)] bg-[var(--color-surface)] text-[var(--color-brand)] text-[length:var(--text-base)] font-medium">
                  {uploadError}
                </div>
              )}

              <button
                type="button"
                onClick={handleUploadAndIdentify}
                disabled={isUploading || isLoading}
                className={`w-full min-h-[52px] px-[20px] rounded-[8px] font-semibold text-[length:var(--text-base)] transition-colors duration-150 ${
                  isUploading || isLoading
                    ? 'bg-[var(--color-disabled-bg)] text-[var(--color-disabled-fg)] cursor-not-allowed'
                    : 'bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white cursor-pointer'
                }`}
              >
                {isUploading || isLoading ? 'Analyzing Media...' : 'Identify Song in File'}
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'record' && (
        <div className="bg-[var(--color-bg)] rounded-[16px] p-6 sm:p-8 border border-[var(--color-border)] min-h-[280px] flex flex-col justify-center space-y-4">
          {!recordedBlob ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-[length:var(--text-h3)] font-semibold text-[var(--color-text)]">
                  {isRecording ? `Recording: ${formatSeconds(recordSeconds)} / 0:15` : 'Record 5 to 15 seconds of audio'}
                </h3>
                <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-text-muted)]">
                  {isRecording
                    ? 'Keep your device near the audio source. Stops automatically at 15 seconds.'
                    : 'Allow microphone access in your browser to capture ambient music.'}
                </p>
              </div>

              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] font-semibold text-[length:var(--text-base)] text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                {isRecording ? <StopStrokeIcon className="w-5 h-5" /> : <MicStrokeIcon className="w-5 h-5" />}
                <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-[length:var(--text-h3)] font-semibold text-[var(--color-text)]">
                  Recorded clip ({formatSeconds(recordSeconds)})
                </h3>
                <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)]">
                  Preview the recording or start song identification.
                </p>
              </div>

              {recordedAudioUrl && (
                <audio
                  ref={recordAudioElementRef}
                  src={recordedAudioUrl}
                  onEnded={() => setIsPlayingRecord(false)}
                  className="hidden"
                />
              )}

              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlayRecord}
                  className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-[length:var(--text-base)] font-semibold flex items-center justify-center gap-2 cursor-pointer"
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
                  className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-[length:var(--text-base)] font-semibold cursor-pointer"
                >
                  Record Again
                </button>

                <button
                  type="button"
                  onClick={handleIdentifyRecording}
                  disabled={isLoading || isUploading}
                  className={`w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] font-semibold text-[length:var(--text-base)] transition-colors duration-150 ${
                    isLoading || isUploading
                      ? 'bg-[var(--color-disabled-bg)] text-[var(--color-disabled-fg)] cursor-not-allowed'
                      : 'bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white cursor-pointer'
                  }`}
                >
                  {isLoading || isUploading ? 'Finding Song...' : 'Identify Recording'}
                </button>
              </div>
            </div>
          )}

          {recordError && (
            <div className="p-4 rounded-[8px] border border-[var(--color-brand)] bg-[var(--color-surface)] text-[var(--color-brand)] text-[length:var(--text-base)] font-medium">
              {recordError}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
