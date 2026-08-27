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

const eventDetailsMap: Record<string, EventDetails> = {
  // Pre-events
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
  },

  // Main Events - 26 Sep
  "Inauguration": {
    description: "Grand opening of TECHX REIGNITE. Featuring addresses from senior IEEE officials, outlining the agenda, objectives, and career tracks.",
    venue: "Main Seminar Hall (Offline)",
    requirements: "Arrival by 9:00 AM for ID badge collection."
  },
  "Workshop Session I (2 Tracks)": {
    description: "Parallel technical workshops. Track 1: Hands-on Full-stack Web Development. Track 2: Advanced IoT Systems & ADAS. Led by industry experts.",
    venue: "Computer Labs 2 & 3",
    requirements: "Laptops are mandatory. Pre-installed Node.js and VS Code."
  },
  "Lunch Break": {
    description: "Catered lunch at the campus canteen. Great opportunity to chat informally with speakers and IEEE members."
  },
  "Workshop Session II": {
    description: "Continuation of the Hands-on labs. Building projects, integrating APIs, solving implementation bugs, and preparing for the next day's sprint.",
    venue: "Computer Labs 2 & 3",
    requirements: "Laptops."
  },
  "Soft Skills Talk Session": {
    description: "An interactive placement talk helping students with resume structure, GitHub curation, and interviewing strategies to stand out in recruitment drives.",
    venue: "Auditorium Annex"
  },
  "Break": {
    description: "Refreshments, tea, and networking time."
  },
  "Games": {
    description: "Tech-focused interactive games and icebreakers. Compete in quick-fire quizzes and mini-games to win goodies.",
    venue: "Seminar Hall Lobby"
  },

  // Main Events - 27 Sep
  "Competition (based on workshop)": {
    description: "Apply the skills learned on Day 1! Teams will compete in a 3.5-hour sprint to build and pitch a functional prototype. Top teams win exciting cash prizes.",
    venue: "Main Seminar Hall",
    requirements: "Mandatory project submission on GitHub."
  },
  "Nano Mentoring": {
    description: "1-on-1 personalized review sessions with corporate developers and product leads. Discuss your resume, projects, and career roadmap.",
    venue: "Mentorship Zone (Library Block)",
    requirements: "Prior slot booking required upon arrival."
  },
  "Vibe Check, CS MD Session": {
    description: "A fun community engagement and networking session. Discover global IEEE Computer Society benefits, grant programs, and how to get active.",
    venue: "CS Lounge"
  },
  "Culturals": {
    description: "Performances, live music, and talent showcase prepared by the SCT SB team to celebrate the summit's success.",
    venue: "Central Courtyard"
  },
  "Closing Ceremony": {
    description: "Award distribution for competition winners, distribution of participation certificates, feedback collection, and valedictory address.",
    venue: "Main Seminar Hall"
  }
};

