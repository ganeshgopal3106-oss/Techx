import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section highlights
      const sections = ['about', 'tracks', 'schedule', 'faq'];
      let currentSection = 'hero';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section is close to top of viewport
          if (rect.top <= 120 && rect.bottom >= 120) {
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

  return (
    <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-capsule">
        {/* Left: Brand Logo */}
        <a href="#hero" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
          <img src="/logo.png" alt="IEEE CS SYP TECHX" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
        </a>

        {/* Center: Navigation Links */}
        <nav className="navbar-links">
          <a 
            href="#about" 
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
          >
            About
          </a>
          <a 
            href="#tracks" 
            className={`nav-link ${activeSection === 'tracks' ? 'active' : ''}`}
          >
            Tracks
          </a>
          <a 
            href="#schedule" 
            className={`nav-link ${activeSection === 'schedule' ? 'active' : ''}`}
          >
            Schedule
          </a>
          <a 
            href="#faq" 
            className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`}
          >
            FAQ
          </a>
        </nav>

        {/* Right: Register Button */}
        <a href="/register" className="btn btn-primary nav-register-btn">
          Register →
        </a>
      </div>
    </header>
  );
};
