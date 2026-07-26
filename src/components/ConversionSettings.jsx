'use client';

import React, { useState } from 'react';
import { Settings2, VolumeX, Sliders, ChevronDown, ChevronUp } from 'lucide-react';

export default function ConversionSettings({ toFormat, settings, onChange }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const bitrates = [
    { value: '96k', label: '96 kbps', desc: 'Low Quality' },
    { value: '128k', label: '128 kbps', desc: 'Standard' },
    { value: '192k', label: '192 kbps', desc: 'High Quality' },
    { value: '256k', label: '256 kbps', desc: 'Very High' },
    { value: '320k', label: '320 kbps', desc: 'Premium HD' }
  ];

  const handleBitrateChange = (bitrate) => {
    onChange({ ...settings, bitrate });
  };

  const handleAdvancedChange = (key, value) => {
    onChange({ ...settings, [key]: value });
  };

  const isWav = toFormat?.toUpperCase() === 'WAV';

  return (
    <div className="w-full glass-panel rounded-3xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-4">
        <Settings2 className="w-5 h-5 text-[#0088ff]" />
        <h3 className="text-base font-extrabold text-[var(--text-primary)]">Conversion Settings</h3>
      </div>

      {/* Bitrate Selector (Only for Compressed formats like MP3) */}
      {!isWav ? (
        <div className="space-y-3">
          <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider block">
            Audio Quality (Bitrate)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {bitrates.map((br) => (
              <button
                key={br.value}
                type="button"
                onClick={() => handleBitrateChange(br.value)}
                className={`p-3.5 rounded-2xl border text-center cursor-pointer transition-all duration-200 ${
                  settings.bitrate === br.value
                    ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-extrabold'
                    : 'border-[var(--border-color)] bg-[var(--bg-main)] hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-[var(--text-secondary)] font-semibold'
                }`}
              >
                <span className="block text-xs md:text-sm">{br.label}</span>
                <span className="block text-[8px] opacity-75 font-normal tracking-wide mt-0.5">{br.desc}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-semibold leading-relaxed">
          <span>Output Format WAV is inherently lossless (PCM format, 1411kbps). Quality bitrates do not apply.</span>
        </div>
      )}

      {/* Advanced Settings Toggle */}
      <div className="space-y-4 pt-2">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-secondary)] hover:text-[#0088ff] transition-all cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#0088ff]" />
            <span>Advanced Configuration Options</span>
          </span>
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] animate-in slide-in-from-top-2 duration-300">
            {/* Audio Channels */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                Audio Channels
              </label>
              <select
                value={settings.channels}
                onChange={(e) => handleAdvancedChange('channels', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs font-semibold focus:outline-none focus:border-blue-500 text-[var(--text-primary)]"
              >
                <option value="stereo">Stereo (2 Channels)</option>
                <option value="mono">Mono (1 Channel)</option>
              </select>
            </div>

            {/* Audio Sample Rate */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                Sample Rate
              </label>
              <select
                value={settings.sampleRate}
                onChange={(e) => handleAdvancedChange('sampleRate', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs font-semibold focus:outline-none focus:border-blue-500 text-[var(--text-primary)]"
              >
                <option value="44100">44,100 Hz (Standard CD)</option>
                <option value="48000">48,000 Hz (Studio Video)</option>
                <option value="22050">22,050 Hz (Low Bandwidth)</option>
              </select>
            </div>

            {/* Audio Normalization */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] mt-2">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[var(--text-primary)] block">Audio Normalization</span>
                <span className="text-[10px] text-[var(--text-muted)] block">Align volume spikes evenly</span>
              </div>
              <input
                type="checkbox"
                checked={settings.normalize}
                onChange={(e) => handleAdvancedChange('normalize', e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            {/* Keep Audio Metadata */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] mt-2">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[var(--text-primary)] block">Preserve Metadata</span>
                <span className="text-[10px] text-[var(--text-muted)] block">Keep ID3 tags (artist, cover)</span>
              </div>
              <input
                type="checkbox"
                checked={settings.preserveMetadata}
                onChange={(e) => handleAdvancedChange('preserveMetadata', e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
