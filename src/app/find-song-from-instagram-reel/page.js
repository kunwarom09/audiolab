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

const INSTAGRAM_FAQS = [
  {
    question: 'How do I copy a Reel link from the Instagram mobile app?',
    answer: 'Open the Instagram app on iOS or Android, navigate to the Reel you want to identify, tap the Share (Paper Airplane) icon located below the comment bubble on the right side, and tap "Copy Link". The URL is now copied to your clipboard ready to paste here.'
  },
  {
    question: 'Why does Instagram label songs as "Original Audio"?',
    answer: 'When creators assemble videos in external apps like CapCut, VN Video Editor, or InShot, the background song is baked into the video\'s primary audio channel. Instagram does not compare the audio against music publisher catalogues upon upload, automatically generating an "Original Audio - user_1234" credit. Our AI tool bypasses Instagram\'s tags and matches the raw acoustic waveform against 50M+ licensed songs to reveal the real artist and title.'
  },
  {
    question: 'Can I identify a song from an Instagram Story before it expires?',
    answer: 'Yes! Open the public Instagram Story, tap the three dots or Share icon at top right, tap "Copy Link", and paste it into our search bar. If the Story was shared by a private account or has expired, screen-record the Story on your device and upload the video file into our Upload tab.'
  },
  {
    question: 'What if someone is speaking or doing a voiceover in the Reel?',
    answer: 'Our recognition engine uses spectral landmark filtering to identify underlying melodic lines and percussion rhythms beneath vocal speech. If dialogue is continuous in the first 10 seconds, try screen-recording a portion of the Reel where the background music is clearer and upload the file with our custom timestamp selector.'
  },
  {
    question: 'Can I download the identified Reel music as an MP3 file?',
    answer: 'Yes! Once the song is verified, click "Download Full Song (MP3)" to save a pristine 192kbps MP3 audio file directly to your smartphone or desktop with complete album cover art and lyrics.'
  }
];

export default function FindSongFromInstagramReelPage() {
  return (
    <SongFinderEngine
      title="Find Song from Instagram Reel"
      subtitle="Paste any Instagram Reel or Story link to uncover hidden music titles, real artists behind original audio, lyrics, and MP3 audio."
      initialTab="link"
      linkPlaceholder="Paste Instagram Reel link (e.g., https://www.instagram.com/reel/...)"
    >
      {/* 1. Educational Intro (400+ words total page copy) */}
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md space-y-4 text-center sm:text-left shadow-xs">
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          Need to <strong>find song from instagram reel</strong> videos that don&apos;t credit the music? Millions of viral clips on Instagram feature irresistible background beats, indie remixes, and uncredited tracks. When you want to <strong>find song from reel</strong> clips or <strong>find song from instagram story</strong> posts, <strong>iLoveAudios Instagram Song Finder</strong> extracts the audio track directly from the public URL and identifies the song in seconds.
        </p>
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          Even if you need to <strong>identify song from instagram video</strong> posts where the soundtrack has been masked with custom voiceovers or labeled as generic creator audio, our <strong>song finder from reel</strong> engine cuts through metadata confusion to deliver verified track details and clean MP3 downloads.
        </p>
      </div>

      {/* 2. Platform-Specific Link Copying Steps */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="text-center sm:text-left space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-pink-500">
            Instagram Instructions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How to Copy an Instagram Reel Link on Any Device
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            Follow these simple steps on iPhone, Android, or desktop to copy the correct Reel URL:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-panel rounded-2xl p-6 space-y-3 border-pink-500/20 bg-pink-500/5">
            <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center font-black text-sm">
              1
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              On iPhone & Android App
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              While viewing the Reel, tap the <strong>Paper Plane (Share)</strong> icon on the right menu &rarr; Tap <strong>Copy Link</strong> in the share tray.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-purple-500/20 bg-purple-500/5">
            <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center font-black text-sm">
              2
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              On Desktop Browser (Mac/PC)
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Click the Reel to open it, then copy the URL from your browser address bar (e.g., <code className="text-pink-600 dark:text-pink-400 font-bold">instagram.com/reel/C8...</code>).
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-blue-500/20 bg-blue-500/5">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-black text-sm">
              3
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Paste & Identify Instantly
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Paste the link into the box above and click <strong>Find Song</strong>. Our cloud recognizer isolates the audio waveform and finds your track.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive: Unmasking "Original Audio" on Instagram */}
      <section className="max-w-4xl mx-auto space-y-4 pt-6 border-t border-[var(--border-color)]">
        <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
          Why Does Instagram Label Viral Songs as &quot;Original Audio&quot;?
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          <p>
            When video creators create content for Instagram Reels, they often use desktop editors like Adobe Premiere Pro, Final Cut, or mobile apps like CapCut and InShot to sync video cuts with popular songs. When the finished video is rendered, the audio and video tracks are multiplexed into a single digital file.
          </p>
          <p>
            Upon publishing to Instagram, the app cannot distinguish between royalty-free sound effects recorded by the user and commercially licensed pop tracks—so it defaults to tagging the audio as &quot;Original Audio - [username]&quot;. Traditional sound discovery methods fail because tapping the audio title in Instagram only lists other Reels by that same creator.
          </p>
          <p>
            Our <strong>instagram song finder</strong> technology solves this problem by pulling the raw audio stream directly from the video container. We bypass the misleading text label and analyze acoustic landmarks against Shazam&apos;s 50-million-track library to uncover the real artist, official title, and synchronized lyrics.
          </p>
        </div>
      </section>

      {/* 4. Cross-Platform Directory (Interlinks to all other 4 platform pages + hubs) */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-pink-500 block">
            Explore Other Platforms
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Find Songs Across Other Social Video Networks
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            href="/find-song-from-tiktok" 
            className="glass-panel glass-panel-hover rounded-2xl p-4 space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-xs font-black">
              TT
            </div>
            <h4 className="text-xs font-black text-[var(--text-primary)]">Find Song from TikTok</h4>
            <p className="text-[11px] text-[var(--text-secondary)]">Identify TikTok original sounds and sped-up remix audio tracks.</p>
          </Link>

          <Link 
            href="/find-song-from-youtube-shorts" 
            className="glass-panel glass-panel-hover rounded-2xl p-4 space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center text-xs font-black">
              YT
            </div>
            <h4 className="text-xs font-black text-[var(--text-primary)]">YouTube Shorts Music Finder</h4>
            <p className="text-[11px] text-[var(--text-secondary)]">Extract songs from YouTube Shorts with official video previews.</p>
          </Link>

          <Link 
            href="/facebook-music-identifier" 
            className="glass-panel glass-panel-hover rounded-2xl p-4 space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black">
              FB
            </div>
            <h4 className="text-xs font-black text-[var(--text-primary)]">Facebook Music Identifier</h4>
            <p className="text-[11px] text-[var(--text-secondary)]">Recognize background tracks from Facebook Reels and Watch videos.</p>
          </Link>

          <Link 
            href="/find-song-on-snapchat" 
            className="glass-panel glass-panel-hover rounded-2xl p-4 space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-yellow-400 text-slate-900 flex items-center justify-center text-xs font-black">
              SC
            </div>
            <h4 className="text-xs font-black text-[var(--text-primary)]">Find Song on Snapchat</h4>
            <p className="text-[11px] text-[var(--text-secondary)]">Discover music from Snapchat Spotlight and public creator Snaps.</p>
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
        <FaqSection faqs={INSTAGRAM_FAQS} />
      </section>
    </SongFinderEngine>
  );
}
