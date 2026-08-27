import React, { useState } from 'react';
import { tracksData } from '../data/tracks';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

const trackDetailsMap: Record<string, { learn: string[], info: { label: string, val: string }[] }> = {
  "tech-workshops": {
    learn: [
      "Build responsive and interactive front-ends using modern frameworks.",
      "Set up scalable REST API backends and connect them to databases.",
      "Deploy applications to production hosting platforms.",
      "Collaborate effectively in agile team code repositories."
    ],
    info: [
      { label: "Format", val: "Offline / Hands-on Sprints" },
      { label: "Date & Time", val: "26 Sep, 10:30 AM – 3:30 PM" },
      { label: "Venue", val: "Lab 3, Computer Science Block" },
      { label: "Requirements", val: "Bring a fully-charged laptop with Git and Node.js installed" }
    ]
  },
  "tech-talks": {
    learn: [
      "Understand key ADAS sensors: Lidar, Radar, and camera visual processing pipelines.",
      "Examine how convolutional neural networks interpret medical imagery for diagnostics.",
      "Explore autonomous vehicle localization and path-planning algorithms.",
      "Discuss career pathways in AI research and automotive safety engineering."
    ],
    info: [
      { label: "Format", val: "Offline / Expert Talk Sessions" },
      { label: "Date & Time", val: "26 Sep, Time-slots scheduled dynamically" },
      { label: "Venue", val: "Main Seminar Hall" },
      { label: "Host", val: "IEEE CS SCT Student Branch Chapter" }
    ]
  },
  "train-softskills": {
    learn: [
      "Draft high-impact technical resumes that pass recruiter ATS screenings.",
      "Optimize your LinkedIn and GitHub profiles for discoverability.",
      "Practice elevator pitches and technical communication during placement interviews.",
      "Navigate salary negotiations and corporate transition challenges."
    ],
    info: [
      { label: "Format", val: "Offline / Interactive Training" },
      { label: "Date & Time", val: "26 Sep, 3:30 PM – 4:30 PM" },
      { label: "Venue", val: "Auditorium Annex" },
      { label: "Recommended for", val: "Pre-final & final year engineering students" }
    ]
  },
  "train-mentoring": {
    learn: [
      "Obtain direct portfolio feedback on your projects from active developers.",
      "Map out your technical upskilling roadmap for the next 12–24 months.",
      "Learn how to apply to remote internships and open source opportunities.",
      "Ask questions about engineering culture and corporate career growth."
    ],
    info: [
      { label: "Format", val: "Offline / 1-on-1 Mentorship Slices" },
      { label: "Date & Time", val: "27 Sep, 2:00 PM – 4:00 PM (Simultaneous block)" },
      { label: "Venue", val: "Mentorship Hub, Central Library" },
      { label: "Booking", val: "Limited slots; pre-book upon arrival on Day 1" }
    ]
  }
};

export const TracksSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'TECH' | 'TRAIN'>('TECH');
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);

  const filteredTracks = tracksData.filter(track => {
    if (activeTab === 'TECH') {
      return track.id.startsWith('tech');
    } else {
      return track.id.startsWith('train');
    }
  });

  const handleToggleTrack = (trackId: string) => {
    setActiveTrackId(prev => (prev === trackId ? null : trackId));
  };

  const handleTabChange = (tab: 'TECH' | 'TRAIN') => {
    setActiveTab(tab);
    setActiveTrackId(null); // Reset open track when switching tabs
  };

  return (
    <section id="tracks" className="tracks-section section-padding">
      <div className="container">
        <SectionHeader num="02 / TRACKS" title="Explore The Tracks" />
        
        {/* Toggle Switch */}
        <ScrollReveal>
          <div className="tracks-toggle-bar">
            <button 
              className={`toggle-btn ${activeTab === 'TECH' ? 'active' : ''}`}
              onClick={() => handleTabChange('TECH')}
              aria-label="Show Tech Tracks"
            >
              TECH
            </button>
            <button 
              className={`toggle-btn ${activeTab === 'TRAIN' ? 'active' : ''}`}
              onClick={() => handleTabChange('TRAIN')}
              aria-label="Show Train Tracks"
            >
              TRAIN
            </button>
          </div>
        </ScrollReveal>

        {/* Tracks List */}
        <ScrollReveal className="tracks-grid">
          {filteredTracks.map((track) => {
            const isOpen = activeTrackId === track.id;
            const details = trackDetailsMap[track.id];
            
            return (
              <React.Fragment key={track.id}>
                {/* Track Row (renders as button for accessibility) */}
                <button
                  className="track-row-item"
                  onClick={() => handleToggleTrack(track.id)}
                  aria-expanded={isOpen}
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid var(--border-color)' }}
                >
                  <div className="track-number">{track.num}</div>
                  <h3 className="track-name">{track.name}</h3>
                  <div className="track-badge-container">
                    <span className="badge track-badge">{track.badge}</span>
                  </div>
                  <p className="track-description">{track.description}</p>
                  <div className="track-footer">
                    <span className="track-link" style={{ pointerEvents: 'none' }}>
                      {isOpen ? 'Close Details' : 'Explore'} <span className="arrow">→</span>
                    </span>
                  </div>
                </button>

                {/* Detailed Drawer */}
                <div className={`track-details-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
                  <div className="track-details-inner">
                    <div className="track-details-columns">
                      {/* Left Column: Learning outcomes */}
                      <div>
                        <h4 className="track-details-title">WHAT YOU WILL LEARN</h4>
                        <ul className="track-learn-list">
                          {details?.learn.map((item, idx) => (
                            <li key={idx} className="track-learn-item">
                              <span className="track-learn-bullet"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Column: Relevant schedule & venue info */}
                      <div>
                        <h4 className="track-details-title">TRACK INFORMATION</h4>
                        <div className="track-info-panel">
                          {details?.info.map((item, idx) => (
                            <div key={idx} className="track-info-row">
                              <div className="track-info-label">{item.label}</div>
                              <div className="track-info-val">{item.val}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="track-details-actions">
                      <a href="/register" className="btn btn-primary" style={{ height: '36px', padding: '0 16px', fontSize: '0.75rem' }}>
                        Register for Pass
                      </a>
                      <button 
                        className="btn btn-secondary" 
                        onClick={() => handleToggleTrack(track.id)}
                        style={{ height: '36px', padding: '0 16px', fontSize: '0.75rem' }}
                      >
                        Close [x]
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
};
