import React from 'react';
import posterImg from '../assets/poster.jpeg';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section section-padding" style={{ position: 'relative' }}>
      <div className="container about-container">
        {/* Centered Header */}
        <div className="about-header">
          <div className="about-tag">
            ABOUT THE EVENT
          </div>
          <h2 className="about-heading">
            ABOUT TECHX
          </h2>
          <p className="about-lead-p">
            TECHX REIGNITE is a technical upskilling initiative by <strong style={{ color: '#111111', fontWeight: 700 }}>IEEE CS SCT SBC</strong>, bringing together students, technology, and industry-oriented learning.
          </p>
        </div>

        {/* Primary Centered Visual */}
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


