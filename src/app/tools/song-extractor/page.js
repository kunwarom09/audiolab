'use client';

import React, { useState, useEffect } from 'react';
import HeroCard from '@/components/HeroCard';
import ProgressTracker from '@/components/ProgressTracker';
import SongResultCard from '@/components/SongResultCard';
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
  ArrowRight
} from 'lucide-react';

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

const SONG_FINDER_FAQS = [
  {
    question: 'How do I find a song from an Instagram Reel?',
    answer: 'Open the Instagram Reel, tap the Share icon, select "Copy Link", and paste it into ILoveAudios Song Finder. Our tool analyzes the background audio and displays the track title, artist name, and album artwork in seconds.'
  },
  {
    question: 'Can I identify a song from a TikTok video?',
    answer: 'Yes! Simply copy the URL of any public TikTok video and paste it into Song Finder. Our recognition engine identifies viral sounds, remixed tracks, and official background songs effortlessly.'
  },
  {
    question: 'Can I find a song from a Facebook Reel?',
    answer: 'Absolutely. Copy the Facebook Reel link from the mobile app or web browser, paste it into our search bar, and let ILoveAudios extract the music details.'
  },
  {
    question: 'Can I identify a song without knowing its name?',
    answer: 'Yes. You do not need to know any lyrics, artist names, or titles. Our acoustic fingerprinting engine listens directly to the audio frequencies in your video link to identify the song.'
  },
  {
    question: 'Is ILoveAudios Song Finder free?',
    answer: 'Yes! ILoveAudios Song Finder is completely free to use with no subscription, hidden costs, or required software installation.'
  }
];

