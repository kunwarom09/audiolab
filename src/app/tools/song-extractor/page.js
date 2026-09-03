'use client';

import React, { useState, useEffect } from 'react';
import HeroCard from '@/components/HeroCard';
import ProgressTracker from '@/components/ProgressTracker';
import SongResultCard from '@/components/SongResultCard';
import FailedRecognitionCard from '@/components/FailedRecognitionCard';
import FaqSection from '@/components/FaqSection';
import { useApp } from '@/components/AppClientWrapper';
import Link from 'next/link';
import { 
  AlertTriangle, 
  Music2, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Globe, 
  Film, 
  Volume2, 
  Download, 
  Layers,
  ArrowRight,
  UploadCloud,
  Mic,
  Sliders,
  CheckCircle2,
  HelpCircle,
  Radio,
  FileAudio,
  Share2
} from 'lucide-react';

const SONG_FINDER_FAQS = [
  {
    question: 'How do I find a song from an Instagram Reel or TikTok video?',
    answer: 'Open the Reel or TikTok video, tap the Share button, select "Copy Link", and paste it into iLoveAudios AI Song Finder. Our recognition engine demuxes the background audio stream and matches the acoustic fingerprint to reveal the song title and artist in seconds.'
  },
  {
    question: 'How does this TikTok song finder identify music labeled "Original Sound"?',
    answer: 'When creators edit music in third-party apps like CapCut, TikTok automatically labels the audio track as "Original Sound". Our AI song finder bypasses this label: we extract the raw background audio waveform and match its acoustic frequency constellation against 50M+ tracks to identify the genuine commercial song title and artist.'
  },
  {
    question: 'Can I find songs from private Instagram or TikTok accounts?',
    answer: 'No. The video must be hosted on a public profile so our cloud recognizer can download and demux the audio track. If a video is from a private account, you can screen-record the clip, switch to our "Upload File" tab, and identify it directly from your recorded video file.'
  },
  {
    question: 'How do I identify music when someone is talking over the song in a Reel?',
    answer: 'Our AI recognition engine utilizes acoustic landmark filtering to detect consistent musical rhythms and harmonic peaks beneath vocal speech. If dialogue is overpowering the first few seconds, use our "Try Another Section" feature or upload the video clip and specify a timestamp with less speech.'
  },
  {
    question: 'Can I identify a song by uploading a video or audio file?',
    answer: 'Yes! Switch to the "Upload File" tab and upload any MP4, MOV, WebM, MP3, WAV, M4A, FLAC, or OGG file up to 100MB. You can analyze the full clip or select a specific 15-second timestamp.'
  },
  {
    question: 'Can I record a song playing around me in the browser?',
    answer: 'Yes! Tap the "Record Audio" tab and record 5 to 15 seconds of the song with your device microphone. iLoveAudios captures the acoustic frequencies and identifies the track immediately.'
  },
  {
    question: 'Can I identify sped up, slowed, or nightcore remix songs?',
    answer: 'Yes! If the acoustic fingerprint is pitched or tempo-shifted, our engine attempts pitch-normalized harmonic matching. If acoustic matching does not find a match, our smart fallback analyzes video captions and lyrics databases to identify the original track.'
  },
  {
    question: 'Can I download the identified song as an MP3 file?',
    answer: 'Yes! Once your song is identified, click "Download Full Song (MP3)" to save a clean, high-quality 192kbps audio file directly to your device with full synchronized lyrics included.'
  },
  {
    question: 'Is this AI Song Identifier completely free to use?',
    answer: 'Yes, 100% free with unlimited song lookups, synchronized lyrics viewing, YouTube video playback, and MP3 downloads without any account registration or subscription.'
  },
  {
    question: 'Can I search by typing partial lyrics if I don\'t have a video link?',
    answer: 'If acoustic recognition cannot find a match due to loud dialogue or distortion, our engine automatically searches video captions and lyrics databases for matching titles and lyrics.'
  }
];

