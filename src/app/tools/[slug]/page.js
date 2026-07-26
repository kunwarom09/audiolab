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

  return {
    title: `${tool.title} | Free Online Audio Tool`,
    description: tool.description,
    keywords: [
      `${tool.fromFormat.toLowerCase()} to ${tool.toFormat.toLowerCase()}`,
      `convert ${tool.fromFormat.toLowerCase()} to ${tool.toFormat.toLowerCase()}`,
      `free ${tool.fromFormat.toLowerCase()} to ${tool.toFormat.toLowerCase()} converter`,
      tool.title.toLowerCase()
    ],
    openGraph: {
      title: `${tool.title} | Free Online Audio Tool`,
      description: tool.description,
      type: 'website'
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

  // Schema markup for individual tools
  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    description: tool.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <ConverterPageClient tool={tool} />
    </>
  );
}
