'use client';

import React from 'react';
import SongFinderEngine from '@/components/SongFinderEngine';
import FaqSection from '@/components/FaqSection';
import Link from 'next/link';
import {
  InstagramLogoIcon,
  TikTokLogoIcon,
  FacebookLogoIcon,
  SnapchatLogoIcon
} from '@/components/AudioIcons';
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
      <div className="ui-card shadow-xs space-y-4 text-left">
        <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
          Looking to <strong>find song from youtube shorts</strong> videos that don&apos;t credit the music? YouTube Shorts generates tens of billions of views every day, introducing audiences to infectious background soundtracks, anime remixes, and trending edits. However, finding the track title on YouTube Shorts can often feel like searching in the dark.
        </p>
        <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
          With <strong>iLoveAudios YouTube Shorts Song Finder</strong>, you have a powerful <strong>shorts music finder</strong> ready in your browser. Whenever you want to <strong>identify song from youtube short</strong> links, our AI isolates the audio stream, matches acoustic landmarks against 50M+ tracks, and gives you verified track credits, official music video previews, synchronized lyrics, and clean MP3 downloads.
        </p>
      </div>

      {/* 2. Platform-Specific Link Copying Steps */}
      <section className="w-full space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="text-left space-y-3">
          <span className="text-[length:var(--text-base)] font-bold text-[var(--color-brand)] block">
            YouTube Shorts Instructions
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            How to Copy a YouTube Shorts Link for Recognition
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            Copying links from YouTube Shorts takes just a few taps on mobile or desktop:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ui-card space-y-3 border-red-500/20">
            <div className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              1
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              On the YouTube Mobile App
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Open the Short &rarr; Tap the <strong>Share</strong> icon on the right side of the screen &rarr; Tap <strong>Copy link</strong>.
            </p>
          </div>

          <div className="ui-card space-y-3 border-purple-500/20">
            <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              2
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              On Desktop Web Browser
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Copy the full URL directly from your browser address bar (e.g., <code className="text-[var(--color-brand)] font-bold">youtube.com/shorts/dQw4w9WgXcQ</code>).
            </p>
          </div>

          <div className="ui-card space-y-3 border-blue-500/20">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              3
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Paste &amp; Discover Song
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Paste the link into the search box above and click <strong>Find Song</strong>. In seconds, see verified song info and download the MP3.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive: YouTube Shorts Music & Audio Remixing */}
      <section className="w-full space-y-4 pt-8 border-t border-[var(--color-border)] text-left">
        <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
          How Our AI Uncovers Hidden Music in YouTube Shorts
        </h2>
        <div className="space-y-4 text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
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
      <section className="w-full space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="space-y-2 text-left">
          <span className="text-[length:var(--text-base)] font-bold text-[var(--color-brand)] block">
            Explore Other Platforms
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Find Songs Across Other Social Video Platforms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            href="/find-song-from-instagram-reel" 
            className="tool-card space-y-3 block"
          >
            <div className="w-12 h-12 rounded-xl bg-[#E1306C] text-white flex items-center justify-center">
              <InstagramLogoIcon className="w-6 h-6" />
            </div>
            <h4 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">Find Song from Instagram Reel</h4>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">Identify Reel music labeled as original creator audio.</p>
          </Link>

          <Link 
            href="/find-song-from-tiktok" 
            className="tool-card space-y-3 block"
          >
            <div className="w-12 h-12 rounded-xl bg-[#111827] text-white flex items-center justify-center">
              <TikTokLogoIcon className="w-6 h-6" />
            </div>
            <h4 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">Find Song from TikTok</h4>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">Identify TikTok sounds, CapCut edits, and viral tracks.</p>
          </Link>

          <Link 
            href="/facebook-music-identifier" 
            className="tool-card space-y-3 block"
          >
            <div className="w-12 h-12 rounded-xl bg-[#1877F2] text-white flex items-center justify-center">
              <FacebookLogoIcon className="w-6 h-6" />
            </div>
            <h4 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">Facebook Music Identifier</h4>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">Recognize background songs from Facebook Reels and Watch clips.</p>
          </Link>

          <Link 
            href="/find-song-on-snapchat" 
            className="tool-card space-y-3 block"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FFFC00] text-[#111827] border border-amber-300 flex items-center justify-center">
              <SnapchatLogoIcon className="w-6 h-6" />
            </div>
            <h4 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">Find Song on Snapchat</h4>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">Detect songs from Snapchat Spotlight and public creator Snaps.</p>
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link href="/song-finder-from-video" className="min-h-[48px] py-[12px] inline-flex items-center text-[length:var(--text-base)] font-bold text-blue-700 hover:underline">
            &larr; Video Song Finder Hub
          </Link>
          <span className="text-[var(--color-text-muted)]" aria-hidden="true">&bull;</span>
          <Link href="/tools/song-extractor" className="min-h-[48px] py-[12px] inline-flex items-center text-[length:var(--text-base)] font-bold text-[var(--color-brand)] hover:underline">
            Main AI Song Finder
          </Link>
          <span className="text-[var(--color-text-muted)]" aria-hidden="true">&bull;</span>
          <Link href="/mp3-converter" className="min-h-[48px] py-[12px] inline-flex items-center text-[length:var(--text-base)] font-bold text-purple-700 hover:underline">
            MP3 Converter Hub &rarr;
          </Link>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section id="faqs" className="w-full pt-8 border-t border-[var(--color-border)]">
        <FaqSection faqs={SHORTS_FAQS} />
      </section>
    </SongFinderEngine>
  );
}
