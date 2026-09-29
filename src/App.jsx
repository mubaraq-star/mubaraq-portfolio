import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Trust from './components/Trust';
import Services from './components/Services';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Leadership from './components/Leadership';
import Testimonials from './components/Testimonials';
import Engagement from './components/Engagement';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Services />
        <About />
        <Projects />
        <Leadership />
        <TechStack />
        <Testimonials />
        <Engagement />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
