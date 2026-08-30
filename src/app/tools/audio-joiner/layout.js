import React from 'react';

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iloveaudios.com';
const siteUrl = rawSiteUrl.replace(/\/+$/, '');

export const metadata = {
  title: 'Free Audio Joiner – Merge & Combine MP3 Songs Online | iLoveAudios',
  description: 'Merge multiple audio files into a single song online for free. Combine MP3, WAV, M4A tracks in any order with seamless playback. 100% free.',
  keywords: [
    'audio joiner',
    'merge audio online',
    'combine mp3',
    'join songs online',
    'audio merger free',
    'merge mp3 files',
    'combine audio tracks',
    'mp3 joiner online',
    'iloveaudios'
  ],
  alternates: {
    canonical: `${siteUrl}/tools/audio-joiner`,
  },
  openGraph: {
    title: 'Free Audio Joiner – Merge & Combine MP3 Songs Online | iLoveAudios',
    description: 'Merge multiple audio files into a single song online for free. Combine MP3, WAV, M4A tracks in any order with seamless playback. 100% free.',
    url: `${siteUrl}/tools/audio-joiner`,
    type: 'website',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Audio Joiner – Merge & Combine MP3 Songs Online | iLoveAudios',
    description: 'Merge multiple audio files into a single song online for free. Combine MP3, WAV, M4A tracks in any order with seamless playback. 100% free.',
  },
};

export default function AudioJoinerLayout({ children }) {
  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'iLoveAudios Audio Joiner & Song Merger',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Audio Editing Tool',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Free online tool to combine and merge multiple MP3, WAV, and audio tracks into a continuous single file.',
    url: `${siteUrl}/tools/audio-joiner`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      ratingCount: '1620'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Audio Utilities', item: `${siteUrl}/#tools-suite` },
      { '@type': 'ListItem', position: 3, name: 'Audio Joiner', item: `${siteUrl}/tools/audio-joiner` }
    ]
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Merge Multiple Audio Files Online for Free',
    description: 'Step-by-step guide to combine multiple MP3 or WAV files into a single audio track with iLoveAudios Audio Joiner.',
    totalTime: 'PT45S',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Upload Multiple Audio Files', text: 'Select and upload 2 or more MP3, WAV, M4A, or audio tracks.' },
      { '@type': 'HowToStep', position: 2, name: 'Re-order Tracks', text: 'Arrange your tracks in your desired sequence using the up/down controls.' },
      { '@type': 'HowToStep', position: 3, name: 'Merge & Download', text: 'Click "Merge Audio" and download your combined track in MP3 or WAV format.' }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I merge multiple songs into one file?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Upload 2 or more audio files, arrange them in your preferred playback order, choose your output format (MP3 or WAV), and click "Merge Audio".'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I combine files of different formats (e.g. MP3 and WAV)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Audio Joiner automatically decodes different audio formats and joins them into a unified output file.'
        }
      },
      {
        '@type': 'Question',
        name: 'How many tracks can I merge at once?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can merge up to 20 tracks simultaneously for free.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is Audio Joiner free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% free with no limits on the number of merged files.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are my uploaded songs kept private?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all files are encrypted and automatically deleted from our servers shortly after merging.'
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
