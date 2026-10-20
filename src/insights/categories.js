// Order matters: Software Engineering is the primary focus, Engineering Systems is supporting expertise
// and must never be presented more prominently than the software categories.
export const categories = [
  {
    slug: 'software-engineering',
    name: 'Software Engineering',
    description: 'Practical backend engineering: Node.js, NestJS, PostgreSQL, APIs and the details that keep production systems healthy.',
    primary: true,
  },
  {
    slug: 'system-design',
    name: 'System Design',
    description: 'Architecture decisions for systems that need to scale, stay observable and fail gracefully.',
  },
  {
    slug: 'cto-leadership',
    name: 'CTO & Leadership',
    description: 'Lessons from leading engineering teams: hiring, culture, technical debt and making decisions under pressure.',
  },
  {
    slug: 'startup-building',
    name: 'Startup Building',
    description: 'Turning ideas into products with limited time, people and money, and knowing what to build first.',
  },
  {
    slug: 'engineering-systems',
    name: 'Engineering Systems',
    description: 'Thoughts on reliability engineering, SCADA systems, power generation, industrial operations, and the lessons software engineers can learn from large-scale engineering systems.',
    supporting: true,
  },
];

export const categoryBySlug = Object.fromEntries(categories.map(c => [c.slug, c]));
