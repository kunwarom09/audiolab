import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'MP4 vs M4A vs MOV: How to Extract High-Quality MP3 from Any Video | iLoveAudios Guide',
  description: 'Understand the differences between MP4, M4A, and MOV containers and learn how to extract 320kbps studio-grade MP3 audio tracks without quality loss.',
  keywords: [
    'mp4 vs m4a vs mov',
    'mp4 to mp3 vs m4a to mp3',
    'extract audio from iphone video',
    'best format to convert to mp3',
    'convert video to audio 320kbps',
    'convert mov to mp3 iphone'
  ],
  alternates: {
    canonical: getCanonicalUrl('/guides/mp4-vs-m4a-vs-mov-audio-converter'),
  },
  openGraph: {
    title: 'MP4 vs M4A vs MOV: How to Extract High-Quality MP3 from Any Video',
    description: 'Learn how to extract 320kbps studio-grade MP3 audio tracks from MP4, M4A, and MOV videos without quality loss.',
    url: getCanonicalUrl('/guides/mp4-vs-m4a-vs-mov-audio-converter'),
    type: 'article',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MP4 vs M4A vs MOV: How to Extract High-Quality MP3 from Any Video',
    description: 'Learn how to extract 320kbps studio-grade MP3 audio tracks from MP4, M4A, and MOV videos without quality loss.',
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
        name: 'MP4 vs M4A vs MOV Audio Extraction Guide',
        item: getCanonicalUrl('/guides/mp4-vs-m4a-vs-mov-audio-converter')
      }
    ]
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'MP4 vs M4A vs MOV: How to Extract High-Quality MP3 from Any Video or Recording',
    description: 'Complete guide explaining audio container formats and how to extract pristine 320kbps MP3 tracks online.',
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
    mainEntityOfPage: getCanonicalUrl('/guides/mp4-vs-m4a-vs-mov-audio-converter')
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
