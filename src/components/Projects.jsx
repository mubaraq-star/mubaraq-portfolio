import { ArrowRight, ExternalLink, Lock } from 'lucide-react';
import { GithubIcon } from './BrandIcons.jsx';
import './Projects.css';

const projects = [
  {
    title: 'Delayfree — Real-Time Logistics Platform',
    problem: 'Dispatch teams needed live shipment visibility and faster driver assignment across a growing last-mile operation.',
    solution: 'Architected the backend from zero with real-time tracking, automated dispatch, smart routing, and integrations for maps, notifications, and payments.',
    impact: '10K+ users, 99.9% uptime, sub-120ms API latency, and 3x faster dispatch.',
    tags: ['NestJS', 'PostgreSQL', 'Redis', 'WebSockets', 'AWS'],
    metrics: [
      { value: '10K+', label: 'Active Users' },
      { value: '<120ms', label: 'API Latency' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '3x', label: 'Faster Dispatch' },
    ],
    liveUrl: 'https://delayfree.com/',
    privateRepo: true,
    featured: true,
    badge: 'Live production system',
  },
  {
    title: 'Event-Driven Notification Engine',
    problem: 'Product teams needed dependable multi-channel notifications without duplicate sends or silent delivery failures.',
    solution: 'Built an event-driven service with queues, provider fallbacks, retries, deduplication, and delivery receipts.',
    impact: 'Designed for 500K+ events per day with a 99.5% delivery rate.',
    tags: ['Node.js', 'BullMQ', 'Redis', 'TypeScript'],
    metrics: [
      { value: '500K+', label: 'Events/day' },
      { value: '99.5%', label: 'Delivery Rate' },
    ],
    github: 'https://github.com/mubaraq-star',
  },
  {
    title: 'Multi-Tenant Auth & RBAC Service',
    problem: 'A multi-tenant SaaS product needed secure identity, roles, and delegated access without coupling auth to every product service.',
    solution: 'Designed an auth service with refresh-token rotation, fine-grained RBAC, OAuth 2.0, and tenant-aware boundaries.',
    impact: 'Supported 2M+ auth tokens with 8ms P99 latency.',
    tags: ['NestJS', 'PostgreSQL', 'JWT', 'OAuth2'],
    metrics: [
      { value: '2M+', label: 'Auth Tokens' },
      { value: '8ms', label: 'P99 Latency' },
    ],
    github: 'https://github.com/mubaraq-star',
  },
  {
    title: 'ETL Data Pipeline',
    problem: 'Analytics workflows were slowed by inconsistent data from multiple structured and semi-structured sources.',
    solution: 'Created a containerised ETL pipeline to ingest, validate, transform, and load data into a dependable analytics layer.',
    impact: 'Processed 2TB+ of data with zero reported data-loss incidents.',
    tags: ['Node.js', 'PostgreSQL', 'Docker', 'Kubernetes'],
    metrics: [
      { value: '2TB+', label: 'Data Processed' },
      { value: '0', label: 'Data Loss Incidents' },
    ],
    github: 'https://github.com/mubaraq-star',
  },
];

export default function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <div className="section-eyebrow"><span>Featured Work</span></div>
        <h2 className="section-title">Proof that the backend can carry the product</h2>
        <p className="projects-sub">
          Case studies from logistics, SaaS infrastructure, notifications, and data platforms.
        </p>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <div className={`project-card${p.featured ? ' featured' : ''}`} key={i}>
              {p.badge && <span className="project-badge">{p.badge}</span>}

              <div className="project-tags">
                {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>

              <h3 className="project-title">{p.title}</h3>
              <div className="case-study-copy">
                <p><strong>Problem</strong>{p.problem}</p>
                <p><strong>Solution</strong>{p.solution}</p>
                <p><strong>Business impact</strong>{p.impact}</p>
              </div>

              <div className="project-metrics">
                {p.metrics.map(m => (
                  <div className="metric" key={m.label}>
                    <span className="metric-val">{m.value}</span>
                    <span className="metric-lbl">{m.label}</span>
                  </div>
                ))}
              </div>

              <div className="project-footer">
                {/* Delayfree — live site + private repo note */}
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="project-link">
                    <ExternalLink size={15} /> View Live Site <ArrowRight size={14} />
                  </a>
                )}
                {p.privateRepo && (
                  <span className="private-badge">
                    <Lock size={12} /> Private Repo
                  </span>
                )}

                {/* Other projects — GitHub link */}
                {p.github && !p.liveUrl && (
                  <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
                    <GithubIcon size={15} /> View on GitHub <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
