import React from 'react';
import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Free Audio Cutter & MP3 Trimmer – Cut Songs Online | iLoveAudios',
  description: 'Cut and trim MP3, WAV, M4A & audio files online for free. Select precise start and end times, preview playback, and download instantly. No signup.',
  keywords: [
    'audio cutter',
    'mp3 cutter',
    'cut audio online',
    'trim mp3 online',
    'song cutter',
    'audio trimmer',
    'free mp3 cutter',
    'cut song for ringtone',
    'split audio online',
    'iloveaudios'
  ],
  alternates: {
    canonical: getCanonicalUrl('/tools/audio-cutter'),
  },
  openGraph: {
    title: 'Free Audio Cutter & MP3 Trimmer – Cut Songs Online | iLoveAudios',
    description: 'Cut and trim MP3, WAV, M4A & audio files online for free. Select precise start and end times, preview playback, and download instantly. No signup.',
    url: getCanonicalUrl('/tools/audio-cutter'),
    type: 'website',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Audio Cutter & MP3 Trimmer – Cut Songs Online | iLoveAudios',
    description: 'Cut and trim MP3, WAV, M4A & audio files online for free. Select precise start and end times, preview playback, and download instantly. No signup.',
  },
};

export default function AudioCutterLayout({ children }) {
  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'iLoveAudios Audio Cutter & MP3 Trimmer',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Audio Editing Tool',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Free online tool to trim, cut, and splice MP3, WAV, and audio files with sub-second accuracy.',
    url: getCanonicalUrl('/tools/audio-cutter'),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Audio Utilities', item: `${SITE_URL}/#tools-suite` },
      { '@type': 'ListItem', position: 3, name: 'Audio Cutter', item: getCanonicalUrl('/tools/audio-cutter') }
    ]
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Cut and Trim Audio Files Online for Free',
    description: 'Step-by-step guide to trim MP3, WAV, or voice notes online with iLoveAudios Audio Cutter.',
    totalTime: 'PT30S',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Upload Your Audio File', text: 'Drag and drop your MP3, WAV, M4A, or audio file into the Audio Cutter.' },
      { '@type': 'HowToStep', position: 2, name: 'Set Start and End Time', text: 'Select your desired start time and end time or drag the playback sliders.' },
      { '@type': 'HowToStep', position: 3, name: 'Cut & Download', text: 'Click "Cut Audio" to instantly transcode and download your trimmed MP3.' }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I cut an MP3 or audio file online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Upload your audio file, adjust the start and end time markers or type exact timestamps, preview your selection, and click "Cut Audio" to download your trimmed track.'
        }
      },
      {
        '@type': 'Question',
        name: 'What audio formats can I cut?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Audio Cutter supports MP3, WAV, FLAC, M4A, AAC, OGG, OPUS, and audio streams from MP4 and MOV videos.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is there any quality loss when trimming audio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, our audio trimmer processes audio with maximum bitrate preservation so your cut snippet sounds just as crisp as the original.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I make iPhone ringtones with Audio Cutter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Trim any song to 30 seconds, export as MP3 or M4R, and set it as your custom iPhone or Android ringtone.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this audio cutter free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% free with unlimited trims and no registration required.'
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      {children}
    </>
  );
}
