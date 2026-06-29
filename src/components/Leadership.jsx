import { Rocket, Users, TrendingUp, Shield } from 'lucide-react';
import './Leadership.css';

const pillars = [
  {
    icon: <Rocket size={22} />,
    title: 'Vision & Strategy',
    desc: 'Set the technical roadmap for Delayfree — from MVP to a scalable multi-tenant SaaS platform, aligned with business milestones.',
  },
  {
    icon: <Users size={22} />,
    title: 'Team Building',
    desc: 'Hired and grew a cross-functional engineering team of 8, introduced structured onboarding, 1:1s, and a strong engineering culture.',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Product Execution',
    desc: 'Delivered key product features on tight timelines by creating clear technical specs, sprint planning, and hands-on code reviews.',
  },
  {
    icon: <Shield size={22} />,
    title: 'Reliability & Security',
    desc: 'Established SLA targets, incident response playbooks, and security practices that keep production running at 99.9% uptime.',
  },
];

const numbers = [
  { v: '8', l: 'Engineers Managed' },
  { v: '99.9%', l: 'Uptime SLA' },
  { v: '3x', l: 'Delivery Speed' },
  { v: '38%', l: 'Cost Reduction' },
];

export default function Leadership() {
  return (
    <section className="leadership section" id="leadership">
      <div className="container">
        <div className="leadership-inner">
          <div className="leadership-left">
            <div className="section-eyebrow"><span>Leadership</span></div>
            <h2 className="section-title">
              Building Delayfree<br />
              <span className="teal">from the ground up.</span>
            </h2>
            <p className="leadership-body">
              As CTO and Co-Founder of Delayfree, I own the full spectrum of engineering
              leadership — from architecting the initial backend services to managing a
              growing distributed team. Every system, every hire, every deployment reflects
              a deliberate choice to build for reliability and speed.
            </p>

            <div className="leadership-numbers">
              {numbers.map(n => (
                <div className="ln-item" key={n.l}>
                  <span className="ln-val">{n.v}</span>
                  <span className="ln-lbl">{n.l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="leadership-pillars">
            {pillars.map(p => (
              <div className="lp-card" key={p.title}>
                <div className="lp-icon">{p.icon}</div>
                <h4 className="lp-title">{p.title}</h4>
                <p className="lp-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
