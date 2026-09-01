import React, { useState } from 'react';
import { scheduleData } from '../data/schedule';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

type TimelineFilter = 'ALL' | 'PRE-EVENTS' | 'MAIN EVENT';

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
    description: "Final capstone hackathon and coding project evaluation. Put everything you learned during the sessions to the test in front of a jury panel.",
    venue: "Main Computer Center",
    requirements: "Team submissions by 12:30 PM."
  },
  "Nano Mentoring": {
    description: "Personalized 1-on-1 mentoring sessions where students sit with young engineering professionals for direct career guidance, portfolio reviews, and mock question drills.",
    venue: "Mentorship Zone (Classrooms 101–104)"
  },
  "Vibe Check, CS MD Session": {
    description: "Interactive IEEE Computer Society Membership Development (CS MD) community networking session. Open conversations, lightning talks, and community insights.",
    venue: "CS Lounge"
  },
  "Culturals": {
    description: "Live musical performances, student showcases, and cultural acts to celebrate the conclusion of TECHX.",
    venue: "Open Air Auditorium"
  },
  "Closing Ceremony": {
    description: "Award distribution for competition winners, certificate presentations, and closing remarks by the IEEE organizing committee.",
    venue: "Main Seminar Hall"
  }
};

const allDates = [
  { id: "13th September", short: "13 SEP", type: "PRE-EVENT", title: "Online Workshop" },
  { id: "14th September", short: "14 SEP", type: "PRE-EVENT", title: "BlindScript" },
  { id: "15th September", short: "15 SEP", type: "PRE-EVENT", title: "AI in HealthCare" },
  { id: "16th September", short: "16 SEP", type: "PRE-EVENT", title: "Competition" },
  { id: "17th September", short: "17 SEP", type: "PRE-EVENT", title: "CypherX" },
  { id: "19th September", short: "19 SEP", type: "PRE-EVENT", title: "ADAS — The Future of Driving" },
  { id: "26th September", short: "26 SEP", type: "MAIN EVENT", title: "Day 01 — Workshops & Talks" },
  { id: "27th September", short: "27 SEP", type: "MAIN EVENT", title: "Day 02 — Sprints & Mentoring" }
];

