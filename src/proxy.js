import { NextResponse } from 'next/server';

export default function proxy(request) {
  const host = request.headers.get('host') || '';
  const proto = request.headers.get('x-forwarded-proto') || '';

  // Redirect apex domain 'iloveaudios.com' to 'www.iloveaudios.com' with HTTPS
  if (host === 'iloveaudios.com') {
    const url = request.nextUrl.clone();
    url.host = 'www.iloveaudios.com';
    url.protocol = 'https';
    url.port = '';
    return NextResponse.redirect(url, 301);
  }

  // Redirect HTTP to HTTPS for production domain
  if (proto === 'http' && (host === 'www.iloveaudios.com' || host === 'iloveaudios.com')) {
    const url = request.nextUrl.clone();
    url.host = 'www.iloveaudios.com';
    url.protocol = 'https';
    url.port = '';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|manifest.json).*)',
  ],
};
