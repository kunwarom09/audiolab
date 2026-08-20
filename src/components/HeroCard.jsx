'use client';

import React from 'react';
import ReelInput from './ReelInput';

export default function HeroCard({ onExtract, isLoading }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
      <div className="shazam-hero-card p-6 sm:p-10 md:p-14 flex flex-col items-center justify-center text-center space-y-8">
        
        {/* Song Finder Hero Title */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-tight">
            Song Finder – Identify Any Song from a Video
          </h1>

          <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Can&apos;t find the song used in a Reel or video? Paste an Instagram Reel, Facebook Reel, TikTok, or Snapchat video link into our free Song Finder. We&apos;ll analyze the video and help you find the song and artist.
          </p>
        </div>

        {/* Integrated URL Input & Platform Badges Container */}
        <div className="w-full max-w-3xl pt-2 space-y-3">
          <ReelInput onExtract={onExtract} isLoading={isLoading} />
          <p className="text-xs text-[var(--text-muted)] font-medium text-center">
            Paste your Instagram, Facebook, TikTok, or Snapchat video link and find the song used in the video.
          </p>
        </div>

      </div>
    </div>
  );
}
