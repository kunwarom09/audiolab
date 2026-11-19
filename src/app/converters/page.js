import React from 'react';
import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import FaqSection from '@/components/FaqSection';
import { TOOLS, FORMAT_DEFINITIONS } from '@/lib/toolsConfig';
import { Sparkles, ShieldCheck, Zap, Disc, FileAudio, Video, ArrowRight } from 'lucide-react';

const CONVERTER_HUB_FAQS = [
  {
    question: 'What is the best audio format for everyday music listening?',
    answer: 'MP3 at 320kbps is the gold standard for everyday listening. It reduces file size by over 80% compared to uncompressed studio WAV files while remaining acoustically indistinguishable from CD quality on headphones, car stereos, and smartphones.'
  },
  {
    question: 'Does converting a video (MP4 or MOV) to MP3 reduce sound quality?',
    answer: 'When you select our 320kbps or 192kbps output preset, the audio stream is extracted and re-encoded using high-efficiency psychoacoustic algorithms. This preserves all dynamic frequencies present in the original video soundtrack with zero noticeable loss.'
  },
  {
    question: 'How do I convert Apple iPhone Voice Memos (.m4a) to MP3 for Windows?',
    answer: 'Use our M4A to MP3 converter. Upload the .m4a file directly from your iPhone or computer, choose your desired MP3 quality, and download a universally compatible MP3 track that plays on Windows, Android, and car stereos.'
  },
  {
    question: 'Are my uploaded audio and video files kept safe and private?',
    answer: 'Yes! All file uploads and conversions take place over encrypted HTTPS connections in isolated temporary storage. Files are automatically and permanently deleted from our servers shortly after processing.'
  },
  {
    question: 'What is the difference between lossless audio (FLAC/WAV) and lossy audio (MP3/AAC)?',
    answer: 'Lossless audio formats (FLAC, WAV, ALAC) retain 100% of the studio acoustic data bit-for-bit, resulting in larger files (30MB–60MB per song). Lossy formats (MP3, AAC, OGG) discard imperceptible sound frequencies to produce lightweight, streamable files (3MB–8MB) with universal device compatibility.'
  }
];

