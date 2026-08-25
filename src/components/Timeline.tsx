import React from 'react';
import { scheduleData } from '../data/schedule';
import { SectionHeader } from './SectionHeader';

export const Timeline: React.FC = () => {
  return (
    <section id="schedule" className="schedule-section section-padding">
      <div className="container schedule-container">
        {/* Sidebar */}
        <div className="schedule-sidebar">
          <SectionHeader num="03 / SCHEDULE" title="Event Timeline" />
          <p className="schedule-intro">
            A comprehensive upskilling journey featuring pre-events from 13th–19th September followed by the main TECHX REIGNITE programme on 26th–27th September.
          </p>
          <div className="schedule-legend">
            <span className="legend-item">
              <span className="indicator online" style={{ border: '1px solid var(--border-color)', backgroundColor: 'transparent' }}></span>
              Online Pre-Events
            </span>
            <span className="legend-item">
              <span className="indicator offline" style={{ backgroundColor: 'var(--accent)' }}></span>
              Offline Main Event
            </span>
          </div>
        </div>

        {/* Timeline Flow */}
        <div className="timeline-flow" style={{ borderLeft: 'none', paddingLeft: 0, marginLeft: 0 }}>
          {/* A. Pre-Events */}
          <div className="timeline-group" style={{ marginBottom: '48px' }}>
            <h3 className="timeline-group-title" style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.8rem', 
              color: 'var(--accent)', 
              letterSpacing: '0.15em', 
              borderBottom: '1px solid var(--border-color)', 
              paddingBottom: '8px', 
              marginBottom: '24px', 
              textTransform: 'uppercase' 
            }}>
              Pre-Events (13 Sep – 19 Sep)
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {scheduleData.preEvents.map((pe, idx) => (
                <div key={idx} className="timeline-day-block">
                  <div className="timeline-day-header" style={{ marginBottom: '8px' }}>
                    <div className="timeline-day-number" style={{ fontSize: '0.95rem' }}>{pe.date}</div>
                    <span className="timeline-day-badge badge-online">ONLINE PRE-EVENT</span>
                  </div>
                  <div className="timeline-day-body" style={{ padding: '16px' }}>
                    <h4 className="timeline-day-title" style={{ fontSize: '1.15rem', marginBottom: '4px' }}>{pe.title}</h4>
                    <p className="timeline-day-desc" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      Organizer: {pe.organizer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* B. Main Events */}
          <div className="timeline-group">
            <h3 className="timeline-group-title" style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.8rem', 
              color: 'var(--accent)', 
              letterSpacing: '0.15em', 
              borderBottom: '1px solid var(--border-color)', 
              paddingBottom: '8px', 
              marginBottom: '24px', 
              textTransform: 'uppercase' 
            }}>
              Main Event (26 Sep – 27 Sep)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {scheduleData.mainEvents.map((me, idx) => (
                <div key={idx} className="timeline-day-block">
                  <div className="timeline-day-header" style={{ marginBottom: '12px' }}>
                    <div className="timeline-day-number" style={{ fontSize: '1.15rem' }}>{me.date}</div>
                    <span className="timeline-day-badge badge-offline">OFFLINE MAIN PROGRAMME</span>
                  </div>

                  <div className="timeline-day-body" style={{ padding: '20px' }}>
                    <div className="timeline-sub-events-list" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
                      {me.timeline.map((item, itemIdx) => (
                        <div key={itemIdx} className="timeline-sub-event" style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 0',
                          borderBottom: itemIdx === me.timeline.length - 1 ? 'none' : '1px solid var(--border-color)',
                          gap: '16px'
                        }}>
                          <div className="timeline-sub-time" style={{ width: '180px', fontWeight: 'bold', fontSize: '0.85rem' }}>
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
                            <h4 className="timeline-sub-title" style={{ fontSize: '0.9rem', margin: 0 }}>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
