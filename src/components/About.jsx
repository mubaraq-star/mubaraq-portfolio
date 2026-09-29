import { Terminal, Layers, Users, Zap } from 'lucide-react';
import profileImg from '/profile.jpeg';
import './About.css';

const pillars = [
  {
    icon: <Terminal size={20} />,
    title: 'Backend Architecture',
    desc: 'Building dependable backend systems with Node.js, NestJS, and cloud-native patterns that can grow with product demand.',
  },
  {
    icon: <Layers size={20} />,
    title: 'System Design',
    desc: 'Event-driven services, API boundaries, and database optimisation designed for resilience and observability from day one.',
  },
  {
    icon: <Users size={20} />,
    title: 'Engineering Leadership',
    desc: 'Setting technical direction, reviewing code, and aligning teams around clear delivery priorities.',
  },
  {
    icon: <Zap size={20} />,
    title: 'Startup Execution',
    desc: 'Co-founding Delayfree and taking it from idea to production with ownership across infrastructure and APIs.',
  },
];

const badges = [
  'Distributed Systems', 'Microservices', 'Cloud Architecture',
  'Team Leadership', 'System Design', 'API Design', 'DevOps', 'Startup Scaling',
];

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-grid">

          {/* Left — photo + text */}
          <div className="about-left">
            <div className="profile-photo-wrap">
              <div className="profile-ring" />
              <div className="profile-glow" />
              <img
                src={profileImg}
                alt="Mubaraq Abdulrahmon"
                className="profile-photo"
              />
              <div className="profile-label">
                <span className="role-dot" />
                CTO &amp; Co-Founder
              </div>
            </div>

            <div className="about-text">
              <div className="section-eyebrow"><span>Why clients hire me</span></div>
              <h2 className="section-title">
                Senior execution.<br />
                <span className="teal">Clear ownership. No drama.</span>
              </h2>
              <p className="about-body">
                I take ownership from requirements through architecture, implementation,
                deployment, and support. The goal is straightforward: reliable delivery,
                sensible technical decisions, and communication you can plan around.
              </p>
              <p className="about-body">
                I have built a live logistics platform serving 10K+ users and currently work
                on compliance intelligence software. That experience helps me balance speed
                with the reliability, security, and maintainability a real business needs.
              </p>

              <div className="about-badges">
                {badges.map(b => <span className="tag" key={b}>{b}</span>)}
              </div>

              <div className="about-role-badge">
                <span className="role-dot" />
                Available for contract backend engineering, architecture, and technical leadership
              </div>
            </div>
          </div>

          {/* Right — pillars */}
          <div className="about-pillars">
            {pillars.map(p => (
              <div className="pillar-card" key={p.title}>
                <div className="pillar-icon">{p.icon}</div>
                <div>
                  <h4 className="pillar-title">{p.title}</h4>
                  <p className="pillar-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
