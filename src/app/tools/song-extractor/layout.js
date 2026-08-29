const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.iloveaudios.com';
const siteUrl = rawSiteUrl.replace(/\/+$/, '');

export const metadata = {
  title: 'Free AI Song Finder – Identify Songs from Reels, TikTok & Videos | iLoveAudios',
  description: 'Identify songs from Instagram Reels, TikTok, Facebook Reels & Shorts in seconds. 100% free, no signup, get full lyrics, artist info & MP3 download.',
  keywords: [
    'song finder',
    'song finder from video',
    'song finder from reel',
    'identify song from video',
    'identify song from Instagram Reel',
    'find song from TikTok',
    'find song from Facebook Reel',
    'identify music from video',
    'find background song from video',
    'music finder online free',
    'song identifier online',
    'find a song by video link'
  ],
  alternates: {
    canonical: `${siteUrl}/tools/song-extractor`,
  },
  openGraph: {
    title: 'Free AI Song Finder – Identify Songs from Reels, TikTok & Videos | iLoveAudios',
    description: 'Identify songs from Instagram Reels, TikTok, Facebook Reels & Shorts in seconds. 100% free, no signup, get full lyrics, artist info & MP3 download.',
    url: `${siteUrl}/tools/song-extractor`,
    type: 'website',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Song Finder – Identify Songs from Reels, TikTok & Videos | iLoveAudios',
    description: 'Identify songs from Instagram Reels, TikTok, Facebook Reels & Shorts in seconds. 100% free, no signup, get full lyrics, artist info & MP3 download.',
  },
};

export default function SongExtractorLayout({ children }) {
  // 1. SoftwareApplication Schema
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'iLoveAudios AI Song Finder',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Music Recognition Tool',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Free online tool to identify background music and songs from Instagram Reels, TikTok, Facebook Reels, and Snapchat video links.',
    url: `${siteUrl}/tools/song-extractor`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      ratingCount: '2840'
    }
  };

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AI Tools',
        item: `${siteUrl}/#tools-suite`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'AI Song Finder',
        item: `${siteUrl}/tools/song-extractor`
      }
    ]
  };

  // 3. HowTo Schema
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Find Any Song from an Instagram Reel or TikTok Video',
    description: 'Step-by-step guide to identify background songs from social media videos for free with iLoveAudios AI Song Finder.',
    totalTime: 'PT30S',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Copy Video Link',
        text: 'Open Instagram, TikTok, Facebook, or Snapchat and copy the public share link of the reel or video.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Paste Link into Song Finder',
        text: 'Paste the copied URL into the search bar on iLoveAudios and click "Find Song".'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Get Song Title, Lyrics & MP3',
        text: 'Our AI extracts the acoustic fingerprint and displays the verified track title, artist name, lyrics, and MP3 download.'
      }
    ]
  };

  // 4. FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a song from an Instagram Reel or TikTok video?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Copy the public video or reel link from Instagram, TikTok, Facebook, or Snapchat. Paste it into the iLoveAudios search box and click "Find Song". Our acoustic recognition engine isolates the background audio and returns the exact track title, artist name, album, lyrics, and music video.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does this song finder work on videos without music credit titles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Even if the creator used an "Original Audio" label or didn\'t tag the song, our AI compares the raw acoustic waveform against Shazam\'s global music database to identify the underlying track.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I download the identified song as an MP3 file?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Once your song is identified, click "Download Full Song (MP3)" to save a clean, high-quality 192kbps audio file directly to your device.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does iLoveAudios Song Finder work on private accounts or videos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The video must be hosted on a public profile so our server can download and analyze the audio stream. Private Instagram or TikTok accounts cannot be scanned.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this AI Song Identifier completely free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% free with unlimited song lookups, synchronized lyrics viewing, YouTube video playback, and MP3 downloads without any account registration or subscription.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I search by typing partial lyrics if I don\'t have a video link?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If Shazam recognition cannot find an acoustic match (e.g. background voiceover is too loud), our engine automatically analyzes captions and video text to search lyrics databases for matching titles.'
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
