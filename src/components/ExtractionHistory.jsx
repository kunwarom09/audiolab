import React, { useState } from 'react';
import {
  CloseCrossIcon,
  DownloadTrayIcon,
  FileTagIcon,
  HistoryClockIcon,
  TrashStrokeIcon,
  WaveformIcon,
} from './AudioIcons';

export default function ExtractionHistory({
  history = [],
  conversionHistory = [],
  isOpen,
  onClose,
  onSelect,
  onClear,
  onClearConversions,
}) {
  const [activeTab, setActiveTab] = useState('songs');

  if (!isOpen) return null;

  const currentListSize = activeTab === 'songs' ? history.length : conversionHistory.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="w-full max-w-[32rem] h-full bg-[var(--color-surface)] border-l border-[var(--color-border)] p-6 space-y-5 flex flex-col">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <HistoryClockIcon className="w-6 h-6 text-[var(--color-accent)] shrink-0" />
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-ink)]">
              Activity History ({currentListSize})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close history"
            className="min-w-[48px] min-h-[48px] flex items-center justify-center rounded-[8px] bg-[var(--color-canvas)] border border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-ink)] transition-colors cursor-pointer shrink-0"
          >
            <CloseCrossIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 bg-[var(--color-canvas)] p-1.5 rounded-[8px] border border-[var(--color-border)]">
          <button
            type="button"
            onClick={() => setActiveTab('songs')}
            className={`flex-1 min-h-[48px] py-[12px] px-[20px] text-center text-[length:var(--text-base)] font-bold rounded-[8px] transition-colors cursor-pointer ${
              activeTab === 'songs'
                ? 'bg-[var(--color-accent)] text-white'
                : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            Song Finder ({history.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('conversions')}
            className={`flex-1 min-h-[48px] py-[12px] px-[20px] text-center text-[length:var(--text-base)] font-bold rounded-[8px] transition-colors cursor-pointer ${
              activeTab === 'conversions'
                ? 'bg-[var(--color-accent)] text-white'
                : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            Converter ({conversionHistory.length})
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {activeTab === 'songs' ? (
            history.length > 0 ? (
              history.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="w-full min-h-[52px] text-left p-4 rounded-[8px] bg-[var(--color-canvas)] hover:border-[var(--color-ink)] border border-[var(--color-border)] transition-colors flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-[8px] overflow-hidden bg-[var(--color-surface)] shrink-0 border border-[var(--color-border)] flex items-center justify-center">
                    {item.song?.cover_art ? (
                      <img
                        src={item.song.cover_art}
                        alt={item.song.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <WaveformIcon className="w-5 h-5 text-[var(--color-accent)]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <h4 className="text-[length:var(--text-base)] font-bold text-[var(--color-ink)] truncate">
                      {item.song?.title}
                    </h4>
                    <p className="text-[length:var(--text-base)] text-[var(--color-muted)] truncate">
                      {item.song?.artist}
                    </p>
                    <span className="text-[length:var(--text-base)] text-[var(--color-muted)] block">
                      {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-left py-12 space-y-2 text-[var(--color-muted)]">
                <p className="text-[length:var(--text-base)] font-semibold">No song identification history yet.</p>
              </div>
            )
          ) : conversionHistory.length > 0 ? (
            conversionHistory.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[8px] bg-[var(--color-canvas)] border border-[var(--color-border)] flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-[8px] bg-[var(--color-surface)] text-[var(--color-accent)] flex items-center justify-center shrink-0 border border-[var(--color-border)]">
                  <FileTagIcon className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <h4 className="text-[length:var(--text-base)] font-bold text-[var(--color-ink)] truncate" title={item.fileName}>
                    {item.fileName}
                  </h4>
                  <p className="text-[length:var(--text-base)] text-[var(--color-muted)] font-semibold">
                    {item.fromFormat} to {item.toFormat}
                  </p>
                  <span className="text-[length:var(--text-base)] text-[var(--color-muted)] block">
                    {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Recent'}
                  </span>
                </div>

                <a
                  href={`/api/convert/download/${item.jobId}`}
                  download
                  className="min-w-[48px] min-h-[48px] flex items-center justify-center rounded-[8px] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-ink)] transition-colors cursor-pointer shrink-0"
                  title="Download File"
                  aria-label={`Download ${item.fileName}`}
                >
                  <DownloadTrayIcon className="w-5 h-5" />
                </a>
              </div>
            ))
          ) : (
            <div className="text-left py-12 space-y-2 text-[var(--color-muted)]">
              <p className="text-[length:var(--text-base)] font-semibold">No conversion history yet.</p>
            </div>
          )}
        </div>

        {activeTab === 'songs' && history.length > 0 && (
          <div className="pt-4 border-t border-[var(--color-border)]">
            <button
              type="button"
              onClick={onClear}
              className="w-full min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-canvas)] hover:border-[var(--color-accent)] border border-[var(--color-border)] text-[var(--color-accent)] text-[length:var(--text-base)] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <TrashStrokeIcon className="w-5 h-5" />
              <span>Clear Extraction History</span>
            </button>
          </div>
        )}

        {activeTab === 'conversions' && conversionHistory.length > 0 && (
          <div className="pt-4 border-t border-[var(--color-border)]">
            <button
              type="button"
              onClick={onClearConversions}
              className="w-full min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-canvas)] hover:border-[var(--color-accent)] border border-[var(--color-border)] text-[var(--color-accent)] text-[length:var(--text-base)] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <TrashStrokeIcon className="w-5 h-5" />
              <span>Clear Conversion History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
