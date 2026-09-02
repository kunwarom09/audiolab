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
  Sliders
} from 'lucide-react';

const SONG_FINDER_FAQS = [
  {
    question: 'How do I find a song from an Instagram Reel or TikTok?',
    answer: 'Open the Reel or TikTok video, tap the Share button, select "Copy Link", and paste it into ILoveAudios Song Finder. Our engine demuxes the background audio and matches the acoustic fingerprint to reveal the title and artist in seconds.'
  },
  {
    question: 'How does this TikTok song finder identify music labeled "Original Sound"?',
    answer: 'When creators upload videos to TikTok or Instagram Reels, the platform often automatically labels the audio track as "Original Sound" or "Original Audio". Our AI song finder bypasses this label entirely: we extract the raw background audio stream and match its unique acoustic frequency constellation against 50M+ tracks to identify the genuine commercial song title and artist.'
  },
  {
    question: 'Can I find songs from private Instagram or TikTok accounts?',
    answer: 'No. The Instagram Reel, TikTok video, or YouTube Short must be publicly accessible so our cloud recognizer can download and demux the audio track. If a video is from a private account, you can screen-record the clip, switch to our "Upload File" tab, and identify it directly from your recorded video file.'
  },
  {
    question: 'How do I identify music when someone is talking over the song in a Reel?',
    answer: 'Our engine utilizes acoustic landmark filtering to detect consistent musical rhythms and harmonic peaks beneath vocal speech. If dialogue is overpowering the first few seconds, use our "Try Another Section" feature or upload the video clip and specify a timestamp with less speech.'
  },
  {
    question: 'Can I identify a song by uploading a video or audio file?',
    answer: 'Yes! Switch to the "Upload File" tab and upload any MP4, MOV, WebM, MP3, WAV, M4A, FLAC, or OGG file up to 100MB. You can analyze the full clip or select a specific 15-second timestamp.'
  },
  {
    question: 'Can I record a song playing around me in the browser?',
    answer: 'Yes! Tap the "Record Audio" tab and record 5 to 15 seconds of the song with your device microphone. ILoveAudios will capture the frequencies and identify the track immediately.'
  },
  {
    question: 'Can I download the identified song as an MP3 file?',
    answer: 'Yes! Once your song is identified, click "Download Full Song (MP3)" to save a clean, high-quality audio file directly to your device with full synchronized lyrics included.'
  },
  {
    question: 'Is ILoveAudios Song Finder free?',
    answer: 'Yes! ILoveAudios Song Finder is 100% free with no subscription, hidden paywalls, or software installation required.'
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
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md space-y-3 text-center sm:text-left">
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          Find the song behind any Reel, TikTok, video file, or audio clip with ILoveAudios Song Finder. Paste a social media video link, upload a media file, or record music playing around you to identify the song in seconds. Whether it&apos;s a viral sound, background tune, or uncredited audio, Song Finder gives you the track title, artist name, and official listening links effortlessly.
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
      {/* RICH CONTENT SECTIONS                                                     */}
      {/* ========================================================================= */}

      {/* 2. Find Any Song from Whatever Media You Have */}
      <section className="max-w-4xl mx-auto space-y-4 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-500 block">
            Universal Audio Discovery
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Find the Song Behind Any Media
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          Short-form videos on social media often feature incredible background music, but finding the original track title can be difficult when creators use generic tags like &quot;Original Audio&quot; or layer dialogue over the beat.
        </p>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          ILoveAudios Song Finder solves this problem with 3 flexible ways to identify music: paste a public video link, upload any video or audio file directly, or record live music through your browser microphone. By isolating the audio stream and analyzing frequency landmarks, our recognition engine identifies the exact song title, artist, album, and synchronized lyrics.
        </p>
      </section>

      {/* 3. Three Ways to Find Any Song */}
      <section className="max-w-5xl mx-auto space-y-6 pt-4">
        <div className="text-center sm:text-left space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-500">
            3 Ways to Identify Music
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How to Use Song Finder
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            To identify any song with iLoveAudios, paste a public video link from Instagram Reels, TikTok, Facebook, or Snapchat into the search box, upload an audio/video file, or record live music with your browser microphone. Our AI recognition engine identifies the verified track title, artist name, lyrics, and MP3 download in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center font-black text-sm">
                1
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">
                Paste Video Link
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Copy the link of any public Instagram Reel, TikTok video, Facebook Reel, or Snapchat video and paste it directly into Song Finder.
              </p>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-black text-sm">
                2
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">
                Upload File (Video / Audio)
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Upload MP4, MOV, WebM, MP3, WAV, or M4A files directly. You can analyze the full clip or choose a specific section.
              </p>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-black text-sm">
                3
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">
                Record Live Music
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Capture 5 to 15 seconds of audio playing nearby with your browser microphone to identify songs in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Supported Audio & Video Formats */}
      <section className="max-w-4xl mx-auto space-y-4 pt-4 border-t border-[var(--border-color)]">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500 block">
            Format Compatibility
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Supported Media & Platforms
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          ILoveAudios Song Finder accepts links from Instagram Reels, TikTok, Facebook Reels, Snapchat Spotlight, and YouTube Shorts. For direct uploads, we support high-definition video files (MP4, MOV, WebM, MKV) and lossless or compressed audio tracks (MP3, WAV, M4A, FLAC, OGG, AAC) up to 100MB.
        </p>
      </section>

      {/* 4.5 Dedicated Reel & TikTok Song-ID Showcase (Capturing the Sub-Cluster) */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-pink-500 block">
            Social Media Video Discovery
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Find Songs from Instagram Reels, TikTok & Shorts (Even &quot;Original Sound&quot;)
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            Millions of viral videos on TikTok and Instagram Reels contain amazing background music tagged only as generic &quot;Original Sound&quot; or &quot;Audio by Creator&quot;. Here is how iLoveAudios identifies the real song:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="glass-panel rounded-2xl p-6 space-y-3 border-pink-500/20 bg-pink-500/5">
            <h3 className="text-sm font-black text-[var(--text-primary)] flex items-center gap-2">
              <span className="text-pink-500 font-black">🎵</span>
              <span>Why TikTok Says &quot;Original Sound&quot;</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              When a creator edits music into third-party apps (like CapCut, InShot, or Premiere) before uploading, TikTok automatically labels the audio track as &quot;Original Sound&quot; rather than tagging the official artist. This hides the track title from viewers.
            </p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-semibold text-[var(--text-primary)]">
              How iLoveAudios solves it: We demux the raw audio waveform directly from the link and match the acoustic fingerprint against 50M+ licensed songs, uncovering the genuine artist and title even when TikTok doesn&apos;t credit them.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border-blue-500/20 bg-blue-500/5">
            <h3 className="text-sm font-black text-[var(--text-primary)] flex items-center gap-2">
              <span className="text-blue-500 font-black">⚡</span>
              <span>How to Copy Video Links for Recognition</span>
            </h3>
            <ul className="text-xs text-[var(--text-secondary)] space-y-2 leading-relaxed">
              <li><strong className="text-[var(--text-primary)]">Instagram Reels:</strong> Tap the <em>Share (Paper Plane)</em> icon at bottom-right &rarr; Tap <em>Copy Link</em>.</li>
              <li><strong className="text-[var(--text-primary)]">TikTok Videos:</strong> Tap the <em>Share (Arrow)</em> button &rarr; Select <em>Copy Link</em>.</li>
              <li><strong className="text-[var(--text-primary)]">YouTube Shorts:</strong> Tap <em>Share</em> &rarr; Tap <em>Copy link</em>.</li>
              <li><strong className="text-[var(--text-primary)]">Facebook & Snapchat:</strong> Tap the three dots or Share arrow &rarr; select <em>Copy Link</em>.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Comparison Matrix: iLoveAudios vs Shazam vs Others (High E-E-A-T) */}
      <section className="max-w-5xl mx-auto space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-500 block">
            Competitive Advantage
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            iLoveAudios AI Song Finder vs Traditional Apps
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            See why thousands of creators and music lovers choose iLoveAudios over mobile apps like Shazam and desktop extensions:
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-slate-500/5">
                <th className="p-3.5 sm:p-4 font-black text-[var(--text-primary)]">Feature</th>
                <th className="p-3.5 sm:p-4 font-black text-[var(--iloveaudios-red)]">iLoveAudios AI Finder</th>
                <th className="p-3.5 sm:p-4 font-semibold text-[var(--text-secondary)]">Shazam App</th>
                <th className="p-3.5 sm:p-4 font-semibold text-[var(--text-secondary)]">Chrome Extensions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)]">
              <tr>
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">Social Video Link Support</td>
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
                <td className="p-3.5 sm:p-4 font-bold text-[var(--text-primary)]">Cost & Registration</td>
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
            When you paste a video URL or upload a file, our recognition pipeline uses FFmpeg audio demuxing to strip visual video tracks and normalize the audio stream to a clean 44.1kHz mono PCM signal.
          </p>
          <p>
            Next, an acoustic spectrogram is computed using short-time Fourier transforms (STFT) to isolate distinctive frequency peaks—known as acoustic constellations or fingerprints. Even if the video creator added speech, environmental background noise, or slight tempo pitch changes, these mathematical peaks remain resilient.
          </p>
          <p>
            Finally, the generated hash is cross-referenced against a global catalog of over 50 million commercial and independent audio releases. In less than 5 seconds, verified metadata including artist name, song title, album art, ISRC code, synchronized lyrics, and YouTube video players are rendered directly to your screen.
          </p>
        </div>
      </section>

      {/* 7. Cross-Tool Recommendation Hub */}
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

      {/* 8. Frequently Asked Questions (FAQ Section) */}
      <section id="faqs" className="max-w-4xl mx-auto pt-6 border-t border-[var(--border-color)]">
        <FaqSection faqs={SONG_FINDER_FAQS} />
      </section>
    </div>
  );
}
