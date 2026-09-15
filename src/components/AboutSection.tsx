import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import posterImg from '../assets/poster.jpeg';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section section-padding" style={{ position: 'relative' }}>
      <div className="container about-container">
        {/* Left Column: Concise Editorial About Text */}
        <ScrollReveal variant="clip-reveal" className="about-left-col">
          <div className="about-tag">
            ABOUT THE EVENT
          </div>
          <h2 className="about-heading">
            ABOUT TECHX
          </h2>
          <div className="about-content">
            <p className="about-lead-p">
              TECHX REIGNITE is a technical upskilling initiative by <strong style={{ color: '#111111', fontWeight: 700 }}>IEEE CS SCT SBC</strong>, bringing together students, technology, and industry-oriented learning.
            </p>
            <p className="about-sub-p">
              Through hands-on workshops, technical competitions, mentoring, and interactive sessions, TECHX helps participants build practical skills and explore emerging technologies beyond the classroom.
            </p>

            {/* Three short editorial highlight lines */}
            <div className="about-highlights-list" aria-label="Key Highlights">
              <div className="about-highlight-row">
                <span className="about-highlight-key">LEARN</span>
                <span className="about-highlight-sep">—</span>
                <span className="about-highlight-val">Hands-on workshops and practical knowledge.</span>
              </div>
              <div className="about-highlight-row">
                <span className="about-highlight-key">BUILD</span>
                <span className="about-highlight-sep">—</span>
                <span className="about-highlight-val">Apply concepts through challenges and competitions.</span>
              </div>
              <div className="about-highlight-row">
                <span className="about-highlight-key">CONNECT</span>
                <span className="about-highlight-sep">—</span>
                <span className="about-highlight-val">Meet mentors, peers, and the wider tech community.</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column: Official TECHX REIGNITE Poster */}
        <ScrollReveal variant="scale-subtle" className="about-poster-wrap" delayMs={150}>
          <img 
            src={posterImg} 
            alt="TECHX REIGNITE Official Summit Poster" 
            className="about-poster-img" 
            loading="lazy"
          />
        </ScrollReveal>
      </div>
    </section>
  );
};

