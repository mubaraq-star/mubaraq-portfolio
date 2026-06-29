import { ArrowRight, ExternalLink, Lock } from 'lucide-react';
import { GithubIcon } from './BrandIcons.jsx';
import './Projects.css';

const projects = [
  {
    title: 'Delayfree — Real-Time Logistics Platform',
    description:
      'End-to-end logistics coordination platform built from the ground up as CTO. Real-time tracking, automated dispatch, and smart routing for last-mile delivery. Partner web app live — customer and courier on mobile.',
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
    badge: 'Founder Project',
  },
  {
    title: 'Event-Driven Notification Engine',
    description:
      'Async notification service handling email, SMS, and push across multiple providers with retry logic, deduplication, and delivery receipts at scale.',
    tags: ['Node.js', 'BullMQ', 'Redis', 'TypeScript'],
    metrics: [
      { value: '500K+', label: 'Events/day' },
      { value: '99.5%', label: 'Delivery Rate' },
    ],
    github: 'https://github.com/mubaraq-star',
  },
  {
    title: 'Multi-Tenant Auth & RBAC Service',
    description:
      'Identity and access management microservice with JWT, refresh-token rotation, fine-grained RBAC, and OAuth 2.0 for SaaS multi-tenancy.',
    tags: ['NestJS', 'PostgreSQL', 'JWT', 'OAuth2'],
    metrics: [
      { value: '2M+', label: 'Auth Tokens' },
      { value: '8ms', label: 'P99 Latency' },
    ],
    github: 'https://github.com/mubaraq-star',
  },
  {
    title: 'ETL Data Pipeline',
    description:
      'High-throughput ETL pipeline for ingesting and transforming structured and semi-structured data from multiple sources into a clean analytics layer.',
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
        <h2 className="section-title">Systems Designed to Scale</h2>
        <p className="projects-sub">
          From architecture through deployment — backend systems with measurable impact.
        </p>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <div className={`project-card${p.featured ? ' featured' : ''}`} key={i}>
              {p.badge && <span className="project-badge">{p.badge}</span>}

              <div className="project-tags">
                {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>

              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.description}</p>

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
