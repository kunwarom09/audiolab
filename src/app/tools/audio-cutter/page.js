'use client';

import React, { useState, useRef, useEffect } from 'react';
import FileDropzone from '@/components/FileDropzone';
import ConversionProgress from '@/components/ConversionProgress';
import DownloadResult from '@/components/DownloadResult';
import { 
  Scissors, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Volume2, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  Smartphone
} from 'lucide-react';
import Link from 'next/link';

export default function AudioCutterPage() {
  const [file, setFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [outputFormat, setOutputFormat] = useState('mp3');
  const [step, setStep] = useState('upload'); // upload | edit | converting | completed
  const [progress, setProgress] = useState(0);
  const [jobId, setJobId] = useState(null);
  const [convertedFileName, setConvertedFileName] = useState('');
  const [fileSize, setFileSize] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const audioRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    if (selectedFile) {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      const url = URL.createObjectURL(selectedFile);
      setAudioUrl(url);
      setFile(selectedFile);
      setStep('edit');
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration;
      setDuration(dur);
      setStartTime(0);
      setEndTime(dur);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.currentTime >= endTime) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (audioRef.current.currentTime < startTime || audioRef.current.currentTime >= endTime) {
          audioRef.current.currentTime = startTime;
        }
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '00:00.0';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  const handleCutAudio = async () => {
    if (!file) return;
    setStep('converting');
    setProgress(10);
    setErrorMessage(null);

    try {
      // 1. Upload
      const formData = new FormData();
      formData.append('file', file);
      
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || (typeof window !== 'undefined' && !window.location.hostname.includes('localhost') ? 'https://audiolab-dc5o.onrender.com' : '');
      const uploadUrl = backendUrl ? `${backendUrl}/api/upload` : '/api/upload';

      const uploadRes = await fetch(uploadUrl, {
        method: 'POST',
        body: formData
      });

      if (!uploadRes.ok) throw new Error('Failed to upload file for cutting');
      const uploadData = await uploadRes.json();
      setProgress(40);

      // 2. Transcode / Trim
      const convertUrl = backendUrl ? `${backendUrl}/api/convert` : '/api/convert';
      const convertRes = await fetch(convertUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file_id: uploadData.file_id,
          output_format: outputFormat,
          options: {
            start_time: startTime,
            end_time: endTime,
            bitrate: '320k'
          }
        })
      });

      if (!convertRes.ok) throw new Error('Audio trimming processing failed');
      const convertData = await convertRes.json();
      const currentJobId = convertData.job_id;
      setJobId(currentJobId);

      // 3. Poll
      const pollInterval = setInterval(async () => {
        try {
          const statusUrl = backendUrl ? `${backendUrl}/api/convert/jobs/${currentJobId}` : `/api/convert/jobs/${currentJobId}`;
          const res = await fetch(statusUrl);
          if (!res.ok) return;
          const statusData = await res.json();

          if (statusData.status === 'processing') {
            setProgress(Math.min(90, (statusData.progress || 50)));
          } else if (statusData.status === 'completed') {
            clearInterval(pollInterval);
            setProgress(100);
            setConvertedFileName(statusData.result?.output_filename || `trimmed.${outputFormat}`);
            setFileSize(statusData.result?.file_size || 0);
            setStep('completed');
          } else if (statusData.status === 'failed') {
            clearInterval(pollInterval);
            throw new Error(statusData.error || 'Audio cutting failed');
          }
        } catch (pollErr) {
          clearInterval(pollInterval);
          setErrorMessage(pollErr.message);
          setStep('edit');
        }
      }, 1000);

    } catch (err) {
      setErrorMessage(err.message || 'Error occurred while cutting audio');
      setStep('edit');
    }
  };

  const handleReset = () => {
    setFile(null);
    setAudioUrl(null);
    setStep('upload');
    setProgress(0);
    setJobId(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 pb-16 px-4">
      {/* Header Section */}
      <div className="pt-8 pb-4 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-bold">
          <Scissors className="w-3.5 h-3.5" />
          <span>Free Audio Tool</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">
          Audio Cutter & MP3 Trimmer
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Trim songs, splice voice memos, and make custom iPhone & Android ringtones with sub-second precision. 100% free, browser-based, and secure.
        </p>
      </div>

      {/* Main Tool Container */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] shadow-xl space-y-6">
        {step === 'upload' && (
          <FileDropzone
            onFileSelected={handleFileSelect}
            fromFormat="AUDIO"
            acceptedMimes={['audio/*', 'video/mp4', 'video/quicktime']}
          />
        )}

        {step === 'edit' && audioUrl && (
          <div className="space-y-6">
            <audio
              ref={audioRef}
              src={audioUrl}
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
            />

            {/* Audio Waveform Scrubber Simulation */}
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] space-y-4">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--text-secondary)]">
                <span>Current: {formatTime(currentTime)}</span>
                <span>Total Duration: {formatTime(duration)}</span>
              </div>

              {/* Progress Slider */}
              <div className="relative w-full h-8 flex items-center">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={(e) => {
                    const t = parseFloat(e.target.value);
                    setCurrentTime(t);
                    if (audioRef.current) audioRef.current.currentTime = t;
                  }}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              {/* Play / Pause / Reset Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center justify-center"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
              </div>
            </div>

            {/* Start and End Trimming Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-[var(--border-color)] space-y-2">
                <label className="text-xs font-bold text-[var(--text-primary)] block">
                  Start Time (Seconds)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={endTime}
                    step={0.1}
                    value={startTime}
                    onChange={(e) => setStartTime(Math.max(0, Math.min(endTime, parseFloat(e.target.value) || 0)))}
                    className="w-full p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] text-sm font-mono font-bold text-[var(--text-primary)]"
                  />
                  <button
                    type="button"
                    onClick={() => setStartTime(currentTime)}
                    className="px-3 py-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-bold cursor-pointer whitespace-nowrap"
                  >
                    Set Current
                  </button>
                </div>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">{formatTime(startTime)}</span>
              </div>

              <div className="p-4 rounded-2xl border border-[var(--border-color)] space-y-2">
                <label className="text-xs font-bold text-[var(--text-primary)] block">
                  End Time (Seconds)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={startTime}
                    max={duration}
                    step={0.1}
                    value={endTime}
                    onChange={(e) => setEndTime(Math.min(duration, Math.max(startTime, parseFloat(e.target.value) || 0)))}
                    className="w-full p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] text-sm font-mono font-bold text-[var(--text-primary)]"
                  />
                  <button
                    type="button"
                    onClick={() => setEndTime(currentTime)}
                    className="px-3 py-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-bold cursor-pointer whitespace-nowrap"
                  >
                    Set Current
                  </button>
                </div>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">{formatTime(endTime)}</span>
              </div>
            </div>

            {/* Output Format Options */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--bg-card-hover)] border border-[var(--border-color)]">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[var(--text-primary)] block">Trim Duration: {formatTime(Math.max(0, endTime - startTime))}</span>
                <span className="text-[11px] text-[var(--text-secondary)]">Export format:</span>
              </div>
              <div className="flex gap-2">
                {['mp3', 'wav', 'm4r'].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setOutputFormat(fmt)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase transition-colors cursor-pointer ${
                      outputFormat === fmt
                        ? 'bg-purple-600 text-white'
                        : 'bg-[var(--bg-main)] text-[var(--text-secondary)] border border-[var(--border-color)]'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-3 rounded-xl border border-[var(--border-color)] hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold text-[var(--text-secondary)] transition-colors cursor-pointer"
              >
                Choose Another File
              </button>
              <button
                type="button"
                onClick={handleCutAudio}
                className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg hover:shadow-purple-500/25 transition-all cursor-pointer"
              >
                <Scissors className="w-4 h-4" />
                <span>Cut Audio Now</span>
              </button>
            </div>
          </div>
        )}

        {step === 'converting' && (
          <ConversionProgress
            progress={progress}
            status="converting"
            fromFormat={file?.name?.split('.').pop()?.toUpperCase() || 'AUDIO'}
            toFormat={outputFormat.toUpperCase()}
          />
        )}

        {step === 'completed' && (
          <DownloadResult
            jobId={jobId}
            fileName={convertedFileName}
            fileSize={fileSize}
            onReset={handleReset}
          />
        )}

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-600 dark:text-red-400 text-center">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Rich Educational Guide (SEO Optimized) */}
      <section className="space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-500">Step-by-Step Guide</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How to Cut Audio Files Online for Free
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            To cut or trim an audio file online for free, upload your MP3, WAV, or audio track into the cutter above, select your desired start and end times, choose your export format (MP3, WAV, or M4R ringtone), and click Cut Audio Now. Your trimmed track is processed with sub-second precision and ready for instant download.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black text-sm">1</div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Upload Your Audio Track</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Drag and drop any MP3, WAV, M4A, FLAC, AAC, or video file into the cutter interface.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black text-sm">2</div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Select Start and End Times</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Use the interactive audio waveform player to choose the exact snippet you want to keep.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black text-sm">3</div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Cut & Download</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Click &quot;Cut Audio Now&quot; to save your high-quality trimmed MP3, WAV, or M4R ringtone.
            </p>
          </div>
        </div>
      </section>

      {/* Key Use Cases */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-500">Versatile Trimming</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Popular Audio Cutting Use Cases
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel rounded-2xl p-5 space-y-2">
            <Smartphone className="w-6 h-6 text-purple-500" />
            <h3 className="text-sm font-black text-[var(--text-primary)]">Custom Ringtones</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Trim your favorite song chorus into a 30-second iPhone M4R or Android MP3 ringtone.</p>
          </div>
          <div className="glass-panel rounded-2xl p-5 space-y-2">
            <Clock className="w-6 h-6 text-blue-500" />
            <h3 className="text-sm font-black text-[var(--text-primary)]">Podcast Intros & Outros</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Remove unwanted silence, filler words, or coughing from podcast interviews.</p>
          </div>
          <div className="glass-panel rounded-2xl p-5 space-y-2">
            <Sparkles className="w-6 h-6 text-emerald-500" />
            <h3 className="text-sm font-black text-[var(--text-primary)]">TikTok & Reel Audio</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Extract and trim exact sound bites from videos for social media creations.</p>
          </div>
          <div className="glass-panel rounded-2xl p-5 space-y-2">
            <Volume2 className="w-6 h-6 text-amber-500" />
            <h3 className="text-sm font-black text-[var(--text-primary)]">Voice Note Clips</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Clip important voice notes from WhatsApp or Telegram for sharing and presentation.</p>
          </div>
        </div>
      </section>

      {/* FAQs Section (100% in DOM for Googlebot) */}
      <section className="space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-cyan-500">FAQ</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-panel rounded-2xl p-5 space-y-2 border border-[var(--border-color)]">
            <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-start gap-2">
              <span className="text-purple-500 font-black shrink-0">Q:</span>
              <span>How do I cut an MP3 or audio file online?</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5">
              Upload your audio file, adjust the start and end time markers or type exact timestamps, preview your selection, and click &quot;Cut Audio&quot; to download your trimmed track.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-2 border border-[var(--border-color)]">
            <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-start gap-2">
              <span className="text-purple-500 font-black shrink-0">Q:</span>
              <span>What audio formats can I cut?</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5">
              Audio Cutter supports MP3, WAV, FLAC, M4A, AAC, OGG, OPUS, and audio streams from MP4 and MOV videos.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-2 border border-[var(--border-color)]">
            <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-start gap-2">
              <span className="text-purple-500 font-black shrink-0">Q:</span>
              <span>Is there any quality loss when trimming audio?</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5">
              No, our audio trimmer processes audio with maximum bitrate preservation so your cut snippet sounds just as crisp as the original.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-2 border border-[var(--border-color)]">
            <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-start gap-2">
              <span className="text-purple-500 font-black shrink-0">Q:</span>
              <span>Can I make iPhone ringtones with Audio Cutter?</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5">
              Yes! Trim any song to 30 seconds, export as MP3 or M4R, and set it as your custom iPhone or Android ringtone.
            </p>
          </div>
        </div>
      </section>

      {/* Cross-Linking Section */}
      <section className="space-y-4 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[var(--iloveaudios-red)] block">
            More Audio Tools
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            Related Audio Utilities & Converters
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/tools/audio-joiner" className="glass-panel rounded-xl p-3 border border-[var(--border-color)] hover:border-purple-500/40 text-xs font-bold text-[var(--text-primary)] flex items-center justify-between group">
            <span className="group-hover:text-purple-500 transition-colors">Audio Joiner</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link href="/tools/volume-booster" className="glass-panel rounded-xl p-3 border border-[var(--border-color)] hover:border-purple-500/40 text-xs font-bold text-[var(--text-primary)] flex items-center justify-between group">
            <span className="group-hover:text-purple-500 transition-colors">Volume Booster</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link href="/tools/mp3-to-m4r" className="glass-panel rounded-xl p-3 border border-[var(--border-color)] hover:border-purple-500/40 text-xs font-bold text-[var(--text-primary)] flex items-center justify-between group">
            <span className="group-hover:text-purple-500 transition-colors">MP3 to M4R (Ringtone)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link href="/tools/mp4-to-mp3" className="glass-panel rounded-xl p-3 border border-[var(--border-color)] hover:border-purple-500/40 text-xs font-bold text-[var(--text-primary)] flex items-center justify-between group">
            <span className="group-hover:text-purple-500 transition-colors">MP4 to MP3</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </section>
    </div>
  );
}
