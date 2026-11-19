'use client';

import React from 'react';
import MediaInputArea from './MediaInputArea';

export default function HeroCard({
  onExtractLink,
  onIdentifyFile,
  isLoading,
  initialTab = 'link',
  initialFile = null,
  title = 'Song Finder',
  subtitle = 'Paste a video link, upload an audio or video file (up to 100 MB), or record with your microphone.',
  linkPlaceholder,
}) {
  return (
    <section aria-labelledby="hero-heading" className="w-full">
      <div className="w-full ui-card space-y-6">
        <div className="space-y-3 text-left">
          <h1
            id="hero-heading"
            className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)] leading-[var(--leading-heading)]"
          >
            {title}
          </h1>
          <p className="prose-measure text-[length:var(--text-lead)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
            {subtitle}
          </p>
        </div>

        <MediaInputArea
          onExtractLink={onExtractLink}
          onIdentifyFile={onIdentifyFile}
          isLoading={isLoading}
          initialTab={initialTab}
          initialFile={initialFile}
          linkPlaceholder={linkPlaceholder}
        />
      </div>
    </section>
  );
}
