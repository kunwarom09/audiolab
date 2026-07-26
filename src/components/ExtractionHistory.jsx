import React, { useState } from 'react';
import { History, X, Trash2, Disc, FileAudio, ArrowRight, ExternalLink } from 'lucide-react';

export default function ExtractionHistory({ history = [], conversionHistory = [], isOpen, onClose, onSelect, onClear, onClearConversions }) {
  const [activeTab, setActiveTab] = useState('songs'); // songs | conversions

  if (!isOpen) return null;

  const currentListSize = activeTab === 'songs' ? history.length : conversionHistory.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end transition-opacity animate-in fade-in duration-300">
      <div className="w-full max-w-md h-full bg-[var(--bg-card)] border-l border-[var(--border-color)] p-6 space-y-6 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#0088ff]" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">User Activity History</h3>
            <span className="text-xs text-[var(--text-muted)]">({currentListSize})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[var(--bg-main)] hover:bg-slate-200 dark:hover:bg-slate-800 text-[var(--text-secondary)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1.5 bg-[var(--bg-main)] p-1 rounded-2xl border border-[var(--border-color)]">
          <button
            onClick={() => setActiveTab('songs')}
            className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'songs'
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Song Finder ({history.length})
          </button>
          <button
            onClick={() => setActiveTab('conversions')}
            className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'conversions'
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Converter ({conversionHistory.length})
          </button>
        </div>

        {/* History Item List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {activeTab === 'songs' ? (
            history.length > 0 ? (
              history.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="group p-3 rounded-2xl bg-[var(--bg-main)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] hover:border-blue-500/30 transition-all flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-[var(--border-color)]">
                    {item.song?.cover_art ? (
                      <img
                        src={item.song.cover_art}
                        alt={item.song.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#0088ff]">
                        <Disc className="w-6 h-6 animate-spin-slow" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[var(--text-primary)] truncate group-hover:text-[#0088ff] transition-colors">
                      {item.song?.title}
                    </h4>
                    <p className="text-[10px] font-semibold text-[var(--text-secondary)] truncate">
                      {item.song?.artist}
                    </p>
                    <span className="text-[9px] text-[var(--text-muted)] block mt-0.5">
                      {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3 text-[var(--text-muted)]">
                <Disc className="w-12 h-12 mx-auto opacity-30 animate-spin-slow" />
                <p className="text-xs font-bold">No song extraction history yet.</p>
              </div>
            )
          ) : (
            conversionHistory.length > 0 ? (
              conversionHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="group p-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center gap-3 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-[#0088ff] flex items-center justify-center shrink-0 border border-blue-500/20">
                    <FileAudio className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11px] font-bold text-[var(--text-primary)] truncate" title={item.fileName}>
                      {item.fileName}
                    </h4>
                    <div className="flex items-center gap-1 mt-0.5 text-[9px] text-[var(--text-secondary)] font-bold uppercase">
                      <span>{item.fromFormat}</span>
                      <ArrowRight className="w-3 h-3 text-[var(--text-muted)]" />
                      <span className="text-emerald-500">{item.toFormat}</span>
                    </div>
                    <span className="text-[9px] text-[var(--text-muted)] block mt-0.5">
                      {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>

                  <a
                    href={`/api/convert/download/${item.jobId}`}
                    download
                    className="p-1.5 rounded-lg bg-[var(--bg-card)] hover:bg-blue-500/10 border border-[var(--border-color)] hover:border-blue-500/30 text-[var(--text-secondary)] hover:text-[#0088ff] transition-all cursor-pointer shrink-0"
                    title="Download File"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3 text-[var(--text-muted)]">
                <FileAudio className="w-12 h-12 mx-auto opacity-30" />
                <p className="text-xs font-bold">No conversion history yet.</p>
              </div>
            )
          )}
        </div>

        {/* Clear buttons */}
        {activeTab === 'songs' && history.length > 0 && (
          <div className="pt-4 border-t border-[var(--border-color)]">
            <button
              onClick={onClear}
              className="w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Extraction History</span>
            </button>
          </div>
        )}

        {activeTab === 'conversions' && conversionHistory.length > 0 && (
          <div className="pt-4 border-t border-[var(--border-color)]">
            <button
              onClick={onClearConversions}
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
