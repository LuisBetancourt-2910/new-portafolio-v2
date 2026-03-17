/**
 * Site Configuration
 * Centralized configuration for the portfolio website
 */

export interface Project {
  id: string;
  name: string;
  image: string;
  technologies: string[];
  category: string;
  url?: string;
}

export const siteConfig = {
  // Personal Information
  name: 'Luis Betancourt',
  fullName: 'José Luis García Betancourt',
  title: 'Full Stack Developer',
  handle: 'LuisBetancourt-2910',
  email: 'joseluisgarciabeta@gmail.com',
  
  // URLs
  url: 'https://betanworks.dev',
  
  // Social Links
  socials: {
    github: 'https://github.com/LuisBetancourt-2910',
    linkedin: 'https://www.linkedin.com/in/luisbetancourt2910',
  },
  
  // CV Configuration
  cv: {
    apiEndpoint: '/api/cv',
    fileName: 'cv-luis-betancourt.pdf',
    previewImage: '/cv.webp',
  },
  
  // Assets
  avatar: '/avatar.webp',
  icon: '/icon.svg',
  
  // Projects
  projects: [
    {
      id: 'erp-ggl',
      name: 'ERP GGL',
      image: '/projects/erp-ggl/cover.webp',
      technologies: ['Laravel', 'PHP', 'AngularJS', 'MariaDB'],
      category: 'ERP',
    },
    {
      id: 'legacy',
      name: 'Legacy',
      image: '/projects/legacy/cover.webp',
      technologies: ['React', 'Inertia.js', 'Laravel', 'Sanctum'],
      category: 'Networking',
    },
    {
      id: 'cosmocarrier',
      name: 'CosmoCarrier',
      image: '/projects/cosmocarrier/cover.webp',
      technologies: ['React', 'Laravel', 'ROI Calculator'],
      category: 'Quotation',
    },
    {
      id: 'sigil',
      name: 'SIGIL',
      image: '/projects/sigil/cover.svg',
      technologies: ['React', 'Leaflet', 'SQL Server'],
      category: 'Management',
    },
    {
      id: 'noc',
      name: 'NOC',
      image: '/projects/noc/cover.webp',
      technologies: ['React', 'Vite', 'API Integration'],
      category: 'Operations',
    },
    {
      id: 'acca',
      name: 'ACCA',
      image: '/projects/acca/cover.svg',
      technologies: ['React', '.NET', 'Donations'],
      category: 'NGO',
    },
    {
      id: 'multas',
      name: 'Centro Multipagos',
      image: '/projects/MultasDGO/cover.webp',
      technologies: ['Laravel', 'React', 'AWS S3', 'Digital Signatures'],
      category: 'Government',
    },
  ] satisfies readonly Project[],
  
  // Tech Stack Icons
  techStack: [
    { src: '/icons/javascript.svg', label: 'JavaScript' },
    { src: '/icons/typescript.svg', label: 'TypeScript' },
    { src: '/icons/react.svg', label: 'React' },
    { src: '/icons/angularjs.svg', label: 'AngularJS' },
    { src: '/icons/html5.svg', label: 'HTML5' },
    { src: '/icons/css3.svg', label: 'CSS3' },
    { src: '/icons/tailwindcss.svg', label: 'Tailwind CSS' },
    { src: '/icons/bootstrap.svg', label: 'Bootstrap' },
    { src: '/icons/nodejs.svg', label: 'Node.js' },
    { src: '/icons/express.svg', label: 'Express' },
    { src: '/icons/php.svg', label: 'PHP' },
    { src: '/icons/laravel.svg', label: 'Laravel' },
    { src: '/icons/dotnet.svg', label: '.NET' },
    { src: '/icons/csharp.svg', label: 'C#' },
    { src: '/icons/aws.svg', label: 'AWS' },
    { src: '/icons/sqlserver.svg', label: 'SQL Server' },
    { src: '/icons/mysql.svg', label: 'MySQL' },
    { src: '/icons/mariadb.svg', label: 'MariaDB' },
    { src: '/icons/git.svg', label: 'Git' },
    { src: '/icons/github.svg', label: 'GitHub' },
    { src: '/icons/jira.svg', label: 'Jira' },
    { src: '/icons/figma.svg', label: 'Figma' },
    { src: '/icons/vite.svg', label: 'Vite' },
    { src: '/icons/visualstudio.svg', label: 'Visual Studio' },
  ],
  
  // Internationalization
  locales: ['es', 'en'] as const,
  defaultLocale: 'es' as const,
} as const;

export type SiteConfig = typeof siteConfig;
