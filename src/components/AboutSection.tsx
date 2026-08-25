import React, { useState } from 'react';

export const AboutSection: React.FC = () => {
  const [showFullSbcText, setShowFullSbcText] = useState(false);

  return (
    <section id="about" className="about-section section-padding">
      <div className="container about-container">
        {/* Left Column / Mobile Header */}
        <div className="about-left-col">
          <div className="about-section-number">01 / THE VISION</div>
        </div>

        {/* Right Column / Primary Info */}
        <div className="about-right-col">
          {/* Block 1: TechX REIGNITE Description */}
          <div className="about-block" style={{ marginBottom: '40px' }}>
            <h2 className="about-heading">About TechX REIGNITE</h2>
            <div className="about-content">
              <p className="about-lead">
                TechX REIGNITE is a global technical upskilling initiative hosted by IEEE CS SCT SBC to bridge the gap between academic learning and industry readiness.
              </p>
              <p className="about-lead" style={{ marginTop: '16px', fontWeight: 'normal', fontSize: '0.95rem' }}>
                The event features hands-on technical tracks alongside interactive career development and 1-on-1 nano-mentoring. Designed with an emphasis on interdisciplinary inclusivity, it empowers students across all engineering branches to build, collaborate, and innovate. Supported by an official IEEE grant, TechX REIGNITE serves as a launchpad for future tech leaders.
              </p>
            </div>
          </div>

          {/* Block 2: IEEE CS SCT SBC Description */}
          <div className="about-block">
            <h2 className="about-heading" style={{ fontSize: '1.75rem' }}>IEEE CS SCT SBC</h2>
            <div className="about-content">
              <p className="about-lead" style={{ fontSize: '0.95rem', fontWeight: 'normal' }}>
                IEEE CS SCT Student Branch Chapter is a thriving community of computer science enthusiasts. Led by the passion for emerging technologies, members actively participate in events upskilling themselves while at the same time contributing to the community.
              </p>
              
              {showFullSbcText ? (
                <p className="about-lead animate-fade-in" style={{ marginTop: '16px', fontSize: '0.95rem', fontWeight: 'normal' }}>
                  IEEE CS SCT SBC received the Outstanding Student Branch Chapter award in 2022. We were able to secure more than 180 registrations in less than twenty-four hours for technical tracks as a part of Dhyuthi 6.0, the flagship event of IEEE SCT SB. Also, IEEE CS SBC was recognized as the Best Student Branch Chapter of IEEE SCT SB in 2024. We have successfully organized six events (5 online and 1 offline) as of now in 2026.
                </p>
              ) : null}

              <div className="about-actions" style={{ marginTop: '16px' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setShowFullSbcText(!showFullSbcText)}
                  style={{ height: '36px', padding: '0 16px', fontSize: '0.75rem' }}
                >
                  {showFullSbcText ? 'Show Less' : 'Read History & Achievements'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder image area */}
        <div className="about-image-area">
          <div className="image-placeholder">
            <span>[ TECHX Reignite Logo / Event Artwork ]</span>
          </div>
        </div>
      </div>
    </section>
  );
};
