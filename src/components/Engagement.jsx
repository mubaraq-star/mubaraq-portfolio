import { ArrowRight, BriefcaseBusiness, Compass, Repeat2, SearchCheck } from 'lucide-react';
import './Engagement.css';

const models = [
  { icon: <Compass size={20} />, title: 'Discovery Call', desc: 'We clarify the product, constraints, risks, and desired outcome so the engagement starts with the right problem.' },
  { icon: <BriefcaseBusiness size={20} />, title: 'Architecture & Planning', desc: 'I turn the requirements into a practical technical plan, milestones, and decisions your team can act on.' },
  { icon: <Repeat2 size={20} />, title: 'Build & Deliver', desc: 'I implement the agreed scope with clear updates, reviewable work, and production-minded quality.' },
  { icon: <SearchCheck size={20} />, title: 'Support & Optimization', desc: 'After launch, we improve performance, reliability, observability, and the next highest-value technical priorities.' },
];

export default function Engagement() {
  return <section className="engagement section" id="engagement"><div className="container">
    <div className="section-eyebrow"><span>How we work together</span></div><h2 className="section-title">A clear path from backend problem to useful progress</h2>
    <div className="engagement-grid">{models.map((model, i) => <article className="engagement-card" key={model.title}><div className="engagement-icon">{model.icon}</div><span className="engagement-step">Step {i + 1}</span><h3>{model.title}</h3><p>{model.desc}</p></article>)}</div>
    <div className="engagement-footer">
      <p className="availability"><span className="role-dot" /> Currently accepting a limited number of contract and consulting engagements.</p>
      <a href="#contact" className="btn-primary engagement-cta">Start with a discovery call <ArrowRight size={16} /></a>
    </div>
  </div></section>;
}