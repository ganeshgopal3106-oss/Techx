import React, { useState } from 'react';
import { scheduleData } from '../data/schedule';
import { SectionHeader } from './SectionHeader';

export const Timeline: React.FC = () => {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const toggleDay = (date: string) => {
    setExpandedDay(prev => (prev === date ? null : date));
  };

  // Helper to check if a day is Saturday or Sunday
  const getWeekday = (date: string): string => {
    return date.includes('26th') ? 'SATURDAY' : 'SUNDAY';
  };

  const getBriefDescription = (date: string): string => {
    return date.includes('26th') 
      ? 'Workshops, talks, games and interactions.'
      : 'Competitions, mentoring, culturals and closing ceremony.';
  };

  return (
    <section id="schedule" className="schedule-section section-padding">
      <div className="container schedule-container">
        {/* Left Column */}
        <div className="schedule-sidebar">
          <SectionHeader num="03 / SCHEDULE" title="Event Timeline" />
          <p className="schedule-intro">
            A comprehensive upskilling journey featuring pre-events from 13th–19th September followed by the main TECHX REIGNITE programme on 26th–27th September.
          </p>
          <div className="schedule-legend" style={{ borderTop: 'none', paddingTop: 0, marginTop: '24px' }}>
            <div className="legend-item" style={{ marginBottom: '8px' }}>
              <span className="indicator" style={{ backgroundColor: 'var(--border-hover)', width: '8px', height: '8px', marginRight: '8px' }}></span>
              Pre-Events (Online)
            </div>
            <div className="legend-item">
              <span className="indicator" style={{ backgroundColor: 'var(--accent)', width: '8px', height: '8px', marginRight: '8px' }}></span>
              Main Event (Offline)
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="timeline-flow" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          
          {/* 1. Pre-Events Timeline */}
          <div className="timeline-group">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
              <h3 style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.85rem', 
                color: 'var(--accent)', 
                letterSpacing: '0.15em', 
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
                marginRight: '16px'
              }}>
                Pre-Events (13 Sep — 19 Sep)
              </h3>
              <div style={{ flexGrow: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
            </div>
            
            <div className="timeline-container-grid">
              <div className="timeline-vertical-line"></div>
              
              {scheduleData.preEvents.map((pe, idx) => {
                const dateParts = pe.date.split(' '); // e.g. "13th", "September"
                const dateNum = dateParts[0].replace('th', ''); // e.g. "13"
                const monthShort = dateParts[1].substring(0, 3).toUpperCase(); // e.g. "SEP"
                
                return (
                  <div key={idx} className="timeline-row-item-custom">
                    <div className="timeline-dot-custom"></div>
                    <div className="timeline-date-col">
                      {dateNum} {monthShort}
                    </div>
                    <div className="timeline-content-col">
                      <div className="timeline-event-title">{pe.title}</div>
                      <div className="timeline-event-organizer">Organizer: {pe.organizer}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Main Event Timeline */}
          <div className="timeline-group">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
              <h3 style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.85rem', 
                color: 'var(--accent)', 
                letterSpacing: '0.15em', 
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
                marginRight: '16px'
              }}>
                Main Event (Offline)
              </h3>
              <div style={{ flexGrow: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {scheduleData.mainEvents.map((me, idx) => {
                const dateNum = me.date.split('th')[0]; // "26" or "27"
                const weekday = getWeekday(me.date);
                const desc = getBriefDescription(me.date);
                const isExpanded = expandedDay === me.date;

                return (
                  <div key={idx} style={{ 
                    border: '1px solid var(--border-color)', 
                    borderRadius: 'var(--radius-sm)',
                    padding: '24px',
                    transition: 'border-color var(--transition-normal)'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '16px'
                    }}>
                      {/* Left: Date number & details */}
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ 
                          fontSize: '3rem', 
                          fontWeight: '850', 
                          color: 'var(--accent)', 
                          lineHeight: '1',
                          fontFamily: 'var(--font-sans)'
                        }}>
                          {dateNum}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
                            SEPTEMBER
                          </div>
                          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                            {weekday}
                          </div>
                        </div>
                      </div>

                      {/* Center: Brief text */}
                      <div style={{ 
                        flexGrow: 1, 
                        maxWidth: '320px', 
                        fontSize: '0.9rem', 
                        color: 'var(--text-secondary)',
                        lineHeight: '1.5'
                      }}>
                        {desc}
                      </div>

                      {/* Right: Expand Trigger */}
                      <button 
                        onClick={() => toggleDay(me.date)}
                        className="btn btn-secondary"
                        style={{ height: '36px', padding: '0 16px', fontSize: '0.75rem' }}
                      >
                        {isExpanded ? 'CLOSE SCHEDULE ↑' : 'VIEW SCHEDULE →'}
                      </button>
                    </div>

                    {/* Detailed Timeline Slices */}
                    {isExpanded && (
                      <div style={{ 
                        marginTop: '24px', 
                        paddingTop: '24px', 
                        borderTop: '1px dashed var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}>
                        {me.timeline.map((item, itemIdx) => (
                          <div key={itemIdx} style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px 0',
                            borderBottom: itemIdx === me.timeline.length - 1 ? 'none' : '1px solid rgba(59, 36, 20, 0.08)',
                            gap: '16px'
                          }}>
                            <div className="timeline-sub-time" style={{ width: '160px', fontWeight: 'bold', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                              {item.time}
                            </div>
                            <div className="timeline-sub-content" style={{ 
                              flexGrow: 1, 
                              flexDirection: 'row', 
                              alignItems: 'center', 
                              justifyContent: 'space-between', 
                              gap: '12px',
                              display: 'flex',
                              width: '100%'
                            }}>
                              <h4 className="timeline-sub-title" style={{ fontSize: '0.9rem', margin: 0, fontWeight: '600', color: 'var(--text-primary)' }}>
                                {item.event}
                              </h4>
                              {item.isParallel && (
                                <span className="badge" style={{ fontSize: '0.65rem', padding: '2px 8px', color: 'var(--accent)', borderColor: 'var(--accent)' }}>
                                  Parallel Session
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
