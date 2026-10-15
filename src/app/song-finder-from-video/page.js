'use client';

import React from 'react';
import SongFinderEngine from '@/components/SongFinderEngine';
import FaqSection from '@/components/FaqSection';
import Link from 'next/link';
import { 
  Video, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Share2, 
  Music, 
  FileVideo,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';

const VIDEO_FINDER_FAQS = [
  {
    question: 'How do I find a song from a video link without downloading the video?',
    answer: 'Simply copy the public URL of the video from Instagram Reels, TikTok, YouTube Shorts, or Facebook. Paste it directly into our search field and click Find Song. Our cloud recognizer downloads only the audio waveform directly in memory, identifies the acoustic fingerprint, and displays the song title and artist without requiring you to store heavy video files on your device.'
  },
  {
    question: 'What video file formats can I upload directly to identify music?',
    answer: 'If you have a video saved locally on your computer or phone, you can upload MP4, Apple QuickTime MOV, WebM, MKV, AVI, and 3GP files up to 100MB. Our engine extracts the discrete audio soundtrack, bypasses video visual frames, and matches the music constellation in seconds.'
  },
  {
    question: 'How does an AI song identifier from video detect songs with background noise?',
    answer: 'The recognition pipeline utilizes Fast Fourier Transforms (FFT) to convert audio signals into frequency constellations over time. Because musical chords, basslines, and rhythmic beats produce distinct harmonic energy peaks compared to transient human speech and street noise, the acoustic fingerprint remains identifiable even in noisy environments.'
  },
  {
    question: 'Can I identify background music from private video links?',
    answer: 'No. The video must be accessible publicly so our servers can stream the audio track. However, if a video is hosted on a private social profile or sent via direct message, you can record your screen for 5 to 10 seconds, save the video clip to your camera roll, and upload the file directly to our Upload tab.'
  },
  {
    question: 'Is there a limit on how many videos I can analyze per day?',
    answer: 'No, iLoveAudios AI Song Finder from Video provides 100% free, unlimited song queries with zero daily restrictions, no watermark overlays, and no subscription requirements.'
  }
];

export default function SongFinderFromVideoPage() {
  return (
    <SongFinderEngine
      title="AI Song Finder from Video"
      subtitle="Paste any video link or upload a video clip to instantly uncover background music, artist credits, lyrics, and MP3 audio."
      initialTab="link"
      linkPlaceholder="Paste video link (Instagram, TikTok, YouTube Shorts, Facebook, Snapchat)..."
    >
      {/* 1. Unique Educational Intro (400+ words total page copy) */}
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md space-y-4 text-center sm:text-left shadow-xs">
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          The <strong>iLoveAudios AI Song Finder from Video</strong> is a dedicated web hub built specifically to <strong>find song from video link</strong> sources and video file uploads. In modern social video sharing, creators frequently incorporate viral background tracks without tagging the artist or track title. Our <strong>ai song detector from video</strong> bridges this gap by automatically demuxing video data streams, discarding unnecessary visual pixels, and analyzing acoustic frequency constellations against an international registry of 50M+ songs.
        </p>
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          Whether you want to <strong>identify song from video</strong> clips saved on your phone or paste links from short-form feeds, our <strong>ai song finder by video</strong> gives you instant clarity with synchronized lyrics, official music videos, and clean MP3 downloads.
        </p>
      </div>

      {/* 2. Platform Directory Hub (Links to all 5 Platform Pages) */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="text-center sm:text-left space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-pink-500">
            Platform Specialized Identifiers
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Choose Your Video Platform for Tailored Recognition
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            Each video social network uses distinct link structures and audio-masking behaviors. Visit our platform-specific guides and finders for detailed link copying instructions and tips:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            href="/find-song-from-instagram-reel" 
            className="group glass-panel glass-panel-hover rounded-2xl p-5 border-pink-500/20 bg-pink-500/5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center font-black text-sm">
                IG
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-[var(--text-primary)] group-hover:text-pink-500 transition-colors flex items-center justify-between">
                  <span>Instagram Reels & Stories</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Identify audio tracks from Reels and public Stories even when labeled &quot;Original Audio&quot;.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-pink-600 dark:text-pink-400 pt-3 block">
              View Instagram Tool &rarr;
            </span>
          </Link>

          <Link 
            href="/find-song-from-tiktok" 
            className="group glass-panel glass-panel-hover rounded-2xl p-5 border-cyan-500/20 bg-cyan-500/5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-black text-sm border border-slate-700">
                TT
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-[var(--text-primary)] group-hover:text-cyan-500 transition-colors flex items-center justify-between">
                  <span>TikTok Video Sound Finder</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Uncover original commercial songs behind custom CapCut edits, nightcore mixes, and TikTok sounds.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 pt-3 block">
              View TikTok Tool &rarr;
            </span>
          </Link>

          <Link 
            href="/find-song-from-youtube-shorts" 
            className="group glass-panel glass-panel-hover rounded-2xl p-5 border-red-500/20 bg-red-500/5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-sm">
                YT
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-[var(--text-primary)] group-hover:text-red-500 transition-colors flex items-center justify-between">
                  <span>YouTube Shorts Music Finder</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Extract songs from Shorts links, view verified YouTube music videos, and read line-by-line lyrics.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-red-600 dark:text-red-400 pt-3 block">
              View YouTube Shorts Tool &rarr;
            </span>
          </Link>

          <Link 
            href="/facebook-music-identifier" 
            className="group glass-panel glass-panel-hover rounded-2xl p-5 border-blue-500/20 bg-blue-500/5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                FB
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-[var(--text-primary)] group-hover:text-blue-500 transition-colors flex items-center justify-between">
                  <span>Facebook Music Identifier</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Discover tracks from Facebook Reels, Watch videos, and viral social clips with instant acoustic matching.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 pt-3 block">
              View Facebook Tool &rarr;
            </span>
          </Link>

          <Link 
            href="/find-song-on-snapchat" 
            className="group glass-panel glass-panel-hover rounded-2xl p-5 border-amber-500/20 bg-amber-500/5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-400 text-slate-900 flex items-center justify-center font-black text-sm">
                SC
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-[var(--text-primary)] group-hover:text-amber-500 transition-colors flex items-center justify-between">
                  <span>Find Song on Snapchat</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Detect songs used in Snapchat Spotlight, public creator profiles, and saved Snap recordings.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 pt-3 block">
              View Snapchat Tool &rarr;
            </span>
          </Link>

          <Link 
            href="/identify-song-from-audio" 
            className="group glass-panel glass-panel-hover rounded-2xl p-5 border-emerald-500/20 bg-emerald-500/5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                AUDIO
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors flex items-center justify-between">
                  <span>Identify Song from Audio</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Have an audio-only file or voice recording? Upload MP3, WAV, or FLAC directly to search catalog audio.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 pt-3 block">
              View Audio Tool &rarr;
            </span>
          </Link>
        </div>
      </section>

      {/* 3. Step-by-Step Instructions */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="text-center sm:text-left space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-500">
            Step-by-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How Our AI Song Identifier from Video Works in 3 Steps
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            Extracting musical metadata from video takes less than 15 seconds:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-panel rounded-2xl p-6 space-y-3 border-blue-500/20 bg-blue-500/5">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-black text-sm">
              1
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Paste URL or Upload Video
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Copy any public video link from your favorite social platform, or upload a video file (MP4, MOV, WebM) directly from your smartphone or laptop.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-purple-500/20 bg-purple-500/5">
            <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center font-black text-sm">
              2
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Acoustic Demuxing & Matching
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Our <strong>ai song identifier from video</strong> demuxes the audio channel into raw PCM waveform, identifies acoustic spectral peaks, and cross-checks the signature against 50M+ tracks.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-emerald-500/20 bg-emerald-500/5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm">
              3
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Instant Details & MP3 Download
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Receive the verified artist name, song title, album art, synchronized lyrics, and a direct download link for high-quality 192kbps MP3 audio.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Deep Dive: Video Demuxing Technology (Rich Content) */}
      <section className="max-w-4xl mx-auto space-y-4 pt-6 border-t border-[var(--border-color)]">
        <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
          How Acoustic Fingerprinting Unlocks Music in Social Videos
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          <p>
            When video files are uploaded to modern web feeds, their audio tracks are often compressed alongside visual streams encoded with H.264, H.265/HEVC, or VP9 codecs. Many mobile apps further re-encode audio to lossy AAC or Opus formats at fluctuating bitrates.
          </p>
          <p>
            Standard sound recognition apps struggle when audio is embedded inside video URLs because they only listen through physical smartphone microphones, introducing ambient room reverberation and speaker distortion. Our browser-based <strong>ai song finder by video</strong> connects directly to the digital stream, bypassing speaker distortion entirely.
          </p>
          <p>
            By examining frequency peaks across time windows, the system creates a hash matrix representing the track&apos;s unique musical fingerprint. This ensures accurate song recognition even if video creators applied subtle volume adjustments, background sound effects, or slight tempo modifications.
          </p>
        </div>
      </section>

      {/* 5. Cross-Tool Recommendations */}
      <section className="max-w-4xl mx-auto p-6 rounded-2xl border border-[var(--border-color)] bg-gradient-to-r from-blue-500/5 to-purple-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm sm:text-base font-black text-[var(--text-primary)]">
            Looking for general audio conversion or trimming?
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Explore our format converters and online audio editing utilities.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/tools/song-extractor"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)] transition-all shadow-xs"
          >
            Main Song Finder
          </Link>
          <Link
            href="/mp3-converter"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)] transition-all shadow-xs"
          >
            MP3 Converter Hub
          </Link>
          <Link
            href="/tools/audio-cutter"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)] transition-all shadow-xs"
          >
            Audio Cutter
          </Link>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section id="faqs" className="max-w-4xl mx-auto pt-6 border-t border-[var(--border-color)]">
        <FaqSection faqs={VIDEO_FINDER_FAQS} />
      </section>
    </SongFinderEngine>
  );
}
