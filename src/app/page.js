'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import FaqSection from '@/components/FaqSection';
import { TOOLS } from '@/lib/toolsConfig';
import { Music2, ShieldCheck, Zap, Sparkles, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does the AI Song Finder work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Paste any Instagram Reel, TikTok video, Facebook Reel, or Snapchat Spotlight URL. Our Shazam-powered audio recognition engine extracts the background audio stream and matches its acoustic fingerprint against millions of tracks to identify the song title, artist, album, and release details in seconds.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this online Song Finder completely free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! You can identify unlimited songs, view complete synchronized lyrics, watch official YouTube music videos, and download high-quality MP3 files with zero cost and no account registration required.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I download the extracted song as an MP3?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Once the song is identified, simply click the "Download Full Song (MP3)" button. Our engine will fetch and convert the track into a high-quality 192kbps MP3 audio file directly onto your device.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which social media platforms are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Song Finder supports direct video links from Instagram Reels, TikTok Videos, Facebook Reels, Snapchat Spotlight, and YouTube Shorts.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I view full lyrics and watch the official music video?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, every extraction automatically provides complete line-by-line song lyrics with a built-in search filter and one-click copy button, as well as an embedded official YouTube music video player.'
        }
      }
    ]
  };

  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.iloveaudios.com';
  const siteUrl = rawSiteUrl.replace(/\/+$/, '');

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'iLoveAudios Free Audio Tools & Converters',
    numberOfItems: Object.keys(TOOLS).length,
    itemListElement: Object.values(TOOLS).map((tool, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: tool.title,
      description: tool.description,
      url: `${siteUrl}/tools/${tool.slug}`
    }))
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'iLoveAudios',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '2.0.0',
    description: 'Free online audio tools and converters to convert, edit, and identify audio files.',
    url: siteUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'AI Song Identification & Extraction from Reels, TikTok & Shorts',
      'MP4 to MP3 Audio Extraction',
      'MP4 to WAV Lossless Audio Extraction',
      'MOV to MP3 & MOV to WAV Audio Extraction',
      'AVI, MKV, WebM, 3GP, WMV to MP3 Converters',
      'MP3 to WAV & WAV to MP3 Conversion',
      'FLAC to MP3 & FLAC to WAV Audio Conversion',
      'M4A to MP3 & M4A to WAV Apple Audio Conversion',
      'AAC, OGG, WMA, OPUS, M4R Audio Converters',
      'Studio Quality 320kbps MP3 Bitrate Support',
      'Synchronized Song Lyrics Lookup',
      'Fast Cloud-Accelerated Audio Processing'
    ]
  };

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'Audio Utilities', label: 'Audio Utilities' },
    { id: 'AI Tools', label: 'AI Tools' },
    { id: 'Audio Converters', label: 'Audio Converters' },
    { id: 'Video to Audio', label: 'Video to Audio' }
  ];

  // Filter tools dynamically
  const filteredTools = Object.values(TOOLS).filter((tool) => {
    if (activeFilter === 'all') return true;
    return tool.category === activeFilter;
  });

  return (
    <div className="w-full space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c')
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c')
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema).replace(/</g, '\\u003c')
        }}
      />

      {/* Flagship Product Hero: Song Finder Spotlight */}
      <section className="pt-10 sm:pt-14 pb-8 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="shazam-hero-card p-6 sm:p-10 md:p-12 rounded-3xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-[var(--iloveaudios-red)] border border-red-500/20 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Audio Tool</span>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
              Find the Song Behind Any Video
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Paste a video link, upload an audio/video clip, or record live music to identify the song and artist in seconds.
            </p>
          </div>

          {/* 3 Input Methods Preview Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-2xl mx-auto">
            <div className="px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 shadow-xs">
              <span className="text-[var(--iloveaudios-red)] font-black">🔗</span>
              <span>Paste Link (Instagram, TikTok, FB, Snap)</span>
            </div>
            <div className="px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 shadow-xs">
              <span className="text-blue-500 font-black">📁</span>
              <span>Upload Clip (MP4, MOV, MP3, WAV)</span>
            </div>
            <div className="px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 shadow-xs">
              <span className="text-emerald-500 font-black">🎙️</span>
              <span>Record Audio (Browser Mic)</span>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="pt-2">
            <Link
              href="/tools/song-extractor"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-black text-sm text-white bg-[var(--iloveaudios-red)] hover:bg-red-700 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-100 cursor-pointer"
            >
              <span>Launch Song Finder</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Secondary Header: Complete Audio Tool Suite */}
      <section className="pt-4 pb-4 text-center max-w-4xl mx-auto px-4 sm:px-6 space-y-2 border-t border-[var(--border-color)]">
        <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
          Complete Online Audio Tools & Converters
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          100% free online audio converters and utilities to extract MP3 from video, cut and merge audio tracks, and boost volume with studio-quality results.
        </p>
      </section>

      {/* Horizontal Filter Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-7xl mx-auto px-4 sm:px-6">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Tools Grid Workspace */}
      <section id="tools-suite" className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.slug}
              title={tool.title}
              description={tool.description}
              href={`/tools/${tool.slug}`}
              icon={tool.icon}
              category={tool.category}
              badge={tool.badge}
              fromFormat={tool.fromFormat}
              toFormat={tool.toFormat}
            />
          ))}
        </div>
      </section>

      {/* Shared Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-[var(--border-color)] space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] block">
            Features
          </span>
          <h2 className="text-xl md:text-2xl font-black text-[var(--text-primary)]">
            Why Use iLoveAudios Free Audio Tools?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center shrink-0">
              <Music2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Professional Quality</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Support up to 320kbps MP3 audio exports and lossless WAV formats using professional-grade online audio converters.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Fast & Reliable</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Equipped with a high-speed audio converter worker engine to process and extract audio from large files in seconds.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Safe & Confidential</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Uploaded audio files are processed in secure isolated storage and automatically deleted shortly after conversion.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 border-t border-[var(--border-color)]">
        <FaqSection />
      </section>

      {/* Comprehensive SEO Directory / Topical Authority Cloud */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-[var(--border-color)] space-y-8">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[var(--iloveaudios-red)] block">
            All Converters & Tools
          </span>
          <h2 className="text-xl md:text-2xl font-black text-[var(--text-primary)]">
            Explore All Free Online Audio Tools
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Instant browser-based audio and video conversion. No software installation needed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Column 1: Video to Audio */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <span>Video to Audio Converters</span>
            </h3>
            <ul className="space-y-2 text-xs">
              {Object.values(TOOLS).filter(t => t.category === 'Video to Audio').map(t => (
                <li key={t.slug}>
                  <a href={`/tools/${t.slug}`} className="text-[var(--text-secondary)] hover:text-[var(--iloveaudios-red)] transition-colors flex items-center justify-between group">
                    <span>{t.title}</span>
                    <span className="text-[10px] opacity-0 group-hover:opacity-100 text-[var(--iloveaudios-red)] transition-opacity">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Audio Converters */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <span>Audio Format Converters</span>
            </h3>
            <ul className="space-y-2 text-xs">
              {Object.values(TOOLS).filter(t => t.category === 'Audio Converters').map(t => (
                <li key={t.slug}>
                  <a href={`/tools/${t.slug}`} className="text-[var(--text-secondary)] hover:text-[var(--iloveaudios-red)] transition-colors flex items-center justify-between group">
                    <span>{t.title}</span>
                    <span className="text-[10px] opacity-0 group-hover:opacity-100 text-[var(--iloveaudios-red)] transition-opacity">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Audio Utilities & AI Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <span>Audio Utilities & AI Tools</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/tools/audio-cutter" className="text-[var(--text-secondary)] hover:text-[var(--iloveaudios-red)] transition-colors flex items-center justify-between group font-bold">
                  <span>Audio Cutter & MP3 Trimmer</span>
                  <span className="text-[10px] text-purple-500 font-bold">NEW</span>
                </a>
              </li>
              <li>
                <a href="/tools/audio-joiner" className="text-[var(--text-secondary)] hover:text-[var(--iloveaudios-red)] transition-colors flex items-center justify-between group font-bold">
                  <span>Audio Joiner & Song Merger</span>
                  <span className="text-[10px] text-blue-500 font-bold">NEW</span>
                </a>
              </li>
              <li>
                <a href="/tools/volume-booster" className="text-[var(--text-secondary)] hover:text-[var(--iloveaudios-red)] transition-colors flex items-center justify-between group font-bold">
                  <span>Audio Volume Booster (200%)</span>
                  <span className="text-[10px] text-amber-500 font-bold">NEW</span>
                </a>
              </li>
              <li>
                <a href="/tools/song-extractor" className="text-[var(--text-secondary)] hover:text-[var(--iloveaudios-red)] transition-colors flex items-center justify-between group font-bold">
                  <span>AI Song Finder (Reels & TikTok)</span>
                  <span className="text-[10px] text-[var(--iloveaudios-red)]">★</span>
                </a>
              </li>
              <li>
                <a href="/tools/mp3-to-m4r" className="text-[var(--text-secondary)] hover:text-[var(--iloveaudios-red)] transition-colors flex items-center justify-between group">
                  <span>MP3 to iPhone Ringtone (M4R)</span>
                  <span className="text-[10px] opacity-0 group-hover:opacity-100 text-[var(--iloveaudios-red)] transition-opacity">→</span>
                </a>
              </li>
              <li>
                <a href="/tools/opus-to-mp3" className="text-[var(--text-secondary)] hover:text-[var(--iloveaudios-red)] transition-colors flex items-center justify-between group">
                  <span>WhatsApp Voice Note to MP3</span>
                  <span className="text-[10px] opacity-0 group-hover:opacity-100 text-[var(--iloveaudios-red)] transition-opacity">→</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
