import { TOOLS } from '@/lib/toolsConfig';
import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

export default function sitemap() {
  // Base paths
  const routes = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: getCanonicalUrl('/tools/song-extractor'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
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
        lastModified: new Date(),
        changeFrequency: isHigh ? 'daily' : 'weekly',
        priority: isHigh ? 0.9 : 0.8,
      });
    }
  });

  return routes;
}
