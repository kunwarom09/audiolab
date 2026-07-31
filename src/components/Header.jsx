'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { History, Sun, Moon, Music2, User, LogOut, Menu, X } from 'lucide-react';

export default function Header({ onOpenHistory, historyCount, isDarkMode, onToggleTheme, user, onOpenLoginModal, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        {/* Center Nav Links (Desktop only) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-[var(--text-secondary)]">
          <Link href="/" className="hover:text-[var(--audiolab-red)] transition-colors">Home</Link>
          <Link href="/tools/song-extractor" className="hover:text-[var(--audiolab-red)] transition-colors">AI Song Finder</Link>
          <a href="/#tools-suite" className="hover:text-[var(--audiolab-red)] transition-colors">Converters</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* User Account / Login Button (Desktop only) */}
          <div className="hidden md:flex items-center gap-2">
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
          </div>

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
            <History className="w-3.5 h-3.5 text-[var(--audiolab-red)]" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-[var(--audiolab-red)] text-white">
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
              <X className="w-3.5 h-3.5 text-[var(--audiolab-red)]" />
            ) : (
              <Menu className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-header)] animate-fadeIn">
          <div className="px-4 py-4 flex flex-col gap-3 text-xs font-bold text-[var(--text-secondary)]">
            <Link 
              href="/" 
              className="hover:text-[var(--audiolab-red)] transition-colors py-2 border-b border-[var(--border-color)]/30"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/tools/song-extractor" 
              className="hover:text-[var(--audiolab-red)] transition-colors py-2 border-b border-[var(--border-color)]/30"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Song Finder
            </Link>
            <a 
              href="/#tools-suite" 
              className="hover:text-[var(--audiolab-red)] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Converters
            </a>

            {/* Mobile User Section (Inside Menu) */}
            <div className="pt-3 mt-1 border-t border-[var(--border-color)]">
              {user ? (
                <div className="flex flex-col gap-2">
                  <div className="px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-2.5 rounded-lg bg-[var(--bg-card)] hover:bg-red-500/10 border border-[var(--border-color)] text-slate-400 hover:text-[var(--audiolab-red)] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onOpenLoginModal();
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-2.5 rounded-lg border border-[var(--border-color)] text-xs font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] transition-all cursor-pointer text-center"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      onOpenLoginModal();
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-2.5 rounded-lg bg-[var(--audiolab-red)] hover:bg-red-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm text-center"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
