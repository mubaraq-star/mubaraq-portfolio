import { ArrowLeft } from 'lucide-react';
import { Link, usePageMeta } from '../router.jsx';
import { SITE_NAME } from '../site.js';
import '../components/insights/Insights.css';

export default function NotFoundPage() {
  usePageMeta({ title: `Page not found | ${SITE_NAME}`, description: 'This page does not exist.' });

  return (
    <main className="not-found container">
      <span className="not-found-code">404</span>
      <h1>This page does not exist.</h1>
      <p>The link may be out of date, or the article may have moved.</p>
      <div className="not-found-actions">
        <Link to="/" className="btn-primary"><ArrowLeft size={15} /> Back to home</Link>
        <Link to="/insights" className="btn-secondary">Browse insights</Link>
      </div>
    </main>
  );
}
