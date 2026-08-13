'use client';

import React, { useState, useEffect } from 'react';
import FileDropzone from './FileDropzone';
import ConversionSettings from './ConversionSettings';
import ConversionProgress from './ConversionProgress';
import DownloadResult from './DownloadResult';
import { ArrowLeft, Play, Disc } from 'lucide-react';
import Link from 'next/link';

export default function ConverterPageClient({ tool }) {
  const [step, setStep] = useState('upload'); // upload | settings | converting | completed
  const [file, setFile] = useState(null);
  const [settings, setSettings] = useState({
    bitrate: '192k',
    sampleRate: '44100',
    channels: 'stereo',
    normalize: false,
    preserveMetadata: true
  });
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('uploading'); // uploading | analyzing | converting | saving | completed
  const [jobId, setJobId] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [convertedFileName, setConvertedFileName] = useState('');

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setStep('settings');
  };

  const handleStartConversion = async () => {
    if (!file) return;

    setStep('converting');
    setProgress(5);
    setStatus('uploading');

    try {
      // 1. Upload File
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!uploadRes.ok) {
        throw new Error('File upload failed. Please try again.');
      }

      const uploadData = await uploadRes.json();
      const fileId = uploadData.file_id;
      
      setProgress(30);
      setStatus('analyzing');
      await new Promise(r => setTimeout(r, 1000)); // Smooth transition

      // 2. Start Conversion
      setProgress(40);
      setStatus('converting');
      
      const convertRes = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file_id: fileId,
          output_format: tool.toFormat.toLowerCase(),
          options: {
            bitrate: settings.bitrate,
            sample_rate: settings.sampleRate,
            channels: settings.channels,
            normalize: settings.normalize,
            preserve_metadata: settings.preserveMetadata
          }
        })
      });

      if (!convertRes.ok) {
        const errorData = await convertRes.json();
        throw new Error(errorData.error || 'Conversion initiation failed.');
      }

      const convertData = await convertRes.json();
      const jobUUID = convertData.job_id;
      setJobId(jobUUID);

      // 3. Poll status
      let attempts = 0;
      const maxAttempts = 120; // 2 minutes timeout
      
      const poll = setInterval(async () => {
        attempts++;
        if (attempts > maxAttempts) {
          clearInterval(poll);
          throw new Error('Conversion timed out.');
        }

        try {
          const statusRes = await fetch(`/api/convert/jobs/${jobUUID}`);
          if (!statusRes.ok) return;

          const statusData = await statusRes.json();
          
          if (statusData.status === 'completed' && statusData.result) {
            clearInterval(poll);
            setProgress(90);
            setStatus('saving');
            setFileSize(statusData.result.file_size);
            const outputName = statusData.result.output_filename || `${file.name.split('.')[0]}.${tool.toFormat.toLowerCase()}`;
            setConvertedFileName(outputName);
            
            // Save to conversion history via custom layout event
            const historyItem = {
              jobId: jobUUID,
              fileName: file.name,
              fromFormat: tool.fromFormat,
              toFormat: tool.toFormat,
              timestamp: Date.now()
            };
            const historyEvent = new CustomEvent('addConversionHistory', { detail: historyItem });
            window.dispatchEvent(historyEvent);

            setTimeout(() => {
              setProgress(100);
              setStatus('completed');
              setStep('completed');
            }, 800);
          } else if (statusData.status === 'failed') {
            clearInterval(poll);
            throw new Error(statusData.error || 'FFmpeg conversion processing failed.');
          } else if (statusData.status === 'processing') {
            // Scale progress between 50% and 85% based on elapsed polls
            const calculatedProgress = Math.min(85, 50 + Math.floor((attempts / 15) * 10));
            setProgress(calculatedProgress);
          }
        } catch (pollErr) {
          console.error('Polling error:', pollErr);
        }
      }, 1500);

    } catch (err) {
      console.error(err);
      alert(err.message || 'An error occurred during conversion.');
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-8 animate-in fade-in duration-300">
      
      {/* Back breadcrumb navigation */}
      <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
        <Link href="/" className="hover:text-[#0088ff] flex items-center gap-1.5 cursor-pointer">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Tools</span>
        </Link>
      </div>

      {/* Tool Header Details */}
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
          {tool.title}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Steps Handler */}
      {step === 'upload' && (
        <FileDropzone
          fromFormat={tool.fromFormat}
          onFileSelect={handleFileSelect}
          acceptedFormats={tool.acceptedMimes}
        />
      )}

      {step === 'settings' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
          {/* Selected File Overview Card */}
          <div className="glass-panel rounded-3xl p-5 flex items-center gap-4 border border-blue-500/20 bg-blue-500/5">
            <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shrink-0">
              <Disc className="w-6 h-6 animate-spin-slow" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-black uppercase tracking-wider text-blue-500">Selected Source File</span>
              <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate" title={file.name}>
                {file.name}
              </h4>
            </div>
          </div>

          <ConversionSettings
            toFormat={tool.toFormat}
            settings={settings}
            onChange={setSettings}
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs text-[var(--text-secondary)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] transition-all cursor-pointer text-center"
            >
              Cancel & Choose Different File
            </button>
            
            <button
              onClick={handleStartConversion}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-white btn-shazam flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Play className="w-4 h-4 fill-current translate-x-0.5" />
              <span>Convert File to {tool.toFormat}</span>
            </button>
          </div>
        </div>
      )}

      {step === 'converting' && (
        <ConversionProgress
          progress={progress}
          status={status}
          fileName={file.name}
          fromFormat={tool.fromFormat}
          toFormat={tool.toFormat}
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

      {/* Tool-specific FAQ items at the bottom */}
      {step === 'upload' && tool.faq && tool.faq.length > 0 && (
        <div className="pt-12 border-t border-[var(--border-color)] space-y-6">
          <h2 className="text-lg font-black text-[var(--text-primary)] tracking-tight text-center sm:text-left">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tool.faq.map((item, idx) => (
              <div key={idx} className="glass-panel rounded-2xl p-5 space-y-2">
                <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                  {item.q}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
