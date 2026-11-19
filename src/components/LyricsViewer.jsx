'use client';

import React, { useState } from 'react';
import {
  CheckStrokeIcon,
  CopyStrokeIcon,
  ExternalLinkStrokeIcon,
  FileTagIcon,
} from './AudioIcons';

export default function LyricsViewer({ lyrics, songTitle, artist }) {
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState('');

  const isInvalidPlaceholder =
    !lyrics ||
    lyrics.includes('Official music video available') ||
    lyrics.includes('Lyrics not available') ||
    lyrics.includes('Full song audio ready');

  const lines = !isInvalidPlaceholder && lyrics ? lyrics.split('\n') : [];
  const filteredLines = filter
    ? lines.filter((line) => line.toLowerCase().includes(filter.toLowerCase()))
    : lines;

  const handleCopy = async () => {
    if (isInvalidPlaceholder || !lyrics) return;
    try {
      await navigator.clipboard.writeText(`${songTitle} - ${artist}\n\n${lyrics}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy lyrics:', err);
    }
  };

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(`${songTitle} ${artist} lyrics`)}`;

  if (isInvalidPlaceholder) {
    return (
      <div className="w-full ui-card space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-4">
          <FileTagIcon className="w-6 h-6 text-[var(--color-accent)] shrink-0" />
          <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-ink)]">Song Lyrics</h3>
        </div>

        <div className="p-6 space-y-4 bg-[var(--color-canvas)] rounded-[8px] border border-[var(--color-border)]">
          <div className="space-y-1">
            <h4 className="text-[length:var(--text-lead)] font-bold text-[var(--color-ink)]">Lyrics not in database</h4>
            <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-muted)] leading-[var(--leading-body)]">
              Lyrics for <span className="font-semibold text-[var(--color-ink)]">{songTitle}</span> are not indexed in LRCLIB yet.
            </p>
          </div>

          <a
            href={googleSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-accent)] hover:bg-[#99161C] text-white font-bold text-[length:var(--text-base)] transition-colors cursor-pointer"
          >
            <span>Search Lyrics on Google</span>
            <ExternalLinkStrokeIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full ui-card space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div className="flex items-center gap-2 shrink-0">
          <FileTagIcon className="w-6 h-6 text-[var(--color-accent)] shrink-0" />
          <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-ink)]">Song Lyrics</h3>
          <span className="text-[length:var(--text-base)] text-[var(--color-muted)]">({lines.length} lines)</span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter lyrics..."
            aria-label="Filter lyrics"
            className="w-full sm:w-56 min-h-[52px] rounded-[8px] bg-[var(--color-canvas)] border border-[var(--color-border)] px-[20px] text-[length:var(--text-base)] text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)]"
          />

          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-canvas)] hover:border-[var(--color-ink)] border border-[var(--color-border)] text-[var(--color-ink)] text-[length:var(--text-base)] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <CheckStrokeIcon className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <CopyStrokeIcon className="w-5 h-5 shrink-0" />
                <span>Copy Lyrics</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto space-y-2 text-[length:var(--text-base)] leading-[var(--leading-body)] text-[var(--color-ink)] bg-[var(--color-canvas)] rounded-[8px] p-5 border border-[var(--color-border)]">
        {filteredLines.length > 0 ? (
          filteredLines.map((line, idx) => (
            <div key={idx} className="flex gap-4">
              <span className="text-[length:var(--text-base)] text-[var(--color-muted)] select-none w-10 text-right shrink-0">
                {idx + 1}
              </span>
              <p className={line.trim() === '' ? 'h-4' : 'text-[var(--color-ink)]'}>
                {line}
              </p>
            </div>
          ))
        ) : (
          <div className="text-left py-8 text-[var(--color-muted)] text-[length:var(--text-base)]">
            No lyric lines matched &ldquo;{filter}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}
