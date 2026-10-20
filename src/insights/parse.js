// Turns a Markdown article (frontmatter + body) into an article object.
// Plain ESM with no Vite APIs, so scripts/prerender.mjs can reuse it at build time.
import { marked } from 'marked';
import { categories, categoryBySlug } from './categories.js';

const WORDS_PER_MINUTE = 225;

const parseValue = raw => {
  const value = raw.trim();
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value.startsWith('[') && value.endsWith(']')) {
    return value.slice(1, -1).split(',').map(v => parseValue(v)).filter(v => v !== '');
  }
  return value.replace(/^["']|["']$/g, '');
};

// Supports the simple frontmatter used in content/insights: `key: value` and `key: [a, b]`.
export const parseFrontmatter = raw => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1 || line.trim().startsWith('#')) continue;
    data[line.slice(0, idx).trim()] = parseValue(line.slice(idx + 1));
  }
  return { data, body: match[2].trim() };
};

export const readingTime = body => {
  const words = body.replace(/```[\s\S]*?```/g, m => m.replace(/[^\s]+/g, 'w')).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

export const toArticle = (raw, slug) => {
  const { data, body } = parseFrontmatter(raw);
  const category = categoryBySlug[data.category];
  if (!category) throw new Error(`Article "${slug}" has unknown category "${data.category}"`);
  const published = data.status === 'published' && body.length > 0;
  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    category,
    tags: Array.isArray(data.tags) ? data.tags : [],
    date: data.date || null,
    featured: data.featured === true,
    published,
    readingTime: published ? readingTime(body) : null,
    html: published ? marked.parse(body) : '',
  };
};

// Published newest first; planned articles after, in category order (Software Engineering first).
const categoryRank = c => categories.indexOf(c);
export const sortArticles = list => [...list].sort((a, b) =>
  (b.published - a.published)
  || (b.date || '').localeCompare(a.date || '')
  || (b.featured - a.featured)
  || (categoryRank(a.category) - categoryRank(b.category))
  || a.title.localeCompare(b.title));

export const formatDate = iso => iso
  ? new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
  : '';
