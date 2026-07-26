'use client';

import React from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';

export default function ToolCard({ title, description, href, icon, category, badge, fromFormat, toFormat }) {
  // Find appropriate icon from Lucide React
  const IconComponent = Icons[icon] || Icons.HelpCircle;

  // Determine styling based on category
  const categoryStyles = {
    'ai-tools': 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30',
    'audio-converters': 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30',
    'video-to-audio': 'bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30',
  }[category] || 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400';

  return (
    <Link href={href} className="group block h-full">
      <div className="h-full relative overflow-hidden glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between">
        
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            {/* Tool Icon Box styled with category soft colors */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-[1.02] ${categoryStyles}`}>
              <IconComponent className="w-4.5 h-4.5" />
            </div>

            {/* Status / Category Badge */}
            {badge && (
              <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-[var(--audiolab-red)]/15 text-[var(--audiolab-red)] border border-[var(--audiolab-red)]/20">
                {badge}
              </span>
            )}
          </div>

          {/* Tool Titles */}
          <div className="space-y-1 text-left">
            <h3 className="text-sm font-black text-[var(--text-primary)] tracking-tight group-hover:text-[var(--audiolab-red)] transition-colors duration-200">
              {title}
            </h3>
            {fromFormat && toFormat && (
              <div className="flex items-center gap-1 text-[8px] font-black tracking-wider text-[var(--text-muted)] uppercase">
                <span>{fromFormat}</span>
                <Icons.ArrowRight className="w-2.5 h-2.5 text-[var(--text-muted)]" />
                <span>{toFormat}</span>
              </div>
            )}
          </div>

          {/* Tool Description */}
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3 text-left">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
