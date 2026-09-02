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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-8 animate-in fade-in duration-300">
      
      {/* Full SEO Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs font-semibold text-[var(--text-secondary)]">
        <Link href="/" className="hover:text-[var(--iloveaudios-red)] transition-colors flex items-center gap-1">
          <span>Home</span>
        </Link>
        <span className="text-[var(--text-muted)] font-normal">/</span>
        <Link href="/#tools-suite" className="hover:text-[var(--iloveaudios-red)] transition-colors">
          {tool.category || 'Converters'}
        </Link>
        <span className="text-[var(--text-muted)] font-normal">/</span>
        <span className="text-[var(--text-primary)] font-bold truncate max-w-[220px] sm:max-w-none">
          {tool.title}
        </span>
      </nav>

      {/* Tool Header Details */}
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
          {tool.title}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Introduction BEFORE Converter */}
      {tool.introduction && (
        <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md">
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {tool.introduction}
          </p>
        </div>
      )}

      {/* Contextual Discovery Banner for Video Converters */}
      {tool.category === 'Video to Audio' && (
        <div className="p-3.5 sm:p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[var(--text-primary)]">
            <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
            <span>Looking for the song playing in this video? Identify the track, artist, and full lyrics instantly.</span>
          </div>
          <Link
            href="/tools/song-extractor"
            className="text-xs font-black text-blue-500 hover:text-blue-600 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Try AI Song Finder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Error Alert Box */}
      {errorMessage && (
        <div className="rounded-2xl p-4.5 border border-red-800/80 bg-red-950/90 text-red-100 shadow-2xl shadow-red-950/50 backdrop-blur-md flex items-start gap-3.5 animate-in fade-in">
          <div className="p-2 rounded-xl bg-red-900/60 border border-red-700/50 shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-300" />
          </div>
          <div className="flex-1 pt-0.5">
            <h4 className="text-sm font-bold text-red-100 tracking-wide">Upload or Conversion Error</h4>
            <p className="text-xs text-red-200/90 leading-relaxed mt-1">{errorMessage}</p>
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
          backendApiUrl={backendApiUrl}
        />
      )}

      {/* ========================================================================= */}
      {/* RICH CONTENT SECTIONS BELOW CONVERTER (SEO Optimized)                    */}
      {/* ========================================================================= */}

      {/* 1. How to Convert Section */}
      {tool.howTo && tool.howTo.length > 0 && (
        <section className="pt-10 border-t border-[var(--border-color)] space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-500">
              Step-by-Step Guide
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              How to Convert {tool.fromFormat || 'MP4'} to {tool.toFormat || 'MP3'} Online
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              To convert {tool.fromFormat || 'your file'} to {tool.toFormat || 'MP3'} online for free, upload your {tool.fromFormat || 'source'} file into the dropzone above, choose your preferred bitrate quality (up to 320kbps), and click Convert. Your converted {tool.toFormat || 'audio'} file will be ready for high-speed download in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tool.howTo.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-3 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center font-black text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-sm font-black text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
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
        <section className="space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-500">
              Use Cases & Benefits
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              {tool.whyConvert.title}
            </h2>
          </div>

          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-purple-500/20 bg-purple-500/5">
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {tool.whyConvert.description}
            </p>

            {tool.whyConvert.benefits && tool.whyConvert.benefits.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[var(--border-color)]">
                {tool.whyConvert.benefits.map((benefit, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <h4 className="text-xs font-bold text-[var(--text-primary)]">
                        {benefit.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed pl-6">
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
        <section className="space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500">
              Key Capabilities
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              {tool.title} Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tool.features.map((feat, idx) => {
              const IconComp = featureIcons[feat.icon] || Sparkles;
              return (
                <div key={idx} className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-black text-[var(--text-primary)]">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
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
        <section className="space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-500">
              Format Encyclopedia
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              About the Audio & Video Formats
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What is Source Format */}
            {sourceDef && (
              <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-4 border border-[var(--border-color)]">
                <div className="flex items-center justify-between gap-2 border-b border-[var(--border-color)] pb-3">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-purple-500">Source Format</span>
                    <h3 className="text-base font-black text-[var(--text-primary)]">What is {tool.fromFormat}?</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl text-[10px] font-black bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    {sourceDef.extension}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                  <p>{sourceDef.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] border-t border-[var(--border-color)]">
                  <div>
                    <span className="text-[var(--text-muted)] block text-[10px] uppercase font-bold">Developer</span>
                    <span className="font-semibold text-[var(--text-primary)]">{sourceDef.developer}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block text-[10px] uppercase font-bold">Release Year</span>
                    <span className="font-semibold text-[var(--text-primary)]">{sourceDef.year}</span>
                  </div>
                </div>
              </div>
            )}

            {/* What is Target Format */}
            {targetDef && (
              <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-4 border border-[var(--border-color)]">
                <div className="flex items-center justify-between gap-2 border-b border-[var(--border-color)] pb-3">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-emerald-500">Target Format</span>
                    <h3 className="text-base font-black text-[var(--text-primary)]">What is {tool.toFormat}?</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl text-[10px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {targetDef.extension}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                  <p>{targetDef.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] border-t border-[var(--border-color)]">
                  <div>
                    <span className="text-[var(--text-muted)] block text-[10px] uppercase font-bold">Developer</span>
                    <span className="font-semibold text-[var(--text-primary)]">{targetDef.developer}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block text-[10px] uppercase font-bold">Release Year</span>
                    <span className="font-semibold text-[var(--text-primary)]">{targetDef.year}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. Comparison Table */}
      {tool.comparison && (
        <section className="space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-500">
              Format Comparison
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              {tool.comparison.title}
            </h2>
            {tool.comparison.description && (
              <p className="text-xs text-[var(--text-secondary)]">
                {tool.comparison.description}
              </p>
            )}
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden border border-[var(--border-color)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--bg-card-hover)] border-b border-[var(--border-color)] text-[var(--text-primary)] font-black text-[11px] uppercase tracking-wider">
                  <tr>
                    {tool.comparison.headers.map((head, idx) => (
                      <th key={idx} className="px-4 py-3.5 sm:px-6">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)]">
                  {tool.comparison.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[var(--bg-card-hover)]/40 transition-colors">
                      <td className="px-4 py-3.5 sm:px-6 font-bold text-[var(--text-primary)] whitespace-nowrap">
                        {row.feature}
                      </td>
                      <td className="px-4 py-3.5 sm:px-6">
                        {row.format1}
                      </td>
                      <td className="px-4 py-3.5 sm:px-6 text-blue-600 dark:text-blue-400 font-medium">
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
        <section className="space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-500">
              Got Questions?
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tool.faq.map((item, idx) => (
              <div key={idx} className="glass-panel rounded-2xl p-5 space-y-2 border border-[var(--border-color)] hover:border-blue-500/30 transition-colors">
                <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-start gap-2">
                  <span className="text-blue-500 font-black shrink-0">Q:</span>
                  <span>{item.q}</span>
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5">
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
          <section className="space-y-4 pt-4 border-t border-[var(--border-color)]">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[var(--iloveaudios-red)] block">
                More {tool.toFormat} Converters
              </span>
              <h2 className="text-lg sm:text-xl font-black text-[var(--text-primary)] tracking-tight">
                Convert Other Files to {tool.toFormat}
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {toTargetTools.map((relTool) => (
                <Link
                  key={relTool.slug}
                  href={`/tools/${relTool.slug}`}
                  className="glass-panel rounded-xl p-3 border border-[var(--border-color)] hover:border-[var(--iloveaudios-red)]/40 hover:bg-[var(--bg-card-hover)] transition-all flex items-center justify-between text-xs font-bold text-[var(--text-primary)] group"
                >
                  <span className="group-hover:text-[var(--iloveaudios-red)] transition-colors">{relTool.shortTitle || relTool.title}</span>
                  <ArrowRight className="w-3 h-3 text-[var(--text-muted)] group-hover:text-[var(--iloveaudios-red)] group-hover:translate-x-0.5 transition-all shrink-0" />
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
          <section className="space-y-4 pt-2">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-500 block">
                More {tool.fromFormat} Converters
              </span>
              <h2 className="text-lg sm:text-xl font-black text-[var(--text-primary)] tracking-tight">
                Convert {tool.fromFormat} to Other Formats
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {fromSourceTools.map((relTool) => (
                <Link
                  key={relTool.slug}
                  href={`/tools/${relTool.slug}`}
                  className="glass-panel rounded-xl p-3 border border-[var(--border-color)] hover:border-blue-500/40 hover:bg-[var(--bg-card-hover)] transition-all flex items-center justify-between text-xs font-bold text-[var(--text-primary)] group"
                >
                  <span className="group-hover:text-blue-500 transition-colors">{relTool.shortTitle || relTool.title}</span>
                  <ArrowRight className="w-3 h-3 text-[var(--text-muted)] group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      {/* 9. Related Tools Section (including AI Song Finder) */}
      <section className="space-y-6 pt-4 border-t border-[var(--border-color)]">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">
            Explore More Audio Utilities
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            Related Audio Tools
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Song Finder Feature Card */}
          <Link href="/tools/song-extractor" className="group block h-full">
            <div className="h-full relative overflow-hidden glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between border-blue-500/30 bg-blue-500/5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-500">
                    AI POWERED
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-[var(--text-primary)] group-hover:text-blue-500 transition-colors">
                    Free AI Song Finder & Music Identifier
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
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
