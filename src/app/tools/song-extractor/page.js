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
      title="AI Song Finder"
      subtitle="Identify any song from video links (Instagram, TikTok, Shorts), audio files, or microphone with our free online music identifier."
      initialTab="link"
    >
      {/* 1. Context Intro with Secondary Keywords */}
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md space-y-4 text-center sm:text-left shadow-xs">
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          Welcome to <strong>iLoveAudios AI Song Finder</strong>, your all-in-one free <strong>song identifier online</strong>. Whether you stumbled upon a catchy tune in an Instagram Reel, need an <strong>ai music identifier</strong> for a TikTok clip, or want a fast <strong>mp3 song finder</strong> for recorded audio, our recognition engine analyzes acoustic frequencies in seconds to uncover the exact track name, artist, full lyrics, and MP3 download.
        </p>
      </div>

      {/* 2. Platform Hub Navigation */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="text-center sm:text-left space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-500">
            Dedicated Platform Finders
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Find Songs from Any Social Video or Audio File
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            Choose a dedicated tool optimized for your platform, or explore our specialized audio identifier hubs:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            href="/song-finder-from-video" 
            className="group glass-panel glass-panel-hover rounded-2xl p-5 border-blue-500/20 bg-blue-500/5 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                <Video className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)] group-hover:text-blue-500 transition-colors flex items-center justify-between">
                <span>AI Song Finder from Video</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Central hub to extract and identify background music from video links and uploaded clips.
              </p>
            </div>
          </Link>

          <Link 
            href="/identify-song-from-audio" 
            className="group glass-panel glass-panel-hover rounded-2xl p-5 border-emerald-500/20 bg-emerald-500/5 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                <FileAudio className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors flex items-center justify-between">
                <span>Identify Song from Audio</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Upload MP3, WAV, M4A, FLAC, or voice memos to pinpoint song titles with timestamp scanning.
              </p>
            </div>
          </Link>

          <Link 
            href="/find-song-from-instagram-reel" 
            className="group glass-panel glass-panel-hover rounded-2xl p-5 border-pink-500/20 bg-pink-500/5 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-pink-500 text-white flex items-center justify-center text-sm font-black">
                IG
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)] group-hover:text-pink-500 transition-colors flex items-center justify-between">
                <span>Instagram Reel Song Finder</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Find songs from Instagram Reels and Stories even when masked as original creator audio.
              </p>
            </div>
          </Link>

          <Link 
            href="/find-song-from-tiktok" 
            className="group glass-panel glass-panel-hover rounded-2xl p-5 border-cyan-500/20 bg-cyan-500/5 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500 text-white flex items-center justify-center text-sm font-black">
                TT
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)] group-hover:text-cyan-500 transition-colors flex items-center justify-between">
                <span>Find Song from TikTok</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Identify TikTok sounds, sped-up edits, and viral trends with instant track discovery.
              </p>
            </div>
          </Link>

          <Link 
            href="/find-song-from-youtube-shorts" 
            className="group glass-panel glass-panel-hover rounded-2xl p-5 border-red-500/20 bg-red-500/5 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-500 text-white flex items-center justify-center text-sm font-black">
                YT
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)] group-hover:text-red-500 transition-colors flex items-center justify-between">
                <span>YouTube Shorts Song Finder</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Paste YouTube Shorts links to extract underlying music tracks and watch the official video.
              </p>
            </div>
          </Link>

          <Link 
            href="/facebook-music-identifier" 
            className="group glass-panel glass-panel-hover rounded-2xl p-5 border-indigo-500/20 bg-indigo-500/5 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center text-sm font-black">
                FB
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)] group-hover:text-indigo-500 transition-colors flex items-center justify-between">
                <span>Facebook Music Identifier</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Discover music in Facebook Reels and Watch videos with acoustic constellation matching.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. 3 Input Methods: How to Use the Song Finder */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="text-center sm:text-left space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-500">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How to Use Our AI Song Finder Online
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            Our <strong>song finder ai</strong> offers three flexible ways to uncover any track with zero friction:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3 flex flex-col justify-between border-pink-500/20 bg-pink-500/5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center font-black text-sm">
                1
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">
                Paste Video Link
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Copy the public link from Instagram Reels, TikTok, YouTube Shorts, Facebook Reels, or Snapchat Spotlight and paste it into the search box.
              </p>
            </div>
            <div className="pt-2 text-[10px] font-bold text-pink-600 dark:text-pink-400">
              ⚡ Instant demuxing & recognition
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3 flex flex-col justify-between border-blue-500/20 bg-blue-500/5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-black text-sm">
                2
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">
                Upload Audio or Video File
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Drop your MP4, MOV, WebM, MP3, WAV, M4A, or FLAC file up to 100MB. Select specific timestamps to isolate clear music without dialogue.
              </p>
            </div>
            <div className="pt-2 text-[10px] font-bold text-blue-600 dark:text-blue-400">
              📁 Screen recordings & voice notes
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3 flex flex-col justify-between border-emerald-500/20 bg-emerald-500/5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm">
                3
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">
                Record Live Music
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Switch to Record Audio and allow your browser microphone to capture 5 to 15 seconds of ambient music playing in your room or vehicle.
              </p>
            </div>
            <div className="pt-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              🎙️ Works in Safari, Chrome & Edge
            </div>
          </div>
        </div>
      </section>

      {/* 4. Alternative to Shazam Comparison Section */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-cyan-500 block">
            Why Use iLoveAudios
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            A Powerful Browser-Based Alternative to Shazam
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            While Shazam is famous for mobile phone microphone tagging, it falls short when you are watching videos online or editing clips on your computer. Here is why iLoveAudios is the ideal modern online alternative:
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-slate-500/5">
                <th className="p-3.5 sm:p-4 font-black text-[var(--text-primary)]">Capability</th>
                <th className="p-3.5 sm:p-4 font-black text-[var(--iloveaudios-red)]">iLoveAudios Song Finder</th>
                <th className="p-3.5 sm:p-4 font-semibold text-[var(--text-secondary)]">Standard Shazam App</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)]">
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">Direct Social Video Links</td>
                <td className="p-3.5 sm:p-4 font-bold text-emerald-500">Instagram, TikTok, FB, Snap, Shorts</td>
                <td className="p-3.5 sm:p-4 text-red-400">No link input (mic only)</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">Upload Audio/Video Files</td>
                <td className="p-3.5 sm:p-4 font-bold text-emerald-500">Supported (MP4, MOV, MP3, WAV, etc.)</td>
                <td className="p-3.5 sm:p-4 text-red-400">Not supported</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">Full Song MP3 Download</td>
                <td className="p-3.5 sm:p-4 font-bold text-emerald-500">Free 192kbps MP3 download included</td>
                <td className="p-3.5 sm:p-4 text-red-400">Apple Music subscription link only</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">No App Installation</td>
                <td className="p-3.5 sm:p-4 font-bold text-emerald-500">100% In-Browser (Zero downloads)</td>
                <td className="p-3.5 sm:p-4 text-yellow-500">Requires native app download</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">Full Lyrics with Copy</td>
                <td className="p-3.5 sm:p-4 font-bold text-emerald-500">Line-by-line synchronized lyrics</td>
                <td className="p-3.5 sm:p-4 text-slate-400">Requires Apple ID login</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Cross-Tool Recommendations */}
      <section className="max-w-4xl mx-auto p-6 rounded-2xl border border-[var(--border-color)] bg-gradient-to-r from-blue-500/5 to-purple-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm sm:text-base font-black text-[var(--text-primary)]">
            Need to convert or trim your discovered audio?
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Try our dedicated MP3 converters and sub-second audio editing tools.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
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
          <Link
            href="/audio-converter"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)] transition-all shadow-xs"
          >
            Audio Converter
          </Link>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section id="faqs" className="max-w-4xl mx-auto pt-6 border-t border-[var(--border-color)]">
        <FaqSection faqs={SONG_FINDER_FAQS} />
      </section>
    </SongFinderEngine>
  );
}
