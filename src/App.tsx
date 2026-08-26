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
import { RegistrationCTA } from './components/RegistrationCTA';
import { Footer } from './components/Footer';
import { RegisterPage } from './components/RegisterPage';
import { EnergyFlowBackground } from './components/EnergyFlowBackground';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

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
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('navigate', handleLocationChange);

    // Global Link Interceptor to route all register clicks to /register
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href) {
          const isRegisterAction = 
            href === '/register' || 
            href === '#join' || 
            anchor.classList.contains('nav-cta') || 
            anchor.classList.contains('mobile-cta') ||
            anchor.textContent?.toLowerCase().includes('register') || 
            anchor.textContent?.toLowerCase().includes('claim your spot') ||
            anchor.textContent?.toLowerCase().includes('join the sprint') ||
            anchor.textContent?.toLowerCase().includes('register pass');

          if (isRegisterAction) {
            e.preventDefault();
            navigateTo('/register');
          }
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

  if (currentPath === '/register') {
    return (
      <div className="app-wrapper">
        <EnergyFlowBackground />
        <RegisterPage onBack={handleBackToHome} />
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <EnergyFlowBackground />
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

        {/* 8. Speakers / Mentors (toggleable inside config) */}
        <PeopleSection />

        {/* 9. Partners / Collaborators */}
        <PartnerGrid />

        {/* 10. FAQ Section */}
        <FAQAccordion allowMultipleOpen={false} />

        {/* 11. Registration CTA */}
        <RegistrationCTA />
      </main>

      {/* 12. Footer */}
      <Footer />
    </div>
  );
}

export default App;
