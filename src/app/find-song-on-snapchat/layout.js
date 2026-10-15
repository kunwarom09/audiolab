import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Find Song on Snapchat – Free Spotlight Music Finder | iLoveAudios',
  description: 'Find song on Snapchat Spotlight and public stories online free. Identify background songs, unmask creator audio, and get full lyrics with MP3 download.',
  keywords: [
    'find song on snapchat',
    'snapchat song finder',
    'identify song from snapchat video',
    'find song from snapchat story'
  ],
  alternates: {
    canonical: getCanonicalUrl('/find-song-on-snapchat'),
  },
  openGraph: {
    title: 'Find Song on Snapchat – Free Spotlight Music Finder | iLoveAudios',
    description: 'Find song on Snapchat Spotlight and public stories online free. Identify background songs, unmask creator audio, and get full lyrics with MP3 download.',
    url: getCanonicalUrl('/find-song-on-snapchat'),
    type: 'website',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Song on Snapchat – Free Spotlight Music Finder | iLoveAudios',
    description: 'Find song on Snapchat Spotlight and public stories online free. Identify background songs, unmask creator audio, and get full lyrics with MP3 download.',
  },
};

export default function SnapchatSongFinderLayout({ children }) {
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'iLoveAudios Snapchat Song Finder',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Music Recognition Tool',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Free online tool to find song on Snapchat Spotlight and public stories with verified artist details, lyrics, and MP3 download.',
    url: getCanonicalUrl('/find-song-on-snapchat'),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1310',
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
      { '@type': 'ListItem', position: 3, name: 'Find Song on Snapchat', item: getCanonicalUrl('/find-song-on-snapchat') }
    ]
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Find a Song from Snapchat Spotlight or Story',
    description: 'Step-by-step guide to copy a Snapchat link and identify any underlying soundtrack.',
    totalTime: 'PT15S',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Copy Snapchat Video Link',
        text: 'In Snapchat Spotlight or on a public Story, tap the Share icon, then select "Copy Link".'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Paste Link into iLoveAudios',
        text: 'Paste the copied snapchat.com link into our Snapchat Song Finder search bar and click Find Song.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'View Track & Save MP3',
        text: 'Get verified artist info, track name, synchronized lyrics, and download the full song as a 192kbps MP3.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I identify a song from Snapchat Spotlight?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Open the Spotlight clip in Snapchat, tap the Share icon on the right side, tap "Copy Link", and paste the URL into iLoveAudios. Our recognition engine extracts the background audio and matches the song in seconds.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I find songs from private friend Snaps or direct chats?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Private snaps cannot be accessed via public links. However, you can screen record the Snap on your phone, save it to your camera roll, and upload the video file into our Upload tab for instant recognition.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does this work on Snapchat Lenses that have custom music?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Even if the audio is part of a viral Snapchat Lens, our AI isolates the musical frequencies and cross-references them against our 50M+ song database.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is the Snapchat song finder free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% free with unlimited song lookups, synchronized lyrics, and full MP3 downloads.'
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
