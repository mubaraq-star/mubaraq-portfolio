import { ArrowRight, MessageSquareQuote, UserCheck } from 'lucide-react';
import { LinkedinIcon } from './BrandIcons.jsx';
import './Testimonials.css';

// Add real client quotes here as you collect them; the section switches to quote cards automatically.
// { quote: '...', name: 'Jane Smith', role: 'CTO', company: 'Acme' }
const testimonials = [];

const referees = [
  'Founders and co-founders I have built products with',
  'Engineering leads and engineers from teams I have managed',
  'Product stakeholders who relied on my delivery',
];

export default function Testimonials() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  if (testimonials.length > 0) {
    return <section className="testimonials section" id="testimonials"><div className="container">
      <div className="section-eyebrow"><span>What clients say</span></div>
      <h2 className="section-title">The kind of partner teams keep close</h2>
      <div className="quote-grid">{testimonials.map(t => (
        <figure className="quote-card" key={t.name}>
          <MessageSquareQuote size={22} className="quote-icon" />
          <blockquote>{t.quote}</blockquote>
          <figcaption><strong>{t.name}</strong><span>{t.role}, {t.company}</span></figcaption>
        </figure>
      ))}</div>
    </div></section>;
  }

  return <section className="testimonials section" id="testimonials"><div className="container">
    <div className="testimonial-layout">
      <div>
        <div className="section-eyebrow"><span>References</span></div>
        <h2 className="section-title">Speak to people I have shipped with</h2>
        <p className="testimonial-intro">
          Before you commit, I can connect you with people who have worked with me directly,
          so you hear how I communicate, handle pressure, and deliver from someone other than me.
        </p>
      </div>
      <div className="reference-card">
        <div className="reference-head"><UserCheck size={22} /><strong>References available on request</strong></div>
        <ul className="reference-list">{referees.map(r => <li key={r}>{r}</li>)}</ul>
        <div className="reference-actions">
          <button className="btn-primary" onClick={() => scrollTo('contact')}>Request a reference <ArrowRight size={15} /></button>
          <a className="btn-secondary" href="https://linkedin.com/in/mubaraq-abdulrahmon" target="_blank" rel="noreferrer"><LinkedinIcon size={15} /> View LinkedIn</a>
        </div>
      </div>
    </div>
  </div></section>;
}
