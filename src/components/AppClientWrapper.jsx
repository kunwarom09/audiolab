'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from './Header';
import ExtractionHistory from './ExtractionHistory';

const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export default function AppClientWrapper({ children }) {
  const [history, setHistory] = useState([]);
  const [conversionHistory, setConversionHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    try {
      document.documentElement.classList.remove('dark');

      const savedHistory = localStorage.getItem('extractor_history') || localStorage.getItem('reel_song_history');
      const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];

      const savedConvHistory = localStorage.getItem('iloveaudios_conversion_history');
      const parsedConvHistory = savedConvHistory ? JSON.parse(savedConvHistory) : [];

      queueMicrotask(() => {
        if (parsedHistory.length) setHistory(parsedHistory);
        if (parsedConvHistory.length) setConversionHistory(parsedConvHistory);
      });
    } catch (err) {
      console.error('Failed to load history data:', err);
    }
  }, []);

  useEffect(() => {
    const handleAddConversion = (e) => {
      const newItem = e.detail;
      setConversionHistory((prev) => {
        const updated = [newItem, ...prev.filter((x) => x.jobId !== newItem.jobId)].slice(0, 20);
        localStorage.setItem('iloveaudios_conversion_history', JSON.stringify(updated));
        return updated;
      });
    };

    window.addEventListener('addConversionHistory', handleAddConversion);
    return () => window.removeEventListener('addConversionHistory', handleAddConversion);
  }, []);

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('extractor_history');
    localStorage.removeItem('reel_song_history');
  };

  const handleClearConversionHistory = () => {
    setConversionHistory([]);
    localStorage.removeItem('iloveaudios_conversion_history');
  };

  return (
    <AppContext.Provider
      value={{
        history,
        setHistory,
        conversionHistory,
        setConversionHistory,
        isDarkMode: false,
        setIsHistoryOpen,
        handleToggleTheme: () => {},
        handleClearHistory,
        handleClearConversionHistory,
      }}
    >
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col">
        <Header
          onOpenHistory={() => setIsHistoryOpen(true)}
          historyCount={history.length + conversionHistory.length}
        />

        <main className="flex-1 w-full">
          {children}
        </main>

        <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-surface)] py-8 mt-12">
          <div className="site-container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[length:var(--text-base)]">
            <Link href="/" className="inline-flex items-center gap-2 min-h-[48px] shrink-0">
              <Image
                src="/logo.png"
                alt="iLoveAudios"
                width={28}
                height={28}
                className="w-7 h-7 object-contain shrink-0"
              />
              <span className="font-logo text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">
                iLove<span className="text-[var(--color-brand)]">Audios</span>
              </span>
              <span className="text-[length:var(--text-sm)] text-[var(--color-text-muted)] ml-1">
                &copy; 2026
              </span>
            </Link>
            <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[var(--color-text)]">
              <Link href="/about" className="inline-flex items-center min-h-[48px] py-[12px] hover:text-[var(--color-brand)] transition-colors duration-150">
                About
              </Link>
              <Link href="/contact" className="inline-flex items-center min-h-[48px] py-[12px] hover:text-[var(--color-brand)] transition-colors duration-150">
                Contact
              </Link>
              <Link href="/privacy" className="inline-flex items-center min-h-[48px] py-[12px] hover:text-[var(--color-brand)] transition-colors duration-150">
                Privacy
              </Link>
              <Link href="/terms" className="inline-flex items-center min-h-[48px] py-[12px] hover:text-[var(--color-brand)] transition-colors duration-150">
                Terms
              </Link>
              <Link href="/#tools-suite" className="inline-flex items-center min-h-[48px] py-[12px] font-semibold text-[var(--color-brand)] hover:underline">
                All converters
              </Link>
            </nav>
          </div>
        </footer>

        <ExtractionHistory
          history={history}
          conversionHistory={conversionHistory}
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          onSelect={(item) => {
            const event = new CustomEvent('historySelect', { detail: item });
            window.dispatchEvent(event);
          }}
          onClear={handleClearHistory}
          onClearConversions={handleClearConversionHistory}
        />
      </div>
    </AppContext.Provider>
  );
}
