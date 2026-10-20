// Defaults for the homepage; keep in sync with the <title> and description in index.html.
export const SITE_NAME = 'Mubaraq Abdulrahmon';
export const SITE_TITLE = 'Mubaraq Abdulrahmon — Senior Backend Engineer for SaaS & Startups';
export const SITE_DESCRIPTION = 'Contract Senior Backend Engineer (Node.js, NestJS, PostgreSQL, AWS). I build reliable APIs, real-time systems and cloud infrastructure for SaaS teams and startups. Available for contract and fractional CTO work.';

export const INSIGHTS_TAGLINE = 'I write about backend engineering, system design, startup execution, technical leadership, and industrial systems.';

// Shown in the footer-adjacent "What I write about" strip, linked to the matching category.
export const WRITING_TOPICS = [
  { label: 'Software Engineering', category: 'software-engineering' },
  { label: 'System Design', category: 'system-design' },
  { label: 'Technical Leadership', category: 'cto-leadership' },
  { label: 'Startup Building', category: 'startup-building' },
  { label: 'Engineering Systems', category: 'engineering-systems' },
];

// Author cards (Insights page + article author boxes): full name with credentials underneath.
export const AUTHOR_NAME = 'Abdulrahmon Mubaraq Olanrewaju';
export const AUTHOR_ROLES = ['Backend Engineer', 'Co-founder at Delayfree', 'Electronics & Computer Engineering Graduate'];

// One string per paragraph.
export const AUTHOR_BIO = [
  'Mubaraq Abdulrahmon is a Backend Engineer, Co-founder at Delayfree, and Electronics & Computer Engineering graduate.',
  'He builds software systems using Node.js, NestJS, PostgreSQL, and cloud-native architectures.',
  'Alongside software engineering, he has experience in power generation, SCADA-based monitoring, equipment reliability, and industrial operations.',
  'His interests span backend engineering, system design, technical leadership, startup building, and engineering systems.',
];

export const DEGREE = 'B.Sc. Electronics & Computer Engineering';

export const ENGINEERING_BACKGROUND = [
  DEGREE,
  'Power Generation Operations',
  'SCADA Monitoring',
  'Grid and Distribution Systems',
  'Equipment Reliability',
  'HSE and Operational Excellence',
];

// Used for the "Featured In" section, author boxes and the schema.org sameAs list.
// Leave a url empty to hide that link until the profile URL is confirmed.
export const PROFILE_LINKS = [
  { key: 'github', label: 'GitHub', url: 'https://github.com/mubaraq-star', note: 'Code & open source' },
  { key: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/mubaraq-abdulrahmon', note: 'Career & leadership' },
  { key: 'researchgate', label: 'ResearchGate', url: 'https://www.researchgate.net/profile/Abdulrahmon-Mubaraq', note: 'Engineering research' },
  { key: 'scholar', label: 'Google Scholar', url: '', note: 'Publications' },
].filter(l => l.url);

// schema.org Person data; scripts/prerender.mjs writes it into every page's structured data.
export const PERSON_SCHEMA = {
  '@type': 'Person',
  name: SITE_NAME,
  alternateName: AUTHOR_NAME, // full name, as used on ResearchGate
  description: AUTHOR_BIO.join(' '),
  jobTitle: ['Backend Engineer', 'CTO'],
  hasOccupation: [
    { '@type': 'Occupation', name: 'Backend Engineer', skills: 'Node.js, NestJS, TypeScript, PostgreSQL, AWS, system design' },
    { '@type': 'Occupation', name: 'Chief Technology Officer (CTO)' },
  ],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Lagos State University' },
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'degree',
    name: DEGREE,
    educationalLevel: 'Bachelor',
  },
  knowsAbout: [
    'Backend Engineering', 'Node.js', 'NestJS', 'Python', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS', 'Cloud-Native Architecture',
    'System Design', 'Real-Time Systems', 'Technical Leadership',
    'Electronics & Computer Engineering', 'SCADA', 'Power Systems', 'Power Generation', 'Reliability Engineering',
  ],
  email: 'mailto:mubbyone@gmail.com',
  sameAs: PROFILE_LINKS.map(l => l.url),
};
