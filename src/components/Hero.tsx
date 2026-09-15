import React, { useState, useEffect } from 'react';
import FoldText from './FoldText';
import { SpecularButton } from './SpecularButton';

export const Hero: React.FC = () => {
  // Target date: September 26, 2026 09:00:00 AM IST (Start of Main Event)
  const targetDate = new Date('2026-09-26T09:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Mobile detection for responsive FoldText tuning (< 768px)
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section 
      id="hero" 
      className="hero-section section-padding" 
      style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}
    >
      <div className="container hero-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          {/* 1. Clean Identity / Official Logo */}
          <div className="hero-logo-wrapper hero-anim-tag">
            <img
              src="/logo.png"
              alt="TECHX REIGNITE"
              className="hero-logo-mobile-img"
            />
            <span className="hero-logo-text hero-logo-desktop-text">
              TECHX REIGNITE
            </span>
          </div>

          {/* 2. FoldText Kinetic Headline */}
          <h1 className="hero-headline hero-anim-headline-mobile" style={{ margin: '14px 0 18px', lineHeight: 0.95 }}>
            <FoldText
              text={'POWERING MINDS,\nONE SPARK AT A TIME.'}
              splitBy="line"
              hinge="top"
              trigger="mount"
              duration={isMobile ? 0.65 : 0.7}
              stagger={isMobile ? 0.06 : 0.08}
              ease="power3.out"
              perspective={isMobile ? 550 : 700}
              creaseShading={isMobile ? 0.30 : 0.35}
              delay={isMobile ? 0.07 : 0}
              fontSize={isMobile ? 'clamp(1.85rem, 7.5vw, 2.7rem)' : 'clamp(3.5rem, 7vw, 7rem)'}
              fontWeight={800}
              color="#111111"
            />
          </h1>
          
          {/* 3. Event Date & Venue Specular Information Panel */}
          <div className="hero-specular-meta-wrapper hero-anim-meta">
            <SpecularButton
              as="div"
              variant="panel"
              radius={12}
              intensity={0.55}
              proximity={220}
              speed={0.3}
              className="hero-date-venue-panel"
            >
              <div className="hero-date-venue-content">
                <span className="hero-panel-date">
                  13–27 September 2026
                </span>
                <span className="hero-panel-venue">
                  Sree Chitra Thirunal College of Engineering (SCTCE), Pappanamcode
                </span>
              </div>
            </SpecularButton>
          </div>

          {/* 4. Description */}
          <p className="hero-description hero-anim-desc">
            The premier technical upskilling summit hosted by IEEE CS SCT SBC at SCTCE Trivandrum.
          </p>

          {/* 5. Unified Specular Countdown Panel */}
          <div className="hero-countdown-wrapper hero-anim-countdown" aria-label="Event Countdown">
            <SpecularButton
              as="div"
              variant="panel"
              radius={12}
              intensity={0.6}
              proximity={220}
              speed={0.35}
              className="hero-specular-countdown-panel"
            >
              <div className="specular-countdown-grid">
                <div className="specular-countdown-unit">
                  <span className="specular-countdown-num">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="specular-countdown-label">DAYS</span>
                </div>
                <span className="specular-countdown-colon" aria-hidden="true">:</span>
                <div className="specular-countdown-unit">
                  <span className="specular-countdown-num">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="specular-countdown-label">HOURS</span>
                </div>
                <span className="specular-countdown-colon" aria-hidden="true">:</span>
                <div className="specular-countdown-unit">
                  <span className="specular-countdown-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="specular-countdown-label">MINUTES</span>
                </div>
                <span className="specular-countdown-colon" aria-hidden="true">:</span>
                <div className="specular-countdown-unit">
                  <span className="specular-countdown-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="specular-countdown-label">SECONDS</span>
                </div>
              </div>
            </SpecularButton>
          </div>

          {/* 6. Hero Buttons */}
          <div className="hero-actions hero-anim-actions" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <SpecularButton 
              href="#tracks" 
              size="lg"
              className="hero-primary-cta hero-anim-cta-1"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('tracks');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>EXPLORE TRACKS</span>
              <span aria-hidden="true">↓</span>
            </SpecularButton>

            <SpecularButton 
              href="#schedule" 
              size="lg"
              variant="secondary"
              className="hero-secondary-cta hero-anim-cta-2"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('schedule');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>VIEW SCHEDULE</span>
              <span aria-hidden="true">↓</span>
            </SpecularButton>
          </div>
        </div>
      </div>
    </section>
  );
};
