import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ['facebookexternalhit', 'Facebot', 'Twitterbot', 'LinkedInBot', 'WhatsApp'],
        allow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/admin'],
      },
    ],
    sitemap: 'https://naheadjokhio.vercel.app/sitemap.xml',
  };
}
