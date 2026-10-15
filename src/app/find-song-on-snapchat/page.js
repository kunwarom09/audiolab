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

const SNAPCHAT_FAQS = [
  {
    question: 'How do I copy a link from Snapchat Spotlight?',
    answer: 'Open the Snapchat app, navigate to the Spotlight tab, and view the video containing the song. Tap the Share (paper plane/arrow) icon on the right side of the screen, then tap the "Copy Link" button. The URL (e.g., https://www.snapchat.com/spotlight/... or https://story.snapchat.com/...) is copied to your clipboard.'
  },
  {
    question: 'Can I find a song from a public Snapchat Story or Creator profile?',
    answer: 'Yes! Open any public Snapchat Story or Creator profile video, tap the three dots or Share icon, tap "Copy Link", and paste the link into iLoveAudios. Our system extracts the audio track and matches the song against 50M+ licensed tracks.'
  },
  {
    question: 'What if a friend sent me a Snap privately in chat?',
    answer: 'Snapchat friend messages and private snaps cannot be accessed by external web tools due to end-to-end user privacy. However, you can screen-record the Snap while viewing it on your smartphone, save the MP4/MOV clip to your camera roll, and upload that video file to our Upload tab for instant recognition.'
  },
  {
    question: 'Does this tool identify songs used in viral Snapchat Lenses and filters?',
    answer: 'Yes! Many popular Snapchat AR Lenses play background beats and sped-up audio clips. Our acoustic engine analyzes the discrete musical pitch landmarks in the video audio to recognize the song even when filtered through custom Lens effects.'
  },
  {
    question: 'Can I download the identified Snapchat song as an MP3?',
    answer: 'Yes! After your song is identified, click "Download Full Song (MP3)" to download a full-length, high-definition 192kbps MP3 audio file with synchronized lyrics and cover artwork.'
  }
];

export default function FindSongOnSnapchatPage() {
  return (
    <SongFinderEngine
      title="Find Song on Snapchat"
      subtitle="Paste any Snapchat Spotlight or public Story link to uncover hidden background music, artist names, lyrics, and download MP3s."
      initialTab="link"
      linkPlaceholder="Paste Snapchat link (e.g., https://www.snapchat.com/spotlight/... or story.snapchat.com/...)"
    >
      {/* 1. Educational Intro (400+ words total page copy) */}
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md space-y-4 text-center sm:text-left shadow-xs">
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          Need to <strong>find song on snapchat</strong> Spotlight or discover the soundtrack behind a viral creator post? Snapchat Spotlight is home to millions of short-form videos featuring trending music, dance challenges, and comedic clips. However, Snapchat often does not show the track title on the screen, leaving viewers wondering who sings the song.
        </p>
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          With <strong>iLoveAudios Snapchat Song Finder</strong>, you can easily <strong>identify song from snapchat video</strong> clips and <strong>find song from snapchat story</strong> posts by pasting any public link. Our AI recognition engine demuxes the digital audio, matches the acoustic fingerprint across 50M+ tracks, and gives you verified track credits, full lyrics, and MP3 downloads.
        </p>
      </div>

      {/* 2. Platform-Specific Link Copying Steps */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="text-center sm:text-left space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-500">
            Snapchat Instructions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How to Copy a Snapchat Link for Recognition
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            Copying links from Snapchat Spotlight and public stories takes just three quick steps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-panel rounded-2xl p-6 space-y-3 border-amber-500/20 bg-amber-500/5">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-slate-900 flex items-center justify-center font-black text-sm">
              1
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Open Spotlight or Public Story
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Navigate to the Spotlight video or Creator Story in the Snapchat app on iPhone or Android.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-purple-500/20 bg-purple-500/5">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-sm">
              2
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Tap Share &rarr; Copy Link
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Tap the <strong>Share (Paper Plane/Arrow)</strong> icon on the side of the screen &rarr; Tap the <strong>Copy Link</strong> button.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-blue-500/20 bg-blue-500/5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm">
              3
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Paste & Identify Track
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Paste the copied URL into the box above and click <strong>Find Song</strong> to discover the song title and download the MP3.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive: Music Identification on Snapchat */}
      <section className="max-w-4xl mx-auto space-y-4 pt-6 border-t border-[var(--border-color)]">
        <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
          How Our AI Detects Songs in Snapchat Spotlight & Lenses
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          <p>
            Snapchat video feeds are uniquely fast-paced, featuring 5 to 15-second visual snippets paired with high-energy musical drops, viral sped-up remixes, and custom user voiceovers. Creators frequently combine music through augmented reality (AR) Lenses without tagging the underlying song title.
          </p>
          <p>
            Standard sound recognition apps struggle with Snapchat because audio playback pauses the moment you switch apps on your smartphone, and Shazam&apos;s ambient listening mode cannot capture internal smartphone audio cleanly without headphones or a second device.
          </p>
          <p>
            Our online <strong>snapchat song finder</strong> handles this seamlessly through direct URL demuxing. We stream the audio track directly from Snapchat&apos;s cloud delivery network, strip video frames, and cross-reference frequency peak landmarks against Shazam&apos;s global 50M+ track database, delivering accurate song identification in under 5 seconds.
          </p>
        </div>
      </section>

      {/* 4. Cross-Platform Directory (Interlinks to all other 4 platform pages + hubs) */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 block">
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
            href="/find-song-from-youtube-shorts" 
            className="glass-panel glass-panel-hover rounded-2xl p-4 space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center text-xs font-black">
              YT
            </div>
            <h4 className="text-xs font-black text-[var(--text-primary)]">YouTube Shorts Music Finder</h4>
            <p className="text-[11px] text-[var(--text-secondary)]">Extract music from Shorts links with video previews.</p>
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
        <FaqSection faqs={SNAPCHAT_FAQS} />
      </section>
    </SongFinderEngine>
  );
}
