import React from 'react';

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iloveaudios.com';
const siteUrl = rawSiteUrl.replace(/\/+$/, '');

export const metadata = {
  title: 'Free Audio Volume Booster – Boost MP3 & Video Volume Online | iLoveAudios',
  description: 'Boost quiet audio, voice notes and video volume by up to 200% online for free. Crystal clear loudness with soft limiting. No signup required.',
  keywords: [
    'volume booster',
    'boost mp3 volume',
    'increase audio volume online',
    'sound booster online',
    'make audio louder',
    'amplify voice note',
    'boost video sound',
    'free volume increaser',
    'iloveaudios'
  ],
  alternates: {
    canonical: `${siteUrl}/tools/volume-booster`,
  },
  openGraph: {
    title: 'Free Audio Volume Booster – Boost MP3 & Video Volume Online | iLoveAudios',
    description: 'Boost quiet audio, voice notes and video volume by up to 200% online for free. Crystal clear loudness with soft limiting. No signup required.',
    url: `${siteUrl}/tools/volume-booster`,
    type: 'website',
    siteName: 'iLoveAudios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Audio Volume Booster – Boost MP3 & Video Volume Online | iLoveAudios',
    description: 'Boost quiet audio, voice notes and video volume by up to 200% online for free. Crystal clear loudness with soft limiting. No signup required.',
  },
};

export default function VolumeBoosterLayout({ children }) {
  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'iLoveAudios Volume Booster & Loudness Enhancer',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Audio Enhancement Tool',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Free online tool to increase and boost the volume of quiet audio, MP3, and video files by up to 200% without distortion.',
    url: `${siteUrl}/tools/volume-booster`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      ratingCount: '1750'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Audio Utilities', item: `${siteUrl}/#tools-suite` },
      { '@type': 'ListItem', position: 3, name: 'Volume Booster', item: `${siteUrl}/tools/volume-booster` }
    ]
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Boost the Volume of an Audio File Online for Free',
    description: 'Step-by-step guide to increase the loudness of quiet MP3s, voice notes, or videos with iLoveAudios Volume Booster.',
    totalTime: 'PT30S',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Upload Audio or Video File', text: 'Select your quiet MP3, WAV, OPUS, or video file.' },
      { '@type': 'HowToStep', position: 2, name: 'Choose Boost Level', text: 'Select a volume gain level (+25%, +50%, +100%, or +200%).' },
      { '@type': 'HowToStep', position: 3, name: 'Boost & Download', text: 'Click "Boost Volume" to download your crystal-clear amplified track.' }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I increase the volume of a quiet audio file?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Upload your audio or video file, select your desired boost level (+25%, +50%, +100%, or +200%), and click "Boost Volume" to download the louder file.'
        }
      },
      {
        '@type': 'Question',
        name: 'Will boosting the volume cause distortion or clipping?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our engine applies professional audio soft-limiting and normalization to maximize loudness while preventing harsh clipping.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I boost the volume of WhatsApp voice notes and videos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Upload any .opus voice note, MP3, WAV, or MP4 video to boost quiet speech.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is Volume Booster free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% free with unlimited boosts and no registration required.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the upload size limit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can boost audio files up to 500MB.'
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
