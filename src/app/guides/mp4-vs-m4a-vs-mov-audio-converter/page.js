import React from 'react';
import Link from 'next/link';
import { Disc, ArrowRight, CheckCircle2, ShieldCheck, FileAudio, Video } from 'lucide-react';

export default function FormatComparisonGuidePage() {
  return (
    <article className="site-container py-10 md:py-16 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-[length:var(--text-base)] font-semibold text-[var(--color-text-muted)]">
        <Link href="/" className="min-h-[48px] py-[12px] inline-flex items-center hover:text-[var(--color-brand)] transition-colors">Home</Link>
        <span className="text-[var(--color-text-muted)] font-normal">/</span>
        <span className="text-[var(--color-text-muted)] font-normal">Guides</span>
        <span className="text-[var(--color-text-muted)] font-normal">/</span>
        <span className="text-[var(--color-text)] font-bold">MP4 vs M4A vs MOV</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 text-left">
        <h1 className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)]">
          MP4 vs M4A vs MOV: How to Extract High-Quality MP3 from Any Video or Recording
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-[length:var(--text-base)] text-[var(--color-text-muted)] pt-1">
          <span>By <strong>iLoveAudios Sound Engineering Team</strong></span>
          <span>&bull;</span>
          <span>Updated September 2026</span>
          <span>&bull;</span>
          <span>6 min read</span>
        </div>
      </header>

      {/* Quick Converter Launchpad */}
      <section className="ui-card grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/tools/mp4-to-mp3"
          className="tool-card border-red-500/20 hover:border-red-500/40 text-left space-y-2 group block"
        >
          <div className="text-[length:var(--text-base)] font-bold text-[var(--color-brand)]">Most Common</div>
          <div className="font-bold text-[length:var(--text-h3)] text-[var(--color-text)] group-hover:text-[var(--color-brand)] transition-colors">MP4 to MP3</div>
          <div className="text-[length:var(--text-base)] text-[var(--color-text-muted)]">Webinars &amp; Video Clips</div>
        </Link>

        <Link
          href="/tools/m4a-to-mp3"
          className="tool-card border-cyan-500/20 hover:border-cyan-500/40 text-left space-y-2 group block"
        >
          <div className="text-[length:var(--text-base)] font-bold text-cyan-700">Apple Voice Memos</div>
          <div className="font-bold text-[length:var(--text-h3)] text-[var(--color-text)] group-hover:text-cyan-700 transition-colors">M4A to MP3</div>
          <div className="text-[length:var(--text-base)] text-[var(--color-text-muted)]">iPhone Voice Notes</div>
        </Link>

        <Link
          href="/tools/mov-to-mp3"
          className="tool-card border-purple-500/20 hover:border-purple-500/40 text-left space-y-2 group block"
        >
          <div className="text-[length:var(--text-base)] font-bold text-purple-700">iPhone 4K Video</div>
          <div className="font-bold text-[length:var(--text-h3)] text-[var(--color-text)] group-hover:text-purple-700 transition-colors">MOV to MP3</div>
          <div className="text-[length:var(--text-base)] text-[var(--color-text-muted)]">QuickTime Camera Roll</div>
        </Link>
      </section>

      {/* Main Guide Body */}
      <div className="space-y-10 text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] border-t border-[var(--color-border)] pt-8">
        
        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Understanding Container Formats vs Audio Streams
          </h2>
          <p className="prose-measure">
            When dealing with video recordings, files like <strong>.mp4</strong> and <strong>.mov</strong> are not sound files—they are <em>multimedia container boxes</em> that hold synchronized video frames (encoded in H.264 or HEVC) alongside compressed audio tracks (usually AAC or PCM).
          </p>
          <p className="prose-measure">
            Because video frames consume 85% to 95% of the total file size, a 5-minute iPhone concert video can easily weigh 400MB. Converting that recording to an MP3 strips away the video entirely, reducing the file to an ultra-portable 8MB audio track without sacrificing audio clarity.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="space-y-4">
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Side-by-Side Format Comparison
          </h2>
          <div className="table-scroll rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
            <table className="w-full text-left border-collapse text-[length:var(--text-base)]">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
                  <th className="p-4 sm:p-5 font-bold text-[var(--color-text)]">Format</th>
                  <th className="p-4 sm:p-5 font-bold text-[var(--color-text)]">Type</th>
                  <th className="p-4 sm:p-5 font-bold text-[var(--color-text)]">Default Audio Codec</th>
                  <th className="p-4 sm:p-5 font-bold text-[var(--color-text)]">Primary Problem</th>
                  <th className="p-4 sm:p-5 font-bold text-[var(--color-text)]">Recommended Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-muted)]">
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[var(--color-text)]">MP4</td>
                  <td className="p-4 sm:p-5">Video Container</td>
                  <td className="p-4 sm:p-5">AAC / MP3</td>
                  <td className="p-4 sm:p-5 text-amber-700">Huge file size, requires screen on</td>
                  <td className="p-4 sm:p-5"><Link href="/tools/mp4-to-mp3" className="inline-flex items-center min-h-[48px] py-[12px] text-blue-700 font-bold hover:underline">Convert to MP3</Link></td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[var(--color-text)]">MOV</td>
                  <td className="p-4 sm:p-5">Apple Video</td>
                  <td className="p-4 sm:p-5">Linear PCM / AAC</td>
                  <td className="p-4 sm:p-5 text-amber-700">Incompatible with Windows Media / Android</td>
                  <td className="p-4 sm:p-5"><Link href="/tools/mov-to-mp3" className="inline-flex items-center min-h-[48px] py-[12px] text-blue-700 font-bold hover:underline">Convert to MP3</Link></td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[var(--color-text)]">M4A</td>
                  <td className="p-4 sm:p-5">Apple Audio Only</td>
                  <td className="p-4 sm:p-5">AAC</td>
                  <td className="p-4 sm:p-5 text-amber-700">Fails on car stereos and PowerPoint</td>
                  <td className="p-4 sm:p-5"><Link href="/tools/m4a-to-mp3" className="inline-flex items-center min-h-[48px] py-[12px] text-blue-700 font-bold hover:underline">Convert to MP3</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Bitrates Section */}
        <section className="space-y-4">
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Which Bitrate Should You Choose (128k vs 192k vs 320kbps)?
          </h2>
          <p className="prose-measure">
            When converting video to audio on iLoveAudios, you can select custom output bitrates:
          </p>
          <ul className="space-y-3 list-disc list-inside bg-[var(--color-surface)] p-6 sm:p-8 rounded-2xl border border-[var(--color-border)] prose-measure">
            <li><strong className="text-[var(--color-text)]">128kbps:</strong> Ideal for spoken voice notes, lecture recordings, and audiobooks. Creates the smallest file size.</li>
            <li><strong className="text-[var(--color-text)]">192kbps (Standard):</strong> The best balance of quality and file size for general music and podcasts.</li>
            <li><strong className="text-[var(--color-text)]">320kbps (Studio):</strong> Maximum acoustic fidelity. Recommended for live concert soundtracks, DJ mixes, and music production archives.</li>
          </ul>
        </section>

        {/* Cross-Link to Format Hub */}
        <section className="ui-card space-y-4">
          <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
            Explore All 25+ Audio &amp; Video Converters
          </h3>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure">
            Need to convert between lossless formats like FLAC and WAV, or handle specialized containers like WebM, MKV, or OGG?
          </p>
          <Link
            href="/converters"
            className="min-h-[48px] py-[12px] inline-flex items-center gap-2 text-[length:var(--text-base)] font-bold text-blue-700 hover:underline"
          >
            <span>Visit the Audio Converters Directory</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </div>

      {/* Footer CTA */}
      <footer className="pt-8 border-t border-[var(--color-border)] text-left space-y-4">
        <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
          Convert your first video file now
        </h3>
        <div>
          <Link
            href="/tools/mp4-to-mp3"
            className="ui-control w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl font-bold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] shadow-sm transition-colors cursor-pointer"
          >
            <span>Launch MP4 to MP3 Converter</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </footer>
    </article>
  );
}
