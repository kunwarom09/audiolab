import { ImageResponse } from 'next/og';
import { TOOLS } from '@/lib/toolsConfig';

export const runtime = 'nodejs';
export const alt = 'iLoveAudios Free Audio Converter';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { slug } = await params;
  const tool = TOOLS[slug] || { title: 'Free Online Audio Tool', fromFormat: 'Audio', toFormat: 'MP3' };

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #090D16 0%, #111827 50%, #1E1B4B 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: '#FFFFFF',
          padding: '40px 60px',
          position: 'relative',
        }}
      >
        {/* Background Glows */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(239, 62, 74, 0.35) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-10%',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
            display: 'flex',
          }}
        />

        {/* Brand Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: '#EF3E4A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            🎵
          </div>
          <div style={{ display: 'flex', fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px' }}>
            <span>iLove</span>
            <span style={{ color: '#EF3E4A' }}>Audios</span>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '14px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(239, 62, 74, 0.15)',
              color: '#EF3E4A',
              border: '1px solid rgba(239, 62, 74, 0.3)',
            }}
          >
            100% Free Online
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            fontSize: '54px',
            fontWeight: '900',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: '20px',
            maxWidth: '960px',
            textShadow: '0 4px 24px rgba(0,0,0,0.6)',
          }}
        >
          {tool.title}
        </div>

        {/* Format Badge */}
        {tool.fromFormat && tool.toFormat && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              fontSize: '28px',
              fontWeight: '800',
              padding: '12px 36px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              marginBottom: '28px',
            }}
          >
            <span style={{ color: '#60A5FA' }}>{tool.fromFormat}</span>
            <span style={{ color: '#9CA3AF' }}>➔</span>
            <span style={{ color: '#34D399' }}>{tool.toFormat}</span>
          </div>
        )}

        {/* Feature Badges Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            fontSize: '16px',
            color: '#D1D5DB',
            fontWeight: '600',
          }}
        >
          <span>⚡ Fast FFmpeg Engine</span>
          <span>•</span>
          <span>🎧 Studio Quality (Up to 320kbps)</span>
          <span>•</span>
          <span>🔒 Safe & Auto-Deleted</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
