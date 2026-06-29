import './TechStack.css';

const stack = [
  {
    name: 'Node.js',
    color: '#68a063',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M66.96 2.39a5 5 0 00-5 0L13.04 30.72a5 5 0 00-2.5 4.33v56.66a5 5 0 002.5 4.33l48.92 28.27a5 5 0 005 0l48.92-28.27a5 5 0 002.5-4.33V35.05a5 5 0 00-2.5-4.33L66.96 2.39z" fill="#68a063"/><path d="M64 22c-23.2 0-42 18.8-42 42s18.8 42 42 42 42-18.8 42-42-18.8-42-42-42zm0 10c17.67 0 32 14.33 32 32S81.67 96 64 96 32 81.67 32 64s14.33-32 32-32zm-8 14v38h8V56h12v-10H56z" fill="white" opacity="0.9"/></svg>`,
  },
  {
    name: 'NestJS',
    color: '#e0234e',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path d="M75.2 11.2c-1.3 0-2.6.3-3.7.9L35.6 32.4a7.4 7.4 0 00-3.7 6.4v40.8c0 2.6 1.4 5 3.7 6.4l35.9 20.3c2.3 1.3 5.1 1.3 7.4 0l35.9-20.3c2.3-1.3 3.7-3.7 3.7-6.4V38.8c0-2.6-1.4-5-3.7-6.4L78.9 12.1c-1.1-.6-2.4-.9-3.7-.9z" fill="#e0234e"/><path d="M55.3 48.5C50.5 43.2 44 40 36.9 40c-14.4 0-26 11.6-26 26s11.6 26 26 26c7.1 0 13.5-2.9 18.2-7.5" stroke="white" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M72 52v24M84 52v24M72 64h12" stroke="white" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    name: 'PostgreSQL',
    color: '#336791',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><ellipse cx="64" cy="38" rx="32" ry="18" fill="#336791"/><rect x="32" y="38" width="64" height="52" rx="2" fill="#336791"/><ellipse cx="64" cy="90" rx="32" ry="18" fill="#4a7db5"/><ellipse cx="64" cy="38" rx="32" ry="18" fill="#4a7db5"/><ellipse cx="64" cy="38" rx="26" ry="12" fill="#336791" opacity="0.7"/><path d="M64 50 Q80 60 80 76 Q80 90 64 90 Q48 90 48 76 Q48 60 64 50z" fill="#4a7db5" opacity="0.5"/><text x="64" y="74" text-anchor="middle" font-size="28" font-family="Arial" font-weight="bold" fill="white">PG</text></svg>`,
  },
  {
    name: 'MongoDB',
    color: '#13aa52',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path d="M64 10c0 0-30 28-30 55 0 16.6 13.4 30 30 30s30-13.4 30-30C94 38 64 10 64 10z" fill="#13aa52"/><path d="M64 10c0 0 0 75 0 85" stroke="#b8c4b8" stroke-width="6" stroke-linecap="round"/></svg>`,
  },
  {
    name: 'Docker',
    color: '#2496ed',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="50" width="108" height="40" rx="12" fill="#2496ed"/><rect x="20" y="58" width="16" height="14" rx="3" fill="white" opacity="0.9"/><rect x="42" y="58" width="16" height="14" rx="3" fill="white" opacity="0.9"/><rect x="64" y="58" width="16" height="14" rx="3" fill="white" opacity="0.9"/><rect x="86" y="58" width="16" height="14" rx="3" fill="white" opacity="0.9"/><rect x="53" y="40" width="16" height="14" rx="3" fill="#2496ed" stroke="white" stroke-width="2"/><path d="M118 64 C118 64 112 55 100 58" stroke="#69c5f5" stroke-width="3" fill="none"/><circle cx="118" cy="64" r="4" fill="#69c5f5"/></svg>`,
  },
  {
    name: 'AWS',
    color: '#ff9900',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path d="M39 74 L52 34 L65 74 L58 74 L52 52 L46 74Z" fill="#ff9900"/><path d="M62 74 L75 34 L88 74 L81 74 L75 52 L69 74Z" fill="#ff9900"/><path d="M20 90 Q64 104 108 90" stroke="#ff9900" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M104 86 L108 90 L104 94" stroke="#ff9900" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    name: 'Kubernetes',
    color: '#326ce5',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><polygon points="64,12 110,38 110,90 64,116 18,90 18,38" fill="none" stroke="#326ce5" stroke-width="5"/><circle cx="64" cy="64" r="14" fill="#326ce5"/><line x1="64" y1="12" x2="64" y2="50" stroke="#326ce5" stroke-width="4"/><line x1="110" y1="38" x2="78" y2="56" stroke="#326ce5" stroke-width="4"/><line x1="110" y1="90" x2="78" y2="72" stroke="#326ce5" stroke-width="4"/><line x1="64" y1="116" x2="64" y2="78" stroke="#326ce5" stroke-width="4"/><line x1="18" y1="90" x2="50" y2="72" stroke="#326ce5" stroke-width="4"/><line x1="18" y1="38" x2="50" y2="56" stroke="#326ce5" stroke-width="4"/><circle cx="64" cy="12" r="6" fill="#326ce5"/><circle cx="110" cy="38" r="6" fill="#326ce5"/><circle cx="110" cy="90" r="6" fill="#326ce5"/><circle cx="64" cy="116" r="6" fill="#326ce5"/><circle cx="18" cy="90" r="6" fill="#326ce5"/><circle cx="18" cy="38" r="6" fill="#326ce5"/></svg>`,
  },
  {
    name: 'Redis',
    color: '#dc382d',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><ellipse cx="64" cy="48" rx="44" ry="18" fill="#dc382d"/><rect x="20" y="48" width="88" height="32" fill="#dc382d"/><ellipse cx="64" cy="80" rx="44" ry="18" fill="#a52019"/><text x="64" y="55" text-anchor="middle" font-size="22" font-family="Arial" font-weight="bold" fill="white">REDIS</text></svg>`,
  },
  {
    name: 'TypeScript',
    color: '#3178c6',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="12" fill="#3178c6"/><text x="14" y="85" font-size="72" font-family="Arial" font-weight="bold" fill="white">TS</text></svg>`,
  },
  {
    name: 'GraphQL',
    color: '#e10098',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><polygon points="64,16 110,40 110,88 64,112 18,88 18,40" fill="none" stroke="#e10098" stroke-width="6"/><circle cx="64" cy="16" r="8" fill="#e10098"/><circle cx="110" cy="40" r="8" fill="#e10098"/><circle cx="110" cy="88" r="8" fill="#e10098"/><circle cx="64" cy="112" r="8" fill="#e10098"/><circle cx="18" cy="88" r="8" fill="#e10098"/><circle cx="18" cy="40" r="8" fill="#e10098"/><line x1="64" y1="16" x2="110" y2="88" stroke="#e10098" stroke-width="3"/><line x1="64" y1="16" x2="18" y2="88" stroke="#e10098" stroke-width="3"/><line x1="18" y1="40" x2="110" y2="40" stroke="#e10098" stroke-width="3"/></svg>`,
  },
  {
    name: 'Terraform',
    color: '#7b42bc',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><polygon points="64,14 98,34 98,74 64,94" fill="#7b42bc" opacity="0.9"/><polygon points="30,34 64,14 64,54 30,74" fill="#7b42bc"/><polygon points="30,74 64,54 64,94 30,114" fill="#7b42bc" opacity="0.7"/><polygon points="98,74 128,58 128,98 98,114" fill="#7b42bc" opacity="0.5"/></svg>`,
  },
  {
    name: 'GitHub',
    color: '#6e5494',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="54" fill="#24292e"/><path d="M64 20C39.1 20 19 40.1 19 65c0 19.9 12.9 36.8 30.8 42.8 2.3.4 3.1-1 3.1-2.2v-7.8c-12.5 2.7-15.2-6-15.2-6-2-5.2-5-6.6-5-6.6-4.1-2.8.3-2.7.3-2.7 4.5.3 6.9 4.6 6.9 4.6 4 6.9 10.5 4.9 13.1 3.7.4-2.9 1.6-4.9 2.9-6-10-1.1-20.5-5-20.5-22.3 0-4.9 1.8-8.9 4.6-12.1-.5-1.1-2-5.7.4-11.9 0 0 3.8-1.2 12.3 4.6 3.6-1 7.4-1.5 11.2-1.5 3.8 0 7.6.5 11.2 1.5 8.5-5.8 12.3-4.6 12.3-4.6 2.4 6.2.9 10.8.4 11.9 2.9 3.1 4.6 7.1 4.6 12.1 0 17.3-10.5 21.1-20.5 22.2 1.6 1.4 3 4.1 3 8.3v12.3c0 1.2.8 2.7 3.1 2.2C95.1 101.8 109 84.9 109 65 109 40.1 88.9 20 64 20z" fill="white"/></svg>`,
  },
  {
    name: 'Nginx',
    color: '#009639',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><polygon points="64,10 118,40 118,88 64,118 10,88 10,40" fill="#009639"/><text x="64" y="74" text-anchor="middle" font-size="32" font-family="Arial" font-weight="bold" fill="white">nginx</text></svg>`,
  },
  {
    name: 'Prometheus',
    color: '#e6522c',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="54" fill="#e6522c" opacity="0.15" stroke="#e6522c" stroke-width="3"/><circle cx="64" cy="64" r="10" fill="#e6522c"/><path d="M64 20 A44 44 0 0 1 108 64" stroke="#e6522c" stroke-width="4" fill="none"/><path d="M64 20 A44 44 0 0 0 20 64" stroke="#e6522c" stroke-width="4" fill="none" opacity="0.5"/><line x1="64" y1="64" x2="64" y2="32" stroke="#e6522c" stroke-width="5" stroke-linecap="round"/><line x1="64" y1="64" x2="88" y2="50" stroke="#e6522c" stroke-width="3" stroke-linecap="round"/></svg>`,
  },
];

export default function TechStack() {
  return (
    <section className="techstack section" id="stack">
      <div className="container">
        <div className="section-eyebrow"><span>Tech Stack</span></div>
        <h2 className="section-title">Tools I Build With</h2>
        <p className="stack-sub">
          Production-grade technologies that power resilient, scalable backends
          and cloud infrastructure.
        </p>

        <div className="stack-grid">
          {stack.map(t => (
            <div className="stack-item" key={t.name}>
              <div
                className="stack-icon"
                style={{ '--accent': t.color }}
                dangerouslySetInnerHTML={{ __html: t.svg }}
              />
              <span className="stack-name">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
