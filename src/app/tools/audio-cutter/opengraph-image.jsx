import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Free MP3 & Audio Cutter – Trim Songs Online | iLoveAudios';
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
          background: 'linear-gradient(135deg, #0B0F19 0%, #17132F 50%, #2A144E 100%)',
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
        {/* Glow Spheres */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(0,0,0,0) 70%)',
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
            background: 'radial-gradient(circle, rgba(239, 62, 74, 0.3) 0%, rgba(0,0,0,0) 70%)',
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
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: '#9333EA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 'bold',
            }}
          >
            ✂️
          </div>
          <div style={{ display: 'flex', fontSize: '38px', fontWeight: '900', letterSpacing: '-0.5px' }}>
            <span>iLove</span>
            <span style={{ color: '#A855F7' }}>Audios</span>
          </div>
        </div>

        {/* Tool Title */}
        <div
          style={{
            display: 'flex',
            fontSize: '56px',
            fontWeight: '900',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: '16px',
            maxWidth: '1000px',
            textShadow: '0 4px 24px rgba(0,0,0,0.6)',
          }}
        >
          Free Online MP3 & Audio Cutter
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: '22px',
            color: '#CBD5E1',
            textAlign: 'center',
            maxWidth: '850px',
            marginBottom: '36px',
            lineHeight: 1.4,
          }}
        >
          Cut and trim MP3 & audio files online free with sub-second precision. Trim songs, splice voice memos, and create ringtones.
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
              background: 'rgba(168, 85, 247, 0.2)',
              color: '#C084FC',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              fontSize: '15px',
              fontWeight: '800',
            }}
          >
            ⚡ Millisecond Waveform Trim
          </div>
          <div
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: '999px',
              background: 'rgba(59, 130, 246, 0.2)',
              color: '#60A5FA',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              fontSize: '15px',
              fontWeight: '800',
            }}
          >
            📱 iPhone M4R Ringtone Ready
          </div>
          <div
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: '999px',
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#34D399',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              fontSize: '15px',
              fontWeight: '800',
            }}
          >
            🔒 100% Free & No Signup
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
