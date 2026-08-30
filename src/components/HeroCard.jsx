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
            Find the Song Behind Any Video
          </h1>

          <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Paste a video link, upload an audio or video clip, or record live music to identify the song and artist in seconds.
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

