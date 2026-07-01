import React, { useState } from 'react';
import { Award, CheckCircle, XCircle, ChevronRight, RefreshCw, AlertCircle } from 'lucide-react';

interface EligibilityCalculatorProps {
  onApplyWithMarks?: (marks: {
    maths: number;
    science: number;
    english: number;
    social: number;
    optional: number;
    board: string;
  }) => void;
}

export const EligibilityCalculator: React.FC<EligibilityCalculatorProps> = ({ onApplyWithMarks }) => {
  const [board, setBoard] = useState('CBSE');
  const [category, setCategory] = useState('General');
  const [marks, setMarks] = useState({
    maths: 85,
    science: 80,
    english: 75,
    social: 70,
    optional: 80
  });

  const [calculated, setCalculated] = useState(false);

  const handleInputChange = (subject: keyof typeof marks, value: string) => {
    const num = Math.min(100, Math.max(0, parseInt(value) || 0));
    setMarks({ ...marks, [subject]: num });
  };

  const aggregate = Math.round((marks.maths + marks.science + marks.english + marks.social + marks.optional) / 5);

  // Category allowance: SC/ST gets 5% reservation relaxation
  const relaxation = category === 'SC' || category === 'ST' ? 5 : 0;

  const programs = [
    {
      id: 'hss_sci',
      name: 'Class 11 Science Stream',
      institution: 'Vidya Public School',
      criteria: `Maths & Science ≥ ${75 - relaxation}%`,
      isEligible: marks.maths >= (75 - relaxation) && marks.science >= (75 - relaxation),
      notes: 'Requires physics, chemistry, mathematics/biology combination.'
    },
    {
      id: 'hss_com',
      name: 'Class 11 Commerce Stream',
      institution: 'Vidya Public School',
      criteria: `Maths ≥ ${60 - relaxation}%, Aggregate ≥ ${65 - relaxation}%`,
      isEligible: marks.maths >= (60 - relaxation) && aggregate >= (65 - relaxation),
      notes: 'Available with/without Applied Mathematics.'
    },
    {
      id: 'hss_arts',
      name: 'Class 11 Arts & Humanities',
      institution: 'St. Xavier\'s Academy',
      criteria: `Aggregate ≥ ${50 - relaxation}%`,
      isEligible: aggregate >= (50 - relaxation),
      notes: 'Diverse choices including History, Geography, Fine Arts, and Psychology.'
    },
    {
      id: 'col_btech',
      name: 'B.Tech Engineering (CSE/ECE/IT)',
      institution: 'Sharda Institute of Technology',
      criteria: `Maths & Science ≥ ${80 - relaxation}%, Aggregate ≥ ${75 - relaxation}%`,
      isEligible: marks.maths >= (80 - relaxation) && marks.science >= (80 - relaxation) && aggregate >= (75 - relaxation),
      notes: 'Admissions validated based on board percentage & JEE Main scores (if available).'
    },
    {
      id: 'col_bcom',
      name: 'B.Com Honors (Accounting & Finance)',
      institution: 'Sharda College of Commerce',
      criteria: `Maths ≥ ${65 - relaxation}%, Aggregate ≥ ${70 - relaxation}%`,
      isEligible: marks.maths >= (65 - relaxation) && aggregate >= (70 - relaxation),
      notes: 'Includes certification training for CA/CS foundations.'
    },
    {
      id: 'col_bsc',
      name: 'B.Sc Honors (Physics/Chemistry)',
      institution: 'Sharda College of Science',
      criteria: `Science ≥ ${70 - relaxation}%, Aggregate ≥ ${70 - relaxation}%`,
      isEligible: marks.science >= (70 - relaxation) && aggregate >= (70 - relaxation),
      notes: 'Rigorous research-driven curriculum.'
    },
    {
      id: 'col_ba',
      name: 'B.A. Honors (Economics & Political Science)',
      institution: 'Sharda College of Humanities',
      criteria: `Aggregate ≥ ${60 - relaxation}%`,
      isEligible: aggregate >= (60 - relaxation),
      notes: 'Excellent foundation for civil services aspirants.'
    }
  ];

  const eligibleCount = programs.filter(p => p.isEligible).length;

  return (
    <div className="card glass-card p-4 h-100" id="eligibility-calc-widget">
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-2">
        <h4 className="fw-bold m-0 gradient-text d-flex align-items-center gap-2">
          <Award className="text-warning" size={24} />
          Stream Eligibility Calculator
        </h4>
        {calculated && (
          <button className="btn btn-sm btn-outline-secondary rounded-pill d-flex align-items-center gap-1" onClick={() => setCalculated(false)}>
            <RefreshCw size={12} /> Recalculate
          </button>
        )}
      </div>

      {!calculated ? (
        <form onSubmit={(e) => { e.preventDefault(); setCalculated(true); }}>
          <div className="row g-3">
            {/* Board Selector */}
            <div className="col-md-6">
              <label htmlFor="boardSelect" className="form-label fw-semibold text-secondary">Education Board</label>
              <select id="boardSelect" className="form-select bg-transparent" value={board} onChange={(e) => setBoard(e.target.value)}>
                <option value="CBSE">CBSE (Central Board)</option>
                <option value="ICSE">CISCE / ICSE (National)</option>
                <option value="State Board">State Board (HSC/SSC)</option>
                <option value="IB">IB / International Baccalaureate</option>
              </select>
            </div>

            {/* Category Selector */}
            <div className="col-md-6">
              <label htmlFor="categorySelect" className="form-label fw-semibold text-secondary">Admission Category</label>
              <select id="categorySelect" className="form-select bg-transparent" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="General">General / Unreserved</option>
                <option value="OBC">OBC (Non-Creamy)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
              </select>
            </div>

            <p className="fw-bold text-secondary mt-4 mb-1">Enter Grade Marks (Out of 100)</p>
            
            {/* Subject Marks Inputs */}
            <div className="col-md-4">
              <label htmlFor="mathsMark" className="form-label" style={{ fontSize: '14px' }}>Mathematics</label>
              <input id="mathsMark" type="number" className="form-control bg-transparent" value={marks.maths} onChange={(e) => handleInputChange('maths', e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label htmlFor="scienceMark" className="form-label" style={{ fontSize: '14px' }}>Science / Physics</label>
              <input id="scienceMark" type="number" className="form-control bg-transparent" value={marks.science} onChange={(e) => handleInputChange('science', e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label htmlFor="englishMark" className="form-label" style={{ fontSize: '14px' }}>English</label>
              <input id="englishMark" type="number" className="form-control bg-transparent" value={marks.english} onChange={(e) => handleInputChange('english', e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label htmlFor="socialMark" className="form-label" style={{ fontSize: '14px' }}>Social Studies / Hist</label>
              <input id="socialMark" type="number" className="form-control bg-transparent" value={marks.social} onChange={(e) => handleInputChange('social', e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label htmlFor="optionalMark" className="form-label" style={{ fontSize: '14px' }}>Second Lang / Comp</label>
              <input id="optionalMark" type="number" className="form-control bg-transparent" value={marks.optional} onChange={(e) => handleInputChange('optional', e.target.value)} required />
            </div>
          </div>

          <div className="mt-4">
            <button id="calculate-btn" type="submit" className="btn btn-premium w-100 d-flex align-items-center justify-content-center gap-2">
              Evaluate Stream Eligibility
              <ChevronRight size={18} />
            </button>
          </div>
        </form>
      ) : (
        <div className="animate-fade-in">
          {/* Results Summary banner */}
          <div className="d-flex align-items-center justify-content-between p-3 rounded-3 mb-4 bg-primary bg-opacity-10 border border-primary border-opacity-25">
            <div>
              <p className="text-secondary mb-0" style={{ fontSize: '13px' }}>AGGREGATE PERCENTAGE</p>
              <h3 className="fw-extrabold m-0 text-primary">{aggregate}%</h3>
            </div>
            <div className="text-end">
              <p className="text-secondary mb-0" style={{ fontSize: '13px' }}>ELIGIBLE PROGRAMS</p>
              <h3 className="fw-extrabold m-0 text-success">{eligibleCount} / {programs.length}</h3>
            </div>
          </div>

          {category !== 'General' && (
            <div className="alert alert-info py-2 d-flex align-items-center gap-2" style={{ fontSize: '12px' }}>
              <AlertCircle size={14} />
              <span>Category <strong>{category}</strong>: 5% lower threshold applied to eligibility criteria.</span>
            </div>
          )}

          {/* Program list */}
          <p className="fw-bold text-secondary mb-2" style={{ fontSize: '13px' }}>ELIGIBILITY DETAILS</p>
          <div className="d-flex flex-column gap-3 overflow-y-auto pr-1" style={{ maxHeight: '300px' }}>
            {programs.map((p) => (
              <div 
                key={p.id} 
                className={`p-3 rounded border transition ${p.isEligible ? 'bg-success-subtle bg-opacity-10 border-success border-opacity-25' : 'bg-danger-subtle bg-opacity-10 border-danger border-opacity-25'}`}
                style={{ transition: 'all 0.2s' }}
              >
                <div className="d-flex align-items-start justify-content-between mb-1">
                  <div>
                    <h6 className="fw-bold mb-0 text-primary">{p.name}</h6>
                    <span className="text-secondary" style={{ fontSize: '11px' }}>{p.institution}</span>
                  </div>
                  {p.isEligible ? (
                    <span className="badge bg-success bg-opacity-75 text-white d-flex align-items-center gap-1 py-1 px-2 rounded-pill">
                      <CheckCircle size={12} /> Eligible
                    </span>
                  ) : (
                    <span className="badge bg-danger bg-opacity-75 text-white d-flex align-items-center gap-1 py-1 px-2 rounded-pill">
                      <XCircle size={12} /> Ineligible
                    </span>
                  )}
                </div>
                <div className="mt-2 text-secondary" style={{ fontSize: '12px' }}>
                  <strong>Prerequisite:</strong> {p.criteria}
                </div>
                <div className="text-secondary mt-1" style={{ fontSize: '11.5px', fontStyle: 'italic' }}>
                  {p.notes}
                </div>
              </div>
            ))}
          </div>

          {onApplyWithMarks && eligibleCount > 0 && (
            <div className="mt-4 border-top pt-3">
              <button 
                id="apply-with-marks-btn"
                className="btn btn-premium w-100" 
                onClick={() => onApplyWithMarks({
                  board,
                  maths: marks.maths,
                  science: marks.science,
                  english: marks.english,
                  social: marks.social,
                  optional: marks.optional
                })}
              >
                Apply for Admission with These Marks
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
