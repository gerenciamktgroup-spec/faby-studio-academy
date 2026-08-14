import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://fabystudio.academy';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/campus/', '/profesor/', '/admin/', '/auditoria/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
