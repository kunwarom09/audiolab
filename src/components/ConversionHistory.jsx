'use client';

import React from 'react';
import { History, X, Trash2, FileAudio, ArrowRight, ExternalLink } from 'lucide-react';

export default function ConversionHistory({ history = [], isOpen, onClose, onClear }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="w-full max-w-[32rem] h-full bg-[var(--color-surface)] border-l border-[var(--color-border)] p-6 space-y-6 flex flex-col">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <History className="w-6 h-6 text-[var(--color-brand)] shrink-0" />
            <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">
              Conversion History ({history.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close conversion history"
            className="min-w-[48px] min-h-[48px] flex items-center justify-center rounded-[8px] bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* History Item List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {history.length > 0 ? (
            history.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[12px] bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-[8px] bg-[var(--color-surface)] text-[var(--color-brand)] flex items-center justify-center shrink-0 border border-[var(--color-border)]">
                  <FileAudio className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-[length:var(--text-base)] font-bold text-[var(--color-text)] truncate" title={item.fileName}>
                    {item.fileName}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[length:var(--text-base)] text-[var(--color-text-muted)] font-semibold">
                    <span>{item.fromFormat}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                    <span className="text-emerald-700">{item.toFormat}</span>
                  </div>
                  <span className="text-[length:var(--text-base)] text-[var(--color-text-muted)] block">
                    {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Recent'}
                  </span>
                </div>

                <a
                  href={`/api/convert/download/${item.jobId}`}
                  download
                  className="min-w-[48px] min-h-[48px] flex items-center justify-center rounded-[8px] bg-[var(--color-surface)] hover:border-[var(--color-brand)] border border-[var(--color-border)] text-[var(--color-text)] hover:text-[var(--color-brand)] transition-colors cursor-pointer shrink-0"
                  title="Download File"
                  aria-label={`Download ${item.fileName}`}
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            ))
          ) : (
            <div className="text-left py-12 space-y-2 text-[var(--color-text-muted)]">
              <p className="text-[length:var(--text-base)] font-semibold">No conversion history yet.</p>
              <p className="text-[length:var(--text-base)]">Converted files will be tracked here automatically.</p>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="pt-4 border-t border-[var(--color-border)]">
            <button
              type="button"
              onClick={onClear}
              className="w-full min-h-[52px] px-[20px] rounded-[8px] bg-[var(--color-bg)] hover:border-[var(--color-brand)] border border-[var(--color-border)] text-[var(--color-brand)] text-[length:var(--text-base)] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Trash2 className="w-5 h-5" />
              <span>Clear Conversion History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
