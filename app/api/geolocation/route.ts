import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      throw new Error('Geolocation API failed');
    }

    const data = await response.json();

    return NextResponse.json({
      country: data.country_name || 'Unknown',
      city: data.city || 'Unknown',
    });
  } catch (error) {
    console.error('Geolocation error:', error);
    return NextResponse.json(
      { country: 'Unknown', city: 'Unknown' },
      { status: 200 } // Return 200 with fallback data instead of error
    );
  }
}
