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
    ];
  },
};

export default nextConfig;
