import React, { useState, useEffect, useRef } from 'react';
import { eventData } from '../data/event';

export const Hero: React.FC = () => {
  // Target date: September 13, 2026 09:00:00 AM IST
  const targetDate = new Date('2026-09-13T09:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Mouse parallax state for schematic graphic
  const visualRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState('');

  // Magnetic CTA state
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [btnTransform, setBtnTransform] = useState('');

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && (window.matchMedia('(hover: none)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      return;
    }
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Subtle physical displacement (max 4-5px)
    const moveX = (x / rect.width) * 6;
    const moveY = (y / rect.height) * 6;
    
    setTransformStyle(`translate3d(${moveX}px, ${moveY}px, 0)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('translate3d(0, 0, 0)');
  };

  // Subtle magnetic attraction for primary CTA
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined' && (window.matchMedia('(hover: none)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      return;
    }
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const moveX = Math.max(-5, Math.min(5, x * 0.22));
    const moveY = Math.max(-5, Math.min(5, y * 0.22));
    setBtnTransform(`translate3d(${moveX}px, ${moveY}px, 0)`);
  };

  const handleBtnMouseLeave = () => {
    setBtnTransform('translate3d(0, 0, 0)');
  };

  return (
    <section 
      id="hero" 
      className="hero-section section-padding blueprint-circuit-bg" 
      style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle blueprint decorative markers */}
      <span className="blueprint-marker-plus" style={{ top: '24px', left: '32px' }}>+</span>
      <span className="blueprint-marker-plus" style={{ top: '24px', right: '32px' }}>+</span>
      <span className="blueprint-marker-plus" style={{ bottom: '24px', left: '32px' }}>+</span>
      <span className="blueprint-marker-plus" style={{ bottom: '24px', right: '32px' }}>+</span>

      <div className="container hero-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          {/* 1. Tagline / System identifier */}
          <div className="hero-logo-wrapper hero-anim-tag" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="blueprint-tag">[ SYS // 2026.09 ]</span>
            <span className="hero-logo-text" style={{ letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: 700, fontSize: '0.85rem' }}>
              TECHX REIGNITE
            </span>
          </div>

          {/* 2. Masked Headline Reveal */}
          <div style={{ overflow: 'hidden' }}>
            <h1 className="hero-headline hero-anim-headline" style={{ fontSize: 'clamp(2.8rem, 6vw, 4.6rem)', lineHeight: 1.02, textTransform: 'uppercase', margin: '18px 0', letterSpacing: '-0.02em' }}>
              Powering Minds,<br />One Spark At A Time.
            </h1>
          </div>
          
          {/* 3. Event Meta Info */}
          <div className="hero-meta hero-anim-meta" style={{ margin: '16px 0 20px' }}>
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

          {/* 4. Description */}
          <p className="hero-description hero-anim-desc" style={{ fontSize: '1.1rem', maxWidth: '580px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
            A global technical upskilling initiative hosted by IEEE CS SCT SBC bridging academic fundamentals and battle-tested industry readiness.
          </p>

          {/* 5. Live Staggered Countdown Timer */}
          <div className="hero-countdown-container hero-anim-countdown" aria-label="Event Countdown">
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

          {/* 6. Action CTAs */}
          <div className="hero-actions hero-anim-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a 
              ref={btnRef}
              href="#tracks" 
              className="btn btn-primary hero-primary-cta"
              style={{ 
                padding: '12px 30px', 
                fontSize: '0.85rem',
                transform: btnTransform,
                transition: btnTransform === 'translate3d(0, 0, 0)' ? 'transform 350ms var(--ease-out-expo)' : 'transform 100ms ease-out'
              }}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
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
        </div>

        {/* 7. Editorial Visual Technical Schematic Area with Micro-Parallax */}
        <div className="hero-visual-area hero-anim-visual" ref={visualRef}>
          <div 
            className="image-placeholder blueprint-grid-bg hero-schematic-interactive" 
            style={{ 
              minHeight: '400px', 
              border: '1px solid var(--border-color)', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '32px', 
              position: 'relative',
              transform: transformStyle
            }}
          >
            {/* Motion.ed-Inspired Kinetic Motion Graphic SVG */}
            <svg width="248" height="248" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-kinetic-svg" style={{ marginBottom: '16px' }}>
              {/* Static Grid & Target Coordinates */}
              <rect x="20" y="20" width="160" height="160" stroke="#CF8326" strokeWidth="1" strokeDasharray="4 4" opacity="0.6"/>
              
              {/* Corner target brackets */}
              <path d="M20 32V20H32" stroke="#CF8326" strokeWidth="1.5" />
              <path d="M180 32V20H168" stroke="#CF8326" strokeWidth="1.5" />
              <path d="M20 168V180H32" stroke="#CF8326" strokeWidth="1.5" />
              <path d="M180 168V180H168" stroke="#CF8326" strokeWidth="1.5" />

              {/* Outer Clockwise Rotating Orbital Ring */}
              <g className="svg-orbit-outer">
                <circle cx="100" cy="100" r="64" stroke="#111111" strokeWidth="1" strokeDasharray="3 9" opacity="0.8"/>
                <circle cx="100" cy="36" r="3" fill="#CF8326" />
                <circle cx="100" cy="164" r="2.5" fill="#111111" />
              </g>

              {/* Inner Counter-Clockwise Rotating Compass Ring */}
              <g className="svg-orbit-inner">
                <circle cx="100" cy="100" r="44" stroke="#CF8326" strokeWidth="1.2" strokeDasharray="8 6"/>
                <line x1="100" y1="56" x2="100" y2="62" stroke="#CF8326" strokeWidth="1.5"/>
                <line x1="100" y1="138" x2="100" y2="144" stroke="#CF8326" strokeWidth="1.5"/>
                <line x1="56" y1="100" x2="62" y2="100" stroke="#CF8326" strokeWidth="1.5"/>
                <line x1="138" y1="100" x2="144" y2="100" stroke="#CF8326" strokeWidth="1.5"/>
              </g>

              {/* Rotating Radar Scanner Sweep Line */}
              <g className="svg-radar-sweep">
                <line x1="100" y1="100" x2="100" y2="38" stroke="url(#scannerGradient)" strokeWidth="1.5"/>
              </g>

              {/* Pulsing Core Waves */}
              <circle cx="100" cy="100" r="12" stroke="#CF8326" fill="none" className="svg-pulse-wave-1" />
              <circle cx="100" cy="100" r="12" stroke="#CF8326" fill="none" className="svg-pulse-wave-2" />

              {/* Glowing Center Core */}
              <circle cx="100" cy="100" r="6" fill="#CF8326"/>
              <circle cx="100" cy="100" r="2.5" fill="#FFFCF1"/>

              {/* Animated Circuit Data Lines */}
              <path d="M20 100H46M154 100H180" stroke="#CF8326" strokeWidth="1.5" className="svg-data-line"/>
              <path d="M100 20V46M100 154V180" stroke="#CF8326" strokeWidth="1.5" className="svg-data-line"/>
              
              {/* Circuit Traces */}
              <path d="M46 54H74V74" stroke="#111111" strokeWidth="1"/>
              <circle cx="46" cy="54" r="3" fill="#111111"/>
              <circle cx="74" cy="74" r="3" fill="#CF8326"/>

              <path d="M154 146H126V126" stroke="#111111" strokeWidth="1"/>
              <circle cx="154" cy="146" r="3" fill="#111111"/>
              <circle cx="126" cy="126" r="3" fill="#CF8326"/>

              {/* Technical Text / Coordinates */}
              <text x="28" y="36" fill="#CF8326" fontSize="7.5" fontFamily="JetBrains Mono" letterSpacing="0.1em">[SCHEMATIC // KINETIC 01]</text>
              <text x="96" y="172" fill="#7D6A5B" fontSize="6.5" fontFamily="JetBrains Mono">FREQ: 2.40GHz • 8.5241°N</text>

              <defs>
                <linearGradient id="scannerGradient" x1="100" y1="100" x2="100" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#CF8326" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#CF8326" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>

            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.12em', color: 'var(--text-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
              TECHX REIGNITE 2026
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              IEEE CS SCT SBC • SCTCE TRIVANDRUM
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
