// Runs after `vite build`. For every Insights URL it writes dist/<path>/index.html with that
// page's own title, description, canonical URL and Open Graph tags, so search engines and
// link previews (LinkedIn, X, WhatsApp, Upwork) see the right content without running JS.
// Also writes sitemap.xml, robots.txt and a 404.html.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { toArticle, sortArticles } from '../src/insights/parse.js';
import { categories } from '../src/insights/categories.js';
import { SITE_NAME, INSIGHTS_TAGLINE, PERSON_SCHEMA } from '../src/site.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const built = readFileSync(join(dist, 'index.html'), 'utf8');

// The site URL was already substituted into the canonical tag by Vite (VITE_SITE_URL).
const canonical = built.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
const base = /^https?:\/\//.test(canonical) ? canonical.replace(/\/$/, '') : '';
if (!base) console.warn('[prerender] VITE_SITE_URL is not set: using relative URLs and skipping sitemap.xml');

const escape = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const jsonLd = data => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

// Person structured data comes from src/site.js so the page content and schema never drift apart.
const person = { ...PERSON_SCHEMA, url: `${base}/`, image: `${base}/profile.jpeg` };
const template = built.replace(
  /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
  jsonLd({ '@context': 'https://schema.org', ...person }),
);
writeFileSync(join(dist, 'index.html'), template);
const author = { '@type': 'Person', name: person.name, url: person.url, jobTitle: person.jobTitle };

const setAttr = (html, selector, value) =>
  html.replace(new RegExp(`(<meta ${selector} content=")[^"]*(")`), `$1${escape(value)}$2`);

const render = ({ path, title, description, type = 'website', extraHead = '' }) => {
  const url = `${base}${path}`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${escape(url)}$2`);
  html = setAttr(html, 'name="description"', description);
  html = setAttr(html, 'property="og:url"', url);
  html = setAttr(html, 'property="og:type"', type);
  html = setAttr(html, 'property="og:title"', title);
  html = setAttr(html, 'property="og:description"', description);
  html = setAttr(html, 'name="twitter:title"', title);
  html = setAttr(html, 'name="twitter:description"', description);
  return extraHead ? html.replace('</head>', `${extraHead}\n  </head>`) : html;
};

const write = (path, html) => {
  const dir = join(dist, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
};

// ── Load articles ──
const contentDir = join(root, 'content', 'insights');
const articles = sortArticles(
  readdirSync(contentDir)
    .filter(f => f.endsWith('.md'))
    .map(f => toArticle(readFileSync(join(contentDir, f), 'utf8'), f.replace(/\.md$/, ''))),
);

// ── /insights ──
write('/insights', render({
  path: '/insights',
  title: `Insights | ${SITE_NAME}`,
  description: INSIGHTS_TAGLINE,
  extraHead: `    ${jsonLd({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `Insights by ${SITE_NAME}`,
    description: INSIGHTS_TAGLINE,
    url: `${base}/insights`,
    author,
    about: categories.map(c => ({ '@type': 'Thing', name: c.name })),
    blogPost: articles.filter(a => a.published).map(a => ({
      '@type': 'BlogPosting', headline: a.title, url: `${base}/insights/${a.slug}`, datePublished: a.date,
    })),
  })}`,
}));

// ── /insights/category/:slug ──
for (const c of categories) {
  write(`/insights/category/${c.slug}`, render({
    path: `/insights/category/${c.slug}`,
    title: `${c.name} — Insights | ${SITE_NAME}`,
    description: c.description,
    extraHead: `    ${jsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${c.name} — Insights`,
      description: c.description,
      url: `${base}/insights/category/${c.slug}`,
      author,
      isPartOf: { '@type': 'Blog', url: `${base}/insights` },
    })}`,
  }));
}

// ── /insights/:slug ──
for (const a of articles) {
  const path = `/insights/${a.slug}`;
  const meta = [];
  if (a.published) {
    meta.push(
      `<meta property="article:published_time" content="${escape(a.date)}" />`,
      `<meta property="article:section" content="${escape(a.category.name)}" />`,
      ...a.tags.map(t => `<meta property="article:tag" content="${escape(t)}" />`),
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: a.title,
        description: a.excerpt,
        datePublished: a.date,
        articleSection: a.category.name,
        keywords: a.tags.join(', '),
        url: `${base}${path}`,
        image: `${base}/og-image.png`,
        author,
      }),
    );
  } else {
    meta.push('<meta name="robots" content="noindex" />'); // planned articles have no body yet
  }
  write(path, render({
    path,
    title: `${a.title} | ${SITE_NAME}`,
    description: a.excerpt,
    type: a.published ? 'article' : 'website',
    extraHead: meta.map(m => `    ${m}`).join('\n'),
  }));
}

// ── 404.html (served by Vercel with a real 404 status; the app shows its Not Found page) ──
writeFileSync(join(dist, '404.html'), render({
  path: '/404',
  title: `Page not found | ${SITE_NAME}`,
  description: 'This page does not exist.',
  extraHead: '    <meta name="robots" content="noindex" />',
}));

// ── sitemap.xml + robots.txt ──
if (base) {
  const urls = [
    { loc: '/', priority: '1.0' },
    { loc: '/insights', priority: '0.8' },
    ...categories.map(c => ({ loc: `/insights/category/${c.slug}`, priority: '0.6' })),
    ...articles.filter(a => a.published).map(a => ({ loc: `/insights/${a.slug}`, lastmod: a.date, priority: '0.7' })),
  ];
  writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${base}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`);
  writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
}

const published = articles.filter(a => a.published).length;
console.log(`[prerender] ${1 + categories.length + articles.length} pages + 404 (${published} published articles, ${articles.length - published} planned)`);
