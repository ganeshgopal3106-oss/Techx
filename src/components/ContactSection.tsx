import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mailtoieeesctsb@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="contact-section section-padding blueprint-circuit-bg" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader num="10 / CONTACT & VENUE" title="Get In Touch & Visit SCTCE" />

        <ScrollReveal>
          <div className="contact-section-grid">
            {/* Left Column: Campus Venue & Organizer Coordinates */}
            <div className="venue-card" style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-card)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="blueprint-tag">[ LOCATION // CAMPUS ]</span>
                  <a
                    href="https://maps.google.com/?q=Sree+Chitra+Thirunal+College+of+Engineering+Thiruvananthapuram"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.74rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-glass)'
                    }}
                  >
                    <span>OPEN IN MAPS</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                  </a>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', margin: '8px 0 6px', color: 'var(--text-primary)' }}>
                  SCT College of Engineering
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                  NH 66, CTO Colony, Pappanamcode, Thiruvananthapuram, Kerala 695018
                </p>
              </div>

              {/* Transit Distance Chips */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '8px',
                padding: '10px 0'
              }}>
                <div style={{
                  padding: '8px 10px',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="16" rx="2" /><line x1="4" y1="11" x2="20" y2="11" /><line x1="8" y1="15" x2="8" y2="15.01" /><line x1="16" y1="15" x2="16" y2="15.01" /></svg>
                  <div style={{ lineHeight: 1.2 }}>
                    <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>RAILWAY (TVC)</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>6.5 km away</div>
                  </div>
                </div>

                <div style={{
                  padding: '8px 10px',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" /></svg>
                  <div style={{ lineHeight: 1.2 }}>
                    <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>AIRPORT (TRV)</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>12.2 km away</div>
                  </div>
                </div>

                <div style={{
                  padding: '8px 10px',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.9 2 11.2 2 11.5V16c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>
                  <div style={{ lineHeight: 1.2 }}>
                    <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>BUS TERMINAL</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>300 m walk</div>
                  </div>
                </div>
              </div>

              {/* Google Map Embed of SCTCE */}
              <iframe
                title="SCTCE Campus Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1087.1118851564481!2d76.97857658187175!3d8.470231553187036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05baee56e6b99b%3A0x4ce024c88eb0ddcb!2sSree%20Chitra%20Thirunal%20College%20of%20Engineering%2C%20Thiruvananthapuram!5e0!3m2!1sen!2sin!4v1711636446051!5m2!1sen!2sin"
                className="venue-map-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Official Branch Contact Info */}
              <div className="contact-info-block">
                <div className="contact-info-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="contact-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <div>
                      <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>OFFICIAL EMAIL</div>
                      <a href="mailto:mailtoieeesctsb@gmail.com" style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.88rem' }}>
                        mailtoieeesctsb@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    style={{
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: copiedEmail ? '#22c55e' : 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    {copiedEmail ? 'COPIED' : 'COPY'}
                  </button>
                </div>

                <div className="contact-info-row" style={{ alignItems: 'center', marginTop: '6px' }}>
                  <span className="contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </span>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>STUDENT BRANCH CHAPTER</div>
                    <a href="https://ieeesctsb.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.88rem' }}>
                      ieeesctsb.org ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact & Query Form */}
            <div className="card" style={{
              padding: 'var(--space-xl)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-card)'
            }}>
              <span className="blueprint-tag">[ TRANSMISSION // INQUIRY ]</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', margin: '4px 0 16px', color: 'var(--text-primary)' }}>
                Send A Message
              </h3>

              {isSubmitted ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-xl) 0' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', border: '2px solid var(--accent)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>Message Transmitted</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '8px' }}>
                    Thank you, <strong>{formData.name}</strong>. Our student branch organizing committee will review your transmission and respond to <strong>{formData.email}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="btn btn-secondary"
                    style={{ marginTop: '16px', height: '38px', padding: '0 16px', fontSize: '0.8rem' }}
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contactName">Your Name *</label>
                    <input
                      id="contactName"
                      type="text"
                      className="form-input"
                      placeholder="Jane Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      style={{ background: 'var(--bg-glass)' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contactEmail">Email Address *</label>
                    <input
                      id="contactEmail"
                      type="email"
                      className="form-input"
                      placeholder="jane.doe@university.edu"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      style={{ background: 'var(--bg-glass)' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contactSubject">Subject</label>
                    <input
                      id="contactSubject"
                      type="text"
                      className="form-input"
                      placeholder="Track inquiry / Accommodation / Tickets"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      style={{ background: 'var(--bg-glass)' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contactMessage">Message *</label>
                    <textarea
                      id="contactMessage"
                      className="form-input"
                      rows={4}
                      placeholder="How can our organizing team assist your participation?"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      style={{ resize: 'vertical', background: 'var(--bg-glass)' }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-shimmer" style={{ height: '46px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span>Transmit Message</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
