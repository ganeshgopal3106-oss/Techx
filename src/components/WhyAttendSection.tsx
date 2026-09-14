import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

interface Pillar {
  num: string;
  tag: string;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    num: '01',
    tag: 'PRACTICE // CODE-FIRST',
    title: 'Hands-on Learning',
    description: 'Direct code-level execution where theoretical abstractions give way to production-ready implementations.'
  },
  {
    num: '02',
    tag: 'INDUSTRY // PERSPECTIVE',
    title: 'Industry Exposure',
    description: 'Firsthand interaction with seasoned practitioners tackling real-world engineering challenges at scale.'
  },
  {
    num: '03',
    tag: 'SYLLABUS // DEEP-DIVE',
    title: 'Technical Workshops',
    description: 'Rigorous offline sprints covering modern software engineering and specialized interdisciplinary hardware domains.'
  },
  {
    num: '04',
    tag: 'CHALLENGE // SPRINT',
    title: 'Competitions',
    description: 'Fast-paced capstone challenges on Day 2 testing team problem solving, code agility, and prototype defense.'
  },
  {
    num: '05',
    tag: 'ECOSYSTEM // SYNERGY',
    title: 'Networking',
    description: 'Forge meaningful connections with passionate engineering peers, student leaders, and technical mentors.'
  },
  {
    num: '06',
    tag: '1-ON-1 // GUIDANCE',
    title: 'Nano Mentoring',
    description: 'Personalized private counseling pods with young tech professionals for direct portfolio critiques and roadmapping.'
  },
  {
    num: '07',
    tag: 'COMMUNICATION // CAREER',
    title: 'Soft-Skill Development',
    description: 'Master placement interviews, clear technical articulation, and compelling project pitch presentations.'
  },
  {
    num: '08',
    tag: 'RECHARGE // CAMARADERIE',
    title: 'Games & Culturals',
    description: 'High-energy tech trivia, icebreakers, and evening live cultural performances to celebrate community spirit.'
  },
  {
    num: '09',
    tag: 'GLOBAL // NETWORK',
    title: 'IEEE Community Experience',
    description: 'Direct immersion into the global IEEE Computer Society ecosystem, unlocking lifelong technical pathways.'
  }
];

export const WhyAttendSection: React.FC = () => {
  return (
    <section id="why-attend" className="why-attend-section section-padding blueprint-grid-bg" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader 
          num="03 / WHY ATTEND TECHX" 
          title="Nine Pillars of Elevation" 
        />

        <div className="why-attend-grid">
          {pillars.map((pillar, idx) => (
            <ScrollReveal 
              key={pillar.num} 
              variant="fade-up" 
              delayMs={idx * 45}
              className="why-attend-cell"
            >
              <div className="why-attend-cell-header">
                <span className="why-attend-num">{pillar.num}</span>
                <span className="why-attend-tag">{pillar.tag}</span>
              </div>
              <h3 className="why-attend-title">{pillar.title}</h3>
              <p className="why-attend-desc">{pillar.description}</p>
              <div className="why-attend-corner-mark" aria-hidden="true">+</div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
