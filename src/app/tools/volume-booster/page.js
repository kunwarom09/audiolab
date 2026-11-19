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
    <div className="site-container space-y-12 pb-16">
      {/* Header Section */}
      <div className="pt-8 pb-4 space-y-4">
        <h1 className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)]">
          Audio Volume Booster & Amplifier
        </h1>
        <p className="text-[length:var(--text-lead)] text-[var(--color-text-muted)] prose-measure leading-[var(--leading-body)]">
          Make quiet MP3 songs, voice recordings, and video audio up to 200% louder online. Professional anti-distortion soft limiting included.
        </p>
      </div>

      {/* Main Container */}
      <div className="ui-card shadow-sm space-y-6">
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
            <div className="p-6 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[length:var(--text-base)] font-bold text-[var(--color-text-muted)] block">Selected File</span>
                <p className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">{file.name}</p>
              </div>
              <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-text-muted)]">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
            </div>

            {/* Volume Boost Selector */}
            <div className="space-y-4">
              <label className="text-[length:var(--text-base)] font-bold text-[var(--color-text)] block">
                Choose Volume Boost Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {boostOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setBoostLevel(opt.value)}
                    className={`min-h-[52px] p-6 rounded-2xl border text-left transition-colors cursor-pointer ${
                      boostLevel === opt.value
                        ? 'border-amber-600 bg-amber-500/10 text-amber-800 font-bold shadow-sm'
                        : 'border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-black/5 text-[var(--color-text)]'
                    }`}
                  >
                    <span className="block text-[length:var(--text-lead)] font-bold">{opt.label}</span>
                    <span className="block text-[length:var(--text-base)] text-[var(--color-text-muted)] font-normal mt-2 leading-[var(--leading-body)]">
                      {opt.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Output Format Settings */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)]">
              <span className="text-[length:var(--text-base)] font-bold text-[var(--color-text)]">Output Format:</span>
              <div className="flex flex-wrap gap-3">
                {['mp3', 'wav', 'm4a'].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setOutputFormat(fmt)}
                    className={`ui-pill rounded-xl font-bold transition-colors cursor-pointer ${
                      outputFormat === fmt
                        ? 'bg-amber-600 text-white'
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
                className="ui-control w-full sm:w-auto rounded-xl border border-[var(--color-border)] hover:bg-black/5 font-bold text-[var(--color-text-muted)] cursor-pointer"
              >
                Choose Another File
              </button>
              <button
                type="button"
                onClick={handleBoostVolume}
                className="ui-control w-full sm:w-auto rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
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
          <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-[length:var(--text-base)] font-bold text-red-700 text-left">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Educational Guide (SEO Optimized) */}
      <section className="space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="space-y-3">
          <span className="text-[length:var(--text-base)] font-bold text-amber-700 block">Step-by-Step Guide</span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            How to Make Audio & Videos Louder Online
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            To boost the volume of a quiet audio or video file online for free, upload your MP3, WAV, M4A, or MP4 file into the booster above, choose your boost multiplier (+25% to +200%), and click Boost Volume Now. Our smart audio limiter maximizes gain without distortion, delivering a louder, clearer file in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ui-card space-y-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-[length:var(--text-base)]">1</div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Upload Audio or Video</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Select your quiet MP3, WAV, OPUS voice note, or MP4 video file.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-[length:var(--text-base)]">2</div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Select Boost Multiplier</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Choose your desired amplification level from +25% up to +200% (3x volume).
            </p>
          </div>

          <div className="ui-card space-y-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-[length:var(--text-base)]">3</div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Download Louder Track</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Click &quot;Boost Volume Now&quot; to download your enhanced, crystal-clear audio file.
            </p>
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-[length:var(--text-base)] font-bold text-purple-700 block">Use Cases</span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Popular Volume Boosting Use Cases
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="ui-card space-y-3">
            <Smartphone className="w-7 h-7 text-amber-600" />
            <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">WhatsApp Voice Notes</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">Amplify quiet WhatsApp voice notes recorded far away from the microphone.</p>
          </div>
          <div className="ui-card space-y-3">
            <Mic className="w-7 h-7 text-blue-600" />
            <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">Podcast Interviews</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">Boost quiet guest microphone feeds to match the host&apos;s loudness level.</p>
          </div>
          <div className="ui-card space-y-3">
            <Headphones className="w-7 h-7 text-purple-600" />
            <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">Quiet Music Tracks</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">Increase the gain of old vinyl rips, acoustic demos, and quiet MP3s.</p>
          </div>
          <div className="ui-card space-y-3">
            <Sparkles className="w-7 h-7 text-emerald-600" />
            <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">Video Speech Audio</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">Extract and amplify low-volume dialogue from YouTube or phone videos.</p>
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
              <span className="text-amber-600 font-bold shrink-0">Q:</span>
              <span>How do I increase the volume of a quiet audio file?</span>
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure pl-6">
              Upload your audio or video file, select your desired boost level (+25%, +50%, +100%, or +200%), and click &quot;Boost Volume&quot; to download the louder file.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)] flex items-start gap-2">
              <span className="text-amber-600 font-bold shrink-0">Q:</span>
              <span>Will boosting the volume cause distortion or clipping?</span>
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure pl-6">
              Our engine applies professional audio soft-limiting and normalization to maximize loudness while preventing harsh clipping.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)] flex items-start gap-2">
              <span className="text-amber-600 font-bold shrink-0">Q:</span>
              <span>Can I boost the volume of WhatsApp voice notes and videos?</span>
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure pl-6">
              Yes! Upload any .opus voice note, MP3, WAV, or MP4 video to boost quiet speech.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)] flex items-start gap-2">
              <span className="text-amber-600 font-bold shrink-0">Q:</span>
              <span>Is Volume Booster free to use?</span>
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure pl-6">
              Yes, 100% free with unlimited boosts and no registration required.
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/tools/audio-cutter" className="tool-card min-h-[48px] py-[12px] px-[20px] hover:border-amber-500/40 text-[length:var(--text-base)] font-bold text-[var(--color-text)] flex items-center justify-between group">
            <span className="group-hover:text-amber-700 transition-colors">Audio Cutter</span>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-amber-700 transition-colors shrink-0" />
          </Link>
          <Link href="/tools/audio-joiner" className="tool-card min-h-[48px] py-[12px] px-[20px] hover:border-amber-500/40 text-[length:var(--text-base)] font-bold text-[var(--color-text)] flex items-center justify-between group">
            <span className="group-hover:text-amber-700 transition-colors">Audio Joiner</span>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-amber-700 transition-colors shrink-0" />
          </Link>
          <Link href="/tools/opus-to-mp3" className="tool-card min-h-[48px] py-[12px] px-[20px] hover:border-amber-500/40 text-[length:var(--text-base)] font-bold text-[var(--color-text)] flex items-center justify-between group">
            <span className="group-hover:text-amber-700 transition-colors">OPUS to MP3</span>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-amber-700 transition-colors shrink-0" />
          </Link>
          <Link href="/tools/mp4-to-mp3" className="tool-card min-h-[48px] py-[12px] px-[20px] hover:border-amber-500/40 text-[length:var(--text-base)] font-bold text-[var(--color-text)] flex items-center justify-between group">
            <span className="group-hover:text-amber-700 transition-colors">MP4 to MP3</span>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-amber-700 transition-colors shrink-0" />
          </Link>
        </div>
      </section>
    </div>
  );
}
