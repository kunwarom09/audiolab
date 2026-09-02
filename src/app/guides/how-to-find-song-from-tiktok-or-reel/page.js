import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Music, CheckCircle2, AlertCircle, Share2, HelpCircle } from 'lucide-react';

export default function TikTokReelSongGuidePage() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-12 animate-in fade-in duration-300">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs font-semibold text-[var(--text-secondary)]">
        <Link href="/" className="hover:text-[var(--iloveaudios-red)] transition-colors">Home</Link>
        <span className="text-[var(--text-muted)] font-normal">/</span>
        <span className="text-[var(--text-muted)] font-normal">Guides</span>
        <span className="text-[var(--text-muted)] font-normal">/</span>
        <span className="text-[var(--text-primary)] font-bold truncate">Find Songs in TikTok & Reels</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20 text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Social Media Audio Guide</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
          How to Find Any Song in a TikTok or Instagram Reel (Even &quot;Original Sound&quot;)
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-secondary)] pt-1">
          <span>By <strong>iLoveAudios Sound Engineering Team</strong></span>
          <span>&bull;</span>
          <span>Updated September 2026</span>
          <span>&bull;</span>
          <span>5 min read</span>
        </div>
      </header>

      {/* Quick Interactive CTA Card */}
      <section className="p-6 rounded-3xl border border-pink-500/20 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-blue-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm sm:text-base font-black text-[var(--text-primary)]">
            Already have a Reel or TikTok link ready?
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Paste it into our free recognition engine to identify the artist and download the song in seconds.
          </p>
        </div>
        <Link
          href="/tools/song-extractor"
          className="px-6 py-3 rounded-2xl font-black text-xs sm:text-sm text-white bg-[var(--iloveaudios-red)] hover:bg-red-700 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Identify Song Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Main Guide Body */}
      <div className="space-y-8 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)] pt-8">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            The &quot;Original Sound&quot; Dilemma on Social Media
          </h2>
          <p>
            You are scrolling through Instagram Reels, TikTok, or YouTube Shorts, and you hear an incredible beat or melody. You tap the sound icon at the bottom of the screen, hoping to find the artist name—only to see:
          </p>
          <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] font-mono text-xs text-amber-500">
            &quot;Original Sound - user_9482910&quot; or &quot;Original Audio - Contains music from... [empty]&quot;
          </div>
          <p>
            Why does this happen? When content creators edit videos using external editing apps like CapCut, InShot, or Premiere Pro, they frequently export the audio mixed together with the video file. When uploaded to TikTok or Instagram, the social platform cannot automatically tag the track and labels it as user-generated &quot;Original Audio&quot;.
          </p>
        </section>

        {/* Section 2: Method 1 */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            Method 1: Fast AI Recognition by Video Link (Recommended)
          </h2>
          <p>
            The easiest and most reliable method is using an online recognition tool like the{' '}
            <Link href="/tools/song-extractor" className="text-blue-500 font-bold hover:underline">
              iLoveAudios AI Song Finder
            </Link>. Unlike mobile apps like Shazam that require playing audio out loud through a second phone speaker, iLoveAudios takes the direct video URL:
          </p>

          <ol className="space-y-3 list-decimal list-inside bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-color)]">
            <li>
              <strong className="text-[var(--text-primary)]">Copy the Link:</strong> Open the Reel or TikTok, tap the <em>Share</em> icon, and tap <em>Copy Link</em>.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Paste into Song Finder:</strong> Go to the{' '}
              <Link href="/tools/song-extractor" className="text-blue-500 font-bold hover:underline">
                iLoveAudios Song Finder
              </Link>{' '}
              and paste the URL into the search bar.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Get Title, Artist & Lyrics:</strong> Click <em>Find Song</em>. Our cloud engine isolates the audio, generates an acoustic constellation map, and returns the verified track title, album artwork, synchronized lyrics, and full MP3 download link in under 5 seconds.
            </li>
          </ol>
        </section>

        {/* Section 3: How it cuts through speech */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            How Acoustic Fingerprinting Works Over Background Speech
          </h2>
          <p>
            Many users wonder: <em>&quot;Can an AI identify the song if someone is talking over the video?&quot;</em>
          </p>
          <p>
            Yes! Our engine applies Fast Fourier Transforms (FFT) to convert audio into an acoustic spectrogram. Human voice frequencies typically cluster in the mid-range (300Hz to 3kHz) with fluctuating pitch contours, while musical beats, basslines, and synth melodies maintain strict harmonic intervals and time-frequency peaks.
          </p>
          <p>
            By isolating these persistent acoustic landmarks, the engine identifies the underlying track even when voiceovers, ambient street noise, or laughing sounds are present.
          </p>
        </section>

        {/* Section 4: What if the video is private? */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            Method 2: What to Do If the Account or Video Is Private
          </h2>
          <p>
            Direct URL link recognition requires the video to be publicly visible on Instagram or TikTok. If the reel was sent via direct message from a private account, you can still find the song easily:
          </p>
          <ul className="space-y-2 list-disc list-inside bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-color)]">
            <li>Screen record 5 to 10 seconds of the video on your iPhone or Android phone.</li>
            <li>Open the <Link href="/tools/song-extractor" className="text-blue-500 font-bold hover:underline">iLoveAudios Song Finder</Link> and switch to the <strong>Upload File</strong> tab.</li>
            <li>Upload your screen-recorded video (MP4 or MOV).</li>
            <li>Our tool scans the file directly without needing social media access.</li>
          </ul>
        </section>

        {/* Section 5: Converter cross-link */}
        <section className="space-y-3 pt-4 border-t border-[var(--border-color)]">
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            Want to Extract the Background Audio as an MP3?
          </h2>
          <p>
            If you just want to save the background music from a video file on your phone or computer, you can also use our free{' '}
            <Link href="/tools/mp4-to-mp3" className="text-blue-500 font-bold hover:underline">
              MP4 to MP3 Converter
            </Link>{' '}
            or{' '}
            <Link href="/tools/mov-to-mp3" className="text-blue-500 font-bold hover:underline">
              MOV to MP3 Converter
            </Link>. Explore our complete directory of audio tools on the{' '}
            <Link href="/converters" className="text-blue-500 font-bold hover:underline">
              Audio Converters Hub
            </Link>.
          </p>
        </section>
      </div>

      {/* Footer CTA */}
      <footer className="pt-8 border-t border-[var(--border-color)] text-center space-y-4">
        <h3 className="text-lg sm:text-xl font-black text-[var(--text-primary)]">
          Ready to discover your next favorite song?
        </h3>
        <div>
          <Link
            href="/tools/song-extractor"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm text-white bg-[var(--iloveaudios-red)] hover:bg-red-700 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>Try AI Song Finder (100% Free)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </article>
  );
}
