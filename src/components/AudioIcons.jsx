import React from 'react';

const baseProps = {
  viewBox: '0 0 24 24',
  width: 24,
  height: 24,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
};

/**
 * Reusable iLovePDF-style format conversion glyph (48px):
 * Pale rounded back square (fromFormat) -> Solid rounded front square (toFormat) + direction arrow.
 */
export function FormatPairIcon({
  fromFormat,
  toFormat,
  color = '#1d4ed8',
  className = 'w-12 h-12',
}) {
  const fromLabel = String(fromFormat || '').toUpperCase();
  const toLabel = String(toFormat || '').toUpperCase();
  const fromFontSize = fromLabel.length >= 4 ? '7.5' : '8.5';
  const toFontSize = toLabel.length >= 4 ? '7.5' : '8.5';

  return (
    <svg
      viewBox="0 0 48 48"
      width="48"
      height="48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Back rounded square (pale tint of category hue) */}
      <rect
        x="3"
        y="4"
        width="24"
        height="24"
        rx="6"
        fill={color}
        fillOpacity="0.14"
        stroke={color}
        strokeWidth="1.5"
      />
      <text
        x="15"
        y="19"
        textAnchor="middle"
        fill={color}
        fontSize={fromFontSize}
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {fromLabel}
      </text>

      {/* Direction arrow in upper-right quadrant */}
      <path
        d="M31 10h7v7"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="35,14 38,17 41,14"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Front overlapping rounded square (solid category hue) */}
      <rect x="21" y="20" width="24" height="24" rx="6" fill={color} />
      <text
        x="33"
        y="35"
        textAnchor="middle"
        fill="#ffffff"
        fontSize={toFontSize}
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {toLabel}
      </text>
    </svg>
  );
}

/**
 * Song Finder glyph (48px): waveform paired with a magnifier lens.
 */
export function SongFinderGlyph({ color = '#c81e2b', className = 'w-12 h-12' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width="48"
      height="48"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="21" cy="21" r="14" fill={color} fillOpacity="0.1" />
      <line x1="13" y1="19" x2="13" y2="23" />
      <line x1="17" y1="15" x2="17" y2="27" />
      <line x1="21" y1="12" x2="21" y2="30" />
      <line x1="25" y1="16" x2="25" y2="26" />
      <line x1="29" y1="19" x2="29" y2="23" />
      <line x1="31.5" y1="31.5" x2="41" y2="41" strokeWidth="2.5" />
    </svg>
  );
}

/**
 * Audio Cutter glyph (48px): waveform inside two trim handles.
 */
export function CutterGlyph({ color = '#15803d', className = 'w-12 h-12' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width="48"
      height="48"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="10" y="10" width="28" height="28" rx="4" fill={color} fillOpacity="0.1" stroke="none" />
      <line x1="10" y1="8" x2="10" y2="40" />
      <polyline points="10,12 14,12" />
      <polyline points="10,36 14,36" />
      <line x1="38" y1="8" x2="38" y2="40" />
      <polyline points="34,12 38,12" />
      <polyline points="34,36 38,36" />
      <line x1="17" y1="21" x2="17" y2="27" />
      <line x1="21" y1="16" x2="21" y2="32" />
      <line x1="25" y1="14" x2="25" y2="34" />
      <line x1="29" y1="18" x2="29" y2="30" />
      <line x1="33" y1="21" x2="33" y2="27" />
    </svg>
  );
}

/**
 * Audio Joiner glyph (48px): two separate waveform clips joined into one track.
 */
export function JoinerGlyph({ color = '#15803d', className = 'w-12 h-12' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width="48"
      height="48"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="4" y="12" width="17" height="24" rx="5" fill={color} fillOpacity="0.12" />
      <line x1="9" y1="20" x2="9" y2="28" />
      <line x1="13" y1="17" x2="13" y2="31" />
      <line x1="17" y1="21" x2="17" y2="27" />
      <rect x="27" y="12" width="17" height="24" rx="5" fill={color} fillOpacity="0.12" />
      <line x1="31" y1="21" x2="31" y2="27" />
      <line x1="35" y1="17" x2="35" y2="31" />
      <line x1="39" y1="20" x2="39" y2="28" />
      <line x1="21" y1="24" x2="27" y2="24" />
    </svg>
  );
}

