import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  const [showFullSbcText, setShowFullSbcText] = useState(false);

  return (
    <section id="about" className="about-section section-padding blueprint-circuit-bg" style={{ position: 'relative' }}>
      <div className="container about-container">
        {/* Left Column / Section Header */}
        <div className="about-left-col">
          <span className="blueprint-tag">[ SYS // VISION ]</span>
          <div className="about-section-number" style={{ marginTop: '6px', fontSize: '0.85rem', fontWeight: 800 }}>
            02 / ABOUT TECHX
          </div>
        </div>

        {/* Right Column / Primary Product Story */}
        <ScrollReveal variant="clip-reveal" className="about-right-col">
          {/* Story Headline & Lead */}
          <div className="about-block" style={{ marginBottom: '44px' }}>
            <h2 className="about-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '18px' }}>
              What Is TechX REIGNITE?
            </h2>
            <div className="about-content">
              <p className="about-lead" style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--text-primary)', fontWeight: 500 }}>
                TechX REIGNITE is the premier technical upskilling initiative hosted by IEEE CS SCT SBC at Sree Chitra Thirunal College of Engineering, designed to bridge the gap between academic theory and real-world industry engineering.
              </p>
              
              <div style={{ margin: '20px 0', padding: '16px 20px', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  The Core Philosophy: TECH + TRAIN
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  We unite hands-on technical sprints (Full-stack, ADAS, AI in Healthcare, IoT) with direct career empowerment (Soft Skills communication, resume curation, and 1-on-1 personalized Nano-Mentoring).
                </p>
              </div>

              <p style={{ fontWeight: 'normal', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Supported by an official IEEE grant, TechX REIGNITE provides a high-energy platform for students across all engineering branches to build production systems, compete in capstone challenges, and gain actionable placement confidence.
              </p>
            </div>
          </div>

          {/* Chapter Narrative */}
          <div className="about-block">
            <span className="blueprint-tag">ORGANIZED BY // STUDENT EXCELLENCE</span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, textTransform: 'uppercase', margin: '8px 0 14px', color: 'var(--text-primary)' }}>
              IEEE CS SCT Student Branch Chapter
            </h3>
            <div className="about-content">
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                IEEE CS SCT SBC is a vibrant student-led technical chapter at SCTCE Pappanamcode. Recognized with the Outstanding Student Branch Chapter Award in 2022 and named Best Student Branch Chapter of IEEE SCT SB in 2024, our team has organized six major technical milestones in 2026 alone.
              </p>
              
              <div className={`about-expandable-drawer ${showFullSbcText ? 'open' : ''}`}>
                <div className="about-expandable-drawer-inner">
                  <p style={{ marginTop: '16px', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    Having secured over 180 registrations in less than 24 hours for technical tracks during Dhyuthi 6.0, our chapter brings proven logistical excellence, distinguished industry alumni networks, and deep student mentorship to every event we create.
                  </p>
                </div>
              </div>

              <div className="about-actions" style={{ marginTop: '18px' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setShowFullSbcText(!showFullSbcText)}
                  style={{ height: '38px', padding: '0 20px', fontSize: '0.75rem', fontWeight: 700 }}
                  aria-expanded={showFullSbcText}
                >
                  {showFullSbcText ? 'READ LESS −' : 'CHAPTER RECORD & IMPACT +'}
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Supporting Visual / Architectural Bento Block */}
        <ScrollReveal variant="scale-subtle" className="about-image-area" delayMs={150}>
          <div
            className="blueprint-grid-bg"
            style={{
              height: '100%',
              minHeight: '380px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '24px',
              backgroundColor: 'var(--bg-card)',
              boxShadow: 'var(--shadow-card)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <span className="blueprint-tag">[ CHAPTER // RECORD & HONORS ]</span>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 700 }}>
                SCTCE • KERALA
              </span>
            </div>

            {/* 2x2 Bento Accolade Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              margin: '16px 0'
            }}>
              <div style={{
                padding: '12px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', marginBottom: '4px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>AWARD 2024</span>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  Best Student Branch Chapter
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  IEEE SCT SB Annual Honor
                </div>
              </div>

              <div style={{
                padding: '12px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', marginBottom: '4px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>AWARD 2022</span>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  Outstanding SBC Award
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Kerala Section Recognition
                </div>
              </div>

              <div style={{
                padding: '12px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', marginBottom: '4px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>VELOCITY</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1.1 }}>
                  180+ in 24h
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Record signups during Dhyuthi
                </div>
              </div>

              <div style={{
                padding: '12px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', marginBottom: '4px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>SUPPORT</span>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  Official IEEE Grant
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Endorsed Technical Sprint
                </div>
              </div>
            </div>

            {/* Bottom Footer Details */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-color)',
              fontSize: '0.74rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)'
            }}>
              <span>IEEE COMPUTER SOCIETY</span>
              <a
                href="https://ieeesctsb.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}
              >
                VISIT CHAPTER ↗
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
