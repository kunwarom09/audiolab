'use client';

import React, { useState } from 'react';
import { Settings2, Sliders, ChevronDown, ChevronUp } from 'lucide-react';

export default function ConversionSettings({ toFormat, settings, onChange }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const bitrates = [
    { value: '96k', label: '96 kbps', desc: 'Compact size' },
    { value: '128k', label: '128 kbps', desc: 'Standard' },
    { value: '192k', label: '192 kbps', desc: 'Balanced' },
    { value: '256k', label: '256 kbps', desc: 'High bitrate' },
    { value: '320k', label: '320 kbps', desc: 'Maximum MP3' }
  ];

  const handleBitrateChange = (bitrate) => {
    onChange({ ...settings, bitrate });
  };

  const handleAdvancedChange = (key, value) => {
    onChange({ ...settings, [key]: value });
  };

  const isWav = toFormat?.toUpperCase() === 'WAV';

  return (
    <div className="w-full ui-card space-y-6">
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] pb-4">
        <Settings2 className="w-6 h-6 text-[var(--color-brand)] shrink-0" />
        <h3 className="text-[length:var(--text-h3)] font-bold text-[var(--color-text)]">Conversion Settings</h3>
      </div>

      {/* Bitrate Selector (Only for Compressed formats like MP3) */}
      {!isWav ? (
        <div className="space-y-3">
          <label className="text-[length:var(--text-base)] font-semibold text-[var(--color-text)] block">
            Audio Quality (Bitrate)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {bitrates.map((br) => (
              <button
                key={br.value}
                type="button"
                onClick={() => handleBitrateChange(br.value)}
                className={`w-full min-h-[52px] px-[20px] py-[12px] rounded-[12px] border text-left sm:text-center cursor-pointer transition-colors duration-150 ${
                  settings.bitrate === br.value
                    ? 'border-[var(--color-pill-active)] bg-[var(--color-pill-active)] text-white font-bold'
                    : 'border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-brand)] text-[var(--color-text)] font-semibold'
                }`}
              >
                <span className="block text-[length:var(--text-base)]">{br.label}</span>
                <span className={`block text-[length:var(--text-base)] font-normal ${settings.bitrate === br.value ? 'text-white/90' : 'text-[var(--color-text-muted)]'}`}>
                  {br.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5 rounded-[12px] bg-[var(--color-bg)] border border-[var(--color-border)] text-[length:var(--text-base)] text-[var(--color-text)] font-semibold leading-[var(--leading-body)]">
          <p className="prose-measure">
            Output format WAV is lossless PCM (1411 kbps), so bitrate presets do not apply.
          </p>
        </div>
      )}

      {/* Advanced Settings Toggle */}
      <div className="space-y-4 pt-2">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          aria-expanded={showAdvanced}
          className="flex items-center justify-between w-full min-h-[52px] px-[20px] py-[12px] rounded-[8px] bg-[var(--color-bg)] border border-[var(--color-border)] text-[length:var(--text-base)] font-semibold text-[var(--color-text)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[var(--color-brand)] shrink-0" />
            <span>Advanced Configuration Options</span>
          </span>
          {showAdvanced ? <ChevronUp className="w-5 h-5 shrink-0" /> : <ChevronDown className="w-5 h-5 shrink-0" />}
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-[12px] bg-[var(--color-bg)] border border-[var(--color-border)]">
            {/* Audio Channels */}
            <div className="space-y-2">
              <label htmlFor="conv-channels" className="text-[length:var(--text-base)] font-semibold text-[var(--color-text)] block">
                Audio Channels
              </label>
              <select
                id="conv-channels"
                value={settings.channels}
                onChange={(e) => handleAdvancedChange('channels', e.target.value)}
                className="w-full min-h-[52px] px-[20px] rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[length:var(--text-base)] font-semibold focus:outline-none focus:border-[var(--color-brand)] text-[var(--color-text)]"
              >
                <option value="stereo">Stereo (2 Channels)</option>
                <option value="mono">Mono (1 Channel)</option>
              </select>
            </div>

            {/* Audio Sample Rate */}
            <div className="space-y-2">
              <label htmlFor="conv-sample-rate" className="text-[length:var(--text-base)] font-semibold text-[var(--color-text)] block">
                Sample Rate
              </label>
              <select
                id="conv-sample-rate"
                value={settings.sampleRate}
                onChange={(e) => handleAdvancedChange('sampleRate', e.target.value)}
                className="w-full min-h-[52px] px-[20px] rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[length:var(--text-base)] font-semibold focus:outline-none focus:border-[var(--color-brand)] text-[var(--color-text)]"
              >
                <option value="44100">44,100 Hz (Standard CD)</option>
                <option value="48000">48,000 Hz (Studio Video)</option>
                <option value="22050">22,050 Hz (Low Bandwidth)</option>
              </select>
            </div>

            {/* Audio Normalization */}
            <label className="flex items-center justify-between gap-4 min-h-[52px] p-4 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] cursor-pointer">
              <div className="space-y-1">
                <span className="text-[length:var(--text-base)] font-bold text-[var(--color-text)] block">Audio Normalization</span>
                <span className="text-[length:var(--text-base)] text-[var(--color-text-muted)] block">Align volume spikes evenly</span>
              </div>
              <input
                type="checkbox"
                checked={settings.normalize}
                onChange={(e) => handleAdvancedChange('normalize', e.target.checked)}
                className="w-6 h-6 rounded accent-[var(--color-brand)] cursor-pointer shrink-0"
              />
            </label>

            {/* Keep Audio Metadata */}
            <label className="flex items-center justify-between gap-4 min-h-[52px] p-4 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] cursor-pointer">
              <div className="space-y-1">
                <span className="text-[length:var(--text-base)] font-bold text-[var(--color-text)] block">Preserve Metadata</span>
                <span className="text-[length:var(--text-base)] text-[var(--color-text-muted)] block">Keep ID3 tags (artist, cover)</span>
              </div>
              <input
                type="checkbox"
                checked={settings.preserveMetadata}
                onChange={(e) => handleAdvancedChange('preserveMetadata', e.target.checked)}
                className="w-6 h-6 rounded accent-[var(--color-brand)] cursor-pointer shrink-0"
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
