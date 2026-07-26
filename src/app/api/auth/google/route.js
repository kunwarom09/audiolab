import { NextResponse } from 'next/server';

export async function GET(request) {
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const origin = `${protocol}://${host}`;
  const redirectUri = `${origin}/api/auth/google/callback`;

  const clientId = process.env.GOOGLE_CLIENT_ID;

  // If GOOGLE_CLIENT_ID is not configured in .env.local, use seamless in-app Google Login prompt
  if (!clientId || clientId.includes('demo') || clientId.includes('your_google_client_id')) {
    return NextResponse.redirect(`${origin}/?google_login=prompt`);
  }

  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  googleAuthUrl.searchParams.set('client_id', clientId);
  googleAuthUrl.searchParams.set('redirect_uri', redirectUri);
  googleAuthUrl.searchParams.set('response_type', 'code');
  googleAuthUrl.searchParams.set('scope', 'openid email profile');
  googleAuthUrl.searchParams.set('access_type', 'offline');
  googleAuthUrl.searchParams.set('prompt', 'select_account');

  return NextResponse.redirect(googleAuthUrl.toString());
}
