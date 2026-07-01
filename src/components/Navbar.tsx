import React, { useState } from 'react';
import { BookOpen, Sun, Moon, Settings, Globe, Bell, RefreshCw } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  userRole: 'guest' | 'student' | 'admin';
  setUserRole: (role: 'guest' | 'student' | 'admin') => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  userRole,
  setUserRole,
  theme,
  toggleTheme
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [language, setLanguage] = useState(() => localStorage.getItem('vidya_lang') || 'English');
  const [emailAlerts, setEmailAlerts] = useState(() => localStorage.getItem('vidya_alert_email') !== 'false');
  const [smsAlerts, setSmsAlerts] = useState(() => localStorage.getItem('vidya_alert_sms') !== 'false');
  const [whatsappAlerts, setWhatsappAlerts] = useState(() => localStorage.getItem('vidya_alert_whatsapp') !== 'false');
  const [autoSave, setAutoSave] = useState(() => localStorage.getItem('vidya_autosave') !== 'false');

  const saveSettings = () => {
    localStorage.setItem('vidya_lang', language);
    localStorage.setItem('vidya_alert_email', emailAlerts.toString());
    localStorage.setItem('vidya_alert_sms', smsAlerts.toString());
    localStorage.setItem('vidya_alert_whatsapp', whatsappAlerts.toString());
    localStorage.setItem('vidya_autosave', autoSave.toString());
    setShowSettings(false);
    alert('Settings applied successfully!');
  };

  const handleResetDatabase = () => {
    if (window.confirm('Are you sure you want to reset the mock database? All submitted applications and state will be cleared.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top glass-card py-2 px-3 m-2" style={{ zIndex: 1030 }}>
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center gap-2" href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }}>
            <div className="bg-warning p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
              <BookOpen className="text-dark" size={20} />
            </div>
            <div>
              <span className="fw-bold tracking-tight text-white m-0 h5 d-block">VidyaEnroll</span>
              <span className="text-secondary fw-semibold" style={{ fontSize: '10px', color: '#d4af37' }}>CAMPUS ADMISSION HUB</span>
            </div>
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1 ms-3">
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link text-decoration-none px-3 py-2 rounded ${currentView === 'home' ? 'text-warning fw-bold' : 'text-white'}`}
                  onClick={() => setCurrentView('home')}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link text-decoration-none px-3 py-2 rounded ${currentView === 'apply' ? 'text-warning fw-bold' : 'text-white'}`}
                  onClick={() => setCurrentView('apply')}
                >
                  Apply Portal
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link text-decoration-none px-3 py-2 rounded ${currentView === 'student' ? 'text-warning fw-bold' : 'text-white'}`}
                  onClick={() => setCurrentView('student')}
                >
                  Student Dashboard
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link text-decoration-none px-3 py-2 rounded ${currentView === 'admin' ? 'text-warning fw-bold' : 'text-white'}`}
                  onClick={() => setCurrentView('admin')}
                >
                  Admin Portal
                </button>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3 flex-wrap">
              {/* Role Quick Selector */}
              <div className="d-flex align-items-center bg-secondary bg-opacity-25 rounded-pill p-1">
                <span className="text-white-50 px-2 d-none d-xl-inline" style={{ fontSize: '12px' }}>Role Demo:</span>
                <select 
                  className="form-select form-select-sm bg-transparent border-0 text-white fw-bold cursor-pointer" 
                  value={userRole} 
                  onChange={(e) => {
                    const selectedRole = e.target.value as 'guest' | 'student' | 'admin';
                    setUserRole(selectedRole);
                    if (selectedRole === 'student') {
                      setCurrentView('student');
                    } else if (selectedRole === 'admin') {
                      setCurrentView('admin');
                    } else {
                      setCurrentView('home');
                    }
                  }}
                  style={{ width: 'auto', outline: 'none', boxShadow: 'none' }}
                >
                  <option value="guest" className="text-dark">Guest Student</option>
                  <option value="student" className="text-dark">Applicant Profile</option>
                  <option value="admin" className="text-dark">Institute Admin</option>
                </select>
              </div>

              {/* System Settings */}
              <button 
                id="system-settings-btn"
                className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center position-relative" 
                onClick={() => setShowSettings(true)}
                title="System Settings"
              >
                <Settings size={18} />
              </button>

              {/* Theme Toggle */}
              <button 
                className="btn btn-outline-warning rounded-circle p-2 d-flex align-items-center justify-content-center"
                onClick={toggleTheme}
                title={theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Indian flag accent bar */}
      <div className="india-accent-bar m-0" style={{ zIndex: 1029 }} />

      {/* Settings Modal */}
      {showSettings && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 glass-card">
              <div className="modal-header border-bottom border-secondary border-opacity-10">
                <h5 className="modal-title d-flex align-items-center gap-2">
                  <Settings className="text-warning animate-float" size={20} />
                  System Configuration Panel
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowSettings(false)}></button>
              </div>
              
              <div className="modal-body py-4 text-start">
                {/* Language Selection */}
                <div className="mb-4">
                  <label htmlFor="langSelect" className="form-label fw-bold d-flex align-items-center gap-2">
                    <Globe size={16} className="text-primary" />
                    Counseling Interface Language
                  </label>
                  <select 
                    id="langSelect"
                    className="form-select bg-transparent" 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="English" className="text-dark">English (Default)</option>
                    <option value="Hindi" className="text-dark">हिन्दी (Hindi)</option>
                    <option value="Gujarati" className="text-dark">ગુજરાતી (Gujarati)</option>
                  </select>
                </div>

                {/* Notifications Preferences */}
                <div className="mb-4">
                  <label className="form-label fw-bold d-flex align-items-center gap-2">
                    <Bell size={16} className="text-primary" />
                    Admission Alert Notifications
                  </label>
                  <div className="form-check mb-2">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="notifyEmail" 
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="notifyEmail">
                      Email Notifications (Form Updates)
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="notifySms" 
                      checked={smsAlerts}
                      onChange={(e) => setSmsAlerts(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="notifySms">
                      SMS text updates on mobile
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="notifyWa" 
                      checked={whatsappAlerts}
                      onChange={(e) => setWhatsappAlerts(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="notifyWa">
                      Direct WhatsApp alerts updates
                    </label>
                  </div>
                </div>

                {/* Autosaver Toggler */}
                <div className="mb-4">
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      role="switch" 
                      id="autoSaveSwitch"
                      checked={autoSave}
                      onChange={(e) => setAutoSave(e.target.checked)}
                    />
                    <label className="form-check-label fw-bold" htmlFor="autoSaveSwitch">
                      Auto-Save Form Drafts
                    </label>
                    <div className="form-text mt-1" style={{ fontSize: '11px' }}>
                      Automatically save application progress fields inside browser local storage.
                    </div>
                  </div>
                </div>

                {/* Data Sandbox Reset */}
                <div className="border-top pt-3 mt-3">
                  <button 
                    id="db-reset-btn"
                    type="button" 
                    className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={handleResetDatabase}
                  >
                    <RefreshCw size={14} />
                    Reset Mock Admissions Database
                  </button>
                  <div className="form-text text-center mt-1" style={{ fontSize: '11px' }}>
                    Removes all submitted registrations and clears local storage data.
                  </div>
                </div>
              </div>

              <div className="modal-footer border-top border-secondary border-opacity-10">
                <button type="button" className="btn btn-secondary px-4 rounded-pill" onClick={() => setShowSettings(false)}>Cancel</button>
                <button type="button" className="btn btn-premium px-4" onClick={saveSettings}>Apply Config</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
