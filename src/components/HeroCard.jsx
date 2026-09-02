'use client';

import React from 'react';
import MediaInputArea from './MediaInputArea';

export default function HeroCard({ 
  onExtractLink, 
  onIdentifyFile, 
  isLoading,
  initialTab = 'link',
  initialFile = null
}) {
  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
      <div className="shazam-hero-card p-6 sm:p-10 md:p-12 flex flex-col items-center justify-center text-center space-y-7">
        
        {/* Song Finder Hero Title */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-tight">
            Free AI Song Finder & Music Identifier
          </h1>

          <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Find the song behind any video link (Instagram Reels, TikTok, Shorts), audio clip, or live recording in seconds.
          </p>
        </div>

        {/* Integrated Unified Input (Link, Upload, Record) */}
        <div className="w-full max-w-3xl pt-1">
          <MediaInputArea 
            onExtractLink={onExtractLink} 
            onIdentifyFile={onIdentifyFile} 
            isLoading={isLoading}
            initialTab={initialTab}
            initialFile={initialFile}
          />
        </div>

      </div>
    </div>
  );
}

