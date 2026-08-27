import React from 'react';
import { ScrollReveal } from './ScrollReveal';

export const UniqueSection: React.FC = () => {
  return (
    <section id="unique" className="unique-section section-padding">
      <div className="container unique-container">
        {/* Left Column / Mobile Header */}
        <div className="unique-left-col">
          <div className="unique-section-number">02 / FEATURES</div>
        </div>

        {/* Right Column / Content */}
        <ScrollReveal className="unique-right-col">
          <div className="unique-header-block">
            <h2 className="unique-heading">What Makes TechX Unique</h2>
          </div>
          
          <div className="unique-grid-features">
            {/* Feature 1 */}
            <div className="unique-feature-item">
              <h4 className="unique-feature-title">Inclusivity</h4>
              <p className="unique-feature-desc">
                The IEEE Computer Society is often misunderstood to be a place only for computer science engineers. With the inclusion of AI, all engineering branches have become inter-disciplinary. The sessions on AI in HealthCare, ADAS, IOT make our event open to other branches such as electronics and communication, biotechnology and mechanical engineering, thus ensuring inclusivity of other engineering branches within IEEE CS.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="unique-feature-item">
              <h4 className="unique-feature-title">Community Engagement</h4>
              <p className="unique-feature-desc">
                Technical societies often focus heavily on events, coding competitions, hackathons, and paper presentations, but forget to build a sense of belonging or open the doors for beginners. We plan to include students from all years and branches and build a strong technical culture by bringing in a sense of belonging.
              </p>
            </div>
          </div>

          {/* Engage Section */}
          <div className="engage-block">
            <h4 className="engage-title">ENGAGE</h4>
            <ul className="engage-list">
              <li className="engage-item">
                <span className="engage-bullet"></span>
                <p className="engage-desc">Organize a CS membership benefits session, urging students to be a part of the community.</p>
              </li>
              <li className="engage-item">
                <span className="engage-bullet"></span>
                <p className="engage-desc">Organize an industrial visit to an IT firm to expose students to the corporate environment.</p>
              </li>
              <li className="engage-item">
                <span className="engage-bullet"></span>
                <p className="engage-desc">Mentors from the industry for workshops.</p>
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
