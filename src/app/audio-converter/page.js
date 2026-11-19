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
    <div className="site-container py-10 md:py-16 space-y-16">
      {/* 1. Hero Header */}
      <section className="text-left space-y-4">
        <h1 className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)]">
          Audio Converter
        </h1>

        <p className="text-[length:var(--text-lead)] text-[var(--color-text-muted)] prose-measure leading-[var(--leading-body)]">
          Welcome to the <strong>audio converter</strong> directory on iLoveAudios. Convert between 30+ audio and video formats online for free with studio bitrates up to 320kbps and bit-perfect lossless compression.
        </p>
      </section>

      {/* 2. Highlight Banner: Dedicated Link to /mp3-converter Hub */}
      <section className="ui-card border-red-500/20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-3 text-left">
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Looking Specifically for MP3 Converters?
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure leading-[var(--leading-body)]">
            Visit our dedicated <strong>MP3 Converter</strong> hub featuring 18+ direct video and audio converters to universal 320kbps MP3 format.
          </p>
        </div>
        <Link
          href="/mp3-converter"
          className="ui-control w-full sm:w-auto rounded-2xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold transition-colors shadow-sm shrink-0 flex items-center justify-center gap-2"
        >
          <span>Explore MP3 Converter Hub</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* 3. Audio to Audio Converters (Lossless & Multi-format) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
          <div className="space-y-2">
            <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)] flex items-center gap-3">
              <FileAudio className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>Audio to Audio Converters (Lossless &amp; Lossy)</span>
            </h2>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure">
              Convert between WAV, FLAC, ALAC, MP3, AAC, M4A, OGG, OPUS, and ringtone formats:
            </p>
          </div>
          <span className="ui-pill text-[length:var(--text-base)] font-bold text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-full border border-[var(--color-border)] inline-flex items-center shrink-0">
            {pureAudioConverters.length} Tools
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
          <div className="space-y-2">
            <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)] flex items-center gap-3">
              <Video className="w-6 h-6 text-blue-600 shrink-0" />
              <span>Video to Audio Extraction Tools</span>
            </h2>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure">
              Extract high-fidelity MP3 and uncompressed WAV soundtracks from video containers:
            </p>
          </div>
          <span className="ui-pill text-[length:var(--text-base)] font-bold text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-full border border-[var(--color-border)] inline-flex items-center shrink-0">
            {videoConverters.length} Tools
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <section className="w-full space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="text-left space-y-3">
          <span className="text-[length:var(--text-base)] font-bold text-emerald-700 block">
            How It Works
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            How to Convert Any Audio Format in 3 Steps
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            Our cloud engine powered by FFmpeg makes converting any format quick and lossless:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ui-card space-y-3 border-emerald-500/20">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              1
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Pick Your Conversion Tool
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Select your source and target formats from the directory above and upload your file (up to 500MB).
            </p>
          </div>

          <div className="ui-card space-y-3 border-blue-500/20">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              2
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Customize Quality Presets
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Adjust sample rates (44.1kHz / 48kHz), audio channels (stereo/mono), or select bitrates up to 320kbps.
            </p>
          </div>

          <div className="ui-card space-y-3 border-purple-500/20">
            <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              3
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Convert &amp; Save
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Click Convert to transcode your media file in seconds and download your finished track with full tags.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Cross-Tool Recommendations */}
      <section className="ui-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2 text-left">
          <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
            Explore Audio Trimming &amp; AI Song Recognition
          </h3>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure">
            Cut and trim tracks with sub-second accuracy, or identify songs playing in videos.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <Link
            href="/tools/audio-cutter"
            className="ui-control rounded-xl font-bold bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-colors flex items-center justify-center gap-2"
          >
            <Scissors className="w-5 h-5 text-purple-600" />
            <span>Audio Cutter</span>
          </Link>
          <Link
            href="/tools/song-extractor"
            className="ui-control rounded-xl font-bold bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-colors flex items-center justify-center gap-2"
          >
            <Music2 className="w-5 h-5 text-blue-600" />
            <span>AI Song Finder</span>
          </Link>
          <Link
            href="/mp3-converter"
            className="ui-control rounded-xl font-bold bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-colors flex items-center justify-center gap-2"
          >
            <Disc className="w-5 h-5 text-[var(--color-brand)]" />
            <span>MP3 Converter</span>
          </Link>
        </div>
      </section>

      {/* 7. Frequently Asked Questions */}
      <section id="faqs" className="w-full pt-8 border-t border-[var(--color-border)]">
        <FaqSection faqs={AUDIO_CONVERTER_FAQS} />
      </section>
    </div>
  );
}
