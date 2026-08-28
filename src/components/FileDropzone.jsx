'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileAudio, FileVideo, AlertCircle, X, Smartphone } from 'lucide-react';

export default function FileDropzone({ onFileSelect, acceptedFormats, fromFormat, maxSizeBytes = 104857600 }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const isVideoTool = ['mp4', 'mov', 'mkv', 'webm', 'avi', 'm4v', '3gp'].includes((fromFormat || '').toLowerCase());
  const isAudioTool = ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a'].includes((fromFormat || '').toLowerCase());

  // Compute robust accept string for mobile phone gallery and desktop file pickers
  const computedAccept = (() => {
    if (isVideoTool) {
      return 'video/*,video/mp4,video/quicktime,video/x-matroska,video/webm,video/x-msvideo,.mp4,.mov,.m4v,.webm,.mkv,.avi,.3gp,.ts';
    }
    if (isAudioTool) {
      return 'audio/*,audio/mpeg,audio/mp3,audio/wav,audio/flac,audio/aac,audio/ogg,audio/m4a,.mp3,.wav,.flac,.aac,.ogg,.m4a';
    }
    if (Array.isArray(acceptedFormats) && acceptedFormats.length > 0) {
      return acceptedFormats.map(f => (f.includes('/') ? f : `.${f.toLowerCase()}`)).join(',');
    }
    return fromFormat ? `.${fromFormat.toLowerCase()}` : '*/*';
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

    // Validate size limit (100MB)
    if (file.size > maxSizeBytes) {
      const mbLimit = maxSizeBytes / (1024 * 1024);
      setError(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed size is ${mbLimit}MB.`);
      return;
    }

    const fileExtension = (file.name.split('.').pop() || '').toLowerCase();
    const mimeType = (file.type || '').toLowerCase();

    if (isVideoTool) {
      const validVideoExts = ['mp4', 'mov', 'm4v', 'webm', 'mkv', 'avi', '3gp', 'ts', 'flv', 'wmv'];
      const isValidVideo = mimeType.startsWith('video/') || validVideoExts.includes(fileExtension) || fileExtension === fromFormat?.toLowerCase();
      if (!isValidVideo) {
        setError(`Please select a valid video file (MP4, MOV, WebM, MKV, etc.) from your phone gallery or files.`);
        return;
      }
    } else if (isAudioTool) {
      const validAudioExts = ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a', 'wma', 'opus', 'aiff'];
      const isValidAudio = mimeType.startsWith('audio/') || validAudioExts.includes(fileExtension) || fileExtension === fromFormat?.toLowerCase();
      if (!isValidAudio) {
        setError(`Please select a valid audio file (.${fromFormat?.toLowerCase() || 'mp3'}, .wav, .m4a, etc.).`);
        return;
      }
    }

    onFileSelect(file);
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
            {isVideoTool ? (
              <>Select or drop your <span className="text-[#0088ff] font-extrabold">MP4 / Video</span> file</>
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
          <span>{isVideoTool ? 'Phone Gallery & Videos Supported' : `Format: .${fromFormat}`}</span>
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
