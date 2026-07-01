import React, { useState, useEffect } from 'react';
import { User, BookOpen, MapPin, UploadCloud, FileText, CheckCircle, ArrowRight, ArrowLeft, CreditCard } from 'lucide-react';
import { PaymentPortal } from '../components/PaymentPortal';

interface ApplyFormProps {
  initialMarks?: {
    maths: number;
    science: number;
    english: number;
    social: number;
    optional: number;
    board: string;
  } | null;
  onSubmitApplication: (application: any) => void;
}

export const ApplyForm: React.FC<ApplyFormProps> = ({ initialMarks, onSubmitApplication }) => {
  const [step, setStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);

  // Form States
  const [personal, setPersonal] = useState({
    name: '',
    dob: '',
    gender: 'Male',
    guardian: '',
    email: '',
    mobile: '',
    aadhaar: ''
  });

  const [academic, setAcademic] = useState({
    level: 'School (Class 11)',
    board: 'CBSE',
    pastSchool: '',
    passingYear: '2026',
    rollNumber: '',
    maths: 80,
    science: 80,
    english: 80,
    social: 80,
    optional: 80
  });

  const [program, setProgram] = useState({
    institution: 'Vidya Public School',
    stream: 'Class 11 Science Stream',
    feeAmount: 5000
  });

  const [documents, setDocuments] = useState({
    marksheet: null as string | null,
    aadhaarFile: null as string | null,
    photo: null as string | null
  });

  // Autofill marks if they come from eligibility calculator
  useEffect(() => {
    if (initialMarks) {
      setAcademic(prev => ({
        ...prev,
        board: initialMarks.board,
        maths: initialMarks.maths,
        science: initialMarks.science,
        english: initialMarks.english,
        social: initialMarks.social,
        optional: initialMarks.optional
      }));
      // Autofill level based on marks (estimate)
      setStep(1); // Ensure we start on page 1 but marks are preset!
    }
  }, [initialMarks]);

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPersonal({ ...personal, [e.target.name]: e.target.value });
  };

  const handleAcademicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (['maths', 'science', 'english', 'social', 'optional'].includes(name)) {
      const num = Math.min(100, Math.max(0, parseInt(value) || 0));
      setAcademic({ ...academic, [name]: num });
    } else {
      setAcademic({ ...academic, [name]: value });
    }
  };

  // Adjust streams and fees depending on selection
  useEffect(() => {
    if (academic.level === 'School (Class 11)') {
      setProgram({
        institution: 'Vidya Public School',
        stream: 'Class 11 Science Stream',
        feeAmount: 5000
      });
    } else {
      setProgram({
        institution: 'Sharda Institute of Technology',
        stream: 'B.Tech Engineering (CSE)',
        feeAmount: 12000
      });
    }
  }, [academic.level]);

  const handleInstitutionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inst = e.target.value;
    let defaultStream = '';
    let fee = 5000;

    if (inst === 'Vidya Public School') {
      defaultStream = 'Class 11 Science Stream';
      fee = 5000;
    } else if (inst === "St. Xavier's Academy") {
      defaultStream = 'Class 11 Arts & Humanities';
      fee = 5500;
    } else if (inst === 'Sharda Institute of Technology') {
      defaultStream = 'B.Tech Engineering (CSE)';
      fee = 12000;
    } else if (inst === 'Sharda College of Commerce') {
      defaultStream = 'B.Com Honors (Accounting)';
      fee = 9500;
    } else {
      defaultStream = 'B.A. Honors (Economics)';
      fee = 8000;
    }

    setProgram({ institution: inst, stream: defaultStream, feeAmount: fee });
  };

  const handleMockUpload = (field: keyof typeof documents, fileName: string) => {
    setDocuments(prev => ({ ...prev, [field]: fileName }));
  };

  const aggregatePercent = Math.round(
    (academic.maths + academic.science + academic.english + academic.social + academic.optional) / 5
  );

  const validateStep = () => {
    if (step === 1) {
      return personal.name && personal.dob && personal.guardian && personal.email && personal.mobile && personal.aadhaar.length === 12;
    }
    if (step === 2) {
      return academic.pastSchool && academic.rollNumber;
    }
    if (step === 4) {
      return documents.marksheet && documents.aadhaarFile;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    } else {
      alert('Please fill out all required fields correctly before moving forward.');
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handlePaymentSuccess = (receipt: any) => {
    const finalApplication = {
      id: `APP${Math.floor(100000 + Math.random() * 900000)}`,
      personal,
      academic: {
        ...academic,
        aggregate: aggregatePercent
      },
      program,
      documents,
      payment: receipt,
      status: 'Submitted'
    };
    onSubmitApplication(finalApplication);
  };

  return (
    <div className="container py-4 px-3 px-md-5 text-start animate-fade-in" id="apply-portal-view">
      {!showPayment ? (
        <div className="card glass-card p-4 shadow-sm border-0">
          <h3 className="fw-bold mb-2 gradient-text">VidyaEnroll Admission Form</h3>
          <p className="text-secondary mb-4" style={{ fontSize: '14px' }}>
            Follow the 5-step registration wizard to file your application.
          </p>

          {/* Stepper Indicators */}
          <div className="row g-2 mb-5 text-center text-secondary" style={{ fontSize: '12px', fontWeight: 'bold' }}>
            <div className={`col ${step === 1 ? 'text-primary' : ''}`}>
              <div className={`mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center ${step === 1 ? 'bg-primary text-white' : 'bg-light border'}`} style={{ width: '32px', height: '32px' }}>1</div>
              <span>Profile</span>
            </div>
            <div className={`col ${step === 2 ? 'text-primary' : ''}`}>
              <div className={`mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center ${step === 2 ? 'bg-primary text-white' : 'bg-light border'}`} style={{ width: '32px', height: '32px' }}>2</div>
              <span>Academic</span>
            </div>
            <div className={`col ${step === 3 ? 'text-primary' : ''}`}>
              <div className={`mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center ${step === 3 ? 'bg-primary text-white' : 'bg-light border'}`} style={{ width: '32px', height: '32px' }}>3</div>
              <span>Program</span>
            </div>
            <div className={`col ${step === 4 ? 'text-primary' : ''}`}>
              <div className={`mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center ${step === 4 ? 'bg-primary text-white' : 'bg-light border'}`} style={{ width: '32px', height: '32px' }}>4</div>
              <span>Documents</span>
            </div>
            <div className={`col ${step === 5 ? 'text-primary' : ''}`}>
              <div className={`mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center ${step === 5 ? 'bg-primary text-white' : 'bg-light border'}`} style={{ width: '32px', height: '32px' }}>5</div>
              <span>Review</span>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div className="row g-3 animate-fade-in" id="step-1-form">
                <h5 className="fw-bold mb-1 text-primary d-flex align-items-center gap-2">
                  <User size={18} /> Personal Profile Details
                </h5>
                <div className="col-md-6">
                  <label htmlFor="inputName" className="form-label">Full Name (As in Marksheet) <span className="text-danger">*</span></label>
                  <input id="inputName" type="text" className="form-control bg-transparent" name="name" value={personal.name} onChange={handlePersonalChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputDob" className="form-label">Date of Birth <span className="text-danger">*</span></label>
                  <input id="inputDob" type="date" className="form-control bg-transparent" name="dob" value={personal.dob} onChange={handlePersonalChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="selectGender" className="form-label">Gender</label>
                  <select id="selectGender" className="form-select bg-transparent" name="gender" value={personal.gender} onChange={handlePersonalChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputGuardian" className="form-label">Parent / Guardian Name <span className="text-danger">*</span></label>
                  <input id="inputGuardian" type="text" className="form-control bg-transparent" name="guardian" value={personal.guardian} onChange={handlePersonalChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail" className="form-label">Email Address <span className="text-danger">*</span></label>
                  <input id="inputEmail" type="email" className="form-control bg-transparent" name="email" value={personal.email} onChange={handlePersonalChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputMobile" className="form-label">Mobile Number <span className="text-danger">*</span></label>
                  <input id="inputMobile" type="tel" className="form-control bg-transparent" name="mobile" placeholder="10-digit number" value={personal.mobile} onChange={handlePersonalChange} maxLength={10} required />
                </div>
                <div className="col-12">
                  <label htmlFor="inputAadhaar" className="form-label">Aadhaar Card Number (12 Digits) <span className="text-danger">*</span></label>
                  <input id="inputAadhaar" type="text" className="form-control bg-transparent" name="aadhaar" placeholder="123456789012" value={personal.aadhaar} onChange={handlePersonalChange} maxLength={12} required />
                  <div className="form-text" style={{ fontSize: '11px' }}>Must enter a valid 12-digit Indian national identity number.</div>
                </div>
              </div>
            )}

            {/* Step 2: Academic Record */}
            {step === 2 && (
              <div className="row g-3 animate-fade-in" id="step-2-form">
                <h5 className="fw-bold mb-1 text-primary d-flex align-items-center gap-2">
                  <BookOpen size={18} /> Academic History & Marks
                </h5>
                <div className="col-md-6">
                  <label htmlFor="selectLevel" className="form-label">Admission Level Target</label>
                  <select id="selectLevel" className="form-select bg-transparent" name="level" value={academic.level} onChange={handleAcademicChange}>
                    <option value="School (Class 11)">High School (Class 11)</option>
                    <option value="College (Undergraduate)">College / University (Undergraduate)</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="selectAcademicBoard" className="form-label">Passing Education Board</label>
                  <select id="selectAcademicBoard" className="form-select bg-transparent" name="board" value={academic.board} onChange={handleAcademicChange}>
                    <option value="CBSE">CBSE (Central Board)</option>
                    <option value="ICSE">CISCE / ICSE</option>
                    <option value="State Board">State Board</option>
                    <option value="IB">IB / International</option>
                  </select>
                </div>
                <div className="col-md-8">
                  <label htmlFor="inputPastSchool" className="form-label">Previous School / College Name <span className="text-danger">*</span></label>
                  <input id="inputPastSchool" type="text" className="form-control bg-transparent" name="pastSchool" value={academic.pastSchool} onChange={handleAcademicChange} required />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputRollNumber" className="form-label">Board Examination Roll Number <span className="text-danger">*</span></label>
                  <input id="inputRollNumber" type="text" className="form-control bg-transparent" name="rollNumber" value={academic.rollNumber} onChange={handleAcademicChange} required />
                </div>

                <div className="col-12 mt-4">
                  <p className="fw-bold text-secondary mb-1">Board Marksheet Summary (Score / 100)</p>
                  <div className="row g-2">
                    <div className="col-4 col-md">
                      <label htmlFor="mathsMarkForm" className="form-label" style={{ fontSize: '12px' }}>Maths</label>
                      <input id="mathsMarkForm" type="number" className="form-control bg-transparent" name="maths" value={academic.maths} onChange={handleAcademicChange} required />
                    </div>
                    <div className="col-4 col-md">
                      <label htmlFor="scienceMarkForm" className="form-label" style={{ fontSize: '12px' }}>Science</label>
                      <input id="scienceMarkForm" type="number" className="form-control bg-transparent" name="science" value={academic.science} onChange={handleAcademicChange} required />
                    </div>
                    <div className="col-4 col-md">
                      <label htmlFor="englishMarkForm" className="form-label" style={{ fontSize: '12px' }}>English</label>
                      <input id="englishMarkForm" type="number" className="form-control bg-transparent" name="english" value={academic.english} onChange={handleAcademicChange} required />
                    </div>
                    <div className="col-6 col-md">
                      <label htmlFor="socialMarkForm" className="form-label" style={{ fontSize: '12px' }}>Social Sci</label>
                      <input id="socialMarkForm" type="number" className="form-control bg-transparent" name="social" value={academic.social} onChange={handleAcademicChange} required />
                    </div>
                    <div className="col-6 col-md">
                      <label htmlFor="optionalMarkForm" className="form-label" style={{ fontSize: '12px' }}>Optional</label>
                      <input id="optionalMarkForm" type="number" className="form-control bg-transparent" name="optional" value={academic.optional} onChange={handleAcademicChange} required />
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-light bg-opacity-25 rounded d-inline-block border">
                    <strong className="text-primary">Calculated Aggregate: {aggregatePercent}%</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Program & Institution Selection */}
            {step === 3 && (
              <div className="row g-3 animate-fade-in" id="step-3-form">
                <h5 className="fw-bold mb-1 text-primary d-flex align-items-center gap-2">
                  <MapPin size={18} /> Program & Campus Matching
                </h5>
                <div className="col-md-6">
                  <label htmlFor="selectInstitution" className="form-label">Select Campus / Institution</label>
                  <select id="selectInstitution" className="form-select bg-transparent" value={program.institution} onChange={handleInstitutionChange}>
                    {academic.level === 'School (Class 11)' ? (
                      <>
                        <option value="Vidya Public School">Vidya Public School</option>
                        <option value="St. Xavier's Academy">St. Xavier's Academy</option>
                      </>
                    ) : (
                      <>
                        <option value="Sharda Institute of Technology">Sharda Institute of Technology</option>
                        <option value="Sharda College of Commerce">Sharda College of Commerce</option>
                        <option value="Sharda College of Humanities">Sharda College of Humanities</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="selectStream" className="form-label">Available Subject Streams / Programs</label>
                  <select 
                    id="selectStream"
                    className="form-select bg-transparent" 
                    value={program.stream} 
                    onChange={(e) => setProgram({ ...program, stream: e.target.value })}
                  >
                    {program.institution === 'Vidya Public School' && (
                      <>
                        <option value="Class 11 Science Stream">Class 11 Science Stream (PCM/PCB)</option>
                        <option value="Class 11 Commerce Stream">Class 11 Commerce Stream</option>
                        <option value="Class 11 Arts Stream">Class 11 Arts Stream</option>
                      </>
                    )}
                    {program.institution === "St. Xavier's Academy" && (
                      <>
                        <option value="Class 11 Science Stream">Class 11 Science Stream</option>
                        <option value="Class 11 Commerce Stream">Class 11 Commerce Stream</option>
                        <option value="Class 11 Arts & Humanities">Class 11 Arts & Humanities</option>
                      </>
                    )}
                    {program.institution === 'Sharda Institute of Technology' && (
                      <>
                        <option value="B.Tech Engineering (CSE)">B.Tech Computer Science Engineering (CSE)</option>
                        <option value="B.Tech Engineering (ECE)">B.Tech Electronics & Comm. Engg. (ECE)</option>
                        <option value="B.Tech Engineering (AI & ML)">B.Tech Artificial Intelligence & ML</option>
                      </>
                    )}
                    {program.institution === 'Sharda College of Commerce' && (
                      <>
                        <option value="B.Com Honors (Accounting)">B.Com Honors (Accounting & Finance)</option>
                        <option value="BBA General">BBA General (Business Administration)</option>
                      </>
                    )}
                    {program.institution === 'Sharda College of Humanities' && (
                      <>
                        <option value="B.A. Honors (Economics)">B.A. Honors (Economics & Political Science)</option>
                        <option value="B.Sc Honors (Psychology)">B.Sc Honors (Psychology)</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="col-12 mt-4">
                  <div className="card border-0 p-3 bg-warning bg-opacity-10 text-dark rounded-3 border-start border-warning border-3">
                    <h6 className="fw-bold mb-1">Registration Counseling Advice</h6>
                    <p style={{ fontSize: '13px', margin: 0 }}>
                      Based on your Board results, you are <strong>Eligible</strong> for this program.
                      The entry application form fee is <strong>₹{program.feeAmount.toLocaleString('en-IN')}</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Digital Document Uploads */}
            {step === 4 && (
              <div className="row g-3 animate-fade-in" id="step-4-form">
                <h5 className="fw-bold mb-1 text-primary d-flex align-items-center gap-2">
                  <UploadCloud size={18} /> Digital Document Attachments
                </h5>
                <p className="text-secondary" style={{ fontSize: '13px' }}>
                  Please attach digital scans (PDF/JPG, max 2MB) for verifying your profile details.
                </p>

                {/* Marksheet Upload */}
                <div className="col-md-6">
                  <div className="border border-dashed p-3 rounded text-center relative" style={{ cursor: 'pointer', background: 'rgba(0,0,0,0.01)' }}>
                    <FileText className="text-secondary mb-2 mx-auto" size={28} />
                    <h6 className="fw-semibold text-secondary" style={{ fontSize: '13px' }}>Academic Passing Marksheet <span className="text-danger">*</span></h6>
                    {documents.marksheet ? (
                      <span className="badge bg-success mt-2">{documents.marksheet}</span>
                    ) : (
                      <button id="upload-marksheet-btn" type="button" className="btn btn-sm btn-outline-secondary mt-2" onClick={() => handleMockUpload('marksheet', 'board_marksheet_10th.pdf')}>
                        Simulate File Upload
                      </button>
                    )}
                  </div>
                </div>

                {/* Identity Upload */}
                <div className="col-md-6">
                  <div className="border border-dashed p-3 rounded text-center relative" style={{ cursor: 'pointer', background: 'rgba(0,0,0,0.01)' }}>
                    <FileText className="text-secondary mb-2 mx-auto" size={28} />
                    <h6 className="fw-semibold text-secondary" style={{ fontSize: '13px' }}>Aadhaar Card Scan Copy <span className="text-danger">*</span></h6>
                    {documents.aadhaarFile ? (
                      <span className="badge bg-success mt-2">{documents.aadhaarFile}</span>
                    ) : (
                      <button id="upload-aadhaar-btn" type="button" className="btn btn-sm btn-outline-secondary mt-2" onClick={() => handleMockUpload('aadhaarFile', 'aadhaar_card_scanned.jpg')}>
                        Simulate File Upload
                      </button>
                    )}
                  </div>
                </div>

                {/* Student Photo */}
                <div className="col-md-12">
                  <div className="border border-dashed p-3 rounded text-center relative" style={{ cursor: 'pointer', background: 'rgba(0,0,0,0.01)' }}>
                    <UploadCloud className="text-secondary mb-2 mx-auto" size={28} />
                    <h6 className="fw-semibold text-secondary" style={{ fontSize: '13px' }}>Passport Size Student Photograph</h6>
                    {documents.photo ? (
                      <span className="badge bg-success mt-2">{documents.photo}</span>
                    ) : (
                      <button id="upload-photo-btn" type="button" className="btn btn-sm btn-outline-secondary mt-2" onClick={() => handleMockUpload('photo', 'passport_size_photo.jpg')}>
                        Simulate File Upload
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Summary Review */}
            {step === 5 && (
              <div className="row g-3 animate-fade-in" id="step-5-form">
                <h5 className="fw-bold mb-1 text-primary d-flex align-items-center gap-2">
                  <CheckCircle size={18} /> Verify Registration Summary
                </h5>
                <div className="col-12 bg-light bg-opacity-25 border p-3 rounded-3" style={{ fontSize: '14px' }}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <span className="text-secondary d-block">APPLICANT NAME:</span>
                      <strong className="text-primary">{personal.name}</strong>
                    </div>
                    <div className="col-md-6">
                      <span className="text-secondary d-block">PARENT/GUARDIAN Name:</span>
                      <strong>{personal.guardian}</strong>
                    </div>
                    <div className="col-md-6">
                      <span className="text-secondary d-block">CONTACT CHANNELS:</span>
                      <strong>{personal.email} | {personal.mobile}</strong>
                    </div>
                    <div className="col-md-6">
                      <span className="text-secondary d-block">AADHAAR ID:</span>
                      <strong>{personal.aadhaar}</strong>
                    </div>
                    <hr className="my-2" />
                    <div className="col-md-6">
                      <span className="text-secondary d-block">BOARD MARKS aggregate:</span>
                      <strong>{academic.board} ({aggregatePercent}%)</strong>
                    </div>
                    <div className="col-md-6">
                      <span className="text-secondary d-block">TARGET PROGRAM:</span>
                      <strong className="text-success">{program.institution} | {program.stream}</strong>
                    </div>
                    <hr className="my-2" />
                    <div className="col-12">
                      <span className="text-secondary d-block">DOCUMENT ATTACHMENTS:</span>
                      <span className="badge bg-secondary me-2">{documents.marksheet}</span>
                      <span className="badge bg-secondary me-2">{documents.aadhaarFile}</span>
                      {documents.photo && <span className="badge bg-secondary">{documents.photo}</span>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Nav Buttons */}
            <div className="d-flex justify-content-between mt-5 border-top pt-3">
              {step > 1 ? (
                <button id="apply-prev-btn" type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={prevStep}>
                  <ArrowLeft size={16} className="me-1" /> Previous
                </button>
              ) : <div />}

              {step < 5 ? (
                <button id="apply-next-btn" type="button" className="btn btn-premium px-4 d-flex align-items-center gap-1" onClick={nextStep}>
                  Next Step <ArrowRight size={16} />
                </button>
              ) : (
                <button 
                  id="apply-pay-redirect-btn"
                  type="button" 
                  className="btn btn-premium px-4 d-flex align-items-center gap-1" 
                  onClick={() => setShowSettingsModalOrGate()}
                >
                  Confirm & Pay Registration Fee <CreditCard size={16} />
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        /* Payment view portal */
        <div className="card border-0 bg-transparent animate-fade-in">
          <button 
            type="button" 
            className="btn btn-sm btn-outline-secondary mb-3 rounded-pill align-self-start" 
            onClick={() => setShowPayment(false)}
          >
            <ArrowLeft size={14} className="me-1" /> Back to Review Form
          </button>
          <PaymentPortal 
            studentName={personal.name}
            applicationId={`REG${Math.floor(100000 + Math.random() * 900000)}`}
            courseName={program.stream}
            institutionName={program.institution}
            amount={program.feeAmount}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </div>
      )}
    </div>
  );

  function setShowSettingsModalOrGate() {
    if (!documents.marksheet || !documents.aadhaarFile) {
      alert("Missing attachments! Go to Step 4 and upload the required documents.");
      setStep(4);
      return;
    }
    setShowPayment(true);
  }
};
