import { Terminal, Layers, Users, Zap } from 'lucide-react';
import profileImg from '/profile.jpeg';
import './About.css';

const pillars = [
  {
    icon: <Terminal size={20} />,
    title: 'Backend Architecture',
    desc: 'Building high-throughput distributed systems with Node.js, NestJS, and cloud-native patterns that scale from MVP to millions of users.',
  },
  {
    icon: <Layers size={20} />,
    title: 'System Design',
    desc: 'Event-driven microservices, CQRS, API gateways, and database optimisation — designing for resilience and observability from day one.',
  },
  {
    icon: <Users size={20} />,
    title: 'Engineering Leadership',
    desc: 'Growing and mentoring engineering teams, setting technical direction, and aligning cross-functional stakeholders around product velocity.',
  },
  {
    icon: <Zap size={20} />,
    title: 'Startup Execution',
    desc: 'Co-founding Delayfree and taking it from idea to production — owning the full stack from infrastructure decisions to user-facing APIs.',
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
              <div className="section-eyebrow"><span>About Me</span></div>
              <h2 className="section-title">
                Engineer at heart,<br />
                <span className="teal">Leader by choice.</span>
              </h2>
              <p className="about-body">
                I'm a backend engineer with 5+ years building high-throughput distributed
                systems, microservices, and cloud-native architectures. I specialise in
                Node.js, NestJS, Python, and cloud-native deployments.
              </p>
              <p className="about-body">
                As CTO and Co-Founder of Delayfree, I lead a growing engineering team,
                shipping backend infrastructure and real-time logistics systems that directly
                impact business outcomes. I also serve as a Software Engineer at Stallion
                Check Ltd, building UK compliance intelligence tools.
              </p>

              <div className="about-badges">
                {badges.map(b => <span className="tag" key={b}>{b}</span>)}
              </div>

              <div className="about-role-badge">
                <span className="role-dot" />
                CTO &amp; Co-Founder · Delayfree
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
