'use client';

import React, { useState } from 'react';
import { ChevronStrokeIcon } from './AudioIcons';
import AdBanner from './AdBanner';

const FAQ_ITEMS = [
  {
    question: 'How does the Song Finder work?',
    answer:
      'Paste a public link from Instagram Reels, TikTok, Facebook Reels, YouTube Shorts, or Snapchat Spotlight, or upload an audio or video file up to 100 MB. The backend extracts the audio stream and matches its acoustic fingerprint to return the track title, artist, lyrics, and an MP3 download.',
  },
  {
    question: 'What file sizes and formats are supported?',
    answer:
      'Converters accept MP4, MOV, AVI, MKV, WebM, 3GP, WMV, MP3, WAV, FLAC, M4A, AAC, OGG, WMA, OPUS, M4R, AIFF, AMR, ALAC, and M4B up to 500 MB. Song Finder accepts uploads up to 100 MB.',
  },
  {
    question: 'Which MP3 bitrate options are available?',
    answer:
      'Export MP3 files at 128 kbps, 192 kbps, or 320 kbps, or convert to WAV and FLAC without signup.',
  },
  {
    question: 'How long are uploaded and converted files kept?',
    answer:
      'Uploaded media and converted output files stay available for 30 minutes for downloading and are then deleted automatically.',
  },
  {
    question: 'Do I need an account or desktop software?',
    answer:
      'No account or desktop software is required. All conversions and song lookups run directly in mobile and desktop browsers.',
  },
];

export default function FaqSection({ items, faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const rawList = items || faqs;
  const faqList = rawList
    ? rawList.map((item) => ({ question: item.q || item.question, answer: item.a || item.answer }))
    : FAQ_ITEMS;

  return (
    <section id="faq" className="w-full pt-8 pb-6">
      {/* 728x90 Leaderboard Ad before FAQ */}
      <AdBanner />

      <div className="w-full space-y-6 mt-6">
        <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)] leading-[var(--leading-heading)]">
          Frequently Asked Questions
        </h2>

        <div className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[16px] divide-y divide-[var(--color-border)] overflow-hidden">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="w-full">
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full min-h-[52px] px-6 py-4 text-left flex items-center justify-between gap-4 text-[length:var(--text-base)] font-semibold text-[var(--color-text)] hover:text-[var(--color-brand)] transition-colors duration-150 cursor-pointer"
                >
                  <span>{item.question}</span>
                  <ChevronStrokeIcon
                    className={`w-5 h-5 shrink-0 text-[var(--color-text-muted)] transition-transform ${
                      isOpen ? 'rotate-180 text-[var(--color-brand)]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="px-6 pb-6 text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]"
                  >
                    <p className="prose-measure">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
