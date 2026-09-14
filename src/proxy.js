import { NextResponse } from 'next/server';

export function proxy(request) {
  const rawHost = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const host = rawHost.split(':')[0].toLowerCase();

  // Redirect apex domain (iloveaudios.com) to www.iloveaudios.com with 308 Permanent Redirect
  if (host === 'iloveaudios.com') {
    const url = request.nextUrl.clone();
    url.hostname = 'www.iloveaudios.com';
    url.protocol = 'https';
    url.port = '';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icon.svg, apple-icon.png (public metadata icons)
     */
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png).*)',
  ],
};
