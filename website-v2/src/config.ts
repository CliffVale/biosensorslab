export const SITE = {
  website: 'https://cliffvale.github.io/biosensorslab/', // switch to https://biosensorlab.iitd.ac.in/ when the IITD domain is live
  author: 'Dr. Naveen Kumar Singh',
  description:
    'BiosensorsLab at the Centre for Biomedical Engineering (CBME), Indian Institute of Technology Delhi. We develop point-of-care diagnostics, wearable biosensors, and programmable biomaterials for health monitoring and disease detection.',
  title: 'BiosensorsLab',

  // Lab Info
  labName: 'BiosensorsLab',
  university: 'IIT Delhi',
  logo: '/assets/logo-lab.jpg',
  email: 'nks@iitd.ac.in',

  // Hero Section (Home Page)
  hero: {
    title: 'Biosensors for Health & Diagnostics.',
    subtitle:
      'Point-of-care diagnostics, wearable biosensors, and programmable biomaterials — Centre for Biomedical Engineering, Indian Institute of Technology Delhi.',
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
    { text: 'Contact', link: '/contact', key: 'contact' },
    { text: 'Search', link: '/search', key: 'search' },
  ],

  // Custom Pages (appended after nav links)
  customPages: [] as { text: string; link: string }[],
};