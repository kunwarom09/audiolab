import React from 'react';
import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/siteConfig';
import { Music2, ShieldCheck, Zap, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us | iLoveAudios',
  description: 'Learn about iLoveAudios — our mission to provide fast, secure, and 100% free online audio converters, editing utilities, and AI music recognition.',
  alternates: {
    canonical: getCanonicalUrl('/about'),
  },
  openGraph: {
    title: 'About Us | iLoveAudios',
    description: 'Learn about iLoveAudios — fast, secure, and free online audio tools and AI song recognition.',
    url: getCanonicalUrl('/about'),
    siteName: 'iLoveAudios',
    locale: 'en_US',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-[var(--iloveaudios-red)] border border-red-500/20 text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
          About iLoveAudios
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          iLoveAudios is a modern web platform delivering high-speed, secure, and completely free audio conversion tools, editing utilities, and AI-powered music identification directly in your browser.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center">
            <Music2 className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[var(--text-primary)]">Audio Quality First</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            We preserve maximum acoustic fidelity with support for studio-quality 320kbps MP3 exports, uncompressed WAV files, and lossless formats.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[var(--text-primary)]">Privacy by Design</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Uploaded files are processed in isolated environments and automatically deleted shortly after conversion. We never share or sell your data.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[var(--text-primary)]">Fast & Accessible</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            100% browser-based with zero software installation, no sign-up barriers, and cloud-accelerated FFmpeg processing.
          </p>
        </div>
      </div>

      {/* Technology & Standards */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 border border-[var(--border-color)]">
        <h2 className="text-lg font-bold text-[var(--text-primary)]">Engine & Standards</h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          iLoveAudios leverages industry-standard multimedia frameworks including FFmpeg, W3C Web Audio API standards, and acoustic fingerprinting algorithms to provide reliable format conversion and acoustic analysis across 39+ audio and video formats.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>High-precision trimming and volume soft-limiting</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Acoustic fingerprint matching against music catalogs</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Automatic cloud file cleanup & encryption in transit</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Responsive support for mobile, tablet, and desktop</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white bg-[var(--iloveaudios-red)] hover:bg-red-700 transition-all shadow-sm"
        >
          <span>Explore All Tools</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
