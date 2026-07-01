import React, { useState } from 'react';
import { Users, DollarSign, Clock, CheckSquare, Search, Check, X, FileText, BarChart } from 'lucide-react';

interface AdminDashboardProps {
  applicationsList: any[];
  onUpdateStatus: (id: string, newStatus: 'Submitted' | 'Under Review' | 'Document Verification' | 'Approved' | 'Rejected') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ applicationsList, onUpdateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [instFilter, setInstFilter] = useState('All');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  // Initialize with some mock seed data if list is empty
  const defaultApplications = [
    {
      id: 'APP592182',
      personal: { name: 'Aditya Sharma', email: 'aditya.sharma@gmail.com', mobile: '9876543210', aadhaar: '543298127634', dob: '2010-04-12', gender: 'Male', guardian: 'R. K. Sharma' },
      academic: { board: 'CBSE', pastSchool: 'DPS RK Puram', rollNumber: 'CBSE-928102', maths: 92, science: 90, english: 85, social: 88, optional: 91, aggregate: 89 },
      program: { institution: 'Sharda Institute of Technology', stream: 'B.Tech Engineering (CSE)', feeAmount: 12000 },
      documents: { marksheet: 'marksheet_class10.pdf', aadhaarFile: 'aadhaar_card.pdf' },
      payment: { transactionId: 'TXN5482910', amount: 12000, date: '28/06/2026', method: 'UPI Scan & Pay', status: 'Success' },
      status: 'Document Verification'
    },
    {
      id: 'APP982173',
      personal: { name: 'Priya Patel', email: 'priya.patel@yahoo.com', mobile: '9123456789', aadhaar: '321098765432', dob: '2010-08-22', gender: 'Female', guardian: 'S. Patel' },
      academic: { board: 'State Board', pastSchool: 'Vikas High School', rollNumber: 'SSC-104928', maths: 95, science: 96, english: 78, social: 90, optional: 85, aggregate: 89 },
      program: { institution: 'Sharda Institute of Technology', stream: 'B.Tech Engineering (AI & ML)', feeAmount: 12000 },
      documents: { marksheet: 'marksheet_10.pdf', aadhaarFile: 'aadhaar.pdf' },
      payment: { transactionId: 'TXN7290124', amount: 12000, date: '29/06/2026', method: 'Credit Card', status: 'Success' },
      status: 'Approved'
    },
    {
      id: 'APP810283',
      personal: { name: 'Rahul Verma', email: 'rahul.verma@outlook.com', mobile: '9988776655', aadhaar: '987654321098', dob: '2011-01-05', gender: 'Male', guardian: 'M. Verma' },
      academic: { board: 'ICSE', pastSchool: 'St. Mary School', rollNumber: 'ICSE-839102', maths: 72, science: 68, english: 80, social: 75, optional: 77, aggregate: 74 },
      program: { institution: 'Vidya Public School', stream: 'Class 11 Commerce Stream', feeAmount: 5000 },
      documents: { marksheet: '10th_marks.pdf', aadhaarFile: 'aadhaar_scan.pdf' },
      payment: { transactionId: 'TXN1029482', amount: 5000, date: '30/06/2026', method: 'UPI Scan & Pay', status: 'Success' },
      status: 'Submitted'
    },
    {
      id: 'APP204812',
      personal: { name: 'Ananya Sen', email: 'ananya.sen@gmail.com', mobile: '9830012345', aadhaar: '876543210987', dob: '2010-11-15', gender: 'Female', guardian: 'A. Sen' },
      academic: { board: 'CBSE', pastSchool: 'Modern High School', rollNumber: 'CBSE-302918', maths: 62, science: 58, english: 88, social: 85, optional: 82, aggregate: 75 },
      program: { institution: 'St. Xavier\'s Academy', stream: 'Class 11 Arts & Humanities', feeAmount: 5500 },
      documents: { marksheet: 'marks_sheet.pdf', aadhaarFile: 'aadhaar_card.pdf' },
      payment: { transactionId: 'TXN4820194', amount: 5500, date: '01/07/2026', method: 'UPI Scan & Pay', status: 'Success' },
      status: 'Submitted'
    }
  ];

  // Combine state list + static default seed data
  const list = [...applicationsList, ...defaultApplications.filter(d => !applicationsList.some(a => a.id === d.id))];

  // Calculate Metrics
  const totalApps = list.length;
  const totalRevenue = list.reduce((sum, app) => sum + (app.payment?.amount || 0), 0);
  const pendingApps = list.filter(app => app.status === 'Submitted' || app.status === 'Under Review' || app.status === 'Document Verification').length;
  const approvedApps = list.filter(app => app.status === 'Approved').length;

