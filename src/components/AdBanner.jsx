'use client';

import React, { useEffect, useRef } from 'react';

export default function AdBanner() {
  const bannerRef = useRef(null);

  useEffect(() => {
    const container = bannerRef.current;
    if (!container) return;

    // Prevent duplicate injections
    if (container.querySelector('script') || container.querySelector('iframe')) {
      return;
    }

    try {
      window.atOptions = {
        key: '1ce207bda0aa7fbfd5b9ebe4b7595d3c',
        format: 'iframe',
        height: 90,
        width: 728,
        params: {},
      };

      const confScript = document.createElement('script');
      confScript.type = 'text/javascript';
      confScript.text = `
        atOptions = {
          'key' : '1ce207bda0aa7fbfd5b9ebe4b7595d3c',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;

      const adScript = document.createElement('script');
      adScript.type = 'text/javascript';
      adScript.src = 'https://bauval.org/22/1ce207bda0aa7fbfd5b9ebe4b7595d3c';

      container.appendChild(confScript);
      container.appendChild(adScript);
    } catch (err) {
      console.error('Error mounting ad banner:', err);
    }
  }, []);

  return (
    <aside
      aria-label="Advertisement"
      className="w-full my-6 flex flex-col items-center justify-center overflow-hidden"
    >
      <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)] opacity-60 mb-2 select-none">
        Advertisement
      </span>
      <div className="w-full max-w-full overflow-x-auto flex justify-center items-center">
        <div
          ref={bannerRef}
          className="w-[728px] h-[90px] min-w-[728px] min-h-[90px] flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[8px]"
        />
      </div>
    </aside>
  );
}

