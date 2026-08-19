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
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://iloveaudios.com'}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_SITE_URL || 'https://iloveaudios.com',
  };
}

