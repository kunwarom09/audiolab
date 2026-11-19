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
  FileAudio,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import {
  InstagramLogoIcon,
  TikTokLogoIcon,
  YouTubeLogoIcon,
  FacebookLogoIcon,
  SnapchatLogoIcon
} from '@/components/AudioIcons';

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
      <div className="ui-card shadow-xs space-y-4 text-left">
        <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
          The <strong>iLoveAudios AI Song Finder from Video</strong> is a dedicated web hub built specifically to <strong>find song from video link</strong> sources and video file uploads. In modern social video sharing, creators frequently incorporate viral background tracks without tagging the artist or track title. Our <strong>ai song detector from video</strong> bridges this gap by automatically demuxing video data streams, discarding unnecessary visual pixels, and analyzing acoustic frequency constellations against an international registry of 50M+ songs.
        </p>
        <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
          Whether you want to <strong>identify song from video</strong> clips saved on your phone or paste links from short-form feeds, our <strong>ai song finder by video</strong> gives you instant clarity with synchronized lyrics, official music videos, and clean MP3 downloads.
        </p>
      </div>

      {/* 2. Platform Directory Hub (Links to all 5 Platform Pages) */}
      <section className="w-full space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="text-left space-y-3">
          <span className="text-[length:var(--text-base)] font-bold text-pink-700 block">
            Platform Specialized Identifiers
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Choose Your Video Platform for Tailored Recognition
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            Each video social network uses distinct link structures and audio-masking behaviors. Visit our platform-specific guides and finders for detailed link copying instructions and tips:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            href="/find-song-from-instagram-reel" 
            className="group tool-card border-pink-500/20 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#E1306C] text-white flex items-center justify-center">
                <InstagramLogoIcon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)] group-hover:text-pink-700 transition-colors flex items-center justify-between gap-2">
                  <span>Instagram Reels &amp; Stories</span>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </h3>
                <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
                  Identify audio tracks from Reels and public Stories even when labeled &quot;Original Audio&quot;.
                </p>
              </div>
            </div>
            <span className="text-[length:var(--text-base)] font-bold text-pink-700 pt-4 block">
              View Instagram Tool &rarr;
            </span>
          </Link>

          <Link 
            href="/find-song-from-tiktok" 
            className="group tool-card border-slate-500/20 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#111827] text-white flex items-center justify-center">
                <TikTokLogoIcon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)] group-hover:text-[var(--color-brand)] transition-colors flex items-center justify-between gap-2">
                  <span>TikTok Video Sound Finder</span>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </h3>
                <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
                  Uncover original commercial songs behind custom CapCut edits, nightcore mixes, and TikTok sounds.
                </p>
              </div>
            </div>
            <span className="text-[length:var(--text-base)] font-bold text-[var(--color-text)] pt-4 block">
              View TikTok Tool &rarr;
            </span>
          </Link>

          <Link 
            href="/find-song-from-youtube-shorts" 
            className="group tool-card border-red-500/20 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FF0000] text-white flex items-center justify-center">
                <YouTubeLogoIcon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)] group-hover:text-red-700 transition-colors flex items-center justify-between gap-2">
                  <span>YouTube Shorts Music Finder</span>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </h3>
                <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
                  Extract songs from Shorts links, view verified YouTube music videos, and read line-by-line lyrics.
                </p>
              </div>
            </div>
            <span className="text-[length:var(--text-base)] font-bold text-red-700 pt-4 block">
              View YouTube Shorts Tool &rarr;
            </span>
          </Link>

          <Link 
            href="/facebook-music-identifier" 
            className="group tool-card border-blue-500/20 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#1877F2] text-white flex items-center justify-center">
                <FacebookLogoIcon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)] group-hover:text-blue-700 transition-colors flex items-center justify-between gap-2">
                  <span>Facebook Music Identifier</span>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </h3>
                <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
                  Discover tracks from Facebook Reels, Watch videos, and viral social clips with instant acoustic matching.
                </p>
              </div>
            </div>
            <span className="text-[length:var(--text-base)] font-bold text-blue-700 pt-4 block">
              View Facebook Tool &rarr;
            </span>
          </Link>

          <Link 
            href="/find-song-on-snapchat" 
            className="group tool-card border-amber-500/20 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFFC00] text-[#111827] border border-amber-300 flex items-center justify-center">
                <SnapchatLogoIcon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)] group-hover:text-amber-700 transition-colors flex items-center justify-between gap-2">
                  <span>Find Song on Snapchat</span>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </h3>
                <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
                  Detect songs used in Snapchat Spotlight, public creator profiles, and saved Snap recordings.
                </p>
              </div>
            </div>
            <span className="text-[length:var(--text-base)] font-bold text-amber-700 pt-4 block">
              View Snapchat Tool &rarr;
            </span>
          </Link>

          <Link 
            href="/identify-song-from-audio" 
            className="group tool-card border-emerald-500/20 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <FileAudio className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)] group-hover:text-emerald-700 transition-colors flex items-center justify-between gap-2">
                  <span>Identify Song from Audio</span>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </h3>
                <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
                  Have an audio-only file or voice recording? Upload MP3, WAV, or FLAC directly to search catalog audio.
                </p>
              </div>
            </div>
            <span className="text-[length:var(--text-base)] font-bold text-emerald-700 pt-4 block">
              View Audio Tool &rarr;
            </span>
          </Link>
        </div>
      </section>

      {/* 3. Step-by-Step Instructions */}
      <section className="w-full space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="text-left space-y-3">
          <span className="text-[length:var(--text-base)] font-bold text-blue-700 block">
            Step-by-Step Process
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            How Our AI Song Identifier from Video Works in 3 Steps
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            Extracting musical metadata from video takes less than 15 seconds:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ui-card space-y-3 border-blue-500/20">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              1
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Paste URL or Upload Video
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Copy any public video link from your favorite social platform, or upload a video file (MP4, MOV, WebM) directly from your smartphone or laptop.
            </p>
          </div>

          <div className="ui-card space-y-3 border-purple-500/20">
            <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              2
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Acoustic Demuxing &amp; Matching
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Our <strong>ai song identifier from video</strong> demuxes the audio channel into raw PCM waveform, identifies acoustic spectral peaks, and cross-checks the signature against 50M+ tracks.
            </p>
          </div>

          <div className="ui-card space-y-3 border-emerald-500/20">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              3
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Instant Details &amp; MP3 Download
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Receive the verified artist name, song title, album art, synchronized lyrics, and a direct download link for high-quality 192kbps MP3 audio.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Deep Dive: Video Demuxing Technology (Rich Content) */}
      <section className="w-full space-y-4 pt-8 border-t border-[var(--color-border)] text-left">
        <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
          How Acoustic Fingerprinting Unlocks Music in Social Videos
        </h2>
        <div className="space-y-4 text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
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
      <section className="ui-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2 text-left">
          <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
            Looking for general audio conversion or trimming?
          </h3>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure">
            Explore our format converters and online audio editing utilities.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <Link
            href="/tools/song-extractor"
            className="ui-control flex items-center justify-center rounded-xl font-bold bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-colors"
          >
            Main Song Finder
          </Link>
          <Link
            href="/mp3-converter"
            className="ui-control flex items-center justify-center rounded-xl font-bold bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-colors"
          >
            MP3 Converter Hub
          </Link>
          <Link
            href="/tools/audio-cutter"
            className="ui-control flex items-center justify-center rounded-xl font-bold bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-colors"
          >
            Audio Cutter
          </Link>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section id="faqs" className="w-full pt-8 border-t border-[var(--color-border)]">
        <FaqSection faqs={VIDEO_FINDER_FAQS} />
      </section>
    </SongFinderEngine>
  );
}
