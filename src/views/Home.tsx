import React from 'react';
import { Award, BookOpen, Compass, GraduationCap, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { EligibilityCalculator } from '../components/EligibilityCalculator';
import { AiCounselor } from '../components/AiCounselor';

interface HomeProps {
  setCurrentView: (view: string) => void;
  apiKey: string;
  onApplyWithMarks: (marks: any) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentView, apiKey, onApplyWithMarks }) => {
  return (
    <div className="container-fluid py-4 px-3 px-md-5 animate-fade-in" id="home-view">
      {/* Hero Section */}
      <header className="row align-items-center mb-5 p-4 p-md-5 rounded-4 text-white gradient-bg relative overflow-hidden shadow-lg border border-white border-opacity-10">
        <div className="col-lg-7 text-start z-1">
          <div className="badge bg-warning text-dark fw-bold mb-3 px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1">
            <Compass size={14} className="animate-float" />
            Admissions Open for Academic Year 2026-27
          </div>
          <h1 className="display-4 fw-extrabold mb-3 font-heading" style={{ lineHeight: '1.2' }}>
            Empowering Indian Minds Through <span className="text-warning">VidyaEnroll</span>
          </h1>
          <p className="lead mb-4 text-white-50" style={{ fontSize: '18px' }}>
            A unified, AI-powered admission council representing India's premium schools and colleges. Assessments, stream recommendations, and enrollment simplified.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <button 
              id="hero-apply-btn"
              className="btn btn-premium-gold px-4 py-2.5 d-flex align-items-center gap-2 fw-bold"
              onClick={() => setCurrentView('apply')}
            >
              Start Admission Form <ArrowRight size={18} />
            </button>
            <a 
              id="hero-counselor-link"
              href="#ai-consultation" 
              className="btn btn-outline-light rounded-pill px-4 py-2.5 d-flex align-items-center gap-2"
            >
              Consult AI Advisor
            </a>
          </div>
        </div>
        <div className="col-lg-5 mt-4 mt-lg-0 text-center d-none d-lg-block relative">
          {/* Beautiful SVG Graphic illustrating Indian Academic Heritage & Modernity */}
          <svg viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-100 animate-float" style={{ maxHeight: '300px' }}>
            <circle cx="200" cy="175" r="140" fill="rgba(255,255,255,0.05)" />
            <circle cx="200" cy="175" r="100" fill="rgba(255,255,255,0.05)" stroke="rgba(212,175,55,0.3)" strokeDasharray="5,5" />
            {/* Lotus emblem design in center */}
            <path d="M200 100 C180 150 140 160 140 200 C140 240 180 250 200 250 C220 250 260 240 260 200 C260 160 220 150 200 100 Z" fill="rgba(212, 175, 55, 0.25)" stroke="#d4af37" strokeWidth="2" />
            <path d="M200 120 C190 160 160 170 160 200 C160 230 190 240 200 240 C210 240 240 230 240 200 C240 170 210 160 200 120 Z" fill="rgba(255, 153, 51, 0.2)" stroke="#ff9933" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="15" fill="#1e3c72" stroke="#ffffff" strokeWidth="2" />
            <path d="M200 185 L200 215 M185 200 L215 200" stroke="#ffffff" strokeWidth="2" />
            {/* Floating items representing Science, commerce, humanities */}
            <g transform="translate(100, 100)">
              <rect width="40" height="40" rx="8" fill="rgba(30, 60, 114, 0.6)" stroke="rgba(255,255,255,0.2)" />
              <text x="20" y="25" fill="#fff" textAnchor="middle" fontSize="18" fontWeight="bold">⚛</text>
            </g>
            <g transform="translate(260, 100)">
              <rect width="40" height="40" rx="8" fill="rgba(212, 175, 55, 0.6)" stroke="rgba(255,255,255,0.2)" />
              <text x="20" y="25" fill="#fff" textAnchor="middle" fontSize="18" fontWeight="bold">₹</text>
            </g>
            <g transform="translate(180, 260)">
              <rect width="40" height="40" rx="8" fill="rgba(0, 128, 128, 0.6)" stroke="rgba(255,255,255,0.2)" />
              <text x="20" y="25" fill="#fff" textAnchor="middle" fontSize="18" fontWeight="bold">✎</text>
            </g>
          </svg>
        </div>
      </header>

      {/* Institution Spotlight */}
      <section className="mb-5 text-start">
        <h3 className="fw-bold mb-4 gradient-text border-bottom pb-2">Our Partner Educational Institutions</h3>
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="card glass-card h-100 border-0 p-3 shadow-sm">
              <div className="ratio ratio-16x9 mb-3 bg-secondary rounded overflow-hidden relative">
                <img src={`${import.meta.env.BASE_URL}campus_school_1.jpg`} alt="Vidya Public School Campus" className="object-fit-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <div className="position-absolute top-0 start-0 w-100 h-100 gradient-bg opacity-25"></div>
                <span className="badge bg-warning text-dark fw-bold position-absolute top-2 start-2 m-2" style={{ width: 'fit-content' }}>CBSE Board</span>
              </div>
              <div className="card-body p-0">
                <h5 className="fw-bold text-primary">Vidya Public School</h5>
                <p className="text-secondary" style={{ fontSize: '13.5px' }}>Class Nursery to 12. Top CBSE school with modern science labs, robotic hubs, and sports complex.</p>
                <div className="d-flex align-items-center gap-1 text-secondary mt-3" style={{ fontSize: '12px' }}>
                  <MapPin size={14} className="text-danger" />
                  <span>Delhi NCR Campus</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="card glass-card h-100 border-0 p-3 shadow-sm">
              <div className="ratio ratio-16x9 mb-3 bg-secondary rounded overflow-hidden relative">
                <img src={`${import.meta.env.BASE_URL}campus_school_2.jpg`} alt="St. Xavier's Academy Campus" className="object-fit-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <div className="position-absolute top-0 start-0 w-100 h-100 gradient-bg opacity-25"></div>
                <span className="badge bg-warning text-dark fw-bold position-absolute top-2 start-2 m-2" style={{ width: 'fit-content' }}>CISCE / ICSE Board</span>
              </div>
              <div className="card-body p-0">
                <h5 className="fw-bold text-primary">St. Xavier's Academy</h5>
                <p className="text-secondary" style={{ fontSize: '13.5px' }}>Class 1 to 12. Academic excellence with a global outlook, creative design clubs, and personality grooming programs.</p>
                <div className="d-flex align-items-center gap-1 text-secondary mt-3" style={{ fontSize: '12px' }}>
                  <MapPin size={14} className="text-danger" />
                  <span>Mumbai Campus</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="card glass-card h-100 border-0 p-3 shadow-sm">
              <div className="ratio ratio-16x9 mb-3 bg-secondary rounded overflow-hidden relative">
                <img src={`${import.meta.env.BASE_URL}campus_college.jpg`} alt="Sharda Institute Campus" className="object-fit-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <div className="position-absolute top-0 start-0 w-100 h-100 gradient-bg opacity-25"></div>
                <span className="badge bg-warning text-dark fw-bold position-absolute top-2 start-2 m-2" style={{ width: 'fit-content' }}>NAAC A+ University</span>
              </div>
              <div className="card-body p-0">
                <h5 className="fw-bold text-primary">Sharda Group of Colleges</h5>
                <p className="text-secondary" style={{ fontSize: '13.5px' }}>Specialized colleges for Engineering (B.Tech), Commerce (B.Com), Science (B.Sc), and Liberal Arts (B.A.).</p>
                <div className="d-flex align-items-center gap-1 text-secondary mt-3" style={{ fontSize: '12px' }}>
                  <MapPin size={14} className="text-danger" />
                  <span>Bengaluru Tech Park Hub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Widgets: Calculator & Chat Counselor side-by-side */}
      <section className="row g-4 mb-5 text-start" id="ai-consultation">
        <div className="col-lg-6">
          <EligibilityCalculator onApplyWithMarks={onApplyWithMarks} />
        </div>
        <div className="col-lg-6">
          <AiCounselor apiKey={apiKey} />
        </div>
      </section>

      {/* Milestone timeline */}
      <section className="mb-5 text-start">
        <h3 className="fw-bold mb-4 text-center gradient-text">Admission Lifecycle Timeline</h3>
        <div className="timeline container">
          <div className="timeline-item animate-slide-up">
            <div className="timeline-img">
              <Award size={18} />
            </div>
            <div className="timeline-content glass-card card border-0 p-3">
              <span className="badge bg-warning text-dark fw-bold mb-2 align-self-start" style={{ width: 'fit-content' }}>Step 1</span>
              <h5 className="fw-bold text-primary">Assess Stream Eligibility</h5>
              <p className="text-secondary" style={{ fontSize: '13.5px' }}>
                Use our Eligibility Calculator to assess your grade marks and automatically find matching institutional courses.
              </p>
            </div>
          </div>

          <div className="timeline-item animate-slide-up">
            <div className="timeline-img">
              <Compass size={18} />
            </div>
            <div className="timeline-content glass-card card border-0 p-3">
              <span className="badge bg-warning text-dark fw-bold mb-2 align-self-start" style={{ width: 'fit-content' }}>Step 2</span>
              <h5 className="fw-bold text-primary">AI Counsel Consultation</h5>
              <p className="text-secondary" style={{ fontSize: '13.5px' }}>
                Engage with VidyaEnroll AI Counselor to clarify subject groups (PCM vs PCB), scholarships, and future career horizons.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-img">
              <BookOpen size={18} />
            </div>
            <div className="timeline-content glass-card card border-0 p-3">
              <span className="badge bg-warning text-dark fw-bold mb-2 align-self-start" style={{ width: 'fit-content' }}>Step 3</span>
              <h5 className="fw-bold text-primary">Multi-Step Form Submission</h5>
              <p className="text-secondary" style={{ fontSize: '13.5px' }}>
                Fill out academic records, scan government ID credentials, and upload marksheet files safely in our portal.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-img">
              <ShieldCheck size={18} />
            </div>
            <div className="timeline-content glass-card card border-0 p-3">
              <span className="badge bg-warning text-dark fw-bold mb-2 align-self-start" style={{ width: 'fit-content' }}>Step 4</span>
              <h5 className="fw-bold text-primary">Document Verification</h5>
              <p className="text-secondary" style={{ fontSize: '13.5px' }}>
                Administrators review and verify academic and reservation certificates, generating enrollment offers for students.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-img">
              <GraduationCap size={18} />
            </div>
            <div className="timeline-content glass-card card border-0 p-3">
              <span className="badge bg-warning text-dark fw-bold mb-2 align-self-start" style={{ width: 'fit-content' }}>Step 5</span>
              <h5 className="fw-bold text-primary">Fee Payment & Confirmation</h5>
              <p className="text-secondary" style={{ fontSize: '13.5px' }}>
                Complete tuition or seat block payments via credit card or UPI to officially download your printable Admission Letter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats banner */}
      <section className="row g-3 gy-4 py-4 rounded-4 text-center bg-dark text-white border-0 m-1 glass-card shadow-sm align-items-center">
        <div className="col-6 col-md-3 border-end border-secondary border-opacity-25 d-flex flex-column align-items-center justify-content-center">
          <h3 className="fw-extrabold text-warning m-0">15K+</h3>
          <span className="text-white-50 text-uppercase tracking-wider mt-1" style={{ fontSize: '10px' }}>Students Enrolled</span>
        </div>
        <div className="col-6 col-md-3 border-md-end border-secondary border-opacity-25 d-flex flex-column align-items-center justify-content-center">
          <h3 className="fw-extrabold text-warning m-0">98.4%</h3>
          <span className="text-white-50 text-uppercase tracking-wider mt-1" style={{ fontSize: '10px' }}>Academic Pass Rate</span>
        </div>
        <div className="col-6 col-md-3 border-end border-secondary border-opacity-25 d-flex flex-column align-items-center justify-content-center">
          <h3 className="fw-extrabold text-warning m-0">NAAC A+</h3>
          <span className="text-white-50 text-uppercase tracking-wider mt-1" style={{ fontSize: '10px' }}>Accreditation</span>
        </div>
        <div className="col-6 col-md-3 d-flex flex-column align-items-center justify-content-center">
          <h3 className="fw-extrabold text-warning m-0">45+</h3>
          <span className="text-white-50 text-uppercase tracking-wider mt-1" style={{ fontSize: '10px' }}>Stream Majors</span>
        </div>
      </section>
    </div>
  );
};
