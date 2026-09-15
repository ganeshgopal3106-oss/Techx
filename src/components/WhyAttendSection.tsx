import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

interface Pillar {
  num: string;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    num: '01',
    title: 'Hands-on Workshops',
    description: 'Learn through practical sessions.'
  },
  {
    num: '02',
    title: 'Technical Competitions',
    description: 'Put your skills to the test.'
  },
  {
    num: '03',
    title: 'Nano Mentoring',
    description: 'Get focused guidance from mentors.'
  },
  {
    num: '04',
    title: 'Networking',
    description: 'Connect with students and tech communities.'
  },
  {
    num: '05',
    title: 'Experience',
    description: 'Learn, compete, collaborate and have fun.'
  }
];

export const WhyAttendSection: React.FC = () => {
  return (
    <section id="why-attend" className="why-attend-section section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader 
          num="03 / WHY ATTEND" 
          title="Why Attend TechX" 
        />

        <div className="why-attend-grid why-attend-grid-5">
          {pillars.map((pillar, idx) => (
            <ScrollReveal 
              key={pillar.num} 
              variant="fade-up" 
              delayMs={idx * 40}
              className="why-attend-cell"
            >
              <div className="why-attend-cell-header">
                <span className="why-attend-num">{pillar.num}</span>
              </div>
              <h3 className="why-attend-title">{pillar.title}</h3>
              <p className="why-attend-desc">{pillar.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
