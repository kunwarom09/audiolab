'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'How does the AI Song Finder work?',
    answer: 'Paste any Instagram Reel, TikTok video, Facebook Reel, or Snapchat Spotlight URL. Our Shazam-powered audio recognition engine extracts the background audio stream and matches its acoustic fingerprint against millions of tracks to identify the song title, artist, album, and release details in seconds.'
  },
  {
    question: 'Is this online Song Finder completely free?',
    answer: 'Yes! You can identify unlimited songs, view complete synchronized lyrics, watch official YouTube music videos, and download high-quality MP3 files with zero cost and no account registration required.'
  },
  {
    question: 'Can I download the extracted song as an MP3?',
    answer: 'Absolutely. Once the song is identified, simply click the "Download Full Song (MP3)" button. Our engine will fetch and convert the track into a high-quality 192kbps MP3 audio file directly onto your device.'
  },
  {
    question: 'Which social media platforms are supported?',
    answer: 'Song Finder supports direct video links from Instagram Reels, TikTok Videos, Facebook Reels, Snapchat Spotlight, and YouTube Shorts.'
  },
  {
    question: 'Can I view full lyrics and watch the official music video?',
    answer: 'Yes, every extraction automatically provides complete line-by-line song lyrics with a built-in search filter and one-click copy button, as well as an embedded official YouTube music video player.'
  }
];

export default function FaqSection({ items }) {
  const [openIndex, setOpenIndex] = useState(null); // All items collapsed by default

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqList = items 
    ? items.map(item => ({ question: item.q || item.question, answer: item.a || item.answer }))
    : FAQ_ITEMS.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <section id="faq" className="space-y-8 pt-8 border-t border-[var(--border-color)] max-w-4xl mx-auto">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--iloveaudios-red)]/10 text-[var(--iloveaudios-red)] border border-[var(--iloveaudios-red)]/20 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          Click any question below to expand the answer.
        </p>
      </div>

      <div className="space-y-3">
        {faqList.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="glass-panel rounded-2xl overflow-hidden transition-all duration-200 border border-[var(--border-color)]"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                aria-expanded={isOpen}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[var(--text-primary)] hover:text-[var(--iloveaudios-red)] transition-colors cursor-pointer"
              >
                <span className="font-bold text-sm sm:text-base">{item.question}</span>
                <div
                  className={`p-1.5 rounded-xl bg-slate-100 dark:bg-white/10 text-[var(--text-secondary)] transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 bg-[var(--iloveaudios-red)]/10 text-[var(--iloveaudios-red)]' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <div 
                id={`faq-answer-${idx}`}
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)]/50">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
