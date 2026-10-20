import { useState } from 'react';
import { CheckCircle, Loader2, MailPlus } from 'lucide-react';
import './Insights.css';

// Same Web3Forms key as the contact form: each sign-up arrives in your inbox.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | invalid

  const handleSubmit = async e => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setStatus('invalid'); return; }

    if (!WEB3FORMS_KEY) {
      window.location.href = `mailto:mubbyone@gmail.com?subject=${encodeURIComponent('Subscribe me to Insights')}&body=${encodeURIComponent(`Please add ${email.trim()} to your Insights newsletter.`)}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'New Insights newsletter subscriber',
          from_name: 'Portfolio newsletter',
          email: email.trim(),
          message: `${email.trim()} subscribed from ${window.location.pathname}`,
          botcheck,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter-icon"><MailPlus size={22} /></div>
      <div className="newsletter-copy">
        <h2 id="newsletter-title">Get new insights by email</h2>
        <p>Practical notes on backend engineering, system design and building products. Occasional emails, no spam, unsubscribe with one reply.</p>
      </div>

      {status === 'success' ? (
        <p className="newsletter-success" role="status"><CheckCircle size={18} /> You are subscribed. Thanks for reading.</p>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
          <input type="checkbox" className="form-honeypot" tabIndex={-1} autoComplete="off"
            checked={botcheck} onChange={e => setBotcheck(e.target.checked)} />
          <label htmlFor="newsletter-email" className="visually-hidden">Email address</label>
          <input
            id="newsletter-email" type="email" placeholder="you@company.com" autoComplete="email"
            value={email} aria-invalid={status === 'invalid'}
            onChange={e => { setEmail(e.target.value); if (status !== 'sending') setStatus('idle'); }}
          />
          <button type="submit" className="btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? <><Loader2 size={15} className="spin" /> Subscribing…</> : 'Subscribe'}
          </button>
          {status === 'invalid' && <span className="newsletter-error">Please enter a valid email address.</span>}
          {status === 'error' && <span className="newsletter-error">Something went wrong. Please try again in a moment.</span>}
        </form>
      )}
    </section>
  );
}
