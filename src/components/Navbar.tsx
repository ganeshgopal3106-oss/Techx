import React, { useState, useEffect } from 'react';
import { SpecularButton } from './SpecularButton';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['about', 'why-attend', 'tracks', 'schedule', 'venue'];
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
    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#hero');
      setActiveSection('hero');
      return;
    }
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
              className="navbar-logo-img"
            />
          </a>
        </div>

        {/* Center Column: Primary Navigation Links (Desktop) */}
        <nav className="navbar-col-center navbar-desktop-links" aria-label="Main Navigation">
          <a 
            href="#hero" 
            className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'hero')}
          >
            Home
          </a>
          <a 
            href="#about" 
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'about')}
          >
            About
          </a>
          <a 
            href="#why-attend" 
            className={`nav-link ${activeSection === 'why-attend' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'why-attend')}
          >
            Features
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
            href="#venue" 
            className={`nav-link ${activeSection === 'venue' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'venue')}
          >
            Venue
          </a>
        </nav>

        {/* Right Column: CTA & Mobile Menu Toggle */}
        <div className="navbar-col-right">
          <SpecularButton 
            href="/register" 
            size="sm" 
            radius={18}
            className="nav-register-btn"
            aria-label="Register Pass"
          >
            <span>Register</span>
            <span className="arrow" style={{ fontSize: '0.85rem' }}>→</span>
          </SpecularButton>

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
              href="#hero" 
              className={`mobile-nav-link ${activeSection === 'hero' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'hero')}
            >
              Home
            </a>
            <a 
              href="#about" 
              className={`mobile-nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About
            </a>
            <a 
              href="#why-attend" 
              className={`mobile-nav-link ${activeSection === 'why-attend' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'why-attend')}
            >
              Features
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
              href="#venue" 
              className={`mobile-nav-link ${activeSection === 'venue' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'venue')}
            >
              Venue
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
