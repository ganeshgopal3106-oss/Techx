import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        <a href="#hero" className="navbar-logo" onClick={closeMenu}>
          TECHX<span className="logo-dot">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#tracks" className="nav-link">Tracks</a>
          <a href="#schedule" className="nav-link">Schedule</a>
          <a href="#faq" className="nav-link">FAQ</a>
          <a href="/register" className="btn btn-secondary nav-cta">Register</a>
        </nav>

        {/* Hamburger Button */}
        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <nav className="mobile-links">
          <a href="#about" className="mobile-nav-link" onClick={closeMenu}>About</a>
          <a href="#tracks" className="mobile-nav-link" onClick={closeMenu}>Tracks</a>
          <a href="#schedule" className="mobile-nav-link" onClick={closeMenu}>Schedule</a>
          <a href="#faq" className="mobile-nav-link" onClick={closeMenu}>FAQ</a>
          <a href="/register" className="btn btn-primary mobile-cta" onClick={closeMenu}>Register Now</a>
        </nav>
      </div>
    </header>
  );
};
