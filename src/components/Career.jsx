import './Career.css';

const timeline = [
  {
    period: 'Jan 2026 — Present',
    role: 'Software Engineer',
    company: 'Stallion Check Ltd · Manchester, United Kingdom · Remote',
    type: 'Full-time',
    bullets: [
      'Developing and scaling a UK business verification and compliance intelligence platform used by compliance teams, recruiters, accountants, legal professionals, and fintech organisations.',
      'Built responsive frontend applications with React.js and Next.js for company and director verification workflows.',
      'Designed scalable Python APIs and backend business logic supporting compliance monitoring, risk assessment, and filing history features.',
      'Implemented advanced search for UK companies, directors, and corporate relationships by integrating external business intelligence data sources.',
      'Developed secure authentication and authorisation mechanisms protecting sensitive business data in line with UK compliance requirements.',
      'Optimised API performance, backend processes, and database interactions to improve platform reliability and response times.',
    ],
    highlight: true,
    tags: ['Python', 'React.js', 'Next.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
  },
  {
    period: '2025 — Present',
    role: 'CTO, Co-Founder & Backend Team Lead',
    company: 'Delayfree · Lagos, Nigeria',
    type: 'Founder',
    bullets: [
      'Co-founded Delayfree and architected the entire backend from scratch — a real-time logistics coordination platform for last-mile delivery.',
      'Designed and built a real-time tracking engine using WebSockets and event-driven architecture to provide live shipment visibility to dispatchers and end users.',
      'Engineered an automated dispatch system with smart routing logic, reducing average delivery assignment time and optimising driver allocation.',
      'Led backend team as technical lead — set coding standards, conducted code reviews, and drove architectural decisions across the stack.',
      'Managed cloud infrastructure on AWS (EC2, RDS, S3) with Docker-based deployments, achieving consistent 99.9% uptime.',
      'Integrated third-party mapping, notifications (SMS/push), and payment APIs to deliver a complete logistics coordination experience.',
    ],
    highlight: true,
    tags: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'WebSockets', 'AWS', 'Docker'],
  },
  {
    period: 'Jan 2025 — Present',
    role: 'Software Backend Engineer',
    company: 'Edubridge Consultants · Ikeja, Lagos · Hybrid',
    type: 'Full-time',
    bullets: [
      'Designed and implemented scalable backend solutions using Node.js and Express.js, enhancing application performance and security.',
      'Developed custom RESTful APIs and managed database solutions for diverse web projects.',
      'Managed seamless deployment, optimisation, and integration of web services to deliver high-quality user experiences.',
      'Utilised Git for version control and fostered collaborative development across cross-functional teams.',
    ],
    tags: ['Node.js', 'Express.js', 'REST APIs', 'Microservices', 'Git'],
  },
  {
    period: 'Apr 2021 — May 2022',
    role: 'Software Backend Engineer',
    company: 'MaHealth Inc. · Lagos, Nigeria · Remote',
    type: 'Contract',
    bullets: [
      'Integrated Twilio for seamless video consultations and calendar scheduling, enhancing remote healthcare delivery.',
      'Implemented secure and efficient payment processing using Node.js, significantly increasing patient conversion rates.',
      'Developed a dynamic, user-friendly interface with Retool, simplifying backend service management for non-technical users.',
      'Proactively identified and resolved backend bottlenecks, optimising scalability and overall system performance.',
    ],
    tags: ['Node.js', 'Twilio', 'REST APIs', 'Retool', 'Payments'],
  },
  {
    period: 'Jan 2020 — Jun 2020',
    role: 'Data Analyst',
    company: 'Hash Analytic · Internship',
    type: 'Internship',
    bullets: [
      'Assisted in developing data analytics tools and dashboards using JavaScript and Python, enhancing data visualisation and reporting capabilities.',
      'Collaborated with senior developers to optimise data processing workflows, improving efficiency and accuracy.',
      'Gained hands-on experience in data analysis, machine learning concepts, and analytical platforms.',
    ],
    tags: ['Python', 'JavaScript', 'SQL', 'Data Analysis'],
  },
];

const milestones = [
  {
    value: '5+',
    label: 'Years Engineering Experience',
    sub: 'Across healthtech, edtech, logistics, and compliance intelligence domains.',
  },
  {
    value: '2',
    label: 'Products Founded & Shipped',
    sub: 'Delayfree (logistics) live in production — built from zero to users as CTO.',
  },
  {
    value: 'UK Gov',
    label: 'Compliance Platform Live',
    sub: 'Stallion Check serves UK compliance teams, fintechs, and legal professionals.',
  },
  {
    value: '99.9%',
    label: 'Uptime at Delayfree',
    sub: 'AWS-hosted, Docker-deployed backend with real-time WebSocket tracking engine.',
  },
];

export default function Career() {
  return (
    <section className="career section" id="career">
      <div className="container">
        <div className="career-header">
          <div>
            <div className="section-eyebrow"><span>Career</span></div>
            <h2 className="section-title">Highlights &amp; Milestones</h2>
            <p className="career-sub">
              A track record of shipping real products across healthtech, edtech, and compliance — from Lagos to Manchester.
            </p>
          </div>
        </div>

        <div className="career-layout">
          {/* Timeline */}
          <div className="timeline">
            <div className="timeline-line" />
            {timeline.map((item, i) => (
              <div className={`tl-item${item.highlight ? ' highlight' : ''}`} key={i}>
                <div className="tl-dot" />
                <div className="tl-content">
                  <div className="tl-meta">
                    <span className="tl-period mono">{item.period}</span>
                    <span className="tl-type">{item.type}</span>
                  </div>
                  <h4 className="tl-role">{item.role}</h4>
                  <span className="tl-company">{item.company}</span>
                  <ul className="tl-bullets">
                    {item.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                  <div className="tl-tags">
                    {item.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Milestones */}
          <div className="milestones">
            {milestones.map((m, i) => (
              <div className="milestone-card" key={i}>
                <div className="ms-icon-wrap">
                  <div className="ms-icon-bg" />
                </div>
                <div>
                  <span className="ms-value">{m.value}</span>
                  <span className="ms-label">{m.label}</span>
                  <p className="ms-sub">{m.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
