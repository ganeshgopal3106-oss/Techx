import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

export const UniqueSection: React.FC = () => {
  const benefits = [
    {
      num: "01",
      title: "Interdisciplinary Inclusivity",
      desc: "Dispelling the misconception that IEEE Computer Society is only for CS students. With AI spanning Healthcare, ADAS, and IoT, TechX welcomes delegates from ECE, Mechanical, Biotechnology, and beyond."
    },
    {
      num: "02",
      title: "Community Belonging",
      desc: "Opening doors for beginners and seniors alike. We foster an accessible, ego-free technical culture emphasizing collaboration, curiosity, and shared growth over competition."
    },
    {
      num: "03",
      title: "Industry Exposure",
      desc: "Bridging the academic-industry gap by immersing students in modern DevOps standards, production codebases, and real-world system architecture."
    },
    {
      num: "04",
      title: "IEEE CS Membership Value",
      desc: "Exclusive sessions unpacking global IEEE grants, research publication pathways, student branch leadership perks, and international networking pipelines."
    },
    {
      num: "05",
      title: "Industrial Firm Visit",
      desc: "Curated corporate visit exposing delegates directly to real IT enterprise work floors, server infrastructure, and developer team rituals."
    },
    {
      num: "06",
      title: "Direct Industry Mentors",
      desc: "Hands-on guidance from distinguished young professionals and alumni working at top tech firms, offering real-world portfolio and career counsel."
    }
  ];

  return (
    <section id="community" className="unique-section section-padding blueprint-grid-bg" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader num="07 / COMMUNITY & IMPACT" title="The TechX Advantage" />
        
        {/* Editorial Numbered Benefits Grid */}
        <ScrollReveal variant="stagger" staggerDelay={70}>
          <div className="community-editorial-grid">
            {benefits.map((b) => (
              <div key={b.num} className="community-benefit-item">
                <span className="benefit-num">{b.num}</span>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
