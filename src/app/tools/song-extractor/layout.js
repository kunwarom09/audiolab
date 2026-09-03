import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'AI Song Finder – Free Music Identifier from Link & Audio | iLoveAudios',
  description: 'Free AI Song Finder & Music Identifier. Identify songs from Instagram Reels, TikTok, YouTube Shorts, or audio files in seconds. Get full lyrics & MP3 download.',
  keywords: [
    'ai song finder',
    'song finder',
    'music identifier',
    'song identifier',
    'find song from video link',
    'identify song from video',
    'song finder from reel',
    'find song from instagram reel',
    'find song from tiktok',
    'tiktok song finder',
    'find song from facebook reel',
    'identify song from audio file',
    'fast song finder online',
    'record to identify song',
    'identify background music',
    'song identifier online free',
    'shazam alternative online',
    'what song is this online'
  ],
  alternates: {
    canonical: getCanonicalUrl('/tools/song-extractor'),
  },
  openGraph: {
    title: 'AI Song Finder – Free Music Identifier from Link & Audio | iLoveAudios',
    description: 'Free AI Song Finder & Music Identifier. Identify songs from Instagram Reels, TikTok, YouTube Shorts, or audio files in seconds. Get full lyrics & MP3 download.',
    url: getCanonicalUrl('/tools/song-extractor'),
    type: 'website',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Song Finder – Free Music Identifier from Link & Audio | iLoveAudios',
    description: 'Free AI Song Finder & Music Identifier. Identify songs from Instagram Reels, TikTok, YouTube Shorts, or audio files in seconds. Get full lyrics & MP3 download.',
  },
};

export default function SongExtractorLayout({ children }) {
  // 1. SoftwareApplication & WebApplication Schema
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'iLoveAudios AI Song Finder',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Music Recognition Tool',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Free online AI song finder to identify background music and songs from video links (Instagram Reels, TikTok, Facebook, Snapchat, Shorts), uploaded video/audio files, or live microphone recording.',
    url: getCanonicalUrl('/tools/song-extractor'),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1540',
      bestRating: '5',
      worstRating: '1'
    },
    featureList: [
      'Instant link extraction for Instagram Reels, TikTok, Facebook Reels, and YouTube Shorts',
      'Direct upload and analysis of MP4, MOV, WebM, MP3, WAV, M4A, FLAC files up to 100MB',
      'Real-time browser microphone live music and humming recording',
      'Full synchronized lyrics lookup and copy functionality',
      'High-quality 192kbps MP3 audio download of the identified song',
      '100% free with no account registration or software installation required'
    ]
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
        item: SITE_URL
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AI Tools',
        item: `${SITE_URL}/#tools-suite`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'AI Song Finder',
        item: getCanonicalUrl('/tools/song-extractor')
      }
    ]
  };

  // 3. HowTo Schema
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Find Any Song from a Video Link, Audio File, or Microphone',
    description: 'Step-by-step guide to identify background songs from social media videos, uploaded files, or live audio for free with iLoveAudios AI Song Finder.',
    totalTime: 'PT15S',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Choose Input Method',
        text: 'Paste a public video link (Instagram Reel, TikTok, Shorts, Facebook), upload an audio/video file, or select Record Audio to capture sound with your microphone.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'AI Acoustic Recognition',
        text: 'Click Find Song. Our AI engine extracts the acoustic fingerprint, isolates the audio frequencies, and matches against a 50M+ song catalog.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Get Title, Lyrics & MP3',
        text: 'View the verified song title, artist, album art, synchronized lyrics, official YouTube video, and download the full MP3 audio file.'
      }
    ]
  };

  // 4. FAQPage Schema (100% Exact Parity with Visible On-Page FAQs)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a song from an Instagram Reel or TikTok video?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Open the Reel or TikTok video, tap the Share button, select "Copy Link", and paste it into iLoveAudios AI Song Finder. Our recognition engine demuxes the background audio stream and matches the acoustic fingerprint to reveal the song title and artist in seconds.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does this TikTok song finder identify music labeled "Original Sound"?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When creators edit music in third-party apps like CapCut, TikTok automatically labels the audio track as "Original Sound". Our AI song finder bypasses this label: we extract the raw background audio waveform and match its acoustic frequency constellation against 50M+ tracks to identify the genuine commercial song title and artist.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I find songs from private Instagram or TikTok accounts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The video must be hosted on a public profile so our cloud recognizer can download and demux the audio track. If a video is from a private account, you can screen-record the clip, switch to our "Upload File" tab, and identify it directly from your recorded video file.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I identify music when someone is talking over the song in a Reel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our AI recognition engine utilizes acoustic landmark filtering to detect consistent musical rhythms and harmonic peaks beneath vocal speech. If dialogue is overpowering the first few seconds, use our "Try Another Section" feature or upload the video clip and specify a timestamp with less speech.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I identify a song by uploading a video or audio file?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Switch to the "Upload File" tab and upload any MP4, MOV, WebM, MP3, WAV, M4A, FLAC, or OGG file up to 100MB. You can analyze the full clip or select a specific 15-second timestamp.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I record a song playing around me in the browser?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Tap the "Record Audio" tab and record 5 to 15 seconds of the song with your device microphone. iLoveAudios captures the acoustic frequencies and identifies the track immediately.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I identify sped up, slowed, or nightcore remix songs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! If the acoustic fingerprint is pitched or tempo-shifted, our engine attempts pitch-normalized harmonic matching. If acoustic matching does not find a match, our smart fallback analyzes video captions and lyrics databases to identify the original track.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I download the identified song as an MP3 file?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Once your song is identified, click "Download Full Song (MP3)" to save a clean, high-quality 192kbps audio file directly to your device with full synchronized lyrics included.'
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
          text: 'If acoustic recognition cannot find a match due to loud dialogue or distortion, our engine automatically searches video captions and lyrics databases for matching titles and lyrics.'
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
