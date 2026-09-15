import React from 'react';

export const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#hero');
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <footer className="footer-container" style={{ position: 'relative', zIndex: 2 }}>
      <div className="container footer-main-grid">
        {/* LEFT — BRAND */}
        <div className="footer-area footer-brand-area">
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="footer-logo-link" aria-label="TECHX REIGNITE Home">
            <img src="/logo.png" alt="TECHX REIGNITE" className="footer-logo-img" />
          </a>
          <p className="footer-tagline">
            POWERING MINDS, ONE SPARK AT A TIME.
          </p>
        </div>

        {/* CENTER — CONTACT */}
        <div className="footer-area footer-contact-area">
          <h4 className="footer-area-heading">GET IN TOUCH</h4>
          <div className="footer-contact-list">
            <div className="footer-contact-item">
              <span className="footer-contact-label">EMAIL</span>
              <a href="mailto:mailtoieeesctsb@gmail.com" className="footer-contact-link">
                mailtoieeesctsb@gmail.com
              </a>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-label">WHATSAPP</span>
              <a href="https://whatsapp.com/channel/0029Vakj3LDKLaHsJxbxMG0K" target="_blank" rel="noopener noreferrer" className="footer-contact-link">
                Official WhatsApp Channel <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT — CONNECT */}
        <div className="footer-area footer-connect-area">
          <h4 className="footer-area-heading">CONNECT</h4>
          <div className="footer-social-links">
            <a href="https://www.instagram.com/ieeesctsb/" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="Instagram (@ieeesctsb)" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>
            <a href="https://in.linkedin.com/company/ieeesctsb" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="LinkedIn" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a href="https://whatsapp.com/channel/0029Vakj3LDKLaHsJxbxMG0K" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="WhatsApp Channel" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>WhatsApp</span>
            </a>
            <a href="mailto:mailtoieeesctsb@gmail.com" className="footer-social-link" title="Email" aria-label="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Navigation Row */}
      <div className="container footer-nav-container">
        <nav className="footer-nav-row" aria-label="Footer Navigation">
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="footer-nav-item">HOME</a>
          <span className="footer-nav-sep" aria-hidden="true">·</span>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="footer-nav-item">ABOUT</a>
          <span className="footer-nav-sep" aria-hidden="true">·</span>
          <a href="#why-attend" onClick={(e) => handleNavClick(e, 'why-attend')} className="footer-nav-item">FEATURES</a>
          <span className="footer-nav-sep" aria-hidden="true">·</span>
          <a href="#tracks" onClick={(e) => handleNavClick(e, 'tracks')} className="footer-nav-item">TRACKS</a>
          <span className="footer-nav-sep" aria-hidden="true">·</span>
          <a href="#schedule" onClick={(e) => handleNavClick(e, 'schedule')} className="footer-nav-item">SCHEDULE</a>
          <span className="footer-nav-sep" aria-hidden="true">·</span>
          <a href="#venue" onClick={(e) => handleNavClick(e, 'venue')} className="footer-nav-item">VENUE</a>
        </nav>
      </div>

      {/* Bottom Row */}
      <div className="container footer-bottom-container">
        <div className="footer-divider" />
        <div className="footer-copyright-text">
          © 2026 TECHX REIGNITE · IEEE CS SCT SBC
        </div>
      </div>
    </footer>
  );
};
