'use client';

import React from 'react';
import Link from 'next/link';
import { History, Sun, Moon, Music2, User, LogOut } from 'lucide-react';

export default function Header({ onOpenHistory, historyCount, isDarkMode, onToggleTheme, user, onOpenLoginModal, onLogout }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-header)]/90 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Logo with waveform design */}
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-[var(--audiolab-red)] text-white flex items-center justify-center shadow-sm group-hover:scale-[1.02] transition-transform duration-200">
            <Music2 className="w-4.5 h-4.5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-black tracking-tight text-[var(--text-primary)] uppercase">
                AUDIO<span className="text-[var(--audiolab-red)]">LAB</span>
              </h1>
              <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--audiolab-red)]/10 text-[var(--audiolab-red)] border border-[var(--audiolab-red)]/20">
                Suite
              </span>
            </div>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-[var(--text-secondary)]">
          <Link href="/" className="hover:text-[var(--audiolab-red)] transition-colors">Home</Link>
          <Link href="/tools/song-extractor" className="hover:text-[var(--audiolab-red)] transition-colors">AI Song Finder</Link>
          <a href="/#tools-suite" className="hover:text-[var(--audiolab-red)] transition-colors">Converters</a>
        </nav>

        {/* Right Actions: User Account + Theme Toggle + History Button */}
        <div className="flex items-center gap-2.5">
          {/* User Account / Login Button */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span className="max-w-[90px] truncate">{user.email.split('@')[0]}</span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg bg-[var(--bg-card)] hover:bg-red-500/10 border border-[var(--border-color)] text-slate-400 hover:text-[var(--audiolab-red)] transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenLoginModal}
                className="text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--audiolab-red)] transition-colors cursor-pointer px-2 py-1"
              >
                Login
              </button>
              <button
                onClick={onOpenLoginModal}
                className="px-4 py-2 rounded-lg bg-[var(--audiolab-red)] hover:bg-red-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Theme Toggle Button */}
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

          {/* History Drawer Trigger */}
          <button
            onClick={onOpenHistory}
            className="px-3 py-2 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="View History"
          >
            <History className="w-3.5 h-3.5 text-[var(--audiolab-red)]" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-[var(--audiolab-red)] text-white">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
