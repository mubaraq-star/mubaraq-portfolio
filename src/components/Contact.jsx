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
            <div className="section-eyebrow"><span>Start with the problem</span></div>
            <h2 className="section-title">
              Tell me what is<br />
              <span className="teal">blocking your product.</span>
            </h2>
            <p className="contact-body">
              Share the product stage, the backend challenge, and what a successful outcome
              looks like. I will reply with the clearest next step, whether that is a focused
              implementation, an architecture review, or ongoing technical leadership.
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
              <label htmlFor="subject">What do you need help with?</label>
              <input
                id="subject" name="subject" type="text" placeholder="e.g. Scale our API before launch"
                value={form.subject} onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message" name="message" rows={5}
                placeholder="Tell me about the product, current stack, timeline, and the outcome you need…"
                value={form.message} onChange={handleChange} required
              />
            </div>

            <button type="submit" className={`form-submit${sent ? ' sent' : ''}`}>
              {sent ? (
                <><CheckCircle size={16} /> Message Opened</>
              ) : (
                <><Send size={16} /> Request a Discovery Call</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
