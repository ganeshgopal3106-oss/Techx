import React, { useState, useEffect } from 'react';
import { eventData } from '../data/event';
import { ScrollReveal } from './ScrollReveal';

export const Hero: React.FC = () => {
  // Target date: September 13, 2026 09:00:00 AM IST
  const targetDate = new Date('2026-09-13T09:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section id="hero" className="hero-section section-padding blueprint-circuit-bg" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
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

          <h1 className="hero-headline" style={{ fontSize: 'clamp(2.8rem, 6vw, 4.6rem)', lineHeight: 1.02, textTransform: 'uppercase', margin: '18px 0', letterSpacing: '-0.02em' }}>
            Powering Minds,<br />One Spark At A Time.
          </h1>
          
          <div className="hero-meta" style={{ margin: '16px 0 20px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
              <span className="hero-meta-date" style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.05em' }}>
                13–27 September 2026
              </span>
              <span className="hero-meta-divider">|</span>
              <span className="hero-meta-location" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                {eventData.location}
              </span>
            </div>
          </div>

          <p className="hero-description" style={{ fontSize: '1.1rem', maxWidth: '580px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
            A global technical upskilling initiative hosted by IEEE CS SCT SBC bridging academic fundamentals and battle-tested industry readiness.
          </p>

          {/* Live Countdown Timer */}
          <div className="hero-countdown-container" aria-label="Event Countdown">
            <div className="countdown-box">
              <span className="countdown-num">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="countdown-label">DAYS</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-num">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="countdown-label">HOURS</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="countdown-label">MINUTES</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="countdown-label">SECONDS</span>
            </div>
          </div>

          <div className="hero-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a 
              href="#tracks" 
              className="btn btn-primary hero-primary-cta"
              style={{ padding: '12px 30px', fontSize: '0.85rem' }}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('tracks');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', '#tracks');
                }
              }}
            >
              Explore Tracks <span className="arrow">↓</span>
            </a>
            <a 
              href="#schedule" 
              className="btn btn-secondary hero-secondary-cta"
              style={{ padding: '12px 28px', fontSize: '0.85rem' }}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('schedule');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', '#schedule');
                }
              }}
            >
              View Schedule <span className="arrow">↓</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Editorial Visual Technical Blueprint Schematic Area */}
        <ScrollReveal className="hero-visual-area" delayMs={200}>
          <div className="image-placeholder blueprint-grid-bg" style={{ minHeight: '400px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', position: 'relative' }}>
            {/* SVG Circuit Schematic Graphic */}
            <svg width="240" height="240" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.9, marginBottom: '16px' }}>
              <rect x="20" y="20" width="160" height="160" stroke="#CF8326" strokeWidth="1" strokeDasharray="4 4"/>
              <circle cx="100" cy="100" r="54" stroke="#111111" strokeWidth="1"/>
              <circle cx="100" cy="100" r="32" stroke="#CF8326" strokeWidth="1.5"/>
              <circle cx="100" cy="100" r="6" fill="#CF8326"/>
              
              {/* Circuit Bus lines */}
              <path d="M20 100H46M154 100H180" stroke="#CF8326" strokeWidth="1.5"/>
              <path d="M100 20V46M100 154V180" stroke="#CF8326" strokeWidth="1.5"/>
              
              {/* Trace routes */}
              <path d="M46 54H74V74" stroke="#111111" strokeWidth="1"/>
              <circle cx="46" cy="54" r="3" fill="#111111"/>
              <circle cx="74" cy="74" r="3" fill="#CF8326"/>

              <path d="M154 146H126V126" stroke="#111111" strokeWidth="1"/>
              <circle cx="154" cy="146" r="3" fill="#111111"/>
              <circle cx="126" cy="126" r="3" fill="#CF8326"/>

              <text x="28" y="36" fill="#CF8326" fontSize="7.5" fontFamily="JetBrains Mono" letterSpacing="0.1em">[SCHEMATIC // 01]</text>
              <text x="96" y="172" fill="#7D6A5B" fontSize="6.5" fontFamily="JetBrains Mono">COORD: 8.5241°N 76.9366°E</text>
            </svg>

            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.12em', color: 'var(--text-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
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
