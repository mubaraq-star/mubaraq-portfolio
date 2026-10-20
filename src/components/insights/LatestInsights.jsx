import { ArrowRight } from 'lucide-react';
import { Link } from '../../router.jsx';
import { latestArticles } from '../../insights/articles.js';
import { INSIGHTS_TAGLINE } from '../../site.js';
import ArticleCard from './ArticleCard.jsx';
import './Insights.css';

export default function LatestInsights() {
  const latest = latestArticles(3);
  if (latest.length === 0) return null;

  return (
    <section className="latest-insights section" id="insights">
      <div className="container">
        <div className="latest-head">
          <div>
            <div className="section-eyebrow"><span>Latest Insights</span></div>
            <h2 className="section-title">Thinking out loud about building software</h2>
            <p className="latest-tagline">{INSIGHTS_TAGLINE}</p>
          </div>
          <Link to="/insights" className="btn-secondary latest-all">
            View all insights <ArrowRight size={15} />
          </Link>
        </div>
        <div className="insights-grid">
          {latest.map(a => <ArticleCard key={a.slug} article={a} />)}
        </div>
      </div>
    </section>
  );
}
