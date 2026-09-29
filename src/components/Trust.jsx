import { CheckCircle2, Gauge, Users, ShieldCheck } from 'lucide-react';
import './Trust.css';

const signals = [
  { icon: <ShieldCheck size={18} />, value: '5+', label: 'years engineering experience' },
  { icon: <Users size={18} />, value: '10K+', label: 'users served by a live product' },
  { icon: <Gauge size={18} />, value: '99.9%', label: 'production uptime on Delayfree' },
  { icon: <CheckCircle2 size={18} />, value: '500K+', label: 'events processed daily' },
  { icon: <Users size={18} />, value: 'CTO', label: 'founder and team leadership experience' },
  { icon: <CheckCircle2 size={18} />, value: 'Open', label: 'for contract work' },
];

export default function Trust() {
  return (
    <section className="trust" aria-label="Availability and selected outcomes">
      <div className="container trust-inner">
        <div className="availability-strip">
          <span className="availability-status"><span className="role-dot" /> Available for contract work</span>
          <span>Response time: within 24 hours</span>
          <span>Open to startup projects, SaaS backend development, technical consulting, fractional engineering leadership, and long-term contracts.</span>
        </div>
        <span className="trust-label">Proof points for teams that need dependable execution</span>
        <div className="trust-grid">
          {signals.map(signal => (
            <div className="trust-item" key={signal.label}>
              <span className="trust-icon">{signal.icon}</span>
              <span><strong>{signal.value}</strong>{signal.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}