import { useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { Link, usePageMeta } from '../router.jsx';
import { articles, featuredArticle } from '../insights/articles.js';
import { categories, categoryBySlug } from '../insights/categories.js';
import { INSIGHTS_TAGLINE, SITE_NAME } from '../site.js';
import ArticleCard from '../components/insights/ArticleCard.jsx';
import Newsletter from '../components/insights/Newsletter.jsx';
import AuthorSection from '../components/insights/AuthorSection.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import '../components/insights/Insights.css';

const countsFor = slug => {
  const inCategory = articles.filter(a => a.category.slug === slug);
  const published = inCategory.filter(a => a.published).length;
  return { published, planned: inCategory.length - published };
};

const describeCounts = ({ published, planned }) =>
  [published && `${published} article${published > 1 ? 's' : ''}`, planned && `${planned} coming soon`].filter(Boolean).join(' · ');

const matches = (article, q) =>
  [article.title, article.excerpt, article.category.name, ...article.tags].join(' ').toLowerCase().includes(q);

export default function InsightsPage({ categorySlug }) {
  const category = categorySlug ? categoryBySlug[categorySlug] : null;
  const [query, setQuery] = useState('');

  usePageMeta({
    title: category ? `${category.name} — Insights | ${SITE_NAME}` : `Insights | ${SITE_NAME}`,
    description: category ? category.description : INSIGHTS_TAGLINE,
  });

  if (categorySlug && !category) return <NotFoundPage />;

  const q = query.trim().toLowerCase();
  const showOverview = !category && !q;
  const pool = category ? articles.filter(a => a.category.slug === category.slug) : articles;
  const results = pool
    .filter(a => !q || matches(a, q))
    .filter(a => !(showOverview && a === featuredArticle));

  return (
    <main className="insights-page">
      <header className="insights-hero">
        <div className="container">
          {category && (
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/insights">Insights</Link> <span aria-hidden="true">/</span> <span>{category.name}</span>
            </nav>
          )}
          <div className="section-eyebrow"><span>{category ? (category.supporting ? 'Supporting expertise' : 'Category') : 'Insights'}</span></div>
          <h1 className="insights-title">{category ? category.name : 'Notes on building backends, systems and teams'}</h1>
          <p className="insights-tagline">{category ? category.description : INSIGHTS_TAGLINE}</p>
        </div>
      </header>

      {showOverview && featuredArticle && (
        <section className="container insights-featured" aria-label="Featured article">
          <ArticleCard article={featuredArticle} variant="featured" headingLevel={2} />
        </section>
      )}

      {showOverview && (
        <section className="container insights-topics" aria-labelledby="topics-title">
          <h2 id="topics-title" className="insights-subtitle">Browse by topic</h2>
          <div className="topics-grid">
            {categories.map(c => (
              <Link
                key={c.slug} to={`/insights/category/${c.slug}`}
                className={`topic-tile${c.primary ? ' is-primary' : ''}${c.supporting ? ' is-supporting' : ''}`}
              >
                {c.primary && <span className="topic-flag">Primary focus</span>}
                {c.supporting && <span className="topic-flag">Supporting expertise</span>}
                <h3>{c.name}</h3>
                <p>{c.description}</p>
                <span className="topic-count">{describeCounts(countsFor(c.slug))} <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="container insights-list" aria-labelledby="list-title">
        <h2 id="list-title" className="visually-hidden">Articles</h2>
        <div className="insights-toolbar">
          <div className="insights-search">
            <Search size={16} aria-hidden="true" />
            <label htmlFor="insights-search" className="visually-hidden">Search articles</label>
            <input
              id="insights-search" type="search" placeholder="Search articles, topics or tags…"
              value={query} onChange={e => setQuery(e.target.value)}
            />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}
          </div>
          <nav className="insights-filters" aria-label="Filter by category">
            <Link to="/insights" className="filter-chip" aria-current={!category ? 'page' : undefined}>All</Link>
            {categories.map(c => (
              <Link key={c.slug} to={`/insights/category/${c.slug}`} className="filter-chip"
                aria-current={category?.slug === c.slug ? 'page' : undefined}>
                {c.name}
              </Link>
            ))}
          </nav>
        </div>

        {q && <p className="insights-results" role="status">{results.length} result{results.length === 1 ? '' : 's'} for “{query.trim()}”</p>}

        {results.length > 0 ? (
          [
            { key: 'published', title: q ? 'Articles' : 'Latest articles', items: results.filter(a => a.published) },
            { key: 'planned', title: 'Coming soon', note: 'On the writing desk', items: results.filter(a => !a.published) },
          ].filter(g => g.items.length > 0).map(g => (
            <div key={g.key} className="insights-group">
              <h3 className="insights-subtitle insights-group-title">
                {g.title} {g.note && <small>{g.note}</small>}
              </h3>
              <div className="insights-grid">
                {g.items.map(a => <ArticleCard key={a.slug} article={a} headingLevel={4} />)}
              </div>
            </div>
          ))
        ) : (
          <div className="insights-empty">
            <p>No articles match “{query.trim()}” yet.</p>
            <button type="button" className="btn-secondary" onClick={() => setQuery('')}>Clear search</button>
          </div>
        )}
      </section>

      {/* landing page, plus the Engineering Systems category where the background is most relevant */}
      {(!category || category.supporting) && <AuthorSection />}

      <div className="container insights-newsletter">
        <Newsletter />
      </div>
    </main>
  );
}
