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
      <div className="ui-card shadow-xs space-y-4 text-left">
        <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
          Welcome to the <strong>iLoveAudios Identify Song from Audio</strong> tool. If you have an unnamed MP3 track on your computer, a captured snippet from an iPhone Voice Memo, a recorded podcast intro, or a WhatsApp voice note containing a song you love, our system lets you <strong>identify song from audio file</strong> uploads directly in your browser.
        </p>
        <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
          Unlike ordinary sound-tagging tools that depend on ambient microphone listening, our <strong>ai song finder from audio</strong> analyzes discrete digital PCM waveforms. This delivers bit-accurate acoustic fingerprinting without microphone distortion, ambient room echo, or speaker coloration.
        </p>
      </div>

      {/* 2. Step-by-Step Instructions */}
      <section className="w-full space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="text-left space-y-3">
          <span className="text-[length:var(--text-base)] font-bold text-emerald-700 block">
            Precision Audio Matching
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            How to Identify a Song from an Audio File in 3 Steps
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            Pinpoint any song from local audio recordings with our simple 3-step workflow:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ui-card space-y-3 border-emerald-500/20">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              1
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Upload Your Audio File
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Drag and drop any audio format—including MP3, lossless WAV, M4A, FLAC, OGG, OPUS, or AAC files up to 100MB.
            </p>
          </div>

          <div className="ui-card space-y-3 border-blue-500/20">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              2
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Select Timestamp (Optional)
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              If someone is speaking during the first few seconds of your recording, use our interactive timestamp selector to target a clean 15-second musical segment.
            </p>
          </div>

          <div className="ui-card space-y-3 border-purple-500/20">
            <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-[length:var(--text-base)]">
              3
            </div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Get Artist, Lyrics &amp; MP3
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Our acoustic recognition engine cross-checks the song constellation against 50M+ tracks and instantly displays full track information and MP3 download.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Supported Formats & Codecs Guide */}
      <section className="w-full space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="space-y-3 text-left">
          <span className="text-[length:var(--text-base)] font-bold text-blue-700 block">
            Audio Format Compatibility
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Supported Audio Formats &amp; Use Cases
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure leading-[var(--leading-body)]">
            Our engine decodes and normalizes nearly every audio container format in circulation today:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="ui-card space-y-3">
            <div className="text-emerald-700 font-bold text-[length:var(--text-lead)] flex items-center gap-2">
              <FileAudio className="w-5 h-5 shrink-0" />
              <span>MP3 &amp; AAC</span>
            </div>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
              Universal lossy audio from downloads, ringtones, and music libraries. Identifiable even at compressed 64kbps bitrates.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <div className="text-blue-700 font-bold text-[length:var(--text-lead)] flex items-center gap-2">
              <FileAudio className="w-5 h-5 shrink-0" />
              <span>Apple M4A / Voice Memos</span>
            </div>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
              Recordings made on iPhone Voice Memos or Apple Watch. Upload directly from iCloud Drive or the iOS Files app.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <div className="text-purple-700 font-bold text-[length:var(--text-lead)] flex items-center gap-2">
              <FileAudio className="w-5 h-5 shrink-0" />
              <span>Lossless WAV &amp; FLAC</span>
            </div>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
              Uncompressed studio recordings, stems, and archival audio with full dynamic frequency preservation up to 24-bit 96kHz.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <div className="text-amber-700 font-bold text-[length:var(--text-lead)] flex items-center gap-2">
              <FileAudio className="w-5 h-5 shrink-0" />
              <span>OGG &amp; OPUS (WhatsApp)</span>
            </div>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
              Voice notes forwarded from WhatsApp, Telegram, or Discord. Decoded directly without third-party converters.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Overcoming Difficult Audio Scenarios */}
      <section className="w-full space-y-4 pt-8 border-t border-[var(--color-border)] text-left">
        <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
          How to Recognize Songs with Background Talking or Speech
        </h2>
        <div className="space-y-4 text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
          <p>
            When audio is recorded at parties, weddings, radio broadcasts, or podcasts, human talking often overlaps with the musical score. Speech frequencies fluctuate between 300Hz and 3,000Hz, whereas musical chords, basslines, and synth melodies follow rigid harmonic progressions.
          </p>
          <p>
            Our acoustic landmark filtering algorithms isolate harmonic anchors that stay constant beneath vocal conversation. If speech is too overpowering during the beginning of your track, simply use our timestamp scrubber to test another 15-second window where the musical instrumentation is cleaner.
          </p>
        </div>
      </section>

      {/* 5. Cross-Tool Recommendations */}
      <section className="ui-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2 text-left">
          <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
            Need to convert video files or edit your music?
          </h3>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] prose-measure">
            Explore our format converters and online audio trimming utilities.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <Link
            href="/tools/song-extractor"
            className="ui-control flex items-center justify-center rounded-xl font-bold bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-colors"
          >
            Main Song Finder
          </Link>
          <Link
            href="/song-finder-from-video"
            className="ui-control flex items-center justify-center rounded-xl font-bold bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-colors"
          >
            Song Finder from Video
          </Link>
          <Link
            href="/mp3-converter"
            className="ui-control flex items-center justify-center rounded-xl font-bold bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-colors"
          >
            MP3 Converter Hub
          </Link>
          <Link
            href="/tools/audio-cutter"
            className="ui-control flex items-center justify-center rounded-xl font-bold bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-colors"
          >
            Audio Cutter
          </Link>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section id="faqs" className="w-full pt-8 border-t border-[var(--color-border)]">
        <FaqSection faqs={AUDIO_FINDER_FAQS} />
      </section>
    </SongFinderEngine>
  );
}
