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
    <div className="site-container py-10 md:py-16 space-y-16">
      {/* 1. Hero Header */}
      <section className="text-left space-y-4">
        <h1 className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)]">
          MP3 Converter
        </h1>

        <p className="text-[length:var(--text-lead)] text-[var(--color-text-muted)] prose-measure leading-[var(--leading-body)]">
          Welcome to the iLoveAudios online <strong>mp3 converter</strong> hub. Easily convert any video or audio recording to universal MP3 format in seconds with studio bitrates up to 320kbps. 100% free with no file size limits or mandatory signup.
        </p>
      </section>

      {/* 2. Grid of Cards linking to every existing "to MP3" converter page */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
          <div className="space-y-2">
            <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
              Convert Any Format to MP3
            </h2>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure">
              Select a specialized converter below for optimized bitrate profiles and fast cloud encoding:
            </p>
          </div>
          <span className="ui-pill text-[length:var(--text-base)] font-bold text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-full border border-[var(--color-border)] inline-flex items-center shrink-0">
            {toMp3Tools.length} Dedicated Converters
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <section className="w-full space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="text-left space-y-3">
          <span className="text-[length:var(--text-base)] font-bold text-[var(--color-brand)] block">
            Simple 3-Step Process
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            How to Convert Video or Audio to MP3 Online
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            Our cloud conversion engine makes transforming any media file into pristine MP3 effortless:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ui-card space-y-3 border-red-500/20">
            <div className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              1
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Choose Tool &amp; Upload File
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Select your source format converter above and upload your MOV, AVI, OGG, WAV, MP4, or FLAC file from your phone or desktop.
            </p>
          </div>

          <div className="ui-card space-y-3 border-purple-500/20">
            <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              2
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Configure Audio Bitrate
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Pick 128kbps for compact voice notes, 192kbps for podcasts, or 320kbps for maximum studio musical fidelity.
            </p>
          </div>

          <div className="ui-card space-y-3 border-emerald-500/20">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              3
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Download Finished MP3
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Click Convert to transcode your audio with accelerated FFmpeg and save your clean MP3 track with preserved metadata.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Cross-Tool Recommendations (Audio Cutter, Song Finder, Audio Converter) */}
      <section className="ui-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2 text-left">
          <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
            Need to trim your audio or identify background songs?
          </h3>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure">
            Explore our specialized tools suite for audio cutting and AI music recognition.
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
            href="/audio-converter"
            className="ui-control rounded-xl font-bold bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-colors flex items-center justify-center gap-2"
          >
            <Layers className="w-5 h-5 text-emerald-600" />
            <span>All Audio Converters</span>
          </Link>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section id="faqs" className="w-full pt-8 border-t border-[var(--color-border)]">
        <FaqSection faqs={MP3_HUB_FAQS} />
      </section>
    </div>
  );
}
