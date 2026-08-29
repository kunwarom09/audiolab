import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'iLoveAudios — Free Online Audio Tools & Converters';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
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
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(239, 62, 74, 0.35) 0%, rgba(0,0,0,0) 70%)',
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
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
            display: 'flex',
          }}
        />

        {/* Brand */}
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
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: '#EF3E4A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 'bold',
            }}
          >
            🎵
          </div>
          <div style={{ display: 'flex', fontSize: '38px', fontWeight: '900', letterSpacing: '-0.5px' }}>
            <span>iLove</span>
            <span style={{ color: '#EF3E4A' }}>Audios</span>
          </div>
        </div>

        {/* Hero Title */}
        <div
          style={{
            display: 'flex',
            fontSize: '52px',
            fontWeight: '900',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: '16px',
            maxWidth: '960px',
            textShadow: '0 4px 24px rgba(0,0,0,0.6)',
          }}
        >
          Free Online Audio Tools & Converters
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: '22px',
            color: '#94A3B8',
            textAlign: 'center',
            maxWidth: '800px',
            marginBottom: '36px',
            lineHeight: 1.4,
          }}
        >
          Convert MP4, MOV, WAV, MP3, FLAC, M4A & Find Songs from Instagram Reels & TikTok
        </div>

        {/* Feature Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: '999px',
              background: 'rgba(239, 62, 74, 0.15)',
              color: '#EF3E4A',
              border: '1px solid rgba(239, 62, 74, 0.3)',
              fontSize: '15px',
              fontWeight: '800',
            }}
          >
            🔥 25+ Audio Tools
          </div>
          <div
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: '999px',
              background: 'rgba(59, 130, 246, 0.15)',
              color: '#60A5FA',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              fontSize: '15px',
              fontWeight: '800',
            }}
          >
            ⚡ Fast FFmpeg Cloud
          </div>
          <div
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: '999px',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#34D399',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              fontSize: '15px',
              fontWeight: '800',
            }}
          >
            🔒 100% Free & Secure
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
