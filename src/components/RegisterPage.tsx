import React, { useState, useEffect } from 'react';
import { registrationTracks } from '../data/registrationTracks';
import { SpecularButton } from './SpecularButton';

interface RegisterPageProps {
  onBack: () => void;
  initialTrackId?: string;
}

interface FormState {
  trackId: string;
  fullName: string;
  classYear: string;
  branch: string;
  college: string;
  ieeeMember: 'yes' | 'no' | '';
  ieeeMemberId: string;
  csMember: 'yes' | 'no' | '';
  csMemberId: string;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onBack, initialTrackId }) => {
  // Pre-select track if provided in URL (e.g. ?track=track-1 or track-2), default to ''
  const validInitialTrack = registrationTracks.find(t => t.id === initialTrackId)?.id || '';

  const [formData, setFormData] = useState<FormState>({
    trackId: validInitialTrack,
    fullName: '',
    classYear: '',
    branch: '',
    college: '',
    ieeeMember: '',
    ieeeMemberId: '',
    csMember: '',
    csMemberId: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Validation logic
  const errors: Record<string, string> = {};
  if (!formData.trackId) {
    errors.trackId = 'Please select a track to proceed.';
  }
  if (!formData.fullName.trim()) {
    errors.fullName = 'Full Name is required.';
  }
  if (!formData.classYear) {
    errors.classYear = 'Please select your class / year.';
  }
  if (!formData.branch.trim()) {
    errors.branch = 'Branch / Department is required.';
  }
  if (!formData.college.trim()) {
    errors.college = 'College / Institution is required.';
  }
  if (!formData.ieeeMember) {
    errors.ieeeMember = 'Please indicate whether you are an IEEE member.';
  } else if (formData.ieeeMember === 'yes' && !formData.ieeeMemberId.trim()) {
    errors.ieeeMemberId = 'IEEE Member ID is required.';
  }
  if (!formData.csMember) {
    errors.csMember = 'Please indicate whether you are an IEEE Computer Society member.';
  } else if (formData.csMember === 'yes' && !formData.csMemberId.trim()) {
    errors.csMemberId = 'IEEE CS Member ID is required.';
  }

  const isFormValid = Object.keys(errors).length === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all as touched
    setTouched({
      trackId: true,
      fullName: true,
      classYear: true,
      branch: true,
      college: true,
      ieeeMember: true,
      ieeeMemberId: true,
      csMember: true,
      csMemberId: true,
    });

    if (isFormValid) {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const selectedTrack = registrationTracks.find(t => t.id === formData.trackId);

  // Success Confirmation Screen
  if (isSubmitted) {
    return (
      <div className="registration-page-wrapper">
        <div className="registration-inner-container">
          <div className="registration-card registration-success-card">
            <div className="registration-success-badge">✓</div>
            <span className="registration-tag">[ REGISTRATION INITIATED ]</span>
            <h2 className="registration-success-title">YOU'RE ON THE LIST</h2>
            <p className="registration-success-desc">
              Thank you, <strong>{formData.fullName}</strong>! Your registration details for <strong>{selectedTrack?.name}</strong> have been recorded.
            </p>

            <div className="registration-summary-box">
              <div className="registration-summary-row">
                <span className="summary-label">TRACK</span>
                <span className="summary-val">{selectedTrack?.name}</span>
              </div>
              <div className="registration-summary-row">
                <span className="summary-label">ATTENDEE</span>
                <span className="summary-val">{formData.fullName}</span>
              </div>
              <div className="registration-summary-row">
                <span className="summary-label">INSTITUTION</span>
                <span className="summary-val">{formData.college}</span>
              </div>
              <div className="registration-summary-row">
                <span className="summary-label">CLASS / YEAR</span>
                <span className="summary-val">{formData.classYear} — {formData.branch}</span>
              </div>
              <div className="registration-summary-row">
                <span className="summary-label">IEEE MEMBERSHIP</span>
                <span className="summary-val">
                  {formData.ieeeMember === 'yes' ? `Yes (${formData.ieeeMemberId})` : 'No'}
                </span>
              </div>
              <div className="registration-summary-row">
                <span className="summary-label">IEEE CS MEMBERSHIP</span>
                <span className="summary-val">
                  {formData.csMember === 'yes' ? `Yes (${formData.csMemberId})` : 'No'}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'center' }}>
              <SpecularButton 
                onClick={onBack} 
                size="md"
              >
                RETURN TO TECHX HOME →
              </SpecularButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-page-wrapper">
      <div className="registration-inner-container">
        {/* Top Back Nav Button */}
        <div className="registration-top-nav">
          <button 
            type="button" 
            onClick={onBack} 
            className="registration-back-btn" 
            aria-label="Back to TechX Home"
          >
            ← BACK TO TECHX
          </button>
        </div>

        {/* Main Registration Card */}
        <div className="registration-card">
          {/* Header */}
          <div className="registration-header">
            <span className="registration-tag">[ TECHX REIGNITE ]</span>
            <h1 className="registration-title">REGISTRATION</h1>
            <p className="registration-subtitle">
              Choose your track and complete your attendee details.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="registration-form">
            {/* ============================================================
                TRACK SELECTION
                ============================================================ */}
            <div className="form-section-block">
              <div className="section-title-wrap">
                <h2 className="section-block-title">SELECT YOUR TRACK</h2>
                <p className="section-block-subtitle">Choose the track you want to register for.</p>
              </div>

              <div className="track-cards-grid" role="radiogroup" aria-label="Select Track">
                {registrationTracks.map((track) => {
                  const isSelected = formData.trackId === track.id;
                  return (
                    <div
                      key={track.id}
                      className={`track-choice-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleFieldChange('trackId', track.id)}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleFieldChange('trackId', track.id);
                        }
                      }}
                    >
                      <div className="track-choice-top">
                        <span className="track-choice-num">{track.num}</span>
                        <div className={`track-choice-indicator ${isSelected ? 'checked' : ''}`} aria-hidden="true">
                          {isSelected && <div className="track-indicator-dot" />}
                        </div>
                      </div>
                      <div className="track-choice-name">{track.name}</div>
                      <div className="track-choice-status">
                        {isSelected ? '● Selected' : '○ Select this track'}
                      </div>
                    </div>
                  );
                })}
              </div>
              {touched.trackId && errors.trackId && (
                <div className="form-inline-error">{errors.trackId}</div>
              )}
            </div>

            {/* ============================================================
                01 / PERSONAL DETAILS
                ============================================================ */}
            <div className="form-section-block">
              <div className="section-title-wrap">
                <span className="section-step-num">01 / PERSONAL DETAILS</span>
              </div>

              <div className="form-fields-stack">
                {/* Full Name */}
                <div className="form-field-group">
                  <label htmlFor="reg-fullname" className="form-field-label">
                    FULL NAME <span className="req-star">*</span>
                  </label>
                  <input
                    id="reg-fullname"
                    type="text"
                    className={`form-input ${touched.fullName && errors.fullName ? 'has-error' : ''}`}
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    autoComplete="name"
                  />
                  {touched.fullName && errors.fullName && (
                    <div className="form-inline-error">{errors.fullName}</div>
                  )}
                </div>

                {/* Class / Year & Branch Grid */}
                <div className="form-two-col">
                  {/* Class / Year */}
                  <div className="form-field-group">
                    <label htmlFor="reg-classyear" className="form-field-label">
                      CLASS / YEAR <span className="req-star">*</span>
                    </label>
                    <div className="form-select-wrap">
                      <select
                        id="reg-classyear"
                        className={`form-select ${touched.classYear && errors.classYear ? 'has-error' : ''}`}
                        value={formData.classYear}
                        onChange={(e) => handleFieldChange('classYear', e.target.value)}
                        onBlur={() => handleBlur('classYear')}
                      >
                        <option value="" disabled>Select your year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="select-dropdown-icon" aria-hidden="true">▼</div>
                    </div>
                    {touched.classYear && errors.classYear && (
                      <div className="form-inline-error">{errors.classYear}</div>
                    )}
                  </div>

                  {/* Branch */}
                  <div className="form-field-group">
                    <label htmlFor="reg-branch" className="form-field-label">
                      BRANCH <span className="req-star">*</span>
                    </label>
                    <input
                      id="reg-branch"
                      type="text"
                      className={`form-input ${touched.branch && errors.branch ? 'has-error' : ''}`}
                      placeholder="Computer Science & Engineering"
                      value={formData.branch}
                      onChange={(e) => handleFieldChange('branch', e.target.value)}
                      onBlur={() => handleBlur('branch')}
                    />
                    {touched.branch && errors.branch && (
                      <div className="form-inline-error">{errors.branch}</div>
                    )}
                  </div>
                </div>

                {/* College / Institution */}
                <div className="form-field-group">
                  <label htmlFor="reg-college" className="form-field-label">
                    COLLEGE / INSTITUTION <span className="req-star">*</span>
                  </label>
                  <input
                    id="reg-college"
                    type="text"
                    className={`form-input ${touched.college && errors.college ? 'has-error' : ''}`}
                    placeholder="Enter your college / institution"
                    value={formData.college}
                    onChange={(e) => handleFieldChange('college', e.target.value)}
                    onBlur={() => handleBlur('college')}
                  />
                  {touched.college && errors.college && (
                    <div className="form-inline-error">{errors.college}</div>
                  )}
                </div>
              </div>
            </div>

            {/* ============================================================
                02 / MEMBERSHIP
                ============================================================ */}
            <div className="form-section-block">
              <div className="section-title-wrap">
                <span className="section-step-num">02 / MEMBERSHIP</span>
              </div>

              <div className="form-fields-stack">
                {/* IEEE Member Question */}
                <div className="form-field-group">
                  <label className="form-field-label">
                    IEEE MEMBER? <span className="req-star">*</span>
                  </label>
                  <div className="segmented-toggle" role="radiogroup" aria-label="IEEE Member Status">
                    <button
                      type="button"
                      role="radio"
                      aria-checked={formData.ieeeMember === 'yes'}
                      className={`segmented-toggle-btn ${formData.ieeeMember === 'yes' ? 'selected' : ''}`}
                      onClick={() => handleFieldChange('ieeeMember', 'yes')}
                    >
                      YES
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={formData.ieeeMember === 'no'}
                      className={`segmented-toggle-btn ${formData.ieeeMember === 'no' ? 'selected' : ''}`}
                      onClick={() => {
                        handleFieldChange('ieeeMember', 'no');
                        handleFieldChange('ieeeMemberId', '');
                      }}
                    >
                      NO
                    </button>
                  </div>
                  {touched.ieeeMember && errors.ieeeMember && (
                    <div className="form-inline-error">{errors.ieeeMember}</div>
                  )}

                  {/* Conditional IEEE Member ID with smooth subtle reveal */}
                  {formData.ieeeMember === 'yes' && (
                    <div className="conditional-field-block animate-slide-down">
                      <label htmlFor="reg-ieeememberid" className="form-field-label">
                        IEEE MEMBER ID <span className="req-star">*</span>
                      </label>
                      <input
                        id="reg-ieeememberid"
                        type="text"
                        className={`form-input ${touched.ieeeMemberId && errors.ieeeMemberId ? 'has-error' : ''}`}
                        placeholder="Enter IEEE Member ID"
                        value={formData.ieeeMemberId}
                        onChange={(e) => handleFieldChange('ieeeMemberId', e.target.value)}
                        onBlur={() => handleBlur('ieeeMemberId')}
                      />
                      {touched.ieeeMemberId && errors.ieeeMemberId && (
                        <div className="form-inline-error">{errors.ieeeMemberId}</div>
                      )}
                    </div>
                  )}
                </div>

                {/* IEEE Computer Society Member Question */}
                <div className="form-field-group" style={{ marginTop: '12px' }}>
                  <label className="form-field-label">
                    IEEE COMPUTER SOCIETY MEMBER? <span className="req-star">*</span>
                  </label>
                  <div className="segmented-toggle" role="radiogroup" aria-label="IEEE CS Member Status">
                    <button
                      type="button"
                      role="radio"
                      aria-checked={formData.csMember === 'yes'}
                      className={`segmented-toggle-btn ${formData.csMember === 'yes' ? 'selected' : ''}`}
                      onClick={() => handleFieldChange('csMember', 'yes')}
                    >
                      YES
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={formData.csMember === 'no'}
                      className={`segmented-toggle-btn ${formData.csMember === 'no' ? 'selected' : ''}`}
                      onClick={() => {
                        handleFieldChange('csMember', 'no');
                        handleFieldChange('csMemberId', '');
                      }}
                    >
                      NO
                    </button>
                  </div>
                  {touched.csMember && errors.csMember && (
                    <div className="form-inline-error">{errors.csMember}</div>
                  )}

                  {/* Conditional IEEE CS Member ID with smooth subtle reveal */}
                  {formData.csMember === 'yes' && (
                    <div className="conditional-field-block animate-slide-down">
                      <label htmlFor="reg-csmemberid" className="form-field-label">
                        IEEE CS MEMBER ID <span className="req-star">*</span>
                      </label>
                      <input
                        id="reg-csmemberid"
                        type="text"
                        className={`form-input ${touched.csMemberId && errors.csMemberId ? 'has-error' : ''}`}
                        placeholder="Enter IEEE CS Member ID"
                        value={formData.csMemberId}
                        onChange={(e) => handleFieldChange('csMemberId', e.target.value)}
                        onBlur={() => handleBlur('csMemberId')}
                      />
                      {touched.csMemberId && errors.csMemberId && (
                        <div className="form-inline-error">{errors.csMemberId}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ============================================================
                PRIMARY SUBMISSION CTA
                ============================================================ */}
            <div className="form-action-block">
              <SpecularButton
                type="submit"
                size="lg"
                disabled={!isFormValid}
                className="registration-submit-btn"
              >
                <span>CONTINUE</span>
                <span aria-hidden="true">→</span>
              </SpecularButton>
              {!isFormValid && (
                <p className="form-disabled-hint">
                  Please complete all required fields above to continue.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
