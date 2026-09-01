import React from 'react';
import { eventData } from '../data/event';
import { ScrollReveal } from './ScrollReveal';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero-section section-padding blueprint-circuit-bg" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Subtle blueprint decorative markers */}
      <span className="blueprint-marker-plus" style={{ top: '24px', left: '32px' }}>+</span>
      <span className="blueprint-marker-plus" style={{ top: '24px', right: '32px' }}>+</span>
      <span className="blueprint-marker-plus" style={{ bottom: '24px', left: '32px' }}>+</span>
      <span className="blueprint-marker-plus" style={{ bottom: '24px', right: '32px' }}>+</span>

      <div className="container hero-container" style={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal className="hero-content">
          <div className="hero-logo-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="blueprint-tag">[ SYS // 2026.09 ]</span>
            <span className="hero-logo-text" style={{ letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: 700, fontSize: '0.85rem' }}>
              TECHX REIGNITE
            </span>
          </div>

          <h1 className="hero-headline" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', lineHeight: 1.05, textTransform: 'uppercase', margin: '16px 0' }}>
            Powering Minds,<br />One Spark At A Time.
          </h1>
          
          <p className="hero-description" style={{ fontSize: '1.1rem', maxWidth: '540px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
            A global technical upskilling initiative bridging academic learning and industry readiness.
          </p>
          
          <div className="hero-meta" style={{ marginBottom: '32px' }}>
            <span className="hero-meta-date" style={{ color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.05em' }}>
              13 — 27 SEPTEMBER 2026
            </span>
            <span className="hero-meta-divider">|</span>
            <span className="hero-meta-location">{eventData.locationShort}</span>
          </div>

          <div className="hero-actions">
            <a 
              href="#tracks" 
              className="btn btn-primary hero-primary-cta"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('tracks');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', '#tracks');
                }
              }}
            >
              Explore Tracks <span className="arrow">→</span>
            </a>
            <a 
              href="#about" 
              className="btn btn-secondary hero-secondary-cta"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('about');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', '#about');
                }
              }}
            >
              Explore TechX <span className="arrow">↓</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Editorial Visual Technical Blueprint Schematic Area */}
        <ScrollReveal className="hero-visual-area" delayMs={200}>
          <div className="image-placeholder blueprint-grid-bg" style={{ minHeight: '360px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', position: 'relative' }}>
            {/* SVG Circuit Schematic Graphic */}
            <svg width="220" height="220" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.85, marginBottom: '16px' }}>
              <rect x="20" y="20" width="160" height="160" stroke="#CF8326" strokeWidth="1" strokeDasharray="4 4"/>
              <circle cx="100" cy="100" r="48" stroke="#111111" strokeWidth="1"/>
              <circle cx="100" cy="100" r="28" stroke="#CF8326" strokeWidth="1.5"/>
              <circle cx="100" cy="100" r="6" fill="#CF8326"/>
              
              {/* Circuit Bus lines */}
              <path d="M20 100H52M148 100H180" stroke="#CF8326" strokeWidth="1.5"/>
              <path d="M100 20V52M100 148V180" stroke="#CF8326" strokeWidth="1.5"/>
              
              {/* Trace routes */}
              <path d="M52 60H76V76" stroke="#111111" strokeWidth="1"/>
              <circle cx="52" cy="60" r="3" fill="#111111"/>
              <circle cx="76" cy="76" r="3" fill="#CF8326"/>

              <path d="M148 140H124V124" stroke="#111111" strokeWidth="1"/>
              <circle cx="148" cy="140" r="3" fill="#111111"/>
              <circle cx="124" cy="124" r="3" fill="#CF8326"/>

              <text x="30" y="38" fill="#CF8326" fontSize="8" fontFamily="JetBrains Mono" letterSpacing="0.1em">[SCHEMATIC // 01]</text>
              <text x="110" y="172" fill="#7D6A5B" fontSize="7" fontFamily="JetBrains Mono">COORDINATES 8.5241°N 76.9366°E</text>
            </svg>

            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.1em', color: 'var(--text-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
              TECHX REIGNITE 2026
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              IEEE CS SCT SBC • SCTCE TRIVANDRUM
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
