import { SITE_URL } from '@/lib/siteConfig';

export default function robots() {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/'],
        crawlDelay: 1,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
        crawlDelay: 2,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}


