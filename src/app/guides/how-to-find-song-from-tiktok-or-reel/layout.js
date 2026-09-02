import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'How to Find Any Song in a TikTok or Instagram Reel (Even "Original Sound") | iLoveAudios Guide',
  description: 'Learn how to identify background songs from Instagram Reels, TikTok videos, and YouTube Shorts in seconds—even when labeled as "Original Sound" with no credits.',
  keywords: [
    'how to find song from tiktok',
    'find song from instagram reel',
    'tiktok song finder',
    'reels song identifier',
    'identify tiktok audio',
    'original sound tiktok song name',
    'what song is this reel'
  ],
  alternates: {
    canonical: getCanonicalUrl('/guides/how-to-find-song-from-tiktok-or-reel'),
  },
  openGraph: {
    title: 'How to Find Any Song in a TikTok or Instagram Reel (Even "Original Sound")',
    description: 'Learn how to identify background songs from Instagram Reels, TikTok videos, and YouTube Shorts in seconds—even when labeled as "Original Sound".',
    url: getCanonicalUrl('/guides/how-to-find-song-from-tiktok-or-reel'),
    type: 'article',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Find Any Song in a TikTok or Instagram Reel (Even "Original Sound")',
    description: 'Learn how to identify background songs from Instagram Reels, TikTok videos, and YouTube Shorts in seconds.',
  },
};

export default function GuideLayout({ children }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: `${SITE_URL}/#tools-suite`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How to Find Any Song in TikTok or Reels',
        item: getCanonicalUrl('/guides/how-to-find-song-from-tiktok-or-reel')
      }
    ]
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Find Any Song in a TikTok or Instagram Reel (Even "Original Sound")',
    description: 'Step-by-step guide to identify background songs from social media videos without music credits.',
    author: {
      '@type': 'Organization',
      name: 'iLoveAudios Sound Engineering Team',
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: 'iLoveAudios',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`
      }
    },
    datePublished: '2026-09-01T00:00:00.000Z',
    dateModified: '2026-09-02T00:00:00.000Z',
    mainEntityOfPage: getCanonicalUrl('/guides/how-to-find-song-from-tiktok-or-reel')
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c')
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c')
        }}
      />
      {children}
    </>
  );
}
