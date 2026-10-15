import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'AI Song Finder from Video – Free Link Identifier | iLoveAudios',
  description: 'Free AI song finder from video. Find song from video link or uploaded clip, identify song from video in seconds, and get verified lyrics & MP3 download.',
  keywords: [
    'ai song finder from video',
    'find song from video link',
    'identify song from video',
    'ai song finder by video',
    'ai song identifier from video',
    'ai song detector from video'
  ],
  alternates: {
    canonical: getCanonicalUrl('/song-finder-from-video'),
  },
  openGraph: {
    title: 'AI Song Finder from Video – Free Link Identifier | iLoveAudios',
    description: 'Free AI song finder from video. Find song from video link or uploaded clip, identify song from video in seconds, and get verified lyrics & MP3 download.',
    url: getCanonicalUrl('/song-finder-from-video'),
    type: 'website',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Song Finder from Video – Free Link Identifier | iLoveAudios',
    description: 'Free AI song finder from video. Find song from video link or uploaded clip, identify song from video in seconds, and get verified lyrics & MP3 download.',
  },
};

export default function SongFinderFromVideoLayout({ children }) {
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'iLoveAudios AI Song Finder from Video',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Music Recognition Tool',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Free AI song finder from video to identify music and background songs from video links and uploaded clips.',
    url: getCanonicalUrl('/song-finder-from-video'),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1620',
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
        name: 'AI Song Finder from Video',
        item: getCanonicalUrl('/song-finder-from-video')
      }
    ]
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Find Any Song from a Video Link or Clip',
    description: 'Step-by-step guide to extract and identify background music from video links or files with iLoveAudios.',
    totalTime: 'PT15S',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Copy or Upload Video',
        text: 'Copy the share link of any public video or upload an MP4, MOV, or WebM video file.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'AI Demuxing & Matching',
        text: 'Our AI demuxer strips video frames, isolates acoustic frequencies, and compares the audio fingerprint against 50M+ tracks.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'View Track & Save MP3',
        text: 'Instantly view verified artist information, synchronized lyrics, and download the full song in high-definition 192kbps MP3.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What video platforms can I identify songs from with this tool?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can identify background songs from Instagram Reels, TikTok videos, YouTube Shorts, Facebook Reels, Snapchat Spotlight, and uploaded MP4, MOV, WebM, and MKV video files up to 100MB.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does an AI song finder extract music from video links?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our backend utilizes fast cloud demuxing to separate the audio container from the video data stream. The audio is normalized into a linear PCM acoustic fingerprint and matched against a catalog of over 50 million commercial songs.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can this tool recognize music if someone speaks over the video?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our acoustic landmark filters track melodic and rhythmic peaks beneath human vocal frequencies. If talking is especially loud, you can upload the clip and select a 15-second timestamp segment where speech is minimal.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is it completely free to identify songs from video links?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% free with no search caps, no watermarks, and no registration required.'
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
