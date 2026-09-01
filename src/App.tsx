import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventInfo } from './components/EventInfo';
import { AboutSection } from './components/AboutSection';
import { UniqueSection } from './components/UniqueSection';
import { TracksSection } from './components/TracksSection';
import { Timeline } from './components/Timeline';
import { PeopleSection } from './components/PeopleSection';
import { PartnerGrid } from './components/PartnerGrid';
import { FAQAccordion } from './components/FAQAccordion';
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

    // Global Link Interceptor to route all register clicks smoothly
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
      {/* 1. Navbar */}
      <Navbar />

      <main>
        {/* 2. Hero */}
        <Hero />

        {/* 3. Event Info Strip */}
        <EventInfo />

        {/* 4. About Section */}
        <AboutSection />

        {/* 5. Unique Features Section */}
        <UniqueSection />

        {/* 6. Tracks Section */}
        <TracksSection />

        {/* 7. Event Timeline / Schedule */}
        <Timeline />

        {/* 8. Speakers / Mentors */}
        <PeopleSection />

        {/* 9. Partners / Collaborators */}
        <PartnerGrid />

        {/* 10. FAQ Section */}
        <FAQAccordion allowMultipleOpen={false} />
      </main>

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}

export default App;
