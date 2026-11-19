'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronStrokeIcon,
  CloseCrossIcon,
  HistoryClockIcon,
  MenuLinesIcon,
  WaveformIcon,
} from './AudioIcons';

const DROPDOWN_LINKS = [
  { label: 'Song Finder', href: '/tools/song-extractor' },
  { label: 'Audio Cutter', href: '/tools/audio-cutter' },
  { label: 'Audio Joiner', href: '/tools/audio-joiner' },
  { label: 'Volume Booster', href: '/tools/volume-booster' },
  { label: 'MP4 to MP3', href: '/tools/mp4-to-mp3' },
  { label: 'WAV to MP3', href: '/tools/wav-to-mp3' },
];

export default function Header({ onOpenHistory, historyCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="site-container min-h-[72px] py-2 flex items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-2.5 min-h-[48px] shrink-0">
          <Image
            src="/logo.png"
            alt="iLoveAudios"
            width={36}
            height={36}
            priority
            className="w-9 h-9 object-contain shrink-0"
          />
          <span className="font-logo text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">
            iLove<span className="text-[var(--color-brand)]">Audios</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:flex items-center lg:gap-3.5 xl:gap-6 text-[length:var(--text-base)] font-semibold text-[var(--color-text)]">
          <Link href="/tools/song-extractor" className="inline-flex items-center min-h-[48px] py-[12px] hover:text-[var(--color-brand)] transition-colors duration-150">
            Song Finder
          </Link>
          <Link href="/mp3-converter" className="inline-flex items-center min-h-[48px] py-[12px] hover:text-[var(--color-brand)] transition-colors duration-150">
            MP3 Converter
          </Link>
          <Link href="/audio-converter" className="inline-flex items-center min-h-[48px] py-[12px] hover:text-[var(--color-brand)] transition-colors duration-150">
            Audio Converter
          </Link>
          <Link href="/tools/audio-cutter" className="inline-flex items-center min-h-[48px] py-[12px] hover:text-[var(--color-brand)] transition-colors duration-150">
            Audio Cutter
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-expanded={isDropdownOpen}
              className="min-h-[52px] px-3.5 xl:px-5 py-[12px] flex items-center gap-1.5 text-[length:var(--text-base)] hover:text-[var(--color-brand)] transition-colors duration-150 cursor-pointer"
            >
              <span>Tools</span>
              <ChevronStrokeIcon
                className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180 text-[var(--color-brand)]' : ''}`}
              />
            </button>

            {isDropdownOpen && (
              <div
                className="absolute top-full right-0 w-72 p-3 rounded-[12px] bg-[var(--color-surface)] border border-[var(--color-border)] z-50"
                style={{ boxShadow: 'var(--shadow-card-hover)' }}
              >
                <ul className="space-y-1">
                  {DROPDOWN_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center min-h-[48px] px-4 py-[12px] rounded-[8px] text-[length:var(--text-base)] text-[var(--color-text)] hover:bg-[var(--color-bg)] hover:text-[var(--color-brand)] transition-colors duration-150"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 pt-2 border-t border-[var(--color-border)]">
                  <Link
                    href="/#tools-suite"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center min-h-[48px] px-4 py-[12px] rounded-[8px] text-[length:var(--text-base)] font-semibold text-[var(--color-brand)] hover:bg-[var(--color-bg)] transition-colors duration-150"
                  >
                    All converters
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenHistory}
            className="min-h-[52px] min-w-[48px] px-3.5 xl:px-5 rounded-[8px] bg-[var(--color-surface)] hover:bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] hover:text-[var(--color-brand)] text-[length:var(--text-base)] font-semibold flex items-center gap-2 transition-colors duration-150 cursor-pointer"
            title="View History"
          >
            <HistoryClockIcon className="w-5 h-5 text-[var(--color-brand)]" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="px-2.5 py-1 rounded-full text-[length:var(--text-base)] leading-none font-bold bg-[var(--color-brand)] text-white">
                {historyCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="lg:hidden min-h-[52px] min-w-[48px] px-[20px] rounded-[8px] bg-[var(--color-surface)] hover:bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] cursor-pointer flex items-center justify-center"
            title="Toggle Menu"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <CloseCrossIcon className="w-6 h-6 text-[var(--color-brand)]" />
            ) : (
              <MenuLinesIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="site-container py-4 flex flex-col gap-1 text-[length:var(--text-base)] font-semibold text-[var(--color-text)]">
            <Link
              href="/tools/song-extractor"
              className="flex items-center min-h-[48px] py-[12px] border-b border-[var(--color-border)] hover:text-[var(--color-brand)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Song Finder
            </Link>
            <Link
              href="/mp3-converter"
              className="flex items-center min-h-[48px] py-[12px] border-b border-[var(--color-border)] hover:text-[var(--color-brand)]"
              onClick={() => setIsMenuOpen(false)}
            >
              MP3 Converter
            </Link>
            <Link
              href="/audio-converter"
              className="flex items-center min-h-[48px] py-[12px] border-b border-[var(--color-border)] hover:text-[var(--color-brand)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Audio Converter
            </Link>
            <Link
              href="/tools/audio-cutter"
              className="flex items-center min-h-[48px] py-[12px] border-b border-[var(--color-border)] hover:text-[var(--color-brand)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Audio Cutter
            </Link>
            <Link
              href="/tools/audio-joiner"
              className="flex items-center min-h-[48px] py-[12px] border-b border-[var(--color-border)] hover:text-[var(--color-brand)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Audio Joiner
            </Link>
            <Link
              href="/tools/volume-booster"
              className="flex items-center min-h-[48px] py-[12px] border-b border-[var(--color-border)] hover:text-[var(--color-brand)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Volume Booster
            </Link>
            <Link
              href="/#tools-suite"
              className="flex items-center min-h-[48px] py-[12px] font-bold text-[var(--color-brand)]"
              onClick={() => setIsMenuOpen(false)}
            >
              All converters
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
