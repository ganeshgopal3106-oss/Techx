import React, { useState, useRef, useEffect } from 'react';
import { tracksData } from '../data/tracks';

interface RegisterPageProps {
  onBack: () => void;
  initialTrackId?: string;
}

type FormStep = 1 | 2 | 3 | 4;

interface FormState {
  trackId: string;
  trackName: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  department: string;
  ieeeMember: 'yes' | 'no' | '';
  ieeeMembershipId: string;
  paymentScreenshot: File | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  college?: string;
  year?: string;
  department?: string;
  ieeeMember?: string;
  ieeeMembershipId?: string;
  paymentScreenshot?: string;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onBack, initialTrackId }) => {
  const matchedTrack = tracksData.find(t => t.id === initialTrackId) || tracksData[0];

  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormState>({
    trackId: matchedTrack.id,
    trackName: matchedTrack.title,
    fullName: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    department: '',
    ieeeMember: '',
    ieeeMembershipId: '',
    paymentScreenshot: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Revoke object URL on unmount or file change
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const getTicketAmount = (): number => {
    return formData.ieeeMember === 'yes' ? 300 : 400;
  };

  const handleInputChange = (field: keyof FormState, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, paymentScreenshot: 'Only JPG, JPEG, and PNG files are accepted.' }));
      return;
    }

    // Validate size (< 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, paymentScreenshot: 'File size exceeds 5 MB limit.' }));
      return;
    }

    setFormData(prev => ({ ...prev, paymentScreenshot: file }));
    setErrors(prev => ({ ...prev, paymentScreenshot: undefined }));
    
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveFile = () => {
    setFormData(prev => ({ ...prev, paymentScreenshot: null }));
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Step Validation
  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^[0-9+\-\s]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid contact number (10-15 digits)';
    }
    if (!formData.college.trim()) newErrors.college = 'College/Organization is required';
    if (!formData.year.trim()) newErrors.year = 'Please select your year/semester';
    if (!formData.department.trim()) newErrors.department = 'Department is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.ieeeMember) {
      newErrors.ieeeMember = 'Please select IEEE membership status';
    } else if (formData.ieeeMember === 'yes' && !formData.ieeeMembershipId.trim()) {
      newErrors.ieeeMembershipId = 'IEEE Membership ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.paymentScreenshot) {
      newErrors.paymentScreenshot = 'Payment proof screenshot is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) setCurrentStep(2);
    else if (currentStep === 2 && validateStep2()) setCurrentStep(3);
    else if (currentStep === 3 && validateStep3()) setCurrentStep(4);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as FormStep);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedTrack = tracksData.find(t => t.id === formData.trackId) || matchedTrack;

  if (isSubmitted) {
    return (
      <div className="register-page-container blueprint-grid-bg" style={{ minHeight: '100vh', padding: 'var(--space-xxl) var(--space-md)' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div className="card success-card" style={{ padding: 'var(--space-xl)', textAlign: 'center', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', border: '2px solid var(--accent)', color: 'var(--accent)', fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-md)' }}>
              ✓
            </div>
            <span className="blueprint-tag">STATUS // REGISTRATION COMPLETE</span>
            <h1 style={{ fontSize: '2rem', textTransform: 'uppercase', margin: '8px 0 var(--space-sm)' }}>
              Registration Complete
            </h1>
            
            <div className="track-context-banner" style={{ textAlign: 'left', margin: 'var(--space-lg) 0' }}>
              <div className="track-context-label">REGISTERED FOR</div>
              <div className="track-context-title">{selectedTrack.title} (TRACK {selectedTrack.num})</div>
              <div className="track-context-sub">{selectedTrack.badge}</div>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              You're registered for: <strong>{selectedTrack.title}</strong>. A confirmation message will appear here once backend integration is added.
            </p>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-lg)' }}>
              <button onClick={onBack} className="btn btn-primary" style={{ padding: '12px 32px' }}>
                Back to TechX
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page-container blueprint-circuit-bg" style={{ minHeight: '100vh', padding: 'var(--space-xl) var(--space-md)' }}>
      <div className="container" style={{ maxWidth: '760px' }}>
        
        {/* Navigation Breadcrumb / Back button */}
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <button 
            onClick={onBack} 
            className="btn btn-secondary" 
            style={{ height: '36px', padding: '0 16px', fontSize: '0.8rem' }}
          >
            ← Back to Overview
          </button>
        </div>

        <div className="card registration-card-wrapper" style={{ padding: 'var(--space-xl)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
          {/* Header */}
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <span className="blueprint-tag">[ SYS // APPLICATION PROTOCOL ]</span>
            <p className="section-number" style={{ color: 'var(--accent)', marginTop: '4px', marginBottom: '2px' }}>
              TECHX REIGNITE
            </p>
            <h1 style={{ fontSize: '2.2rem', textTransform: 'uppercase', marginBottom: '8px' }}>
              Registration
            </h1>
          </div>

          {/* Track Context Banner */}
          <div className="track-context-banner">
            <div className="track-context-label">TRACK {selectedTrack.num}</div>
            <h2 className="track-context-title">{selectedTrack.title}</h2>
            <p className="track-context-sub">
              You are registering specifically for this track.
            </p>
          </div>

          {/* 4-Step Progress Indicator */}
          <div className="form-step-tracker" role="tablist">
            <div className={`step-tracker-item ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}>
              <div className="step-tracker-num">{currentStep > 1 ? '✓' : '01'}</div>
              <span>Personal</span>
            </div>
            <div className={`step-tracker-item ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}>
              <div className="step-tracker-num">{currentStep > 2 ? '✓' : '02'}</div>
              <span>Membership</span>
            </div>
            <div className={`step-tracker-item ${currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : ''}`}>
              <div className="step-tracker-num">{currentStep > 3 ? '✓' : '03'}</div>
              <span>Payment</span>
            </div>
            <div className={`step-tracker-item ${currentStep === 4 ? 'active' : ''}`}>
              <div className="step-tracker-num">04</div>
              <span>Review</span>
            </div>
          </div>

          {/* STEP 1: PERSONAL DETAILS */}
          {currentStep === 1 && (
            <div className="form-step-content">
              <div className="form-section-header" style={{ marginBottom: 'var(--space-md)' }}>
                <span className="section-number" style={{ color: 'var(--accent)' }}>01 / PERSONAL DETAILS</span>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Enter your official attendee credentials.</p>
              </div>

              <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    type="text"
                    className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                  {errors.fullName && <span className="field-error-msg">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    className={`form-input ${errors.email ? 'has-error' : ''}`}
                    placeholder="jane.doe@university.edu"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  {errors.email && <span className="field-error-msg">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    className={`form-input ${errors.phone ? 'has-error' : ''}`}
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                  {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="college">College / Organization *</label>
                  <input
                    id="college"
                    type="text"
                    className={`form-input ${errors.college ? 'has-error' : ''}`}
                    placeholder="Sree Chitra Thirunal College of Engineering"
                    value={formData.college}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                  />
                  {errors.college && <span className="field-error-msg">{errors.college}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="year">Year / Semester *</label>
                  <select
                    id="year"
                    className={`form-input ${errors.year ? 'has-error' : ''}`}
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                  >
                    <option value="">Select current year / semester</option>
                    <option value="1st Year">1st Year (Semester 1 / 2)</option>
                    <option value="2nd Year">2nd Year (Semester 3 / 4)</option>
                    <option value="3rd Year">3rd Year (Semester 5 / 6)</option>
                    <option value="4th Year">4th Year (Semester 7 / 8)</option>
                    <option value="Postgraduate">Postgraduate / Scholar</option>
                    <option value="Professional">Working Professional</option>
                  </select>
                  {errors.year && <span className="field-error-msg">{errors.year}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="department">Department / Branch *</label>
                  <input
                    id="department"
                    type="text"
                    className={`form-input ${errors.department ? 'has-error' : ''}`}
                    placeholder="Computer Science & Engineering"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                  />
                  {errors.department && <span className="field-error-msg">{errors.department}</span>}
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-xl)', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" onClick={handleNext} className="btn btn-primary">
                  Continue to Membership →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: IEEE MEMBERSHIP */}
          {currentStep === 2 && (
            <div className="form-step-content">
              <div className="form-section-header" style={{ marginBottom: 'var(--space-md)' }}>
                <span className="section-number" style={{ color: 'var(--accent)' }}>02 / IEEE MEMBERSHIP</span>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>IEEE members receive subsidized delegate pricing (₹300 instead of ₹400).</p>
              </div>

              <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
                <label className="form-label">Are you an active IEEE Member? *</label>
                <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="ieeeMember"
                      value="yes"
                      checked={formData.ieeeMember === 'yes'}
                      onChange={() => handleInputChange('ieeeMember', 'yes')}
                    />
                    <span style={{ fontWeight: 600 }}>YES (I am an IEEE Member)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="ieeeMember"
                      value="no"
                      checked={formData.ieeeMember === 'no'}
                      onChange={() => {
                        handleInputChange('ieeeMember', 'no');
                        handleInputChange('ieeeMembershipId', '');
                      }}
                    />
                    <span style={{ fontWeight: 600 }}>NO (Non-IEEE Member)</span>
                  </label>
                </div>
                {errors.ieeeMember && <span className="field-error-msg">{errors.ieeeMember}</span>}
              </div>

              {formData.ieeeMember === 'yes' && (
                <div className="form-group" style={{ animation: 'modalFadeIn 200ms ease' }}>
                  <label className="form-label" htmlFor="ieeeMembershipId">IEEE Membership ID (8–9 digits) *</label>
                  <input
                    id="ieeeMembershipId"
                    type="text"
                    className={`form-input ${errors.ieeeMembershipId ? 'has-error' : ''}`}
                    placeholder="e.g. 98765432"
                    value={formData.ieeeMembershipId}
                    onChange={(e) => handleInputChange('ieeeMembershipId', e.target.value)}
                  />
                  {errors.ieeeMembershipId && <span className="field-error-msg">{errors.ieeeMembershipId}</span>}
                </div>
              )}

              <div style={{ marginTop: 'var(--space-xl)', display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" onClick={handleBack} className="btn btn-secondary">
                  ← Back
                </button>
                <button type="button" onClick={handleNext} className="btn btn-primary">
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT & PROOF */}
          {currentStep === 3 && (
            <div className="form-step-content">
              <div className="form-section-header" style={{ marginBottom: 'var(--space-md)' }}>
                <span className="section-number" style={{ color: 'var(--accent)' }}>03 / PAYMENT & PROOF</span>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Scan the official UPI QR code and upload your transaction receipt.</p>
              </div>

              {/* Payment Box */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-lg)', background: 'var(--bg-secondary)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: 'var(--space-lg)' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'inline-block', padding: '12px', background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                    <img
                      src="/payment-qr.jpeg"
                      alt="IEEE CS SCT SB Official UPI QR Code"
                      style={{ width: '180px', height: '180px', objectFit: 'contain' }}
                    />
                  </div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    UPI ID: ieeesctsb@oksbi
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span className="blueprint-tag">PAYABLE AMOUNT</span>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent)', margin: '4px 0' }}>
                    ₹ {getTicketAmount()}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {formData.ieeeMember === 'yes' ? 'IEEE Member Subsidized Pass' : 'Standard Non-Member Pass'}
                  </span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '12px', lineHeight: '1.4' }}>
                    Please include your name in the payment description / remarks when transferring.
                  </p>
                </div>
              </div>

              {/* Screenshot File Upload */}
              <div className="form-group">
                <label className="form-label">Upload Payment Screenshot (JPG, PNG, max 5 MB) *</label>
                
                {!previewUrl ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: `2px dashed ${errors.paymentScreenshot ? 'var(--accent)' : 'var(--border-color)'}`,
                      borderRadius: 'var(--radius-sm)',
                      padding: 'var(--space-xl) var(--space-md)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: 'var(--bg-primary)',
                      transition: 'border-color 200ms ease'
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleFileSelect}
                      style={{ display: 'none' }}
                    />
                    <div style={{ color: 'var(--accent)', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      Click to choose or drop screenshot here
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Supported formats: JPG, JPEG, PNG (Max 5 MB)
                    </span>
                  </div>
                ) : (
                  <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: 'var(--space-md)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <img
                      src={previewUrl}
                      alt="Payment Preview"
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        {formData.paymentScreenshot?.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {(formData.paymentScreenshot ? formData.paymentScreenshot.size / 1024 : 0).toFixed(1)} KB
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="btn btn-secondary"
                      style={{ height: '32px', padding: '0 12px', fontSize: '0.75rem' }}
                    >
                      Remove
                    </button>
                  </div>
                )}
                {errors.paymentScreenshot && <span className="field-error-msg">{errors.paymentScreenshot}</span>}
              </div>

              <div style={{ marginTop: 'var(--space-xl)', display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" onClick={handleBack} className="btn btn-secondary">
                  ← Back
                </button>
                <button type="button" onClick={handleNext} className="btn btn-primary">
                  Review & Confirm →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & CONFIRM */}
          {currentStep === 4 && (
            <div className="form-step-content">
              <div className="form-section-header" style={{ marginBottom: 'var(--space-md)' }}>
                <span className="section-number" style={{ color: 'var(--accent)' }}>04 / REGISTRATION REVIEW</span>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Review all details before finalizing your submission.</p>
              </div>

              <div className="reg-review-block">
                <div className="review-section-row">
                  <div className="review-label">SELECTED TRACK</div>
                  <div className="review-value" style={{ fontWeight: 800, color: 'var(--accent)' }}>
                    TRACK {selectedTrack.num}: {selectedTrack.title}
                  </div>
                </div>

                <div className="review-section-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div>
                    <div className="review-label">FULL NAME</div>
                    <div className="review-value">{formData.fullName}</div>
                  </div>
                  <div>
                    <div className="review-label">EMAIL ADDRESS</div>
                    <div className="review-value">{formData.email}</div>
                  </div>
                  <div>
                    <div className="review-label">PHONE NUMBER</div>
                    <div className="review-value">{formData.phone}</div>
                  </div>
                </div>

                <div className="review-section-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div>
                    <div className="review-label">COLLEGE / ORGANIZATION</div>
                    <div className="review-value">{formData.college}</div>
                  </div>
                  <div>
                    <div className="review-label">YEAR / SEMESTER</div>
                    <div className="review-value">{formData.year}</div>
                  </div>
                  <div>
                    <div className="review-label">DEPARTMENT</div>
                    <div className="review-value">{formData.department}</div>
                  </div>
                </div>

                <div className="review-section-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div>
                    <div className="review-label">IEEE MEMBERSHIP</div>
                    <div className="review-value">{formData.ieeeMember === 'yes' ? `Yes (${formData.ieeeMembershipId})` : 'No'}</div>
                  </div>
                  <div>
                    <div className="review-label">AMOUNT PAID</div>
                    <div className="review-value" style={{ fontWeight: 700, color: 'var(--accent)' }}>₹ {getTicketAmount()}</div>
                  </div>
                  <div>
                    <div className="review-label">PAYMENT RECEIPT</div>
                    <div className="review-value">{formData.paymentScreenshot?.name || 'Screenshot attached'}</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-xl)', display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" onClick={() => setCurrentStep(1)} className="btn btn-secondary">
                  Edit Details
                </button>
                <button type="button" onClick={handleSubmit} className="btn btn-primary">
                  Submit Registration →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
