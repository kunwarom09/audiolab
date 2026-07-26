'use client';

import React, { useState } from 'react';
import { Copy, Check, Search, FileText, ExternalLink, Music } from 'lucide-react';

export default function LyricsViewer({ lyrics, songTitle, artist }) {
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState('');

  // Check if lyrics exist and are valid (not dummy placeholder strings)
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
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-4">
          <FileText className="w-5 h-5 text-amber-500 shrink-0" />
          <h3 className="text-lg font-bold text-[var(--text-primary)] whitespace-nowrap">Song Lyrics</h3>
        </div>

        <div className="text-center py-10 px-4 space-y-4 bg-[var(--bg-main)] rounded-xl border border-[var(--border-color)]">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <Music className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h4 className="text-sm font-bold text-[var(--text-primary)]">Lyrics Not Available in Database</h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Lyrics for <span className="font-bold text-[#0088ff]">{songTitle}</span> are not indexed in the LRCLIB open lyrics database yet.
            </p>
          </div>

          <a
            href={googleSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0088ff] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <span>Search Lyrics on Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div className="flex items-center gap-2 shrink-0">
          <FileText className="w-5 h-5 text-blue-500 shrink-0" />
          <h3 className="text-lg font-bold text-[var(--text-primary)] whitespace-nowrap">Song Lyrics</h3>
          <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">({lines.length} lines)</span>
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-xs justify-end">
          <div className="relative flex-1 min-w-[120px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search lyrics..."
              className="w-full glass-input rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none"
            />
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-[#0088ff] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 shrink-0" />
                <span>Copy Lyrics</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Lyrics Text Box */}
      <div className="max-h-96 overflow-y-auto pr-2 space-y-2 font-mono text-sm leading-relaxed text-[var(--text-secondary)] bg-[var(--bg-main)] rounded-xl p-4 border border-[var(--border-color)]">
        {filteredLines.length > 0 ? (
          filteredLines.map((line, idx) => (
            <div key={idx} className="flex gap-4 hover:bg-[var(--bg-card-hover)] rounded px-2 py-0.5 transition-colors overflow-x-auto scrollbar-none">
              <span className="text-xs text-[var(--text-muted)] select-none w-8 text-right font-sans pt-0.5 shrink-0">
                {idx + 1}
              </span>
              <p className={line.trim() === '' ? 'h-4' : 'font-sans text-[var(--text-primary)] whitespace-nowrap'}>
                {line}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-[var(--text-muted)] text-sm font-sans">
            No lyric lines matched &quot;{filter}&quot;
          </div>
        )}
      </div>
    </div>
  );
}
