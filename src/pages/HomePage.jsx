import Hero from '../components/Hero';
import Trust from '../components/Trust';
import Services from '../components/Services';
import About from '../components/About';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import Leadership from '../components/Leadership';
import LatestInsights from '../components/insights/LatestInsights';
import Testimonials from '../components/Testimonials';
import Engagement from '../components/Engagement';
import Contact from '../components/Contact';
import { usePageMeta } from '../router.jsx';
import { SITE_TITLE, SITE_DESCRIPTION } from '../site.js';

export default function HomePage() {
  usePageMeta({ title: SITE_TITLE, description: SITE_DESCRIPTION });

  return (
    <main>
      <Hero />
      <Trust />
      <Services />
      <About />
      <Projects />
      <Leadership />
      <TechStack />
      <LatestInsights />
      <Testimonials />
      <Engagement />
      <Contact />
    </main>
  );
}
