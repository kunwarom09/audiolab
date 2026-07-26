'use client';

import React from 'react';
import ReelInput from './ReelInput';

export default function HeroCard({ onExtract, isLoading }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
      <div className="shazam-hero-card p-6 sm:p-10 md:p-14 flex flex-col items-center justify-center text-center space-y-8">
        
        {/* Shazam Hero Title */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-tight">
            Online Song Finder
          </h1>

          <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Identify background music, singer details, full lyrics, YouTube official videos, and download high-quality MP3 audio from any Instagram Reel, TikTok, Facebook, or Snapchat link.
          </p>
        </div>

        {/* Integrated URL Input & Platform Badges Container */}
        <div className="w-full max-w-3xl pt-2">
          <ReelInput onExtract={onExtract} isLoading={isLoading} />
        </div>

      </div>
    </div>
  );
}
