import React from 'react';
import posterImg from '../assets/poster.jpeg';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section section-padding" style={{ position: 'relative' }}>
      <div className="container about-container">
        {/* Left Side: About Narrative & Compact Highlights */}
        <div className="about-left-col">
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

            {/* Three Compact Highlights */}
            <div className="about-highlights-stack" aria-label="Core Pillars">
              <div className="about-highlight-block">
                <span className="about-highlight-label">LEARN</span>
                <span className="about-highlight-desc">Hands-on workshops and practical knowledge.</span>
              </div>
              <div className="about-highlight-block">
                <span className="about-highlight-label">BUILD</span>
                <span className="about-highlight-desc">Apply concepts through challenges and competitions.</span>
              </div>
              <div className="about-highlight-block">
                <span className="about-highlight-label">CONNECT</span>
                <span className="about-highlight-desc">Meet mentors, peers, and the wider tech community.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Existing Official Poster */}
        <div className="about-poster-wrap">
          <img 
            src={posterImg} 
            alt="TECHX REIGNITE Official Summit Poster" 
            className="about-poster-img" 
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};