  // Filters
  const filteredList = list.filter((app) => {
    const matchesSearch = 
      app.personal.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesInst = instFilter === 'All' || app.program.institution === instFilter;
    return matchesSearch && matchesStatus && matchesInst;
  });

  const selectedApp = list.find(app => app.id === selectedAppId) || (filteredList.length > 0 ? filteredList[0] : null);

  // Setup simple stream frequency array for rendering CSS Bar Charts
  const streamStats: { [key: string]: number } = {};
  list.forEach(app => {
    streamStats[app.program.stream] = (streamStats[app.program.stream] || 0) + 1;
  });

  return (
    <div className="container-fluid py-4 px-3 px-md-5 text-start animate-fade-in" id="admin-dashboard-view">
      <h3 className="fw-bold mb-4 gradient-text">VidyaEnroll Administration Council Desk</h3>

      {/* Metrics Row */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="card glass-card border-0 p-3 shadow-sm d-flex flex-row align-items-center gap-3">
            <div className="bg-primary bg-opacity-10 p-2.5 rounded-circle text-primary">
              <Users size={24} />
            </div>
            <div>
              <span className="text-secondary d-block" style={{ fontSize: '11px' }}>TOTAL APPLICANTS</span>
              <strong className="h4 fw-extrabold m-0 text-primary">{totalApps}</strong>
            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card glass-card border-0 p-3 shadow-sm d-flex flex-row align-items-center gap-3">
            <div className="bg-success bg-opacity-10 p-2.5 rounded-circle text-success">
              <DollarSign size={24} />
            </div>
            <div>
              <span className="text-secondary d-block" style={{ fontSize: '11px' }}>FEES REVENUE</span>
              <strong className="h4 fw-extrabold m-0 text-success">₹{totalRevenue.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card glass-card border-0 p-3 shadow-sm d-flex flex-row align-items-center gap-3">
            <div className="bg-warning bg-opacity-10 p-2.5 rounded-circle text-warning">
              <Clock size={24} />
            </div>
            <div>
              <span className="text-secondary d-block" style={{ fontSize: '11px' }}>PENDING EVALUATION</span>
              <strong className="h4 fw-extrabold m-0 text-warning">{pendingApps}</strong>
            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card glass-card border-0 p-3 shadow-sm d-flex flex-row align-items-center gap-3">
            <div className="bg-info bg-opacity-10 p-2.5 rounded-circle text-info">
              <CheckSquare size={24} />
            </div>
            <div>
              <span className="text-secondary d-block" style={{ fontSize: '11px' }}>SEATS ALLOCATED</span>
              <strong className="h4 fw-extrabold m-0 text-info">{approvedApps}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="row g-4">
        {/* Left Side: Filtering and Applicant List */}
        <div className="col-lg-5 col-xl-4">
          <div className="card glass-card p-3 border-0 shadow-sm h-100 d-flex flex-column gap-3">
            <h5 className="fw-bold mb-0 text-primary">Applications Roll</h5>

            {/* Search Bar */}
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <Search size={16} className="text-secondary" />
              </span>
              <input 
                id="admin-search-input"
                type="text" 
                className="form-control bg-transparent border-start-0 py-2" 
                placeholder="Search name / ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="row g-2">
              <div className="col-6">
                <select id="admin-status-filter" className="form-select form-select-sm bg-transparent" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="All">All Statuses</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Document Verification">Verification</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="col-6">
                <select id="admin-inst-filter" className="form-select form-select-sm bg-transparent" value={instFilter} onChange={(e) => setInstFilter(e.target.value)}>
                  <option value="All">All Campuses</option>
                  <option value="Vidya Public School">Vidya Public</option>
                  <option value="St. Xavier's Academy">St. Xavier's</option>
                  <option value="Sharda Institute of Technology">Sharda Tech</option>
                  <option value="Sharda College of Commerce">Sharda Comm</option>
                  <option value="Sharda College of Humanities">Sharda Arts</option>
                </select>
              </div>
            </div>

            {/* Applicant List scrollable */}
            <div className="d-flex flex-column gap-2 overflow-y-auto" style={{ maxHeight: '420px' }} id="admin-applicant-list">
              {filteredList.length > 0 ? (
                filteredList.map((app) => (
                  <button
                    id={`applicant-row-${app.id}`}
                    key={app.id}
                    className={`btn text-start p-2.5 rounded border transition d-flex align-items-center justify-content-between ${selectedApp?.id === app.id ? 'bg-primary bg-opacity-10 border-primary' : 'bg-transparent border-secondary border-opacity-10'}`}
                    onClick={() => setSelectedAppId(app.id)}
                    style={{ transition: 'all 0.2s' }}
                  >
                    <div>
                      <strong className="d-block text-primary" style={{ fontSize: '13px' }}>{app.personal.name}</strong>
                      <span className="text-secondary" style={{ fontSize: '10.5px' }}>{app.program.stream.substring(0, 24)}...</span>
                    </div>
                    <div className="text-end">
                      <span className="text-secondary d-block" style={{ fontSize: '9px' }}>{app.id}</span>
                      <span className="badge bg-secondary py-0.5 px-1.5 rounded" style={{ fontSize: '8px', opacity: 0.8 }}>
                        {app.status}
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-5 text-secondary">
                  No applications found.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Applicant Details Viewer */}
        <div className="col-lg-7 col-xl-8">
          {selectedApp ? (
            <div className="card glass-card p-4 border-0 shadow-sm animate-fade-in" id="admin-detail-viewer">
              <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-4 flex-wrap gap-2">
                <div>
                  <span className="text-secondary fw-semibold" style={{ fontSize: '11px' }}>APPLICATION ID: {selectedApp.id}</span>
                  <h4 className="fw-bold m-0 text-primary">{selectedApp.personal.name}</h4>
                </div>
                
                {/* Manual status dropdown toggler */}
                <div className="d-flex align-items-center gap-2">
                  <span className="text-secondary d-none d-sm-inline" style={{ fontSize: '12px' }}>Progress Flow:</span>
                  <select 
                    id="admin-update-status"
                    className="form-select form-select-sm bg-transparent fw-bold" 
                    value={selectedApp.status} 
                    onChange={(e) => onUpdateStatus(selectedApp.id, e.target.value as any)}
                  >
                    <option value="Submitted">Form Submitted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Document Verification">Verify Docs</option>
                    <option value="Approved">Approve Admission</option>
                    <option value="Rejected">Reject Admission</option>
                  </select>
                </div>
              </div>

              {/* Grid split details */}
              <div className="row g-4">
                <div className="col-md-6" style={{ fontSize: '13.5px' }}>
                  <h6 className="fw-bold text-secondary mb-2">PERSONAL PROFILE</h6>
                  <p className="mb-1"><strong>Guardian Name:</strong> {selectedApp.personal.guardian}</p>
                  <p className="mb-1"><strong>Date of Birth:</strong> {selectedApp.personal.dob} ({selectedApp.personal.gender})</p>
                  <p className="mb-1"><strong>Primary Contact:</strong> {selectedApp.personal.email} | {selectedApp.personal.mobile}</p>
                  <p className="mb-1"><strong>Aadhaar Card:</strong> {selectedApp.personal.aadhaar}</p>
                </div>

                <div className="col-md-6" style={{ fontSize: '13.5px' }}>
                  <h6 className="fw-bold text-secondary mb-2">ACADEMIC & PROGRAM REQUEST</h6>
                  <p className="mb-1"><strong>Education Board:</strong> {selectedApp.academic.board}</p>
                  <p className="mb-1"><strong>Target Institution:</strong> {selectedApp.program.institution}</p>
                  <p className="mb-1"><strong>Target Stream:</strong> {selectedApp.program.stream}</p>
                  <p className="mb-1"><strong>Board Examination Roll:</strong> {selectedApp.academic.rollNumber}</p>
                </div>

                <div className="col-12 mt-4" style={{ fontSize: '13.5px' }}>
                  <h6 className="fw-bold text-secondary mb-2">ACADEMIC MARKSHEET DETAILS</h6>
                  <div className="row g-2 text-center">
                    <div className="col bg-light bg-opacity-25 p-2 rounded border">
                      <span className="text-secondary d-block" style={{ fontSize: '10px' }}>MATHS</span>
                      <strong className="text-primary">{selectedApp.academic.maths}</strong>
                    </div>
                    <div className="col bg-light bg-opacity-25 p-2 rounded border">
                      <span className="text-secondary d-block" style={{ fontSize: '10px' }}>SCIENCE</span>
                      <strong className="text-primary">{selectedApp.academic.science}</strong>
                    </div>
                    <div className="col bg-light bg-opacity-25 p-2 rounded border">
                      <span className="text-secondary d-block" style={{ fontSize: '10px' }}>ENGLISH</span>
                      <strong className="text-primary">{selectedApp.academic.english}</strong>
                    </div>
                    <div className="col bg-light bg-opacity-25 p-2 rounded border">
                      <span className="text-secondary d-block" style={{ fontSize: '10px' }}>SOCIAL</span>
                      <strong className="text-primary">{selectedApp.academic.social}</strong>
                    </div>
                    <div className="col bg-light bg-opacity-25 p-2 rounded border">
                      <span className="text-secondary d-block" style={{ fontSize: '10px' }}>OPTIONAL</span>
                      <strong className="text-primary">{selectedApp.academic.optional}</strong>
                    </div>
                    <div className="col bg-primary bg-opacity-10 p-2 rounded border border-primary border-opacity-25">
                      <span className="text-secondary d-block" style={{ fontSize: '10px' }}>AGGREGATE</span>
                      <strong className="text-primary">{selectedApp.academic.aggregate}%</strong>
                    </div>
                  </div>
                </div>

                {/* Uploaded Documents Thumbnails */}
                <div className="col-12 mt-4">
                  <h6 className="fw-bold text-secondary mb-2">VERIFICATION CREDENTIALS</h6>
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="p-2 border rounded d-flex align-items-center justify-content-between bg-light bg-opacity-25">
                        <div className="d-flex align-items-center gap-2">
                          <FileText size={18} className="text-danger" />
                          <div>
                            <span className="fw-semibold d-block" style={{ fontSize: '12px' }}>Academic Certificate</span>
                            <span className="text-muted" style={{ fontSize: '9px' }}>{selectedApp.documents.marksheet || 'marksheet_scanned.pdf'}</span>
                          </div>
                        </div>
                        <button id="view-doc-marksheet-btn" className="btn btn-sm btn-outline-primary py-0.5 px-2" style={{ fontSize: '11px' }} onClick={() => alert("Simulating document preview frame...")}>View</button>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-2 border rounded d-flex align-items-center justify-content-between bg-light bg-opacity-25">
                        <div className="d-flex align-items-center gap-2">
                          <FileText size={18} className="text-primary" />
                          <div>
                            <span className="fw-semibold d-block" style={{ fontSize: '12px' }}>Aadhaar Identity Proof</span>
                            <span className="text-muted" style={{ fontSize: '9px' }}>{selectedApp.documents.aadhaarFile || 'aadhaar_card.pdf'}</span>
                          </div>
                        </div>
                        <button id="view-doc-aadhaar-btn" className="btn btn-sm btn-outline-primary py-0.5 px-2" style={{ fontSize: '11px' }} onClick={() => alert("Simulating document preview frame...")}>View</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Decision buttons */}
                <div className="col-12 mt-4 pt-3 border-top d-flex gap-2 justify-content-end">
                  <button 
                    id="admin-reject-btn"
                    className="btn btn-outline-danger px-4 rounded-pill d-flex align-items-center gap-1"
                    onClick={() => {
                      onUpdateStatus(selectedApp.id, 'Rejected');
                      alert("Applicant registration rejected.");
                    }}
                    disabled={selectedApp.status === 'Rejected'}
                  >
                    <X size={16} /> Decline Registration
                  </button>
                  <button 
                    id="admin-approve-btn"
                    className="btn btn-success px-4 rounded-pill d-flex align-items-center gap-1"
                    onClick={() => {
                      onUpdateStatus(selectedApp.id, 'Approved');
                      alert("Applicant admission approved. Notification triggered!");
                    }}
                    disabled={selectedApp.status === 'Approved'}
                  >
                    <Check size={16} /> Approve Admission Offer
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card glass-card p-5 border-0 shadow-sm text-center text-secondary h-100 d-flex align-items-center justify-content-center">
              <Users size={40} className="mb-2 text-muted" />
              <h5>Select an applicant from the roll to inspect details.</h5>
            </div>
          )}
        </div>
      </div>

      {/* Stream breakdown statistics (Custom CSS Visualizer Chart) */}
      <section className="card glass-card p-4 mt-5 border-0 shadow-sm text-start" id="analytics-chart-widget">
        <h5 className="fw-bold mb-4 text-primary d-flex align-items-center gap-2">
          <BarChart size={20} />
          Demand Stream Distribution Analytics
        </h5>
        <div className="d-flex flex-column gap-3">
          {Object.entries(streamStats).map(([stream, count]) => {
            const percentage = Math.round((count / totalApps) * 100);
            return (
              <div key={stream} style={{ fontSize: '13.5px' }}>
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-semibold text-primary">{stream}</span>
                  <span className="fw-bold">{count} ({percentage}%)</span>
                </div>
                <div className="progress" style={{ height: '10px', borderRadius: '5px' }}>
                  <div 
                    className="progress-bar bg-warning gradient-bg" 
                    role="progressbar" 
                    style={{ width: `${percentage}%`, borderRadius: '5px' }}
                    aria-valuenow={percentage} 
                    aria-valuemin={0} 
                    aria-valuemax={100}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
