import { TOOLS } from '@/lib/toolsConfig';
import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

// Static deployment date ensuring stable lastModified timestamps
const RELEASE_DATE = new Date('2026-08-31T00:00:00.000Z');

export default function sitemap() {
  // Base paths
  const routes = [
    {
      url: SITE_URL,
      lastModified: RELEASE_DATE,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: getCanonicalUrl('/tools/song-extractor'),
      lastModified: RELEASE_DATE,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: getCanonicalUrl('/converters'),
      lastModified: RELEASE_DATE,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: getCanonicalUrl('/guides/how-to-find-song-from-tiktok-or-reel'),
      lastModified: RELEASE_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/guides/mp4-vs-m4a-vs-mov-audio-converter'),
      lastModified: RELEASE_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/about'),
      lastModified: RELEASE_DATE,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: getCanonicalUrl('/contact'),
      lastModified: RELEASE_DATE,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: getCanonicalUrl('/privacy'),
      lastModified: RELEASE_DATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: getCanonicalUrl('/terms'),
      lastModified: RELEASE_DATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    }
  ];

  const highPrioritySlugs = new Set([
    'mp4-to-mp3',
    'wav-to-mp3',
    'mp3-to-wav',
    'flac-to-mp3',
    'm4a-to-mp3',
    'mp4-to-wav',
    'opus-to-mp3',
    'mov-to-mp3',
    'audio-cutter',
    'audio-joiner',
    'volume-booster',
    'mp3-to-m4r'
  ]);

  // Add conversion tools dynamically
  Object.keys(TOOLS).forEach((slug) => {
    if (slug !== 'song-extractor') {
      const isHigh = highPrioritySlugs.has(slug);
      routes.push({
        url: getCanonicalUrl(`/tools/${slug}`),
        lastModified: RELEASE_DATE,
        changeFrequency: isHigh ? 'daily' : 'weekly',
        priority: isHigh ? 0.9 : 0.8,
      });
    }
  });

  return routes;
}
