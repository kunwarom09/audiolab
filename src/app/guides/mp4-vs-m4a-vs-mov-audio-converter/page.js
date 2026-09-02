import React from 'react';
import Link from 'next/link';
import { Disc, ArrowRight, CheckCircle2, ShieldCheck, FileAudio, Video } from 'lucide-react';

export default function FormatComparisonGuidePage() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-12 animate-in fade-in duration-300">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs font-semibold text-[var(--text-secondary)]">
        <Link href="/" className="hover:text-[var(--iloveaudios-red)] transition-colors">Home</Link>
        <span className="text-[var(--text-muted)] font-normal">/</span>
        <span className="text-[var(--text-muted)] font-normal">Guides</span>
        <span className="text-[var(--text-muted)] font-normal">/</span>
        <span className="text-[var(--text-primary)] font-bold truncate">MP4 vs M4A vs MOV</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 text-xs font-black uppercase tracking-wider">
          <Disc className="w-3.5 h-3.5" />
          <span>Audio Formats & Bitrates</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
          MP4 vs M4A vs MOV: How to Extract High-Quality MP3 from Any Video or Recording
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-secondary)] pt-1">
          <span>By <strong>iLoveAudios Sound Engineering Team</strong></span>
          <span>&bull;</span>
          <span>Updated September 2026</span>
          <span>&bull;</span>
          <span>6 min read</span>
        </div>
      </header>

      {/* Quick Converter Launchpad */}
      <section className="p-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/tools/mp4-to-mp3"
          className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors text-center space-y-1 group"
        >
          <div className="text-xs font-black text-red-500 uppercase tracking-wider">Most Common</div>
          <div className="font-bold text-sm text-[var(--text-primary)] group-hover:text-red-500 transition-colors">MP4 to MP3</div>
          <div className="text-[11px] text-[var(--text-secondary)]">Webinars & Video Clips</div>
        </Link>

        <Link
          href="/tools/m4a-to-mp3"
          className="p-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors text-center space-y-1 group"
        >
          <div className="text-xs font-black text-cyan-500 uppercase tracking-wider">Apple Voice Memos</div>
          <div className="font-bold text-sm text-[var(--text-primary)] group-hover:text-cyan-500 transition-colors">M4A to MP3</div>
          <div className="text-[11px] text-[var(--text-secondary)]">iPhone Voice Notes</div>
        </Link>

        <Link
          href="/tools/mov-to-mp3"
          className="p-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 transition-colors text-center space-y-1 group"
        >
          <div className="text-xs font-black text-purple-500 uppercase tracking-wider">iPhone 4K Video</div>
          <div className="font-bold text-sm text-[var(--text-primary)] group-hover:text-purple-500 transition-colors">MOV to MP3</div>
          <div className="text-[11px] text-[var(--text-secondary)]">QuickTime Camera Roll</div>
        </Link>
      </section>

      {/* Main Guide Body */}
      <div className="space-y-8 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)] pt-8">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            Understanding Container Formats vs Audio Streams
          </h2>
          <p>
            When dealing with video recordings, files like <strong>.mp4</strong> and <strong>.mov</strong> are not sound files—they are <em>multimedia container boxes</em> that hold synchronized video frames (encoded in H.264 or HEVC) alongside compressed audio tracks (usually AAC or PCM).
          </p>
          <p>
            Because video frames consume 85% to 95% of the total file size, a 5-minute iPhone concert video can easily weigh 400MB. Converting that recording to an MP3 strips away the video entirely, reducing the file to an ultra-portable 8MB audio track without sacrificing audio clarity.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            Side-by-Side Format Comparison
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[var(--border-color)] bg-slate-500/5">
                  <th className="p-3.5 sm:p-4 font-black text-[var(--text-primary)]">Format</th>
                  <th className="p-3.5 sm:p-4 font-black text-[var(--text-primary)]">Type</th>
                  <th className="p-3.5 sm:p-4 font-black text-[var(--text-primary)]">Default Audio Codec</th>
                  <th className="p-3.5 sm:p-4 font-black text-[var(--text-primary)]">Primary Problem</th>
                  <th className="p-3.5 sm:p-4 font-black text-[var(--text-primary)]">Recommended Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)]">
                <tr>
                  <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">MP4</td>
                  <td className="p-3.5 sm:p-4">Video Container</td>
                  <td className="p-3.5 sm:p-4">AAC / MP3</td>
                  <td className="p-3.5 sm:p-4 text-amber-500">Huge file size, requires screen on</td>
                  <td className="p-3.5 sm:p-4"><Link href="/tools/mp4-to-mp3" className="text-blue-500 font-bold hover:underline">Convert to MP3</Link></td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">MOV</td>
                  <td className="p-3.5 sm:p-4">Apple Video</td>
                  <td className="p-3.5 sm:p-4">Linear PCM / AAC</td>
                  <td className="p-3.5 sm:p-4 text-amber-500">Incompatible with Windows Media / Android</td>
                  <td className="p-3.5 sm:p-4"><Link href="/tools/mov-to-mp3" className="text-blue-500 font-bold hover:underline">Convert to MP3</Link></td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">M4A</td>
                  <td className="p-3.5 sm:p-4">Apple Audio Only</td>
                  <td className="p-3.5 sm:p-4">AAC</td>
                  <td className="p-3.5 sm:p-4 text-amber-500">Fails on car stereos and PowerPoint</td>
                  <td className="p-3.5 sm:p-4"><Link href="/tools/m4a-to-mp3" className="text-blue-500 font-bold hover:underline">Convert to MP3</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Bitrates Section */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            Which Bitrate Should You Choose (128k vs 192k vs 320kbps)?
          </h2>
          <p>
            When converting video to audio on iLoveAudios, you can select custom output bitrates:
          </p>
          <ul className="space-y-2 list-disc list-inside bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-color)]">
            <li><strong className="text-[var(--text-primary)]">128kbps:</strong> Ideal for spoken voice notes, lecture recordings, and audiobooks. Creates the smallest file size.</li>
            <li><strong className="text-[var(--text-primary)]">192kbps (Standard):</strong> The best balance of quality and file size for general music and podcasts.</li>
            <li><strong className="text-[var(--text-primary)]">320kbps (Studio):</strong> Maximum acoustic fidelity. Recommended for live concert soundtracks, DJ mixes, and music production archives.</li>
          </ul>
        </section>

        {/* Cross-Link to Format Hub */}
        <section className="p-6 rounded-2xl border border-[var(--border-color)] bg-slate-500/5 space-y-3">
          <h3 className="text-base font-black text-[var(--text-primary)]">
            Explore All 25+ Audio & Video Converters
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Need to convert between lossless formats like FLAC and WAV, or handle specialized containers like WebM, MKV, or OGG?
          </p>
          <Link
            href="/converters"
            className="inline-flex items-center gap-1.5 text-xs font-black text-blue-500 hover:text-blue-600 hover:underline"
          >
            <span>Visit the Audio Converters Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </div>

      {/* Footer CTA */}
      <footer className="pt-8 border-t border-[var(--border-color)] text-center space-y-4">
        <h3 className="text-lg sm:text-xl font-black text-[var(--text-primary)]">
          Convert your first video file now
        </h3>
        <div>
          <Link
            href="/tools/mp4-to-mp3"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm text-white bg-[var(--iloveaudios-red)] hover:bg-red-700 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>Launch MP4 to MP3 Converter</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </article>
  );
}
