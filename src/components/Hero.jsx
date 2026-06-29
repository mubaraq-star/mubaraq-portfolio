import { useEffect, useRef } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons.jsx';
import './Hero.css';

const stats = [
  { value: '5+', label: 'Years of Experience' },
  { value: '2', label: 'Products Launched' },
  { value: '10K+', label: 'Users Impacted' },
  { value: '15+', label: 'Engineers Led' },
];

export default function Hero() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity =
          cursorRef.current.style.opacity === '0' ? '1' : '0';
      }
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="hero">
      <div className="hero-bg-grid" />
      <div className="hero-glow" />

      <div className="container hero-inner">
        <div className="hero-content">
          <div className="section-eyebrow">
            <span>CTO &amp; Engineering Lead — Delayfree</span>
          </div>

          <h1 className="hero-name">
            <span className="hero-first">Mubaraq</span>
            <br />
            <span className="hero-last">Abdulrahmon</span>
          </h1>

          <p className="hero-title">
            Backend Engineer &amp; CTO / Co-Founder
          </p>

          <p className="hero-tagline">
            Building resilient, scalable backends that power real products —
            bridging the gap between deep technical execution and bold product vision.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo('projects')}>
              View Projects <ArrowRight size={16} />
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('contact')}>
              Get in Touch
            </button>
          </div>

          <div className="hero-socials">
            <a href="https://github.com/mubaraq-star" target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon size={18} />
            </a>
            <a href="https://linkedin.com/in/mubaraq-abdulrahmon" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={18} />
            </a>
            <a href="mailto:mubbyone@gmail.com" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="hero-stats-col">
          {stats.map(s => (
            <div className="stat-card" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
