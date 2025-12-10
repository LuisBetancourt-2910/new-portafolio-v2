import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://betanworks.dev';
  const currentDate = new Date();

  // Idiomas disponibles
  const locales = ['es', 'en'];

  // Proyectos con metadatos
  const projects = [
    { slug: 'erp-ggl', name: 'ERP GGL', priority: 0.9 },
    { slug: 'legacy', name: 'LEGACY Platform', priority: 0.9 },
    { slug: 'cosmocarrier', name: 'COSMOCARRIER', priority: 0.9 },
    { slug: 'sigil', name: 'SIGIL Dashboard', priority: 0.9 },
    { slug: 'noc', name: 'NOC Platform', priority: 0.9 },
    { slug: 'acca', name: 'ACCA Platform', priority: 0.9 },
    { slug: 'MultasDGO', name: 'Centro Multipagos', priority: 0.9 },
  ];

  // Tecnologías destacadas
  const technologies = [
    'JavaScript', 'TypeScript', 'React', 'Angular', 'Node.js',
    'PHP', 'Laravel', '.NET', 'C#', 'AWS', 'SQL Server', 'MySQL'
  ];

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
    // CV/Resume
    {
      url: `${baseUrl}/api/cv`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    // Imágenes de proyectos con nombres descriptivos
    ...projects.flatMap((project) => [
      {
        url: `${baseUrl}/projects/${project.slug}/cover.png`,
        lastModified: currentDate,
        changeFrequency: 'yearly' as const,
        priority: project.priority,
      },
      {
        url: `${baseUrl}/projects/${project.slug}/cover.svg`,
        lastModified: currentDate,
        changeFrequency: 'yearly' as const,
        priority: project.priority,
      },
    ]),
    // Assets principales
    {
      url: `${baseUrl}/icon.svg`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/favicon.ico`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/avatar.png`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cv.png`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Open Graph images por idioma
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/opengraph-image`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return routes;
}
