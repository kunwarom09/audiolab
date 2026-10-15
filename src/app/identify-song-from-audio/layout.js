import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Identify Song from Audio – Free AI Audio File Music Finder | iLoveAudios',
  description: 'Identify song from audio files online for free. Upload MP3, WAV, M4A, FLAC, or OGG tracks to discover song title, artist, full lyrics, and MP3 download.',
  keywords: [
    'identify song from audio',
    'identify song from audio file',
    'ai song finder from audio'
  ],
  alternates: {
    canonical: getCanonicalUrl('/identify-song-from-audio'),
  },
  openGraph: {
    title: 'Identify Song from Audio – Free AI Audio File Music Finder | iLoveAudios',
    description: 'Identify song from audio files online for free. Upload MP3, WAV, M4A, FLAC, or OGG tracks to discover song title, artist, full lyrics, and MP3 download.',
    url: getCanonicalUrl('/identify-song-from-audio'),
    type: 'website',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Identify Song from Audio – Free AI Audio File Music Finder | iLoveAudios',
    description: 'Identify song from audio files online for free. Upload MP3, WAV, M4A, FLAC, or OGG tracks to discover song title, artist, full lyrics, and MP3 download.',
  },
};

export default function IdentifySongFromAudioLayout({ children }) {
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'iLoveAudios Identify Song from Audio',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Audio Music Recognition Tool',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Free tool to identify song from audio files and voice notes online with sub-second acoustic fingerprint matching.',
    url: getCanonicalUrl('/identify-song-from-audio'),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1430',
      bestRating: '5',
      worstRating: '1'
    }
  };

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
        name: 'AI Song Finder',
        item: getCanonicalUrl('/tools/song-extractor')
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Identify Song from Audio',
        item: getCanonicalUrl('/identify-song-from-audio')
      }
    ]
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Identify Any Song from an Audio File',
    description: 'Step-by-step guide to identify tracks from uploaded MP3, WAV, M4A, or FLAC audio files.',
    totalTime: 'PT15S',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Upload Your Audio Track',
        text: 'Select or drag and drop your MP3, WAV, M4A, FLAC, or OGG file up to 100MB into the upload box.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Select Timestamp Window',
        text: 'Analyze the entire track or select a custom 15-second snippet to bypass speech, intros, or noisy segments.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Get Title, Lyrics & MP3',
        text: 'Instantly view verified track details, album cover art, synchronized lyrics, and download the full MP3.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What audio file formats can I upload to identify a song?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can upload MP3, WAV, AAC, M4A (Apple Voice Memos), FLAC, OGG, OPUS, and AIFF files up to 100MB.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I identify an audio file with someone speaking over the music?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our custom timestamp slider allows you to select any 15-second segment where the background music is prominent, avoiding intro speaking or interview dialogue.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are my uploaded audio files stored permanently on your servers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Uploaded files are processed in encrypted temporary storage and automatically deleted within minutes after acoustic matching.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I identify iPhone Voice Memos saved as .m4a files?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! You can share your iPhone Voice Memo or upload the .m4a file directly from your Files or iCloud Drive into iLoveAudios.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareAppSchema).replace(/</g, '\\u003c')
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c')
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c')
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c')
        }}
      />
      {children}
    </>
  );
}
