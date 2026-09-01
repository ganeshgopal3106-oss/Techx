import React, { useState, useRef, useEffect } from 'react';
import { tracksData } from '../data/tracks';

interface RegisterPageProps {
  onBack: () => void;
  initialTrackId?: string;
}

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
  // Identify the target track from prop or fallback to first track
  const matchedTrack = tracksData.find(t => t.id === initialTrackId) || tracksData[0];

  const [formData, setFormData] = useState<FormState>({
    trackId: matchedTrack.id,
    trackName: matchedTrack.name,
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


  // Clean up object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Calculate ticket amount based on membership selections
  const getTicketAmount = (): number => {
    if (formData.ieeeMember === 'yes') {
      return 300;
    }
    return 400; // Default for non-members
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleRadioChange = (name: 'ieeeMember', value: 'yes' | 'no') => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(value === 'no' ? { ieeeMembershipId: '' } : {})
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
        ieeeMembershipId: undefined
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type (JPG, JPEG, PNG)
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrors(prev => ({
        ...prev,
        paymentScreenshot: 'Please upload a valid image file (JPG, JPEG, or PNG).'
      }));
      return;
    }

    // Validate size (max 5 MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        paymentScreenshot: 'File size exceeds 5 MB. Please upload a smaller image.'
      }));
      return;
    }

    // Set preview
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    setFormData(prev => ({
      ...prev,
      paymentScreenshot: file
    }));

    setErrors(prev => ({
      ...prev,
      paymentScreenshot: undefined
    }));
  };

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setFormData(prev => ({
      ...prev,
      paymentScreenshot: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = (): boolean => {
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

    if (!formData.college.trim()) newErrors.college = 'College/Organization name is required';
    if (!formData.year.trim()) newErrors.year = 'Please select your current year/semester';
    if (!formData.department.trim()) newErrors.department = 'Department / Branch is required';

    if (!formData.ieeeMember) {
      newErrors.ieeeMember = 'Please select IEEE membership status';
    } else if (formData.ieeeMember === 'yes' && !formData.ieeeMembershipId.trim()) {
      newErrors.ieeeMembershipId = 'IEEE Membership ID is required';
    }

    if (!formData.paymentScreenshot) {
      newErrors.paymentScreenshot = 'Payment screenshot is required to verify your pass';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const selectedTrack = tracksData.find(t => t.id === formData.trackId) || matchedTrack;

  if (isSubmitted) {
    return (
      <div className="register-page-container">
        <div className="container" style={{ maxWidth: '680px', padding: 'var(--space-xl) var(--space-md)' }}>
          <div className="card success-card" style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>
            <div className="success-icon" style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: 'var(--space-md)' }}>
              ✓
            </div>
            <p className="section-number" style={{ color: 'var(--accent)', marginBottom: '8px' }}>REGISTRATION SUBMITTED</p>
            <h1 style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)' }}>Thank you for registering for TECHX.</h1>
            
            <div className="track-context-banner" style={{ textAlign: 'left', margin: 'var(--space-lg) 0' }}>
              <div className="track-context-label">REGISTERED TRACK</div>
              <div className="track-context-title">{selectedTrack.title} (TRACK {selectedTrack.num})</div>
              <div className="track-context-sub">{selectedTrack.badge}</div>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)', lineHeight: '1.6' }}>
              Your registration has been received successfully. We have logged your details and payment verification for <strong>{formData.fullName}</strong>.
            </p>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-lg)' }}>
              <button onClick={onBack} className="btn btn-primary" style={{ padding: '12px 32px' }}>
                Back to TechX Summit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page-container">
      <div className="container" style={{ maxWidth: '780px', padding: 'var(--space-xl) var(--space-md)' }}>
        
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

        <div className="card registration-card-wrapper" style={{ padding: 'var(--space-xl)' }}>
          {/* Header */}
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <p className="section-number" style={{ color: 'var(--accent)', marginBottom: '4px' }}>
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

          <form onSubmit={handleSubmit} noValidate>
            
            {/* Section 1: Personal Details */}
            <div className="form-section">
              <h3 className="form-section-title">1. Personal Details</h3>
              
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Alex Rivera"
                  className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                />
                {errors.fullName && <span className="form-error-text">{errors.fullName}</span>}
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="alex@example.com"
                    className={`form-input ${errors.email ? 'has-error' : ''}`}
                  />
                  {errors.email && <span className="form-error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    className={`form-input ${errors.phone ? 'has-error' : ''}`}
                  />
                  {errors.phone && <span className="form-error-text">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="college">College / University / Organization *</label>
                <input
                  type="text"
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  placeholder="e.g. SCT College of Engineering"
                  className={`form-input ${errors.college ? 'has-error' : ''}`}
                />
                {errors.college && <span className="form-error-text">{errors.college}</span>}
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="year">Year / Semester *</label>
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className={`form-input form-select ${errors.year ? 'has-error' : ''}`}
                  >
                    <option value="">Select current year</option>
                    <option value="1st Year">1st Year / S1-S2</option>
                    <option value="2nd Year">2nd Year / S3-S4</option>
                    <option value="3rd Year">3rd Year / S5-S6</option>
                    <option value="4th Year">4th Year / S7-S8</option>
                    <option value="Postgraduate / Professional">Postgraduate / Professional</option>
                  </select>
                  {errors.year && <span className="form-error-text">{errors.year}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="department">Department / Branch *</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="e.g. Computer Science, ECE, Mech, Biotech"
                    className={`form-input ${errors.department ? 'has-error' : ''}`}
                  />
                  {errors.department && <span className="form-error-text">{errors.department}</span>}
                </div>
              </div>
            </div>

            {/* Section 2: IEEE Membership */}
            <div className="form-section">
              <h3 className="form-section-title">2. IEEE Membership</h3>
              
              <div className="form-group">
                <label className="form-label">Are you an active IEEE Member? *</label>
                <div className="radio-group-row">
                  <label className={`radio-label-box ${formData.ieeeMember === 'yes' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="ieeeMember"
                      value="yes"
                      checked={formData.ieeeMember === 'yes'}
                      onChange={() => handleRadioChange('ieeeMember', 'yes')}
                    />
                    <span>YES</span>
                  </label>
                  
                  <label className={`radio-label-box ${formData.ieeeMember === 'no' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="ieeeMember"
                      value="no"
                      checked={formData.ieeeMember === 'no'}
                      onChange={() => handleRadioChange('ieeeMember', 'no')}
                    />
                    <span>NO</span>
                  </label>
                </div>
                {errors.ieeeMember && <span className="form-error-text">{errors.ieeeMember}</span>}
              </div>

              {/* Conditional IEEE Membership ID */}
              {formData.ieeeMember === 'yes' && (
                <div className="form-group animate-fade-in" style={{ marginTop: 'var(--space-md)' }}>
                  <label className="form-label" htmlFor="ieeeMembershipId">IEEE Membership Number (8-9 digits) *</label>
                  <input
                    type="text"
                    id="ieeeMembershipId"
                    name="ieeeMembershipId"
                    value={formData.ieeeMembershipId}
                    onChange={handleInputChange}
                    placeholder="e.g. 98765432"
                    className={`form-input ${errors.ieeeMembershipId ? 'has-error' : ''}`}
                  />
                  {errors.ieeeMembershipId && <span className="form-error-text">{errors.ieeeMembershipId}</span>}
                </div>
              )}
            </div>

            {/* Section 3: Payment */}
            <div className="form-section">
              <h3 className="form-section-title">3. Payment</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
                Complete the payment using the official UPI QR code below.
              </p>

              <div className="payment-qr-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-lg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-md)' }}>
                
                {/* Clean Payment QR SVG Mock */}
                <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '4px', border: '1px solid var(--border-color)', marginBottom: '12px' }}>
                  <svg width="180" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 10H40V40H10V10ZM15 15V35H35V15H15Z" fill="#1C1713"/>
                    <rect x="20" y="20" width="10" height="10" fill="#CF8326"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M60 10H90V40H60V10ZM65 15V35H85V15H65Z" fill="#1C1713"/>
                    <rect x="70" y="20" width="10" height="10" fill="#CF8326"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 60H40V90H10V60ZM15 65V85H35V65H15Z" fill="#1C1713"/>
                    <rect x="20" y="70" width="10" height="10" fill="#CF8326"/>
                    <rect x="45" y="10" width="10" height="10" fill="#1C1713"/>
                    <rect x="45" y="25" width="10" height="10" fill="#CF8326"/>
                    <rect x="45" y="45" width="10" height="10" fill="#1C1713"/>
                    <rect x="10" y="45" width="10" height="10" fill="#1C1713"/>
                    <rect x="25" y="45" width="10" height="10" fill="#CF8326"/>
                    <rect x="60" y="45" width="10" height="10" fill="#CF8326"/>
                    <rect x="75" y="45" width="15" height="10" fill="#1C1713"/>
                    <rect x="60" y="60" width="10" height="15" fill="#1C1713"/>
                    <rect x="75" y="60" width="15" height="15" fill="#CF8326"/>
                    <rect x="45" y="65" width="10" height="25" fill="#1C1713"/>
                    <rect x="60" y="80" width="30" height="10" fill="#1C1713"/>
                  </svg>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '4px' }}>
                    Amount: ₹{getTicketAmount()}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    UPI ID: ieeesctsb@okhdfcbank
                  </div>
                </div>
              </div>

              {/* Payment Screenshot Upload */}
              <div className="form-group" style={{ marginTop: 'var(--space-md)' }}>
                <label className="form-label">Upload Payment Screenshot * (JPG, JPEG, PNG, max 5 MB)</label>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                />

                {!formData.paymentScreenshot ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: `2px dashed ${errors.paymentScreenshot ? '#D32F2F' : 'var(--border-color)'}`,
                      padding: 'var(--space-lg)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(207, 131, 38, 0.02)',
                      transition: 'border-color 200ms ease'
                    }}
                  >
                    <div style={{ color: 'var(--accent)', fontSize: '1.5rem', marginBottom: '4px' }}>⇪</div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '2px' }}>
                      Click to choose screenshot
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Supports JPG, JPEG, PNG up to 5 MB
                    </div>
                  </div>
                ) : (
                  <div style={{ border: '1px solid var(--border-color)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)', backgroundColor: 'var(--bg-secondary)' }}>
                    {previewUrl && (
                      <img 
                        src={previewUrl} 
                        alt="Payment Screenshot Preview" 
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                      />
                    )}
                    <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {formData.paymentScreenshot.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {(formData.paymentScreenshot.size / (1024 * 1024)).toFixed(2)} MB
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
                {errors.paymentScreenshot && <span className="form-error-text">{errors.paymentScreenshot}</span>}
              </div>
            </div>

            {/* Submit Action */}
            <div style={{ marginTop: 'var(--space-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <button 
                type="submit" 
                className="btn btn-primary btn-large"
                style={{ width: '100%', height: '48px', fontSize: '0.9rem' }}
              >
                Complete Registration for Track {selectedTrack.num} →
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Your ticket credentials and orientation schedule will be delivered to your registered email.
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
