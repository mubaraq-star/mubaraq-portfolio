import { ArrowUpRight, BookOpen, GraduationCap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../BrandIcons.jsx';
import { PROFILE_LINKS } from '../../site.js';
import './Insights.css';

const icons = {
  github: <GithubIcon size={20} />,
  linkedin: <LinkedinIcon size={20} />,
  researchgate: <BookOpen size={20} />,
  scholar: <GraduationCap size={20} />,
};

export default function FeaturedIn() {
  if (PROFILE_LINKS.length === 0) return null;

  return (
    <section className="featured-in" aria-labelledby="featured-in-title">
      <h2 id="featured-in-title" className="featured-in-title">Featured In</h2>
      <ul className="featured-in-list">
        {PROFILE_LINKS.map(l => (
          <li key={l.key}>
            <a href={l.url} target="_blank" rel="noreferrer me">
              <span className="featured-in-icon">{icons[l.key]}</span>
              <span className="featured-in-text">
                <strong>{l.label}</strong>
                <small>{l.note}</small>
              </span>
              <ArrowUpRight size={15} className="featured-in-arrow" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
