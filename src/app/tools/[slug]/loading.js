import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-10 h-10 text-[#0088ff] animate-spin" />
      <p className="text-xs font-bold text-[var(--text-secondary)]">Loading iLoveAudios tool workspace...</p>
    </div>
  );
}
