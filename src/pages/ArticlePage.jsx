import { ArrowLeft, ArrowRight, CalendarDays, Clock, PenLine } from 'lucide-react';
import { Link, usePageMeta } from '../router.jsx';
import { articleBySlug, publishedArticles } from '../insights/articles.js';
import { formatDate } from '../insights/parse.js';
import { SITE_NAME } from '../site.js';
import ArticleCard from '../components/insights/ArticleCard.jsx';
import Newsletter from '../components/insights/Newsletter.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import '../components/insights/Insights.css';

const relatedTo = article => {
  const others = publishedArticles.filter(a => a.slug !== article.slug);
  const sameCategory = others.filter(a => a.category.slug === article.category.slug);
  return [...sameCategory, ...others.filter(a => !sameCategory.includes(a))].slice(0, 3);
};

export default function ArticlePage({ slug }) {
  const article = articleBySlug[slug];

  usePageMeta({
    title: article ? `${article.title} | ${SITE_NAME}` : `Not found | ${SITE_NAME}`,
    description: article?.excerpt ?? '',
  });

  if (!article) return <NotFoundPage />;
  const related = relatedTo(article);

  return (
    <main className="article-page">
      <article className="container article-container">
        <Link to="/insights" className="article-back"><ArrowLeft size={15} /> All insights</Link>

        <header className="article-header">
          <Link to={`/insights/category/${article.category.slug}`} className="article-category">{article.category.name}</Link>
          <h1>{article.title}</h1>
          <p className="article-lead">{article.excerpt}</p>
          <div className="article-meta">
            {article.published ? (
              <>
                <span><CalendarDays size={14} /> <time dateTime={article.date}>{formatDate(article.date)}</time></span>
                <span><Clock size={14} /> {article.readingTime} min read</span>
              </>
            ) : (
              <span><PenLine size={14} /> Coming soon</span>
            )}
            <span>By {SITE_NAME}</span>
          </div>
          <ul className="article-tags" aria-label="Tags">
            {article.tags.map(t => <li key={t}>{t}</li>)}
          </ul>
        </header>

        {article.published ? (
          <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />
        ) : (
          <div className="article-planned">
            <PenLine size={22} />
            <h2>This article is being written</h2>
            <p>Subscribe below and it will land in your inbox when it is published.</p>
          </div>
        )}

        <aside className="author-box" aria-label="About the author">
          <img src="/profile.jpeg" alt="" width="64" height="64" />
          <div>
            <strong>{SITE_NAME}</strong>
            <p>Senior Backend Engineer and co-founder of Delayfree. I help SaaS teams and startups build backends that scale, and lead the engineering behind them.</p>
            <Link to="/#contact" className="article-hire">Work with me <ArrowRight size={14} /></Link>
          </div>
        </aside>
      </article>

      {related.length > 0 && (
        <section className="container article-related" aria-labelledby="related-title">
          <h2 id="related-title" className="insights-subtitle">Keep reading</h2>
          <div className="insights-grid">
            {related.map(a => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>
      )}

      <div className="container insights-newsletter">
        <Newsletter />
      </div>
    </main>
  );
}
