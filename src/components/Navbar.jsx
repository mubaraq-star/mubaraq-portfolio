import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useRouter } from '../router.jsx';
import './Navbar.css';

// Section links point at the homepage (/#id), so they also work from the Insights pages.
const links = [
  { label: 'Services', to: '/#services' },
  { label: 'Case Studies', to: '/#projects' },
  { label: 'Process', to: '/#engagement' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/#contact' },
];

export default function Navbar() {
  const { path } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);
  const isActive = to => to === '/insights' && path.startsWith('/insights');

  return (
    <nav className={`navbar${scrolled || open ? ' scrolled' : ''}`}>
      <div className="nav-inner container">
        <Link to="/" className="logo" onClick={close} aria-label="Home">
          <span className="logo-init">MA</span><span className="logo-dot">.</span>
        </Link>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.label}>
              <Link to={l.to} aria-current={isActive(l.to) ? 'page' : undefined}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <Link to="/#contact" className="nav-cta">Start a Conversation</Link>

        <button className="menu-btn" onClick={() => setOpen(o => !o)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {links.map(l => (
            <Link key={l.label} to={l.to} onClick={close} aria-current={isActive(l.to) ? 'page' : undefined}>{l.label}</Link>
          ))}
          <Link to="/#contact" className="mobile-cta" onClick={close}>Start a Conversation</Link>
        </div>
      )}
    </nav>
  );
}
