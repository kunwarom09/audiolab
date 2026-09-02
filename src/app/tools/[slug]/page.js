import React from 'react';
import { notFound } from 'next/navigation';
import { TOOLS } from '@/lib/toolsConfig';
import { SITE_URL, getCanonicalUrl } from '@/lib/siteConfig';
import ConverterPageClient from '@/components/ConverterPageClient';

// Generate metadata dynamically per tool slug for SEO optimization
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = TOOLS[slug];

  if (!tool || tool.isCustomPage) {
    return {};
  }

  const title = tool.metaTitle || `${tool.title} – Free Online Audio Tool | iLoveAudios`;
  const description = tool.metaDescription || tool.description;
  const canonicalUrl = getCanonicalUrl(`/tools/${slug}`);
  const fromFmt = tool.fromFormat?.toLowerCase() || '';
  const toFmt = tool.toFormat?.toLowerCase() || '';

  return {
    title,
    description,
    keywords: [
      `${fromFmt} to ${toFmt}`,
      `convert ${fromFmt} to ${toFmt}`,
      `${fromFmt} to ${toFmt} converter`,
      `free ${fromFmt} to ${toFmt}`,
      `free ${fromFmt} to ${toFmt} converter`,
      `fast ${fromFmt} to ${toFmt} converter`,
      `${fromFmt} to ${toFmt} 320kbps`,
      `convert ${fromFmt} to ${toFmt} online`,
      `best ${fromFmt} to ${toFmt} converter`,
      `${fromFmt} to ${toFmt} audio converter`,
      `online ${fromFmt} to ${toFmt}`,
      tool.title.toLowerCase(),
      'free online audio converter',
      'iloveaudios'
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'iLoveAudios',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}

// Generate static params for all dynamic tool routes
export async function generateStaticParams() {
  return Object.keys(TOOLS)
    .filter(slug => !TOOLS[slug].isCustomPage)
    .map(slug => ({ slug }));
}

export default async function ToolConverterPage({ params }) {
  const { slug } = await params;
  const tool = TOOLS[slug];

  // Route fallback if tool not found or is a custom page (like song-extractor)
  if (!tool || tool.isCustomPage) {
    notFound();
  }

  // 1. SoftwareApplication Schema
  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Audio/Video Converter',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: tool.metaDescription || tool.description,
    url: getCanonicalUrl(`/tools/${slug}`),
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
      'Fast high-definition audio conversion',
      'Studio bitrates up to 320kbps',
      '100% free with no file size limits',
      'Encrypted client-server processing with auto-deletion',
      'Universal mobile, tablet, and desktop browser support'
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
        name: tool.category || 'Audio Converters',
        item: `${SITE_URL}/#tools-suite`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.title,
        item: getCanonicalUrl(`/tools/${slug}`)
      }
    ]
  };

  // 3. HowTo Schema for Step-by-Step Rich Snippets
  const howToSteps = tool.howTo ? tool.howTo.map((item, idx) => ({
    '@type': 'HowToStep',
    position: idx + 1,
    name: item.title,
    text: item.text
  })) : [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Upload Your File',
      text: `Click the dropzone or drag and drop your ${tool.fromFormat || 'audio'} file into iLoveAudios.`
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Configure Options',
      text: 'Adjust output quality settings, audio bitrate, or trim options if needed.'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Convert & Download',
      text: `Click the Convert button and download your finished ${tool.toFormat || 'MP3'} file.`
    }
  ];

  const howToSchema = tool.fromFormat && tool.toFormat ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Convert ${tool.fromFormat} to ${tool.toFormat} Online`,
    description: `Step-by-step guide to convert ${tool.fromFormat} audio or video files into ${tool.toFormat} format for free with iLoveAudios.`,
    totalTime: 'PT1M',
    step: howToSteps
  } : null;

  // 4. FAQPage Schema for Tool-Specific FAQs
  const faqSchema = tool.faq && tool.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolSchema).replace(/</g, '\\u003c')
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c')
        }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c')
          }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c')
          }}
        />
      )}
      <ConverterPageClient 
        tool={tool} 
        backendApiUrl={process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://audiolab-dc5o.onrender.com'} 
      />
    </>
  );
}

