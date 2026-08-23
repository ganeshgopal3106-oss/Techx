import React, { useState, useRef, useEffect } from 'react';
import { eventData } from '../data/event';

interface RegisterPageProps {
  onBack: () => void;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  department: string;
  ieeeMember: 'yes' | 'no' | '';
  ieeeMembershipId: string;
  ieeeCSMember: 'yes' | 'no' | '';
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
  ieeeCSMember?: string;
  paymentScreenshot?: string;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    department: '',
    ieeeMember: '',
    ieeeMembershipId: '',
    ieeeCSMember: '',
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
    if (formData.ieeeMember === 'no') {
      return 400;
    }
    if (formData.ieeeMember === 'yes') {
      if (formData.ieeeCSMember === 'yes') {
        return 200;
      }
      if (formData.ieeeCSMember === 'no') {
        return 300;
      }
    }
    return 400; // Default fallback
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleRadioChange = (name: 'ieeeMember' | 'ieeeCSMember', value: 'yes' | 'no') => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Clear secondary dependent fields if parent toggled
      ...(name === 'ieeeMember' && value === 'no' ? { ieeeMembershipId: '', ieeeCSMember: '' } : {})
    }));

    setErrors(prev => ({
      ...prev,
      [name]: undefined,
      ...(name === 'ieeeMember' && value === 'no' ? { ieeeMembershipId: undefined, ieeeCSMember: undefined } : {})
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB

    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        paymentScreenshot: 'Only JPG, JPEG, and PNG images are supported.'
      }));
      clearFile();
      return;
    }

    if (file.size > maxSizeBytes) {
      setErrors(prev => ({
        ...prev,
        paymentScreenshot: 'Screenshot exceeds the 5 MB file size limit.'
      }));
      clearFile();
      return;
    }

    setFormData(prev => ({
      ...prev,
      paymentScreenshot: file
    }));
    
    // Clear error
    setErrors(prev => ({
      ...prev,
      paymentScreenshot: undefined
    }));

    // Revoke old URL if it exists
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const clearFile = () => {
    setFormData(prev => ({
      ...prev,
      paymentScreenshot: null
    }));
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerUploadClick = () => {
    fileInputRef.current?.click();
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.college.trim()) {
      newErrors.college = 'College or Organization name is required.';
    }
    if (!formData.year) {
      newErrors.year = 'Please select your Year / Semester.';
    }
    if (!formData.department) {
      newErrors.department = 'Please select your Department.';
    }
    if (!formData.ieeeMember) {
      newErrors.ieeeMember = 'Please select whether you are an IEEE member.';
    }
    if (formData.ieeeMember === 'yes') {
      if (!formData.ieeeMembershipId.trim()) {
        newErrors.ieeeMembershipId = 'IEEE Membership ID is required when Yes is selected.';
      }
      if (!formData.ieeeCSMember) {
        newErrors.ieeeCSMember = 'Please specify if you are an IEEE Computer Society (CS) member.';
      }
    }
    if (!formData.paymentScreenshot) {
      newErrors.paymentScreenshot = 'Payment screenshot is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Backend Data Structure verification
      console.log('Backend-Ready Data Structure:', {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        year: formData.year,
        department: formData.department,
        ieeeMember: formData.ieeeMember,
        ieeeMembershipId: formData.ieeeMember === 'yes' ? formData.ieeeMembershipId : '',
        ieeeCSMember: formData.ieeeMember === 'yes' ? formData.ieeeCSMember : 'no',
        ticketAmount: getTicketAmount(),
        paymentScreenshotName: formData.paymentScreenshot?.name,
        paymentScreenshotSize: formData.paymentScreenshot?.size
      });

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isSubmitted) {
    return (
      <div className="registration-page section-padding">
        <div className="container form-max-width success-state-container">
          <div className="success-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="success-check-icon">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 className="success-heading">Registration Submitted!</h2>
          <p className="success-text">Thank you for registering for <strong>{eventData.title}</strong>.</p>
          <p className="success-subtext">Your registration details and payment screenshot have been received successfully. We will verify your payment and email your event ticket pass soon.</p>
          <div className="success-actions">
            <button className="btn btn-primary" onClick={onBack}>
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-page section-padding">
      <div className="container form-max-width">
        {/* Back navigation */}
        <button className="back-link-btn" onClick={onBack}>
          <span className="back-arrow">←</span> Back
        </button>

        <div className="form-header">
          <h1 className="form-title">CLAIM YOUR SPOT</h1>
          <p className="form-subtitle">Register for {eventData.title}</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form" noValidate>
          
          {/* SECTION 1: PERSONAL DETAILS */}
          <div className="form-section-block">
            <h3 className="form-section-title">PERSONAL DETAILS</h3>
            
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">Full Name *</label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName"
                value={formData.fullName} 
                onChange={handleInputChange}
                className={`form-input-text ${errors.fullName ? 'has-error' : ''}`}
                placeholder="John Doe"
              />
              {errors.fullName && <span className="error-message-text">{errors.fullName}</span>}
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email} 
                  onChange={handleInputChange}
                  className={`form-input-text ${errors.email ? 'has-error' : ''}`}
                  placeholder="john@example.com"
                />
                {errors.email && <span className="error-message-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={formData.phone} 
                  onChange={handleInputChange}
                  className={`form-input-text ${errors.phone ? 'has-error' : ''}`}
                  placeholder="+91 XXXXX XXXXX"
                />
                {errors.phone && <span className="error-message-text">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="college" className="form-label">College / Organization *</label>
              <input 
                type="text" 
                id="college" 
                name="college"
                value={formData.college} 
                onChange={handleInputChange}
                className={`form-input-text ${errors.college ? 'has-error' : ''}`}
                placeholder="College / Institution Name"
              />
              {errors.college && <span className="error-message-text">{errors.college}</span>}
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="year" className="form-label">Year / Semester *</label>
                <select 
                  id="year" 
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className={`form-select ${errors.year ? 'has-error' : ''}`}
                >
                  <option value="">Select Year/Semester</option>
                  <option value="1st Year - S1">1st Year - Semester 1</option>
                  <option value="1st Year - S2">1st Year - Semester 2</option>
                  <option value="2nd Year - S3">2nd Year - Semester 3</option>
                  <option value="2nd Year - S4">2nd Year - Semester 4</option>
                  <option value="3rd Year - S5">3rd Year - Semester 5</option>
                  <option value="3rd Year - S6">3rd Year - Semester 6</option>
                  <option value="4th Year - S7">4th Year - Semester 7</option>
                  <option value="4th Year - S8">4th Year - Semester 8</option>
                  <option value="Other / Non-Student">Other / Professional / Non-Student</option>
                </select>
                {errors.year && <span className="error-message-text">{errors.year}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="department" className="form-label">Department *</label>
                <select 
                  id="department" 
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`form-select ${errors.department ? 'has-error' : ''}`}
                >
                  <option value="">Select Department</option>
                  <option value="CSE">Computer Science & Engineering</option>
                  <option value="IT">Information Technology</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="EEE">Electrical & Electronics</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="CE">Civil Engineering</option>
                  <option value="Other">Other Department / Non-Engineering</option>
                </select>
                {errors.department && <span className="error-message-text">{errors.department}</span>}
              </div>
            </div>
          </div>

          <hr className="form-divider" />

          {/* SECTION 2: IEEE MEMBERSHIP */}
          <div className="form-section-block">
            <h3 className="form-section-title">IEEE MEMBERSHIP</h3>
            
            <div className="form-group">
              <label className="form-label">Are you an IEEE member? *</label>
              <div className="form-radio-group">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="ieeeMember" 
                    checked={formData.ieeeMember === 'yes'}
                    onChange={() => handleRadioChange('ieeeMember', 'yes')}
                    className="form-radio-input"
                  />
                  <span className="radio-custom"></span>
                  Yes
                </label>
                
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="ieeeMember" 
                    checked={formData.ieeeMember === 'no'}
                    onChange={() => handleRadioChange('ieeeMember', 'no')}
                    className="form-radio-input"
                  />
                  <span className="radio-custom"></span>
                  No
                </label>
              </div>
              {errors.ieeeMember && <span className="error-message-text">{errors.ieeeMember}</span>}
            </div>

            {/* Transition Panel for IEEE Membership Details */}
            <div className={`ieee-details-transition ${formData.ieeeMember === 'yes' ? 'visible' : ''}`}>
              <div className="form-group">
                <label htmlFor="ieeeMembershipId" className="form-label">IEEE Membership ID *</label>
                <input 
                  type="text" 
                  id="ieeeMembershipId" 
                  name="ieeeMembershipId"
                  value={formData.ieeeMembershipId} 
                  onChange={handleInputChange}
                  className={`form-input-text ${errors.ieeeMembershipId ? 'has-error' : ''}`}
                  placeholder="Membership Number"
                  disabled={formData.ieeeMember !== 'yes'}
                />
                {errors.ieeeMembershipId && <span className="error-message-text">{errors.ieeeMembershipId}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Are you an IEEE Computer Society (CS) member? *</label>
                <div className="form-radio-group">
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="ieeeCSMember" 
                      checked={formData.ieeeCSMember === 'yes'}
                      onChange={() => handleRadioChange('ieeeCSMember', 'yes')}
                      className="form-radio-input"
                      disabled={formData.ieeeMember !== 'yes'}
                    />
                    <span className="radio-custom"></span>
                    Yes
                  </label>
                  
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="ieeeCSMember" 
                      checked={formData.ieeeCSMember === 'no'}
                      onChange={() => handleRadioChange('ieeeCSMember', 'no')}
                      className="form-radio-input"
                      disabled={formData.ieeeMember !== 'yes'}
                    />
                    <span className="radio-custom"></span>
                    No
                  </label>
                </div>
                {errors.ieeeCSMember && <span className="error-message-text">{errors.ieeeCSMember}</span>}
              </div>
            </div>
          </div>

          <hr className="form-divider" />

          {/* SECTION 3: PAYMENT */}
          <div className="form-section-block">
            <h3 className="form-section-title">PAYMENT</h3>
            <p className="payment-instruction">Complete the payment using the QR code below.</p>
            
            <div className="payment-qr-container">
              {/* Responsive Vector SVG UPI QR code */}
              <svg viewBox="0 0 150 150" className="payment-qr-svg" aria-label="Payment QR Code">
                <rect width="150" height="150" fill="white" />
                {/* Border frames */}
                <path d="M10 10 h30 M10 10 v30 M140 10 h-30 M140 10 v30 M10 140 h30 M10 140 v-30 M140 140 h-30 M140 140 v-30" stroke="black" strokeWidth="4" fill="none" />
                {/* Top-Left Corner Box */}
                <rect x="20" y="20" width="30" height="30" fill="black" />
                <rect x="25" y="25" width="20" height="20" fill="white" />
                <rect x="30" y="30" width="10" height="10" fill="black" />
                {/* Top-Right Corner Box */}
                <rect x="100" y="20" width="30" height="30" fill="black" />
                <rect x="105" y="25" width="20" height="20" fill="white" />
                <rect x="110" y="30" width="10" height="10" fill="black" />
                {/* Bottom-Left Corner Box */}
                <rect x="20" y="100" width="30" height="30" fill="black" />
                <rect x="25" y="105" width="20" height="20" fill="white" />
                <rect x="30" y="110" width="10" height="10" fill="black" />
                {/* QR Code Matrix Elements (premium mock look) */}
                <rect x="60" y="20" width="10" height="15" fill="black" />
                <rect x="80" y="20" width="15" height="10" fill="black" />
                <rect x="65" y="45" width="20" height="10" fill="black" />
                <rect x="90" y="40" width="5" height="20" fill="black" />
                <rect x="110" y="60" width="20" height="5" fill="black" />
                <rect x="125" y="70" width="10" height="20" fill="black" />
                
                <rect x="20" y="60" width="15" height="10" fill="black" />
                <rect x="45" y="60" width="10" height="30" fill="black" />
                <rect x="25" y="80" width="10" height="10" fill="black" />
                
                <rect x="60" y="70" width="30" height="25" fill="black" />
                <rect x="65" y="75" width="20" height="15" fill="white" />
                <rect x="72" y="82" width="6" height="6" fill="black" />
                
                <rect x="100" y="100" width="15" height="10" fill="black" />
                <rect x="120" y="105" width="10" height="25" fill="black" />
                <rect x="60" y="110" width="15" height="10" fill="black" />
                <rect x="80" y="125" width="30" height="10" fill="black" />
                <rect x="60" y="130" width="10" height="10" fill="black" />
                {/* UPI identifier in center */}
                <rect x="63" y="63" width="24" height="24" rx="4" fill="white" stroke="black" strokeWidth="1.5" />
                <text x="75" y="77" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="black">UPI</text>
              </svg>
            </div>

            <div className="payment-amount-display">
              Amount: <span className="amount-val">₹{getTicketAmount()}</span>
            </div>

            <div className="form-group screenshot-upload-group">
              <label className="form-label">Payment Screenshot *</label>
              
              <div 
                className={`upload-dropzone ${errors.paymentScreenshot ? 'has-error' : ''}`}
                onClick={triggerUploadClick}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png"
                  className="hidden-file-input"
                />
                
                <div className="upload-prompt">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="upload-icon">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span className="upload-action-text">Upload Screenshot</span>
                  <span className="upload-meta-text">JPG, JPEG or PNG • Maximum 5 MB</span>
                </div>
              </div>

              {errors.paymentScreenshot && <span className="error-message-text">{errors.paymentScreenshot}</span>}

              {/* Screenshot Preview */}
              {formData.paymentScreenshot && previewUrl && (
                <div className="screenshot-preview-container">
                  <div className="preview-header">
                    <span className="preview-filename" title={formData.paymentScreenshot.name}>
                      {formData.paymentScreenshot.name}
                    </span>
                    <button type="button" className="preview-remove-btn" onClick={clearFile}>
                      Remove
                    </button>
                  </div>
                  <div className="preview-body">
                    <img src={previewUrl} alt="Screenshot Preview" className="preview-img" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <hr className="form-divider" />

          {/* SUBMIT BUTTON */}
          <div className="form-submit-container">
            <button type="submit" className="btn btn-primary btn-large form-submit-btn">
              CLAIM YOUR SPOT →
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
