import { CheckCircle2 } from 'lucide-react';
import { AUTHOR_BIO, AUTHOR_NAME, AUTHOR_ROLES, ENGINEERING_BACKGROUND } from '../../site.js';
import FeaturedIn from './FeaturedIn.jsx';
import './Insights.css';

// Insights landing page: who writes here, and the engineering background behind the
// Engineering Systems category. Sits below the articles so software stays the headline.
export default function AuthorSection() {
  return (
    <section className="container author-section" aria-labelledby="about-author-title">
      <div className="author-about">
        <h2 id="about-author-title" className="insights-subtitle">About the author</h2>
        <div className="author-identity">
          <img src="/profile.jpeg" alt={AUTHOR_NAME} width="88" height="88" />
          <div>
            <h3 className="author-name">{AUTHOR_NAME}</h3>
            <ul className="author-roles">
              {AUTHOR_ROLES.map(r => <li key={r}>{r}</li>)}
            </ul>
          </div>
        </div>
        <div className="author-bio">
          {AUTHOR_BIO.map(p => <p key={p}>{p}</p>)}
        </div>
      </div>

      <div className="engineering-background">
        <h2 className="insights-subtitle">Engineering Background</h2>
        <ul>
          {ENGINEERING_BACKGROUND.map(item => (
            <li key={item}><CheckCircle2 size={16} aria-hidden="true" /> {item}</li>
          ))}
        </ul>
      </div>

      <FeaturedIn />
    </section>
  );
}
