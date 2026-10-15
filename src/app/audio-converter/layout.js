import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Audio Converter – Free Online Audio & Video Converter | iLoveAudios',
  description: 'Free online audio converter. Convert between MP3, WAV, FLAC, M4A, OGG, ALAC, and 30+ audio and video formats. High quality 320kbps, secure, with no signup.',
  keywords: [
    'audio converter',
    'audio format converter',
    'online audio converter',
    'free audio converter',
    'convert audio files',
    'video to audio converter'
  ],
  alternates: {
    canonical: getCanonicalUrl('/audio-converter'),
  },
  openGraph: {
    title: 'Audio Converter – Free Online Audio & Video Converter | iLoveAudios',
    description: 'Free online audio converter. Convert between MP3, WAV, FLAC, M4A, OGG, ALAC, and 30+ audio and video formats. High quality 320kbps, secure, with no signup.',
    url: getCanonicalUrl('/audio-converter'),
    type: 'website',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Audio Converter – Free Online Audio & Video Converter | iLoveAudios',
    description: 'Free online audio converter. Convert between MP3, WAV, FLAC, M4A, OGG, ALAC, and 30+ audio and video formats. High quality 320kbps, secure, with no signup.',
  },
};

export default function AudioConverterHubLayout({ children }) {
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'iLoveAudios Audio Converter',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Audio Format Converter Directory',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Free online audio converter to convert across 30+ audio and video formats with lossless and 320kbps presets.',
    url: getCanonicalUrl('/audio-converter'),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2340',
      bestRating: '5',
      worstRating: '1'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Audio Converter', item: getCanonicalUrl('/audio-converter') }
    ]
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Convert Audio Formats Online for Free',
    description: '3 simple steps to convert between any audio or video format with iLoveAudios.',
    totalTime: 'PT30S',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Select Source and Target Format',
        text: 'Choose your desired format converter tool from our directory below (e.g. WAV to FLAC, ALAC to FLAC, or MP4 to MP3).'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Upload and Configure Settings',
        text: 'Upload your file and select your preferred bitrate, sample rate, or lossless compression level.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Download Transcoded File',
        text: 'Click Convert and instantly download your converted audio file with complete metadata preservation.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What audio formats are supported by this audio converter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support conversions across MP3, WAV, FLAC, M4A, AAC, OGG, OPUS, ALAC, AIFF, WMA, AMR, M4R ringtones, and video formats including MP4, MOV, WebM, MKV, and AVI.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I perform lossless audio conversions (like WAV to FLAC or ALAC to FLAC)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our lossless tools use bit-perfect PCM decompression and recompression to guarantee zero generational loss of acoustic frequencies.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this audio converter free to use with no limits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% free with support for files up to 500MB and no daily conversion limits or watermarks.'
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      {children}
    </>
  );
}
