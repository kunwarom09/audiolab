'use client';

import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, RefreshCw, Copy, Check, Clock } from 'lucide-react';

export default function DownloadResult({ jobId, fileName, fileSize, onReset, ttlSeconds = 1800 }) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(ttlSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const backendBase = process.env.NEXT_PUBLIC_BACKEND_API_URL || '';
  const directDownloadUrl = backendBase 
    ? `${backendBase.replace(/\/$/, '')}/api/convert/download/${jobId}` 
    : `/api/convert/download/${jobId}`;

  const handleCopyLink = async () => {
    const downloadUrl = backendBase 
      ? directDownloadUrl 
      : `${window.location.origin}/api/convert/download/${jobId}`;
    try {
      await navigator.clipboard.writeText(downloadUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-xl mx-auto glass-panel rounded-3xl p-6 md:p-8 space-y-6 text-center animate-in fade-in duration-300">
      {/* Success Icon */}
      <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
        <CheckCircle className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-black text-[var(--text-primary)]">
          Conversion Completed!
        </h3>
        <p className="text-xs text-[var(--text-muted)] truncate max-w-sm sm:max-w-md mx-auto" title={fileName}>
          {fileName}
        </p>
        <span className="inline-block px-3 py-1 rounded-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[10px] font-bold text-[var(--text-secondary)] mt-1">
          File Size: {formatFileSize(fileSize)}
        </span>
      </div>

      {/* Main Download Button */}
      <div className="pt-2">
        <a
          href={directDownloadUrl}
          download
          className="w-full py-4 rounded-2xl btn-shazam text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
        >
          <Download className="w-5 h-5" />
          <span>Download Converted File</span>
        </a>
      </div>

      {/* Utility Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleCopyLink}
          className="py-3 px-4 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-secondary)] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Link Copied' : 'Copy Download Link'}</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="py-3 px-4 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-secondary)] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Convert Another</span>
        </button>
      </div>

      {/* Expiration Countdown */}
      {timeLeft > 0 ? (
        <div className="p-3 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center gap-2 text-[10px] text-amber-600 dark:text-amber-400 font-bold tracking-wide">
          <Clock className="w-3.5 h-3.5" />
          <span>File auto-deletes in {formatTime(timeLeft)} minutes</span>
        </div>
      ) : (
        <div className="p-3 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center justify-center gap-2 text-[10px] text-red-500 font-bold tracking-wide">
          <Clock className="w-3.5 h-3.5" />
          <span>File has expired. Please convert again.</span>
        </div>
      )}
    </div>
  );
}
