import { useState } from 'react';
import { Mail, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons.jsx';
import './Contact.css';

const socials = [
  { icon: <GithubIcon size={18} />, label: 'github.com/mubaraq-star', href: 'https://github.com/mubaraq-star' },
  { icon: <LinkedinIcon size={18} />, label: 'linkedin.com/in/mubaraq-abdulrahmon', href: 'https://linkedin.com/in/mubaraq-abdulrahmon' },
  { icon: <Mail size={18} />, label: 'mubbyone@gmail.com', href: 'mailto:mubbyone@gmail.com' },
];

// Web3Forms access key (public by design — it only allows sending to your inbox).
// Without it the form falls back to opening the visitor's mail app.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const emptyForm = { name: '', email: '', subject: '', message: '', botcheck: '' };

const validate = form => {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please add your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Please add a valid email so I can reply.';
  if (form.message.trim().length < 10) errors.message = 'Tell me a little about the project (at least a sentence).';
  return errors;
};

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(errs => ({ ...errs, [name]: undefined }));
    if (status === 'error') setStatus('idle');
  };

  const openMailApp = () => {
    const body = `Hi Mubaraq,\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:mubbyone@gmail.com?subject=${encodeURIComponent(form.subject || 'Portfolio Enquiry')}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    if (!WEB3FORMS_KEY) { openMailApp(); return; }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio enquiry: ${form.subject.trim() || 'New project'}`,
          from_name: 'Portfolio contact form',
          name: form.name.trim(),
          email: form.email.trim(),
          topic: form.subject.trim(),
          message: form.message.trim(),
          botcheck: form.botcheck,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      setStatus('success');
      setForm(emptyForm);
    } catch {
      setStatus('error');
    }
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
          {status === 'success' ? (
            <div className="form-success" role="status">
              <CheckCircle size={32} />
              <h3>Thanks, your message is on its way.</h3>
              <p>I reply to every enquiry within 24 hours, usually with a few questions or a time for a short discovery call.</p>
              <button type="button" className="btn-secondary" onClick={() => setStatus('idle')}>Send another message</button>
            </div>
          ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* honeypot: hidden from people, filled in by spam bots */}
            <input type="checkbox" name="botcheck" className="form-honeypot" tabIndex={-1} autoComplete="off"
              checked={!!form.botcheck} onChange={e => setForm(f => ({ ...f, botcheck: e.target.checked ? 'on' : '' }))} />

            <div className="form-row">
              <div className={`form-group${errors.name ? ' has-error' : ''}`}>
                <label htmlFor="name">Your Name</label>
                <input
                  id="name" name="name" type="text" placeholder="Jane Smith" autoComplete="name"
                  value={form.name} onChange={handleChange} required aria-invalid={!!errors.name}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              <div className={`form-group${errors.email ? ' has-error' : ''}`}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email" name="email" type="email" placeholder="jane@company.com" autoComplete="email"
                  value={form.email} onChange={handleChange} required aria-invalid={!!errors.email}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">What do you need help with?</label>
              <input
                id="subject" name="subject" type="text" placeholder="e.g. Scale our API before launch"
                value={form.subject} onChange={handleChange}
              />
            </div>

            <div className={`form-group${errors.message ? ' has-error' : ''}`}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message" name="message" rows={5}
                placeholder="Tell me about the product, current stack, timeline, and the outcome you need…"
                value={form.message} onChange={handleChange} required aria-invalid={!!errors.message}
              />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>

            {status === 'error' && (
              <p className="form-alert" role="alert">
                <AlertCircle size={16} />
                <span>
                  Something went wrong sending your message. Please try again, or email me directly at{' '}
                  <a href="mailto:mubbyone@gmail.com">mubbyone@gmail.com</a>.
                </span>
              </p>
            )}

            <button type="submit" className="form-submit" disabled={status === 'sending'}>
              {status === 'sending' ? (
                <><Loader2 size={16} className="spin" /> Sending…</>
              ) : (
                <><Send size={16} /> Request a Discovery Call</>
              )}
            </button>
            <p className="form-note">I reply within 24 hours. Your details are only used to respond to you.</p>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}
