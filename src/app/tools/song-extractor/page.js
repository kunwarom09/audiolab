'use client';

import React, { useState, useEffect } from 'react';
import HeroCard from '@/components/HeroCard';
import ProgressTracker from '@/components/ProgressTracker';
import SongResultCard from '@/components/SongResultCard';
import FaqSection from '@/components/FaqSection';
import { useApp } from '@/components/AppClientWrapper';
import { AlertTriangle, Music2, ShieldCheck, Zap } from 'lucide-react';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TikTokIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 2.498 6.34 6.34 0 0 0 1.087 8.581 6.342 6.342 0 0 0 8.784-.967 6.29 6.29 0 0 0 1.536-4.14V9.012a8.163 8.163 0 0 0 4.793 1.54V7.108a4.787 4.787 0 0 1-1.573-.422z"/>
  </svg>
);

const SnapchatIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
    <path d="M12.004 2c-3.75 0-6.177 2.656-6.177 5.766 0 1.542.482 2.88 1.135 3.864.214.321.36.711.13 1.054-.3.448-1.517.65-2.22.75-.417.06-.693.393-.574.801.378 1.295 2.115 1.565 3.09 1.677.214.025.378.21.362.425-.078 1.05-.286 1.838-1.127 2.41-.334.227-.478.63-.306.985.497 1.026 2.378 1.488 4.394 1.488 1.303 0 2.893-.194 3.738-.724.32-.202.738-.172 1.01.096.793.784 1.764 1.173 2.825 1.173.348 0 .692-.042 1.03-.127.608-.153 1.014-.693.948-1.314-.078-.738-.283-1.62-.05-2.486.065-.24.275-.414.523-.427 1.098-.057 3.018-.28 3.42-1.687.124-.436-.188-.804-.636-.856-.757-.087-2.03-.275-2.338-.76-.23-.362-.09-.757.135-1.09.684-1.013 1.183-2.38 1.183-3.951C18.18 4.656 15.755 2 12.004 2z"/>
  </svg>
);

