'use client';

import React from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';

export default function ToolCard({ title, description, href, icon, category, badge, fromFormat, toFormat }) {
  const IconComponent = Icons[icon] || Icons.HelpCircle;

  const categoryStyles = {
    'ai-tools': 'bg-amber-50 text-amber-700 border border-amber-200',
    'audio-converters': 'bg-blue-50 text-blue-700 border border-blue-200',
    'video-to-audio': 'bg-orange-50 text-orange-700 border border-orange-200',
  }[category] || 'bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)]';

  return (
    <div className="group relative w-full h-full tool-card p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
      <Link href={href} aria-label={title} className="absolute inset-0 z-10 min-w-[48px] min-h-[48px]">
        <span className="sr-only">{title}</span>
      </Link>

      <div className="w-full space-y-4 pointer-events-none">
        <div className="flex items-center justify-between gap-3 min-h-[48px]">
          <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center shrink-0 ${categoryStyles}`}>
            <IconComponent className="w-6 h-6" />
          </div>

          {badge && (
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[length:var(--text-base)] leading-none font-semibold bg-[var(--color-bg)] text-[var(--color-brand)] border border-[var(--color-border)] shrink-0">
              {badge}
            </span>
          )}
        </div>

        <div className="space-y-1.5 text-left">
          <span className="block text-[length:var(--text-lead)] font-bold text-[var(--color-text)] group-hover:text-[var(--color-brand)] leading-[var(--leading-heading)] transition-colors duration-150">
            {title}
          </span>
          {fromFormat && toFormat && (
            <div className="flex items-center gap-1.5 text-[length:var(--text-base)] font-semibold text-[var(--color-text-muted)]">
              <span>{fromFormat}</span>
              <Icons.ArrowRight className="w-4 h-4 text-[var(--color-text-muted)] shrink-0" />
              <span>{toFormat}</span>
            </div>
          )}
        </div>

        <p className="prose-measure text-[length:var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-body)] text-left">
          {description}
        </p>
      </div>
    </div>
  );
}
