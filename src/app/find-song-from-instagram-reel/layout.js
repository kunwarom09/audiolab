import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Find Song from Instagram Reel – Free Reel Audio Finder | iLoveAudios',
  description: 'Find song from Instagram reel or story online for free. Paste any reel link to identify background music, discover artist name, lyrics, and download MP3.',
  keywords: [
    'find song from instagram reel',
    'find song from instagram',
    'find song from reel',
    'song finder from reel',
    'instagram song finder',
    'identify song from instagram video',
    'find song from instagram story'
  ],
  alternates: {
    canonical: getCanonicalUrl('/find-song-from-instagram-reel'),
  },
  openGraph: {
    title: 'Find Song from Instagram Reel – Free Reel Audio Finder | iLoveAudios',
    description: 'Find song from Instagram reel or story online for free. Paste any reel link to identify background music, discover artist name, lyrics, and download MP3.',
    url: getCanonicalUrl('/find-song-from-instagram-reel'),
    type: 'website',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Song from Instagram Reel – Free Reel Audio Finder | iLoveAudios',
    description: 'Find song from Instagram reel or story online for free. Paste any reel link to identify background music, discover artist name, lyrics, and download MP3.',
  },
};

export default function InstagramReelLayout({ children }) {
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'iLoveAudios Instagram Reel Song Finder',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Music Recognition Tool',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Free online tool to find song from Instagram reel links and stories with verified artist info, lyrics, and MP3 download.',
    url: getCanonicalUrl('/find-song-from-instagram-reel'),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1780',
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
      { '@type': 'ListItem', position: 3, name: 'Find Song from Instagram Reel', item: getCanonicalUrl('/find-song-from-instagram-reel') }
    ]
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Find a Song from an Instagram Reel or Story',
    description: 'Step-by-step guide to copy an Instagram Reel link and identify its background audio.',
    totalTime: 'PT15S',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Copy Instagram Reel Link',
        text: 'In the Instagram app, tap the Paper Plane (Share) icon on the bottom right of the Reel, then tap "Copy Link". On desktop, copy the URL from your browser address bar.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Paste Link into iLoveAudios',
        text: 'Paste the copied instagram.com/reel link into the input box and click Find Song.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Discover Song, Lyrics & MP3',
        text: 'View the verified artist name, song title, synchronized lyrics, and download the full song as a 192kbps MP3.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I identify a song from an Instagram Reel when it says "Original Audio"?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When creators edit clips outside Instagram in editors like CapCut or InShot, Instagram tags the soundtrack as "Original Audio". Our recognition engine extracts the underlying acoustic frequencies and matches them against Shazam\'s 50M+ track database, finding the genuine commercial title regardless of the Instagram label.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I find a song from an Instagram Story?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If the story is on a public profile, you can copy the Story link and paste it here. If the account is private or the story has expired, screen-record the clip on your phone and upload the video file directly to our Upload tab.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does this work on private Instagram accounts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Our server requires public access to stream the audio. For private Reels or DMs, simply screen-record the clip and upload the video file into our tool.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I download the identified Instagram Reel music as an MP3?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! As soon as the song is identified, you can download a clean, full-length 192kbps MP3 track with complete ID3 tags and lyrics.'
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
