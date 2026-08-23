import React from 'react';
import { eventData } from '../data/event';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            TECHX<span className="logo-dot">.</span>
          </div>
          <p className="footer-tagline">REIGNITE {eventData.dates.year}</p>
          <p className="footer-description">
            Powering Minds, One spark at a time. The premier flagship engineering sprint organized by the {eventData.organizedByFull} at Sree Chitra Thirunal College of Engineering.
          </p>
          
          <div className="footer-meta-id">
            <span>#TX-REIGNITE-2026</span>
          </div>
        </div>

        <div className="footer-links-grid">
          {/* Column 1: Sprints */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Sprints</h4>
            <ul className="footer-links-list">
              <li><a href="#about" className="footer-link">About</a></li>
              <li><a href="#tracks" className="footer-link">Tracks</a></li>
              <li><a href="#schedule" className="footer-link">Schedule</a></li>
              <li><a href="#faq" className="footer-link">FAQ</a></li>
              <li><a href="/register" className="footer-link">Register</a></li>
            </ul>
          </div>

          {/* Column 2: Event Tracks */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Event Tracks</h4>
            <ul className="footer-links-list">
              <li><a href="#tracks" className="footer-link">IoT Building</a></li>
              <li><a href="#tracks" className="footer-link">LLM Building</a></li>
              <li><a href="#tracks" className="footer-link">ADAS & Genetech</a></li>
              <li><a href="#tracks" className="footer-link">Placement & Mentor</a></li>
            </ul>
          </div>

          {/* Column 3: Connect & Support */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Connect</h4>
            <ul className="footer-links-list">
              <li><a href="https://ieeesctsb.org/" target="_blank" rel="noopener noreferrer" className="footer-link">Website</a></li>
              <li><a href="https://www.instagram.com/ieeesctsb/" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a></li>
              <li><a href="https://in.linkedin.com/company/ieeesctsb" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a></li>
              <li><a href="https://whatsapp.com/channel/0029Vakj3LDKLaHsJxbxMG0K" target="_blank" rel="noopener noreferrer" className="footer-link">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        {/* Scroll To Top button */}
        <div className="footer-top-btn-wrapper">
          <button 
            className="footer-top-btn" 
            onClick={handleScrollToTop} 
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            ↑
          </button>
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="footer-copyright">
          © {eventData.dates.year} IEEE TECHX REIGNITE. ALL RIGHTS RESERVED.
        </div>
        <div className="footer-legal">
          <span className="footer-legal-link">Privacy Policy</span>
          <span className="footer-legal-link">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};
