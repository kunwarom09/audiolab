'use client';

import React from 'react';
import { History, X, Trash2, FileAudio, ArrowRight, ExternalLink } from 'lucide-react';

export default function ConversionHistory({ history = [], isOpen, onClose, onClear }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end transition-opacity animate-in fade-in duration-300">
      <div className="w-full max-w-md h-full bg-[var(--bg-card)] border-l border-[var(--border-color)] p-6 space-y-6 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#0088ff]" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Conversion History</h3>
            <span className="text-xs text-[var(--text-muted)]">({history.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[var(--bg-main)] hover:bg-slate-200 dark:hover:bg-slate-800 text-[var(--text-secondary)] transition-colors cursor-pointer"
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
                className="group p-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center gap-3 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-[#0088ff] flex items-center justify-center shrink-0 border border-blue-500/20">
                  <FileAudio className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[var(--text-primary)] truncate" title={item.fileName}>
                    {item.fileName}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-[var(--text-secondary)] font-semibold uppercase">
                    <span>{item.fromFormat}</span>
                    <ArrowRight className="w-3 h-3 text-[var(--text-muted)]" />
                    <span className="text-emerald-500">{item.toFormat}</span>
                  </div>
                  <span className="text-[9px] text-[var(--text-muted)] block mt-1">
                    {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Recent'}
                  </span>
                </div>

                <a
                  href={`/api/convert/download/${item.jobId}`}
                  download
                  className="p-2 rounded-lg bg-[var(--bg-card)] hover:bg-blue-500/10 border border-[var(--border-color)] hover:border-blue-500/30 text-[var(--text-secondary)] hover:text-[#0088ff] transition-all cursor-pointer shrink-0"
                  title="Download File"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))
          ) : (
            <div className="text-center py-16 space-y-3 text-[var(--text-muted)]">
              <History className="w-12 h-12 mx-auto opacity-30" />
              <p className="text-sm">No conversion history yet.</p>
              <p className="text-xs">Converted files will be tracked here automatically.</p>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="pt-4 border-t border-[var(--border-color)]">
            <button
              onClick={onClear}
              className="w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Conversion History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
