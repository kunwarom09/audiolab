'use client';

import React from 'react';
import SongFinderEngine from '@/components/SongFinderEngine';
import FaqSection from '@/components/FaqSection';
import Link from 'next/link';
import { 
  FileAudio, 
  ArrowRight, 
  Sliders, 
  Sparkles, 
  ShieldCheck, 
  Mic, 
  Clock, 
  Layers, 
  CheckCircle2,
  Video
} from 'lucide-react';

const AUDIO_FINDER_FAQS = [
  {
    question: 'How do I identify a song from an audio file on my phone or computer?',
    answer: 'Drag and drop or browse to select your audio file (MP3, WAV, M4A, FLAC, OGG, OPUS). Choose whether to analyze the entire track or a specific 15-second snippet where the melody is loudest. Click Identify Song to uncover the track title, artist, synchronized lyrics, and download the full MP3.'
  },
  {
    question: 'Can I identify an iPhone Voice Memo or WhatsApp voice note?',
    answer: 'Yes! Apple Voice Memos are saved in .m4a format and WhatsApp voice notes use .opus. Both formats are natively supported by iLoveAudios. Simply export or share the audio file from your messaging app to your device files and upload it to our tool.'
  },
  {
    question: 'What happens if the intro of the audio file is silence or speech?',
    answer: 'Our tool includes a smart timestamp segmenting feature. Toggle "Specify 15s Timestamp", drag the timeline slider to the exact second where the music begins or dialogue ends, and analyze that specific segment for maximum recognition accuracy.'
  },
  {
    question: 'Is there any file size limit for audio uploads?',
    answer: 'You can upload audio files up to 100MB per file. This accommodates even large uncompressed 24-bit studio WAV tracks and multi-hour podcast recordings.'
  },
  {
    question: 'Is my audio file kept private and secure?',
    answer: 'Absolutely. Your uploaded audio tracks are processed in isolated, encrypted temporary containers and permanently removed from our storage shortly after acoustic matching is complete.'
  }
];

export default function IdentifySongFromAudioPage() {
  return (
    <SongFinderEngine
      title="Identify Song from Audio"
      subtitle="Upload any MP3, WAV, M4A, FLAC, or voice note to recognize song titles, album details, lyrics, and download MP3s."
      initialTab="upload"
    >
      {/* 1. Educational Intro (400+ words total page copy) */}
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md space-y-4 text-center sm:text-left shadow-xs">
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          Welcome to the <strong>iLoveAudios Identify Song from Audio</strong> tool. If you have an unnamed MP3 track on your computer, a captured snippet from an iPhone Voice Memo, a recorded podcast intro, or a WhatsApp voice note containing a song you love, our system lets you <strong>identify song from audio file</strong> uploads directly in your browser.
        </p>
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          Unlike ordinary sound-tagging tools that depend on ambient microphone listening, our <strong>ai song finder from audio</strong> analyzes discrete digital PCM waveforms. This delivers bit-accurate acoustic fingerprinting without microphone distortion, ambient room echo, or speaker coloration.
        </p>
      </div>

      {/* 2. Step-by-Step Instructions */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="text-center sm:text-left space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500">
            Precision Audio Matching
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How to Identify a Song from an Audio File in 3 Steps
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            Pinpoint any song from local audio recordings with our simple 3-step workflow:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-panel rounded-2xl p-6 space-y-3 border-emerald-500/20 bg-emerald-500/5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm">
              1
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Upload Your Audio File
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Drag and drop any audio format—including MP3, lossless WAV, M4A, FLAC, OGG, OPUS, or AAC files up to 100MB.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-blue-500/20 bg-blue-500/5">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-black text-sm">
              2
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Select Timestamp (Optional)
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              If someone is speaking during the first few seconds of your recording, use our interactive timestamp selector to target a clean 15-second musical segment.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-purple-500/20 bg-purple-500/5">
            <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center font-black text-sm">
              3
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Get Artist, Lyrics & MP3
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Our acoustic recognition engine cross-checks the song constellation against 50M+ tracks and instantly displays full track information and MP3 download.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Supported Formats & Codecs Guide */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-500 block">
            Audio Format Compatibility
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Supported Audio Formats & Use Cases
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            Our engine decodes and normalizes nearly every audio container format in circulation today:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel rounded-2xl p-4 space-y-2">
            <div className="text-emerald-500 font-bold text-xs flex items-center gap-1.5">
              <FileAudio className="w-4 h-4" />
              <span>MP3 & AAC</span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Universal lossy audio from downloads, ringtones, and music libraries. Identifiable even at compressed 64kbps bitrates.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-4 space-y-2">
            <div className="text-blue-500 font-bold text-xs flex items-center gap-1.5">
              <FileAudio className="w-4 h-4" />
              <span>Apple M4A / Voice Memos</span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Recordings made on iPhone Voice Memos or Apple Watch. Upload directly from iCloud Drive or the iOS Files app.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-4 space-y-2">
            <div className="text-purple-500 font-bold text-xs flex items-center gap-1.5">
              <FileAudio className="w-4 h-4" />
              <span>Lossless WAV & FLAC</span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Uncompressed studio recordings, stems, and archival audio with full dynamic frequency preservation up to 24-bit 96kHz.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-4 space-y-2">
            <div className="text-amber-500 font-bold text-xs flex items-center gap-1.5">
              <FileAudio className="w-4 h-4" />
              <span>OGG & OPUS (WhatsApp)</span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Voice notes forwarded from WhatsApp, Telegram, or Discord. Decoded directly without third-party converters.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Overcoming Difficult Audio Scenarios */}
      <section className="max-w-4xl mx-auto space-y-4 pt-6 border-t border-[var(--border-color)]">
        <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
          How to Recognize Songs with Background Talking or Speech
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          <p>
            When audio is recorded at parties, weddings, radio broadcasts, or podcasts, human talking often overlaps with the musical score. Speech frequencies fluctuate between 300Hz and 3,000Hz, whereas musical chords, basslines, and synth melodies follow rigid harmonic progressions.
          </p>
          <p>
            Our acoustic landmark filtering algorithms isolate harmonic anchors that stay constant beneath vocal conversation. If speech is too overpowering during the beginning of your track, simply use our timestamp scrubber to test another 15-second window where the musical instrumentation is cleaner.
          </p>
        </div>
      </section>

      {/* 5. Cross-Tool Recommendations */}
      <section className="max-w-4xl mx-auto p-6 rounded-2xl border border-[var(--border-color)] bg-gradient-to-r from-blue-500/5 to-purple-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm sm:text-base font-black text-[var(--text-primary)]">
            Need to convert video files or edit your music?
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Explore our format converters and online audio trimming utilities.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/tools/song-extractor"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)] transition-all shadow-xs"
          >
            Main Song Finder
          </Link>
          <Link
            href="/song-finder-from-video"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)] transition-all shadow-xs"
          >
            Song Finder from Video
          </Link>
          <Link
            href="/mp3-converter"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)] transition-all shadow-xs"
          >
            MP3 Converter Hub
          </Link>
          <Link
            href="/tools/audio-cutter"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)] transition-all shadow-xs"
          >
            Audio Cutter
          </Link>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section id="faqs" className="max-w-4xl mx-auto pt-6 border-t border-[var(--border-color)]">
        <FaqSection faqs={AUDIO_FINDER_FAQS} />
      </section>
    </SongFinderEngine>
  );
}
