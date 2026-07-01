import React, { useState } from 'react';
import { CreditCard, QrCode, ShieldCheck, Download, Award, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentPortalProps {
  studentName: string;
  applicationId: string;
  courseName: string;
  institutionName: string;
  amount: number;
  onPaymentSuccess: (receipt: {
    transactionId: string;
    amount: number;
    date: string;
    status: 'Success';
    method: string;
  }) => void;
}

export const PaymentPortal: React.FC<PaymentPortalProps> = ({
  studentName,
  applicationId,
  courseName,
  institutionName,
  amount,
  onPaymentSuccess
}) => {
  const [method, setMethod] = useState<'card' | 'upi'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(studentName.toUpperCase());
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [receipt, setReceipt] = useState<any>(null);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^0-9]/g, '');
    if (v.length >= 2) {
      v = v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    setExpiry(v.substring(0, 5));
  };

  const triggerPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaymentDone(true);
      const generatedReceipt = {
        transactionId: `TXN${Math.floor(10000000 + Math.random() * 90000000)}`,
        amount: amount,
        date: new Date().toLocaleString('en-IN'),
        status: 'Success' as const,
        method: method === 'card' ? 'Credit Card' : 'UPI Scan & Pay'
      };
      setReceipt(generatedReceipt);
      
      // Celebrate!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

      onPaymentSuccess(generatedReceipt);
    }, 2500);
  };

  return (
    <div className="card glass-card p-4 mx-auto" style={{ maxWidth: '680px' }} id="payment-portal-widget">
      {!paymentDone ? (
        <div>
          <h4 className="fw-bold mb-3 text-center gradient-text">Secure Admission Fee Portal</h4>
          <p className="text-secondary text-center mb-4" style={{ fontSize: '14px' }}>
            Verify billing details below and complete payment to finalize your admission.
          </p>

          {/* Billing Details Summary Card */}
          <div className="p-3 mb-4 rounded-3 bg-primary bg-opacity-5 border border-primary border-opacity-10">
            <div className="row g-2 text-start" style={{ fontSize: '13.5px' }}>
              <div className="col-6">
                <span className="text-secondary d-block">APPLICANT NAME</span>
                <strong className="text-primary">{studentName}</strong>
              </div>
              <div className="col-6">
                <span className="text-secondary d-block">APPLICATION ID</span>
                <strong className="text-primary">{applicationId}</strong>
              </div>
              <div className="col-6 mt-2">
                <span className="text-secondary d-block">INSTITUTION & PROGRAM</span>
                <strong className="text-primary">{institutionName} - {courseName}</strong>
              </div>
              <div className="col-6 mt-2 text-end">
                <span className="text-secondary d-block">TOTAL AMOUNT DUE</span>
                <strong className="h5 fw-extrabold text-success m-0">₹{amount.toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>

          {/* Select Payment Method */}
          <div className="row mb-4">
            <div className="col-6">
              <button 
                type="button" 
                className={`btn w-100 py-3 d-flex align-items-center justify-content-center gap-2 border ${method === 'card' ? 'btn-primary border-primary' : 'bg-transparent text-secondary border-secondary border-opacity-25'}`}
                onClick={() => setMethod('card')}
                disabled={processing}
                style={{ borderRadius: '12px' }}
              >
                <CreditCard size={18} />
                <span>Credit/Debit Card</span>
              </button>
            </div>
            <div className="col-6">
              <button 
                type="button" 
                className={`btn w-100 py-3 d-flex align-items-center justify-content-center gap-2 border ${method === 'upi' ? 'btn-primary border-primary' : 'bg-transparent text-secondary border-secondary border-opacity-25'}`}
                onClick={() => setMethod('upi')}
                disabled={processing}
                style={{ borderRadius: '12px' }}
              >
                <QrCode size={18} />
                <span>UPI Scan & Pay</span>
              </button>
            </div>
          </div>

          {processing ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
              <h5 className="fw-bold">Contacting Payment Gateway...</h5>
              <p className="text-secondary text-muted" style={{ fontSize: '13px' }}>Do not refresh the page or click back.</p>
            </div>
          ) : method === 'card' ? (
            <div>
              {/* 3D-Tilt Card Interface */}
              <div className="d-flex justify-content-center mb-4">
                <div 
                  className={`card text-white bg-dark p-3 shadow-lg position-relative overflow-hidden transition-all`}
                  style={{
                    width: '320px',
                    height: '190px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transformStyle: 'preserve-3d',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {/* Front Side */}
                  <div style={{ backfaceVisibility: 'hidden', height: '100%', display: isFlipped ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="bg-warning rounded" style={{ width: '45px', height: '30px', opacity: 0.8 }}></div>
                      <span className="fw-bold text-white-50" style={{ fontStyle: 'italic' }}>RUPAY / DEBIT</span>
                    </div>
                    <div className="h5 fw-bold tracking-widest my-2">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div className="d-flex justify-content-between align-items-center" style={{ fontSize: '11px' }}>
                      <div>
                        <span className="d-block text-white-50">CARD HOLDER</span>
                        <span className="fw-semibold">{cardHolder || 'STUDENT NAME'}</span>
                      </div>
                      <div className="text-end">
                        <span className="d-block text-white-50">EXPIRES</span>
                        <span className="fw-semibold">{expiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div style={{ backfaceVisibility: 'hidden', height: '100%', transform: 'rotateY(180deg)', display: isFlipped ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="bg-black w-100 position-absolute start-0" style={{ height: '35px', top: '25px' }}></div>
                    <div className="mt-5 pt-3">
                      <div className="bg-light rounded text-dark text-end px-2 py-1" style={{ fontSize: '12px', fontStyle: 'italic', fontWeight: 'bold' }}>
                        CVV: {cvv || '•••'}
                      </div>
                    </div>
                    <div className="text-end" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>
                      Security verified by NPCI.
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Inputs Form */}
              <div className="row g-3 text-start">
                <div className="col-12">
                  <label htmlFor="cardNumInput" className="form-label" style={{ fontSize: '13px' }}>Card Number</label>
                  <input 
                    id="cardNumInput"
                    type="text" 
                    className="form-control bg-transparent" 
                    placeholder="4532 7182 9102 3847" 
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                    onFocus={() => setIsFlipped(false)}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="cardHolderInput" className="form-label" style={{ fontSize: '13px' }}>Cardholder Name</label>
                  <input 
                    id="cardHolderInput"
                    type="text" 
                    className="form-control bg-transparent" 
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                    onFocus={() => setIsFlipped(false)}
                    required
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="cardExpiryInput" className="form-label" style={{ fontSize: '13px' }}>Expiry Date (MM/YY)</label>
                  <input 
                    id="cardExpiryInput"
                    type="text" 
                    className="form-control bg-transparent" 
                    placeholder="12/28" 
                    value={expiry}
                    onChange={handleExpiryChange}
                    onFocus={() => setIsFlipped(false)}
                    required
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="cardCvvInput" className="form-label" style={{ fontSize: '13px' }}>CVV Code</label>
                  <input 
                    id="cardCvvInput"
                    type="password" 
                    className="form-control bg-transparent" 
                    placeholder="•••" 
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, '').substring(0, 3))}
                    onFocus={() => setIsFlipped(true)}
                    maxLength={3}
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <button 
                  id="pay-card-btn"
                  className="btn btn-premium w-100 py-2.5 d-flex align-items-center justify-content-center gap-2"
                  onClick={triggerPayment}
                  disabled={!cardNumber || !cardHolder || !expiry || cvv.length < 3}
                >
                  <ShieldCheck size={18} />
                  <span>Authorize & Pay ₹{amount.toLocaleString('en-IN')}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              {/* UPI QR Code Mock */}
              <div className="d-inline-block bg-white p-3 rounded-4 shadow-sm border border-secondary border-opacity-10 mb-3">
                <div className="d-flex align-items-center justify-content-center bg-light rounded" style={{ width: '180px', height: '180px' }}>
                  <div className="text-center p-3">
                    <QrCode size={90} className="text-primary mb-2 mx-auto" />
                    <span className="badge bg-primary bg-opacity-10 text-primary py-1 px-2" style={{ fontSize: '11px' }}>
                      upi-vidyaenroll@hdfc
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-3 d-flex align-items-center justify-content-center gap-2 text-secondary" style={{ fontSize: '13px' }}>
                <Clock size={14} className="text-warning" />
                <span>QR expires in 4:59 minutes</span>
              </div>

              <p className="text-secondary mx-auto mb-4" style={{ fontSize: '13px', maxWidth: '380px' }}>
                Open BHIM UPI, GPay, PhonePe, or Paytm and scan the QR code. Or use the quick simulator button below to mock the response.
              </p>

              <div className="d-grid gap-2 col-md-8 mx-auto">
                <button 
                  id="pay-upi-btn"
                  className="btn btn-premium-gold"
                  onClick={triggerPayment}
                >
                  Simulate QR Scan & Pay
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Success Receipt Render */
        <div className="text-center py-3 animate-fade-in">
          <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-flex align-items-center justify-content-center mb-3 text-success" style={{ width: '70px', height: '70px' }}>
            <Award size={40} />
          </div>
          <h4 className="fw-bold text-success mb-1">Fee Payment Successful!</h4>
          <p className="text-secondary mb-4" style={{ fontSize: '13.5px' }}>
            Thank you. Your transaction has been registered and verified by NPCI.
          </p>

          {/* Printable Receipt Frame */}
          <div className="card border p-4 text-start mx-auto bg-white text-dark mb-4 shadow-sm" style={{ maxWidth: '480px', fontFamily: 'Courier New, monospace' }}>
            <div className="text-center border-bottom pb-3 mb-3">
              <h5 className="fw-bold m-0 text-dark">VIDYAENROLL ACADEMIC SYSTEM</h5>
              <small className="text-muted d-block mt-1">NEW DELHI, INDIA</small>
              <h6 className="fw-bold mt-2 text-dark bg-light py-1">TRANSACTION RECEIPT</h6>
            </div>

            <div className="d-flex flex-column gap-2" style={{ fontSize: '13px' }}>
              <div className="d-flex justify-content-between">
                <span>Application ID:</span>
                <span className="fw-bold">{applicationId}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Student Name:</span>
                <span className="fw-bold">{studentName}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Course/Stream:</span>
                <span className="fw-bold">{courseName}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Campus Location:</span>
                <span className="fw-bold">{institutionName}</span>
              </div>
              <div className="d-flex justify-content-between border-top border-bottom py-2 my-1">
                <span>Total Amount:</span>
                <span className="fw-bold">INR {amount.toLocaleString('en-IN')}.00</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Payment Method:</span>
                <span className="fw-bold">{receipt?.method}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Transaction Ref:</span>
                <span className="fw-bold text-wrap text-end" style={{ maxWidth: '240px' }}>{receipt?.transactionId}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Date & Time:</span>
                <span className="fw-bold">{receipt?.date}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Status:</span>
                <span className="badge bg-success text-white py-1 px-2 rounded fw-bold text-uppercase">{receipt?.status}</span>
              </div>
            </div>

            <div className="text-center border-top pt-3 mt-4" style={{ fontSize: '10px' }}>
              <p className="mb-0 text-muted">This is an electronically generated acknowledgment.</p>
              <p className="text-muted">No physical signature required.</p>
            </div>
          </div>

          <div className="d-flex gap-2 justify-content-center">
            <button 
              id="print-receipt-btn"
              type="button" 
              className="btn btn-outline-dark rounded-pill px-4 py-2 d-flex align-items-center gap-1"
              onClick={() => window.print()}
            >
              <Download size={14} /> Print Receipt
            </button>
            <button 
              id="dashboard-close-btn"
              type="button" 
              className="btn btn-premium px-4"
              onClick={() => window.location.reload()}
            >
              Close Portal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
