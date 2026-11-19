'use client';

import React from 'react';
import SongFinderEngine from '@/components/SongFinderEngine';
import FaqSection from '@/components/FaqSection';
import Link from 'next/link';
import {
  InstagramLogoIcon,
  TikTokLogoIcon,
  YouTubeLogoIcon,
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

const FACEBOOK_FAQS = [
  {
    question: 'How do I copy a video link from the Facebook mobile app?',
    answer: 'In the Facebook app on iPhone or Android, find the Reel or Watch video you want to identify. Tap the "Share" button beneath the post, tap "More options" or scroll horizontally across the sharing icons, and tap "Copy Link". The link (e.g., facebook.com/reel/... or fb.watch/...) is now on your clipboard.'
  },
  {
    question: 'Can this Facebook song finder identify music in Facebook Watch videos?',
    answer: 'Yes! Whether it is a 30-second Facebook Reel, an episodic clip on Facebook Watch, or a viral post on a public creator page, our engine demuxes the background audio stream and identifies the music track with full artist and album details.'
  },
  {
    question: 'Why don\'t Facebook Reels display song names like Instagram or TikTok?',
    answer: 'Many creators upload videos to Facebook through Meta Business Suite or cross-post without linking official Meta sound tags. Furthermore, Facebook frequently strips commercial audio tags during video re-encoding, leaving viewers with no way to identify the track within the app. Our Facebook music identifier analyzes the acoustic frequencies to uncover the real song.'
  },
  {
    question: 'What if a Facebook video is inside a private group or friends-only post?',
    answer: 'Due to privacy protections, our cloud server cannot download video data from private groups or non-public personal accounts. For private clips, use your device\'s built-in screen recorder to record a short 5 to 10 second video snippet, then upload that video file to our Upload tab.'
  },
  {
    question: 'Can I download the identified Facebook song as an MP3 file?',
    answer: 'Yes! After your song is matched, click "Download Full Song (MP3)" to download a clean, high-fidelity 192kbps MP3 audio file with synchronized lyrics and cover artwork.'
  }
];

export default function FacebookMusicIdentifierPage() {
  return (
    <SongFinderEngine
      title="Facebook Music Identifier"
      subtitle="Paste any Facebook Reel, Watch video, or viral clip link to identify background songs, discover artists, and download MP3s."
      initialTab="link"
      linkPlaceholder="Paste Facebook Reel or video link (e.g., https://www.facebook.com/reel/...)"
    >
      {/* 1. Educational Intro (400+ words total page copy) */}
      <div className="ui-card shadow-xs space-y-4 text-left">
        <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
          The <strong>iLoveAudios Facebook Music Identifier</strong> is designed to help you <strong>find song from facebook reel</strong> feeds, Facebook Watch episodes, and viral social clips. Millions of users browse Facebook daily and hear incredible background soundtracks without any song titles listed in the caption or video overlay.
        </p>
        <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
          Our online <strong>facebook song finder</strong> solves this frustration. By pasting any public Facebook URL, our recognition engine demuxes the audio channel and allows you to <strong>identify song from facebook video</strong> streams in under 5 seconds—providing verified artist names, album titles, synchronized lyrics, and free MP3 downloads.
        </p>
      </div>

      {/* 2. Platform-Specific Link Copying Steps */}
      <section className="w-full space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="text-left space-y-3">
          <span className="text-[length:var(--text-base)] font-bold text-blue-700 block">
            Facebook Instructions
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            How to Copy a Facebook Video Link for Recognition
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            Whether you are on a smartphone or a computer, copying the public Facebook video link takes just a few taps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ui-card space-y-3 border-blue-500/20">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              1
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              On the Facebook Mobile App
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Open the video or Reel &rarr; Tap the <strong>Share</strong> button at bottom right &rarr; Select <strong>Copy Link</strong> from the tray.
            </p>
          </div>

          <div className="ui-card space-y-3 border-indigo-500/20">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              2
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              On Desktop Web Browser
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Click the video timestamp or open the post in full screen, then copy the URL from your browser address bar (e.g., <code className="text-blue-700 font-bold">facebook.com/reel/...</code> or <code className="text-blue-700 font-bold">fb.watch/...</code>).
            </p>
          </div>

          <div className="ui-card space-y-3 border-purple-500/20">
            <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              3
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Paste &amp; Identify Track
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Paste the link into the search box above and click <strong>Find Song</strong>. Our server isolates the audio waveform and finds your track.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive: Facebook's Audio Processing */}
      <section className="w-full space-y-4 pt-8 border-t border-[var(--color-border)] text-left">
        <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
          Overcoming Audio Masking in Facebook Video Streams
        </h2>
        <div className="space-y-4 text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
          <p>
            Facebook is one of the world&apos;s largest video platforms, serving billions of hours of short-form and long-form video content daily. However, unlike dedicated music streaming apps, Facebook lacks an integrated Shazam-like button that viewers can click to see what music is playing.
          </p>
          <p>
            Furthermore, content creators on Facebook often speed up or slow down tracks by 5% to 10% to prevent automated copyright mutes. Standard microphone recognition apps often fail to identify these altered waveforms when recorded through phone speakers.
          </p>
          <p>
            Our <strong>facebook music identifier</strong> works directly on the digital audio stream extracted via FFmpeg. We normalize pitch and tempo deviations and compare the harmonic landmark constellations against a catalog of 50M+ tracks, ensuring accurate identification even for modified background music.
          </p>
        </div>
      </section>

      {/* 4. Cross-Platform Directory (Interlinks to all other 4 platform pages + hubs) */}
      <section className="w-full space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="space-y-2 text-left">
          <span className="text-[length:var(--text-base)] font-bold text-blue-700 block">
            Explore Other Platforms
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Find Songs on Other Social Video Platforms
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
            href="/find-song-from-youtube-shorts" 
            className="tool-card space-y-3 block"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FF0000] text-white flex items-center justify-center">
              <YouTubeLogoIcon className="w-6 h-6" />
            </div>
            <h4 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">YouTube Shorts Music Finder</h4>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">Extract songs from Shorts links with video previews.</p>
          </Link>

          <Link 
            href="/find-song-on-snapchat" 
            className="tool-card space-y-3 block"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FFFC00] text-[#111827] border border-amber-300 flex items-center justify-center">
              <SnapchatLogoIcon className="w-6 h-6" />
            </div>
            <h4 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">Find Song on Snapchat</h4>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">Detect songs from Snapchat Spotlight and public Snaps.</p>
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
        <FaqSection faqs={FACEBOOK_FAQS} />
      </section>
    </SongFinderEngine>
  );
}