export default function SongExtractorPage() {
  const {
    history,
    setHistory,
    setIsHistoryOpen
  } = useApp();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

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

  const handleExtract = async (reelUrl) => {
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

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.message || 'Could not extract song from provided link.');
      }

      let finalResult = data;
      // If task was enqueued to background Celery worker, poll job status
      if (data.job_id && (data.status === 'queued' || data.status === 'processing')) {
        finalResult = await pollJobStatus(data.job_id);
      }

      setResult(finalResult);

      const newHistoryItem = {
        ...finalResult,
        timestamp: Date.now()
      };

      const updatedHistory = [newHistoryItem, ...history.filter(h => h.song?.title !== finalResult.song?.title)].slice(0, 20);
      setHistory(updatedHistory);
      localStorage.setItem('extractor_history', JSON.stringify(updatedHistory));

      // Smooth scroll to result
      setTimeout(() => {
        document.getElementById('extraction-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);

    } catch (err) {
      console.error('Extraction error:', err);
      setError(err.message || 'An unexpected error occurred during extraction.');
    } finally {
      setIsLoading(false);
    }
  };

  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.iloveaudios.com';
  const siteUrl = rawSiteUrl.replace(/\/+$/, '');

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Song Finder – Identify Any Song from a Video',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Music Identification Engine',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Find the song used in an Instagram Reel, TikTok, Facebook Reel, or Snapchat video. Paste a video link into ILoveAudios Song Finder and identify the song and artist.',
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
    name: 'How to Use Our Song Finder to Identify Songs from Videos',
    description: 'Step-by-step guide to identify background music, retrieve synchronized lyrics, and download MP3s from Instagram, TikTok, Facebook, or Snapchat videos.',
    totalTime: 'PT30S',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Copy the video or Reel link',
        text: 'Copy the public URL of any Instagram Reel, TikTok video, Facebook Reel, or Snapchat video.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Paste it into Song Finder',
        text: 'Paste the link into ILoveAudios Song Finder search box and click Find Song.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Let ILoveAudios analyze the video',
        text: 'Our recognition engine extracts the background audio and matches its acoustic fingerprint against millions of tracks.'
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Get the song name and artist',
        text: 'Instantly view song details, synchronized lyrics, official YouTube music video, and download high-quality MP3.'
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

      {/* 1. Hero Card (H1 + Intro + Tool Input) */}
      <div id="hero">
        <HeroCard onExtract={handleExtract} isLoading={isLoading} />
      </div>

      {/* Natural Context Introduction Box */}
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md space-y-3 text-center sm:text-left">
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          Find the song behind any Reel or video with ILoveAudios Song Finder. Paste a link from Instagram, TikTok, Facebook, or Snapchat, and our tool analyzes the video to help identify the music used in it. Whether it&apos;s a popular song, background music, or a track you can&apos;t recognize, Song Finder makes it easy to discover what you&apos;re listening to.
        </p>
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

      {/* Loading Progress State (Extraction Process Visualizer) */}
      {isLoading && (
        <div id="extraction-process" className="scroll-mt-24">
          <ProgressTracker />
        </div>
      )}

      {/* Extraction Result Card */}
      {result && !isLoading && (
        <div id="extraction-result" className="scroll-mt-24">
          <SongResultCard data={result} />
        </div>
      )}

      {/* ========================================================================= */}
      {/* RICH CONTENT SECTIONS (Optimized for "Song Finder" Intent)                */}
      {/* ========================================================================= */}

      {/* 2. Find the Song Used in Any Reel */}
      <section className="max-w-4xl mx-auto space-y-4 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-500 block">
            Video Audio Discovery
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Find the Song Used in Any Reel
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          Short-form videos on social media often feature incredible background music, but finding the original track title can be frustrating. Creators frequently tag their uploads with generic labels like &quot;Original Audio,&quot; overlay speech or laughter, or use unofficial remix versions.
        </p>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          ILoveAudios Song Finder solves this problem instantly. By isolating the video&apos;s raw audio stream and running acoustic recognition algorithms alongside metadata parsing, our song identifier matches the exact acoustic fingerprint to reveal the official track title, artist name, and album artwork in seconds.
        </p>
      </section>

      {/* 3. How to Use Our Song Finder (4 Steps) */}
      <section className="max-w-5xl mx-auto space-y-6 pt-4">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-500">
            Quick 4-Step Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How to Use Our Song Finder
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center font-black text-sm">
                1
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">
                Copy the video or Reel link
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Open Instagram, TikTok, Facebook, or Snapchat, tap the Share button on the video, and click &quot;Copy Link&quot;.
              </p>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center font-black text-sm">
                2
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">
                Paste it into Song Finder
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Paste the copied video link into the search box at the top of the page and click &quot;Find Song&quot;.
              </p>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-black text-sm">
                3
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">
                Let ILoveAudios analyze the video
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Our engine extracts the background audio stream and matches its acoustic fingerprint against millions of global tracks.
              </p>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-black text-sm">
                4
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">
                Get the song name and artist
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Instantly view song info, read synchronized lyrics, watch the official YouTube video, and download the MP3.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Platform-Specific Guides */}
      <section className="max-w-5xl mx-auto space-y-6 pt-4">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-pink-500">
            Supported Platforms
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Identify Songs from Any Social Video
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Instagram Reels */}
          <div className="glass-panel glass-panel-hover rounded-3xl p-6 space-y-3 border border-pink-500/20 bg-pink-500/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 border border-pink-500/20 flex items-center justify-center">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black text-[var(--text-primary)]">
                Find Songs from Instagram Reels
              </h2>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Instagram Reels often showcase viral background sounds and remixes without listing the original artist. Simply copy the Instagram Reel URL, paste it into Song Finder, and uncover the exact song title, artist, and album.
            </p>
          </div>

          {/* TikTok Videos */}
          <div className="glass-panel glass-panel-hover rounded-3xl p-6 space-y-3 border border-cyan-500/20 bg-cyan-500/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 flex items-center justify-center">
                <TikTokIcon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black text-[var(--text-primary)]">
                Find Songs from TikTok Videos
              </h2>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              TikTok is the home of sped-up edits, slowed & reverb tracks, and viral mashups. Song Finder uses multi-tiered audio and metadata intelligence to identify the core track behind any TikTok video link.
            </p>
          </div>

          {/* Facebook Reels */}
          <div className="glass-panel glass-panel-hover rounded-3xl p-6 space-y-3 border border-blue-500/20 bg-blue-500/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center">
                <FacebookIcon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black text-[var(--text-primary)]">
                Find Songs from Facebook Reels
              </h2>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Found a catchy tune in a Facebook Reel or shared video? Paste the Facebook link into our free Song Finder tool to identify the song name and artist without needing external phone apps.
            </p>
          </div>

          {/* Snapchat Videos */}
          <div className="glass-panel glass-panel-hover rounded-3xl p-6 space-y-3 border border-amber-500/20 bg-amber-500/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center">
                <SnapchatIcon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black text-[var(--text-primary)]">
                Find Songs from Snapchat Videos
              </h2>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Extract and recognize audio streams from Snapchat Spotlight and public Snapchat story links. Discover trending tracks and download high-quality MP3s with a single click.
            </p>
          </div>
        </div>
      </section>

      {/* 5. What Can Our Song Finder Identify? */}
      <section className="max-w-5xl mx-auto space-y-6 pt-4">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-500">
            Broad Audio Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            What Can Our Song Finder Identify?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Viral Hits & Chart-Toppers
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Recognizes trending pop, hip-hop, R&amp;B, and dance hits dominating global streaming charts.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 flex items-center justify-center">
              <Volume2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Remixes & Sped-Up Audio
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Detects pitch-shifted, nightcore, slowed-and-reverb, and custom DJ remixes from social video audio.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Indie & Global Music
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Identifies K-Pop, Latin, Afrobeat, Bollywood, and independent indie releases from around the world.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Soundtracks & Instrumentals
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Finds movie scores, anime openings, video game themes, background piano, and classical pieces.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Why Use ILoveAudios Song Finder? */}
      <section className="max-w-5xl mx-auto space-y-6 pt-4">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500">
            Key Advantages
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Why Use ILoveAudios Song Finder?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center shrink-0">
              <Music2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Shazam Acoustic Engine</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Uses acoustic audio fingerprinting to match raw audio streams against millions of songs in seconds.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Multi-Tiered Fallback</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              If acoustic matching fails due to voiceovers or noise, our engine falls back to NLP captions and lyrics queries.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-900/30 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Synchronized Lyrics</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              View line-numbered song lyrics with real-time text searching and a convenient one-click copy button.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 flex items-center justify-center shrink-0">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Official Video Embed</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Automatically discovers and embeds the official YouTube music video for instant in-browser listening.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">192kbps MP3 Download</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Download the identified song as a high-fidelity MP3 file directly to your phone or computer.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">100% Free & No Sign-Up</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Identify songs from any video instantly without installing third-party apps or signing up for accounts.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions */}
      <FaqSection items={SONG_FINDER_FAQS} />

      {/* 8. Cross-Linking: Related Audio & Video Converters */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[var(--iloveaudios-red)] block">
            Audio Conversion Suite
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            Convert & Edit Audio Files
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Convert your downloaded songs, voice notes, and video audio streams into any format.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <Link
            href="/tools/mp4-to-mp3"
            className="glass-panel rounded-xl p-3.5 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)]/40 hover:bg-[var(--bg-card-hover)] transition-all flex items-center justify-between text-xs font-bold text-[var(--text-primary)] group"
          >
            <span className="group-hover:text-[var(--iloveaudios-red)] transition-colors">MP4 to MP3</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--iloveaudios-red)] group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link
            href="/tools/mov-to-mp3"
            className="glass-panel rounded-xl p-3.5 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)]/40 hover:bg-[var(--bg-card-hover)] transition-all flex items-center justify-between text-xs font-bold text-[var(--text-primary)] group"
          >
            <span className="group-hover:text-[var(--iloveaudios-red)] transition-colors">MOV to MP3</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--iloveaudios-red)] group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link
            href="/tools/opus-to-mp3"
            className="glass-panel rounded-xl p-3.5 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)]/40 hover:bg-[var(--bg-card-hover)] transition-all flex items-center justify-between text-xs font-bold text-[var(--text-primary)] group"
          >
            <span className="group-hover:text-[var(--iloveaudios-red)] transition-colors">OPUS to MP3</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--iloveaudios-red)] group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link
            href="/tools/wav-to-mp3"
            className="glass-panel rounded-xl p-3.5 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)]/40 hover:bg-[var(--bg-card-hover)] transition-all flex items-center justify-between text-xs font-bold text-[var(--text-primary)] group"
          >
            <span className="group-hover:text-[var(--iloveaudios-red)] transition-colors">WAV to MP3</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--iloveaudios-red)] group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link
            href="/tools/mp3-to-wav"
            className="glass-panel rounded-xl p-3.5 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)]/40 hover:bg-[var(--bg-card-hover)] transition-all flex items-center justify-between text-xs font-bold text-[var(--text-primary)] group"
          >
            <span className="group-hover:text-[var(--iloveaudios-red)] transition-colors">MP3 to WAV</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--iloveaudios-red)] group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link
            href="/tools/flac-to-mp3"
            className="glass-panel rounded-xl p-3.5 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)]/40 hover:bg-[var(--bg-card-hover)] transition-all flex items-center justify-between text-xs font-bold text-[var(--text-primary)] group"
          >
            <span className="group-hover:text-[var(--iloveaudios-red)] transition-colors">FLAC to MP3</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--iloveaudios-red)] group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link
            href="/tools/m4a-to-mp3"
            className="glass-panel rounded-xl p-3.5 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)]/40 hover:bg-[var(--bg-card-hover)] transition-all flex items-center justify-between text-xs font-bold text-[var(--text-primary)] group"
          >
            <span className="group-hover:text-[var(--iloveaudios-red)] transition-colors">M4A to MP3</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--iloveaudios-red)] group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link
            href="/tools/webm-to-mp3"
            className="glass-panel rounded-xl p-3.5 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)]/40 hover:bg-[var(--bg-card-hover)] transition-all flex items-center justify-between text-xs font-bold text-[var(--text-primary)] group"
          >
            <span className="group-hover:text-[var(--iloveaudios-red)] transition-colors">WebM to MP3</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--iloveaudios-red)] group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </section>
    </div>
  );
}

