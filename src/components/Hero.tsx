import React, { useState, useEffect } from 'react';
import { eventData } from '../data/event';
import FoldText from './FoldText';
import { SpecularButton } from './SpecularButton';
import heroLogoImg from '../assets/logo-transparent.png';

// Target date: 26 September 2026, 09:00:00 AM IST (Thiruvananthapuram UTC+5:30 -> 03:30:00 UTC)
const targetTime = Date.UTC(2026, 8, 26, 3, 30, 0);

const calculateTimeLeft = () => {
  const now = Date.now();
  const distance = targetTime - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000)
  };
};

export const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

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
      setTimeLeft(calculateTimeLeft());
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="hero" 
      className="hero-section section-padding" 
      style={{ position: 'relative' }}
    >
      <div className="container hero-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          {/* 1. Official TECHX REIGNITE Logo */}
          <div className="hero-logo-wrapper hero-anim-tag">
            <img
              src={heroLogoImg}
              alt="TECHX REIGNITE"
              className="hero-logo-img"
            />
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
          
          {/* 3. Event Meta Info */}
          <div className="hero-meta hero-anim-meta">
            <div className="hero-meta-inner">
              <span className="hero-meta-date hero-anim-date">
                13–27 September 2026
              </span>
              <span className="hero-meta-divider hero-anim-venue-divider">|</span>
              <span className="hero-meta-location hero-anim-venue">
                {eventData.location}
              </span>
            </div>
          </div>

          {/* 4. Description */}
          <p className="hero-description hero-anim-desc">
            The premier technical upskilling summit hosted by IEEE CS SCT SBC at SCTCE Trivandrum.
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

          {/* 6. Hero Buttons */}
          <div className="hero-actions hero-anim-actions">
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