/**
 * Volume Booster glyph (48px): waveform bars beside an upward gain arrow.
 */
export function VolumeGlyph({ color = '#15803d', className = 'w-12 h-12' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width="48"
      height="48"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="5" y="10" width="24" height="28" rx="6" fill={color} fillOpacity="0.12" stroke="none" />
      <line x1="10" y1="22" x2="10" y2="32" />
      <line x1="15" y1="18" x2="15" y2="32" />
      <line x1="20" y1="14" x2="20" y2="32" />
      <line x1="25" y1="16" x2="25" y2="32" />
      <line x1="37" y1="34" x2="37" y2="12" />
      <polyline points="31,18 37,12 43,18" />
    </svg>
  );
}

export function WaveformIcon({ className = 'w-5 h-5' }) {
  return (
    <svg {...baseProps} className={className}>
      <line x1="4" y1="10" x2="4" y2="14" />
      <line x1="8" y1="6" x2="8" y2="18" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="16" y1="7" x2="16" y2="17" />
      <line x1="20" y1="10" x2="20" y2="14" />
    </svg>
  );
}

export function TrimHandlesIcon({ className = 'w-5 h-5' }) {
  return (
    <svg {...baseProps} className={className}>
      <line x1="5" y1="4" x2="5" y2="20" />
      <line x1="19" y1="4" x2="19" y2="20" />
      <polyline points="5,8 9,8 9,16 5,16" />
      <polyline points="19,8 15,8 15,16 19,16" />
      <line x1="9" y1="12" x2="15" y2="12" />
    </svg>
  );
}

export function JoinTracksIcon({ className = 'w-5 h-5' }) {
  return (
    <svg {...baseProps} className={className}>
      <rect x="3" y="6" width="7" height="5" rx="1" />
      <rect x="3" y="13" width="7" height="5" rx="1" />
      <rect x="14" y="9" width="7" height="6" rx="1" />
      <line x1="10" y1="8.5" x2="14" y2="11" />
      <line x1="10" y1="15.5" x2="14" y2="13" />
    </svg>
  );
}

export function VolumeBarsIcon({ className = 'w-5 h-5' }) {
  return (
    <svg {...baseProps} className={className}>
      <polygon points="4,9 8,9 13,5 13,19 8,15 4,15" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19.5 6a8.5 8.5 0 0 1 0 12" />
    </svg>
  );
}

export function FileTagIcon({ className = 'w-5 h-5' }) {
  return (
    <svg {...baseProps} className={className}>
      <path d="M6 3h8l4 4v14H6z" />
      <polyline points="14,3 14,7 18,7" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  );
}

export function UploadTrayIcon({ className = 'w-5 h-5' }) {
  return (
    <svg {...baseProps} className={className}>
      <line x1="12" y1="15" x2="12" y2="4" />
      <polyline points="8,8 12,4 16,8" />
      <path d="M4 16v3h16v-3" />
    </svg>
  );
}

export function MicStrokeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg {...baseProps} className={className}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <line x1="12" y1="18" x2="12" y2="21" />
      <line x1="9" y1="21" x2="15" y2="21" />
    </svg>
  );
}

export function HistoryClockIcon({ className = 'w-5 h-5' }) {
  return (
    <svg {...baseProps} className={className}>
      <circle cx="12" cy="12" r="8" />
      <polyline points="12,8 12,12 15,14" />
    </svg>
  );
}

export function MenuLinesIcon({ className = 'w-5 h-5' }) {
  return (
    <svg {...baseProps} className={className}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function CloseCrossIcon({ className = 'w-5 h-5' }) {
  return (
    <svg {...baseProps} className={className}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

export function ChevronStrokeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg {...baseProps} className={className}>
      <polyline points="6,9 12,15 18,9" />
    </svg>
  );
}

export function CheckStrokeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg {...baseProps} className={className}>
      <polyline points="5,13 10,18 19,7" />
    </svg>
  );
}

export function DownloadTrayIcon({ className = 'w-5 h-5' }) {
  return (
    <svg {...baseProps} className={className}>
      <line x1="12" y1="4" x2="12" y2="15" />
      <polyline points="8,11 12,15 16,11" />
      <path d="M4 16v3h16v-3" />
    </svg>
  );
}

