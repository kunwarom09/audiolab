import React from 'react';
import { notFound } from 'next/navigation';
import { TOOLS } from '@/lib/toolsConfig';
import ConverterPageClient from '@/components/ConverterPageClient';

// Generate metadata dynamically per tool slug for SEO optimization
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = TOOLS[slug];

  if (!tool || tool.isCustomPage) {
    return {};
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iloveaudios.com';
  const title = `${tool.title} — Free Online Audio Tool`;
  const canonicalUrl = `${siteUrl}/tools/${slug}`;

  return {
    title,
    description: tool.description,
    keywords: [
      `${tool.fromFormat?.toLowerCase() || ''} to ${tool.toFormat?.toLowerCase() || ''}`,
      `convert ${tool.fromFormat?.toLowerCase() || ''} to ${tool.toFormat?.toLowerCase() || ''}`,
      `free ${tool.fromFormat?.toLowerCase() || ''} to ${tool.toFormat?.toLowerCase() || ''} converter`,
      tool.title.toLowerCase(),
      'online audio converter'
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description: tool.description,
      url: canonicalUrl,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: tool.description
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iloveaudios.com';

  // 1. SoftwareApplication Schema
  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Audio/Video Converter',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: tool.description,
    url: `${siteUrl}/tools/${slug}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  // 2. HowTo Schema for Step-by-Step Rich Snippets
  const howToSchema = tool.fromFormat && tool.toFormat ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Convert ${tool.fromFormat} to ${tool.toFormat} Online`,
    description: `Step-by-step guide to convert ${tool.fromFormat} audio or video files into ${tool.toFormat} format for free with iLoveAudios.`,
    totalTime: 'PT1M',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Upload Your File',
        text: `Click the dropzone or drag and drop your ${tool.fromFormat} file into iLoveAudios.`
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
        text: `Click the Convert button and download your finished ${tool.toFormat} file.`
      }
    ]
  } : null;

  // 3. FAQPage Schema for Tool-Specific FAQs
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
      <ConverterPageClient tool={tool} />
    </>
  );
}