export const Timeline: React.FC = () => {
  const [filter, setFilter] = useState<TimelineFilter>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>("26th September");
  const [expandedSlots, setExpandedSlots] = useState<Record<string, boolean>>({});

  const toggleSlot = (key: string) => {
    setExpandedSlots(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredDates = allDates.filter(d => {
    if (filter === 'PRE-EVENTS') return d.type === 'PRE-EVENT';
    if (filter === 'MAIN EVENT') return d.type === 'MAIN EVENT';
    return true;
  });

  const isSelectedPreEvent = scheduleData.preEvents.some(pe => pe.date === selectedDate);
  const selectedPreEvent = scheduleData.preEvents.find(pe => pe.date === selectedDate);
  const selectedMainEvent = scheduleData.mainEvents.find(me => me.date === selectedDate);

  return (
    <section id="schedule" className="schedule-section section-padding blueprint-circuit-bg" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader num="03 / SCHEDULE" title="Interactive Timeline" />
        
        {/* Filter Controls & Circuit Bus Header */}
        <ScrollReveal className="circuit-bus-header">
          <span className="blueprint-tag">[ BUS // CIRCUIT ROUTE ]</span>
          <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
            {(['ALL', 'PRE-EVENTS', 'MAIN EVENT'] as TimelineFilter[]).map((f) => (
              <button
                key={f}
                className={`schedule-filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => {
                  setFilter(f);
                  if (f === 'PRE-EVENTS' && !isSelectedPreEvent) {
                    setSelectedDate("13th September");
                  } else if (f === 'MAIN EVENT' && isSelectedPreEvent) {
                    setSelectedDate("26th September");
                  }
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Continuous Interactive Circuit Track */}
        <ScrollReveal>
          <div className="circuit-track-line" role="tablist" aria-label="Event Dates Circuit">
            {filteredDates.map((dateObj) => {
              const isActive = selectedDate === dateObj.id;
              return (
                <button
                  key={dateObj.id}
                  className={`circuit-node-button ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedDate(dateObj.id)}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={dateObj.id}
                >
                  <div className="circuit-node-point" />
                  <span className="circuit-node-date">{dateObj.short}</span>
                  <span style={{ fontSize: '0.65rem', color: isActive ? 'var(--accent)' : 'var(--text-muted)', textTransform: 'uppercase', marginTop: '2px' }}>
                    {dateObj.type === 'PRE-EVENT' ? 'Online' : 'Main'}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Selected Date Event Content Panel */}
        <ScrollReveal className="circuit-details-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-sm)' }}>
            <div>
              <span className="blueprint-tag">DATE // {selectedDate}</span>
              <h3 style={{ fontSize: '1.4rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                {isSelectedPreEvent ? selectedPreEvent?.title : selectedMainEvent?.date}
              </h3>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '4px 10px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '2px', color: 'var(--accent)', fontWeight: 700 }}>
              {isSelectedPreEvent ? 'ONLINE PRE-EVENT' : 'OFFLINE MAIN SUMMIT'}
            </span>
          </div>

          {/* If Pre-Event Selected */}
          {isSelectedPreEvent && selectedPreEvent && (
            <div style={{ padding: 'var(--space-md) 0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-md)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                  <div className="blueprint-tag">ORGANIZER</div>
                  <div style={{ fontWeight: 700, marginTop: '4px', color: 'var(--text-primary)' }}>{selectedPreEvent.organizer}</div>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-md)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                  <div className="blueprint-tag">PLATFORM / VENUE</div>
                  <div style={{ fontWeight: 700, marginTop: '4px', color: 'var(--text-primary)' }}>
                    {eventDetailsMap[selectedPreEvent.title]?.venue || 'Online Virtual Meeting'}
                  </div>
                </div>
              </div>

              <p style={{ marginTop: 'var(--space-md)', color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {eventDetailsMap[selectedPreEvent.title]?.description}
              </p>
              {eventDetailsMap[selectedPreEvent.title]?.requirements && (
                <div style={{ marginTop: 'var(--space-sm)', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  REQUIREMENT: {eventDetailsMap[selectedPreEvent.title]?.requirements}
                </div>
              )}
            </div>
          )}

          {/* If Main Event Selected */}
          {!isSelectedPreEvent && selectedMainEvent && (
            <div className="main-event-schedule-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedDate === "27th September" ? (
                /* 27 September with Parallel Split Circuit */
                <>
                  <div className="timeline-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)' }}>09:30 AM – 01:00 PM</span>
                      <span className="badge">OFFLINE SPRINT</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', margin: '4px 0' }}>Competition (based on workshop)</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{eventDetailsMap["Competition (based on workshop)"]?.description}</p>
                  </div>

                  <div className="timeline-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>01:00 PM – 02:00 PM</span>
                    <div style={{ fontWeight: 600, fontSize: '1rem', margin: '4px 0' }}>Lunch Break</div>
                  </div>

                  {/* PARALLEL CIRCUIT BRANCH (2:00 PM – 4:00 PM) */}
                  <div style={{ margin: 'var(--space-sm) 0', padding: 'var(--space-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span className="blueprint-tag">[ BRANCH // PARALLEL SESSIONS ]</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)' }}>02:00 PM – 04:00 PM</span>
                    </div>

                    <div className="circuit-branch-container">
                      {/* Branch 1: Nano Mentoring */}
                      <div style={{ background: 'var(--bg-primary)', padding: 'var(--space-md)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                        <span className="blueprint-tag">BRANCH A // MENTORSHIP</span>
                        <div style={{ fontWeight: 800, fontSize: '1.05rem', marginTop: '4px', color: 'var(--text-primary)' }}>
                          Nano Mentoring
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.5' }}>
                          {eventDetailsMap["Nano Mentoring"]?.description}
                        </p>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
                          VENUE: {eventDetailsMap["Nano Mentoring"]?.venue}
                        </div>
                      </div>

                      {/* Branch 2: Vibe Check */}
                      <div style={{ background: 'var(--bg-primary)', padding: 'var(--space-md)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                        <span className="blueprint-tag">BRANCH B // CS MD SESSION</span>
                        <div style={{ fontWeight: 800, fontSize: '1.05rem', marginTop: '4px', color: 'var(--text-primary)' }}>
                          Vibe Check, CS MD Session
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.5' }}>
                          {eventDetailsMap["Vibe Check, CS MD Session"]?.description}
                        </p>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
                          VENUE: {eventDetailsMap["Vibe Check, CS MD Session"]?.venue}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>04:00 PM – 04:30 PM</span>
                    <div style={{ fontWeight: 600, fontSize: '1rem', margin: '4px 0' }}>Break & Refreshments</div>
                  </div>

                  <div className="timeline-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)' }}>04:30 PM – 05:30 PM</span>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', margin: '4px 0' }}>Culturals</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{eventDetailsMap["Culturals"]?.description}</p>
                  </div>

                  <div className="timeline-item">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)' }}>05:30 PM – 06:30 PM</span>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', margin: '4px 0' }}>Closing Ceremony & Awards</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{eventDetailsMap["Closing Ceremony"]?.description}</p>
                  </div>
                </>
              ) : (
                /* 26 September Schedule */
                selectedMainEvent.timeline.map((item, idx) => {
                  const key = `26-${idx}`;
                  const isExpanded = expandedSlots[key];
                  const details = eventDetailsMap[item.event];

                  return (
                    <div 
                      key={idx} 
                      className="timeline-item" 
                      onClick={() => toggleSlot(key)}
                      style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', cursor: details ? 'pointer' : 'default' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: item.time.includes('9:30') || item.time.includes('10:30') || item.time.includes('2:00') ? 'var(--accent)' : 'var(--text-muted)' }}>
                          {item.time}
                        </span>
                        {details && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                            {isExpanded ? '− LESS' : '+ DETAILS'}
                          </span>
                        )}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '1.05rem', margin: '4px 0', color: 'var(--text-primary)' }}>
                        {item.event}
                      </div>
                      {isExpanded && details && (
                        <div style={{ marginTop: '8px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{details.description}</p>
                          {details.venue && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                              VENUE: {details.venue}
                            </div>
                          )}
                          {details.requirements && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                              REQUIREMENT: {details.requirements}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};
