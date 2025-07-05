import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.SUNO_API_KEY;

export function middleware(request: NextRequest) {
  if (!API_KEY) {
    console.error('SUNO_API_KEY environment variable is not set.');
    // This will prevent any access if the key is not set.
    return new NextResponse(
      JSON.stringify({ message: 'Internal Server Error: API key not configured.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const apiKeyHeader = request.headers.get('suno-api-key');
  
  if (!apiKeyHeader) {
    return new NextResponse(
      JSON.stringify({ message: 'suno-api-key header is missing' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (apiKeyHeader !== API_KEY) {
    return new NextResponse(
      JSON.stringify({ message: 'Invalid API key' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/v1/:path*'],
}; 