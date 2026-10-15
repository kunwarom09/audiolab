import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Find Song from TikTok – Free TikTok Sound Finder | iLoveAudios',
  description: 'Find song from TikTok videos online for free. Uncover hidden songs behind TikTok original sounds, get verified track names, lyrics, and MP3 download.',
  keywords: [
    'find song from tiktok',
    'tiktok song finder',
    'tiktok sound finder',
    'identify song from tiktok video',
    'find original sound tiktok'
  ],
  alternates: {
    canonical: getCanonicalUrl('/find-song-from-tiktok'),
  },
  openGraph: {
    title: 'Find Song from TikTok – Free TikTok Sound Finder | iLoveAudios',
    description: 'Find song from TikTok videos online for free. Uncover hidden songs behind TikTok original sounds, get verified track names, lyrics, and MP3 download.',
    url: getCanonicalUrl('/find-song-from-tiktok'),
    type: 'website',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Song from TikTok – Free TikTok Sound Finder | iLoveAudios',
    description: 'Find song from TikTok videos online for free. Uncover hidden songs behind TikTok original sounds, get verified track names, lyrics, and MP3 download.',
  },
};

export default function TikTokSongFinderLayout({ children }) {
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'iLoveAudios TikTok Song Finder',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Music Recognition Tool',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Free online tool to find song from TikTok videos and uncover original sounds with lyrics and MP3 download.',
    url: getCanonicalUrl('/find-song-from-tiktok'),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1940',
      bestRating: '5',
      worstRating: '1'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'AI Song Finder', item: getCanonicalUrl('/tools/song-extractor') },
      { '@type': 'ListItem', position: 3, name: 'Find Song from TikTok', item: getCanonicalUrl('/find-song-from-tiktok') }
    ]
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Find a Song from a TikTok Video',
    description: 'Step-by-step guide to copy a TikTok link and identify any underlying song or sound.',
    totalTime: 'PT15S',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Copy TikTok Video Link',
        text: 'In the TikTok app, tap the Share (arrow) icon on the right side of the video, then tap "Copy Link".'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Paste Link into iLoveAudios',
        text: 'Paste the copied TikTok link (vm.tiktok.com or tiktok.com/@user/video/...) into the search bar and click Find Song.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Discover Real Track & Save MP3',
        text: 'View the official artist name, original song title, synchronized lyrics, and download the full song in high-quality 192kbps MP3.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find the original song on TikTok when it says "Original Sound"?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When creators export videos from CapCut or third-party apps, TikTok labels the audio as "Original Sound - creator". Paste the link into iLoveAudios: our AI extracts the raw audio waveform and matches its acoustic fingerprint against 50M+ commercial songs to find the true title and artist.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can this TikTok sound finder identify sped-up or slowed + reverb songs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our acoustic engine normalizes tempo shifts and pitch alterations, cross-referencing harmonic peaks and lyrics to detect the original song.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does it support short links like vm.tiktok.com and vt.tiktok.com?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all TikTok URL formats—including mobile short links (vm.tiktok.com, vt.tiktok.com) and full desktop URLs—are automatically resolved and supported.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I download the identified TikTok song as an MP3?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Once identified, click "Download Full Song (MP3)" to save a 192kbps MP3 file with lyrics and album cover art.'
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
