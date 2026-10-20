import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import InsightsPage from './pages/InsightsPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';
import { RouterProvider, useRouter } from './router.jsx';

// /insights, /insights/category/:category and /insights/:slug.
// scripts/prerender.mjs writes a static HTML file for each of these at build time.
function Routes() {
  const { path } = useRouter();
  if (path === '/') return <HomePage />;
  if (path === '/insights') return <InsightsPage key={path} />;

  const category = path.match(/^\/insights\/category\/([^/]+)$/);
  if (category) return <InsightsPage key={path} categorySlug={category[1]} />;

  const article = path.match(/^\/insights\/([^/]+)$/);
  if (article) return <ArticlePage key={path} slug={article[1]} />;

  return <NotFoundPage />;
}

export default function App() {
  return (
    <RouterProvider>
      <Navbar />
      <Routes />
      <Footer />
    </RouterProvider>
  );
}
