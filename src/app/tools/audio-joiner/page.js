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
    <div className="site-container space-y-12 pb-16">
      {/* Header Section */}
      <div className="pt-8 pb-4 space-y-4">
        <h1 className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)]">
          Audio Joiner & Song Merger
        </h1>
        <p className="text-[length:var(--text-lead)] text-[var(--color-text-muted)] prose-measure leading-[var(--leading-body)]">
          Combine multiple MP3, WAV, and audio tracks into a seamless single file. Arrange songs in any order and download in seconds.
        </p>
      </div>

      {/* Main Container */}
      <div className="ui-card shadow-sm space-y-6">
        {step === 'upload' && (
          <div className="space-y-6">
            {/* File Dropzone / Add Button */}
            <div className="relative ui-dropzone flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-border)] hover:border-blue-500 rounded-3xl p-6 sm:p-8 text-center transition-colors bg-[var(--color-bg)]">
              <input
                type="file"
                multiple
                accept="audio/*"
                onChange={handleFilesAdded}
                aria-label="Choose audio files to merge"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-700 flex items-center justify-center">
                  <Upload className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-[1.5rem] font-bold text-[var(--color-text)]">
                    Choose Audio Files to Merge
                  </h3>
                  <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)]">
                    Select 2 or more MP3, WAV, M4A, FLAC, or audio tracks
                  </p>
                </div>
              </div>
            </div>

            {/* Track Listing */}
            {files.length > 0 && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="text-[length:var(--text-base)] font-bold text-[var(--color-text)]">
                    Tracks to Merge ({files.length})
                  </span>
                  <label className="min-h-[48px] py-[12px] px-[20px] rounded-xl text-[length:var(--text-base)] font-bold text-blue-700 hover:underline cursor-pointer flex items-center gap-2 border border-blue-500/20 bg-blue-500/5">
                    <Plus className="w-5 h-5" />
                    <span>Add More Files</span>
                    <input type="file" multiple accept="audio/*" onChange={handleFilesAdded} className="hidden" />
                  </label>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {files.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[length:var(--text-base)]"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-700 font-bold text-[length:var(--text-base)] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold text-[var(--color-text)] truncate">{f.name}</p>
                          <span className="text-[length:var(--text-base)] text-[var(--color-text-muted)]">
                            {(f.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => moveTrack(idx, -1)}
                          disabled={idx === 0}
                          aria-label={`Move ${f.name} up`}
                          className="min-w-[48px] min-h-[48px] rounded-xl border border-[var(--color-border)] hover:bg-black/5 disabled:opacity-30 cursor-pointer flex items-center justify-center"
                        >
                          <ArrowUp className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveTrack(idx, 1)}
                          disabled={idx === files.length - 1}
                          aria-label={`Move ${f.name} down`}
                          className="min-w-[48px] min-h-[48px] rounded-xl border border-[var(--color-border)] hover:bg-black/5 disabled:opacity-30 cursor-pointer flex items-center justify-center"
                        >
                          <ArrowDown className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeTrack(idx)}
                          aria-label={`Remove ${f.name}`}
                          className="min-w-[48px] min-h-[48px] rounded-xl text-red-600 hover:bg-red-500/10 border border-transparent cursor-pointer flex items-center justify-center"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Output Settings */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)]">
                  <span className="text-[length:var(--text-base)] font-bold text-[var(--color-text)]">Export Format:</span>
                  <div className="flex flex-wrap gap-3">
                    {['mp3', 'wav'].map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setOutputFormat(fmt)}
                        className={`ui-pill rounded-xl font-bold transition-colors cursor-pointer ${
                          outputFormat === fmt
                            ? 'bg-blue-600 text-white'
                            : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
                        }`}
                      >
                        {fmt.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Merge Action Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="ui-control w-full sm:w-auto rounded-xl border border-[var(--color-border)] hover:bg-black/5 font-bold text-[var(--color-text-muted)] cursor-pointer"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={handleMergeAudio}
                    disabled={files.length < 2}
                    className="ui-control w-full sm:w-auto rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <Layers className="w-5 h-5" />
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
          <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-[length:var(--text-base)] font-bold text-red-700 text-left">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Educational Guide (SEO Optimized) */}
      <section className="space-y-6 pt-8 border-t border-[var(--color-border)]">
        <div className="space-y-3">
          <span className="text-[length:var(--text-base)] font-bold text-blue-700 block">Step-by-Step Guide</span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            How to Combine & Merge Audio Tracks Online
          </h2>
          <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
            To combine and merge multiple audio tracks into a single file, upload two or more audio files into the merger above, arrange your preferred playback sequence, choose your export format (MP3 or WAV), and click Merge Tracks. Your continuous merged audio file is ready for download in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ui-card space-y-3">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center font-bold text-[length:var(--text-base)]">1</div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Upload Audio Files</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Select 2 or more MP3, WAV, M4A, or audio tracks to join together.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center font-bold text-[length:var(--text-base)]">2</div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Arrange Playback Order</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Use the up/down arrows to organize songs into your desired playlist sequence.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center font-bold text-[length:var(--text-base)]">3</div>
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Merge & Save</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">
              Click &quot;Merge Tracks&quot; to generate and download a single unified audio file.
            </p>
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-[length:var(--text-base)] font-bold text-purple-700 block">Applications</span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)]">
            Popular Audio Joining Use Cases
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="ui-card space-y-3">
            <Disc className="w-7 h-7 text-blue-600" />
            <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">Music Mixes & Medleys</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">Combine songs into a continuous dance mixtape or workout soundtrack.</p>
          </div>
          <div className="ui-card space-y-3">
            <Radio className="w-7 h-7 text-purple-600" />
            <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">Podcast Production</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">Stitch intro jingles, podcast episodes, and sponsor messages together.</p>
          </div>
          <div className="ui-card space-y-3">
            <Music2 className="w-7 h-7 text-emerald-600" />
            <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">Audiobook Chapters</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">Combine multi-part voice chapters into a single uninterrupted audiobook file.</p>
          </div>
          <div className="ui-card space-y-3">
            <Sparkles className="w-7 h-7 text-amber-600" />
            <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">Voice Note Compilation</h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure">Merge WhatsApp and phone voice memos into a single archival audio file.</p>
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
              <span className="text-blue-600 font-bold shrink-0">Q:</span>
              <span>How do I merge multiple songs into one file?</span>
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure pl-6">
              Upload 2 or more audio files, arrange them in your preferred playback order, choose your output format (MP3 or WAV), and click &quot;Merge Audio&quot;.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)] flex items-start gap-2">
              <span className="text-blue-600 font-bold shrink-0">Q:</span>
              <span>Can I combine files of different formats (e.g. MP3 and WAV)?</span>
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure pl-6">
              Yes! Audio Joiner automatically decodes different audio formats and joins them into a unified output file.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)] flex items-start gap-2">
              <span className="text-blue-600 font-bold shrink-0">Q:</span>
              <span>How many tracks can I merge at once?</span>
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure pl-6">
              You can merge up to 20 tracks simultaneously for free.
            </p>
          </div>

          <div className="ui-card space-y-3">
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)] flex items-start gap-2">
              <span className="text-blue-600 font-bold shrink-0">Q:</span>
              <span>Is Audio Joiner free to use?</span>
            </h3>
            <p className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] prose-measure pl-6">
              Yes, 100% free with no limits on the number of merged files.
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
          <Link href="/tools/audio-cutter" className="tool-card min-h-[48px] py-[12px] px-[20px] hover:border-blue-500/40 text-[length:var(--text-base)] font-bold text-[var(--color-text)] flex items-center justify-between group">
            <span className="group-hover:text-blue-700 transition-colors">Audio Cutter</span>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-blue-700 transition-colors shrink-0" />
          </Link>
          <Link href="/tools/volume-booster" className="tool-card min-h-[48px] py-[12px] px-[20px] hover:border-blue-500/40 text-[length:var(--text-base)] font-bold text-[var(--color-text)] flex items-center justify-between group">
            <span className="group-hover:text-blue-700 transition-colors">Volume Booster</span>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-blue-700 transition-colors shrink-0" />
          </Link>
          <Link href="/tools/mp4-to-mp3" className="tool-card min-h-[48px] py-[12px] px-[20px] hover:border-blue-500/40 text-[length:var(--text-base)] font-bold text-[var(--color-text)] flex items-center justify-between group">
            <span className="group-hover:text-blue-700 transition-colors">MP4 to MP3</span>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-blue-700 transition-colors shrink-0" />
          </Link>
          <Link href="/tools/wav-to-mp3" className="tool-card min-h-[48px] py-[12px] px-[20px] hover:border-blue-500/40 text-[length:var(--text-base)] font-bold text-[var(--color-text)] flex items-center justify-between group">
            <span className="group-hover:text-blue-700 transition-colors">WAV to MP3</span>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-blue-700 transition-colors shrink-0" />
          </Link>
        </div>
      </section>
    </div>
  );
}
