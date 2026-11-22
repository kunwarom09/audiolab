'use client';

import { useEffect } from 'react';

/**
 * Adsterra Social Bar Loader
 * Robust client-side DOM injector that bypasses React 19 Virtual DOM hydration
 * and guarantees script execution across all route transitions.
 */
export default function AdsterraSocialBar() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if script is already injected
    const existing = document.getElementById('adsterra-socialbar-script');
    if (existing) return;

    try {
      const script = document.createElement('script');
      script.id = 'adsterra-socialbar-script';
      script.src = 'https://bauval.org/14/83440adbaab9d77714f0312be2bbbb95';
      script.setAttribute('data-cfasync', 'false');
      script.async = true;

      script.onload = () => {
        console.log('[Adsterra] Social Bar script loaded and executed.');
      };

      script.onerror = (err) => {
        console.warn('[Adsterra] Social Bar failed to load (possibly blocked by browser extension).', err);
      };

      document.body.appendChild(script);
    } catch (err) {
      console.error('[Adsterra] Injection error:', err);
    }
  }, []);

  return null;
}