export default function ConvertersHubPage() {
  // Top 6 flagship converters with highest search demand
  const topSlugs = ['mp4-to-mp3', 'm4a-to-mp3', 'mov-to-mp3', 'wav-to-mp3', 'flac-to-mp3', 'ogg-to-mp3'];
  const topTools = topSlugs.map(slug => TOOLS[slug]).filter(Boolean);

  // Categorize other tools
  const videoToAudio = Object.values(TOOLS).filter(t => t.category === 'Video to Audio');
  const audioConverters = Object.values(TOOLS).filter(t => t.category === 'Audio Converters');

  return (
    <div className="site-container py-10 md:py-16 space-y-16">
      
      {/* 1. Hero Header */}
      <section className="text-left space-y-4">
        <h1 className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)]">
          Free Online Audio Converters & Format Directory
        </h1>

        <p className="text-[length:var(--text-lead)] text-[var(--color-text-muted)] prose-measure leading-[var(--leading-body)]">
          Fast, private, and 100% free online audio converters. Extract studio 320kbps MP3s from videos, compress large WAV files, and convert across 25+ audio and video formats without software installation.
        </p>
      </section>

      {/* 2. Top 6 High-Demand Converters Grid */}
      <section className="space-y-6">
        <div className="space-y-2 text-left">
          <span className="text-[length:var(--text-base)] font-bold text-[var(--color-brand)] block">
            Most Popular
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Flagship Audio Converters
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure">
            Our fastest, highest-fidelity converters optimized for mobile, desktop, and studio workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topTools.map(tool => (
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

      {/* 3. Song Finder Callout Hub Card */}
      <section className="ui-card border-blue-500/30 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-xs">
        <div className="space-y-3 text-left">
          <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
            Converting a video just to find out what song is playing?
          </h3>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure leading-[var(--leading-body)]">
            You don&apos;t need to convert the whole file. Paste any Instagram Reel, TikTok, or YouTube video link into our AI Song Finder to identify the artist, lyrics, and download the full song instantly.
          </p>
        </div>
        <Link
          href="/tools/song-extractor"
          className="ui-control w-full sm:w-auto rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Launch AI Song Finder</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* 4. Format Decision Matrix & Guide */}
      <section className="space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="space-y-2 text-left">
          <span className="text-[length:var(--text-base)] font-bold text-emerald-700 block">
            Format Encyclopedia
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Audio Format Comparison & Decision Guide
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure leading-[var(--leading-body)]">
            Not sure which format you need? Compare compression rates, fidelity, and device compatibility below:
          </p>
        </div>

        <div className="table-scroll rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
          <table className="w-full text-left border-collapse text-[length:var(--text-base)]">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
                <th className="p-4 sm:p-5 font-bold text-[var(--color-text)]">Format</th>
                <th className="p-4 sm:p-5 font-bold text-[var(--color-text)]">Compression</th>
                <th className="p-4 sm:p-5 font-bold text-[var(--color-text)]">Best Use Case</th>
                <th className="p-4 sm:p-5 font-bold text-[var(--color-text)]">Device Playback</th>
                <th className="p-4 sm:p-5 font-bold text-[var(--color-text)]">Recommended Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-muted)]">
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[var(--color-text)]">MP3</td>
                <td className="p-4 sm:p-5 text-amber-700 font-medium">Lossy (Up to 320kbps)</td>
                <td className="p-4 sm:p-5">Everyday listening, podcasts, mobile storage</td>
                <td className="p-4 sm:p-5 text-emerald-700 font-bold">100% (All devices)</td>
                <td className="p-4 sm:p-5">Target format for all audio sharing</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[var(--color-text)]">WAV</td>
                <td className="p-4 sm:p-5 text-blue-700 font-medium">Lossless Uncompressed (PCM)</td>
                <td className="p-4 sm:p-5">Studio recording, audio mixing, DAWs</td>
                <td className="p-4 sm:p-5 text-emerald-700 font-bold">Mac, Windows, DAWs</td>
                <td className="p-4 sm:p-5"><Link href="/tools/wav-to-mp3" className="inline-flex items-center min-h-[48px] py-[12px] text-blue-700 font-bold hover:underline">Convert WAV to MP3</Link></td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[var(--color-text)]">FLAC</td>
                <td className="p-4 sm:p-5 text-emerald-700 font-medium">Lossless Compressed</td>
                <td className="p-4 sm:p-5">Hi-fi music archiving, audiophile listening</td>
                <td className="p-4 sm:p-5 text-amber-700 font-bold">Android, VLC (No native iOS)</td>
                <td className="p-4 sm:p-5"><Link href="/tools/flac-to-mp3" className="inline-flex items-center min-h-[48px] py-[12px] text-blue-700 font-bold hover:underline">Convert FLAC to MP3</Link></td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[var(--color-text)]">M4A / AAC</td>
                <td className="p-4 sm:p-5 text-purple-700 font-medium">High-Efficiency Lossy</td>
                <td className="p-4 sm:p-5">iPhone Voice Memos, Apple Music, YouTube</td>
                <td className="p-4 sm:p-5 text-emerald-700 font-bold">Apple devices, modern Android</td>
                <td className="p-4 sm:p-5"><Link href="/tools/m4a-to-mp3" className="inline-flex items-center min-h-[48px] py-[12px] text-blue-700 font-bold hover:underline">Convert M4A to MP3</Link></td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[var(--color-text)]">OGG</td>
                <td className="p-4 sm:p-5 text-rose-700 font-medium">Open-Source Lossy (Vorbis)</td>
                <td className="p-4 sm:p-5">Game development, Discord bots, Spotify</td>
                <td className="p-4 sm:p-5 text-amber-700 font-bold">PC, Android (No native iOS)</td>
                <td className="p-4 sm:p-5"><Link href="/tools/ogg-to-mp3" className="inline-flex items-center min-h-[48px] py-[12px] text-blue-700 font-bold hover:underline">Convert OGG to MP3</Link></td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-[var(--color-text)]">MOV / MP4</td>
                <td className="p-4 sm:p-5 text-cyan-700 font-medium">Video Container</td>
                <td className="p-4 sm:p-5">iPhone camera clips, social video recordings</td>
                <td className="p-4 sm:p-5 text-emerald-700 font-bold">Universal Video Players</td>
                <td className="p-4 sm:p-5"><Link href="/tools/mp4-to-mp3" className="inline-flex items-center min-h-[48px] py-[12px] text-blue-700 font-bold hover:underline">Extract MP3 from Video</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Complete Categorized Directory */}
      <section className="space-y-8 pt-8 border-t border-[var(--color-border)]">
        <div className="space-y-2 text-left">
          <span className="text-[length:var(--text-base)] font-bold text-blue-700 block">
            Complete Suite
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Video to Audio Converters
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure">
            Extract high-fidelity MP3 or WAV soundtracks from any video format:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoToAudio.map(tool => (
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

        <div className="space-y-2 text-left pt-8">
          <span className="text-[length:var(--text-base)] font-bold text-purple-700 block">
            Format Transcoding
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Audio to Audio Converters
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure">
            Convert between uncompressed, compressed, and mobile audio formats:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audioConverters.map(tool => (
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

      {/* 6. Frequently Asked Questions */}
      <section id="faqs" className="w-full pt-8 border-t border-[var(--color-border)]">
        <FaqSection faqs={CONVERTER_HUB_FAQS} />
      </section>
    </div>
  );
}
