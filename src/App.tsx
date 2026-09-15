import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import Grainient from './components/Grainient';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { WhyAttendSection } from './components/WhyAttendSection';
import { TracksSection } from './components/TracksSection';
import { MainEventSection } from './components/MainEventSection';
import { VenueSection } from './components/VenueSection';
import { Footer } from './components/Footer';
import { RegisterPage } from './components/RegisterPage';
import { PageLoader } from './components/PageLoader';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname + window.location.search);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="app-wrapper" style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'transparent' }}>
      {/* Global Grainient WebGL Background Layer */}
      <div
        className="grainient-background"
        style={{
          width: '100%',
          height: '100dvh',
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Grainient
          color1="#7c6225"
          color2="#F5A900"
          color3="#6F4700"
          timeSpeed={1.15}
          colorBalance={-0.29}
          warpStrength={1.45}
          warpFrequency={5}
          warpSpeed={2.4}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* Short Non-Blocking Page Entrance Loader */}
      <PageLoader isLoading={isLoading} />

      {/* Floating Navigation Capsule */}
      <Navbar />

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* 01 / HOME / HERO */}
        <Hero />

        {/* 02 / ABOUT TECHX */}
        <AboutSection />

        {/* 03 / WHY ATTEND TECHX (NEW) */}
        <WhyAttendSection />

        {/* 04 / TRACKS & COMPETITIONS */}
        <TracksSection />

        {/* 05 / EVENT SCHEDULE */}
        <MainEventSection />

        {/* 06 / VENUE (NEW) */}
        <VenueSection />
      </main>

      {/* 07 / MINIMAL EDITORIAL FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
