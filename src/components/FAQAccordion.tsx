import React, { useState, useMemo } from 'react';
import { faqData, type FAQItem } from '../data/faq';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

interface FAQAccordionProps {
  allowMultipleOpen?: boolean;
}

type FAQCategory = 'All' | 'General' | 'Registration' | 'Event & Tracks' | 'Logistics';

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ allowMultipleOpen = false }) => {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [singleOpenId, setSingleOpenId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('All');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const categories: FAQCategory[] = ['All', 'General', 'Registration', 'Event & Tracks', 'Logistics'];

  const filteredItems = useMemo(() => {
    return faqData.filter((item: FAQItem) => {
      const matchesCat = activeCategory === 'All' || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleItem = (id: string) => {
    if (allowMultipleOpen) {
      if (openIds.includes(id)) {
        setOpenIds(openIds.filter(item => item !== id));
      } else {
        setOpenIds([...openIds, id]);
      }
    } else {
      setSingleOpenId(singleOpenId === id ? null : id);
    }
  };

  const isItemOpen = (id: string) => {
    return allowMultipleOpen ? openIds.includes(id) : singleOpenId === id;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mailtoieeesctsb@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleExpandAll = () => {
    const allIds = filteredItems.map(item => item.id);
    setOpenIds(allIds);
  };

  const handleCollapseAll = () => {
    setOpenIds([]);
    setSingleOpenId(null);
  };

  return (
    <section id="faq" className="faq-section section-padding">
      <div className="container faq-container">
        <ScrollReveal className="faq-sidebar">
          <SectionHeader num="05 / FAQ" title="Frequently Asked Questions" />
          <p className="faq-intro">
            Find answers to common questions about schedules, team configurations, venues, and registration criteria.
          </p>

          <div className="faq-support-box" style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="support-label" style={{ margin: 0 }}>Need direct support?</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: copiedEmail ? '#22c55e' : 'var(--accent)',
                  cursor: 'pointer',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    COPIED
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                    COPY
                  </>
                )}
              </button>
            </div>
            <a href="mailto:mailtoieeesctsb@gmail.com" className="support-email">
              mailtoieeesctsb@gmail.com
            </a>
          </div>

          <div style={{
            marginTop: '20px',
            padding: '14px 16px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 600, fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
              QUICK TIP
            </div>
            <span>Use the search filter above questions or click categories to quickly find track prerequisites and team matching guidelines.</span>
          </div>
        </ScrollReveal>

        <div className="faq-main-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Search bar & Category chips */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. laptop, price, SCTCE, team)..."
                aria-label="Search frequently asked questions"
                style={{
                  width: '100%',
                  padding: '10px 38px 10px 38px',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                  fontFamily: 'inherit',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search input"
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    padding: '2px'
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category chips + stats */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '100px',
                      fontSize: '0.76rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: activeCategory === cat ? 700 : 500,
                      cursor: 'pointer',
                      border: activeCategory === cat ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                      background: activeCategory === cat ? 'var(--accent)' : 'transparent',
                      color: activeCategory === cat ? '#0d1117' : 'var(--text-secondary)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                <span>{filteredItems.length} {filteredItems.length === 1 ? 'RESULT' : 'RESULTS'}</span>
                {allowMultipleOpen && (
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={handleExpandAll}
                      style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.72rem', textDecoration: 'underline' }}
                    >
                      Expand All
                    </button>
                    <span>/</span>
                    <button
                      type="button"
                      onClick={handleCollapseAll}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.72rem', textDecoration: 'underline' }}
                    >
                      Collapse
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <ScrollReveal className="faq-list" variant="stagger" staggerDelay={40}>
            {filteredItems.length === 0 ? (
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                border: '1px dashed var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-muted)'
              }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  No questions match your query &quot;{searchQuery}&quot;
                </p>
                <p style={{ margin: 0, fontSize: '0.85rem' }}>
                  Try a different search keyword or switch the category filter to &quot;All&quot;.
                </p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  style={{
                    marginTop: '16px',
                    padding: '6px 14px',
                    border: '1px solid var(--accent)',
                    background: 'transparent',
                    color: 'var(--accent)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  RESET SEARCH
                </button>
              </div>
            ) : (
              filteredItems.map((item) => {
                const isOpen = isItemOpen(item.id);
                return (
                  <div 
                    key={item.id} 
                    className={`faq-item ${isOpen ? 'open' : ''}`}
                  >
                    <button 
                      className="faq-trigger" 
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                        <span style={{
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          color: 'var(--accent)',
                          fontWeight: 600
                        }}>
                          {item.category}
                        </span>
                        <span className="faq-question">{item.question}</span>
                      </div>
                      <span className="faq-icon-wrapper">
                        <span className="faq-icon-line horizontal"></span>
                        <span className="faq-icon-line vertical"></span>
                      </span>
                    </button>
                    <div className="faq-content">
                      <div className="faq-content-inner">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

