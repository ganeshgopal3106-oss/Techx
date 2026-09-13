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

  const [activeVisualTab, setActiveVisualTab] = useState<'telemetry' | 'tracks' | 'radar'>('telemetry');

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
      style={{ minHeight: '94vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 21st.dev Ambient Radiant Glow Backdrop */}
      <div 
        className="lp-ambient-glow" 
        style={{ 
          width: '520px', 
          height: '520px', 
          top: '-100px', 
          right: '8%', 
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
        }} 
      />
      <div 
        className="lp-ambient-glow" 
        style={{ 
          width: '420px', 
          height: '420px', 
          bottom: '-80px', 
          left: '5%', 
          background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)',
          opacity: 0.25
        }} 
      />

      {/* Subtle blueprint decorative markers */}
      <span className="blueprint-marker-plus" style={{ top: '24px', left: '32px' }}>+</span>
      <span className="blueprint-marker-plus" style={{ top: '24px', right: '32px' }}>+</span>
      <span className="blueprint-marker-plus" style={{ bottom: '24px', left: '32px' }}>+</span>
      <span className="blueprint-marker-plus" style={{ bottom: '24px', right: '32px' }}>+</span>

      <div className="container hero-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          {/* 1. 21st.dev Pulsing Status Chip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '6px 14px', 
              borderRadius: '24px', 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span className="status-ping-wrap">
                <span className="status-ping-ring"></span>
                <span className="status-ping-dot"></span>
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--accent)' }}>
                REGISTRATION ACTIVE // SEPT 13–27
              </span>
            </div>

            <span className="blueprint-tag">[ SYS // 2026.09 ]</span>
          </div>

          {/* 2. Masked Headline Reveal */}
          <div style={{ overflow: 'hidden' }}>
            <h1 className="hero-headline hero-anim-headline" style={{ fontSize: 'clamp(2.8rem, 5.8vw, 4.6rem)', lineHeight: 1.04, textTransform: 'uppercase', margin: '14px 0 16px', letterSpacing: '-0.025em' }}>
              Powering Minds,<br />
              <span style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                One Spark At A Time.
              </span>
            </h1>
          </div>
          
          {/* 3. Event Meta Info */}
          <div className="hero-meta hero-anim-meta" style={{ margin: '12px 0 18px' }}>
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
          <p className="hero-description hero-anim-desc" style={{ fontSize: '1.05rem', maxWidth: '560px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '22px' }}>
            A premier technical summit hosted by IEEE CS SCT SBC bridging academic foundations and battle-tested industry readiness through hands-on labs and direct mentorship.
          </p>

          {/* 5. Live Glassmorphism Countdown Timer Bento */}
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

          {/* 6. 21st.dev Shimmer CTA Action Buttons */}
          <div className="hero-actions hero-anim-actions" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '4px' }}>
            <a 
              ref={btnRef}
              href="#tracks" 
              className="btn-shimmer hero-primary-cta"
              style={{ 
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
              style={{ padding: '12px 26px', fontSize: '0.85rem' }}
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

        {/* 7. 21st.dev Interactive Bento Telemetry Visual Area */}
        <div className="hero-visual-area hero-anim-visual" ref={visualRef}>
          <div 
            className="bento-telemetry-container" 
            style={{ 
              transform: transformStyle,
              minHeight: '420px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Bento Interactive Tab Switcher Bar */}
            <div className="bento-header-bar">
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  className={`bento-tab-btn ${activeVisualTab === 'telemetry' ? 'active' : ''}`}
                  onClick={() => setActiveVisualTab('telemetry')}
                  aria-label="View Telemetry"
                >
                  [ 01 // TELEMETRY ]
                </button>
                <button
                  type="button"
                  className={`bento-tab-btn ${activeVisualTab === 'tracks' ? 'active' : ''}`}
                  onClick={() => setActiveVisualTab('tracks')}
                  aria-label="View Track Matrix"
                >
                  [ 02 // MATRIX ]
                </button>
                <button
                  type="button"
                  className={`bento-tab-btn ${activeVisualTab === 'radar' ? 'active' : ''}`}
                  onClick={() => setActiveVisualTab('radar')}
                  aria-label="View Radar Schematics"
                >
                  [ 03 // RADAR ]
                </button>
              </div>

              <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.7rem' }}>
                LIVE // ACTIVE
              </span>
            </div>

            {/* Bento Tab Body 1: Telemetry & Core Metrics */}
            {activeVisualTab === 'telemetry' && (
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div className="bento-stat-card">
                    <span className="blueprint-tag">ATTENDANCE CAPACITY</span>
                    <div style={{ fontSize: '1.8rem', fontWeight: 850, color: 'var(--text-primary)', marginTop: '2px' }}>
                      500+
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Registered & Alumni Delegates</span>
                  </div>

                  <div className="bento-stat-card">
                    <span className="blueprint-tag">SPECIALIZED TRACKS</span>
                    <div style={{ fontSize: '1.8rem', fontWeight: 850, color: 'var(--accent)', marginTop: '2px' }}>
                      04
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tech & Train Dual Pillars</span>
                  </div>

                  <div className="bento-stat-card">
                    <span className="blueprint-tag">PRE-EVENTS CIRCUIT</span>
                    <div style={{ fontSize: '1.8rem', fontWeight: 850, color: 'var(--accent-secondary)', marginTop: '2px' }}>
                      06
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Online Sessions & Contests</span>
                  </div>

                  <div className="bento-stat-card">
                    <span className="blueprint-tag">MAIN SUMMIT</span>
                    <div style={{ fontSize: '1.8rem', fontWeight: 850, color: 'var(--text-primary)', marginTop: '2px' }}>
                      02 Days
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Offline Labs @ SCTCE Campus</span>
                  </div>
                </div>

                {/* Chapter Merit Banner */}
                <div style={{ 
                  marginTop: 'auto', 
                  padding: '12px 14px', 
                  borderRadius: 'var(--radius-sm)', 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <span className="blueprint-tag">GRANT BACKING</span>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                      Official IEEE Computer Society SYP Grant
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 800 }}>
                    100% VERIFIED
                  </span>
                </div>
              </div>
            )}

            {/* Bento Tab Body 2: Track Matrix Preview */}
            {activeVisualTab === 'tracks' && (
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="blueprint-tag">TRACK 01 // TECH</span>
                    <span className="badge" style={{ fontSize: '0.65rem' }}>OFFLINE LABS</span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                    Hands-on Technical Workshops
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>2 Intensive offline coding sprint labs</span>
                </div>

                <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="blueprint-tag">TRACK 02 // TECH</span>
                    <span className="badge" style={{ fontSize: '0.65rem' }}>KEYNOTES</span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                    Interdisciplinary Talk Sessions
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ADAS & Healthcare AI Breakthroughs</span>
                </div>

                <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="blueprint-tag">TRACK 03 // TRAIN</span>
                    <span className="badge" style={{ fontSize: '0.65rem' }}>CAREER</span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                    Placement & Soft Skills
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Resume curation & interview drills</span>
                </div>

                <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="blueprint-tag">TRACK 04 // TRAIN</span>
                    <span className="badge" style={{ fontSize: '0.65rem' }}>1-ON-1</span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                    Personalized Nano-Mentoring
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Direct guidance with top alumni</span>
                </div>
              </div>
            )}

            {/* Bento Tab Body 3: Kinetic Radar Graphic */}
            {activeVisualTab === 'radar' && (
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <svg width="220" height="220" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-kinetic-svg">
                  <rect x="20" y="20" width="160" height="160" stroke="#CF8326" strokeWidth="1" strokeDasharray="4 4" opacity="0.6"/>
                  
                  {/* Corner target brackets */}
                  <path d="M20 32V20H32" stroke="#CF8326" strokeWidth="1.5" />
                  <path d="M180 32V20H168" stroke="#CF8326" strokeWidth="1.5" />
                  <path d="M20 168V180H32" stroke="#CF8326" strokeWidth="1.5" />
                  <path d="M180 168V180H168" stroke="#CF8326" strokeWidth="1.5" />

                  {/* Outer Orbit */}
                  <g className="svg-orbit-outer">
                    <circle cx="100" cy="100" r="64" stroke="currentColor" strokeWidth="1" strokeDasharray="3 9" opacity="0.5"/>
                    <circle cx="100" cy="36" r="3.5" fill="#CF8326" />
                    <circle cx="100" cy="164" r="3" fill="#E5983B" />
                  </g>

                  {/* Inner Orbit */}
                  <g className="svg-orbit-inner">
                    <circle cx="100" cy="100" r="44" stroke="#CF8326" strokeWidth="1.2" strokeDasharray="8 6"/>
                    <line x1="100" y1="56" x2="100" y2="62" stroke="#CF8326" strokeWidth="1.5"/>
                    <line x1="100" y1="138" x2="100" y2="144" stroke="#CF8326" strokeWidth="1.5"/>
                    <line x1="56" y1="100" x2="62" y2="100" stroke="#CF8326" strokeWidth="1.5"/>
                    <line x1="138" y1="100" x2="144" y2="100" stroke="#CF8326" strokeWidth="1.5"/>
                  </g>

                  {/* Radar Sweep */}
                  <g className="svg-radar-sweep">
                    <line x1="100" y1="100" x2="100" y2="38" stroke="url(#heroScannerGradient)" strokeWidth="1.8"/>
                  </g>

                  {/* Pulsing Core Waves */}
                  <circle cx="100" cy="100" r="12" stroke="#CF8326" fill="none" className="svg-pulse-wave-1" />
                  <circle cx="100" cy="100" r="12" stroke="#CF8326" fill="none" className="svg-pulse-wave-2" />

                  {/* Core */}
                  <circle cx="100" cy="100" r="6" fill="#CF8326"/>
                  <circle cx="100" cy="100" r="2.5" fill="#FFFFFF"/>

                  <defs>
                    <linearGradient id="heroScannerGradient" x1="100" y1="100" x2="100" y2="38" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#CF8326" stopOpacity="0.9"/>
                      <stop offset="100%" stopColor="#CF8326" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>

                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-primary)', fontWeight: 700 }}>
                    SCTCE // 8.5241°N, 76.9806°E
                  </span>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    IEEE CS SCT SBC CAMPUS TELEMETRY
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
