/**
 * Site Configuration
 * Centralized configuration for the portfolio website
 */

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
    previewImage: '/cv.png',
  },
  
  // Assets
  avatar: '/avatar.png',
  icon: '/icon.svg',
  
  // Projects
  projects: [
    {
      id: 'erp-ggl',
      name: 'ERP GGL',
      image: '/projects/erp-ggl/cover.png',
      technologies: ['Laravel', 'PHP', 'AngularJS', 'MariaDB'],
      category: 'ERP',
    },
    {
      id: 'legacy',
      name: 'Legacy',
      image: '/projects/legacy/cover.png',
      technologies: ['React', 'Inertia.js', 'Laravel', 'Sanctum'],
      category: 'Networking',
    },
    {
      id: 'cosmocarrier',
      name: 'CosmoCarrier',
      image: '/projects/cosmocarrier/cover.png',
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
      image: '/projects/noc/cover.png',
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
      image: '/projects/MultasDGO/cover.png',
      technologies: ['Laravel', 'React', 'AWS S3', 'Digital Signatures'],
      category: 'Government',
    },
  ],
  
  // Tech Stack Icons
  techStack: [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg',
  ],
  
  // Internationalization
  locales: ['es', 'en'] as const,
  defaultLocale: 'es' as const,
} as const;

export type SiteConfig = typeof siteConfig;
