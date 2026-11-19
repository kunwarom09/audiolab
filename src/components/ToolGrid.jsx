'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { TOOLS } from '@/lib/toolsConfig';
import {
  CutterGlyph,
  FormatPairIcon,
  JoinerGlyph,
  VolumeGlyph,
} from '@/components/AudioIcons';

const CATEGORY_COLORS = {
  'Video to Audio': '#c2410c',
  'Convert Audio': '#1d4ed8',
  'Edit Audio': '#15803d',
};

const FILTER_PILLS = ['All', 'Video to Audio', 'Convert Audio', 'Edit Audio'];

const VIDEO_INPUT_FORMATS = new Set(['MP4', 'MOV', 'AVI', 'MKV', 'WebM', '3GP', 'WMV']);

const ORDERED_SLUGS = [
  'audio-cutter',
  'audio-joiner',
  'volume-booster',
  'mp4-to-mp3',
  'wav-to-mp3',
  'mp3-to-wav',
  'flac-to-mp3',
  'm4a-to-mp3',
  'opus-to-mp3',
  'mp3-to-m4r',
  'mov-to-mp3',
  'mp4-to-wav',
  'mov-to-wav',
  'webm-to-mp3',
  'avi-to-mp3',
  'mkv-to-mp3',
  'aac-to-mp3',
  'webm-to-wav',
  '3gp-to-mp3',
  'wmv-to-mp3',
  'ogg-to-mp3',
  'ogg-to-wav',
  'flac-to-wav',
  'm4a-to-wav',
  'mp3-to-flac',
  'mp3-to-aac',
  'mp3-to-ogg',
  'mp3-to-m4a',
  'wav-to-flac',
  'wav-to-m4a',
  'wav-to-ogg',
  'wav-to-aac',
  'wma-to-mp3',
  'm4r-to-mp3',
  'aiff-to-mp3',
  'amr-to-mp3',
  'alac-to-flac',
  'm4b-to-mp3',
];

const SHORT_TITLES = {
  'audio-cutter': 'Audio Cutter',
  'audio-joiner': 'Audio Joiner',
  'volume-booster': 'Volume Booster',
};

const SHORT_DESCRIPTIONS = {
  'audio-cutter': 'Trim MP3, WAV, M4A, or OGG clips and export MP3 or M4R.',
  'audio-joiner': 'Merge multiple MP3, WAV, M4A, or FLAC tracks into one audio file.',
  'volume-booster': 'Boost volume up to 300% for MP3, WAV, M4A, FLAC, and OGG files.',
};

function getToolCategory(tool) {
  if (tool.isCustomPage) return 'Edit Audio';
  if (VIDEO_INPUT_FORMATS.has(tool.fromFormat)) return 'Video to Audio';
  return 'Convert Audio';
}

function getShortTitle(tool) {
  if (tool.fromFormat && tool.toFormat) {
    return `${tool.fromFormat} to ${tool.toFormat}`;
  }
  return SHORT_TITLES[tool.slug] || tool.title;
}

function getShortDescription(tool) {
  if (SHORT_DESCRIPTIONS[tool.slug]) return SHORT_DESCRIPTIONS[tool.slug];
  const from = tool.fromFormat;
  const to = tool.toFormat;
  if (VIDEO_INPUT_FORMATS.has(from)) {
    return to === 'MP3'
      ? `Extract 320 kbps MP3 audio from ${from} video files up to 500 MB.`
      : `Extract ${to} audio from ${from} video files up to 500 MB.`;
  }
  return to === 'MP3'
    ? `Convert ${from} audio files to 320 kbps MP3 up to 500 MB.`
    : `Convert ${from} audio files to ${to} format up to 500 MB.`;
}

function renderCardIcon(tool, category) {
  const color = CATEGORY_COLORS[category];
  if (tool.slug === 'audio-cutter') return <CutterGlyph color={color} className="w-12 h-12 shrink-0" />;
  if (tool.slug === 'audio-joiner') return <JoinerGlyph color={color} className="w-12 h-12 shrink-0" />;
  if (tool.slug === 'volume-booster') return <VolumeGlyph color={color} className="w-12 h-12 shrink-0" />;
  return <FormatPairIcon fromFormat={tool.fromFormat} toFormat={tool.toFormat} color={color} className="w-12 h-12 shrink-0" />;
}

export default function ToolGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const orderedCards = useMemo(() => {
    const seen = new Set(['song-extractor']);
    const list = [];
    for (const slug of ORDERED_SLUGS) {
      if (TOOLS[slug] && !seen.has(slug)) {
        seen.add(slug);
        list.push(TOOLS[slug]);
      }
    }
    for (const tool of Object.values(TOOLS)) {
      if (!seen.has(tool.slug)) {
        seen.add(tool.slug);
        list.push(tool);
      }
    }
    return list;
  }, []);

  const totalToolCount = Object.keys(TOOLS).length;

  return (
    <section
      id="tools-suite"
      aria-labelledby="all-tools-heading"
      className="site-container pt-16 pb-8 space-y-6 scroll-mt-20"
    >
      <div className="w-full space-y-3">
        <h2
          id="all-tools-heading"
          className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)] leading-[var(--leading-heading)]"
        >
          All audio tools
        </h2>
        <p className="prose-measure text-[length:var(--text-lead)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
          Trim clips, merge tracks, boost volume, or convert audio and video files up to 500 MB.
        </p>
      </div>

      {/* Filter Pills */}
      <div
        role="tablist"
        aria-label="Filter audio tools by category"
        className="w-full flex flex-wrap items-center gap-3"
      >
        {FILTER_PILLS.map((pill) => {
          const isActive = activeCategory === pill;
          return (
            <button
              key={pill}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(pill)}
              className={`min-h-[48px] px-[20px] py-[12px] rounded-full text-[length:var(--text-base)] font-semibold transition-colors duration-150 cursor-pointer border ${
                isActive
                  ? 'bg-[var(--color-pill-active)] text-white border-[var(--color-pill-active)]'
                  : 'bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-border)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]'
              }`}
            >
              {pill}
            </button>
          );
        })}
      </div>

      {/* Responsive Tool Grid (3 wide desktop, 2 tablet, 1 mobile, 24px gap) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orderedCards.map((tool, index) => {
          const category = getToolCategory(tool);
          const matchesCategory = activeCategory === 'All' || activeCategory === category;
          const withinInitialLimit = activeCategory !== 'All' || showAll || index < 18;
          const isVisible = matchesCategory && withinInitialLimit;

          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              title={tool.title}
              className={
                isVisible
                  ? 'tool-card p-6 sm:p-8 flex flex-col items-start gap-4 group'
                  : 'hidden'
              }
            >
              {renderCardIcon(tool, category)}
              <div className="w-full space-y-2">
                <h3 className="text-[length:var(--text-h3)] font-semibold text-[var(--color-text)] group-hover:text-[var(--color-brand)] transition-colors duration-150 leading-[var(--leading-heading)]">
                  {getShortTitle(tool)}
                </h3>
                <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
                  {getShortDescription(tool)}
                </p>
              </div>
              <span className="sr-only"> — {tool.title}</span>
            </Link>
          );
        })}
      </div>

      {activeCategory === 'All' && (
        <div className="w-full flex justify-start sm:justify-center pt-2">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            aria-expanded={showAll}
            className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-brand)] text-[var(--color-text)] hover:text-[var(--color-brand)] text-[length:var(--text-base)] font-semibold transition-colors duration-150 cursor-pointer"
          >
            {showAll ? 'Show fewer tools' : `Show all ${totalToolCount} converters`}
          </button>
        </div>
      )}
    </section>
  );
}
