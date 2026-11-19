import React from 'react';
import SongFinderSection from '@/components/SongFinderSection';
import ToolGrid from '@/components/ToolGrid';
import FaqSection from '@/components/FaqSection';
import { TOOLS } from '@/lib/toolsConfig';
import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does the AI Song Finder work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Paste any Instagram Reel, TikTok video, Facebook Reel, or Snapchat Spotlight URL. Our Shazam-powered audio recognition engine extracts the background audio stream and matches its acoustic fingerprint against millions of tracks to identify the song title, artist, album, and release details in seconds.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this online Song Finder completely free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! You can identify unlimited songs, view complete synchronized lyrics, watch official YouTube music videos, and download high-quality MP3 files with zero cost and no account registration required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I download the extracted song as an MP3?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Once the song is identified, simply click the "Download Full Song (MP3)" button. Our engine will fetch and convert the track into a high-quality 192kbps MP3 audio file directly onto your device.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which social media platforms are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Song Finder supports direct video links from Instagram Reels, TikTok Videos, Facebook Reels, Snapchat Spotlight, and YouTube Shorts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I view full lyrics and watch the official music video?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, every extraction automatically provides complete line-by-line song lyrics with a built-in search filter and one-click copy button, as well as an embedded official YouTube music video player.',
        },
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'iLoveAudios Free Audio Tools & Converters',
    numberOfItems: Object.keys(TOOLS).length,
    itemListElement: Object.values(TOOLS).map((tool, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: tool.title,
      description: tool.description,
      url: getCanonicalUrl(`/tools/${tool.slug}`),
    })),
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'iLoveAudios',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '2.0.0',
    description: 'Free online audio tools and converters to convert, edit, and identify audio files.',
    url: SITE_URL,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'AI Song Identification & Extraction from Reels, TikTok & Shorts',
      'MP4 to MP3 Audio Extraction',
      'MP4 to WAV Lossless Audio Extraction',
      'MOV to MP3 & MOV to WAV Audio Extraction',
      'AVI, MKV, WebM, 3GP, WMV to MP3 Converters',
      'MP3 to WAV & WAV to MP3 Conversion',
      'FLAC to MP3 & FLAC to WAV Audio Conversion',
      'M4A to MP3 & M4A to WAV Apple Audio Conversion',
      'AAC, OGG, WMA, OPUS, M4R Audio Converters',
      'Studio Quality 320kbps MP3 Bitrate Support',
      'Synchronized Song Lyrics Lookup',
      'Fast Cloud-Accelerated Audio Processing',
    ],
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema).replace(/</g, '\\u003c'),
        }}
      />

      <SongFinderSection />

      <ToolGrid />

      <div className="site-container">
        <FaqSection />
      </div>
    </div>
  );
}
