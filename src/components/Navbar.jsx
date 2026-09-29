import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const links = ['Services', 'Case Studies', 'Process', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const anchors = { 'Case Studies': 'projects', Process: 'engagement' };
    document.getElementById(anchors[id] || id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner container">
        <a href="#" className="logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <span className="logo-init">MA</span><span className="logo-dot">.</span>
        </a>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} onClick={e => handleNav(e, l)}>{l}</a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="nav-cta" onClick={e => handleNav(e, 'Contact')}>
          Start a Conversation
        </a>

        <button className="menu-btn" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={e => handleNav(e, l)}>{l}</a>
          ))}
          <a href="#contact" className="mobile-cta" onClick={e => handleNav(e, 'Contact')}>Start a Conversation</a>
        </div>
      )}
    </nav>
  );
}
