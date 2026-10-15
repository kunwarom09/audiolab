import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Facebook Music Identifier – Find Songs in FB Reels | iLoveAudios',
  description: 'Facebook music identifier online free. Identify background songs from Facebook reels, watch videos, and stories. Get song title, artist, lyrics & MP3.',
  keywords: [
    'facebook music identifier',
    'find song from facebook reel',
    'facebook song finder',
    'identify song from facebook video'
  ],
  alternates: {
    canonical: getCanonicalUrl('/facebook-music-identifier'),
  },
  openGraph: {
    title: 'Facebook Music Identifier – Find Songs in FB Reels | iLoveAudios',
    description: 'Facebook music identifier online free. Identify background songs from Facebook reels, watch videos, and stories. Get song title, artist, lyrics & MP3.',
    url: getCanonicalUrl('/facebook-music-identifier'),
    type: 'website',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Facebook Music Identifier – Find Songs in FB Reels | iLoveAudios',
    description: 'Facebook music identifier online free. Identify background songs from Facebook reels, watch videos, and stories. Get song title, artist, lyrics & MP3.',
  },
};

export default function FacebookMusicIdentifierLayout({ children }) {
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'iLoveAudios Facebook Music Identifier',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Music Recognition Tool',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Free online tool to identify background songs and music from Facebook Reels and Watch videos.',
    url: getCanonicalUrl('/facebook-music-identifier'),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1390',
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
      { '@type': 'ListItem', position: 3, name: 'Facebook Music Identifier', item: getCanonicalUrl('/facebook-music-identifier') }
    ]
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Identify Music from a Facebook Reel or Video',
    description: 'Step-by-step guide to copy a Facebook video link and identify its soundtrack.',
    totalTime: 'PT15S',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Copy Facebook Video Link',
        text: 'In the Facebook app, tap Share on the Reel or video, then tap "Copy Link". On desktop, right-click the video or copy the URL from your browser address bar.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Paste Link into iLoveAudios',
        text: 'Paste the copied facebook.com/reel link into our Facebook Music Identifier input.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Discover Song, Lyrics & MP3',
        text: 'Instantly view verified artist information, synchronized lyrics, and download the full song in high-quality 192kbps MP3.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I identify a song from a Facebook Reel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tap Share beneath the Facebook Reel, tap "Copy Link", and paste the URL into iLoveAudios Facebook Music Identifier. Our tool isolates the background audio track and identifies the song in seconds.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can this tool recognize music in Facebook Watch long-form videos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! You can paste links from Facebook Watch, public page videos, or live stream replays to identify the soundtrack.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does it work with private Facebook groups or profiles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The video must be hosted publicly so our cloud service can access the audio stream. For private group posts, screen record the clip on your phone or PC and upload the video file into our Upload tab.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is the Facebook music identifier free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% free with unlimited song lookups and full MP3 downloads.'
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
