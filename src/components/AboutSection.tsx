import React from 'react';
import { getPosterBySlug } from '../data/posters';
import { PosterDisplay } from './PosterDisplay';

export const AboutSection: React.FC = () => {
  // Retrieve poster by slug; ready to be backed by API or dynamic props
  const mainPoster = getPosterBySlug('techx-reignite-main-poster');

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

        {/* Backend-Ready Centered Poster Visual */}
        {mainPoster && (
          <PosterDisplay poster={mainPoster} className="about-poster-wrap" loading="eager" />
        )}
      </div>
    </section>
  );
};


