import React from 'react';
import { eventData } from '../data/event';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'transparent', padding: 'var(--space-xxl) 0 var(--space-xl)' }}>
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
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Official Website
            </a>
            <a href="https://www.instagram.com/ieeesctsb/" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Instagram (@ieeesctsb)
            </a>
            <a href="https://in.linkedin.com/company/ieeesctsb" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn Chapter
            </a>
            <a href="https://whatsapp.com/channel/0029Vakj3LDKLaHsJxbxMG0K" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              WhatsApp Channel
            </a>
            <a href="mailto:mailtoieeesctsb@gmail.com" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              mailtoieeesctsb@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', marginTop: 'var(--space-xl)', paddingTop: 'var(--space-md)', flexWrap: 'wrap', gap: '12px' }}>
        <div className="footer-copyright" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          © {eventData.dates.year} IEEE CS SCT SBC • SCT COLLEGE OF ENGINEERING. ALL RIGHTS RESERVED.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="blueprint-tag">POWERING MINDS • ONE SPARK AT A TIME</span>
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
