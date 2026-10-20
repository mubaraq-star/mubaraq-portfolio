import { Link } from '../router.jsx';
import { WRITING_TOPICS } from '../site.js';
import './WhatIWriteAbout.css';

// Small strip above the footer on every page, reinforcing the positioning.
export default function WhatIWriteAbout() {
  return (
    <section className="write-about" aria-labelledby="write-about-title">
      <div className="container write-about-inner">
        <h2 id="write-about-title" className="write-about-title">What I write about</h2>
        <ul className="write-about-list">
          {WRITING_TOPICS.map(t => (
            <li key={t.label}><Link to={`/insights/category/${t.category}`}>{t.label}</Link></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
