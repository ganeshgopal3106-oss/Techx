import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('techx-theme') as 'light' | 'dark' | null;
      if (savedTheme) return savedTheme;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  // Sync data-theme attribute with state
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('techx-theme', newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll progress calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      const sections = ['about', 'tracks', 'journey', 'schedule', 'gallery', 'faq', 'contact'];
      let currentSection = 'hero';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${targetId}`);
      setActiveSection(targetId);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', '#hero');
    setActiveSection('hero');
  };

  return (
    <>
      {/* 21st.dev Top Scroll Progress Indicator */}
      <div className="scroll-progress-container" aria-hidden="true">
        <div 
          className="scroll-progress-bar" 
          style={{ width: `${scrollProgress}%` }} 
        />
      </div>

      <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-capsule">
          {/* Left Column: Official Brand Logo */}
          <div className="navbar-col-left">
            <a 
              href="#hero" 
              className="navbar-logo" 
              onClick={handleLogoClick}
              aria-label="TechX Home"
            >
              <img 
                src="/logo.png" 
                alt="IEEE CS SYP TECHX" 
                style={{ height: '32px', width: 'auto', objectFit: 'contain' }} 
              />
            </a>
          </div>

          {/* Center Column: Primary Navigation Links (Mathematically Centered) */}
          <nav className="navbar-col-center navbar-desktop-links" aria-label="Main Navigation">
            <a 
              href="#about" 
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About
            </a>
            <a 
              href="#tracks" 
              className={`nav-link ${activeSection === 'tracks' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'tracks')}
            >
              Tracks
            </a>
            <a 
              href="#schedule" 
              className={`nav-link ${activeSection === 'schedule' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'schedule')}
            >
              Schedule
            </a>
            <a 
              href="#gallery" 
              className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'gallery')}
            >
              Gallery
            </a>
            <a 
              href="#faq" 
              className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'faq')}
            >
              FAQ
            </a>
            <a 
              href="#contact" 
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Contact
            </a>
          </nav>

          {/* Right Column: Theme Toggle, CTA & Mobile Hamburger Toggle */}
          <div className="navbar-col-right">
            {/* 21st.dev Theme Toggle Button */}
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              type="button"
            >
              {theme === 'light' ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
              )}
            </button>

            <a href="/register" className="nav-register-btn" aria-label="Register Pass">
              <span>Register</span>
              <span className="arrow" style={{ fontSize: '0.85rem' }}>→</span>
            </a>

            <button 
              className={`nav-mobile-toggle ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="toggle-line line-1" />
              <span className="toggle-line line-2" />
              <span className="toggle-line line-3" />
            </button>
          </div>
        </div>

      {/* Mobile Menu Drawer Floating Below Capsule */}
      {isMobileMenuOpen && (
        <div className="navbar-mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <nav className="mobile-drawer-nav">
            <a 
              href="#about" 
              className={`mobile-nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About
            </a>
            <a 
              href="#tracks" 
              className={`mobile-nav-link ${activeSection === 'tracks' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'tracks')}
            >
              Tracks
            </a>
            <a 
              href="#schedule" 
              className={`mobile-nav-link ${activeSection === 'schedule' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'schedule')}
            >
              Schedule
            </a>
            <a 
              href="#gallery" 
              className={`mobile-nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'gallery')}
            >
              Gallery
            </a>
            <a 
              href="#faq" 
              className={`mobile-nav-link ${activeSection === 'faq' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'faq')}
            >
              FAQ
            </a>
            <a 
              href="#contact" 
              className={`mobile-nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Contact
            </a>
            <div className="mobile-drawer-cta">
              <a 
                href="/register" 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Claim Your Spot →
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
    </>
  );
};
