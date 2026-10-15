import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Find Song from YouTube Shorts – Free Shorts Music Finder | iLoveAudios',
  description: 'Find song from YouTube Shorts online for free. Identify background music from any Shorts link, get artist details, official music video, lyrics & MP3.',
  keywords: [
    'find song from youtube shorts',
    'youtube shorts song finder',
    'identify song from youtube short',
    'shorts music finder'
  ],
  alternates: {
    canonical: getCanonicalUrl('/find-song-from-youtube-shorts'),
  },
  openGraph: {
    title: 'Find Song from YouTube Shorts – Free Shorts Music Finder | iLoveAudios',
    description: 'Find song from YouTube Shorts online for free. Identify background music from any Shorts link, get artist details, official music video, lyrics & MP3.',
    url: getCanonicalUrl('/find-song-from-youtube-shorts'),
    type: 'website',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Song from YouTube Shorts – Free Shorts Music Finder | iLoveAudios',
    description: 'Find song from YouTube Shorts online for free. Identify background music from any Shorts link, get artist details, official music video, lyrics & MP3.',
  },
};

export default function YouTubeShortsSongFinderLayout({ children }) {
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'iLoveAudios YouTube Shorts Song Finder',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Music Recognition Tool',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Free online tool to find song from YouTube Shorts video links with lyrics, official video preview, and MP3 download.',
    url: getCanonicalUrl('/find-song-from-youtube-shorts'),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1850',
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
      { '@type': 'ListItem', position: 3, name: 'Find Song from YouTube Shorts', item: getCanonicalUrl('/find-song-from-youtube-shorts') }
    ]
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Find a Song from a YouTube Shorts Video',
    description: 'Step-by-step guide to copy a YouTube Shorts link and identify its background audio.',
    totalTime: 'PT15S',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Copy YouTube Shorts Link',
        text: 'In the YouTube mobile app, tap the Share icon beneath the Short, then tap "Copy link". On desktop, copy the URL from your address bar.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Paste Link into iLoveAudios',
        text: 'Paste the copied youtube.com/shorts/... link into our search bar and click Find Song.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'View Track, Lyrics & Save MP3',
        text: 'Instantly view verified artist information, synchronized lyrics, the official music video, and download the full song as a 192kbps MP3.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I identify a song from a YouTube Short?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tap Share on the YouTube Short, tap "Copy link", and paste the URL into iLoveAudios YouTube Shorts Song Finder. Our AI demuxes the background audio stream and identifies the track in seconds.'
        }
      },
      {
        '@type': 'Question',
        name: 'Why doesn\'t the YouTube Short description show the song name?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When video creators edit music into videos outside YouTube, YouTube\'s Content ID does not always display public music credits in the description. Our acoustic recognition engine analyzes the underlying sound frequencies to uncover the official song title.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can this tool recognize remixes, nightcore, or sped-up Shorts audio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our acoustic engine performs pitch-normalized spectral matching to identify original songs even if the audio has been sped up or remixed.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I download the identified YouTube Shorts song as an MP3?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Once identified, click "Download Full Song (MP3)" to download a full-length 192kbps MP3 audio file directly to your device.'
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
