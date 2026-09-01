import React, { useState } from 'react';
import { scheduleData } from '../data/schedule';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

interface EventDetails {
  description: string;
  venue?: string;
  requirements?: string;
  organizer?: string;
}

const preEventDetailsMap: Record<string, EventDetails> = {
  "Online Workshop": {
    description: "An introductory online bootcamp designed to get all participants familiar with the pre-requisites and setup files required for the main offline tracks. Ideal for beginners.",
    venue: "Google Meet / Discord (Online)",
    organizer: "IEEE CS CEAL SBC",
    requirements: "Requires stable internet connection and a basic text editor."
  },
  "BlindScript": {
    description: "A thrilling programming speed sprint where developers write code with their monitors turned off! Your code is judged on execution accuracy, compile rate, and syntax correctness. Compete to win exclusive credits.",
    venue: "Hackerrank (Online)",
    organizer: "IEEE CS SCT SBC",
    requirements: "Fast typing and strong muscle memory."
  },
  "AI in HealthCare": {
    description: "A keynote session discussing deep learning neural networks applied to diagnosis, CT scan analysis, and biotech engineering. Learn about the intersection of computer science and medicine.",
    venue: "Google Meet (Online)",
    organizer: "IEEE EMBS SCT SBC"
  },
  "Competition": {
    description: "Online coding marathon testing algorithmic solving. Problems range from easy arrays to dynamic programming.",
    venue: "Online Platform",
    organizer: "IEEE CS GECBH SBC"
  },
  "CypherX": {
    description: "A cryptography puzzle hunt challenge. Decrypt logs, solve riddles, and decode files to find the flags first.",
    venue: "Online (CTF Portal)",
    organizer: "IEEE COMSOC SCT SBC"
  },
  "ADAS — The Future of Driving": {
    description: "Expert session on how Advanced Driver Assistance Systems (ADAS) work, focusing on sensor fusion, lidar vision networks, and autopilot control loops.",
    venue: "Google Meet (Online)",
    organizer: "IEEE IAS SCT SBC"
  }
};

export const Timeline: React.FC = () => {
  const [selectedPreEventDate, setSelectedPreEventDate] = useState<string>("13th September");

  const selectedEvent = scheduleData.preEvents.find(pe => pe.date === selectedPreEventDate) || scheduleData.preEvents[0];
  const details = preEventDetailsMap[selectedEvent.title];

  return (
    <section id="journey" className="schedule-section section-padding blueprint-circuit-bg" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader num="05 / EVENT JOURNEY" title="Pre-Events Circuit (13 — 19 September)" />
        
        {/* Continuous Interactive Circuit Bus Header */}
        <ScrollReveal className="circuit-bus-header">
          <span className="blueprint-tag">[ BUS 01 // PRE-EVENTS ONLINE ROUTE ]</span>
          <span className="badge" style={{ marginLeft: 'auto' }}>6 INTERACTIVE SESSIONS</span>
        </ScrollReveal>

        {/* Continuous Interactive Circuit Track for Pre-events */}
        <ScrollReveal>
          <div className="circuit-track-line" role="tablist" aria-label="Pre-Events Journey">
            {scheduleData.preEvents.map((pe) => {
              const isActive = selectedPreEventDate === pe.date;
              const dateLabel = pe.date.replace('th September', ' SEP');

              return (
                <button
                  key={pe.date}
                  className={`circuit-node-button ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedPreEventDate(pe.date)}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={pe.date}
                >
                  <div className="circuit-node-point" />
                  <span className="circuit-node-date">{dateLabel}</span>
                  <span style={{ fontSize: '0.65rem', color: isActive ? 'var(--accent)' : 'var(--text-muted)', textTransform: 'uppercase', marginTop: '2px' }}>
                    Online
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Selected Pre-Event Connected Content Panel */}
        <ScrollReveal className="circuit-details-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-sm)' }}>
            <div>
              <span className="blueprint-tag">PRE-EVENT // {selectedEvent.date}</span>
              <h3 style={{ fontSize: '1.6rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                {selectedEvent.title}
              </h3>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '4px 10px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '2px', color: 'var(--accent)', fontWeight: 700 }}>
              ONLINE PRE-EVENT
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-md)', margin: 'var(--space-md) 0' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-md)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
              <div className="blueprint-tag">ORGANIZING CHAPTER</div>
              <div style={{ fontWeight: 700, marginTop: '4px', color: 'var(--text-primary)' }}>{selectedEvent.organizer}</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-md)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
              <div className="blueprint-tag">SESSION PLATFORM</div>
              <div style={{ fontWeight: 700, marginTop: '4px', color: 'var(--text-primary)' }}>
                {details?.venue || 'Online Virtual Meeting'}
              </div>
            </div>
          </div>

          <p style={{ marginTop: 'var(--space-md)', color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1rem' }}>
            {details?.description}
          </p>

          {details?.requirements && (
            <div style={{ marginTop: 'var(--space-sm)', fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              REQUIREMENT: {details.requirements}
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};
