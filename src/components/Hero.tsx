import React, { useState, useEffect, useRef } from 'react';
import { eventData } from '../data/event';
import GradientWaves from './GradientWaves';

export const Hero: React.FC = () => {
  // Target date: September 13, 2026 09:00:00 AM IST
  const targetDate = new Date('2026-09-13T09:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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
    >
      {/* Background GradientWaves Ambient Canvas */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ 
          position: 'absolute', 
          inset: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 0 
        }}
      >
        <GradientWaves
          horizonColor="#FFFCF1"
          waveColor="#CF8326"
          crestColor="#CF8326"
          speed={0.28}
          amplitude={2}
          waveScale={0.6}
          waveRatio={0.9}
          swell={28}
          turbulence={14}
          tilt={1.11}
          zoom={1}
          height={5.5}
          fogDepth={18}
          detail="medium"
          brightness={0.85}
          opacity={0.72}
          mouseInteraction={true}
          parallaxStrength={0.35}
          grain={false}
        />
      </div>

      {/* Subtle blueprint decorative markers */}
      <span className="blueprint-marker-plus" style={{ top: '24px', left: '32px' }}>+</span>
      <span className="blueprint-marker-plus" style={{ top: '24px', right: '32px' }}>+</span>
      <span className="blueprint-marker-plus" style={{ bottom: '24px', left: '32px' }}>+</span>
      <span className="blueprint-marker-plus" style={{ bottom: '24px', right: '32px' }}>+</span>

      <div className="container hero-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          {/* 1. Clean Identity / Label */}
          <div className="hero-logo-wrapper hero-anim-tag" style={{ marginBottom: '14px' }}>
            <span className="hero-logo-text" style={{ letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: 700, fontSize: '0.9rem' }}>
              TECHX REIGNITE
            </span>
          </div>

          {/* 2. Masked Headline Reveal */}
          <div style={{ overflow: 'hidden' }}>
            <h1 className="hero-headline hero-anim-headline" style={{ fontSize: 'clamp(2.8rem, 6vw, 4.6rem)', lineHeight: 1.02, textTransform: 'uppercase', margin: '14px 0 18px', letterSpacing: '-0.02em' }}>
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
          <p className="hero-description hero-anim-desc" style={{ fontSize: '1.1rem', maxWidth: '600px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
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
      </div>
    </section>
  );
};
