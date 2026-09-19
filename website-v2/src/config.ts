export const SITE = {
  // NOTE: Update this to the final deployed URL when the site goes live.
  website: 'https://cliffvale.github.io/biosensorslab/', // TEMP live URL — switch to biosensorslab.iitd.ac.in when lab domain is ready
  author: 'Dr. Naveen Kumar Singh',
  description:
    'Biosensors & Devices Lab at the Centre for Biomedical Engineering (CBME), Indian Institute of Technology Delhi. We develop point-of-care diagnostics, wearable biosensors, and programmable biomaterials for health monitoring and disease detection.',
  title: 'Biosensors & Devices Lab',
  ogImage: 'astropaper-og.jpg',
  lightAndDarkMode: true,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes

  // Lab Info
  labName: 'Biosensors & Devices Lab',
  university: 'IIT Delhi',
  logo: '/assets/logo-lab.jpg', // Logo path (Lab logo)
  avatar: '/assets/logo-lab.jpg', // Avatar for SEO/Schema
  email: 'nks@iitd.ac.in', // Contact email (PI) for Join Us page

  // Hero Section (Home Page)
  hero: {
    title: 'Biosensors for Health & Diagnostics.',
    subtitle:
      'Point-of-care diagnostics, wearable biosensors, and programmable biomaterials — Centre for Biomedical Engineering, Indian Institute of Technology Delhi.',
    action: 'View Publications', // Optional call to action text
    image: '', // Hero image removed — gradient background only
  },

  // Navigation
  nav: [
    { text: 'Home', link: '/', key: 'home' },
    { text: 'Research', link: '/research', key: 'research' },
    { text: 'Team', link: '/team', key: 'team' },
    { text: 'Publications', link: '/publications', key: 'publications' },
    { text: 'Patents', link: '/patents', key: 'patents' },
    { text: 'Equipment', link: '/equipment', key: 'equipment' },
    { text: 'Funding', link: '/funding', key: 'funding' },
    { text: 'Courses', link: '/courses', key: 'courses' },
    { text: 'Gallery', link: '/gallery', key: 'gallery' },
    { text: 'News', link: '/news', key: 'news' },
    { text: 'Links', link: '/important-links', key: 'links' },
    { text: 'Contact', link: '/contact', key: 'contact' },
    { text: 'Join Us', link: '/join', key: 'join' },
    { text: 'Search', link: '/search', key: 'search' },
  ],

  // Custom Pages (Appended after 'Join Us')
  customPages: [] as { text: string; link: string }[],

  // i18n Config (English-only site)
  i18n: {
    enabled: false,
    defaultLocale: 'en',
  }
};

export const LOCALE = {
  lang: 'en', // html lang code
  langTag: ['en-EN'], // BCP 47 Language Tags
} as const;

export const LOGO_IMAGE = {
  enable: true,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS = [
  // {
  //   link: 'https://scholar.google.com/citations?user=XXXX',
  //   active: true,
  // },
];

// Default language configuration
export const DEFAULT_LANG: 'en' = 'en';