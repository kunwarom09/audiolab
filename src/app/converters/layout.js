import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Audio Converter Online – Free Video to Audio & Format Directory | iLoveAudios',
  description: 'Convert audio and video files online for free. Extract 320kbps MP3 from MP4, MOV, WAV, FLAC, M4A, OGG & 25+ formats with no file limits or signup.',
  keywords: [
    'audio converter',
    'audio converter online',
    'free audio converter',
    'video to audio converter',
    'convert mp4 to mp3',
    'convert m4a to mp3',
    'convert wav to mp3',
    'convert flac to mp3',
    'best audio format',
    'online audio tools',
    'audio format converter'
  ],
  alternates: {
    canonical: getCanonicalUrl('/converters'),
  },
  openGraph: {
    title: 'Audio Converter Online – Free Video to Audio & Format Directory | iLoveAudios',
    description: 'Convert audio and video files online for free. Extract 320kbps MP3 from MP4, MOV, WAV, FLAC, M4A, OGG & 25+ formats with no file limits or signup.',
    url: getCanonicalUrl('/converters'),
    type: 'website',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Audio Converter Online – Free Video to Audio & Format Directory | iLoveAudios',
    description: 'Convert audio and video files online for free. Extract 320kbps MP3 from MP4, MOV, WAV, FLAC, M4A, OGG & 25+ formats with no file limits or signup.',
  },
};

export default function ConvertersLayout({ children }) {
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
        name: 'Converters',
        item: getCanonicalUrl('/converters')
      }
    ]
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free Online Audio Converter Directory & Format Guide',
    description: 'Comprehensive directory of free online audio converters, format comparisons, and video audio extraction tools.',
    url: getCanonicalUrl('/converters')
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
          __html: JSON.stringify(webPageSchema).replace(/</g, '\\u003c')
        }}
      />
      {children}
    </>
  );
}