export default function SongExtractorPage() {
  const {
    user,
    history,
    setHistory,
    isLoginModalOpen,
    setIsLoginModalOpen,
    setIsHistoryOpen
  } = useApp();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [extractionCount, setExtractionCount] = useState(0);
  const [pendingUrl, setPendingUrl] = useState(null);

  // Initialize Extraction Count on Mount
  useEffect(() => {
    try {
      const savedCount = parseInt(localStorage.getItem('extractor_count') || '0', 10);
      queueMicrotask(() => {
        if (savedCount) setExtractionCount(savedCount);
      });
    } catch (err) {
      console.error('Failed to load extraction count:', err);
    }
  }, []);

  // Sync pendingUrl trigger if login modal completes successfully
  useEffect(() => {
    if (user && pendingUrl) {
      const urlToProcess = pendingUrl;
      setPendingUrl(null);
      setTimeout(() => {
        handleExtract(urlToProcess, true);
      }, 300);
    }
  }, [user, pendingUrl]);

  const pollJobStatus = async (jobId) => {
    const maxPolls = 60; // 60 * 2s = 120s max
    for (let i = 0; i < maxPolls; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await fetch(`/api/jobs/${jobId}`);
      if (!res.ok) continue;
      const jobData = await res.json();

      if (jobData.status === 'completed' && jobData.result) {
        if (!jobData.result.success) {
          throw new Error(jobData.result.error || jobData.result.message || 'Extraction failed.');
        }
        return jobData.result;
      } else if (jobData.status === 'failed') {
        throw new Error(jobData.error || 'Background extraction task failed.');
      }
    }
    throw new Error('Extraction task timed out. Please try again.');
  };

  const handleExtract = async (reelUrl, bypassLimitCheck = false) => {
    // Enforce 3 extractions limit for unauthenticated users
    if (!bypassLimitCheck && extractionCount >= 3 && !user) {
      setPendingUrl(reelUrl);
      setIsLoginModalOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: reelUrl, async_mode: true }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.message || 'Could not extract song from provided link.');
      }

      let finalResult = data;
      // If task was enqueued to background Celery worker, poll job status
      if (data.job_id && (data.status === 'queued' || data.status === 'processing')) {
        finalResult = await pollJobStatus(data.job_id);
      }

      setResult(finalResult);

      // Increment extraction count
      const nextCount = extractionCount + 1;
      setExtractionCount(nextCount);
      localStorage.setItem('extractor_count', nextCount.toString());

      const newHistoryItem = {
        ...finalResult,
        timestamp: Date.now()
      };

      const updatedHistory = [newHistoryItem, ...history.filter(h => h.song?.title !== finalResult.song?.title)].slice(0, 20);
      setHistory(updatedHistory);
      localStorage.setItem('extractor_history', JSON.stringify(updatedHistory));

    } catch (err) {
      console.error('Extraction error:', err);
      setError(err.message || 'An unexpected error occurred during extraction.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('extractor_history');
    localStorage.removeItem('reel_song_history');
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12">
      {/* Shazam Style Hero Card */}
      <div id="hero">
        <HeroCard onExtract={handleExtract} isLoading={isLoading} />
      </div>

      {/* Error Alert Box */}
      {error && (
        <div className="max-w-2xl mx-auto rounded-2xl p-4.5 border border-red-800/80 bg-red-950/90 text-red-100 shadow-2xl shadow-red-950/50 backdrop-blur-md flex items-start gap-3.5 animate-in fade-in">
          <div className="p-2 rounded-xl bg-red-900/60 border border-red-700/50 shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-300" />
          </div>
          <div className="flex-1 pt-0.5">
            <h4 className="text-sm font-bold text-red-100 tracking-wide">Extraction Error</h4>
            <p className="text-xs text-red-200/90 leading-relaxed mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Loading Progress State */}
      {isLoading && <ProgressTracker />}

      {/* Extraction Result Card */}
      {result && !isLoading && <SongResultCard data={result} />}

      {/* Supported Platforms Bar */}
      <section id="platforms" className="space-y-4 pt-4">
        <div className="text-center space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Supported Platforms
          </h3>
          <h4 className="text-xl font-extrabold text-[var(--text-primary)]">
            Extract Songs From Anywhere
          </h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass-panel glass-panel-hover rounded-2xl p-4 flex items-center justify-center gap-3">
            <InstagramIcon className="w-6 h-6 text-pink-500" />
            <span className="text-xs font-bold text-[var(--text-primary)]">Instagram Reels</span>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-4 flex items-center justify-center gap-3">
            <FacebookIcon className="w-6 h-6 text-blue-600" />
            <span className="text-xs font-bold text-[var(--text-primary)]">Facebook Reels</span>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-4 flex items-center justify-center gap-3">
            <TikTokIcon className="w-6 h-6 text-cyan-500" />
            <span className="text-xs font-bold text-[var(--text-primary)]">TikTok Videos</span>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-4 flex items-center justify-center gap-3">
            <SnapchatIcon className="w-6 h-6 text-yellow-500" />
            <span className="text-xs font-bold text-[var(--text-primary)]">Snapchat Spotlight</span>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="glass-panel glass-panel-hover rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#0088ff]">
            <Music2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Shazam Audio Engine</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Uses Shazam audio fingerprint recognition to analyze audio streams and identify background songs within seconds.
          </p>
        </div>

        <div className="glass-panel glass-panel-hover rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Full Lyrics & Sync</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Extracts complete song lyrics formatted with line numbers, search filter, and instant clipboard copy button.
          </p>
        </div>

        <div className="glass-panel glass-panel-hover rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Direct MP3 Download</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Download the full song MP3 directly to your computer in high-quality 192kbps audio format.
          </p>
        </div>
      </section>

      {/* Interactive FAQ Accordion Section */}
      <FaqSection />
    </div>
  );
}
