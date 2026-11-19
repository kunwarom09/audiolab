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
    <div className="site-container space-y-12 pb-16">
      {/* Header Section */}
      <div className="pt-8 pb-4 space-y-4">
        <h1 className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)]">
          Online Audio Cutter
        </h1>
        <p className="text-[length:var(--text-lead)] text-[var(--color-text-muted)] prose-measure leading-[var(--leading-body)]">
          Use our free <strong>online audio cutter</strong> and music cutter to trim song online audio files, make ringtones, and splice tracks with sub-second precision. Free music cutter and mp3 cutter online free with no signup required.
        </p>
      </div>

      {/* Main Tool Container */}
      <div className="ui-card shadow-sm space-y-6">
        {step === 'upload' && (
          <FileDropzone
            onFileSelect={handleFileSelect}
            onFileSelected={handleFileSelect}
            fromFormat="MP3"
            acceptedFormats={['mp3', 'wav', 'flac', 'm4a', 'aac', 'ogg', 'opus', 'mp4', 'mov']}
            acceptedMimes={['audio/mpeg', 'audio/mp3', 'audio/*', 'video/mp4', 'video/quicktime']}
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
            <div className="p-6 sm:p-8 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 text-[length:var(--text-base)] font-mono font-bold text-[var(--color-text-muted)]">
                <span>Current: {formatTime(currentTime)}</span>
                <span>Total Duration: {formatTime(duration)}</span>
              </div>

              {/* Progress Slider */}
              <div className="relative w-full min-h-[48px] flex items-center">
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
                  aria-label="Audio playback position"
                  className="w-full h-3 accent-purple-600 cursor-pointer"
                />
              </div>

              {/* Play / Pause / Reset Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause audio preview' : 'Play audio preview'}
                  className="min-w-[52px] min-h-[52px] px-[20px] rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition-colors cursor-pointer flex items-center justify-center"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
              </div>
            </div>

            {/* Start and End Trimming Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-[var(--color-border)] space-y-3">
                <label className="text-[length:var(--text-base)] font-bold text-[var(--color-text)] block">
                  Start Time (Seconds)
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    max={endTime}
                    step={0.1}
                    value={startTime}
                    onChange={(e) => setStartTime(Math.max(0, Math.min(endTime, parseFloat(e.target.value) || 0)))}
                    className="ui-control w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] font-mono font-bold text-[var(--color-text)]"
                  />
                  <button
                    type="button"
                    onClick={() => setStartTime(currentTime)}
                    className="ui-control w-full sm:w-auto rounded-xl bg-purple-500/10 text-purple-700 border border-purple-500/20 font-bold cursor-pointer whitespace-nowrap"
                  >
                    Set Current
                  </button>
                </div>
                <span className="text-[length:var(--text-base)] text-[var(--color-text-muted)] font-mono block">{formatTime(startTime)}</span>
              </div>

              <div className="p-6 rounded-2xl border border-[var(--color-border)] space-y-3">
                <label className="text-[length:var(--text-base)] font-bold text-[var(--color-text)] block">
                  End Time (Seconds)
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    type="number"
                    min={startTime}
                    max={duration}
                    step={0.1}
                    value={endTime}
                    onChange={(e) => setEndTime(Math.min(duration, Math.max(startTime, parseFloat(e.target.value) || 0)))}
                    className="ui-control w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] font-mono font-bold text-[var(--color-text)]"
                  />
                  <button
                    type="button"
                    onClick={() => setEndTime(currentTime)}
                    className="ui-control w-full sm:w-auto rounded-xl bg-purple-500/10 text-purple-700 border border-purple-500/20 font-bold cursor-pointer whitespace-nowrap"
                  >
                    Set Current
                  </button>
                </div>
                <span className="text-[length:var(--text-base)] text-[var(--color-text-muted)] font-mono block">{formatTime(endTime)}</span>
              </div>
            </div>

            {/* Output Format Options */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)]">
              <div className="space-y-1">
                <span className="text-[length:var(--text-base)] font-bold text-[var(--color-text)] block">Trim Duration: {formatTime(Math.max(0, endTime - startTime))}</span>
                <span className="text-[length:var(--text-base)] text-[var(--color-text-muted)] block">Export format:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {['mp3', 'wav', 'm4r'].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setOutputFormat(fmt)}
                    className={`ui-pill rounded-xl font-bold transition-colors cursor-pointer ${
                      outputFormat === fmt
                        ? 'bg-purple-600 text-white'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
                    }`}
                  >
                    {fmt.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="ui-control w-full sm:w-auto rounded-xl border border-[var(--color-border)] hover:bg-black/5 font-bold text-[var(--color-text-muted)] transition-colors cursor-pointer"
              >
                Choose Another File
              </button>
              <button
                type="button"
                onClick={handleCutAudio}
                className="ui-control w-full sm:w-auto rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Scissors className="w-5 h-5" />
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
          <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-[length:var(--text-base)] font-bold text-red-700 text-left">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Rich Educational Guide (SEO Optimized) */}
      <section className="space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="space-y-3">
          <span className="text-[length:var(--text-base)] font-bold text-purple-700 block">Step-by-Step Guide</span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            How to Cut Audio Files Online for Free
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            To cut or trim an audio file online for free, upload your MP3, WAV, or audio track into the cutter above, select your desired start and end times, choose your export format (MP3, WAV, or M4R ringtone), and click Cut Audio Now. Your trimmed track is processed with sub-second precision and ready for instant download.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ui-card space-y-3">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center font-bold text-[length:var(--text-base)]">1</div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Upload Your Audio Track</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Drag and drop any MP3, WAV, M4A, FLAC, AAC, or video file into the cutter interface.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center font-bold text-[length:var(--text-base)]">2</div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Select Start and End Times</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Use the interactive audio waveform player to choose the exact snippet you want to keep.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center font-bold text-[length:var(--text-base)]">3</div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Cut & Download</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Click &quot;Cut Audio Now&quot; to save your high-quality trimmed MP3, WAV, or M4R ringtone.
            </p>
          </div>
        </div>
      </section>

      {/* Key Use Cases */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-[length:var(--text-base)] font-bold text-blue-700 block">Versatile Trimming</span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Popular Audio Cutting Use Cases
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="ui-card space-y-3">
            <Smartphone className="w-7 h-7 text-purple-600" />
            <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">Custom Ringtones</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">Trim your favorite song chorus into a 30-second iPhone M4R or Android MP3 ringtone.</p>
          </div>
          <div className="ui-card space-y-3">
            <Clock className="w-7 h-7 text-blue-600" />
            <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">Podcast Intros & Outros</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">Remove unwanted silence, filler words, or coughing from podcast interviews.</p>
          </div>
          <div className="ui-card space-y-3">
            <Sparkles className="w-7 h-7 text-emerald-600" />
            <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">TikTok & Reel Audio</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">Extract and trim exact sound bites from videos for social media creations.</p>
          </div>
          <div className="ui-card space-y-3">
            <Volume2 className="w-7 h-7 text-amber-600" />
            <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">Voice Note Clips</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">Clip important voice notes from WhatsApp or Telegram for sharing and presentation.</p>
          </div>
        </div>
      </section>

      {/* FAQs Section (100% in DOM for Googlebot) */}
      <section className="space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="space-y-2">
          <span className="text-[length:var(--text-base)] font-bold text-cyan-700 block">FAQ</span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="ui-card space-y-3">
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)] flex items-start gap-2">
              <span className="text-purple-600 font-bold shrink-0">Q:</span>
              <span>How do I cut an MP3 or audio file online?</span>
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure pl-6">
              Upload your audio file, adjust the start and end time markers or type exact timestamps, preview your selection, and click &quot;Cut Audio&quot; to download your trimmed track.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)] flex items-start gap-2">
              <span className="text-purple-600 font-bold shrink-0">Q:</span>
              <span>What audio formats can I cut?</span>
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure pl-6">
              Audio Cutter supports MP3, WAV, FLAC, M4A, AAC, OGG, OPUS, and audio streams from MP4 and MOV videos.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)] flex items-start gap-2">
              <span className="text-purple-600 font-bold shrink-0">Q:</span>
              <span>Is there any quality loss when trimming audio?</span>
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure pl-6">
              No, our audio trimmer processes audio with maximum bitrate preservation so your cut snippet sounds just as crisp as the original.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)] flex items-start gap-2">
              <span className="text-purple-600 font-bold shrink-0">Q:</span>
              <span>Can I make iPhone ringtones with Audio Cutter?</span>
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure pl-6">
              Yes! Trim any song to 30 seconds, export as MP3 or M4R, and set it as your custom iPhone or Android ringtone.
            </p>
          </div>
        </div>
      </section>

      {/* Cross-Linking Section */}
      <section className="space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="space-y-2">
          <span className="text-[length:var(--text-base)] font-bold text-[var(--color-brand)] block">
            More Audio Tools
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Related Audio Utilities & Converters
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <Link href="/mp3-converter" className="tool-card min-h-[48px] py-[12px] px-[20px] hover:border-red-500/40 text-[length:var(--text-base)] font-bold text-[var(--color-text)] flex items-center justify-between group">
            <span className="group-hover:text-[var(--color-brand)] transition-colors">MP3 Converter</span>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand)] transition-colors shrink-0" />
          </Link>
          <Link href="/audio-converter" className="tool-card min-h-[48px] py-[12px] px-[20px] hover:border-emerald-500/40 text-[length:var(--text-base)] font-bold text-[var(--color-text)] flex items-center justify-between group">
            <span className="group-hover:text-emerald-700 transition-colors">Audio Converter</span>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-emerald-700 transition-colors shrink-0" />
          </Link>
          <Link href="/tools/song-extractor" className="tool-card min-h-[48px] py-[12px] px-[20px] hover:border-blue-500/40 text-[length:var(--text-base)] font-bold text-[var(--color-text)] flex items-center justify-between group">
            <span className="group-hover:text-blue-700 transition-colors">AI Song Finder</span>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-blue-700 transition-colors shrink-0" />
          </Link>
          <Link href="/tools/audio-joiner" className="tool-card min-h-[48px] py-[12px] px-[20px] hover:border-purple-500/40 text-[length:var(--text-base)] font-bold text-[var(--color-text)] flex items-center justify-between group">
            <span className="group-hover:text-purple-700 transition-colors">Audio Joiner</span>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-purple-700 transition-colors shrink-0" />
          </Link>
          <Link href="/tools/volume-booster" className="tool-card min-h-[48px] py-[12px] px-[20px] hover:border-purple-500/40 text-[length:var(--text-base)] font-bold text-[var(--color-text)] flex items-center justify-between group">
            <span className="group-hover:text-purple-700 transition-colors">Volume Booster</span>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-purple-700 transition-colors shrink-0" />
          </Link>
          <Link href="/tools/mp4-to-mp3" className="tool-card min-h-[48px] py-[12px] px-[20px] hover:border-purple-500/40 text-[length:var(--text-base)] font-bold text-[var(--color-text)] flex items-center justify-between group">
            <span className="group-hover:text-purple-700 transition-colors">MP4 to MP3</span>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-purple-700 transition-colors shrink-0" />
          </Link>
        </div>
      </section>
    </div>
  );
}
