// Order matters: Software Engineering is the primary focus, Engineering & SCADA is supporting expertise.
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
    slug: 'engineering-scada',
    name: 'Engineering & SCADA',
    description: 'Industrial systems, plant operations and reliability engineering: the discipline behind my approach to uptime.',
    supporting: true,
  },
];

export const categoryBySlug = Object.fromEntries(categories.map(c => [c.slug, c]));
