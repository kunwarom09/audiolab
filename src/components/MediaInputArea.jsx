'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Clipboard, 
  X, 
  ArrowRight, 
  UploadCloud, 
  Mic, 
  Square, 
  RotateCcw, 
  Play, 
  Pause, 
  Film, 
  Music, 
  CheckCircle2, 
  AlertCircle,
  Sliders,
  Sparkles,
  Link2
} from 'lucide-react';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TikTokIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 2.498 6.34 6.34 0 0 0 1.087 8.581 6.342 6.342 0 0 0 8.784-.967 6.29 6.29 0 0 0 1.536-4.14V9.012a8.163 8.163 0 0 0 4.793 1.54V7.108a4.787 4.787 0 0 1-1.573-.422z"/>
  </svg>
);

const SnapchatIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
    <path d="M12.004 2c-3.75 0-6.177 2.656-6.177 5.766 0 1.542.482 2.88 1.135 3.864.214.321.36.711.13 1.054-.3.448-1.517.65-2.22.75-.417.06-.693.393-.574.801.378 1.295 2.115 1.565 3.09 1.677.214.025.378.21.362.425-.078 1.05-.286 1.838-1.127 2.41-.334.227-.478.63-.306.985.497 1.026 2.378 1.488 4.394 1.488 1.303 0 2.893-.194 3.738-.724.32-.202.738-.172 1.01.096.793.784 1.764 1.173 2.825 1.173.348 0 .692-.042 1.03-.127.608-.153 1.014-.693.948-1.314-.078-.738-.283-1.62-.05-2.486.065-.24.275-.414.523-.427 1.098-.057 3.018-.28 3.42-1.687.124-.436-.188-.804-.636-.856-.757-.087-2.03-.275-2.338-.76-.23-.362-.09-.757.135-1.09.684-1.013 1.183-2.38 1.183-3.951C18.18 4.656 15.755 2 12.004 2z"/>
  </svg>
);

const YouTubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function MediaInputArea({ 
  onExtractLink, 
  onIdentifyFile, 
  isLoading,
  initialTab = 'link',
  initialFile = null
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'link' | 'upload' | 'record'
  
  // Link state
  const [url, setUrl] = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState(null);

  // Upload state
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

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [isPlayingRecord, setIsPlayingRecord] = useState(false);
  const [recordError, setRecordError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recordIntervalRef = useRef(null);
  const recordAudioElementRef = useRef(null);

  // Sample links
  const sampleReels = [
    { label: 'Instagram Reel', icon: InstagramIcon, url: 'https://www.instagram.com/reel/espresso-sabrina-carpenter' },
    { label: 'TikTok Video', icon: TikTokIcon, url: 'https://www.tiktok.com/@creator/video/739123456789' },
    { label: 'Facebook Reel', icon: FacebookIcon, url: 'https://www.facebook.com/reel/birds-of-a-feather-billie-eilish' },
    { label: 'Snapchat Spotlight', icon: SnapchatIcon, url: 'https://www.snapchat.com/spotlight/dua-lipa-houdini' }
  ];

  // Auto-detect platform from URL
  useEffect(() => {
    if (!url || !url.trim()) {
      setDetectedPlatform(null);
      return;
    }
    const val = url.toLowerCase().trim();
    if (val.includes('instagram.com')) {
      setDetectedPlatform({ name: 'Instagram', icon: InstagramIcon, color: 'text-pink-500' });
    } else if (val.includes('tiktok.com')) {
      setDetectedPlatform({ name: 'TikTok', icon: TikTokIcon, color: 'text-cyan-400' });
    } else if (val.includes('facebook.com') || val.includes('fb.watch')) {
      setDetectedPlatform({ name: 'Facebook', icon: FacebookIcon, color: 'text-blue-500' });
    } else if (val.includes('snapchat.com')) {
      setDetectedPlatform({ name: 'Snapchat', icon: SnapchatIcon, color: 'text-yellow-400' });
    } else if (val.includes('youtube.com/shorts') || val.includes('youtu.be')) {
      setDetectedPlatform({ name: 'YouTube Shorts', icon: YouTubeIcon, color: 'text-red-500' });
    } else if (val.startsWith('http://') || val.startsWith('https://')) {
      setDetectedPlatform({ name: 'Video URL', icon: Link2, color: 'text-slate-400' });
    } else {
      setDetectedPlatform(null);
    }
  }, [url]);

  // Handle URL submit
  const handleLinkSubmit = (e) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onExtractLink(url.trim());
    }
  };

  // Clipboard paste
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

  // File selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file) => {
    setUploadError(null);
    if (file.size > 100 * 1024 * 1024) {
      setUploadError('File exceeds 100MB limit. Please upload a smaller clip or trim it first.');
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setFilePreviewUrl(objectUrl);
    setStartTime(0);
    setUseCustomSegment(false);
  };

  // Upload & identify
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
        body: formData
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

  // Recording Logic
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
      setRecordError('Microphone access denied or unavailable. Please allow microphone permissions in your browser.');
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
        body: formData
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

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* 3-Way Mode Tabs */}
      <div className="flex items-center justify-center p-1 bg-slate-100 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs max-w-md mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab('link')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'link'
              ? 'bg-white dark:bg-slate-800 text-[var(--text-primary)] shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Search className="w-4 h-4 text-[var(--iloveaudios-red)]" />
          <span>Paste Link</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'upload'
              ? 'bg-white dark:bg-slate-800 text-[var(--text-primary)] shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <UploadCloud className="w-4 h-4 text-blue-500" />
          <span>Upload File</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('record')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'record'
              ? 'bg-white dark:bg-slate-800 text-[var(--text-primary)] shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Mic className="w-4 h-4 text-emerald-500" />
          <span>Record Audio</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PASTE LINK                                                        */}
      {/* ========================================================================= */}
      {activeTab === 'link' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <form onSubmit={handleLinkSubmit} className="relative">
            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl p-2 gap-2 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
              <div className="pl-3 text-[var(--iloveaudios-red)] shrink-0">
                {detectedPlatform ? (
                  <detectedPlatform.icon className={`w-5 h-5 ${detectedPlatform.color}`} />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </div>

              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste Instagram, TikTok, Facebook, Snapchat, or video link..."
                className="w-full bg-transparent px-2 py-3 text-sm md:text-base text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none font-medium"
                disabled={isLoading}
              />

              {detectedPlatform && (
                <span className="hidden md:inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
                  {detectedPlatform.name}
                </span>
              )}

              {url && (
                <button
                  type="button"
                  onClick={() => setUrl('')}
                  className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={handlePaste}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 rounded-xl transition-all border border-slate-200 dark:border-white/10 cursor-pointer shrink-0"
                title="Paste from clipboard"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>Paste</span>
              </button>

              <button
                type="submit"
                disabled={!url.trim() || isLoading}
                className={`px-5 py-3 rounded-xl font-bold text-sm text-white flex items-center gap-2 transition-all shrink-0 ${
                  !url.trim() || isLoading
                    ? 'bg-[var(--iloveaudios-red)] text-white opacity-60 cursor-not-allowed'
                    : 'bg-[var(--iloveaudios-red)] hover:bg-red-700 text-white shadow-sm hover:scale-[1.01] active:scale-100 cursor-pointer'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="hidden sm:inline">Finding Song...</span>
                  </>
                ) : (
                  <>
                    <span>Find Song</span>
                    <ArrowRight className="w-4 h-4 hidden md:inline" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Sample Links */}
          <div className="flex flex-wrap items-center gap-2 px-1 text-xs">
            <span className="text-[var(--text-secondary)] font-bold">Try sample:</span>
            {sampleReels.map((sample, idx) => {
              const Icon = sample.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setUrl(sample.url);
                    onExtractLink(sample.url);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Icon className="w-3 h-3 text-[var(--iloveaudios-red)]" />
                  <span>{sample.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: UPLOAD MEDIA FILE                                                 */}
      {/* ========================================================================= */}
      {activeTab === 'upload' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/mp4,video/quicktime,video/webm,video/x-matroska,audio/mpeg,audio/wav,audio/mp4,audio/aac,audio/ogg,audio/flac"
            className="hidden"
          />

          {!selectedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) processSelectedFile(e.dataTransfer.files[0]);
              }}
              className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[var(--iloveaudios-red)] dark:hover:border-[var(--iloveaudios-red)] bg-white dark:bg-slate-900 rounded-3xl p-8 text-center cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-[var(--iloveaudios-red)] flex items-center justify-center mx-auto shadow-inner">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm md:text-base font-black text-[var(--text-primary)]">
                  Click to upload or drag and drop video / audio
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Supports MP4, MOV, WebM, MP3, WAV, M4A, FLAC, OGG (Max 100MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              {/* File Info Bar */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[var(--iloveaudios-red)] flex items-center justify-center shrink-0">
                    {selectedFile.type.startsWith('video') ? <Film className="w-5 h-5" /> : <Music className="w-5 h-5" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[var(--text-primary)] truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'Media File'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setFilePreviewUrl(null);
                  }}
                  className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Media Preview Player */}
              {filePreviewUrl && (
                <div className="space-y-3">
                  {selectedFile.type.startsWith('video') ? (
                    <video
                      ref={mediaRef}
                      src={filePreviewUrl}
                      controls
                      onLoadedMetadata={(e) => setMediaDuration(e.currentTarget.duration)}
                      className="w-full max-h-48 rounded-xl bg-black object-contain"
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

                  {/* Section Selection Checkbox & Slider */}
                  {mediaDuration > 20 && (
                    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 space-y-2 border border-slate-200 dark:border-slate-700/60 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200">
                        <input
                          type="checkbox"
                          checked={useCustomSegment}
                          onChange={(e) => setUseCustomSegment(e.target.checked)}
                          className="rounded text-[var(--iloveaudios-red)] focus:ring-[var(--iloveaudios-red)]"
                        />
                        <Sliders className="w-3.5 h-3.5 text-blue-500" />
                        <span>Select specific section to analyze (Optional)</span>
                      </label>

                      {useCustomSegment && (
                        <div className="space-y-2 pt-1 animate-in fade-in">
                          <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--text-muted)]">
                            <span>Start: {formatSeconds(startTime)}</span>
                            <span>End: {formatSeconds(Math.min(startTime + 15, mediaDuration))} (15s slice)</span>
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
                            className="w-full accent-[var(--iloveaudios-red)] cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Upload Progress Bar */}
              {isUploading && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-[var(--text-muted)]">
                    <span>Uploading media...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[var(--iloveaudios-red)] h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Error Box */}
              {uploadError && (
                <div className="p-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Action Button */}
              <button
                type="button"
                onClick={handleUploadAndIdentify}
                disabled={isUploading || isLoading}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-[var(--iloveaudios-red)] hover:bg-red-700 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isUploading || isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Analyzing Media...</span>
                  </>
                ) : (
                  <>
                    <span>Identify Song in File</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: RECORD LIVE AUDIO                                                 */}
      {/* ========================================================================= */}
      {activeTab === 'record' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 text-center space-y-5 shadow-sm">
            {!recordedBlob ? (
              <div className="space-y-4">
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                  {isRecording && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60"></span>
                  )}
                  <button
                    type="button"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center text-white transition-all shadow-lg cursor-pointer ${
                      isRecording
                        ? 'bg-red-600 hover:bg-red-700 shadow-red-500/50 scale-105'
                        : 'bg-[var(--iloveaudios-red)] hover:bg-red-700 shadow-red-500/30 hover:scale-105'
                    }`}
                    title={isRecording ? 'Stop Recording' : 'Start Recording'}
                  >
                    {isRecording ? <Square className="w-7 h-7" /> : <Mic className="w-8 h-8" />}
                  </button>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-black text-[var(--text-primary)]">
                    {isRecording ? `Recording... (${formatSeconds(recordSeconds)} / 0:15)` : 'Record 5–15 seconds of music'}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
                    {isRecording
                      ? 'Hold your device close to the music source. Recording stops automatically at 15s.'
                      : 'Tap the microphone to capture music playing around you or on your device.'}
                  </p>
                </div>

                {isRecording && (
                  <div className="flex items-center justify-center gap-1.5 pt-2">
                    {[0.1, 0.3, 0.2, 0.4, 0.15, 0.35, 0.25, 0.45].map((delay, idx) => (
                      <div
                        key={idx}
                        className="w-1.5 h-6 bg-[var(--iloveaudios-red)] rounded-full animate-pulse"
                        style={{ animationDelay: `${delay}s`, animationDuration: '0.6s' }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-black text-[var(--text-primary)]">
                    Audio Clip Recorded ({formatSeconds(recordSeconds)})
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Preview your recorded sample before finding the song.
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

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={togglePlayRecord}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    {isPlayingRecord ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlayingRecord ? 'Pause' : 'Preview'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRecordedBlob(null);
                      setRecordedAudioUrl(null);
                      setRecordSeconds(0);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Record Again</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleIdentifyRecording}
                  disabled={isLoading || isUploading}
                  className="w-full max-w-sm mx-auto py-3.5 rounded-xl font-bold text-sm text-white bg-[var(--iloveaudios-red)] hover:bg-red-700 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
                >
                  {isLoading || isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Finding Song...</span>
                    </>
                  ) : (
                    <>
                      <span>Find Song from Recording</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}

            {recordError && (
              <div className="p-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-medium flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{recordError}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
