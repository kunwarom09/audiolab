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
    <div className="site-container py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-left space-y-4">
        <h1 className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)]">
          About iLoveAudios
        </h1>
        <p className="text-[length:var(--text-lead)] text-[var(--color-text-muted)] prose-measure leading-[var(--leading-body)]">
          iLoveAudios is a modern web platform delivering high-speed, secure, and completely free audio conversion tools, editing utilities, and AI-powered music identification directly in your browser.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="ui-card space-y-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
            <Music2 className="w-5 h-5" />
          </div>
          <h2 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Audio Quality First</h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            We preserve maximum acoustic fidelity with support for studio-quality 320kbps MP3 exports, uncompressed WAV files, and lossless formats.
          </p>
        </div>

        <div className="ui-card space-y-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Privacy by Design</h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            Uploaded files are processed in isolated environments and automatically deleted shortly after conversion. We never share or sell your data.
          </p>
        </div>

        <div className="ui-card space-y-3">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Fast &amp; Accessible</h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            100% browser-based with zero software installation, no sign-up barriers, and cloud-accelerated FFmpeg processing.
          </p>
        </div>
      </div>

      {/* Technology & Standards */}
      <div className="ui-card space-y-4">
        <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">Engine &amp; Standards</h2>
        <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
          iLoveAudios leverages industry-standard multimedia frameworks including FFmpeg, W3C Web Audio API standards, and acoustic fingerprinting algorithms to provide reliable format conversion and acoustic analysis across 39+ audio and video formats.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-3 text-[length:var(--text-base)] text-[var(--color-text-muted)]">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>High-precision trimming and volume soft-limiting</span>
          </div>
          <div className="flex items-center gap-3 text-[length:var(--text-base)] text-[var(--color-text-muted)]">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Acoustic fingerprint matching against music catalogs</span>
          </div>
          <div className="flex items-center gap-3 text-[length:var(--text-base)] text-[var(--color-text-muted)]">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Automatic cloud file cleanup &amp; encryption in transit</span>
          </div>
          <div className="flex items-center gap-3 text-[length:var(--text-base)] text-[var(--color-text-muted)]">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Responsive support for mobile, tablet, and desktop</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-left pt-4">
        <Link
          href="/"
          className="ui-control w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl font-bold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] transition-colors shadow-sm"
        >
          <span>Explore All Tools</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
