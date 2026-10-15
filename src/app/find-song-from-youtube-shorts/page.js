'use client';

import React from 'react';
import SongFinderEngine from '@/components/SongFinderEngine';
import FaqSection from '@/components/FaqSection';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles, 
  Share2, 
  Film, 
  Music2, 
  CheckCircle2, 
  HelpCircle,
  Video
} from 'lucide-react';

const SHORTS_FAQS = [
  {
    question: 'How do I copy a video link from YouTube Shorts?',
    answer: 'In the YouTube mobile app (iPhone or Android), open the Shorts player, tap the Share icon on the right side of the screen, then tap "Copy link". On desktop, simply copy the URL from your web browser address bar (e.g., https://www.youtube.com/shorts/...).'
  },
  {
    question: 'Why doesn\'t YouTube show the song title beneath the Short?',
    answer: 'When creators mix their own audio tracks in editing programs before uploading to YouTube Shorts, YouTube\'s metadata panel does not link to an official YouTube Music track. Even though the song is audible in the video, viewers cannot tap to see the artist. Our AI engine examines the raw acoustic frequencies to identify the song and artist in seconds.'
  },
  {
    question: 'Can this YouTube Shorts song finder identify pitch-shifted or remixed audio?',
    answer: 'Yes! Viral Shorts frequently incorporate sped-up, slowed-down, or bass-boosted remixes. Our system uses pitch-normalized harmonic constellation matching and lyrics correlation to trace altered tracks back to their original commercial master release.'
  },
  {
    question: 'What if someone is speaking or doing commentary over the music in the Short?',
    answer: 'Our acoustic filtering separates harmonic music peaks from irregular vocal speech patterns. If dialogue is overpowering during the opening seconds, you can download the video clip, switch to our Upload tab, and scan a 15-second timestamp segment where the music plays clearly.'
  },
  {
    question: 'Can I download the identified YouTube Shorts music as an MP3 file?',
    answer: 'Yes! After identification, click "Download Full Song (MP3)" to download a full-length, studio-grade 192kbps MP3 audio file with synchronized lyrics, album artwork, and a link to the official YouTube music video.'
  }
];

