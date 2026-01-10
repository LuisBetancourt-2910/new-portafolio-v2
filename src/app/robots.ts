import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/en', '/es'],
      disallow: [
        '/api/',
        '/_next/',
        '/projects/',
        '/*.png',
        '/*.svg',
        '/*.jpg',
        '/*.jpeg',
        '/*.ico',
        '/opengraph-image',
        '/icon',
        '/apple-icon',
      ],
    },
    sitemap: 'https://betanworks.dev/sitemap.xml',
  };
}
