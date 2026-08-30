import { NextResponse } from 'next/server';

export function proxy(request) {
  const host = request.headers.get('host') || '';

  // Redirect apex domain (iloveaudios.com) to www.iloveaudios.com with 301 Permanent Redirect
  if (host === 'iloveaudios.com') {
    const url = request.nextUrl.clone();
    url.hostname = 'www.iloveaudios.com';
    url.protocol = 'https';
    url.port = '';
    return NextResponse.redirect(url, 301);
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
