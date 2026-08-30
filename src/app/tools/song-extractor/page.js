'use client';

import React, { useState, useEffect } from 'react';
import HeroCard from '@/components/HeroCard';
import ProgressTracker from '@/components/ProgressTracker';
import SongResultCard from '@/components/SongResultCard';
import FailedRecognitionCard from '@/components/FailedRecognitionCard';
import FaqSection from '@/components/FaqSection';
import { useApp } from '@/components/AppClientWrapper';
import Link from 'next/link';
import { 
  AlertTriangle, 
  Music2, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Globe, 
  Film, 
  Volume2, 
  Download, 
  Layers,
  ArrowRight,
  UploadCloud,
  Mic,
  Sliders
} from 'lucide-react';

const SONG_FINDER_FAQS = [
  {
    question: 'How do I find a song from an Instagram Reel or TikTok?',
    answer: 'Open the Reel or TikTok video, tap the Share button, select "Copy Link", and paste it into ILoveAudios Song Finder. Our engine demuxes the background audio and matches the acoustic fingerprint to reveal the title and artist.'
  },
  {
    question: 'Can I identify a song by uploading a video or audio file?',
    answer: 'Yes! Switch to the "Upload File" tab and upload any MP4, MOV, WebM, MP3, WAV, M4A, FLAC, or OGG file up to 100MB. You can analyze the full clip or select a specific 15-second timestamp.'
  },
  {
    question: 'Can I record a song playing around me in the browser?',
    answer: 'Yes! Tap the "Record Audio" tab and record 5 to 15 seconds of the song with your device microphone. ILoveAudios will capture the frequencies and identify the track immediately.'
  },
  {
    question: 'What if a song is not recognized on the first try?',
    answer: 'If the initial recognition fails due to speech or intro noise, use the "Try Another Section" button to analyze a different segment, upload a clearer clip, or record the music live.'
  },
  {
    question: 'Is ILoveAudios Song Finder free?',
    answer: 'Yes! ILoveAudios Song Finder is 100% free with no subscription, hidden paywalls, or software installation required.'
  }
];

