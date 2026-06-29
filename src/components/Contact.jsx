import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons.jsx';
import './Contact.css';

const socials = [
  { icon: <GithubIcon size={18} />, label: 'github.com/mubaraq-star', href: 'https://github.com/mubaraq-star' },
  { icon: <LinkedinIcon size={18} />, label: 'linkedin.com/in/mubaraq-abdulrahmon', href: 'https://linkedin.com/in/mubaraq-abdulrahmon' },
  { icon: <Mail size={18} />, label: 'mubbyone@gmail.com', href: 'mailto:mubbyone@gmail.com' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const mailto = `mailto:mubbyone@gmail.com?subject=${encodeURIComponent(form.subject || 'Portfolio Enquiry')}&body=${encodeURIComponent(`Hi Mubaraq,\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="contact section" id="contact">
      <div className="contact-glow" />
      <div className="container">
        <div className="contact-grid">
          {/* Left */}
          <div className="contact-left">
            <div className="section-eyebrow"><span>Let's Build Something</span></div>
            <h2 className="section-title">
              Open to new<br />
              <span className="teal">collaborations.</span>
            </h2>
            <p className="contact-body">
              Whether you're looking for a backend engineer, a technical co-founder,
              or a CTO advisor, I'm always open to meaningful conversations about
              the problems you're solving.
            </p>

            <div className="contact-socials">
              {socials.map(s => (
                <a href={s.href} key={s.label} className="social-row" target="_blank" rel="noreferrer">
                  <span className="social-icon">{s.icon}</span>
                  <span className="social-label">{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name" name="name" type="text" placeholder="Jane Smith"
                  value={form.name} onChange={handleChange} required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email" name="email" type="email" placeholder="jane@company.com"
                  value={form.email} onChange={handleChange} required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject" name="subject" type="text" placeholder="Technical Co-Founder Inquiry"
                value={form.subject} onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message" name="message" rows={5}
                placeholder="Hi Mubaraq, I'm starting a fintech startup and looking for a technical co-founder…"
                value={form.message} onChange={handleChange} required
              />
            </div>

            <button type="submit" className={`form-submit${sent ? ' sent' : ''}`}>
              {sent ? (
                <><CheckCircle size={16} /> Message Opened</>
              ) : (
                <><Send size={16} /> Send Message</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
