import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get the URL from the query parameters
  const url = request.nextUrl.searchParams.get('url');
  
  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }
  
  // Get the API key from environment variables (server-side only)
  const apiKey = process.env.SCREENSHOT_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
  }
  
  // Construct the Screenshot Machine URL
  const screenshotUrl = `https://api.screenshotmachine.com?key=${apiKey}&url=${encodeURIComponent(url)}&dimension=1024x768`;
  
  try {
    // Fetch the image from Screenshot Machine
    const response = await fetch(screenshotUrl);
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch screenshot' }, { status: response.status });
    }
    
    // Get the image buffer
    const imageBuffer = await response.arrayBuffer();
    
    // Return the image with appropriate headers
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Screenshot API error:', error);
    return NextResponse.json({ error: 'Failed to generate screenshot' }, { status: 500 });
  }
}
