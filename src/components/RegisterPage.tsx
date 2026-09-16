import React, { useState, useEffect } from 'react';
import { registrationTracks } from '../data/registrationTracks';
import { SpecularButton } from './SpecularButton';

interface RegisterPageProps {
  onBack: () => void;
  initialTrackId?: string;
}

interface FormState {
  track: string;
  fullName: string;
  classYear: string;
  branch: string;
  college: string;
  ieeeMember: 'yes' | 'no' | '';
  ieeeMemberId: string;
  csMember: 'yes' | 'no' | '';
}

export interface SubmittedRegistration {
  track: string;
  fullName: string;
  classYear: string;
  branch: string;
  college: string;
  ieeeMember: boolean;
  ieeeMemberId: string;
  csMember: boolean;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onBack, initialTrackId }) => {
  // Pre-select track if provided in URL (e.g. ?track=track-1 or track-2), default to ''
  const validInitialTrack = registrationTracks.find(t => t.id === initialTrackId)?.id || '';

  const [formData, setFormData] = useState<FormState>({
    track: validInitialTrack,
    fullName: '',
    classYear: '',
    branch: '',
    college: '',
    ieeeMember: '',
    ieeeMemberId: '',
    csMember: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submittedData, setSubmittedData] = useState<SubmittedRegistration | null>(null);

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
  if (!formData.track) {
    errors.track = 'Please select a track.';
  }
  if (!formData.fullName.trim()) {
    errors.fullName = 'Full Name is required.';
  }
  if (!formData.classYear) {
    errors.classYear = 'Please select your class / year.';
  }
  if (!formData.branch.trim()) {
    errors.branch = 'Branch is required.';
  }
  if (!formData.college.trim()) {
    errors.college = 'College / Institution is required.';
  }
  if (!formData.ieeeMember) {
    errors.ieeeMember = 'Please select whether you are an IEEE member.';
  } else if (formData.ieeeMember === 'yes' && !formData.ieeeMemberId.trim()) {
    errors.ieeeMemberId = 'IEEE Member ID is required.';
  }
  if (!formData.csMember) {
    errors.csMember = 'Please select whether you are an IEEE Computer Society member.';
  }

  const isFormValid =
    Boolean(formData.track) &&
    Boolean(formData.fullName.trim()) &&
    Boolean(formData.classYear) &&
    Boolean(formData.branch.trim()) &&
    Boolean(formData.college.trim()) &&
    Boolean(formData.ieeeMember) &&
    (formData.ieeeMember === 'no' || Boolean(formData.ieeeMemberId.trim())) &&
    Boolean(formData.csMember);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all as touched
    setTouched({
      track: true,
      fullName: true,
      classYear: true,
      branch: true,
      college: true,
      ieeeMember: true,
      ieeeMemberId: true,
      csMember: true,
    });

    if (isFormValid) {
      const payload: SubmittedRegistration = {
        track: formData.track,
        fullName: formData.fullName.trim(),
        classYear: formData.classYear,
        branch: formData.branch.trim(),
        college: formData.college.trim(),
        ieeeMember: formData.ieeeMember === 'yes',
        ieeeMemberId: formData.ieeeMember === 'yes' ? formData.ieeeMemberId.trim() : '',
        csMember: formData.csMember === 'yes',
      };

      console.log('[TECHX REIGNITE] Registration Submission:', payload);
      setSubmittedData(payload);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Success Confirmation Screen
  if (submittedData) {
    const selectedTrack = registrationTracks.find(t => t.id === submittedData.track);

    return (
      <div className="registration-page-wrapper">
        <div className="registration-inner-container">
          <div className="registration-card registration-success-card">
            <div className="registration-success-badge" aria-hidden="true">✓</div>
            <h2 className="registration-success-title">REGISTRATION CONFIRMED</h2>
            <p className="registration-success-desc">
              Your TECHX REIGNITE registration has been received.
            </p>

            <div className="registration-summary-box">
              <div className="registration-summary-row">
                <span className="summary-label">TRACK</span>
                <span className="summary-val">{selectedTrack?.name || submittedData.track}</span>
              </div>
              <div className="registration-summary-row">
                <span className="summary-label">FULL NAME</span>
                <span className="summary-val">{submittedData.fullName}</span>
              </div>
              <div className="registration-summary-row">
                <span className="summary-label">CLASS / YEAR</span>
                <span className="summary-val">{submittedData.classYear}</span>
              </div>
              <div className="registration-summary-row">
                <span className="summary-label">BRANCH</span>
                <span className="summary-val">{submittedData.branch}</span>
              </div>
              <div className="registration-summary-row">
                <span className="summary-label">COLLEGE / INSTITUTION</span>
                <span className="summary-val">{submittedData.college}</span>
              </div>
              <div className="registration-summary-row">
                <span className="summary-label">IEEE MEMBER</span>
                <span className="summary-val">
                  {submittedData.ieeeMember ? `YES (${submittedData.ieeeMemberId})` : 'NO'}
                </span>
              </div>
              <div className="registration-summary-row">
                <span className="summary-label">IEEE CS MEMBER</span>
                <span className="summary-val">
                  {submittedData.csMember ? 'YES' : 'NO'}
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
            <h1 className="registration-title">REGISTRATION</h1>
            <p className="registration-subtitle">
              Choose your track and enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="registration-form">
            {/* ============================================================
                TRACK SELECTION
                ============================================================ */}
            <div className="form-section-block">
              <div className="section-title-wrap">
                <h2 className="section-block-title">TRACK SELECTION</h2>
              </div>

              <div className="form-field-group">
                <label htmlFor="reg-track" className="form-field-label">
                  TRACK <span className="req-star">*</span>
                </label>
                <div className="form-select-wrap">
                  <select
                    id="reg-track"
                    className={`form-select ${!formData.track ? 'is-placeholder' : ''} ${touched.track && errors.track ? 'has-error' : ''}`}
                    value={formData.track}
                    onChange={(e) => handleFieldChange('track', e.target.value)}
                    onBlur={() => handleBlur('track')}
                  >
                    <option value="" disabled>Select a track</option>
                    {registrationTracks.map((track) => (
                      <option key={track.id} value={track.id}>
                        {track.name}
                      </option>
                    ))}
                  </select>
                  <div className="select-dropdown-icon" aria-hidden="true">▼</div>
                </div>
                {touched.track && errors.track && (
                  <div className="form-inline-error">{errors.track}</div>
                )}
              </div>
            </div>

            {/* ============================================================
                PERSONAL DETAILS
                ============================================================ */}
            <div className="form-section-block">
              <div className="section-title-wrap">
                <h2 className="section-block-title">PERSONAL DETAILS</h2>
              </div>

              <div className="form-fields-stack">
                {/* Row 1: Full Name & Class / Year (Desktop 2-Col) */}
                <div className="form-two-col">
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

                  {/* Class / Year */}
                  <div className="form-field-group">
                    <label htmlFor="reg-classyear" className="form-field-label">
                      CLASS / YEAR <span className="req-star">*</span>
                    </label>
                    <div className="form-select-wrap">
                      <select
                        id="reg-classyear"
                        className={`form-select ${!formData.classYear ? 'is-placeholder' : ''} ${touched.classYear && errors.classYear ? 'has-error' : ''}`}
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
                </div>

                {/* Row 2: Branch & College / Institution (Desktop 2-Col) */}
                <div className="form-two-col">
                  {/* Branch */}
                  <div className="form-field-group">
                    <label htmlFor="reg-branch" className="form-field-label">
                      BRANCH <span className="req-star">*</span>
                    </label>
                    <input
                      id="reg-branch"
                      type="text"
                      className={`form-input ${touched.branch && errors.branch ? 'has-error' : ''}`}
                      placeholder="Enter your branch"
                      value={formData.branch}
                      onChange={(e) => handleFieldChange('branch', e.target.value)}
                      onBlur={() => handleBlur('branch')}
                    />
                    {touched.branch && errors.branch && (
                      <div className="form-inline-error">{errors.branch}</div>
                    )}
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
            </div>

            {/* ============================================================
                MEMBERSHIP
                ============================================================ */}
            <div className="form-section-block">
              <div className="section-title-wrap">
                <h2 className="section-block-title">MEMBERSHIP</h2>
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
                        placeholder="Enter your IEEE Member ID"
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
                      onClick={() => handleFieldChange('csMember', 'no')}
                    >
                      NO
                    </button>
                  </div>
                  {touched.csMember && errors.csMember && (
                    <div className="form-inline-error">{errors.csMember}</div>
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
                <span>CONFIRM</span>
                <span aria-hidden="true">→</span>
              </SpecularButton>
              {!isFormValid && (
                <p className="form-disabled-hint">
                  Please complete all required fields above to confirm your registration.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
