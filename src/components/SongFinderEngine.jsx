'use client';

import React, { useState } from 'react';
import HeroCard from '@/components/HeroCard';
import ProgressTracker from '@/components/ProgressTracker';
import SongResultCard from '@/components/SongResultCard';
import FailedRecognitionCard from '@/components/FailedRecognitionCard';
import { useApp } from '@/components/AppClientWrapper';

export default function SongFinderEngine({
  title = 'Song Finder',
  subtitle = 'Paste a video link, upload an audio or video file (up to 100 MB), or record with your microphone.',
  initialTab = 'link',
  linkPlaceholder,
  children,
}) {
  const { history, setHistory } = useApp();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [inputTab, setInputTab] = useState(initialTab);
  const [lastFileId, setLastFileId] = useState(null);
  const [lastStartTime, setLastStartTime] = useState(0);

  const pollJobStatus = async (jobId) => {
    const maxPolls = 60;
    for (let i = 0; i < maxPolls; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await fetch(`/api/jobs/${jobId}`);
      if (!res.ok) continue;
      const jobData = await res.json();

      if (jobData.status === 'completed' && jobData.result) {
        return jobData.result;
      } else if (jobData.status === 'failed') {
        throw new Error(jobData.error || 'Background processing task failed.');
      }
    }
    throw new Error('Task timed out. Please try again.');
  };

  const handleExtractLink = async (reelUrl) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    setTimeout(() => {
      document.getElementById('extraction-process')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: reelUrl, async_mode: true }),
      });

      const data = await response.json();

      if (!response.ok && !data.message) {
        throw new Error(data.error || data.message || 'Could not process provided link.');
      }

      let finalResult = data;
      if (data.job_id && (data.status === 'queued' || data.status === 'processing')) {
        finalResult = await pollJobStatus(data.job_id);
      }

      setResult(finalResult);

      if (finalResult.success && finalResult.song) {
        const newHistoryItem = {
          ...finalResult,
          timestamp: Date.now(),
        };
        const updatedHistory = [newHistoryItem, ...history.filter((h) => h.song?.title !== finalResult.song?.title)].slice(0, 20);
        setHistory(updatedHistory);
        localStorage.setItem('extractor_history', JSON.stringify(updatedHistory));
      }

      setTimeout(() => {
        document.getElementById('extraction-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err) {
      console.error('Link extraction error:', err);
      setError(err.message || 'An unexpected error occurred during extraction.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdentifyFile = async (fileId, startTime, duration = 15) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setLastFileId(fileId);
    setLastStartTime(startTime || 0);

    setTimeout(() => {
      document.getElementById('extraction-process')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    try {
      const response = await fetch('/api/identify-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_id: fileId,
          start_time: typeof startTime === 'number' ? startTime : undefined,
          duration,
          async_mode: true,
        }),
      });

      const data = await response.json();

      if (!response.ok && !data.message) {
        throw new Error(data.error || data.message || 'Could not identify song from uploaded file.');
      }

      let finalResult = data;
      if (data.job_id && (data.status === 'queued' || data.status === 'processing')) {
        finalResult = await pollJobStatus(data.job_id);
      }

      setResult(finalResult);

      if (finalResult.success && finalResult.song) {
        const newHistoryItem = {
          ...finalResult,
          timestamp: Date.now(),
        };
        const updatedHistory = [newHistoryItem, ...history.filter((h) => h.song?.title !== finalResult.song?.title)].slice(0, 20);
        setHistory(updatedHistory);
        localStorage.setItem('extractor_history', JSON.stringify(updatedHistory));
      }

      setTimeout(() => {
        document.getElementById('extraction-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err) {
      console.error('File identification error:', err);
      setError(err.message || 'An unexpected error occurred identifying the audio file.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetryAnotherSection = () => {
    if (lastFileId) {
      const nextStartTime = (lastStartTime || 0) + 15;
      handleIdentifyFile(lastFileId, nextStartTime, 15);
    } else {
      setInputTab('upload');
      setResult(null);
    }
  };

  return (
    <div className="site-container py-8 md:py-12 space-y-10">
      <div id="hero">
        <HeroCard
          title={title}
          subtitle={subtitle}
          onExtractLink={handleExtractLink}
          onIdentifyFile={handleIdentifyFile}
          isLoading={isLoading}
          initialTab={inputTab}
          linkPlaceholder={linkPlaceholder}
        />
      </div>

      {error && (
        <div className="w-full ui-card border-[var(--color-brand)] text-[var(--color-text)]">
          <p className="text-[length:var(--text-base)] font-bold text-[var(--color-brand)]">Processing Error</p>
          <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-text)] mt-1">{error}</p>
        </div>
      )}

      {isLoading && (
        <div id="extraction-process" className="scroll-mt-24">
          <ProgressTracker />
        </div>
      )}

      {result && !isLoading && (
        <div id="extraction-result" className="scroll-mt-24">
          {result.success && result.song ? (
            <SongResultCard data={result} onReset={handleReset} />
          ) : (
            <FailedRecognitionCard
              message={result.message}
              mediaInfo={result.media_info}
              errorType={result.error_type}
              onRetrySection={handleRetryAnotherSection}
              onSwitchToUpload={() => {
                setInputTab('upload');
                setResult(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSwitchToRecord={() => {
                setInputTab('record');
                setResult(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onReset={handleReset}
            />
          )}
        </div>
      )}

      {children}
    </div>
  );
}
