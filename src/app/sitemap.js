import { TOOLS } from '@/lib/toolsConfig';

export default function sitemap() {
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.iloveaudios.com';
  const baseUrl = rawBaseUrl.replace(/\/+$/, '');

  // Base paths
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools/song-extractor`,
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
    'mov-to-mp3'
  ]);

  // Add conversion tools dynamically
  Object.keys(TOOLS).forEach((slug) => {
    if (slug !== 'song-extractor') {
      const isHigh = highPrioritySlugs.has(slug);
      routes.push({
        url: `${baseUrl}/tools/${slug}`,
        lastModified: new Date(),
        changeFrequency: isHigh ? 'daily' : 'weekly',
        priority: isHigh ? 0.9 : 0.8,
      });
    }
  });

  return routes;
}
