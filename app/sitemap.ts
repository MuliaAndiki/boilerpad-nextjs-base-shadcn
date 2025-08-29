import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const locations = [`${process.env.NEXT_PUBLIC_APP_URL}/sitemap-general.xml`];

  return locations.map((location) => ({
    url: location,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));
}
