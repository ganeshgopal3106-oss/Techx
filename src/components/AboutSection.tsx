import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import posterImg from '../assets/poster.jpeg';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section section-padding" style={{ position: 'relative' }}>
      <div className="container about-container">
        {/* Left Column / Section Header */}
        <div className="about-left-col">
          <div className="about-section-number" style={{ fontSize: '0.85rem', fontWeight: 800 }}>
            02 / ABOUT TECHX
          </div>
        </div>

        {/* Right Column / Primary Product Story */}
        <ScrollReveal variant="clip-reveal" className="about-right-col">
          <div className="about-block">
            <h2 className="about-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '18px' }}>
              What Is TechX REIGNITE?
            </h2>
            <div className="about-content">
              <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--text-primary)', fontWeight: 500, marginBottom: '12px' }}>
                TechX REIGNITE is the flagship technical upskilling summit hosted by IEEE CS SCT SBC at Sree Chitra Thirunal College of Engineering.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Designed to bridge academic learning with real-world industry engineering, the summit combines hands-on workshops, competitive hackathons, and 1-on-1 mentorship.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                Join us to build production systems, connect with industry leaders, and accelerate your technical journey.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Supporting Visual / Official Poster */}
        <ScrollReveal variant="scale-subtle" className="about-poster-wrap" delayMs={150}>
          <img 
            src={posterImg} 
            alt="TechX Reignite 2026 Summit Poster" 
            className="about-poster-img" 
            loading="lazy"
          />
        </ScrollReveal>
      </div>
    </section>
  );
};
