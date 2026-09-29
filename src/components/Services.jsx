import { Blocks, Code2, SearchCheck, UsersRound, Radio, Cloud } from 'lucide-react';
import './Services.css';

const services = [
  { icon: <Blocks size={21} />, title: 'Backend Development', desc: 'Build APIs, data models, integrations, queues, and core services with Node.js, NestJS, and TypeScript.', outcome: 'A maintainable backend your team can ship and support.' },
  { icon: <Code2 size={21} />, title: 'API Design & Integration', desc: 'Design clear REST or GraphQL APIs and connect payments, identity, messaging, maps, and third-party platforms.', outcome: 'Fewer integration surprises and faster product delivery.' },
  { icon: <SearchCheck size={21} />, title: 'System Architecture', desc: 'Review your current system or plan a new one around reliability, security, data boundaries, and realistic growth.', outcome: 'Clear technical decisions before expensive rework.' },
  { icon: <Radio size={21} />, title: 'Real-Time Systems', desc: 'Implement live tracking, notifications, WebSockets, queues, and event-driven workflows that behave predictably.', outcome: 'Responsive product experiences without fragile backend dependencies.' },
  { icon: <Cloud size={21} />, title: 'Cloud Infrastructure', desc: 'Deploy and improve AWS, Docker, databases, observability, and production operations for your backend.', outcome: 'More confidence in releases and fewer avoidable incidents.' },
  { icon: <UsersRound size={21} />, title: 'Technical Leadership', desc: 'Provide hands-on technical direction, code review, delivery standards, and team support as a fractional engineering lead.', outcome: 'Senior ownership without the cost of a full-time CTO.' },
];

export default function Services() {
  return <section className="services section" id="services"><div className="container">
    <div className="section-eyebrow"><span>How I can help</span></div>
    <h2 className="section-title">Solve the backend problem before it becomes a business problem</h2>
    <p className="services-sub">Choose a focused engagement or bring me into the product team where technical decisions are slowing momentum.</p>
    <div className="services-grid">{services.map(service => <article className="service-card" key={service.title}><div className="service-icon">{service.icon}</div><h3>{service.title}</h3><p>{service.desc}</p><strong className="service-outcome">Outcome: {service.outcome}</strong></article>)}</div>
  </div></section>;
}