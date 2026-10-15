import React from 'react';
import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import FaqSection from '@/components/FaqSection';
import { TOOLS } from '@/lib/toolsConfig';
import { 
  Layers, 
  Disc, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Scissors, 
  Music2, 
  FileAudio,
  Video
} from 'lucide-react';

const AUDIO_CONVERTER_FAQS = [
  {
    question: 'What is the difference between lossless and lossy audio converters?',
    answer: 'Lossless audio converters (such as WAV to FLAC or ALAC to FLAC) decompress and re-encode audio bit-for-bit without discarding any sound data, preserving master studio quality. Lossy converters (like MP4 to MP3 or OGG to MP3) discard imperceptible acoustic frequencies to achieve 70% to 90% smaller file sizes with universal playback across all mobile devices and car audio systems.'
  },
  {
    question: 'How do I convert video files into audio tracks?',
    answer: 'Select any of our Video to Audio converters (such as MP4 to MP3, MOV to MP3, or WebM to WAV). Upload your video recording, choose your target bitrate or uncompressed PCM settings, and our server will strip away the video frames to produce a standalone audio file.'
  },
  {
    question: 'Can I convert large studio audio files up to 500MB?',
    answer: 'Yes! iLoveAudios supports audio file uploads up to 500MB, accommodating 24-bit 96kHz multi-track WAV recordings, uncompressed AIFF files, and full-length FLAC albums.'
  },
  {
    question: 'Is there any cost, sign-up, or software installation needed?',
    answer: 'No. All conversion tools are 100% free, run completely inside your web browser, require no registration or credit card, and leave zero watermarks on your audio files.'
  }
];

export default function AudioConverterHubPage() {
  // Retrieve all conversion tools (excluding non-converters or custom utility pages)
  const allConverters = Object.values(TOOLS).filter(
    (tool) => !tool.isCustomPage && tool.fromFormat && tool.toFormat
  );

  const videoConverters = allConverters.filter((t) => t.category === 'Video to Audio');
  const pureAudioConverters = allConverters.filter((t) => t.category === 'Audio Converters');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-16 animate-in fade-in duration-300">
      {/* 1. Hero Header */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-black uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>Universal Format Transcoding</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
          Audio Converter
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Welcome to the <strong>audio converter</strong> directory on iLoveAudios. Convert between 30+ audio and video formats online for free with studio bitrates up to 320kbps and bit-perfect lossless compression.
        </p>
      </section>

      {/* 2. Highlight Banner: Dedicated Link to /mp3-converter Hub */}
      <section className="max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-500/10 via-pink-500/5 to-purple-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/15 text-[var(--iloveaudios-red)] text-[10px] font-black uppercase tracking-wider">
            Flagship Suite
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            Looking Specifically for MP3 Converters?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
            Visit our dedicated <strong>MP3 Converter</strong> hub featuring 18+ direct video and audio converters to universal 320kbps MP3 format.
          </p>
        </div>
        <Link
          href="/mp3-converter"
          className="px-6 py-3.5 rounded-2xl bg-[var(--iloveaudios-red)] hover:bg-[#d92d39] text-white font-extrabold text-sm transition-all shadow-lg shadow-red-500/25 shrink-0 flex items-center gap-2"
        >
          <span>Explore MP3 Converter Hub</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* 3. Audio to Audio Converters (Lossless & Multi-format) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight flex items-center gap-2">
              <FileAudio className="w-5 h-5 text-emerald-500" />
              <span>Audio to Audio Converters (Lossless & Lossy)</span>
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Convert between WAV, FLAC, ALAC, MP3, AAC, M4A, OGG, OPUS, and ringtone formats:
            </p>
          </div>
          <span className="text-xs font-bold text-[var(--text-muted)] bg-[var(--bg-card)] px-3 py-1 rounded-full border border-[var(--border-color)]">
            {pureAudioConverters.length} Tools
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pureAudioConverters.map((tool) => (
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

      {/* 4. Video to Audio Converters */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight flex items-center gap-2">
              <Video className="w-5 h-5 text-blue-500" />
              <span>Video to Audio Extraction Tools</span>
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Extract high-fidelity MP3 and uncompressed WAV soundtracks from video containers:
            </p>
          </div>
          <span className="text-xs font-bold text-[var(--text-muted)] bg-[var(--bg-card)] px-3 py-1 rounded-full border border-[var(--border-color)]">
            {videoConverters.length} Tools
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videoConverters.map((tool) => (
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

      {/* 5. 3-Step Process Guide */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="text-center sm:text-left space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How to Convert Any Audio Format in 3 Steps
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            Our cloud engine powered by FFmpeg makes converting any format quick and lossless:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-panel rounded-2xl p-6 space-y-3 border-emerald-500/20 bg-emerald-500/5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
              1
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Pick Your Conversion Tool
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Select your source and target formats from the directory above and upload your file (up to 500MB).
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-blue-500/20 bg-blue-500/5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm">
              2
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Customize Quality Presets
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Adjust sample rates (44.1kHz / 48kHz), audio channels (stereo/mono), or select bitrates up to 320kbps.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-purple-500/20 bg-purple-500/5">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-sm">
              3
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Convert & Save
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Click Convert to transcode your media file in seconds and download your finished track with full tags.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Cross-Tool Recommendations */}
      <section className="max-w-4xl mx-auto p-6 rounded-2xl border border-[var(--border-color)] bg-gradient-to-r from-emerald-500/5 to-blue-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm sm:text-base font-black text-[var(--text-primary)]">
            Explore Audio Trimming & AI Song Recognition
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Cut and trim tracks with sub-second accuracy, or identify songs playing in videos.
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
            href="/mp3-converter"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)] transition-all shadow-xs flex items-center gap-1.5"
          >
            <Disc className="w-3.5 h-3.5 text-red-500" />
            <span>MP3 Converter</span>
          </Link>
        </div>
      </section>

      {/* 7. Frequently Asked Questions */}
      <section id="faqs" className="max-w-4xl mx-auto pt-6 border-t border-[var(--border-color)]">
        <FaqSection faqs={AUDIO_CONVERTER_FAQS} />
      </section>
    </div>
  );
}
