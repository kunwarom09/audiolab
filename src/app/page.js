'use client';

import React, { useState } from 'react';
import ToolCard from '@/components/ToolCard';
import FaqSection from '@/components/FaqSection';
import { TOOLS } from '@/lib/toolsConfig';
import { Music2, ShieldCheck, Zap } from 'lucide-react';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'AI Tools', label: 'AI Tools' },
    { id: 'Audio Converters', label: 'Audio Converters' },
    { id: 'Video to Audio', label: 'Video to Audio' }
  ];

  // Filter tools dynamically
  const filteredTools = Object.values(TOOLS).filter((tool) => {
    if (activeFilter === 'all') return true;
    return tool.category === activeFilter;
  });

  return (
    <div className="w-full space-y-12">
      {/* Centered Minimalist Hero Header */}
      <section className="pt-16 pb-8 text-center max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
          Every tool you need to work with Audio in one place
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
          Every tool you need to process audio, at your fingertips. All are 100% FREE and easy to use! Convert formats, extract audio from video, look up lyrics, and identify songs with just a few clicks.
        </p>
      </section>

      {/* Horizontal Filter Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-7xl mx-auto px-4 sm:px-6">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Tools Grid Workspace */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.slug}
              title={tool.title}
              description={tool.description}
              href={`/tools/${tool.slug}`}
              icon={tool.icon}
              category={tool.category}
              badge={tool.badge}
              fromFormat={tool.fromFormat}
              toFormat={tool.toFormat}
            />
          ))}
        </div>
      </section>

      {/* Shared Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-[var(--border-color)] space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">
            Features
          </h3>
          <h4 className="text-xl md:text-2xl font-black text-[var(--text-primary)]">
            Why Use AudioLab?
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center shrink-0">
              <Music2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Professional Quality</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Support up to 320kbps MP3 exports and lossless WAV formats using professional-grade conversion filters.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Fast & Reliable</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Equipped with a robust parallel worker queue to render large audio and video files quickly.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">Safe & Confidential</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Uploaded files are validated, securely stored via signed URLs, and auto-cleaned shortly after conversion.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 border-t border-[var(--border-color)]">
        <FaqSection />
      </section>
    </div>
  );
}
