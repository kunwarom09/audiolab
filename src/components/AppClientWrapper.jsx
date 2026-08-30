'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize Theme and History on Mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('extractor_theme');
      const isDark = savedTheme === 'dark';
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      const savedHistory = localStorage.getItem('extractor_history') || localStorage.getItem('reel_song_history');
      const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];

      const savedConvHistory = localStorage.getItem('iloveaudios_conversion_history');
      const parsedConvHistory = savedConvHistory ? JSON.parse(savedConvHistory) : [];

      queueMicrotask(() => {
        if (isDark) setIsDarkMode(true);
        if (parsedHistory.length) setHistory(parsedHistory);
        if (parsedConvHistory.length) setConversionHistory(parsedConvHistory);
      });
    } catch (err) {
      console.error('Failed to load theme or history data:', err);
    }
  }, []);

  // Event listener for adding conversion history
  useEffect(() => {
    const handleAddConversion = (e) => {
      const newItem = e.detail;
      setConversionHistory((prev) => {
        const updated = [newItem, ...prev.filter(x => x.jobId !== newItem.jobId)].slice(0, 20);
        localStorage.setItem('iloveaudios_conversion_history', JSON.stringify(updated));
        return updated;
      });
    };

    window.addEventListener('addConversionHistory', handleAddConversion);
    return () => window.removeEventListener('addConversionHistory', handleAddConversion);
  }, []);

  const handleToggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('extractor_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('extractor_theme', 'light');
    }
  };

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
        isDarkMode,
        setIsHistoryOpen,
        handleToggleTheme,
        handleClearHistory,
        handleClearConversionHistory
      }}
    >
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col relative transition-colors duration-300 font-sans">
        <Header
          onOpenHistory={() => setIsHistoryOpen(true)}
          historyCount={history.length + conversionHistory.length}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
        />

        <main className="flex-1 w-full z-10">
          {children}
        </main>

        <footer className="w-full border-t border-[var(--border-color)] py-8 px-4 sm:px-6 text-center text-xs text-[var(--text-muted)] bg-[var(--bg-card)] space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
            <span className="font-semibold text-[var(--text-secondary)]">Standards & Engine:</span>
            <a
              href="https://ffmpeg.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--iloveaudios-red)] transition-colors inline-flex items-center gap-0.5"
            >
              <span>FFmpeg</span>
              <span className="text-[9px]">↗</span>
            </a>
            <a
              href="https://www.w3.org/TR/webaudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--iloveaudios-red)] transition-colors inline-flex items-center gap-0.5"
            >
              <span>W3C Web Audio API</span>
              <span className="text-[9px]">↗</span>
            </a>
            <a
              href="https://id3.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--iloveaudios-red)] transition-colors inline-flex items-center gap-0.5"
            >
              <span>ID3 Standards</span>
              <span className="text-[9px]">↗</span>
            </a>
          </div>
          <p>iLoveAudios &copy; 2026 — Secure, Free & Fast Audio Platform</p>
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
