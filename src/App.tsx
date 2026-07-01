import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './views/Home';
import { ApplyForm } from './views/ApplyForm';
import { StudentDashboard } from './views/StudentDashboard';
import { AdminDashboard } from './views/AdminDashboard';
import { Mail, Phone, MapPin, Compass } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [userRole, setUserRole] = useState<'guest' | 'student' | 'admin'>('guest');
  const apiKey = localStorage.getItem('vidya_gemini_key') || '';
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('vidya_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  const [submittedApp, setSubmittedApp] = useState<any>(null);
  const [applicationsList, setApplicationsList] = useState<any[]>([]);
  const [calculatorMarks, setCalculatorMarks] = useState<any | null>(null);

  // Apply Theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vidya_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleApplyWithMarks = (marks: any) => {
    setCalculatorMarks(marks);
    setCurrentView('apply');
  };

  const handleSubmitApplication = (app: any) => {
    setSubmittedApp(app);
    setApplicationsList(prev => [app, ...prev]);
    setCalculatorMarks(null); // Clear buffer
    setUserRole('student'); // Automatically toggle profile role to student
    setCurrentView('student'); // Take to student dashboard
  };

  const handleUpdateStatus = (id: string, newStatus: any) => {
    setApplicationsList(prev => 
      prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
    );
    if (submittedApp && submittedApp.id === id) {
      setSubmittedApp((prev: any) => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-app">
      <Navbar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        userRole={userRole}
        setUserRole={setUserRole}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main View Router */}
      <main className="flex-grow-1">
        {currentView === 'home' && (
          <Home 
            setCurrentView={setCurrentView} 
            apiKey={apiKey}
            onApplyWithMarks={handleApplyWithMarks} 
          />
        )}
        {currentView === 'apply' && (
          <ApplyForm 
            initialMarks={calculatorMarks}
            onSubmitApplication={handleSubmitApplication}
          />
        )}
        {currentView === 'student' && (
          <StudentDashboard 
            application={submittedApp} 
          />
        )}
        {currentView === 'admin' && (
          <AdminDashboard 
            applicationsList={applicationsList}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </main>

      {/* Premium Footer */}
      <footer className="bg-dark text-white-50 py-5 mt-5 border-top border-secondary border-opacity-10 glass-card">
        <div className="container">
          <div className="row g-4 text-start">
            <div className="col-md-4">
              <h5 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
                <Compass size={20} className="text-warning" />
                VidyaEnroll Council
              </h5>
              <p style={{ fontSize: '13px', lineHeight: '1.6' }}>
                Simplifying national admissions for premier Indian institutions. Powered by generative AI solutions to guide pupils towards eligible streams.
              </p>
              <div className="india-accent-bar mt-3" style={{ height: '3px', width: '80px' }} />
            </div>
            
            <div className="col-md-4">
              <h5 className="text-white fw-bold mb-3">Academic Boards Supported</h5>
              <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '13px' }}>
                <li>CBSE - Central Board of Secondary Education</li>
                <li>CISCE - Council for the Indian School Certificate Examinations</li>
                <li>State Secondary & Higher Secondary Councils</li>
                <li>IB - International Baccalaureate Accreditation</li>
              </ul>
            </div>
            
            <div className="col-md-4">
              <h5 className="text-white fw-bold mb-3">Support Contacts</h5>
              <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '13px' }}>
                <li className="d-flex align-items-center gap-2">
                  <Mail size={14} className="text-warning" />
                  <span><a href="mailto:vishalrawal448@gmail.com" className="text-white text-decoration-none hover-white">vishalrawal448@gmail.com</a></span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <Phone size={14} className="text-warning" />
                  <span><a href="tel:+918128073844" className="text-white text-decoration-none hover-white">+91 8128073844</a></span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <MapPin size={14} className="text-warning mt-0.5" />
                  <span>Central Board of Joint Counseling, Sharda Campus, Dumas Road, Piplod, Surat - 395007, Gujarat, India</span>
                </li>
              </ul>
            </div>
          </div>
          
          <hr className="my-4 border-secondary border-opacity-25" />
          
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2" style={{ fontSize: '12px' }}>
            <span>© 2026 VidyaEnroll Council. All Rights Reserved. Joint Academic Board of India.</span>
            <div className="d-flex gap-3">
              <a href="#" className="text-white-50 text-decoration-none hover-white">Terms of Registry</a>
              <a href="#" className="text-white-50 text-decoration-none hover-white">Data Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
