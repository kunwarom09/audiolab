'use client';

import React, { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import ConversionProgress from '@/components/ConversionProgress';
import DownloadResult from '@/components/DownloadResult';
import { 
  Volume2, 
  VolumeX, 
  Volume1, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Sliders,
  CheckCircle2,
  Mic,
  Smartphone,
  Headphones
} from 'lucide-react';
import Link from 'next/link';

export default function VolumeBoosterPage() {
  const [file, setFile] = useState(null);
  const [boostLevel, setBoostLevel] = useState('1.5'); // 1.25 | 1.5 | 2.0 | 3.0
  const [outputFormat, setOutputFormat] = useState('mp3');
  const [step, setStep] = useState('upload'); // upload | settings | converting | completed
  const [progress, setProgress] = useState(0);
  const [jobId, setJobId] = useState(null);
  const [convertedFileName, setConvertedFileName] = useState('');
  const [fileSize, setFileSize] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const boostOptions = [
    { value: '1.25', label: '+25% Boost', desc: 'Mild increase for slightly quiet audio' },
    { value: '1.5', label: '+50% Boost', desc: 'Recommended for standard voice notes' },
    { value: '2.0', label: '+100% (2x)', desc: 'Double volume for very quiet files' },
    { value: '3.0', label: '+200% (3x)', desc: 'Maximum loudness for whisper recordings' }
  ];

  const handleBoostVolume = async () => {
    if (!file) return;

    setStep('converting');
    setProgress(15);
    setErrorMessage(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || (typeof window !== 'undefined' && !window.location.hostname.includes('localhost') ? 'https://audiolab-dc5o.onrender.com' : '');
      const uploadUrl = backendUrl ? `${backendUrl}/api/upload` : '/api/upload';

      // 1. Upload File
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await fetch(uploadUrl, {
        method: 'POST',
        body: formData
      });

      if (!uploadRes.ok) throw new Error('Failed to upload file');
      const uploadData = await uploadRes.json();
      setProgress(45);

      // 2. Call Convert with volume_gain
      const convertUrl = backendUrl ? `${backendUrl}/api/convert` : '/api/convert';
      const convertRes = await fetch(convertUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file_id: uploadData.file_id,
          output_format: outputFormat,
          options: {
            volume_gain: parseFloat(boostLevel),
            bitrate: '320k'
          }
        })
      });

      if (!convertRes.ok) throw new Error('Volume boost processing failed');
      const convertData = await convertRes.json();
      const currentJobId = convertData.job_id;
      setJobId(currentJobId);

      // 3. Poll for result
      const pollInterval = setInterval(async () => {
        try {
          const statusUrl = backendUrl ? `${backendUrl}/api/convert/jobs/${currentJobId}` : `/api/convert/jobs/${currentJobId}`;
          const res = await fetch(statusUrl);
          if (!res.ok) return;
          const statusData = await res.json();

          if (statusData.status === 'processing') {
            setProgress(Math.min(90, (statusData.progress || 60)));
          } else if (statusData.status === 'completed') {
            clearInterval(pollInterval);
            setProgress(100);
            setConvertedFileName(statusData.result?.output_filename || `boosted.${outputFormat}`);
            setFileSize(statusData.result?.file_size || 0);
            setStep('completed');
          } else if (statusData.status === 'failed') {
            clearInterval(pollInterval);
            throw new Error(statusData.error || 'Volume boost processing failed');
          }
        } catch (pollErr) {
          clearInterval(pollInterval);
          setErrorMessage(pollErr.message);
          setStep('settings');
        }
      }, 1000);

    } catch (err) {
      setErrorMessage(err.message || 'Error occurred while boosting volume');
      setStep('settings');
    }
  };

  const handleReset = () => {
    setFile(null);
    setStep('upload');
    setProgress(0);
    setJobId(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 pb-16 px-4">
      {/* Header Section */}
      <div className="pt-8 pb-4 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold">
          <Volume2 className="w-3.5 h-3.5" />
          <span>Free Audio Tool</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">
          Audio Volume Booster & Amplifier
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Make quiet MP3 songs, voice recordings, and video audio up to 200% louder online. Professional anti-distortion soft limiting included.
        </p>
      </div>

      {/* Main Container */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] shadow-xl space-y-6">
        {step === 'upload' && (
          <FileDropzone
            onFileSelected={(f) => {
              setFile(f);
              setStep('settings');
            }}
            fromFormat="AUDIO / VIDEO"
            acceptedMimes={['audio/*', 'video/mp4', 'video/quicktime', 'video/webm']}
          />
        )}

        {step === 'settings' && file && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-[var(--bg-card-hover)] border border-[var(--border-color)] flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-black text-[var(--text-muted)]">Selected File</span>
                <p className="text-xs font-bold text-[var(--text-primary)]">{file.name}</p>
              </div>
              <span className="text-xs text-[var(--text-secondary)]">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
            </div>

            {/* Volume Boost Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider block">
                Choose Volume Boost Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {boostOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setBoostLevel(opt.value)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      boostLevel === opt.value
                        ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold shadow-md'
                        : 'border-[var(--border-color)] bg-[var(--bg-main)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)]'
                    }`}
                  >
                    <span className="block text-sm font-black">{opt.label}</span>
                    <span className="block text-[11px] text-[var(--text-secondary)] font-normal mt-1 leading-snug">
                      {opt.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Output Format Settings */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--bg-card-hover)] border border-[var(--border-color)]">
              <span className="text-xs font-bold text-[var(--text-primary)]">Output Format:</span>
              <div className="flex gap-2">
                {['mp3', 'wav', 'm4a'].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setOutputFormat(fmt)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-extrabold uppercase transition-colors cursor-pointer ${
                      outputFormat === fmt
                        ? 'bg-amber-600 text-white'
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
                className="px-4 py-3 rounded-xl border border-[var(--border-color)] hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold text-[var(--text-secondary)] cursor-pointer"
              >
                Choose Another File
              </button>
              <button
                type="button"
                onClick={handleBoostVolume}
                className="px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg hover:shadow-amber-500/25 transition-all cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Boost Volume Now</span>
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

      {/* Educational Guide (SEO Optimized) */}
      <section className="space-y-6 pt-6 border-t border-[var(--border-color)]">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-500">Step-by-Step Guide</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How to Make Audio & Videos Louder Online
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            To boost the volume of a quiet audio or video file online for free, upload your MP3, WAV, M4A, or MP4 file into the booster above, choose your boost multiplier (+25% to +200%), and click Boost Volume Now. Our smart audio limiter maximizes gain without distortion, delivering a louder, clearer file in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-sm">1</div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Upload Audio or Video</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Select your quiet MP3, WAV, OPUS voice note, or MP4 video file.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-sm">2</div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Select Boost Multiplier</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Choose your desired amplification level from +25% up to +200% (3x volume).
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-sm">3</div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Download Louder Track</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Click &quot;Boost Volume Now&quot; to download your enhanced, crystal-clear audio file.
            </p>
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-500">Use Cases</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Popular Volume Boosting Use Cases
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel rounded-2xl p-5 space-y-2">
            <Smartphone className="w-6 h-6 text-amber-500" />
            <h3 className="text-sm font-black text-[var(--text-primary)]">WhatsApp Voice Notes</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Amplify quiet WhatsApp voice notes recorded far away from the microphone.</p>
          </div>
          <div className="glass-panel rounded-2xl p-5 space-y-2">
            <Mic className="w-6 h-6 text-blue-500" />
            <h3 className="text-sm font-black text-[var(--text-primary)]">Podcast Interviews</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Boost quiet guest microphone feeds to match the host&apos;s loudness level.</p>
          </div>
          <div className="glass-panel rounded-2xl p-5 space-y-2">
            <Headphones className="w-6 h-6 text-purple-500" />
            <h3 className="text-sm font-black text-[var(--text-primary)]">Quiet Music Tracks</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Increase the gain of old vinyl rips, acoustic demos, and quiet MP3s.</p>
          </div>
          <div className="glass-panel rounded-2xl p-5 space-y-2">
            <Sparkles className="w-6 h-6 text-emerald-500" />
            <h3 className="text-sm font-black text-[var(--text-primary)]">Video Speech Audio</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Extract and amplify low-volume dialogue from YouTube or phone videos.</p>
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
              <span className="text-amber-500 font-black shrink-0">Q:</span>
              <span>How do I increase the volume of a quiet audio file?</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5">
              Upload your audio or video file, select your desired boost level (+25%, +50%, +100%, or +200%), and click &quot;Boost Volume&quot; to download the louder file.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-2 border border-[var(--border-color)]">
            <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-start gap-2">
              <span className="text-amber-500 font-black shrink-0">Q:</span>
              <span>Will boosting the volume cause distortion or clipping?</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5">
              Our engine applies professional audio soft-limiting and normalization to maximize loudness while preventing harsh clipping.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-2 border border-[var(--border-color)]">
            <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-start gap-2">
              <span className="text-amber-500 font-black shrink-0">Q:</span>
              <span>Can I boost the volume of WhatsApp voice notes and videos?</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5">
              Yes! Upload any .opus voice note, MP3, WAV, or MP4 video to boost quiet speech.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-2 border border-[var(--border-color)]">
            <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-start gap-2">
              <span className="text-amber-500 font-black shrink-0">Q:</span>
              <span>Is Volume Booster free to use?</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5">
              Yes, 100% free with unlimited boosts and no registration required.
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
          <Link href="/tools/audio-cutter" className="glass-panel rounded-xl p-3 border border-[var(--border-color)] hover:border-amber-500/40 text-xs font-bold text-[var(--text-primary)] flex items-center justify-between group">
            <span className="group-hover:text-amber-500 transition-colors">Audio Cutter</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link href="/tools/audio-joiner" className="glass-panel rounded-xl p-3 border border-[var(--border-color)] hover:border-amber-500/40 text-xs font-bold text-[var(--text-primary)] flex items-center justify-between group">
            <span className="group-hover:text-amber-500 transition-colors">Audio Joiner</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link href="/tools/opus-to-mp3" className="glass-panel rounded-xl p-3 border border-[var(--border-color)] hover:border-amber-500/40 text-xs font-bold text-[var(--text-primary)] flex items-center justify-between group">
            <span className="group-hover:text-amber-500 transition-colors">OPUS to MP3</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link href="/tools/mp4-to-mp3" className="glass-panel rounded-xl p-3 border border-[var(--border-color)] hover:border-amber-500/40 text-xs font-bold text-[var(--text-primary)] flex items-center justify-between group">
            <span className="group-hover:text-amber-500 transition-colors">MP4 to MP3</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </section>
    </div>
  );
}
