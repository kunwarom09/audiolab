/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '1000mb',
    },
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'iloveaudios.com',
          },
        ],
        destination: 'https://www.iloveaudios.com/:path*',
        permanent: true,
      },
      {
        source: '/tools/song-finder',
        destination: '/tools/song-extractor',
        permanent: true,
      },
      {
        source: '/tools/ai-song-finder',
        destination: '/tools/song-extractor',
        permanent: true,
      },
      {
        source: '/tools/music-identifier',
        destination: '/tools/song-extractor',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'microphone=(self), camera=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://analytics.ahrefs.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https:",
              "media-src 'self' blob: data: https:",
              "connect-src 'self' https://audiolab-dc5o.onrender.com https://accounts.google.com https://analytics.ahrefs.com blob: data:",
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://accounts.google.com",
              "worker-src 'self' blob:",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
