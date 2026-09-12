import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    "TECHX REIGNITE 2026",
    "POWERING MINDS, ONE SPARK AT A TIME",
    "IEEE CS SCT SBC",
    "FLAGSHIP SUMMIT",
    "13–27 SEPTEMBER 2026",
    "4 EXCLUSIVE TRACKS",
    "SCTCE TRIVANDRUM",
    "HANDS-ON LABS • ADAS • AI • NANO-MENTORING"
  ];

  return (
    <div className="kinetic-marquee-container" aria-hidden="true">
      <div className="kinetic-marquee-track">
        {/* Strip 1 */}
        <div className="kinetic-marquee-content">
          {items.map((text, idx) => (
            <span key={`s1-${idx}`} className="kinetic-marquee-item">
              <span className="kinetic-star">✱</span>
              <span>{text}</span>
            </span>
          ))}
        </div>

        {/* Strip 2 (Clone for infinite seamless loop) */}
        <div className="kinetic-marquee-content">
          {items.map((text, idx) => (
            <span key={`s2-${idx}`} className="kinetic-marquee-item">
              <span className="kinetic-star">✱</span>
              <span>{text}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