export default function FindSongFromYouTubeShortsPage() {
  return (
    <SongFinderEngine
      title="Find Song from YouTube Shorts"
      subtitle="Paste any YouTube Shorts link to uncover background music, find real artist names, read synchronized lyrics, and download MP3s."
      initialTab="link"
      linkPlaceholder="Paste YouTube Shorts link (e.g., https://www.youtube.com/shorts/...)"
    >
      {/* 1. Educational Intro (400+ words total page copy) */}
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md space-y-4 text-center sm:text-left shadow-xs">
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          Looking to <strong>find song from youtube shorts</strong> videos that don&apos;t credit the music? YouTube Shorts generates tens of billions of views every day, introducing audiences to infectious background soundtracks, anime remixes, and trending edits. However, finding the track title on YouTube Shorts can often feel like searching in the dark.
        </p>
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          With <strong>iLoveAudios YouTube Shorts Song Finder</strong>, you have a powerful <strong>shorts music finder</strong> ready in your browser. Whenever you want to <strong>identify song from youtube short</strong> links, our AI isolates the audio stream, matches acoustic landmarks against 50M+ tracks, and gives you verified track credits, official music video previews, synchronized lyrics, and clean MP3 downloads.
        </p>
      </div>

      {/* 2. Platform-Specific Link Copying Steps */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="text-center sm:text-left space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-red-500">
            YouTube Shorts Instructions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How to Copy a YouTube Shorts Link for Recognition
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            Copying links from YouTube Shorts takes just a few taps on mobile or desktop:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-panel rounded-2xl p-6 space-y-3 border-red-500/20 bg-red-500/5">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-sm">
              1
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              On the YouTube Mobile App
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Open the Short &rarr; Tap the <strong>Share</strong> icon on the right side of the screen &rarr; Tap <strong>Copy link</strong>.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-purple-500/20 bg-purple-500/5">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-sm">
              2
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              On Desktop Web Browser
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Copy the full URL directly from your browser address bar (e.g., <code className="text-red-500 font-bold">youtube.com/shorts/dQw4w9WgXcQ</code>).
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-blue-500/20 bg-blue-500/5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm">
              3
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Paste & Discover Song
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Paste the link into the search box above and click <strong>Find Song</strong>. In seconds, see verified song info and download the MP3.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive: YouTube Shorts Music & Audio Remixing */}
      <section className="max-w-4xl mx-auto space-y-4 pt-6 border-t border-[var(--border-color)]">
        <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
          How Our AI Uncovers Hidden Music in YouTube Shorts
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          <p>
            YouTube Shorts features millions of clips that utilize user-created audio remixes, slowed reverb edits, or mashups. Because creators frequently upload completed video renders exported from desktop non-linear editors like DaVinci Resolve or Adobe Premiere, YouTube does not always display the underlying commercial music in the description box.
          </p>
          <p>
            Viewers who want to save the song to their Spotify or Apple Music playlists are left searching through comments or asking what track was used. Traditional sound recognition apps like Shazam often fail to catch the audio when watching on mobile because opening another app pauses the YouTube video.
          </p>
          <p>
            Our web-based <strong>youtube shorts song finder</strong> operates through direct link extraction. We stream the audio track directly from YouTube&apos;s media servers, extract its digital frequency peaks, and cross-reference them against Shazam&apos;s global 50M+ track database, delivering accurate song identification in under 5 seconds.
          </p>
        </div>
      </section>

      {/* 4. Cross-Platform Directory (Interlinks to all other 4 platform pages + hubs) */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-red-500 block">
            Explore Other Platforms
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Find Songs Across Other Social Video Platforms
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            href="/find-song-from-instagram-reel" 
            className="glass-panel glass-panel-hover rounded-2xl p-4 space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-pink-500 text-white flex items-center justify-center text-xs font-black">
              IG
            </div>
            <h4 className="text-xs font-black text-[var(--text-primary)]">Find Song from Instagram Reel</h4>
            <p className="text-[11px] text-[var(--text-secondary)]">Identify Reel music labeled as original creator audio.</p>
          </Link>

          <Link 
            href="/find-song-from-tiktok" 
            className="glass-panel glass-panel-hover rounded-2xl p-4 space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-xs font-black">
              TT
            </div>
            <h4 className="text-xs font-black text-[var(--text-primary)]">Find Song from TikTok</h4>
            <p className="text-[11px] text-[var(--text-secondary)]">Identify TikTok sounds, CapCut edits, and viral tracks.</p>
          </Link>

          <Link 
            href="/facebook-music-identifier" 
            className="glass-panel glass-panel-hover rounded-2xl p-4 space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black">
              FB
            </div>
            <h4 className="text-xs font-black text-[var(--text-primary)]">Facebook Music Identifier</h4>
            <p className="text-[11px] text-[var(--text-secondary)]">Recognize background songs from Facebook Reels and Watch clips.</p>
          </Link>

          <Link 
            href="/find-song-on-snapchat" 
            className="glass-panel glass-panel-hover rounded-2xl p-4 space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-yellow-400 text-slate-900 flex items-center justify-center text-xs font-black">
              SC
            </div>
            <h4 className="text-xs font-black text-[var(--text-primary)]">Find Song on Snapchat</h4>
            <p className="text-[11px] text-[var(--text-secondary)]">Detect songs from Snapchat Spotlight and public creator Snaps.</p>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/song-finder-from-video" className="text-xs font-bold text-blue-500 hover:underline">
            &larr; Video Song Finder Hub
          </Link>
          <span className="text-[var(--text-muted)]">&bull;</span>
          <Link href="/tools/song-extractor" className="text-xs font-bold text-[var(--iloveaudios-red)] hover:underline">
            Main AI Song Finder
          </Link>
          <span className="text-[var(--text-muted)]">&bull;</span>
          <Link href="/mp3-converter" className="text-xs font-bold text-purple-500 hover:underline">
            MP3 Converter Hub &rarr;
          </Link>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section id="faqs" className="max-w-4xl mx-auto pt-6 border-t border-[var(--border-color)]">
        <FaqSection faqs={SHORTS_FAQS} />
      </section>
    </SongFinderEngine>
  );
}
