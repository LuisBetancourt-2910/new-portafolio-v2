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
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg', label: 'JavaScript' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg', label: 'TypeScript' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', label: 'React' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-plain.svg', label: 'AngularJS' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg', label: 'HTML5' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg', label: 'CSS3' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', label: 'Tailwind CSS' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg', label: 'Bootstrap' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg', label: 'Node.js' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', label: 'Express' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg', label: 'PHP' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', label: 'Laravel' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-plain.svg', label: '.NET' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-plain.svg', label: 'C#' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', label: 'AWS' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg', label: 'SQL Server' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', label: 'MySQL' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg', label: 'MariaDB' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', label: 'Git' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', label: 'GitHub' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg', label: 'Jira' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', label: 'Figma' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg', label: 'Vite' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg', label: 'Visual Studio' },
  ],
  
  // Internationalization
  locales: ['es', 'en'] as const,
  defaultLocale: 'es' as const,
} as const;

export type SiteConfig = typeof siteConfig;
