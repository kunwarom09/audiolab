export default function robots() {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/', '/tools/'],
        disallow: ['/api/', '/_next/static/', '/api/auth/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/', '/tools/'],
        disallow: ['/api/', '/_next/static/', '/api/auth/'],
        crawlDelay: 1,
      },
      {
        userAgent: '*',
        allow: ['/', '/tools/'],
        disallow: ['/api/', '/_next/static/', '/api/auth/'],
        crawlDelay: 2,
      },
    ],
    sitemap: 'https://audiolab.app/sitemap.xml',
    host: 'https://audiolab.app',
  };
}

