'use client';

import React, { useState, useEffect } from 'react';
import FileDropzone from './FileDropzone';
import ConversionSettings from './ConversionSettings';
import ConversionProgress from './ConversionProgress';
import DownloadResult from './DownloadResult';
import ToolCard from './ToolCard';
import { TOOLS } from '@/lib/toolsConfig';
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
  AlertTriangle 
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

      {/* Introduction BEFORE Converter */}
      {tool.introduction && (
        <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md">
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {tool.introduction}
          </p>
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
          <div className="text-center sm:text-left space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-500">
              Step-by-Step Guide
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              How to Convert {tool.fromFormat || 'MP4'} to {tool.toFormat || 'MP3'}
            </h2>
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

      {/* 4. Comparison Table (MP4 vs MP3) */}
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

      {/* 5. Frequently Asked Questions Section */}
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

      {/* 6. Related Tools Section */}
      {tool.relatedTools && tool.relatedTools.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">
              Explore More Converters
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Related Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tool.relatedTools.map((slug) => {
              const relTool = TOOLS[slug];
              if (!relTool) return null;
              return (
                <ToolCard
                  key={relTool.slug}
                  title={relTool.title}
                  description={relTool.description}
                  href={relTool.isCustomPage ? `/tools/${relTool.slug}` : `/tools/${relTool.slug}`}
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
      )}
    </div>
  );
}
