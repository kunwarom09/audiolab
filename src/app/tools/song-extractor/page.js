'use client';

import React from 'react';
import SongFinderEngine from '@/components/SongFinderEngine';
import FaqSection from '@/components/FaqSection';
import Link from 'next/link';
import { 
  Sparkles, 
  Volume2, 
  Film, 
  Sliders, 
  ArrowRight,
  Video,
  FileAudio,
  Radio,
  ExternalLink
} from 'lucide-react';
import {
  InstagramLogoIcon,
  TikTokLogoIcon,
  YouTubeLogoIcon,
  FacebookLogoIcon
} from '@/components/AudioIcons';

const SONG_FINDER_FAQS = [
  {
    question: 'How does this online song finder identify music from video links?',
    answer: 'Our AI song finder demuxes the underlying audio stream directly from public links on Instagram Reels, TikTok, YouTube Shorts, and Facebook. It generates an acoustic fingerprint spectrogram and matches it against Shazam\'s global database of 50M+ licensed songs to return the exact song title, artist, album, synchronized lyrics, and MP3 download.'
  },
  {
    question: 'Can this music identifier find songs masked as "Original Sound"?',
    answer: 'Yes! When creators edit audio in third-party video editors like CapCut, platforms automatically classify the audio track as "Original Sound". Our song identifier online analyzes the raw musical frequency harmonics rather than metadata tags, uncovering the real commercial music track in seconds.'
  },
  {
    question: 'Is this AI song identifier completely free to use online?',
    answer: 'Yes, 100% free with unlimited track queries, line-by-line synchronized lyrics lookup, YouTube official video previews, and high-quality 192kbps MP3 audio downloads without sign-up or software installation.'
  },
  {
    question: 'How is iLoveAudios an alternative to Shazam on desktop and mobile browsers?',
    answer: 'Traditional Shazam requires installing a heavy native mobile app and only listens via microphone. iLoveAudios functions as an in-browser alternative to Shazam that works across Windows, Mac, Android, and iOS, allowing direct link pasting from social media and local audio file uploads without installing apps.'
  },
  {
    question: 'Can I identify a song by uploading an audio or video file?',
    answer: 'Yes! Switch to the Upload tab or visit our dedicated Identify Song from Audio tool. You can upload MP4, MOV, WebM, MP3, WAV, M4A, FLAC, or OGG files up to 100MB and pick custom timestamps to isolate clean music sections.'
  },
  {
    question: 'Can I download an MP3 of the identified song?',
    answer: 'Yes! As soon as the music identifier recognizes your song, you can download a clean, high-quality 192kbps MP3 audio file directly to your device with full album artwork and synchronized lyrics.'
  }
];

