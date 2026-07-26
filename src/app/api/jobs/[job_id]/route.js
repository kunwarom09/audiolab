import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { job_id } = params;

    if (!job_id) {
      return NextResponse.json(
        { success: false, error: 'Job ID is required.' },
        { status: 400 }
      );
    }

    let backendBase = process.env.BACKEND_API_URL || 'http://127.0.0.1:8000';
    if (backendBase.endsWith('/api/extract')) {
      backendBase = backendBase.replace('/api/extract', '');
    }
    const targetUrl = `${backendBase.replace(/\/$/, '')}/api/jobs/${job_id}`;

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.detail || data.error || 'Job status lookup failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Next.js Job Status API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch background job status.' },
      { status: 500 }
    );
  }
}