export default function SongExtractorPage() {
  const {
    history,
    setHistory,
  } = useApp();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [inputTab, setInputTab] = useState('link'); // 'link' | 'upload' | 'record'
  const [lastFileId, setLastFileId] = useState(null);
  const [lastStartTime, setLastStartTime] = useState(0);

  const pollJobStatus = async (jobId) => {
    const maxPolls = 60; // 60 * 2s = 120s max
    for (let i = 0; i < maxPolls; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await fetch(`/api/jobs/${jobId}`);
      if (!res.ok) continue;
      const jobData = await res.json();

      if (jobData.status === 'completed' && jobData.result) {
        return jobData.result;
      } else if (jobData.status === 'failed') {
        throw new Error(jobData.error || 'Background processing task failed.');
      }
    }
    throw new Error('Task timed out. Please try again.');
  };

  const handleExtractLink = async (reelUrl) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    // Smooth scroll to progress area
    setTimeout(() => {
      document.getElementById('extraction-process')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: reelUrl, async_mode: true }),
      });

      const data = await response.json();

      if (!response.ok && !data.message) {
        throw new Error(data.error || data.message || 'Could not process provided link.');
      }

      let finalResult = data;
      if (data.job_id && (data.status === 'queued' || data.status === 'processing')) {
        finalResult = await pollJobStatus(data.job_id);
      }

      setResult(finalResult);

      if (finalResult.success && finalResult.song) {
        const newHistoryItem = {
          ...finalResult,
          timestamp: Date.now()
        };
        const updatedHistory = [newHistoryItem, ...history.filter(h => h.song?.title !== finalResult.song?.title)].slice(0, 20);
        setHistory(updatedHistory);
        localStorage.setItem('extractor_history', JSON.stringify(updatedHistory));
      }

      setTimeout(() => {
        document.getElementById('extraction-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);

    } catch (err) {
      console.error('Link extraction error:', err);
      setError(err.message || 'An unexpected error occurred during extraction.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdentifyFile = async (fileId, startTime, duration = 15) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setLastFileId(fileId);
    setLastStartTime(startTime || 0);

    setTimeout(() => {
      document.getElementById('extraction-process')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    try {
      const response = await fetch('/api/identify-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_id: fileId,
          start_time: typeof startTime === 'number' ? startTime : undefined,
          duration,
          async_mode: true
        }),
      });

      const data = await response.json();

      if (!response.ok && !data.message) {
        throw new Error(data.error || data.message || 'Could not identify song from uploaded file.');
      }

      let finalResult = data;
      if (data.job_id && (data.status === 'queued' || data.status === 'processing')) {
        finalResult = await pollJobStatus(data.job_id);
      }

      setResult(finalResult);

      if (finalResult.success && finalResult.song) {
        const newHistoryItem = {
          ...finalResult,
          timestamp: Date.now()
        };
        const updatedHistory = [newHistoryItem, ...history.filter(h => h.song?.title !== finalResult.song?.title)].slice(0, 20);
        setHistory(updatedHistory);
        localStorage.setItem('extractor_history', JSON.stringify(updatedHistory));
      }

      setTimeout(() => {
        document.getElementById('extraction-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);

    } catch (err) {
      console.error('File identification error:', err);
      setError(err.message || 'An unexpected error occurred identifying the audio file.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetryAnotherSection = () => {
    if (lastFileId) {
      const nextStartTime = (lastStartTime || 0) + 15;
      handleIdentifyFile(lastFileId, nextStartTime, 15);
    } else {
      setInputTab('upload');
      setResult(null);
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12 animate-in fade-in duration-300">
      {/* 1. Hero Card (Unified Multi-Input: Link, Upload, Record) */}
      <div id="hero">
        <HeroCard 
          onExtractLink={handleExtractLink} 
          onIdentifyFile={handleIdentifyFile} 
          isLoading={isLoading} 
          initialTab={inputTab}
        />
      </div>

      {/* Natural Context Introduction Box */}
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md space-y-3 text-center sm:text-left shadow-xs">
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          Find the song behind any Instagram Reel, TikTok video, YouTube Short, or audio file in seconds with <strong>iLoveAudios Free AI Song Finder</strong>. Simply paste a social video link, upload a video/audio clip, or record live music playing nearby through your browser microphone. Our acoustic AI recognition engine isolates the sound frequencies and instantly uncovers the exact track title, artist name, verified album art, synchronized lyrics, and full MP3 download.
        </p>
      </div>

      {/* Error Alert Box */}
      {error && (
        <div className="max-w-2xl mx-auto rounded-2xl p-4.5 border border-red-800/80 bg-red-950/90 text-red-100 shadow-2xl shadow-red-950/50 backdrop-blur-md flex items-start gap-3.5 animate-in fade-in">
          <div className="p-2 rounded-xl bg-red-900/60 border border-red-700/50 shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-300" />
          </div>
          <div className="flex-1 pt-0.5">
            <h4 className="text-sm font-bold text-red-100 tracking-wide">Processing Error</h4>
            <p className="text-xs text-red-200/90 leading-relaxed mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Loading Progress State */}
      {isLoading && (
        <div id="extraction-process" className="scroll-mt-24">
          <ProgressTracker />
        </div>
      )}

      {/* Extraction Result or Recovery Card */}
      {result && !isLoading && (
        <div id="extraction-result" className="scroll-mt-24">
          {result.success && result.song ? (
            <SongResultCard data={result} onReset={handleReset} />
          ) : (
            <FailedRecognitionCard 
              message={result.message}
              mediaInfo={result.media_info}
              errorType={result.error_type}
              onRetrySection={handleRetryAnotherSection}
              onSwitchToUpload={() => {
                setInputTab('upload');
                setResult(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSwitchToRecord={() => {
                setInputTab('record');
                setResult(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onReset={handleReset}
            />
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* RICH CONTENT SECTIONS FOR TOPICAL AUTHORITY & INTENT MATCHING             */}
      {/* ========================================================================= */}

      {/* 2. 3 Input Methods: How to Use the Song Finder */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="text-center sm:text-left space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-500">
            Universal Audio Discovery
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How to Find Any Song Online in 3 Simple Ways
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            Whether you are browsing social media on your phone, editing a video file on your computer, or listening to music in a café, iLoveAudios provides three versatile methods to identify songs instantly:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3 flex flex-col justify-between border-pink-500/20 bg-pink-500/5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center font-black text-sm shadow-xs">
                1
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)] flex items-center gap-1.5">
                <span>By Social Video Link</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Copy any public video link from <strong>Instagram Reels, TikTok, YouTube Shorts, Facebook Reels, Snapchat, or X (Twitter)</strong> and paste it into the search box.
              </p>
            </div>
            <div className="pt-2 text-[10px] font-bold text-pink-600 dark:text-pink-400">
              ⚡ No app install required
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3 flex flex-col justify-between border-blue-500/20 bg-blue-500/5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-black text-sm shadow-xs">
                2
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)] flex items-center gap-1.5">
                <span>By File Upload (Video & Audio)</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Upload <strong>MP4, MOV, WebM, MKV, MP3, WAV, M4A, FLAC, or OGG</strong> files up to 100MB. You can scan the full clip or specify a 15-second timestamp with clean audio.
              </p>
            </div>
            <div className="pt-2 text-[10px] font-bold text-blue-600 dark:text-blue-400">
              📁 Screen recordings & voice memos
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3 flex flex-col justify-between border-emerald-500/20 bg-emerald-500/5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow-xs">
                3
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)] flex items-center gap-1.5">
                <span>By Live Microphone / Humming</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Tap <em>Record Audio</em> and allow your browser microphone to capture 5 to 15 seconds of live music playing nearby or hum along to identify the song in real time.
              </p>
            </div>
            <div className="pt-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              🎙️ Works on iPhone, Android & PC
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dedicated Social Media Deep-Dive (Instagram, TikTok "Original Sound", Shorts) */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-pink-500 block">
            Social Media Music Identification
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Find Songs in Reels & TikTok Labeled &quot;Original Sound&quot;
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            Over 60% of viral videos on TikTok and Instagram Reels use popular songs that are masked under generic titles like <em>&quot;Original Sound - user_83921&quot;</em> or <em>&quot;Audio by Creator&quot;</em>. Here is why it happens and how our AI recovers the real song:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="glass-panel rounded-2xl p-6 space-y-3 border-pink-500/20 bg-pink-500/5">
            <h3 className="text-sm font-black text-[var(--text-primary)] flex items-center gap-2">
              <span className="text-pink-500 font-black">🎵</span>
              <span>Why Social Media Hides the Song Title</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              When video editors combine background music inside third-party apps like CapCut, InShot, VN Editor, or Premiere Pro, the export combines audio and video into a single file. Upon upload, social media platforms do not run a license lookup and automatically tag the track as user-generated &quot;Original Audio&quot;.
            </p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-semibold text-[var(--text-primary)]">
              <strong>How iLoveAudios Solves This:</strong> Our engine bypasses video metadata tags completely. We demux the raw audio waveform directly from the link and compare acoustic frequency constellations against a global database of 50M+ licensed tracks to identify the official artist and title.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-blue-500/20 bg-blue-500/5">
            <h3 className="text-sm font-black text-[var(--text-primary)] flex items-center gap-2">
              <span className="text-blue-500 font-black">⚡</span>
              <span>How to Copy Share Links for Recognition</span>
            </h3>
            <ul className="text-xs text-[var(--text-secondary)] space-y-2 leading-relaxed">
              <li><strong className="text-[var(--text-primary)]">Instagram Reels & Stories:</strong> Tap the <em>Share (Paper Plane)</em> icon at bottom-right &rarr; Select <em>Copy Link</em>.</li>
              <li><strong className="text-[var(--text-primary)]">TikTok Videos:</strong> Tap the <em>Share (Arrow)</em> button &rarr; Tap <em>Copy Link</em>.</li>
              <li><strong className="text-[var(--text-primary)]">YouTube Shorts:</strong> Tap <em>Share</em> beneath the video &rarr; Click <em>Copy Link</em>.</li>
              <li><strong className="text-[var(--text-primary)]">Facebook Reels & Snapchat:</strong> Tap the three dots or Share arrow &rarr; Choose <em>Copy Link</em>.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Troubleshooting & Difficult Audio Scenarios */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 block">
            Audio Troubleshooting Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How to Identify Songs with Speech, Noise, or Sped-Up Remixes
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            Encountering difficult audio? Our engine includes specialized filters to handle challenging social media clips:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="glass-panel rounded-2xl p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-xs">
              <Volume2 className="w-4 h-4" />
              <span>Voiceover / Talking Over Beat</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Human voice frequencies range between 300Hz and 3kHz with irregular contours, while musical chords and basslines maintain rigid mathematical harmonics. If the intro has loud speech, use our <em>&quot;Try Another Section&quot;</em> feature to scan a 15-second segment where the speaker pauses.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-purple-500 font-bold text-xs">
              <Sliders className="w-4 h-4" />
              <span>Sped Up, Slowed & Nightcore</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Many viral TikTok clips use +20% sped-up or slowed + reverb versions. Our AI performs pitch and tempo normalization before hash matching. If audio fingerprinting fails, our secondary semantic analyzer inspects captions and video lyrics for matches.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-blue-500 font-bold text-xs">
              <Film className="w-4 h-4" />
              <span>Private or Deleted Videos</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              If an Instagram Reel was sent via private DM or has geographic viewing restrictions, our server cannot download the URL directly. Simply screen record the video for 5 seconds on your phone, upload the MP4/MOV clip to our <em>Upload File</em> tab, and identify it locally.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Comparison Matrix: iLoveAudios AI Song Finder vs Traditional Apps (High E-E-A-T) */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-500 block">
            Competitive Advantage
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            iLoveAudios AI Song Finder vs Shazam & Traditional Apps
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            See why millions of content creators, video editors, and music lovers choose iLoveAudios over traditional mobile apps and browser extensions:
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-slate-500/5">
                <th className="p-3.5 sm:p-4 font-black text-[var(--text-primary)]">Feature & Capability</th>
                <th className="p-3.5 sm:p-4 font-black text-[var(--iloveaudios-red)]">iLoveAudios AI Finder</th>
                <th className="p-3.5 sm:p-4 font-semibold text-[var(--text-secondary)]">Shazam App</th>
                <th className="p-3.5 sm:p-4 font-semibold text-[var(--text-secondary)]">Chrome Extensions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)]">
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">Social Video Link Input</td>
                <td className="p-3.5 sm:p-4 font-bold text-emerald-500">Instagram, TikTok, FB, Snap, Shorts</td>
                <td className="p-3.5 sm:p-4 text-red-400">Microphone Only (No Link Paste)</td>
                <td className="p-3.5 sm:p-4 text-yellow-500">Browser Audio Only</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">Upload Video & Audio Files</td>
                <td className="p-3.5 sm:p-4 font-bold text-emerald-500">MP4, MOV, WebM, MP3, WAV (Up to 100MB)</td>
                <td className="p-3.5 sm:p-4 text-red-400">Not Supported</td>
                <td className="p-3.5 sm:p-4 text-red-400">Not Supported</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">No Software Installation</td>
                <td className="p-3.5 sm:p-4 font-bold text-emerald-500">100% In-Browser (Zero Download)</td>
                <td className="p-3.5 sm:p-4 text-yellow-500">Requires 100MB+ App Install</td>
                <td className="p-3.5 sm:p-4 text-yellow-500">Requires Extension Install</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">Instant Full Song MP3 Download</td>
                <td className="p-3.5 sm:p-4 font-bold text-emerald-500">Included (Free 192kbps MP3)</td>
                <td className="p-3.5 sm:p-4 text-red-400">Apple Music Subscription Link Only</td>
                <td className="p-3.5 sm:p-4 text-red-400">Links to Spotify / YouTube Only</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">Synchronized Lyrics Lookup</td>
                <td className="p-3.5 sm:p-4 font-bold text-emerald-500">Line-by-line lyrics with copy button</td>
                <td className="p-3.5 sm:p-4 text-slate-400">Requires Apple ID login</td>
                <td className="p-3.5 sm:p-4 text-red-400">Not available</td>
              </tr>
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">Cost & Account Requirement</td>
                <td className="p-3.5 sm:p-4 font-bold text-emerald-500">100% Free Forever (No Signup)</td>
                <td className="p-3.5 sm:p-4 text-slate-400">Free with Ads</td>
                <td className="p-3.5 sm:p-4 text-slate-400">Freemium with search limits</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. How Acoustic Fingerprinting Works (E-E-A-T Explainer) */}
      <section className="max-w-4xl mx-auto space-y-4 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-cyan-500 block">
            Acoustic Engineering
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How Our AI Music Recognition Works Behind the Scenes
          </h2>
        </div>
        <div className="space-y-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          <p>
            When you paste a video URL or upload an audio file, our recognition pipeline uses high-performance FFmpeg audio demuxing to discard video frames and normalize the audio stream to a clean 44.1kHz mono PCM signal.
          </p>
          <p>
            Next, an acoustic spectrogram is computed using short-time Fourier transforms (STFT) to isolate distinctive time-frequency energy peaks—known as acoustic constellations. Even if the video creator added speech, street noise, or mild reverberation, these mathematical peaks remain resilient and identifiable.
          </p>
          <p>
            Finally, the generated acoustic hash is cross-referenced against a global catalog of over 50 million commercial and independent audio releases. In under 5 seconds, verified metadata including artist name, track title, album art, ISRC code, synchronized lyrics, and YouTube music video players are displayed directly on your screen.
          </p>
        </div>
      </section>

      {/* 7. Supported Platforms & Formats Grid */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500 block">
            Format & Platform Compatibility
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Supported Social Platforms & Audio Codecs
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel rounded-2xl p-4 space-y-2 border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-black text-[var(--text-primary)] flex items-center gap-1.5">
              <span>📱 Social Platforms</span>
            </h4>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Instagram Reels & Stories, TikTok Videos, YouTube Shorts, Facebook Reels, Snapchat Spotlight, Twitter/X Clips.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-4 space-y-2 border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-black text-[var(--text-primary)] flex items-center gap-1.5">
              <span>🎬 Video Formats</span>
            </h4>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              MP4, Apple MOV (ProRes / HEVC), WebM, Matroska MKV, AVI, 3GP, WMV (Up to 100MB per file).
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-4 space-y-2 border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-black text-[var(--text-primary)] flex items-center gap-1.5">
              <span>🎧 Audio Formats</span>
            </h4>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              MP3, Lossless WAV (PCM), M4A (AAC / ALAC), FLAC, OGG Vorbis, OPUS, AIFF, AAC, AMR.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-4 space-y-2 border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-black text-[var(--text-primary)] flex items-center gap-1.5">
              <span>💻 Supported Devices</span>
            </h4>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Apple iPhone & iPad (Safari, Chrome), Android Phones, Windows 10/11, macOS, Linux, and Chromebooks.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Cross-Tool Recommendation Hub */}
      <section className="max-w-4xl mx-auto p-6 rounded-2xl border border-[var(--border-color)] bg-gradient-to-r from-blue-500/5 to-purple-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm sm:text-base font-black text-[var(--text-primary)]">
            Need to convert video files or edit your music?
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Explore our 100% free studio audio converters and utilities.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/tools/mp4-to-mp3"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)] transition-all shadow-xs"
          >
            MP4 to MP3
          </Link>
          <Link
            href="/tools/audio-cutter"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)] transition-all shadow-xs"
          >
            Audio Cutter
          </Link>
          <Link
            href="/tools/volume-booster"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)] transition-all shadow-xs"
          >
            Volume Booster
          </Link>
        </div>
      </section>

      {/* 9. Frequently Asked Questions (FAQ Section - 100% Schema Parity) */}
      <section id="faqs" className="max-w-4xl mx-auto pt-6 border-t border-[var(--border-color)]">
        <FaqSection faqs={SONG_FINDER_FAQS} />
      </section>
    </div>
  );
}
