import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="site-container min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-10 h-10 text-[var(--color-brand)] animate-spin" />
      <p className="text-[length:var(--text-base)] font-semibold text-[var(--color-text-muted)]">Loading iLoveAudios tool workspace...</p>
    </div>
  );
}
