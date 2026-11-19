'use client';

import React, { useState, useEffect } from 'react';
import FileDropzone from './FileDropzone';
import ConversionSettings from './ConversionSettings';
import ConversionProgress from './ConversionProgress';
import DownloadResult from './DownloadResult';
import ToolCard from './ToolCard';
import { TOOLS, FORMAT_DEFINITIONS } from '@/lib/toolsConfig';
import { 
  ArrowLeft, 
  Play, 
  Disc, 
  Sparkles, 
  Zap, 
  Globe, 
  ShieldCheck, 
  Sliders, 
  Smartphone, 
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const featureIcons = {
  Sparkles,
  Zap,
  Globe,
  ShieldCheck,
  Sliders,
  Smartphone
};

export default function ConverterPageClient({ tool, backendApiUrl }) {
  const sourceDef = tool?.fromFormat ? FORMAT_DEFINITIONS[tool.fromFormat] : null;
  const targetDef = tool?.toFormat ? FORMAT_DEFINITIONS[tool.toFormat] : null;

  const [step, setStep] = useState('upload'); // upload | settings | converting | completed
  const [file, setFile] = useState(null);
  const [settings, setSettings] = useState({
    bitrate: '192',
    sampleRate: '44100',
    channels: '2',
    normalize: false,
    preserveMetadata: true
  });
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('uploading'); // uploading | analyzing | converting | saving | completed
  const [jobId, setJobId] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [convertedFileName, setConvertedFileName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const getBackendUrl = (path) => {
    const base = backendApiUrl 
      || process.env.NEXT_PUBLIC_BACKEND_API_URL 
      || (typeof window !== 'undefined' && !window.location.hostname.includes('localhost') ? 'https://audiolab-dc5o.onrender.com' : '');
    
    if (base) {
      return `${base.replace(/\/$/, '')}${path}`;
    }
    return path;
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setErrorMessage(null);
    setStep('settings');
  };

  const uploadFileWithProgress = (fileToUpload, onProgress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('file', fileToUpload);

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          onProgress(percentComplete);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } catch {
            reject(new Error('Invalid upload response from server.'));
          }
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText);
            reject(new Error(errorData.error || errorData.detail || `Upload failed with status ${xhr.status}`));
          } catch {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during file upload. Please ensure file is within 500MB and try again.'));
      });

      xhr.addEventListener('abort', () => {
        reject(new Error('File upload was aborted.'));
      });

      xhr.open('POST', getBackendUrl('/api/upload'));
      xhr.send(formData);
    });
  };

  const handleStartConversion = async () => {
    if (!file) return;

    setStep('converting');
    setProgress(5);
    setStatus('uploading');
    setErrorMessage(null);

    try {
      // 1. Upload File with live percentage progress (0% - 40% of conversion bar)
      const uploadData = await uploadFileWithProgress(file, (percent) => {
        const scaledProgress = Math.max(5, Math.min(40, Math.round((percent / 100) * 40)));
        setProgress(scaledProgress);
      });

      const fileId = uploadData.file_id;
      
      setProgress(45);
      setStatus('analyzing');
      await new Promise(r => setTimeout(r, 600));

      // 2. Start Conversion
      setProgress(55);
      setStatus('converting');
      
      const convertRes = await fetch(getBackendUrl('/api/convert'), {
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
        const errorData = await convertRes.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.detail || 'Conversion initiation failed.');
      }

      const convertData = await convertRes.json();
      const jobUUID = convertData.job_id;
      setJobId(jobUUID);

      // 3. Poll status
      let attempts = 0;
      const maxAttempts = 180; // 4.5 minutes timeout
      
      const poll = setInterval(async () => {
        attempts++;
        if (attempts > maxAttempts) {
          clearInterval(poll);
          throw new Error('Conversion timed out. The file might be too long to process.');
        }

        try {
          const statusRes = await fetch(getBackendUrl(`/api/convert/jobs/${jobUUID}`));
          if (!statusRes.ok) return;

          const statusData = await statusRes.json();
          
          if (statusData.status === 'completed' && statusData.result) {
            clearInterval(poll);
            setProgress(92);
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
            }, 600);
          } else if (statusData.status === 'failed') {
            clearInterval(poll);
            throw new Error(statusData.error || 'FFmpeg conversion processing failed.');
          } else if (statusData.status === 'processing') {
            // Scale progress smoothly between 55% and 88%
            const calculatedProgress = Math.min(88, 55 + Math.floor((attempts / 15) * 8));
            setProgress(calculatedProgress);
          }
        } catch (pollErr) {
          console.error('Polling error:', pollErr);
        }
      }, 1500);

    } catch (err) {
      console.error('Conversion flow error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred during conversion.');
      setStep('settings');
    }
  };

  const handleReset = () => {
    setFile(null);
    setStep('upload');
    setProgress(0);
    setJobId(null);
    setErrorMessage(null);
  };

  return (
    <div className="site-container py-10 md:py-16 space-y-10">
      
      {/* Full SEO Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-[length:var(--text-base)] font-semibold text-[var(--color-text-muted)]">
        <Link href="/" className="inline-flex items-center min-h-[48px] py-[12px] hover:text-[var(--color-brand)] transition-colors">
          <span>Home</span>
        </Link>
        <span className="text-[var(--color-text-muted)] font-normal">/</span>
        <Link 
          href={tool.toFormat === 'MP3' ? '/mp3-converter' : '/audio-converter'} 
          className="inline-flex items-center min-h-[48px] py-[12px] hover:text-[var(--color-brand)] transition-colors"
        >
          {tool.toFormat === 'MP3' ? 'MP3 Converter' : 'Audio Converter'}
        </Link>
        <span className="text-[var(--color-text-muted)] font-normal">/</span>
        <span className="text-[var(--color-text)] font-bold py-[12px]">
          {tool.title}
        </span>
      </nav>

      {/* Tool Header Details */}
      <div className="w-full space-y-3 text-left">
        <h1 className="text-[length:var(--text-h1)] font-bold text-[var(--color-text)] leading-[var(--leading-heading)]">
          {tool.title}
        </h1>
        <p className="prose-measure text-[length:var(--text-lead)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
          {tool.description}
        </p>
      </div>

      {/* Introduction BEFORE Converter */}
      {tool.introduction && (
        <div className="w-full ui-card">
          <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
            {tool.introduction}
          </p>
        </div>
      )}

      {/* Contextual Discovery Banner for Video Converters */}
      {tool.category === 'Video to Audio' && (
        <div className="w-full ui-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3 text-[length:var(--text-base)] text-[var(--color-text)]">
            <Sparkles className="w-6 h-6 text-[var(--color-brand)] shrink-0 mt-0.5 sm:mt-0" />
            <span className="prose-measure">Looking for the song playing in this video? Identify the track, artist, and full lyrics instantly.</span>
          </div>
          <Link
            href="/tools/song-extractor"
            className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] border border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-brand)] text-[length:var(--text-base)] font-bold text-[var(--color-brand)] flex items-center justify-center gap-2 shrink-0"
          >
            <span>Try AI Song Finder</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      )}

      {/* Error Alert Box */}
      {errorMessage && (
        <div className="w-full ui-card border-[var(--color-brand)] flex items-start gap-4 text-[var(--color-brand)]">
          <div className="p-2.5 rounded-[8px] bg-[var(--color-bg)] border border-[var(--color-border)] shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[length:var(--text-lead)] font-bold text-[var(--color-brand)]">Upload or Conversion Error</h4>
            <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-text)] leading-[var(--leading-body)] mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Steps Handler */}
      {step === 'upload' && (
        <FileDropzone
          fromFormat={tool.fromFormat}
          onFileSelect={handleFileSelect}
          acceptedFormats={tool.acceptedMimes}
        />
      )}

      {step === 'settings' && (
        <div className="w-full space-y-6">
          {/* Selected File Overview Card */}
          <div className="w-full ui-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-[12px] bg-[var(--color-brand)] text-white flex items-center justify-center shrink-0">
              <Disc className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-brand)] block">Selected Source File</span>
              <h4 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)] truncate" title={file.name}>
                {file.name}
              </h4>
            </div>
          </div>

          <ConversionSettings
            toFormat={tool.toFormat}
            settings={settings}
            onChange={setSettings}
          />

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] font-bold text-[length:var(--text-base)] text-[var(--color-text)] bg-[var(--color-surface)] hover:border-[var(--color-text)] border border-[var(--color-border)] transition-colors cursor-pointer text-center"
            >
              Cancel & Choose Different File
            </button>
            
            <button
              type="button"
              onClick={handleStartConversion}
              className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] font-bold text-[length:var(--text-base)] text-white btn-shazam flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
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
          backendApiUrl={backendApiUrl}
        />
      )}

      {/* ========================================================================= */}
      {/* RICH CONTENT SECTIONS BELOW CONVERTER (SEO Optimized)                    */}
      {/* ========================================================================= */}

      {/* 1. How to Convert Section */}
      {tool.howTo && tool.howTo.length > 0 && (
        <section className="w-full pt-10 border-t border-[var(--color-border)] space-y-6">
          <div className="text-left space-y-2">
            <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-brand)] block">
              Step-by-Step Guide
            </span>
            <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)] leading-[var(--leading-heading)]">
              How to Convert {tool.fromFormat || 'MP4'} to {tool.toFormat || 'MP3'} Online
            </h2>
            <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
              To convert {tool.fromFormat || 'your file'} to {tool.toFormat || 'MP3'} online for free, upload your {tool.fromFormat || 'source'} file into the dropzone above, choose your preferred bitrate quality (up to 320kbps), and click Convert. Your converted {tool.toFormat || 'audio'} file will be ready for high-speed download in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tool.howTo.map((item, idx) => (
              <div
                key={idx}
                className="w-full tool-card space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-[12px] bg-[var(--color-bg)] text-[var(--color-brand)] border border-[var(--color-border)] flex items-center justify-center font-bold text-[length:var(--text-base)]">
                    {idx + 1}
                  </div>
                  <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
                    {item.title}
                  </h3>
                  <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. Why Convert Section */}
      {tool.whyConvert && (
        <section className="w-full space-y-6">
          <div className="text-left space-y-2">
            <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-brand)] block">
              Use Cases & Benefits
            </span>
            <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)] leading-[var(--leading-heading)]">
              {tool.whyConvert.title}
            </h2>
          </div>

          <div className="w-full ui-card space-y-6">
            <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
              {tool.whyConvert.description}
            </p>

            {tool.whyConvert.benefits && tool.whyConvert.benefits.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[var(--color-border)]">
                {tool.whyConvert.benefits.map((benefit, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-2 text-[var(--color-brand)]">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <h4 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)]">
                        {benefit.title}
                      </h4>
                    </div>
                    <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. Features Grid Section */}
      {tool.features && tool.features.length > 0 && (
        <section className="w-full space-y-6">
          <div className="text-left space-y-2">
            <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-brand)] block">
              Key Capabilities
            </span>
            <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)] leading-[var(--leading-heading)]">
              {tool.title} Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tool.features.map((feat, idx) => {
              const IconComp = featureIcons[feat.icon] || Sparkles;
              return (
                <div key={idx} className="w-full tool-card space-y-3">
                  <div className="w-12 h-12 rounded-[12px] bg-[var(--color-bg)] text-[var(--color-brand)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
                    {feat.title}
                  </h3>
                  <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Format Encyclopedic Deep-Dives ("What is SOURCE?" & "What is TARGET?") */}
      {(sourceDef || targetDef) && (
        <section className="w-full space-y-6">
          <div className="text-left space-y-2">
            <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-brand)] block">
              Format Encyclopedia
            </span>
            <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)] leading-[var(--leading-heading)]">
              About the Audio & Video Formats
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What is Source Format */}
            {sourceDef && (
              <div className="w-full ui-card space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
                  <div>
                    <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-brand)] block">Source Format</span>
                    <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">What is {tool.fromFormat}?</h3>
                  </div>
                  <span className="px-[20px] py-[12px] rounded-full text-[length:var(--text-base)] font-bold bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-border)]">
                    {sourceDef.extension}
                  </span>
                </div>

                <div className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
                  <p className="prose-measure">{sourceDef.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 text-[length:var(--text-base)] border-t border-[var(--color-border)]">
                  <div>
                    <span className="text-[var(--color-text-muted)] block font-semibold">Developer</span>
                    <span className="font-semibold text-[var(--color-text)]">{sourceDef.developer}</span>
                  </div>
                  <div>
                    <span className="text-[var(--color-text-muted)] block font-semibold">Release Year</span>
                    <span className="font-semibold text-[var(--color-text)]">{sourceDef.year}</span>
                  </div>
                </div>
              </div>
            )}

            {/* What is Target Format */}
            {targetDef && (
              <div className="w-full ui-card space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
                  <div>
                    <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-brand)] block">Target Format</span>
                    <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">What is {tool.toFormat}?</h3>
                  </div>
                  <span className="px-[20px] py-[12px] rounded-full text-[length:var(--text-base)] font-bold bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-border)]">
                    {targetDef.extension}
                  </span>
                </div>

                <div className="text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
                  <p className="prose-measure">{targetDef.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 text-[length:var(--text-base)] border-t border-[var(--color-border)]">
                  <div>
                    <span className="text-[var(--color-text-muted)] block font-semibold">Developer</span>
                    <span className="font-semibold text-[var(--color-text)]">{targetDef.developer}</span>
                  </div>
                  <div>
                    <span className="text-[var(--color-text-muted)] block font-semibold">Release Year</span>
                    <span className="font-semibold text-[var(--color-text)]">{targetDef.year}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. Comparison Table */}
      {tool.comparison && (
        <section className="w-full space-y-6">
          <div className="text-left space-y-2">
            <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-brand)] block">
              Format Comparison
            </span>
            <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)] leading-[var(--leading-heading)]">
              {tool.comparison.title}
            </h2>
            {tool.comparison.description && (
              <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
                {tool.comparison.description}
              </p>
            )}
          </div>

          <div className="w-full glass-panel rounded-[16px] overflow-hidden border border-[var(--color-border)]">
            <div className="table-scroll">
              <table className="w-full text-left text-[length:var(--text-base)]">
                <thead className="bg-[var(--color-bg)] border-b border-[var(--color-border)] text-[var(--color-text)] font-bold">
                  <tr>
                    {tool.comparison.headers.map((head, idx) => (
                      <th key={idx} className="px-6 py-4 whitespace-nowrap">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-muted)]">
                  {tool.comparison.rows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 font-bold text-[var(--color-text)] whitespace-nowrap">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4">
                        {row.format1}
                      </td>
                      <td className="px-6 py-4 text-[var(--color-brand)] font-semibold">
                        {row.format2}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 6. Frequently Asked Questions Section */}
      {tool.faq && tool.faq.length > 0 && (
        <section className="w-full space-y-6">
          <div className="text-left space-y-2">
            <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-brand)] block">
              Got Questions?
            </span>
            <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)] leading-[var(--leading-heading)]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tool.faq.map((item, idx) => (
              <div key={idx} className="w-full ui-card space-y-3">
                <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)] flex items-start gap-2">
                  <span className="text-[var(--color-brand)] font-bold shrink-0">Q:</span>
                  <span>{item.q}</span>
                </h3>
                <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Convert other files to TARGET FORMAT */}
      {tool.toFormat && (() => {
        const toTargetTools = Object.values(TOOLS).filter(t => !t.isCustomPage && t.toFormat === tool.toFormat && t.slug !== tool.slug);
        if (toTargetTools.length === 0) return null;
        return (
          <section className="w-full space-y-5 pt-6 border-t border-[var(--color-border)]">
            <div className="space-y-2">
              <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-brand)] block">
                More {tool.toFormat} Converters
              </span>
              <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)] leading-[var(--leading-heading)]">
                Convert Other Files to {tool.toFormat}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {toTargetTools.map((relTool) => (
                <Link
                  key={relTool.slug}
                  href={`/tools/${relTool.slug}`}
                  className="tool-card min-h-[52px] py-[12px] px-[20px] flex items-center justify-between text-[length:var(--text-base)] font-bold text-[var(--color-text)] group"
                >
                  <span className="group-hover:text-[var(--color-brand)] transition-colors">{relTool.shortTitle || relTool.title}</span>
                  <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand)] shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      {/* 8. Convert SOURCE FORMAT to other formats */}
      {tool.fromFormat && (() => {
        const fromSourceTools = Object.values(TOOLS).filter(t => !t.isCustomPage && t.fromFormat === tool.fromFormat && t.slug !== tool.slug);
        if (fromSourceTools.length === 0) return null;
        return (
          <section className="w-full space-y-5 pt-4">
            <div className="space-y-2">
              <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-brand)] block">
                More {tool.fromFormat} Converters
              </span>
              <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)] leading-[var(--leading-heading)]">
                Convert {tool.fromFormat} to Other Formats
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {fromSourceTools.map((relTool) => (
                <Link
                  key={relTool.slug}
                  href={`/tools/${relTool.slug}`}
                  className="tool-card min-h-[52px] py-[12px] px-[20px] flex items-center justify-between text-[length:var(--text-base)] font-bold text-[var(--color-text)] group"
                >
                  <span className="group-hover:text-[var(--color-brand)] transition-colors">{relTool.shortTitle || relTool.title}</span>
                  <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand)] shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      {/* Hub Link-Back Banner */}
      <section className="w-full ui-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 text-left">
          <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
            {tool.toFormat === 'MP3' 
              ? 'Looking for more audio & video converters to MP3?'
              : 'Looking for more lossless & multi-format audio tools?'}
          </h3>
          <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-text-muted)]">
            {tool.toFormat === 'MP3'
              ? 'Visit our central MP3 Converter hub for all video and audio conversion options.'
              : 'Visit our complete Audio Converter directory to explore all supported codecs.'}
          </p>
        </div>
        <Link
          href={tool.toFormat === 'MP3' ? '/mp3-converter' : '/audio-converter'}
          className="w-full sm:w-auto min-h-[52px] px-[20px] rounded-[8px] text-[length:var(--text-base)] font-bold bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors shrink-0 flex items-center justify-center gap-2"
        >
          <span>{tool.toFormat === 'MP3' ? 'View MP3 Converter Hub' : 'View Audio Converter Hub'}</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* 9. Related Tools Section (including AI Song Finder) */}
      <section className="w-full space-y-6 pt-6 border-t border-[var(--color-border)]">
        <div className="text-left space-y-2">
          <span className="text-[length:var(--text-base)] font-semibold text-[var(--color-text-muted)] block">
            Explore More Audio Utilities
          </span>
          <h2 className="text-[length:var(--text-h2)] font-bold text-[var(--color-text)] leading-[var(--leading-heading)]">
            Related Audio Tools
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Song Finder Feature Card */}
          <Link href="/tools/song-extractor" className="group block h-full">
            <div className="h-full w-full tool-card p-6 sm:p-7 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 min-h-[48px]">
                  <div className="w-12 h-12 rounded-[12px] bg-[var(--color-brand)] text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[length:var(--text-base)] leading-none font-semibold bg-[var(--color-bg)] text-[var(--color-brand)] border border-[var(--color-border)] shrink-0">
                    AI Powered
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-[length:var(--text-lead)] font-bold text-[var(--color-text)] group-hover:text-[var(--color-brand)] leading-[var(--leading-heading)] transition-colors">
                    Free AI Song Finder & Music Identifier
                  </h3>
                  <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)]">
                    Identify background songs from Instagram Reels, TikTok, Facebook, and Snapchat with lyrics & MP3 download.
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {tool.relatedTools && tool.relatedTools.map((slug) => {
            const relTool = TOOLS[slug];
            if (!relTool || relTool.slug === 'song-extractor') return null;
            return (
              <ToolCard
                key={relTool.slug}
                title={relTool.title}
                description={relTool.description}
                href={`/tools/${relTool.slug}`}
                icon={relTool.icon}
                category={relTool.category}
                badge={relTool.badge}
                fromFormat={relTool.fromFormat}
                toFormat={relTool.toFormat}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
