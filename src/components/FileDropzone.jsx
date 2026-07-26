'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileAudio, FileVideo, AlertCircle, X } from 'lucide-react';

export default function FileDropzone({ onFileSelect, acceptedFormats, fromFormat, maxSizeBytes = 104857600 }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

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

    // Validate size limit (e.g., 100MB for Guest)
    if (file.size > maxSizeBytes) {
      const mbLimit = maxSizeBytes / (1024 * 1024);
      setError(`File is too large. Maximum allowed size is ${mbLimit}MB.`);
      return;
    }

    // Validate extension matching fromFormat
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fromFormat && fileExtension !== fromFormat.toLowerCase()) {
      setError(`Invalid file type. Please upload a .${fromFormat.toLowerCase()} file.`);
      return;
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
    fileInputRef.current.click();
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
        className={`w-full py-16 px-6 rounded-3xl cursor-pointer flex flex-col items-center justify-center space-y-4 transition-all duration-300 border-2 border-dashed ${
          isDragActive
            ? 'border-blue-500 bg-blue-500/5 dropzone-dragover scale-[1.01]'
            : 'border-[var(--border-color)] bg-[var(--bg-card)] hover:border-blue-500/50 hover:bg-[var(--bg-card-hover)]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedFormats ? acceptedFormats.map(ext => `.${ext.toLowerCase()}`).join(',') : '*'}
          onChange={handleFileInputChange}
        />

        <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-blue-500/10 text-[#0088ff] ${isDragActive ? 'animate-bounce' : ''}`}>
          <UploadCloud className="w-8 h-8" />
        </div>

        <div className="text-center space-y-1">
          <p className="text-sm font-bold text-[var(--text-primary)]">
            Drag & drop your <span className="text-[#0088ff] font-extrabold">.{fromFormat}</span> file here
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            or click to browse local files
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-[10px] font-bold text-[var(--text-muted)] bg-[var(--bg-main)] px-3.5 py-1.5 rounded-full border border-[var(--border-color)]">
          <span>Max File Size: {formatFileSize(maxSizeBytes)}</span>
          <span className="text-[var(--border-color)]">|</span>
          <span>Formats: .{fromFormat}</span>
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
