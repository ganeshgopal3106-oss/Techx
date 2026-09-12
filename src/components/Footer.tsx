import React from 'react';
import { eventData } from '../data/event';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', padding: 'var(--space-xxl) 0 var(--space-xl)' }}>
      <div className="container footer-content" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 'var(--space-xl)' }}>
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', height: '40px', marginBottom: '12px' }}>
            <img src="/logo.png" alt="IEEE CS SYP TECHX" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <span className="blueprint-tag">IEEE CS SCT SBC • FLAGSHIP SUMMIT</span>
          <p className="footer-description" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginTop: '8px' }}>
            Powering Minds, One spark at a time. The premier technical upskilling summit organized by the {eventData.organizedByFull} at Sree Chitra Thirunal College of Engineering.
          </p>
          
          <div style={{ marginTop: '16px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)' }}>
            #TECHX-REIGNITE-2026
          </div>
        </div>

        {/* Column 1: Navigation */}
        <div className="footer-links-col">
          <h4 className="footer-col-title" style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>Event Index</h4>
          <ul className="footer-links-list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><a href="#about" className="footer-link">About TechX</a></li>
            <li><a href="#tracks" className="footer-link">Tracks (Coming Soon)</a></li>
            <li><a href="#journey" className="footer-link">Pre-Events (13–19 Sep)</a></li>
            <li><a href="#schedule" className="footer-link">Main Summit (26–27 Sep)</a></li>
            <li><a href="#gallery" className="footer-link">Moments Gallery</a></li>
            <li><a href="#faq" className="footer-link">FAQs</a></li>
          </ul>
        </div>

        {/* Column 2: Event Tracks */}
        <div className="footer-links-col">
          <h4 className="footer-col-title" style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>Four Tracks</h4>
          <ul className="footer-links-list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><a href="#tracks" className="footer-link">Track 01: Hands-on Workshops</a></li>
            <li><a href="#tracks" className="footer-link">Track 02: Talk Sessions</a></li>
            <li><a href="#tracks" className="footer-link">Track 03: Soft Skills</a></li>
            <li><a href="#tracks" className="footer-link">Track 04: Nano-Mentoring</a></li>
          </ul>
        </div>

        {/* Column 3: Connect & Socials */}
        <div className="footer-links-col">
          <h4 className="footer-col-title" style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>Connect</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="https://ieeesctsb.org/" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🌐</span> Official Website
            </a>
            <a href="https://www.instagram.com/ieeesctsb/" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📸</span> Instagram (@ieeesctsb)
            </a>
            <a href="https://in.linkedin.com/company/ieeesctsb" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>💼</span> LinkedIn Chapter
            </a>
            <a href="https://whatsapp.com/channel/0029Vakj3LDKLaHsJxbxMG0K" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>💬</span> WhatsApp Channel
            </a>
            <a href="mailto:mailtoieeesctsb@gmail.com" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✉️</span> mailtoieeesctsb@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', marginTop: 'var(--space-xl)', paddingTop: 'var(--space-md)', flexWrap: 'wrap', gap: '12px' }}>
        <div className="footer-copyright" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          © {eventData.dates.year} IEEE CS SCT SBC • SCT COLLEGE OF ENGINEERING. ALL RIGHTS RESERVED.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="blueprint-tag">DHYUTHI 6.0 INSPIRATION • TECHX ARCHITECTURE</span>
          <button 
            className="btn btn-secondary" 
            onClick={handleScrollToTop} 
            title="Scroll to top"
            aria-label="Scroll to top"
            style={{ width: '36px', height: '36px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