export default function SongExtractorPage() {
  return (
    <SongFinderEngine
      title="Song Finder"
      subtitle="Identify any song from video links (Instagram, TikTok, Shorts), audio files, or microphone with our free online music identifier."
      initialTab="link"
    >
      {/* 1. Context Intro with Secondary Keywords */}
      <div className="ui-card shadow-xs space-y-4 text-left">
        <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
          Welcome to <strong>iLoveAudios Song Finder</strong>, your all-in-one free <strong>song identifier online</strong>. Whether you stumbled upon a catchy tune in an Instagram Reel, need an <strong>ai music identifier</strong> for a TikTok clip, or want a fast <strong>mp3 song finder</strong> for recorded audio, our recognition engine analyzes acoustic frequencies in seconds to uncover the exact track name, artist, full lyrics, and MP3 download.
        </p>
      </div>

      {/* 2. Platform Hub Navigation */}
      <section className="w-full space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="text-left space-y-3">
          <span className="text-[length:var(--text-base)] font-bold text-blue-700 block">
            Dedicated Platform Finders
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Find Songs from Any Social Video or Audio File
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            Choose a dedicated tool optimized for your platform, or explore our specialized audio identifier hubs:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/song-finder-from-video"
            className="group tool-card border-blue-500/20 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)] group-hover:text-blue-700 transition-colors flex items-center justify-between gap-2">
                <span>AI Song Finder from Video</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </h3>
              <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
                Central hub to extract and identify background music from video links and uploaded clips.
              </p>
            </div>
          </Link>

          <Link
            href="/identify-song-from-audio"
            className="group tool-card border-emerald-500/20 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <FileAudio className="w-6 h-6" />
              </div>
              <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)] group-hover:text-emerald-700 transition-colors flex items-center justify-between gap-2">
                <span>Identify Song from Audio</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </h3>
              <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
                Upload MP3, WAV, M4A, FLAC, or voice memos to pinpoint song titles with timestamp scanning.
              </p>
            </div>
          </Link>

          <Link
            href="/find-song-from-instagram-reel"
            className="group tool-card border-pink-500/20 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#E1306C] text-white flex items-center justify-center">
                <InstagramLogoIcon className="w-6 h-6" />
              </div>
              <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)] group-hover:text-pink-700 transition-colors flex items-center justify-between gap-2">
                <span>Instagram Reel Song Finder</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </h3>
              <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
                Find songs from Instagram Reels and Stories even when masked as original creator audio.
              </p>
            </div>
          </Link>

          <Link
            href="/find-song-from-tiktok"
            className="group tool-card border-slate-500/20 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#111827] text-white flex items-center justify-center">
                <TikTokLogoIcon className="w-6 h-6" />
              </div>
              <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)] group-hover:text-[var(--color-brand)] transition-colors flex items-center justify-between gap-2">
                <span>Find Song from TikTok</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </h3>
              <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
                Identify TikTok sounds, sped-up edits, and viral trends with instant track discovery.
              </p>
            </div>
          </Link>

          <Link
            href="/find-song-from-youtube-shorts"
            className="group tool-card border-red-500/20 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FF0000] text-white flex items-center justify-center">
                <YouTubeLogoIcon className="w-6 h-6" />
              </div>
              <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)] group-hover:text-red-700 transition-colors flex items-center justify-between gap-2">
                <span>YouTube Shorts Song Finder</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </h3>
              <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
                Paste YouTube Shorts links to extract underlying music tracks and watch the official video.
              </p>
            </div>
          </Link>

          <Link
            href="/facebook-music-identifier"
            className="group tool-card border-blue-500/20 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#1877F2] text-white flex items-center justify-center">
                <FacebookLogoIcon className="w-6 h-6" />
              </div>
              <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)] group-hover:text-blue-700 transition-colors flex items-center justify-between gap-2">
                <span>Facebook Music Identifier</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </h3>
              <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
                Discover music in Facebook Reels and Watch videos with acoustic constellation matching.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. 3 Input Methods: How to Use the Song Finder */}
      <section className="w-full space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="text-left space-y-3">
          <span className="text-[length:var(--text-base)] font-bold text-purple-700 block">
            How It Works
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            How to Use Our Song Finder Online
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            Our <strong>song finder ai</strong> offers three flexible ways to uncover any track with zero friction:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ui-card space-y-4 flex flex-col justify-between border-pink-500/20">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-pink-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
                1
              </div>
              <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
                Paste Video Link
              </h3>
              <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
                Copy the public link from Instagram Reels, TikTok, YouTube Shorts, Facebook Reels, or Snapchat Spotlight and paste it into the search box.
              </p>
            </div>
            <div className="pt-2 text-[length:var(--text-base)] font-bold text-pink-700">
              Instant demuxing &amp; recognition
            </div>
          </div>

          <div className="ui-card space-y-4 flex flex-col justify-between border-blue-500/20">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
                2
              </div>
              <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
                Upload Audio or Video File
              </h3>
              <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
                Drop your MP4, MOV, WebM, MP3, WAV, M4A, or FLAC file up to 100MB. Select specific timestamps to isolate clear music without dialogue.
              </p>
            </div>
            <div className="pt-2 text-[length:var(--text-base)] font-bold text-blue-700">
              Screen recordings &amp; voice notes
            </div>
          </div>

          <div className="ui-card space-y-4 flex flex-col justify-between border-emerald-500/20">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
                3
              </div>
              <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
                Record Live Music
              </h3>
              <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
                Switch to Record Audio and allow your browser microphone to capture 5 to 15 seconds of ambient music playing in your room or vehicle.
              </p>
            </div>
            <div className="pt-2 text-[length:var(--text-base)] font-bold text-emerald-700">
              Works in Safari, Chrome &amp; Edge
            </div>
          </div>
        </div>
      </section>

      {/* 4. Alternative to Shazam Comparison Section */}
      <section className="w-full space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="space-y-3 text-left">
          <span className="text-[length:var(--text-base)] font-bold text-cyan-700 block">
            Why Use iLoveAudios
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            A Powerful Browser-Based Alternative to Shazam
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure leading-[var(--leading-body)]">
            While Shazam is famous for mobile phone microphone tagging, it falls short when you are watching videos online or editing clips on your computer. Here is why iLoveAudios is the ideal modern online alternative:
          </p>
        </div>

        <div className="table-scroll rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
          <table className="w-full text-left border-collapse text-[length:var(--text-base)]">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
                <th className="p-4 sm:p-5 font-bold text-[var(--color-text)]">Capability</th>
                <th className="p-4 sm:p-5 font-bold text-[var(--color-brand)]">iLoveAudios Song Finder</th>
                <th className="p-4 sm:p-5 font-semibold text-[var(--color-text-muted)]">Standard Shazam App</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-muted)]">
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[var(--color-text)]">Direct Social Video Links</td>
                <td className="p-4 sm:p-5 font-bold text-emerald-700">Instagram, TikTok, FB, Snap, Shorts</td>
                <td className="p-4 sm:p-5 text-red-700">No link input (mic only)</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[var(--color-text)]">Upload Audio/Video Files</td>
                <td className="p-4 sm:p-5 font-bold text-emerald-700">Supported (MP4, MOV, MP3, WAV, etc.)</td>
                <td className="p-4 sm:p-5 text-red-700">Not supported</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[var(--color-text)]">Full Song MP3 Download</td>
                <td className="p-4 sm:p-5 font-bold text-emerald-700">Free 192kbps MP3 download included</td>
                <td className="p-4 sm:p-5 text-red-700">Apple Music subscription link only</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[var(--color-text)]">No App Installation</td>
                <td className="p-4 sm:p-5 font-bold text-emerald-700">100% In-Browser (Zero downloads)</td>
                <td className="p-4 sm:p-5 text-amber-700">Requires native app download</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[var(--color-text)]">Full Lyrics with Copy</td>
                <td className="p-4 sm:p-5 font-bold text-emerald-700">Line-by-line synchronized lyrics</td>
                <td className="p-4 sm:p-5 text-[var(--color-text-muted)]">Requires Apple ID login</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Cross-Tool Recommendations */}
      <section className="ui-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2 text-left">
          <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
            Need to convert or trim your discovered audio?
          </h3>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure">
            Try our dedicated MP3 converters and sub-second audio editing tools.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
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
          <Link
            href="/audio-converter"
            className="ui-control flex items-center justify-center rounded-xl font-bold bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-colors"
          >
            Audio Converter
          </Link>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section id="faqs" className="w-full pt-8 border-t border-[var(--color-border)]">
        <FaqSection faqs={SONG_FINDER_FAQS} />
      </section>
    </SongFinderEngine>
  );
}
