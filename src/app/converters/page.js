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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-16 animate-in fade-in duration-300">
      
      {/* 1. Hero Header */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-[var(--iloveaudios-red)] border border-red-500/20 text-xs font-black uppercase tracking-wider">
          <Disc className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Audio Conversion Hub</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
          Free Online Audio Converters & Format Directory
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Fast, private, and 100% free online audio converters. Extract studio 320kbps MP3s from videos, compress large WAV files, and convert across 25+ audio and video formats without software installation.
        </p>
      </section>

      {/* 2. Top 6 High-Demand Converters Grid */}
      <section className="space-y-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-[var(--iloveaudios-red)] block">
            Most Popular
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
            Flagship Audio Converters
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Our fastest, highest-fidelity converters optimized for mobile, desktop, and studio workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
      <section className="p-6 sm:p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-pink-500/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-500">
            <Sparkles className="w-3 h-3" />
            <span>AI Music Recognition</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[var(--text-primary)]">
            Converting a video just to find out what song is playing?
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl">
            You don&apos;t need to convert the whole file. Paste any Instagram Reel, TikTok, or YouTube video link into our AI Song Finder to identify the artist, lyrics, and download the full song instantly.
          </p>
        </div>
        <Link
          href="/tools/song-extractor"
          className="px-6 py-3 rounded-2xl font-black text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Launch AI Song Finder</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* 4. Format Decision Matrix & Guide */}
      <section className="space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500 block">
            Format Encyclopedia
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
            Audio Format Comparison & Decision Guide
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl">
            Not sure which format you need? Compare compression rates, fidelity, and device compatibility below:
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-slate-500/5">
                <th className="p-3.5 sm:p-4 font-black text-[var(--text-primary)]">Format</th>
                <th className="p-3.5 sm:p-4 font-black text-[var(--text-primary)]">Compression</th>
                <th className="p-3.5 sm:p-4 font-black text-[var(--text-primary)]">Best Use Case</th>
                <th className="p-3.5 sm:p-4 font-black text-[var(--text-primary)]">Device Playback</th>
                <th className="p-3.5 sm:p-4 font-black text-[var(--text-primary)]">Recommended Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)]">
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">MP3</td>
                <td className="p-3.5 sm:p-4 text-amber-500 font-medium">Lossy (Up to 320kbps)</td>
                <td className="p-3.5 sm:p-4">Everyday listening, podcasts, mobile storage</td>
                <td className="p-3.5 sm:p-4 text-emerald-500 font-bold">100% (All devices)</td>
                <td className="p-3.5 sm:p-4">Target format for all audio sharing</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">WAV</td>
                <td className="p-3.5 sm:p-4 text-blue-500 font-medium">Lossless Uncompressed (PCM)</td>
                <td className="p-3.5 sm:p-4">Studio recording, audio mixing, DAWs</td>
                <td className="p-3.5 sm:p-4 text-emerald-500 font-bold">Mac, Windows, DAWs</td>
                <td className="p-3.5 sm:p-4"><Link href="/tools/wav-to-mp3" className="text-blue-500 font-bold hover:underline">Convert WAV to MP3</Link></td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">FLAC</td>
                <td className="p-3.5 sm:p-4 text-emerald-500 font-medium">Lossless Compressed</td>
                <td className="p-3.5 sm:p-4">Hi-fi music archiving, audiophile listening</td>
                <td className="p-3.5 sm:p-4 text-amber-500 font-bold">Android, VLC (No native iOS)</td>
                <td className="p-3.5 sm:p-4"><Link href="/tools/flac-to-mp3" className="text-blue-500 font-bold hover:underline">Convert FLAC to MP3</Link></td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">M4A / AAC</td>
                <td className="p-3.5 sm:p-4 text-purple-500 font-medium">High-Efficiency Lossy</td>
                <td className="p-3.5 sm:p-4">iPhone Voice Memos, Apple Music, YouTube</td>
                <td className="p-3.5 sm:p-4 text-emerald-500 font-bold">Apple devices, modern Android</td>
                <td className="p-3.5 sm:p-4"><Link href="/tools/m4a-to-mp3" className="text-blue-500 font-bold hover:underline">Convert M4A to MP3</Link></td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">OGG</td>
                <td className="p-3.5 sm:p-4 text-rose-500 font-medium">Open-Source Lossy (Vorbis)</td>
                <td className="p-3.5 sm:p-4">Game development, Discord bots, Spotify</td>
                <td className="p-3.5 sm:p-4 text-amber-500 font-bold">PC, Android (No native iOS)</td>
                <td className="p-3.5 sm:p-4"><Link href="/tools/ogg-to-mp3" className="text-blue-500 font-bold hover:underline">Convert OGG to MP3</Link></td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">MOV / MP4</td>
                <td className="p-3.5 sm:p-4 text-cyan-500 font-medium">Video Container</td>
                <td className="p-3.5 sm:p-4">iPhone camera clips, social video recordings</td>
                <td className="p-3.5 sm:p-4 text-emerald-500 font-bold">Universal Video Players</td>
                <td className="p-3.5 sm:p-4"><Link href="/tools/mp4-to-mp3" className="text-blue-500 font-bold hover:underline">Extract MP3 from Video</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Complete Categorized Directory */}
      <section className="space-y-8 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-500 block">
            Complete Suite
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
            Video to Audio Converters
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Extract high-fidelity MP3 or WAV soundtracks from any video format:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

        <div className="space-y-1 text-center sm:text-left pt-6">
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-500 block">
            Format Transcoding
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
            Audio to Audio Converters
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Convert between uncompressed, compressed, and mobile audio formats:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      <section id="faqs" className="max-w-4xl mx-auto pt-8 border-t border-[var(--border-color)]">
        <FaqSection faqs={CONVERTER_HUB_FAQS} />
      </section>
    </div>
  );
}
