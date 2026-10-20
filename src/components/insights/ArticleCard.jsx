import { ArrowRight, CalendarDays, Clock, Star } from 'lucide-react';
import { Link } from '../../router.jsx';
import { formatDate } from '../../insights/parse.js';
import './Insights.css';

// variant: 'default' | 'featured'. The title link stretches over the whole card.
export default function ArticleCard({ article, variant = 'default', headingLevel = 3 }) {
  const { slug, title, excerpt, category, tags, date, readingTime, published } = article;
  const Heading = `h${headingLevel}`;

  return (
    <article className={`article-card article-card--${variant}${published ? '' : ' is-planned'}`}>
      <div className="article-card-top">
        {variant === 'featured' && <span className="article-badge"><Star size={12} /> Featured</span>}
        <Link to={`/insights/category/${category.slug}`} className="article-category">{category.name}</Link>
        {!published && <span className="article-soon">Coming soon</span>}
      </div>

      <Heading className="article-title">
        <Link to={`/insights/${slug}`} className="article-link">{title}</Link>
      </Heading>
      <p className="article-excerpt">{excerpt}</p>

      <ul className="article-tags" aria-label="Tags">
        {tags.map(t => <li key={t}>{t}</li>)}
      </ul>

      <div className="article-meta">
        {published ? (
          <>
            <span><CalendarDays size={13} /> <time dateTime={date}>{formatDate(date)}</time></span>
            <span><Clock size={13} /> {readingTime} min read</span>
          </>
        ) : (
          <span>In the writing queue</span>
        )}
        <span className="article-cta" aria-hidden="true">
          {published ? 'Read' : 'Get notified'} <ArrowRight size={14} />
        </span>
      </div>
    </article>
  );
}
