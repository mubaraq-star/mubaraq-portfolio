import { MessageSquareQuote } from 'lucide-react';
import './Testimonials.css';

export default function Testimonials() {
  return <section className="testimonials section" id="testimonials"><div className="container">
    <div className="section-eyebrow"><span>Trust, backed by evidence</span></div>
    <div className="testimonial-layout">
      <div><h2 className="section-title">The kind of partner teams keep close</h2><p className="testimonial-intro">Verified client quotes belong here. I have left this space honest rather than manufacture praise. Add two or three short testimonials with the client name, role, company, and the result they experienced.</p></div>
      <div className="testimonial-placeholder"><MessageSquareQuote size={22} /><strong>References available on request</strong><span>Ask for a reference from a founder, engineering lead, or product stakeholder after our discovery call.</span></div>
    </div>
  </div></section>;
}