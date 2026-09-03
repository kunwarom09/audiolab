import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Free AI Song Finder & Music Identifier | iLoveAudios';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #090D16 0%, #0F172A 50%, #1E1B4B 100%)',
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
            top: '-15%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(239, 62, 74, 0.4) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(0,0,0,0) 70%)',
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
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: '#EF3E4A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              fontWeight: 'bold',
            }}
          >
            🎵
          </div>
          <div style={{ display: 'flex', fontSize: '36px', fontWeight: '900', letterSpacing: '-0.5px' }}>
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
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(239, 62, 74, 0.15)',
              color: '#EF3E4A',
              border: '1px solid rgba(239, 62, 74, 0.3)',
            }}
          >
            AI Powered
          </div>
        </div>

        {/* Hero Title */}
        <div
          style={{
            display: 'flex',
            fontSize: '56px',
            fontWeight: '900',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: '20px',
            maxWidth: '1000px',
            textShadow: '0 4px 24px rgba(0,0,0,0.6)',
          }}
        >
          Free AI Song Finder & Music Identifier
        </div>

        {/* Subtitle / Value Proposition Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '22px',
            fontWeight: '700',
            color: '#93C5FD',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          <span>Find songs from Instagram Reels, TikTok, YouTube Shorts & Audio Files</span>
        </div>

        {/* Feature Badges Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            fontSize: '18px',
            color: '#E2E8F0',
            fontWeight: '600',
            padding: '12px 32px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <span>🔗 Paste Video Link</span>
          <span>•</span>
          <span>📁 Upload File</span>
          <span>•</span>
          <span>🎙️ Record Mic</span>
          <span>•</span>
          <span>⚡ Full Lyrics & MP3</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
