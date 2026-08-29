'use client';

import React, { useState } from 'react';
import ConversionProgress from '@/components/ConversionProgress';
import DownloadResult from '@/components/DownloadResult';
import { 
  Layers, 
  Upload, 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Plus, 
  Music2, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Disc,
  Radio
} from 'lucide-react';
import Link from 'next/link';

export default function AudioJoinerPage() {
  const [files, setFiles] = useState([]);
  const [outputFormat, setOutputFormat] = useState('mp3');
  const [step, setStep] = useState('upload'); // upload | converting | completed
  const [progress, setProgress] = useState(0);
  const [jobId, setJobId] = useState(null);
  const [convertedFileName, setConvertedFileName] = useState('');
  const [fileSize, setFileSize] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFilesAdded = (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length > 0) {
      setFiles((prev) => [...prev, ...selected]);
    }
  };

  const moveTrack = (index, direction) => {
    const newFiles = [...files];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newFiles.length) return;
    const [moved] = newFiles.splice(index, 1);
    newFiles.splice(targetIndex, 0, moved);
    setFiles(newFiles);
  };

  const removeTrack = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMergeAudio = async () => {
    if (files.length < 2) {
      setErrorMessage('Please add at least 2 audio files to merge.');
      return;
    }

    setStep('converting');
    setProgress(10);
    setErrorMessage(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || (typeof window !== 'undefined' && !window.location.hostname.includes('localhost') ? 'https://audiolab-dc5o.onrender.com' : '');
      const uploadUrl = backendUrl ? `${backendUrl}/api/upload` : '/api/upload';

      // 1. Upload all files sequentially / in parallel
      const fileIds = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);
        const res = await fetch(uploadUrl, { method: 'POST', body: formData });
        if (!res.ok) throw new Error(`Failed to upload ${files[i].name}`);
        const data = await res.json();
        fileIds.push(data.file_id);
        setProgress(10 + Math.floor(((i + 1) / files.length) * 40));
      }

      // 2. Call Merge API
      const mergeUrl = backendUrl ? `${backendUrl}/api/merge` : '/api/merge';
      const mergeRes = await fetch(mergeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file_ids: fileIds,
          output_format: outputFormat,
          options: { bitrate: '320k' }
        })
      });

      if (!mergeRes.ok) throw new Error('Audio merge processing failed');
      const mergeData = await mergeRes.json();
      const currentJobId = mergeData.job_id;
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
            setConvertedFileName(statusData.result?.output_filename || `merged_tracks.${outputFormat}`);
            setFileSize(statusData.result?.file_size || 0);
            setStep('completed');
          } else if (statusData.status === 'failed') {
            clearInterval(pollInterval);
            throw new Error(statusData.error || 'Audio merge processing failed');
          }
        } catch (pollErr) {
          clearInterval(pollInterval);
          setErrorMessage(pollErr.message);
          setStep('upload');
        }
      }, 1000);

    } catch (err) {
      setErrorMessage(err.message || 'Error occurred while merging audio files');
      setStep('upload');
    }
  };

  const handleReset = () => {
    setFiles([]);
    setStep('upload');
    setProgress(0);
    setJobId(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 pb-16 px-4">
      {/* Header Section */}
      <div className="pt-8 pb-4 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold">
          <Layers className="w-3.5 h-3.5" />
          <span>Free Audio Tool</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">
          Audio Joiner & Song Merger
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Combine multiple MP3, WAV, and audio tracks into a seamless single file. Arrange songs in any order and download in seconds.
        </p>
      </div>

      {/* Main Container */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] shadow-xl space-y-6">
        {step === 'upload' && (
          <div className="space-y-6">
            {/* File Dropzone / Add Button */}
            <div className="relative border-2 border-dashed border-[var(--border-color)] hover:border-blue-500 rounded-3xl p-8 text-center transition-colors bg-[var(--bg-card-hover)]/30">
              <input
                type="file"
                multiple
                accept="audio/*"
                onChange={handleFilesAdded}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-[var(--text-primary)]">
                    Choose Audio Files to Merge
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Select 2 or more MP3, WAV, M4A, FLAC, or audio tracks
                  </p>
                </div>
              </div>
            </div>

            {/* Track Listing */}
            {files.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                    Tracks to Merge ({files.length})
                  </span>
                  <label className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add More Files</span>
                    <input type="file" multiple accept="audio/*" onChange={handleFilesAdded} className="hidden" />
                  </label>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {files.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-main)] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-black text-[11px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold text-[var(--text-primary)] truncate">{f.name}</p>
                          <span className="text-[10px] text-[var(--text-muted)]">
                            {(f.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => moveTrack(idx, -1)}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg border border-[var(--border-color)] hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveTrack(idx, 1)}
                          disabled={idx === files.length - 1}
                          className="p-1.5 rounded-lg border border-[var(--border-color)] hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeTrack(idx)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 border border-transparent cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Output Settings */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--bg-card-hover)] border border-[var(--border-color)]">
                  <span className="text-xs font-bold text-[var(--text-primary)]">Export Format:</span>
                  <div className="flex gap-2">
                    {['mp3', 'wav'].map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setOutputFormat(fmt)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-extrabold uppercase transition-colors cursor-pointer ${
                          outputFormat === fmt
                            ? 'bg-blue-600 text-white'
                            : 'bg-[var(--bg-main)] text-[var(--text-secondary)] border border-[var(--border-color)]'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Merge Action Button */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-3 rounded-xl border border-[var(--border-color)] hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold text-[var(--text-secondary)] cursor-pointer"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={handleMergeAudio}
                    disabled={files.length < 2}
                    className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg hover:shadow-blue-500/25 transition-all cursor-pointer"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Merge {files.length} Tracks</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'converting' && (
          <ConversionProgress
            progress={progress}
            status="converting"
            fromFormat={`${files.length} TRACKS`}
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
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-500">Step-by-Step Guide</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            How to Combine & Merge Audio Tracks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-sm">1</div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Upload Audio Files</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Select 2 or more MP3, WAV, M4A, or audio tracks to join together.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-sm">2</div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Arrange Playback Order</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Use the up/down arrows to organize songs into your desired playlist sequence.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-sm">3</div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Merge & Save</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Click "Merge Tracks" to generate and download a single unified audio file.
            </p>
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-500">Applications</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Popular Audio Joining Use Cases
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel rounded-2xl p-5 space-y-2">
            <Disc className="w-6 h-6 text-blue-500" />
            <h3 className="text-sm font-black text-[var(--text-primary)]">Music Mixes & Medleys</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Combine songs into a continuous dance mixtape or workout soundtrack.</p>
          </div>
          <div className="glass-panel rounded-2xl p-5 space-y-2">
            <Radio className="w-6 h-6 text-purple-500" />
            <h3 className="text-sm font-black text-[var(--text-primary)]">Podcast Production</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Stitch intro jingles, podcast episodes, and sponsor messages together.</p>
          </div>
          <div className="glass-panel rounded-2xl p-5 space-y-2">
            <Music2 className="w-6 h-6 text-emerald-500" />
            <h3 className="text-sm font-black text-[var(--text-primary)]">Audiobook Chapters</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Combine multi-part voice chapters into a single uninterrupted audiobook file.</p>
          </div>
          <div className="glass-panel rounded-2xl p-5 space-y-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            <h3 className="text-sm font-black text-[var(--text-primary)]">Voice Note Compilation</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Merge WhatsApp and phone voice memos into a single archival audio file.</p>
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
              <span className="text-blue-500 font-black shrink-0">Q:</span>
              <span>How do I merge multiple songs into one file?</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5">
              Upload 2 or more audio files, arrange them in your preferred playback order, choose your output format (MP3 or WAV), and click "Merge Audio".
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-2 border border-[var(--border-color)]">
            <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-start gap-2">
              <span className="text-blue-500 font-black shrink-0">Q:</span>
              <span>Can I combine files of different formats (e.g. MP3 and WAV)?</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5">
              Yes! Audio Joiner automatically decodes different audio formats and joins them into a unified output file.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-2 border border-[var(--border-color)]">
            <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-start gap-2">
              <span className="text-blue-500 font-black shrink-0">Q:</span>
              <span>How many tracks can I merge at once?</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5">
              You can merge up to 20 tracks simultaneously for free.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-2 border border-[var(--border-color)]">
            <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-start gap-2">
              <span className="text-blue-500 font-black shrink-0">Q:</span>
              <span>Is Audio Joiner free to use?</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5">
              Yes, 100% free with no limits on the number of merged files.
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
          <Link href="/tools/audio-cutter" className="glass-panel rounded-xl p-3 border border-[var(--border-color)] hover:border-blue-500/40 text-xs font-bold text-[var(--text-primary)] flex items-center justify-between group">
            <span className="group-hover:text-blue-500 transition-colors">Audio Cutter</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link href="/tools/volume-booster" className="glass-panel rounded-xl p-3 border border-[var(--border-color)] hover:border-blue-500/40 text-xs font-bold text-[var(--text-primary)] flex items-center justify-between group">
            <span className="group-hover:text-blue-500 transition-colors">Volume Booster</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link href="/tools/mp4-to-mp3" className="glass-panel rounded-xl p-3 border border-[var(--border-color)] hover:border-blue-500/40 text-xs font-bold text-[var(--text-primary)] flex items-center justify-between group">
            <span className="group-hover:text-blue-500 transition-colors">MP4 to MP3</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link href="/tools/wav-to-mp3" className="glass-panel rounded-xl p-3 border border-[var(--border-color)] hover:border-blue-500/40 text-xs font-bold text-[var(--text-primary)] flex items-center justify-between group">
            <span className="group-hover:text-blue-500 transition-colors">WAV to MP3</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </section>
    </div>
  );
}
