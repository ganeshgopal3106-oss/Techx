import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventInfo } from './components/EventInfo';
import { AboutSection } from './components/AboutSection';
import { TechTrainSection } from './components/TechTrainSection';
import { TracksSection } from './components/TracksSection';
import { Timeline } from './components/Timeline';
import { MainEventSection } from './components/MainEventSection';
import { UniqueSection } from './components/UniqueSection';
import { GallerySection } from './components/GallerySection';
import { PeopleSection } from './components/PeopleSection';
import { PartnerGrid } from './components/PartnerGrid';
import { FAQAccordion } from './components/FAQAccordion';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { RegisterPage } from './components/RegisterPage';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname + window.location.search);

  function navigateTo(path: string) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('navigate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleBackToHome = () => {
    navigateTo('/');
  };

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('navigate', handleLocationChange);

    // Global Link Interceptor to route track register clicks smoothly
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('/register')) {
          e.preventDefault();
          navigateTo(href);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('navigate', handleLocationChange);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const isRegisterPage = currentPath.startsWith('/register') || window.location.pathname.startsWith('/register');
  const searchParams = new URLSearchParams(window.location.search);
  const trackIdParam = searchParams.get('track') || undefined;

  if (isRegisterPage) {
    return (
      <div className="app-wrapper">
        <RegisterPage onBack={handleBackToHome} initialTrackId={trackIdParam} />
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      {/* Floating Navigation Capsule */}
      <Navbar />

      <main>
        {/* 01 / HERO with Live Countdown */}
        <Hero />

        {/* METADATA STRIP */}
        <EventInfo />

        {/* 02 / ABOUT TECHX */}
        <AboutSection />

        {/* 03 / DUAL PILLARS: TECH & TRAIN */}
        <TechTrainSection />

        {/* 04 / TRACKS SHOWCASE (Alternating Layout) */}
        <TracksSection />

        {/* 05 / EVENT JOURNEY (Pre-Events Circuit) */}
        <Timeline />

        {/* 06 / MAIN EVENT SHOWCASE (26-27 September & Parallel Branch) */}
        <MainEventSection />

        {/* 07 / COMMUNITY & IMPACT */}
        <UniqueSection />

        {/* 08 / EVENT MOMENTS GALLERY */}
        <GallerySection />

        {/* DISTINGUISHED MENTORS & GUESTS */}
        <PeopleSection />

        {/* COLLABORATING PARTNERS */}
        <PartnerGrid />

        {/* 09 / FREQUENTLY ASKED QUESTIONS */}
        <FAQAccordion allowMultipleOpen={false} />

        {/* 10 / CONTACT & CAMPUS VENUE */}
        <ContactSection />
      </main>

      {/* 11 / MINIMAL EDITORIAL FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
