'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileAudio, FileVideo, AlertCircle, X, Smartphone } from 'lucide-react';

export default function FileDropzone({ 
  onFileSelect, 
  onFileSelected, 
  acceptedFormats, 
  acceptedMimes, 
  fromFormat = 'MP3', 
  maxSizeBytes = 1073741824 
}) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const fileCallback = onFileSelect || onFileSelected;
  const fmt = (fromFormat || '').toLowerCase();
  const isVideoTool = ['mp4', 'mov', 'mkv', 'webm', 'avi', 'm4v', '3gp', 'video'].some(v => fmt.includes(v));
  const isAudioTool = ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a', 'wma', 'opus', 'aiff', 'audio'].some(a => fmt.includes(a)) || !isVideoTool;

  // Compute robust accept string for mobile phone gallery and desktop file pickers
  const computedAccept = (() => {
    // If specific mimes or formats are passed, use/combine them
    const customParts = [];
    if (Array.isArray(acceptedMimes) && acceptedMimes.length > 0) {
      customParts.push(...acceptedMimes);
    }
    if (Array.isArray(acceptedFormats) && acceptedFormats.length > 0) {
      customParts.push(...acceptedFormats.map(f => (f.includes('/') ? f : `.${f.toLowerCase()}`)));
    }
    if (customParts.length > 0) {
      // Always ensure .mp3 and audio/mpeg are included for audio tools
      if (isAudioTool && !customParts.some(p => p.includes('mp3') || p.includes('mpeg'))) {
        customParts.unshift('.mp3', 'audio/mpeg');
      }
      return customParts.join(',');
    }

    if (isVideoTool && !isAudioTool) {
      return 'video/*,video/mp4,video/quicktime,video/x-matroska,video/webm,video/x-msvideo,.mp4,.mov,.m4v,.webm,.mkv,.avi,.3gp,.ts';
    }
    // Default for audio tools: fully support MP3 and all standard audio/video formats
    return 'audio/*,audio/mpeg,audio/mp3,.mp3,audio/wav,.wav,audio/flac,.flac,audio/aac,.aac,audio/ogg,.ogg,audio/m4a,.m4a,audio/x-m4a,video/mp4,.mp4,video/quicktime,.mov';
  })();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const validateAndSelectFile = (file) => {
    setError(null);
    if (!file) return;

    // Validate size limit (1GB)
    if (file.size > maxSizeBytes) {
      const mbLimit = maxSizeBytes / (1024 * 1024);
      setError(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed size is ${mbLimit}MB.`);
      return;
    }

    const fileExtension = (file.name.split('.').pop() || '').toLowerCase();
    const mimeType = (file.type || '').toLowerCase();

    // Universal audio extensions check
    const validAudioExts = ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a', 'wma', 'opus', 'aiff', 'm4r'];
    const validVideoExts = ['mp4', 'mov', 'm4v', 'webm', 'mkv', 'avi', '3gp', 'ts', 'flv', 'wmv'];

    if (isVideoTool && !isAudioTool) {
      const isValidVideo = mimeType.startsWith('video/') || validVideoExts.includes(fileExtension) || fileExtension === fmt;
      if (!isValidVideo) {
        setError(`Please select a valid video file (MP4, MOV, WebM, MKV, etc.) from your phone gallery or files.`);
        return;
      }
    } else {
      // Audio or Hybrid Audio/Video tool: accepts MP3, any audio, or video container with audio
      const isValid = 
        fileExtension === 'mp3' ||
        mimeType === 'audio/mpeg' ||
        mimeType === 'audio/mp3' ||
        mimeType.startsWith('audio/') || 
        validAudioExts.includes(fileExtension) || 
        validVideoExts.includes(fileExtension) ||
        (Array.isArray(acceptedFormats) && acceptedFormats.includes(fileExtension)) ||
        fileExtension === fmt;

      if (!isValid) {
        setError(`Please select a valid audio file (.mp3, .wav, .m4a, etc.).`);
        return;
      }
    }

    if (typeof fileCallback === 'function') {
      fileCallback(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') triggerFileInput(); }}
        className={`w-full py-12 sm:py-16 px-6 rounded-3xl cursor-pointer flex flex-col items-center justify-center space-y-4 transition-all duration-300 border-2 border-dashed select-none ${
          isDragActive
            ? 'border-blue-500 bg-blue-500/5 dropzone-dragover scale-[1.01]'
            : 'border-[var(--border-color)] bg-[var(--bg-card)] hover:border-blue-500/50 hover:bg-[var(--bg-card-hover)]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={computedAccept}
          onChange={handleFileInputChange}
        />

        <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-blue-500/10 text-[#0088ff] ${isDragActive ? 'animate-bounce' : ''}`}>
          <UploadCloud className="w-8 h-8" />
        </div>

        <div className="text-center space-y-1">
          <p className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
            {isVideoTool && !isAudioTool ? (
              <>Select or drop your <span className="text-[#0088ff] font-extrabold">MP4 / Video</span> file</>
            ) : (fmt === 'mp3' || fmt === 'audio' || fmt.includes('audio')) ? (
              <>Select or drop your <span className="text-[#0088ff] font-extrabold">MP3</span> or audio file</>
            ) : (
              <>Select or drop your <span className="text-[#0088ff] font-extrabold">.{fromFormat}</span> file</>
            )}
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Tap to choose from phone gallery, camera roll, or device files
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold text-[var(--text-muted)] bg-[var(--bg-main)] px-3.5 py-1.5 rounded-full border border-[var(--border-color)]">
          <span>Max: {formatFileSize(maxSizeBytes)}</span>
          <span className="text-[var(--border-color)]">•</span>
          <span>{isVideoTool && !isAudioTool ? 'Phone Gallery & Videos Supported' : (fmt === 'mp3' || fmt.includes('audio')) ? 'Supports .MP3, .WAV, .M4A, .FLAC & video audio' : `Format: .${fromFormat}`}</span>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30 flex items-start gap-3 text-red-500 animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="flex-1 flex justify-between items-center">
            <span className="text-xs font-semibold leading-relaxed">{error}</span>
            <button
              onClick={(e) => { e.stopPropagation(); setError(null); }}
              className="p-1 rounded-lg hover:bg-red-500/10 text-red-400 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
