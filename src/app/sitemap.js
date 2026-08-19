import { TOOLS } from '@/lib/toolsConfig';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iloveaudios.com';

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

  // Add conversion tools dynamically
  Object.keys(TOOLS).forEach((slug) => {
    if (slug !== 'song-extractor') {
      routes.push({
        url: `${baseUrl}/tools/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  });

  return routes;
}
