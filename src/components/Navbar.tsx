import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['about', 'tracks', 'journey', 'schedule', 'gallery', 'faq', 'contact'];
      let currentSection = 'hero';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${targetId}`);
      setActiveSection(targetId);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', '#hero');
    setActiveSection('hero');
  };

  return (
    <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-capsule">
        {/* Left: Official Brand Logo */}
        <a 
          href="#hero" 
          className="navbar-logo" 
          style={{ display: 'flex', alignItems: 'center', height: '40px' }}
          onClick={handleLogoClick}
          aria-label="TechX Home"
        >
          <img src="/logo.png" alt="IEEE CS SYP TECHX" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
        </a>

        {/* Center: Primary Navigation Links */}
        <nav className="navbar-links">
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
      </div>
    </header>
  );
};