export const Timeline: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'ONLINE' | 'OFFLINE'>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>('13th September');
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({});

  // Helper to convert "13th September" to "13 SEP"
  const formatDateShort = (dateStr: string) => {
    const parts = dateStr.split(' ');
    const num = parts[0].replace('th', '');
    const month = parts[1].substring(0, 3).toUpperCase();
    return `${num} ${month}`;
  };

  // Pre-event and main event date groupings
  const preEventDates = scheduleData.preEvents.map(pe => pe.date);
  const mainEventDates = scheduleData.mainEvents.map(me => me.date);

  const handleFilterChange = (newFilter: 'ALL' | 'ONLINE' | 'OFFLINE') => {
    setFilter(newFilter);
    setExpandedEvents({});
    if (newFilter === 'ONLINE' && !preEventDates.includes(selectedDate)) {
      setSelectedDate(preEventDates[0]);
    } else if (newFilter === 'OFFLINE' && !mainEventDates.includes(selectedDate)) {
      setSelectedDate(mainEventDates[0]);
    }
  };

  const toggleEventDetail = (eventTitle: string) => {
    setExpandedEvents(prev => ({
      ...prev,
      [eventTitle]: !prev[eventTitle]
    }));
  };

  // Get active items based on active date
  const isPreEventActive = preEventDates.includes(selectedDate);
  const activeEventsList = isPreEventActive
    ? scheduleData.preEvents.filter(pe => pe.date === selectedDate).map(pe => ({
        time: "6:00 PM – 7:30 PM", // default time slot for online pre-events
        event: pe.title,
        isParallel: false
      }))
    : scheduleData.mainEvents.find(me => me.date === selectedDate)?.timeline || [];

  // Group events by time slot to identify parallel events
  const groupedEvents: { time: string; items: typeof activeEventsList }[] = [];
  activeEventsList.forEach(item => {
    const existing = groupedEvents.find(g => g.time === item.time);
    if (existing) {
      existing.items.push(item);
    } else {
      groupedEvents.push({ time: item.time, items: [item] });
    }
  });

  const showPreEvents = filter === 'ALL' || filter === 'ONLINE';
  const showMainEvents = filter === 'ALL' || filter === 'OFFLINE';

  return (
    <section id="schedule" className="schedule-section section-padding">
      <div className="container">
        <SectionHeader num="03 / SCHEDULE" title="Event Timeline" />
        
        {/* Schedule Controls */}
        <ScrollReveal className="schedule-controls">
          {/* 1. Subtle Filter */}
          <div className="schedule-filter-group">
            <span className="schedule-filter-label">FILTER</span>
            <div className="schedule-dates-row">
              <button 
                className={`schedule-filter-btn ${filter === 'ALL' ? 'active' : ''}`}
                onClick={() => handleFilterChange('ALL')}
              >
                ALL
              </button>
              <button 
                className={`schedule-filter-btn ${filter === 'ONLINE' ? 'active' : ''}`}
                onClick={() => handleFilterChange('ONLINE')}
              >
                ONLINE
              </button>
              <button 
                className={`schedule-filter-btn ${filter === 'OFFLINE' ? 'active' : ''}`}
                onClick={() => handleFilterChange('OFFLINE')}
              >
                OFFLINE
              </button>
            </div>
          </div>

          {/* 2. Pre-Events Dates */}
          {showPreEvents && (
            <div className="schedule-date-group">
              <span className="schedule-date-label">PRE-EVENTS</span>
              <div className="schedule-dates-row">
                {scheduleData.preEvents.map((pe, idx) => (
                  <button
                    key={idx}
                    className={`schedule-date-btn ${selectedDate === pe.date ? 'active' : ''}`}
                    onClick={() => { setSelectedDate(pe.date); setExpandedEvents({}); }}
                    aria-label={`Select ${pe.date}`}
                  >
                    {formatDateShort(pe.date)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Main Event Dates */}
          {showMainEvents && (
            <div className="schedule-date-group" style={{ borderTop: 'none', paddingTop: 0 }}>
              <span className="schedule-date-label">MAIN EVENT</span>
              <div className="schedule-dates-row">
                {scheduleData.mainEvents.map((me, idx) => (
                  <button
                    key={idx}
                    className={`schedule-date-btn ${selectedDate === me.date ? 'active' : ''}`}
                    onClick={() => { setSelectedDate(me.date); setExpandedEvents({}); }}
                    aria-label={`Select ${me.date}`}
                  >
                    {formatDateShort(me.date)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </ScrollReveal>

        {/* Selected Day's Timeline List */}
        <ScrollReveal className="timeline-flow-list">
          {groupedEvents.map((group, groupIdx) => {
            const hasParallel = group.items.length > 1;

            if (hasParallel) {
              return (
                <div key={groupIdx} className="timeline-parallel-wrapper">
                  <div className="timeline-parallel-time">{group.time}</div>
                  <div className="timeline-parallel-grid">
                    {group.items.map((item, itemIdx) => {
                      const details = eventDetailsMap[item.event];
                      const isOpen = expandedEvents[item.event] || false;
                      
                      return (
                        <button
                          key={itemIdx}
                          className={`timeline-parallel-col ${isOpen ? 'open' : ''}`}
                          onClick={() => toggleEventDetail(item.event)}
                          aria-expanded={isOpen}
                          style={{ border: '1px solid var(--border-color)', display: 'block', width: '100%', font: 'inherit' }}
                        >
                          <div className="parallel-meta">SIMULTANEOUS</div>
                          <h4 className="parallel-title">{item.event}</h4>
                          <p className="parallel-desc" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            {isOpen ? 'Click to collapse description' : 'Click to view details'}
                          </p>
                          
                          <div className={`timeline-event-details ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
                            <div className="timeline-event-details-inner" style={{ paddingLeft: 0 }}>
                              {details?.description && <p style={{ margin: '8px 0 0 0' }}>{details.description}</p>}
                              <div className="timeline-details-card" style={{ padding: '8px', marginTop: '8px' }}>
                                {details?.venue && <div><strong>Venue:</strong> {details.venue}</div>}
                                {details?.organizer && <div><strong>Organizer:</strong> {details.organizer}</div>}
                                {details?.requirements && <div style={{ marginTop: '4px' }}><strong>Requirements:</strong> {details.requirements}</div>}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // Normal timeline row
            const item = group.items[0];
            const details = eventDetailsMap[item.event];
            const isOpen = expandedEvents[item.event] || false;

            return (
              <button
                key={groupIdx}
                className={`timeline-event-row ${isOpen ? 'open' : ''}`}
                onClick={() => toggleEventDetail(item.event)}
                aria-expanded={isOpen}
              >
                <div className="timeline-event-main">
                  <div className="timeline-event-title-block">
                    <span className="timeline-event-time">{group.time}</span>
                    <h4 className="timeline-event-title">{item.event}</h4>
                  </div>
                  <span className="timeline-event-toggle-icon">+</span>
                </div>

                <div className={`timeline-event-details ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
                  <div className="timeline-event-details-inner">
                    {details?.description && <p>{details.description}</p>}
                    {(details?.venue || details?.requirements || details?.organizer) && (
                      <div className="timeline-details-card">
                        {details.venue && <div><strong>Venue:</strong> {details.venue}</div>}
                        {details.organizer && <div><strong>Organizer:</strong> {details.organizer}</div>}
                        {details.requirements && <div style={{ marginTop: '4px' }}><strong>Requirements:</strong> {details.requirements}</div>}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
};
