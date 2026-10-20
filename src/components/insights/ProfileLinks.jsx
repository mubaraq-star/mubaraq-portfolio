import { BookOpen, GraduationCap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../BrandIcons.jsx';
import { PROFILE_LINKS } from '../../site.js';
import './Insights.css';

const icons = {
  linkedin: <LinkedinIcon size={15} />,
  github: <GithubIcon size={15} />,
  researchgate: <BookOpen size={15} />,
  scholar: <GraduationCap size={15} />,
};

export default function ProfileLinks() {
  return (
    <ul className="profile-links" aria-label="Profiles">
      {PROFILE_LINKS.map(l => (
        <li key={l.key}>
          <a href={l.url} target="_blank" rel="noreferrer me">{icons[l.key]} {l.label}</a>
        </li>
      ))}
    </ul>
  );
}
