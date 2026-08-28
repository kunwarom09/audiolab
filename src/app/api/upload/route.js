import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes timeout for 500MB uploads

export async function POST(request) {
  try {
    const backendBase = process.env.BACKEND_API_URL || 'http://127.0.0.1:8000';
    const targetUrl = `${backendBase.replace(/\/$/, '')}/api/upload`;

    const contentType = request.headers.get('content-type') || '';

    // Direct streaming to avoid multi-copy memory buffering on large files (up to 500MB)
    let response;
    if (request.body && contentType.includes('multipart/form-data')) {
      response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'content-type': contentType,
        },
        body: request.body,
        duplex: 'half',
      });
    } else {
      const formData = await request.formData();
      const file = formData.get('file');

      if (!file) {
        return NextResponse.json({ success: false, error: 'No file uploaded.' }, { status: 400 });
      }

      const backendFormData = new FormData();
      backendFormData.append('file', file);

      response = await fetch(targetUrl, {
        method: 'POST',
        body: backendFormData,
      });
    }

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.detail || data.error || 'Upload forwarding failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Next.js API Upload Proxy Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Unable to connect to file upload service.' },
      { status: 500 }
    );
  }
}
