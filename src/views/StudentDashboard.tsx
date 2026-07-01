import React from 'react';
import { Award, Download, FileText, Mail, UserCheck } from 'lucide-react';

interface StudentDashboardProps {
  application: any;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ application }) => {
  // If no application has been submitted yet, show mock details or empty state
  const mockApplication = {
    id: 'APP983172',
    personal: {
      name: 'Aditya Sharma',
      email: 'aditya.sharma@gmail.com',
      mobile: '+91 9876543210',
      aadhaar: '5432 9812 7634'
    },
    program: {
      institution: 'Sharda Institute of Technology',
      stream: 'B.Tech Engineering (AI & ML)',
      feeAmount: 12000
    },
    academic: {
      board: 'CBSE',
      aggregate: 88
    },
    payment: {
      transactionId: 'TXN8729104',
      amount: 12000,
      date: '01/07/2026, 17:30 PM',
      method: 'UPI Scan & Pay',
      status: 'Success'
    },
    status: 'Document Verification' // Submitted, Under Review, Document Verification, Approved, Rejected
  };

  const app = application || mockApplication;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted':
        return <span className="badge bg-secondary py-1.5 px-3 rounded-pill text-uppercase">Form Submitted</span>;
      case 'Under Review':
        return <span className="badge bg-info py-1.5 px-3 rounded-pill text-uppercase">Under Review</span>;
      case 'Document Verification':
        return <span className="badge bg-warning text-dark py-1.5 px-3 rounded-pill text-uppercase">Verifying Documents</span>;
      case 'Approved':
        return <span className="badge bg-success py-1.5 px-3 rounded-pill text-uppercase">Admission Approved</span>;
      case 'Rejected':
        return <span className="badge bg-danger py-1.5 px-3 rounded-pill text-uppercase">Admission Rejected</span>;
      default:
        return <span className="badge bg-secondary py-1.5 px-3 rounded-pill text-uppercase">{status}</span>;
    }
  };

  const stepStatus = ['Submitted', 'Under Review', 'Document Verification', 'Approved'];
  const currentStepIndex = stepStatus.indexOf(app.status);

  // Generate admission letter download simulation
  const printAdmissionLetter = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Admission Offer Letter</title>
          <style>
            body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; line-height: 1.6; }
            .header { text-align: center; border-bottom: 2px solid #1e3c72; padding-bottom: 20px; }
            .content { margin-top: 30px; }
            .footer { margin-top: 50px; border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; text-align: center; }
            .stamp { color: green; border: 3px double green; padding: 5px 15px; display: inline-block; font-weight: bold; transform: rotate(-5deg); margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>VIDYAENROLL CAMPUS ADMISSION BOARD</h2>
            <p>Office of the Registrar | Certificate of Enrollment</p>
          </div>
          <div class="content">
            <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
            <p><strong>To,</strong><br>${app.personal.name}<br>Email: ${app.personal.email}</p>
            <h3>Subject: Provisional Admission Offer Letter for Academic Year 2026-27</h3>
            <p>Dear ${app.personal.name},</p>
            <p>We are pleased to inform you that your application for admission has been reviewed and approved by the Academic Council. You have been provisionally admitted to the following program:</p>
            <ul>
              <li><strong>Institution:</strong> ${app.program.institution}</li>
              <li><strong>Program Stream:</strong> ${app.program.stream}</li>
              <li><strong>Registration Code:</strong> ${app.id}</li>
              <li><strong>Academic Board:</strong> ${app.academic.board}</li>
            </ul>
            <p>Your registration fee of <strong>INR ${app.program.feeAmount.toLocaleString('en-IN')}.00</strong> has been received and cleared under reference <strong>${app.payment.transactionId}</strong>.</p>
            <p>Please report to the respective campus on August 10th, 2026 with original academic marksheet copies for identity validation.</p>
            <p>Congratulations and welcome to our academic community!</p>
            <div class="stamp">PROVISIONALLY ADMITTED</div>
          </div>
          <div class="footer">
            <p>VidyaEnroll Joint Admission Committee, New Delhi, India</p>
            <p>This is a computer generated certificate and requires no manual signature.</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container py-4 px-3 px-md-5 text-start animate-fade-in" id="student-dashboard-view">
      <div className="row g-4">
        {/* Left Side: Summary & Status Stepper */}
        <div className="col-lg-8">
          <div className="card glass-card p-4 h-100 border-0 shadow-sm">
            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
              <div>
                <span className="text-secondary fw-semibold" style={{ fontSize: '11px' }}>APPLICATION ID: {app.id}</span>
                <h3 className="fw-bold m-0 text-primary">Namaste, {app.personal.name}</h3>
              </div>
              {getStatusBadge(app.status)}
            </div>

            {/* Stepper Status Bar */}
            {app.status !== 'Rejected' && (
              <div className="mb-5 mt-3">
                <p className="fw-bold text-secondary mb-3" style={{ fontSize: '13px' }}>ENROLLMENT ROADMAP</p>
                <div className="position-relative d-flex justify-content-between text-center" style={{ fontSize: '11.5px' }}>
                  {/* Progress Line */}
                  <div className="position-absolute bg-light border-top" style={{ top: '15px', left: '10%', right: '10%', height: '2px', zIndex: 0 }} />
                  <div className="position-absolute bg-success" style={{ top: '15px', left: '10%', width: `${Math.max(0, currentStepIndex) * 33.3}%`, height: '2px', zIndex: 0, transition: 'width 0.4s ease' }} />

                  {stepStatus.map((step, idx) => {
                    const isCompleted = idx <= currentStepIndex;
                    const isActive = idx === currentStepIndex;
                    return (
                      <div key={step} className="z-1 text-center" style={{ width: '20%' }}>
                        <div className={`mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center border ${isCompleted ? 'bg-success border-success text-white' : 'bg-white text-secondary'}`} style={{ width: '32px', height: '32px', fontWeight: 'bold' }}>
                          {isCompleted ? '✓' : idx + 1}
                        </div>
                        <span className={`d-block fw-semibold ${isActive ? 'text-primary' : 'text-secondary'}`}>{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Details Grid */}
            <h5 className="fw-bold mb-3 border-bottom pb-2 text-secondary" style={{ fontSize: '14px' }}>Registration Parameters</h5>
            <div className="row g-3" style={{ fontSize: '14px' }}>
              <div className="col-sm-6">
                <span className="text-secondary d-block">Target Institution:</span>
                <strong className="text-primary">{app.program.institution}</strong>
              </div>
              <div className="col-sm-6">
                <span className="text-secondary d-block">Allotted Stream Program:</span>
                <strong className="text-primary">{app.program.stream}</strong>
              </div>
              <div className="col-sm-6">
                <span className="text-secondary d-block">Secondary Academic Board:</span>
                <strong>{app.academic.board} (Aggregate Score: {app.academic.aggregate}%)</strong>
              </div>
              <div className="col-sm-6">
                <span className="text-secondary d-block">Registered Identity (Aadhaar):</span>
                <strong>{app.personal.aadhaar}</strong>
              </div>
              <div className="col-sm-6">
                <span className="text-secondary d-block">Student Primary Contact:</span>
                <strong>{app.personal.email} | {app.personal.mobile}</strong>
              </div>
            </div>

            {/* Dashboard Alerts/Notice from council */}
            <div className="mt-4 p-3 bg-light bg-opacity-25 rounded-3 border-start border-3 border-info">
              <h6 className="fw-bold mb-1 text-info d-flex align-items-center gap-1">
                <Mail size={16} /> Council Office Note
              </h6>
              {app.status === 'Submitted' && (
                <p className="text-secondary mb-0" style={{ fontSize: '12.5px' }}>
                  Your application has been received. Our administrative desk is currently processing the verification of board scores and Identity documents. Check back in 24 hours.
                </p>
              )}
              {app.status === 'Under Review' && (
                <p className="text-secondary mb-0" style={{ fontSize: '12.5px' }}>
                  Administrative desks are analyzing your credentials against the cutoff rules of the target stream.
                </p>
              )}
              {app.status === 'Document Verification' && (
                <p className="text-secondary mb-0" style={{ fontSize: '12.5px' }}>
                  Initial scores match eligibility! We are currently checking the digital files of your Aadhaar and Board marksheet for validation.
                </p>
              )}
              {app.status === 'Approved' && (
                <p className="text-secondary mb-0" style={{ fontSize: '12.5px' }}>
                  Congratulations! Your academic documents and fee payments are verified. You can now download your provisional Admission Offer Letter.
                </p>
              )}
              {app.status === 'Rejected' && (
                <p className="text-secondary mb-0" style={{ fontSize: '12.5px' }}>
                  Your registration has been declined due to discrepancy in marksheet records or eligibility threshold shortfalls. Please contact admission council desk.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action Panel & Fees Bill */}
        <div className="col-lg-4">
          <div className="d-flex flex-column gap-4 h-100">
            {/* Quick Actions Card */}
            <div className="card glass-card p-4 border-0 shadow-sm">
              <h5 className="fw-bold mb-3 text-primary">Applicant Downloads</h5>
              <div className="d-flex flex-column gap-2">
                {/* Download Receipt */}
                <button 
                  id="dl-receipt-btn"
                  className="btn btn-outline-primary d-flex align-items-center justify-content-between py-2 px-3 text-start text-decoration-none" 
                  style={{ borderRadius: '10px' }}
                  onClick={() => alert("Printing receipt... Press Ctrl+P if needed.")}
                >
                  <div className="d-flex align-items-center gap-2">
                    <FileText size={18} />
                    <div>
                      <strong className="d-block" style={{ fontSize: '13px' }}>Transaction Receipt</strong>
                      <span className="text-muted text-uppercase" style={{ fontSize: '10px' }}>Cleared Fee Payment</span>
                    </div>
                  </div>
                  <Download size={16} />
                </button>

                {/* Download Offer Letter */}
                <button 
                  id="dl-offer-btn"
                  className={`btn d-flex align-items-center justify-content-between py-2 px-3 text-start text-decoration-none ${app.status === 'Approved' ? 'btn-premium-gold' : 'btn-outline-secondary disabled'}`} 
                  style={{ borderRadius: '10px' }}
                  onClick={printAdmissionLetter}
                  disabled={app.status !== 'Approved'}
                >
                  <div className="d-flex align-items-center gap-2">
                    <Award size={18} />
                    <div>
                      <strong className="d-block" style={{ fontSize: '13px' }}>Provisional Offer Letter</strong>
                      <span style={{ fontSize: '10px', opacity: 0.8 }}>Download College Acceptance</span>
                    </div>
                  </div>
                  <Download size={16} />
                </button>
              </div>
            </div>

            {/* Billing/Payment Details Card */}
            <div className="card glass-card p-4 border-0 shadow-sm flex-fill">
              <h5 className="fw-bold mb-3 text-primary">Cleared Registration Billing</h5>
              <div className="d-flex flex-column gap-2" style={{ fontSize: '13px' }}>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Paid Amount:</span>
                  <strong className="text-success">₹{app.payment.amount.toLocaleString('en-IN')}.00</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Gateway Method:</span>
                  <span className="fw-semibold">{app.payment.method}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Transaction ID:</span>
                  <span className="fw-bold text-break text-end" style={{ maxWidth: '160px' }}>{app.payment.transactionId}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Timestamp:</span>
                  <span className="fw-semibold">{app.payment.date}</span>
                </div>
                <hr className="my-2" />
                <div className="d-flex align-items-center gap-2 text-success mt-1" style={{ fontSize: '12.5px' }}>
                  <UserCheck size={16} />
                  <span>Clearing System: NPCI Validated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
