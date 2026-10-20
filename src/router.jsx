import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Minimal History-API router: clean URLs (/insights/my-article) without a router dependency.
const RouterContext = createContext({ path: '/', navigate: () => {} });

const normalise = path => (path.length > 1 ? path.replace(/\/+$/, '') : path);

const scrollToHash = hash => {
  if (!hash) { window.scrollTo({ top: 0 }); return; }
  // wait a frame so the new page has rendered before looking for the section
  requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }));
};

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => normalise(window.location.pathname));

  useEffect(() => {
    const onPop = () => setPath(normalise(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback(to => {
    const url = new URL(to, window.location.origin);
    const next = normalise(url.pathname);
    if (next === path && url.hash) {
      history.replaceState(null, '', url.pathname + url.hash);
    } else if (next !== path || url.search !== window.location.search) {
      history.pushState(null, '', url.pathname + url.search + url.hash);
      setPath(next);
    }
    scrollToHash(url.hash);
  }, [path]);

  // Arriving on /#contact from another site: scroll once the page exists.
  useEffect(() => { if (window.location.hash) scrollToHash(window.location.hash); }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

// <a> that navigates client-side but stays a real link (middle-click, copy link, crawlers).
export function Link({ to, onClick, children, ...props }) {
  const { navigate } = useRouter();
  const handleClick = e => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={to} onClick={handleClick} {...props}>{children}</a>;
}

// Updates the tab title and meta tags as the visitor moves between pages.
// (Crawlers and link previews get the prerendered HTML from scripts/prerender.mjs.)
export function usePageMeta({ title, description }) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', new URL(window.location.pathname, canonical.href).href);
  }, [title, description]);
}
