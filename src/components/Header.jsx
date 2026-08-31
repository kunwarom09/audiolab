'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { History, Sun, Moon, Menu, X } from 'lucide-react';

const LogoIcon = ({ className = "w-9 h-9" }) => (
  <svg viewBox="0 0 512 512" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="headerLogoRed" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#EF3E4A" />
        <stop offset="100%" stopColor="#E5293E" />
      </linearGradient>
    </defs>
    <rect x="16" y="16" width="480" height="480" rx="140" fill="url(#headerLogoRed)" />
    <g fill="#FFFFFF">
      <circle cx="212" cy="320" r="54" />
      <polygon points="246,312 288,152 312,158 270,318" />
      <path d="M 288 152 L 358 196 L 312 248 L 294 186 Z" />
    </g>
  </svg>
);

export default function Header({ onOpenHistory, historyCount, isDarkMode, onToggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-header)]/90 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Logo with waveform design */}
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm group-hover:scale-[1.04] transition-transform duration-200 flex items-center justify-center">
            <LogoIcon className="w-full h-full" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-[var(--text-primary)]">
                iLove<span className="text-[var(--iloveaudios-red)]">Audios</span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--iloveaudios-red)]/10 text-[var(--iloveaudios-red)] border border-[var(--iloveaudios-red)]/20">
                Suite
              </span>
            </div>
          </div>
        </Link>

        {/* Center Nav Links (Desktop only) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-[var(--text-secondary)]">
          <Link href="/" className="hover:text-[var(--iloveaudios-red)] transition-colors">Home</Link>
          <Link href="/tools/song-extractor" className="hover:text-[var(--iloveaudios-red)] transition-colors flex items-center gap-1">
            <span>AI Song Finder</span>
            <span className="px-1.5 py-0.2 rounded text-[8px] font-black bg-[var(--iloveaudios-red)]/15 text-[var(--iloveaudios-red)]">AI</span>
          </Link>

          {/* Audio Utilities Direct Link */}
          <div className="relative group py-2">
            <Link href="/#tools-suite" className="hover:text-[var(--iloveaudios-red)] transition-colors flex items-center gap-1 cursor-pointer">
              <span>Tools & Utilities</span>
              <span className="text-[10px] transition-transform group-hover:rotate-180">▾</span>
            </Link>

            {/* Dropdown panel */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-96 p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
              <div className="text-[10px] font-black uppercase tracking-wider text-purple-500 px-2.5 py-1">
                Audio Editing Utilities
              </div>
              <div className="grid grid-cols-3 gap-1 pt-1 pb-2 border-b border-[var(--border-color)]">
                <Link href="/tools/audio-cutter" className="px-2.5 py-2 rounded-xl text-[11px] font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] hover:text-purple-600 transition-colors">
                  Audio Cutter
                </Link>
                <Link href="/tools/audio-joiner" className="px-2.5 py-2 rounded-xl text-[11px] font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] hover:text-purple-600 transition-colors">
                  Audio Joiner
                </Link>
                <Link href="/tools/volume-booster" className="px-2.5 py-2 rounded-xl text-[11px] font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] hover:text-purple-600 transition-colors">
                  Volume Booster
                </Link>
              </div>

              <div className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] px-2.5 pt-2.5 pb-1">
                Popular Converters
              </div>
              <div className="grid grid-cols-2 gap-1 pt-1">
                <Link href="/tools/mp4-to-mp3" className="px-2.5 py-2 rounded-xl text-[11px] font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--iloveaudios-red)] transition-colors flex items-center justify-between">
                  <span>MP4 to MP3</span>
                  <span className="text-[9px] text-[var(--iloveaudios-red)] font-bold">HOT</span>
                </Link>
                <Link href="/tools/wav-to-mp3" className="px-2.5 py-2 rounded-xl text-[11px] font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--iloveaudios-red)] transition-colors">
                  WAV to MP3
                </Link>
                <Link href="/tools/mp3-to-wav" className="px-2.5 py-2 rounded-xl text-[11px] font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--iloveaudios-red)] transition-colors">
                  MP3 to WAV
                </Link>
                <Link href="/tools/flac-to-mp3" className="px-2.5 py-2 rounded-xl text-[11px] font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--iloveaudios-red)] transition-colors">
                  FLAC to MP3
                </Link>
                <Link href="/tools/opus-to-mp3" className="px-2.5 py-2 rounded-xl text-[11px] font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--iloveaudios-red)] transition-colors">
                  WhatsApp to MP3
                </Link>
                <Link href="/tools/m4a-to-mp3" className="px-2.5 py-2 rounded-xl text-[11px] font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--iloveaudios-red)] transition-colors">
                  M4A to MP3
                </Link>
              </div>
              <div className="mt-2 pt-2 border-t border-[var(--border-color)] px-2 text-center">
                <Link href="/#tools-suite" className="text-[10px] font-bold text-[var(--iloveaudios-red)] hover:underline">
                  View All 39+ Audio Tools →
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button (Always visible) */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-[var(--text-primary)] transition-all cursor-pointer flex items-center justify-center"
            title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>

          {/* History Drawer Trigger (Always visible) */}
          <button
            onClick={onOpenHistory}
            className="px-3 py-2 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="View History"
          >
            <History className="w-3.5 h-3.5 text-[var(--iloveaudios-red)]" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-[var(--iloveaudios-red)] text-white">
                {historyCount}
              </span>
            )}
          </button>

          {/* Hamburger Menu Toggle (Mobile only) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-[var(--text-primary)] transition-all cursor-pointer flex items-center justify-center"
            title="Toggle Menu"
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? (
              <X className="w-3.5 h-3.5 text-[var(--iloveaudios-red)]" />
            ) : (
              <Menu className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-header)] animate-fadeIn">
          <div className="px-4 py-4 flex flex-col gap-2.5 text-xs font-bold text-[var(--text-secondary)]">
            <Link 
              href="/" 
              className="hover:text-[var(--iloveaudios-red)] transition-colors py-1.5 border-b border-[var(--border-color)]/30"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/tools/song-extractor" 
              className="hover:text-[var(--iloveaudios-red)] transition-colors py-1.5 border-b border-[var(--border-color)]/30"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Song Finder
            </Link>
            <Link 
              href="/tools/audio-cutter" 
              className="hover:text-[var(--iloveaudios-red)] transition-colors py-1.5 border-b border-[var(--border-color)]/30"
              onClick={() => setIsMenuOpen(false)}
            >
              Audio Cutter
            </Link>
            <Link 
              href="/tools/audio-joiner" 
              className="hover:text-[var(--iloveaudios-red)] transition-colors py-1.5 border-b border-[var(--border-color)]/30"
              onClick={() => setIsMenuOpen(false)}
            >
              Audio Joiner
            </Link>
            <Link 
              href="/tools/volume-booster" 
              className="hover:text-[var(--iloveaudios-red)] transition-colors py-1.5 border-b border-[var(--border-color)]/30"
              onClick={() => setIsMenuOpen(false)}
            >
              Volume Booster
            </Link>
            <Link 
              href="/#tools-suite" 
              className="hover:text-[var(--iloveaudios-red)] transition-colors py-1.5"
              onClick={() => setIsMenuOpen(false)}
            >
              All 39+ Converters
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
