import React from 'react';
import { eventData } from '../data/event';
import { ScrollReveal } from './ScrollReveal';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero-section section-padding">
      <div className="container hero-container">
        <ScrollReveal className="hero-content">
          <div className="hero-logo-wrapper">
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
            <a href="/register" className="btn btn-primary hero-primary-cta">
              Claim Your Spot <span className="arrow">→</span>
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

        {/* Editorial Visual Artwork Placement Area */}
        <ScrollReveal className="hero-visual-area" delayMs={200}>
          <div className="image-placeholder" style={{ minHeight: '340px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', position: 'relative' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>
              ✦
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.1em', color: 'var(--text-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
              TECHX REIGNITE 2026
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              IEEE CS SCT SBC • SCTCE
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