export default function SongExtractorPage() {
  const {
    history,
    setHistory,
  } = useApp();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [inputTab, setInputTab] = useState('link'); // 'link' | 'upload' | 'record'
  const [lastFileId, setLastFileId] = useState(null);
  const [lastStartTime, setLastStartTime] = useState(0);

  const pollJobStatus = async (jobId) => {
    const maxPolls = 60; // 60 * 2s = 120s max
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

    // Smooth scroll to progress area
    setTimeout(() => {
      document.getElementById('extraction-process')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
        const newHistoryItem = {
          ...finalResult,
          timestamp: Date.now()
        };
        const updatedHistory = [newHistoryItem, ...history.filter(h => h.song?.title !== finalResult.song?.title)].slice(0, 20);
        setHistory(updatedHistory);
        localStorage.setItem('extractor_history', JSON.stringify(updatedHistory));
      }

      setTimeout(() => {
        document.getElementById('extraction-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);

    } catch (err) {
      console.error('Link extraction error:', err);
      setError(err.message || 'An unexpected error occurred during extraction.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdentifyFile = async (fileId, startTime, duration = 15) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setLastFileId(fileId);
    setLastStartTime(startTime || 0);

    setTimeout(() => {
      document.getElementById('extraction-process')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    try {
      const response = await fetch('/api/identify-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_id: fileId,
          start_time: typeof startTime === 'number' ? startTime : undefined,
          duration,
          async_mode: true
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
        const newHistoryItem = {
          ...finalResult,
          timestamp: Date.now()
        };
        const updatedHistory = [newHistoryItem, ...history.filter(h => h.song?.title !== finalResult.song?.title)].slice(0, 20);
        setHistory(updatedHistory);
        localStorage.setItem('extractor_history', JSON.stringify(updatedHistory));
      }

      setTimeout(() => {
        document.getElementById('extraction-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);

    } catch (err) {
      console.error('File identification error:', err);
      setError(err.message || 'An unexpected error occurred identifying the audio file.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetryAnotherSection = () => {
    if (lastFileId) {
      const nextStartTime = (lastStartTime || 0) + 15;
      handleIdentifyFile(lastFileId, nextStartTime, 15);
    } else {
      setInputTab('upload');
      setResult(null);
    }
  };

  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.iloveaudios.com';
  const siteUrl = rawSiteUrl.replace(/\/+$/, '');

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Song Finder – Identify Any Song from Video, Audio & Reels',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Music Identification Engine',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Find the song behind any video or audio clip. Paste a social media video link, upload a video or audio file, or record live music to identify the song and artist in seconds.',
    url: `${siteUrl}/tools/song-extractor`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Identify Any Song Using ILoveAudios Song Finder',
    description: 'Step-by-step guide to identify songs from video URLs, uploaded audio/video clips, or live browser recording.',
    totalTime: 'PT15S',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Choose your input method',
        text: 'Paste a video URL (Instagram, TikTok, Facebook, Snapchat), upload a video/audio file, or click Record to capture live music.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Analyze the acoustic fingerprint',
        text: 'ILoveAudios extracts the audio frequencies and matches the landmark hash against millions of indexed tracks.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Get song details and lyrics',
        text: 'View the verified song title, artist, album artwork, synchronized lyrics, official YouTube video, and high-quality MP3.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SONG_FINDER_FAQS.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12 animate-in fade-in duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(appSchema).replace(/</g, '\\u003c')
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c')
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c')
        }}
      />

      {/* 1. Hero Card (Unified Multi-Input: Link, Upload, Record) */}
      <div id="hero">
        <HeroCard 
          onExtractLink={handleExtractLink} 
          onIdentifyFile={handleIdentifyFile}
          isLoading={isLoading} 
          initialTab={inputTab}
        />
      </div>

      {/* Natural Context Introduction Box */}
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md space-y-3 text-center sm:text-left">
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          Find the song behind any Reel, TikTok, video file, or audio clip with ILoveAudios Song Finder. Paste a social media video link, upload a media file, or record music playing around you to identify the song in seconds. Whether it&apos;s a viral sound, background tune, or uncredited audio, Song Finder gives you the track title, artist name, and official listening links effortlessly.
        </p>
      </div>

      {/* Error Alert Box */}
      {error && (
        <div className="max-w-2xl mx-auto rounded-2xl p-4.5 border border-red-800/80 bg-red-950/90 text-red-100 shadow-2xl shadow-red-950/50 backdrop-blur-md flex items-start gap-3.5 animate-in fade-in">
          <div className="p-2 rounded-xl bg-red-900/60 border border-red-700/50 shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-300" />
          </div>
          <div className="flex-1 pt-0.5">
            <h4 className="text-sm font-bold text-red-100 tracking-wide">Processing Error</h4>
            <p className="text-xs text-red-200/90 leading-relaxed mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Loading Progress State */}
      {isLoading && (
        <div id="extraction-process" className="scroll-mt-24">
          <ProgressTracker />
        </div>
      )}

      {/* Extraction Result or Recovery Card */}
      {result && !isLoading && (
        <div id="extraction-result" className="scroll-mt-24">
          {result.success && result.song ? (
            <SongResultCard data={result} onReset={handleReset} />
          ) : (
            <FailedRecognitionCard 
              message={result.message}
              mediaInfo={result.media_info}
              onRetrySection={handleRetryAnotherSection}
              onSwitchToUpload={() => {
                setInputTab('upload');
                setResult(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSwitchToRecord={() => {
                setInputTab('record');
                setResult(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onReset={handleReset}
            />
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* RICH CONTENT SECTIONS                                                     */}
      {/* ========================================================================= */}

      {/* 2. Find Any Song from Whatever Media You Have */}
      <section className="max-w-4xl mx-auto space-y-4 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-500 block">
            Universal Audio Discovery
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Find the Song Behind Any Media
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          Short-form videos on social media often feature incredible background music, but finding the original track title can be difficult when creators use generic tags like &quot;Original Audio&quot; or layer dialogue over the beat.
        </p>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          ILoveAudios Song Finder solves this problem with 3 flexible ways to identify music: paste a public video link, upload any video or audio file directly, or record live music through your browser microphone. By isolating the audio stream and analyzing frequency landmarks, our recognition engine identifies the exact song title, artist, album, and synchronized lyrics.
        </p>
      </section>

      {/* 3. Three Ways to Find Any Song */}
      <section className="max-w-5xl mx-auto space-y-6 pt-4">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-500">
            3 Ways to Identify Music
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How to Use Song Finder
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center font-black text-sm">
                1
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">
                Paste Video Link
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Copy the link of any public Instagram Reel, TikTok video, Facebook Reel, or Snapchat video and paste it directly into Song Finder.
              </p>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-black text-sm">
                2
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">
                Upload File (Video / Audio)
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Upload MP4, MOV, WebM, MP3, WAV, or M4A files directly. You can analyze the full clip or choose a specific section.
              </p>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-black text-sm">
                3
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">
                Record Live Music
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Capture 5 to 15 seconds of audio playing nearby with your browser microphone to identify songs in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Supported Audio & Video Formats */}
      <section className="max-w-4xl mx-auto space-y-4 pt-4 border-t border-[var(--border-color)]">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500 block">
            Format Compatibility
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Supported Media & Platforms
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          ILoveAudios Song Finder accepts links from Instagram Reels, TikTok, Facebook Reels, Snapchat Spotlight, and YouTube Shorts. For direct uploads, we support high-definition video files (MP4, MOV, WebM, MKV) and lossless or compressed audio tracks (MP3, WAV, M4A, FLAC, OGG, AAC) up to 100MB.
        </p>
      </section>

      {/* 5. Frequently Asked Questions (FAQ Section) */}
      <section id="faqs" className="max-w-4xl mx-auto pt-6 border-t border-[var(--border-color)]">
        <FaqSection faqs={SONG_FINDER_FAQS} />
      </section>
    </div>
  );
}
