import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://betanworks.dev';
  const currentDate = new Date();

  // Idiomas disponibles
  const locales = ['es', 'en'];

  const routes: MetadataRoute.Sitemap = [
    // Página raíz con alternativas de idioma
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          en: `${baseUrl}/en`,
        },
      },
    },
    // Páginas principales para cada idioma con alternativas
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}`])
        ),
      },
    })),
  ];

  return routes;
}
