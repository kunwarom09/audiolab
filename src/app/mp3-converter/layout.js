import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'MP3 Converter – Convert Any Audio or Video to MP3 Free | iLoveAudios',
  description: 'Free online MP3 converter. Convert MOV, AVI, OGG, WAV and more to MP3 in seconds, with no signup.',
  keywords: [
    'mp3 converter',
    'online mp3 converter',
    'free mp3 converter',
    'convert to mp3',
    'audio to mp3',
    'video to mp3'
  ],
  alternates: {
    canonical: getCanonicalUrl('/mp3-converter'),
  },
  openGraph: {
    title: 'MP3 Converter – Convert Any Audio or Video to MP3 Free | iLoveAudios',
    description: 'Free online MP3 converter. Convert MOV, AVI, OGG, WAV and more to MP3 in seconds, with no signup.',
    url: getCanonicalUrl('/mp3-converter'),
    type: 'website',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MP3 Converter – Convert Any Audio or Video to MP3 Free | iLoveAudios',
    description: 'Free online MP3 converter. Convert MOV, AVI, OGG, WAV and more to MP3 in seconds, with no signup.',
  },
};

export default function Mp3ConverterHubLayout({ children }) {
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'iLoveAudios MP3 Converter',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Audio & Video Converter',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Free online MP3 converter to convert video and audio files to MP3 in seconds with no signup.',
    url: getCanonicalUrl('/mp3-converter'),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2150',
      bestRating: '5',
      worstRating: '1'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'MP3 Converter', item: getCanonicalUrl('/mp3-converter') }
    ]
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Convert Any Audio or Video to MP3 Online',
    description: '3 simple steps to convert any audio or video file into MP3 format with iLoveAudios.',
    totalTime: 'PT30S',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Select Your Converter',
        text: 'Choose your desired conversion tool from our MP3 converter grid below.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Upload and Set Bitrate',
        text: 'Upload your file and select your preferred MP3 bitrate (128kbps, 192kbps, or 320kbps).'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Convert & Download',
        text: 'Click Convert to process your audio with FFmpeg and download your finished MP3 track instantly.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the maximum file size for MP3 conversions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can upload files up to 500MB per file with completely unlimited conversions on iLoveAudios.'
        }
      },
      {
        '@type': 'Question',
        name: 'What audio quality bitrates are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support 128kbps (lightweight/speech), 192kbps (standard listening), and studio-grade 320kbps for maximum fidelity.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this MP3 converter completely free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! It is 100% free with no registration, no subscriptions, and no watermarks.'
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
