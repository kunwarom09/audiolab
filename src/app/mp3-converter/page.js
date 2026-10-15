import React from 'react';
import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import FaqSection from '@/components/FaqSection';
import { TOOLS } from '@/lib/toolsConfig';
import { 
  Disc, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Scissors, 
  Music2, 
  Layers 
} from 'lucide-react';

const MP3_HUB_FAQS = [
  {
    question: 'What is the maximum file size for files converted to MP3?',
    answer: 'You can upload video and audio files up to 500MB per file with completely unlimited free conversions on iLoveAudios.'
  },
  {
    question: 'What audio quality bitrates can I choose for my MP3 output?',
    answer: 'We provide configurable output bitrates including 128kbps (optimized for speech and audiobooks), 192kbps (standard listening), and studio-grade 320kbps for maximum high-fidelity musical clarity.'
  },
  {
    question: 'Is this MP3 converter completely free to use online?',
    answer: 'Yes! iLoveAudios MP3 Converter is 100% free with no registration, no hidden subscriptions, and no watermarks on your downloaded audio files.'
  },
  {
    question: 'Are my uploaded videos and audio files kept private and secure?',
    answer: 'Yes. All uploads are transferred via encrypted HTTPS connections into temporary processing storage and automatically deleted shortly after conversion.'
  }
];

export default function Mp3ConverterHubPage() {
  // Automatically filter all tools in TOOLS config where toFormat === 'MP3'
  const toMp3Tools = Object.values(TOOLS).filter(
    (tool) => tool.toFormat === 'MP3' && !tool.isCustomPage
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-16 animate-in fade-in duration-300">
      {/* 1. Hero Header */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-[var(--iloveaudios-red)] border border-red-500/20 text-xs font-black uppercase tracking-wider">
          <Disc className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Universal Audio Encoding</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
          MP3 Converter
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Welcome to the iLoveAudios online <strong>mp3 converter</strong> hub. Easily convert any video or audio recording to universal MP3 format in seconds with studio bitrates up to 320kbps. 100% free with no file size limits or mandatory signup.
        </p>
      </section>

      {/* 2. Grid of Cards linking to every existing "to MP3" converter page */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Convert Any Format to MP3
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Select a specialized converter below for optimized bitrate profiles and fast cloud encoding:
            </p>
          </div>
          <span className="text-xs font-bold text-[var(--text-muted)] bg-[var(--bg-card)] px-3 py-1 rounded-full border border-[var(--border-color)]">
            {toMp3Tools.length} Dedicated Converters
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {toMp3Tools.map((tool) => (
            <ToolCard
              key={tool.slug}
              title={tool.title}
              description={tool.description}
              href={`/tools/${tool.slug}`}
              icon={tool.icon}
              category={tool.category}
              badge={tool.badge}
              fromFormat={tool.fromFormat}
              toFormat={tool.toFormat}
            />
          ))}
        </div>
      </section>

      {/* 3. 3-Step "How to Convert" Section */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="text-center sm:text-left space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-red-500">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How to Convert Video or Audio to MP3 Online
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            Our cloud conversion engine makes transforming any media file into pristine MP3 effortless:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-panel rounded-2xl p-6 space-y-3 border-red-500/20 bg-red-500/5">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-sm">
              1
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Choose Tool & Upload File
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Select your source format converter above and upload your MOV, AVI, OGG, WAV, MP4, or FLAC file from your phone or desktop.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-purple-500/20 bg-purple-500/5">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-sm">
              2
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Configure Audio Bitrate
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Pick 128kbps for compact voice notes, 192kbps for podcasts, or 320kbps for maximum studio musical fidelity.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-emerald-500/20 bg-emerald-500/5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
              3
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Download Finished MP3
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Click Convert to transcode your audio with accelerated FFmpeg and save your clean MP3 track with preserved metadata.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Cross-Tool Recommendations (Audio Cutter, Song Finder, Audio Converter) */}
      <section className="max-w-4xl mx-auto p-6 rounded-2xl border border-[var(--border-color)] bg-gradient-to-r from-red-500/5 to-purple-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm sm:text-base font-black text-[var(--text-primary)]">
            Need to trim your audio or identify background songs?
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Explore our specialized tools suite for audio cutting and AI music recognition.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/tools/audio-cutter"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)] transition-all shadow-xs flex items-center gap-1.5"
          >
            <Scissors className="w-3.5 h-3.5 text-purple-500" />
            <span>Audio Cutter</span>
          </Link>
          <Link
            href="/tools/song-extractor"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)] transition-all shadow-xs flex items-center gap-1.5"
          >
            <Music2 className="w-3.5 h-3.5 text-blue-500" />
            <span>AI Song Finder</span>
          </Link>
          <Link
            href="/audio-converter"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)] transition-all shadow-xs flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-500" />
            <span>All Audio Converters</span>
          </Link>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section id="faqs" className="max-w-4xl mx-auto pt-6 border-t border-[var(--border-color)]">
        <FaqSection faqs={MP3_HUB_FAQS} />
      </section>
    </div>
  );
}
