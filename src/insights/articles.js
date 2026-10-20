import { toArticle, sortArticles } from './parse.js';

// Every Markdown file in content/insights becomes an article; the filename is its URL slug.
const files = import.meta.glob('../../content/insights/*.md', { query: '?raw', import: 'default', eager: true });

export const articles = sortArticles(
  Object.entries(files).map(([path, raw]) => toArticle(raw, path.split('/').pop().replace(/\.md$/, ''))),
);

export const publishedArticles = articles.filter(a => a.published);

export const articleBySlug = Object.fromEntries(articles.map(a => [a.slug, a]));

export const latestArticles = (count = 3) => publishedArticles.slice(0, count);

export const featuredArticle = publishedArticles.find(a => a.featured) || publishedArticles[0] || null;

export const articlesInCategory = slug => articles.filter(a => a.category.slug === slug);