export function RetryStrokeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg {...baseProps} className={className}>
      <polyline points="4,4 4,9 9,9" />
      <path d="M20 12a8 8 0 1 1-2.34-5.66L4 9" />
    </svg>
  );
}

export function TrashStrokeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg {...baseProps} className={className}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <path d="M9 7V4h6v3" />
      <path d="M6 7l1 13h10l1-13" />
    </svg>
  );
}

export function ExternalLinkStrokeIcon({ className = 'w-4 h-4' }) {
  return (
    <svg {...baseProps} className={className}>
      <path d="M14 5h5v5" />
      <line x1="10" y1="14" x2="19" y2="5" />
      <path d="M19 13v6H5V5h6" />
    </svg>
  );
}

export function CopyStrokeIcon({ className = 'w-4 h-4' }) {
  return (
    <svg {...baseProps} className={className}>
      <rect x="9" y="9" width="11" height="11" rx="1.5" />
      <path d="M5 15H4a1.5 1.5 0 0 1-1.5-1.5V4A1.5 1.5 0 0 1 4 2.5h9.5A1.5 1.5 0 0 1 15 4v1" />
    </svg>
  );
}

export function SpinnerStrokeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" className={`${className} animate-spin`} aria-hidden="true">
      <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
      <path d="M12 3a9 9 0 0 1 9 9" />
    </svg>
  );
}

const TRACK_WAVEFORM_HEIGHTS = [
  6, 8, 12, 10, 14, 18, 12, 16, 22, 18, 14, 20,
  26, 22, 32, 28, 18, 24, 34, 30, 20, 28, 36, 32,
  24, 30, 38, 42, 48, 40,
  54, 62, 48, 58, 64, 52, 44, 60, 56, 46, 62, 58, 48, 56, 60, 50, 42, 36,
  22, 16, 12, 18, 14, 10, 16, 24,
  34, 46, 54, 60, 52, 58, 48, 54, 44, 36,
  26, 20, 14, 10, 8, 6,
];

export function TrackWaveformGraphic({ className = 'w-full h-16', isProcessing = false }) {
  const barWidth = 6;
  const gap = 6;
  const step = barWidth + gap;
  const centerY = 34;

  return (
    <svg
      viewBox={`0 0 ${TRACK_WAVEFORM_HEIGHTS.length * step} 68`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`${className} ${isProcessing ? 'waveform-identifying' : 'waveform-idle'}`}
    >
      {TRACK_WAVEFORM_HEIGHTS.map((height, idx) => (
        <rect
          key={idx}
          x={idx * step}
          y={centerY - height / 2}
          width={barWidth}
          height={height}
          rx="2"
          fill="currentColor"
          className="waveform-bar"
        />
      ))}
    </svg>
  );
}

export function InstagramLogoIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.25" cy="6.75" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokLogoIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function YouTubeLogoIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function FacebookLogoIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V7.05c0-1.05.28-1.73 1.76-1.73z" />
    </svg>
  );
}

export function SnapchatLogoIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884a4.968 4.968 0 0 0-.913-.074c-.48 0-.899.06-1.259.135-.24.045-.42.075-.555.075-.285 0-.48-.135-.555-.405a5.656 5.656 0 0 1-.135-.555c-.045-.195-.105-.479-.165-.569-1.873-.284-2.906-.703-3.146-1.272a.525.525 0 0 1-.045-.225c-.015-.24.165-.465.42-.51 3.265-.539 4.731-3.878 4.791-4.014l.015-.015c.18-.344.21-.644.12-.868-.195-.45-.884-.675-1.333-.81a3.768 3.768 0 0 1-.344-.119c-.823-.329-1.228-.719-1.213-1.168 0-.359.284-.689.734-.838.15-.06.327-.09.509-.09.12 0 .299.016.464.104.374.181.733.285 1.033.301.198 0 .326-.045.401-.09a7.772 7.772 0 0 1-.03-.51l-.003-.06c-.104-1.628-.23-3.654.299-4.847C7.648 1.069 11.005.793 11.995.793h.211z" />
    </svg>
  );
}
