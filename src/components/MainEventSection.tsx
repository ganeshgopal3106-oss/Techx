import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

export const MainEventSection: React.FC = () => {
  const [activeDay, setActiveDay] = useState<'26' | '27'>('26');

  return (
    <section id="schedule" className="main-event-section section-padding blueprint-circuit-bg" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader num="06 / MAIN EVENT" title="The Flagship Summit (26 — 27 September 2026)" />

        {/* Date Selector Tabs */}
        <ScrollReveal>
          <div className="main-event-dates-tabs" role="tablist" aria-label="Summit Schedule Days">
            <button
              className={`main-event-date-tab ${activeDay === '26' ? 'active' : ''}`}
              onClick={() => setActiveDay('26')}
              role="tab"
              aria-selected={activeDay === '26'}
            >
              DAY 01 // 26 SEPTEMBER (Workshops & Talks)
            </button>
            <button
              className={`main-event-date-tab ${activeDay === '27' ? 'active' : ''}`}
              onClick={() => setActiveDay('27')}
              role="tab"
              aria-selected={activeDay === '27'}
            >
              DAY 02 // 27 SEPTEMBER (Sprints & Mentoring)
            </button>
          </div>
        </ScrollReveal>

        {/* Day Itinerary with Staggered Cascading Items */}
        <ScrollReveal className="main-event-day-pane">
          {activeDay === '26' ? (
            /* Day 01: 26 September */
            <div key="day-26-itinerary" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="timeline-item tab-animated-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)' }}>09:30 AM – 10:30 AM</span>
                  <span className="badge">SEMINAR HALL</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', margin: '4px 0', color: 'var(--text-primary)' }}>Inauguration Ceremony</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Welcome address by college leadership and senior IEEE Computer Society dignitaries.</p>
              </div>

              <div className="timeline-item tab-animated-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)' }}>10:30 AM – 01:00 PM</span>
                  <span className="badge">COMPUTER LABS 2 & 3</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', margin: '4px 0', color: 'var(--text-primary)' }}>Workshop Session I (2 Tracks)</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Parallel hands-on sprints: Full-stack Development & Advanced IoT Systems.</p>
              </div>

              <div className="timeline-item tab-animated-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>01:00 PM – 02:00 PM</span>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', margin: '4px 0' }}>Lunch Break & Networking</div>
              </div>

              <div className="timeline-item tab-animated-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)' }}>02:00 PM – 03:30 PM</span>
                  <span className="badge">LAB SPRINTS</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', margin: '4px 0', color: 'var(--text-primary)' }}>Workshop Session II</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Project implementation, debugging labs, and preparation for tomorrow's competition.</p>
              </div>

              <div className="timeline-item tab-animated-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)' }}>03:30 PM – 04:30 PM</span>
                  <span className="badge">AUDITORIUM ANNEX</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', margin: '4px 0', color: 'var(--text-primary)' }}>Soft Skills Talk Session</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Interview strategies, resume polishing, and placement communication keys.</p>
              </div>

              <div className="timeline-item tab-animated-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>04:30 PM – 05:00 PM</span>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', margin: '4px 0' }}>Tea Break & Interaction</div>
              </div>

              <div className="timeline-item tab-animated-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)' }}>05:00 PM – 06:30 PM</span>
                  <span className="badge">LOBBY</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', margin: '4px 0', color: 'var(--text-primary)' }}>Tech Games & Icebreakers</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Interactive quizzes, lightning challenges, and exclusive goodies.</p>
              </div>
            </div>
          ) : (
            /* Day 02: 27 September with Parallel Split Circuit */
            <div key="day-27-itinerary" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="timeline-item tab-animated-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)' }}>09:30 AM – 01:00 PM</span>
                  <span className="badge">MAIN LABS</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', margin: '4px 0', color: 'var(--text-primary)' }}>Competition (Based on Workshop)</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Capstone hackathon evaluation where teams build solutions judged by industry experts.</p>
              </div>

              <div className="timeline-item tab-animated-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>01:00 PM – 02:00 PM</span>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', margin: '4px 0' }}>Lunch Break</div>
              </div>

              {/* PARALLEL CIRCUIT BRANCH (2:00 PM – 4:00 PM) */}
              <div className="tab-animated-item" style={{ margin: 'var(--space-sm) 0', padding: 'var(--space-lg)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span className="blueprint-tag">[ SCHEMATIC // PARALLEL BRANCH ]</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent)' }}>02:00 PM – 04:00 PM</span>
                </div>

                <div className="circuit-branch-container">
                  {/* Branch A: Nano Mentoring */}
                  <div style={{ background: 'var(--bg-primary)', padding: 'var(--space-md)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                    <span className="blueprint-tag">BRANCH 01 // MENTORSHIP</span>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', marginTop: '6px', color: 'var(--text-primary)' }}>
                      Nano Mentoring
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>
                      Personalized 1-on-1 counseling pods with distinguished industry mentors for portfolio reviews and career roadmapping.
                    </p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '10px' }}>
                      VENUE: Classrooms 101–104
                    </div>
                  </div>

                  {/* Branch B: Vibe Check */}
                  <div style={{ background: 'var(--bg-primary)', padding: 'var(--space-md)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                    <span className="blueprint-tag">BRANCH 02 // CS MD SESSION</span>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', marginTop: '6px', color: 'var(--text-primary)' }}>
                      Vibe Check / CS MD Session
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>
                      Interactive Computer Society Membership Development networking session with open mic talks and community activities.
                    </p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '10px' }}>
                      VENUE: CS Lounge
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item tab-animated-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>04:00 PM – 04:30 PM</span>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', margin: '4px 0' }}>Break & Refreshments</div>
              </div>

              <div className="timeline-item tab-animated-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)' }}>04:30 PM – 05:30 PM</span>
                  <span className="badge">AUDITORIUM</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', margin: '4px 0', color: 'var(--text-primary)' }}>Culturals</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Live performances and student showcases to celebrate the summit conclusion.</p>
              </div>

              <div className="timeline-item tab-animated-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)' }}>05:30 PM – 06:30 PM</span>
                  <span className="badge">MAIN HALL</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', margin: '4px 0', color: 'var(--text-primary)' }}>Closing Ceremony & Awards</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Presentation of winner awards, participation certs, and valedictory address.</p>
              </div>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};
