'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import Header from './Header';
import ExtractionHistory from './ExtractionHistory';
import LoginModal from './LoginModal';

const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export default function AppClientWrapper({ children }) {
  const [history, setHistory] = useState([]);
  const [conversionHistory, setConversionHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Initialize Theme, History, and User on Mount
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

      const savedConvHistory = localStorage.getItem('audiolab_conversion_history');
      const parsedConvHistory = savedConvHistory ? JSON.parse(savedConvHistory) : [];

      const savedUser = localStorage.getItem('extractor_user');
      const parsedUser = savedUser ? JSON.parse(savedUser) : null;

      queueMicrotask(() => {
        if (isDark) setIsDarkMode(true);
        if (parsedHistory.length) setHistory(parsedHistory);
        if (parsedConvHistory.length) setConversionHistory(parsedConvHistory);
        if (parsedUser) setUser(parsedUser);
      });

      // Check for Google OAuth callback return parameters
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('login_success') === 'true') {
          const email = params.get('email');
          const name = params.get('name') || email?.split('@')[0];
          const userData = { email, name, provider: 'google', token: `jwt_session_${Date.now()}` };
          queueMicrotask(() => {
            setUser(userData);
          });
          localStorage.setItem('extractor_user', JSON.stringify(userData));
          window.history.replaceState({}, document.title, window.location.pathname);
        } else if (params.get('google_login') === 'prompt') {
          queueMicrotask(() => {
            setIsLoginModalOpen(true);
          });
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    } catch (err) {
      console.error('Failed to load theme, history, or user data:', err);
    }
  }, []);

  // Event listener for adding conversion history
  useEffect(() => {
    const handleAddConversion = (e) => {
      const newItem = e.detail;
      setConversionHistory((prev) => {
        const updated = [newItem, ...prev.filter(x => x.jobId !== newItem.jobId)].slice(0, 20);
        localStorage.setItem('audiolab_conversion_history', JSON.stringify(updated));
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

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('extractor_user', JSON.stringify(userData));
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('extractor_user');
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('extractor_history');
    localStorage.removeItem('reel_song_history');
  };

  const handleClearConversionHistory = () => {
    setConversionHistory([]);
    localStorage.removeItem('audiolab_conversion_history');
  };

  return (
    <AppContext.Provider
      value={{
        history,
        setHistory,
        conversionHistory,
        setConversionHistory,
        isDarkMode,
        user,
        setUser,
        isLoginModalOpen,
        setIsLoginModalOpen,
        setIsHistoryOpen,
        handleToggleTheme,
        handleLoginSuccess,
        handleLogout,
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
          user={user}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
        />

        <main className="flex-1 w-full z-10">
          {children}
        </main>

        <footer className="w-full border-t border-[var(--border-color)] py-8 text-center text-xs text-[var(--text-muted)] bg-[var(--bg-card)]">
          <p>AudioLab &copy; 2026 — Secure & Fast Audio Platform</p>
        </footer>

        <ExtractionHistory
          history={history}
          conversionHistory={conversionHistory}
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          onSelect={(item) => {
            // If on a specific tool page, let's redirect or post message to handle selection
            // Dispatch a custom event to notify components that history item was selected
            const event = new CustomEvent('historySelect', { detail: item });
            window.dispatchEvent(event);
          }}
          onClear={handleClearHistory}
          onClearConversions={handleClearConversionHistory}
        />

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </AppContext.Provider>
  );
}
