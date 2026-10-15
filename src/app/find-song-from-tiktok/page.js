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

const TIKTOK_FAQS = [
  {
    question: 'How do I copy a video link from the TikTok app?',
    answer: 'In the TikTok app on iOS or Android, navigate to the video you want to recognize. Tap the Share (arrow) icon located below the bookmark icon on the right side of the screen, then tap the yellow "Copy Link" circle. The video link (e.g., https://vm.tiktok.com/... or https://vt.tiktok.com/...) is copied to your clipboard.'
  },
  {
    question: 'Why do so many TikTok sounds say "Original Sound"?',
    answer: 'When creators edit clips in ByteDance\'s companion app CapCut or desktop editors, the music track is merged into the video file. When uploaded, TikTok treats the audio track as user-generated speech or ambient audio rather than commercial music, giving it a default "Original Sound" title. Our tool bypasses this label and compares the acoustic frequency spectrum against Shazam\'s global catalog to uncover the true artist and song title.'
  },
  {
    question: 'Can this TikTok song finder detect sped-up, slowed, or nightcore versions?',
    answer: 'Yes! Over 40% of viral TikTok sounds feature pitch-shifted or tempo-manipulated audio (+15% or -15%). Our recognition pipeline employs pitch-normalized harmonic tracking and semantic lyric correlation to match the manipulated audio against original catalog masters.'
  },
  {
    question: 'Does this tool work on Duets, Stitches, or audio with multiple sounds?',
    answer: 'Yes. If multiple audio elements exist, our spectral analyzer isolates the primary melodic peaks and rhythm signatures. If a voiceover is overpowering the beginning of the video, you can screen-record the clip and upload it to our Upload tab to choose a cleaner 15-second snippet.'
  },
  {
    question: 'Can I download the identified TikTok song as an MP3 file?',
    answer: 'Yes! Once identified, click "Download Full Song (MP3)" to download a full-length, high-definition 192kbps MP3 audio file with verified lyrics and cover art directly to your device.'
  }
];

export default function FindSongFromTikTokPage() {
  return (
    <SongFinderEngine
      title="Find Song from TikTok"
      subtitle="Paste any TikTok video or sound link to unmask original audio, identify viral trending songs, view lyrics, and download MP3s."
      initialTab="link"
      linkPlaceholder="Paste TikTok link (e.g., https://www.tiktok.com/@user/video/... or vm.tiktok.com/...)"
    >
      {/* 1. Educational Intro (400+ words total page copy) */}
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md space-y-4 text-center sm:text-left shadow-xs">
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          Stuck trying to <strong>find song from tiktok</strong> videos where the music is labeled as creator audio? Over half of the viral songs dominating global charts today got their start on TikTok, but finding their real titles inside the app can be nearly impossible. With <strong>iLoveAudios TikTok Song Finder</strong>, you can paste any public clip to discover the real artist in seconds.
        </p>
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          Whether you need a dedicated <strong>tiktok sound finder</strong> to identify speed-up edits or want to <strong>identify song from tiktok video</strong> trends, our system helps you <strong>find original sound tiktok</strong> secrets by matching digital acoustic constellations against 50M+ tracks, complete with synchronized lyrics and MP3 audio downloads.
        </p>
      </div>

      {/* 2. Platform-Specific Link Copying Steps */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="text-center sm:text-left space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-cyan-500">
            TikTok Instructions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How to Copy a TikTok Link for Song Identification
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            Grab the share link from the TikTok app or your computer browser in three easy steps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-panel rounded-2xl p-6 space-y-3 border-cyan-500/20 bg-cyan-500/5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500 text-white flex items-center justify-center font-black text-sm">
              1
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              On the TikTok Mobile App
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Open the video &rarr; Tap the <strong>Share (Arrow)</strong> button on the right-hand bar &rarr; Tap <strong>Copy Link</strong> in the share menu.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-pink-500/20 bg-pink-500/5">
            <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center font-black text-sm">
              2
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              On Desktop Web Browser
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Click the video on tiktok.com and copy the full URL from your browser address bar (or click the Share button &rarr; Copy Link).
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-emerald-500/20 bg-emerald-500/5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm">
              3
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Paste & Detect Music
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Paste your link into the input box above and click <strong>Find Song</strong>. We support both short links (vm.tiktok.com) and full URLs.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive: Unmasking TikTok "Original Sound" */}
      <section className="max-w-4xl mx-auto space-y-4 pt-6 border-t border-[var(--border-color)]">
        <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
          How Our AI Recovers Songs Behind &quot;Original Sound&quot; Labels
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          <p>
            On TikTok, sounds frequently go viral through memes, dance trends, and video challenges. However, when users create edits in CapCut or adjust the speed of a song to fit a 15-second visual hook, TikTok renames the audio stream as &quot;Original Sound - creator_name&quot;. When other creators use that audio, the original musical credit is lost entirely.
          </p>
          <p>
            Tapping the rotating vinyl record icon at the bottom of the TikTok screen merely brings up other videos using the same uncredited sound clip. This leaves millions of listeners asking in the comment section: <em>&quot;What song is this?&quot;</em>
          </p>
          <p>
            Our <strong>tiktok song finder</strong> bypasses TikTok&apos;s metadata structure altogether. We extract the digital audio track directly from the video stream, generate an acoustic fingerprint based on harmonic frequency constellations, and match it against our database of over 50 million licensed commercial releases. In seconds, you get the verified artist, song title, album art, and synchronized lyrics.
          </p>
        </div>
      </section>

      {/* 4. Cross-Platform Directory (Interlinks to all other 4 platform pages + hubs) */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-cyan-500 block">
            Explore Other Platforms
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Identify Songs on Other Video Sharing Apps
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
            <p className="text-[11px] text-[var(--text-secondary)]">Uncover songs in Instagram Reels and Stories labeled original audio.</p>
          </Link>

          <Link 
            href="/find-song-from-youtube-shorts" 
            className="glass-panel glass-panel-hover rounded-2xl p-4 space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center text-xs font-black">
              YT
            </div>
            <h4 className="text-xs font-black text-[var(--text-primary)]">YouTube Shorts Music Finder</h4>
            <p className="text-[11px] text-[var(--text-secondary)]">Extract music from YouTube Shorts with official video previews.</p>
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
        <FaqSection faqs={TIKTOK_FAQS} />
      </section>
    </SongFinderEngine>
  );
}
