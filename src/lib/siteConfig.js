/**
 * Single source of truth for the production site domain and canonical URL generation.
 * Primary canonical domain: https://www.iloveaudios.com
 */
export const SITE_URL = 'https://www.iloveaudios.com';

/**
 * Returns an absolute canonical URL for a given path using the canonical domain.
 * Normalizes slashes and ensures no accidental trailing slashes for sub-pages.
 * 
 * @param {string} [path=''] - Optional route path (e.g. '/tools/song-extractor')
 * @returns {string} Fully qualified canonical URL (e.g. 'https://www.iloveaudios.com/tools/song-extractor')
 */
export function getCanonicalUrl(path = '') {
  if (!path || path === '/') {
    return SITE_URL;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath.replace(/\/+$/, '')}`;
}
