import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing download ID.' }, { status: 400 });
    }

    const backendBase = process.env.BACKEND_API_URL || 'http://127.0.0.1:8000';
    const targetUrl = `${backendBase.replace(/\/$/, '')}/api/convert/download/${id}`;

    // Fetch from backend with redirect option disabled to capture RedirectResponse
    const response = await fetch(targetUrl, {
      redirect: 'manual'
    });

    // If backend redirected to S3/MinIO presigned URL, forward redirect
    if (response.status === 307 || response.status === 302 || response.status === 303) {
      const location = response.headers.get('location');
      if (location) {
        return NextResponse.redirect(location);
      }
    }

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'File download stream retrieval failed' },
        { status: response.status }
      );
    }

    // Direct streaming fallback for local storage files
    const fileBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'audio/mpeg';
    const contentDisposition = response.headers.get('content-disposition') || `attachment; filename="converted_${id}.mp3"`;

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition
      }
    });
  } catch (error) {
    console.error('Next.js API Download Proxy Error:', error);
    return NextResponse.json(
      { success: false, error: 'Unable to connect to download service.' },
      { status: 500 }
    );
  }
}
