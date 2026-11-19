'use client';

import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, RefreshCw, Copy, Check, Clock } from 'lucide-react';

export default function DownloadResult({ jobId, fileName, fileSize, onReset, ttlSeconds = 1800, backendApiUrl }) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(ttlSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const backendBase = backendApiUrl
    || process.env.NEXT_PUBLIC_BACKEND_API_URL
    || (typeof window !== 'undefined' && !window.location.hostname.includes('localhost') ? 'https://audiolab-dc5o.onrender.com' : '');

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
    <div className="w-full ui-card space-y-6 text-left">
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
          <CheckCircle className="w-8 h-8" />
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
            Conversion Completed!
          </h3>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] truncate" title={fileName}>
            {fileName}
          </p>
        </div>

        <span className="px-[20px] py-[12px] rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[length:var(--text-base)] font-semibold text-[var(--color-text)]">
          File Size: {formatFileSize(fileSize)}
        </span>
      </div>

      {/* Main Download Button */}
      <div>
        <a
          href={directDownloadUrl}
          download
          className="w-full min-h-[52px] px-[20px] rounded-[8px] btn-shazam text-[length:var(--text-base)] font-semibold flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="w-5 h-5" />
          <span>Download Converted File</span>
        </a>
      </div>

      {/* Utility Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={handleCopyLink}
          className="w-full min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-bg)] hover:border-[var(--color-text)] border border-[var(--color-border)] text-[length:var(--text-base)] font-semibold text-[var(--color-text)] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-5 h-5 text-emerald-700" /> : <Copy className="w-5 h-5" />}
          <span>{copied ? 'Link Copied' : 'Copy Download Link'}</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-bg)] hover:border-[var(--color-text)] border border-[var(--color-border)] text-[length:var(--text-base)] font-semibold text-[var(--color-text)] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Convert Another</span>
        </button>
      </div>

      {/* Expiration Countdown */}
      {timeLeft > 0 ? (
        <div className="p-4 rounded-[8px] bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center gap-2.5 text-[length:var(--text-base)] text-[var(--color-text)] font-semibold">
          <Clock className="w-5 h-5 text-[var(--color-brand)] shrink-0" />
          <span>File auto-deletes in {formatTime(timeLeft)} minutes</span>
        </div>
      ) : (
        <div className="p-4 rounded-[8px] bg-[var(--color-bg)] border border-[var(--color-brand)] flex items-center gap-2.5 text-[length:var(--text-base)] text-[var(--color-brand)] font-semibold">
          <Clock className="w-5 h-5 shrink-0" />
          <span>File has expired. Please convert again.</span>
        </div>
      )}
    </div>
  );
}
