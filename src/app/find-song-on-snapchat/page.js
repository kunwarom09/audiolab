'use client';

import React from 'react';
import SongFinderEngine from '@/components/SongFinderEngine';
import FaqSection from '@/components/FaqSection';
import Link from 'next/link';
import {
  InstagramLogoIcon,
  TikTokLogoIcon,
  YouTubeLogoIcon,
  FacebookLogoIcon
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
      <div className="ui-card shadow-xs space-y-4 text-left">
        <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
          Need to <strong>find song on snapchat</strong> Spotlight or discover the soundtrack behind a viral creator post? Snapchat Spotlight is home to millions of short-form videos featuring trending music, dance challenges, and comedic clips. However, Snapchat often does not show the track title on the screen, leaving viewers wondering who sings the song.
        </p>
        <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
          With <strong>iLoveAudios Snapchat Song Finder</strong>, you can easily <strong>identify song from snapchat video</strong> clips and <strong>find song from snapchat story</strong> posts by pasting any public link. Our AI recognition engine demuxes the digital audio, matches the acoustic fingerprint across 50M+ tracks, and gives you verified track credits, full lyrics, and MP3 downloads.
        </p>
      </div>

      {/* 2. Platform-Specific Link Copying Steps */}
      <section className="w-full space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="text-left space-y-3">
          <span className="text-[length:var(--text-base)] font-bold text-amber-700 block">
            Snapchat Instructions
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            How to Copy a Snapchat Link for Recognition
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            Copying links from Snapchat Spotlight and public stories takes just three quick steps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ui-card space-y-3 border-amber-500/20">
            <div className="w-11 h-11 rounded-xl bg-yellow-400 text-slate-900 flex items-center justify-center font-bold text-[length:var(--text-base)]">
              1
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Open Spotlight or Public Story
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Navigate to the Spotlight video or Creator Story in the Snapchat app on iPhone or Android.
            </p>
          </div>

          <div className="ui-card space-y-3 border-purple-500/20">
            <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              2
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Tap Share &rarr; Copy Link
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Tap the <strong>Share (Paper Plane/Arrow)</strong> icon on the side of the screen &rarr; Tap the <strong>Copy Link</strong> button.
            </p>
          </div>

          <div className="ui-card space-y-3 border-blue-500/20">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              3
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Paste &amp; Identify Track
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Paste the copied URL into the box above and click <strong>Find Song</strong> to discover the song title and download the MP3.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive: Music Identification on Snapchat */}
      <section className="w-full space-y-4 pt-8 border-t border-[var(--color-border)] text-left">
        <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
          How Our AI Detects Songs in Snapchat Spotlight &amp; Lenses
        </h2>
        <div className="space-y-4 text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
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
      <section className="w-full space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="space-y-2 text-left">
          <span className="text-[length:var(--text-base)] font-bold text-amber-700 block">
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
            href="/find-song-from-youtube-shorts" 
            className="tool-card space-y-3 block"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FF0000] text-white flex items-center justify-center">
              <YouTubeLogoIcon className="w-6 h-6" />
            </div>
            <h4 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">YouTube Shorts Music Finder</h4>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">Extract music from Shorts links with video previews.</p>
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
        <FaqSection faqs={SNAPCHAT_FAQS} />
      </section>
    </SongFinderEngine>
  );
}
