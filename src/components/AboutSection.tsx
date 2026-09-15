import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import posterImg from '../assets/poster.jpeg';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section section-padding" style={{ position: 'relative' }}>
      <div className="container about-container">
        {/* Left Column: About Narrative & Highlights */}
        <ScrollReveal variant="clip-reveal" className="about-left-col">
          <div className="about-section-number">
            02 / ABOUT TECHX
          </div>
          <h2 className="about-heading">
            ABOUT TECHX
          </h2>
          <div className="about-content">
            <p className="about-lead-p">
              TECHX REIGNITE is a technical upskilling initiative by <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>IEEE CS SCT SBC</strong>, bringing together students, technology, and industry-oriented learning.
            </p>
            <p className="about-sub-p">
              Through hands-on workshops, technical competitions, mentoring, and interactive sessions, TECHX is designed to help participants move beyond academic fundamentals and build practical skills for the future.
            </p>

            {/* Compact 3-Item Highlights */}
            <div className="about-highlights" aria-label="Core Highlights">
              <div className="about-highlight-item">
                <span className="highlight-dot" aria-hidden="true">•</span>
                <span>Hands-on Workshops</span>
              </div>
              <div className="about-highlight-item">
                <span className="highlight-dot" aria-hidden="true">•</span>
                <span>Technical Competitions</span>
              </div>
              <div className="about-highlight-item">
                <span className="highlight-dot" aria-hidden="true">•</span>
                <span>Mentoring & Interactive Sprints</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column: Official Poster */}
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
