import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, HelpCircle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface AiCounselorProps {
  apiKey: string;
}

export const AiCounselor: React.FC<AiCounselorProps> = ({ apiKey }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Namaste! I am the VidyaEnroll AI Counselor. I can assist you with board systems (CBSE, ICSE, State Boards), choosing the right stream (Science, Commerce, Arts), checking course eligibility, or career paths. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Help me choose between Science and Commerce.',
    'What are the required admission documents?',
    'Which stream is best for a future in AI?',
    'What scholarships are available?'
  ];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      let responseText = '';

      if (apiKey) {
        // Use Gemini API
        try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
          
          const systemContext = `
            You are a helpful, professional, and friendly AI Admission Counselor named "VidyaEnroll Counselor".
            You specialize in the Indian education system, including schools (CBSE, ICSE, State Boards) and colleges/universities (Science, Commerce, Arts, Engineering, Business, etc.).
            You counsel students on choosing streams, matching subject combinations, career prospects, eligibility rules, and admission procedures.
            Always keep responses concise, clear, and structured (using lists or bold text where appropriate). Keep the tone encouraging, structured, and warm (incorporating respectful Indian greetings like Namaste when relevant).
            Do not make up fake deadlines. If asked about deadlines, state that VidyaEnroll registrations close on July 31st, 2026.
          `;

          const prompt = `${systemContext}\n\nStudent Query: "${textToSend}"\nCounselor Response:`;
          const result = await model.generateContent(prompt);
          responseText = result.response.text();
        } catch (apiError: any) {
          console.error("Gemini API Error: ", apiError);
          responseText = `I encountered an error connecting to my AI brain (${apiError.message || 'API key invalid'}). Reverting to simulator mode. For stream advice: Science is excellent for engineering/medicine, Commerce for finance/accounting, and Arts for administration/design. Let me know if you want to configure your key in settings!`;
        }
      }

      if (!responseText) {
        // Offline counselor simulation engine (keyword based)
        const query = textToSend.toLowerCase();
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate thinking

        if (query.includes('science') || query.includes('engineering') || query.includes('medical') || query.includes('doctor')) {
          responseText = `**Science Stream** is highly popular in Indian schools (Class 11-12) and colleges. 
          
**Subject groups:**
- **PCM:** Physics, Chemistry, Mathematics (Best for Engineering, Architecture, Computer Science)
- **PCB:** Physics, Chemistry, Biology (Best for Medicine, Biotechnology, Nursing)
- **PCMB:** All four (Gives dual eligibility but highly rigorous)

**Prospects:** Engineering (IITs, NITs), Medical (NEET), BSc Honours, and Emerging tech roles (AI/ML, Space Science). Since you are interested in tech, Math with Physics is highly recommended!`;
        } else if (query.includes('commerce') || query.includes('finance') || query.includes('accounting') || query.includes('business') || query.includes('c.a.') || query.includes('ca')) {
          responseText = `**Commerce Stream** is perfect for analytical minds interested in business, trade, and finance.

**Key Subjects:** Accountancy, Business Studies, Economics, and English (Maths/Applied Maths is optional but highly recommended).

**Career Choices:** Chartered Accountancy (CA), Company Secretary (CS), Investment Banking, Corporate Law, MBA, B.Com (Hons), or BBA. Many top Indian commerce colleges require Mathematics in Class 12, so check your calculator eligibility!`;
        } else if (query.includes('arts') || query.includes('humanities') || query.includes('civil') || query.includes('ias') || query.includes('upsc') || query.includes('design')) {
          responseText = `**Arts & Humanities Stream** offers diverse, rich fields of study and is gaining high popularity.

**Popular Subjects:** History, Political Science, Geography, Sociology, Psychology, and Fine Arts.

**Career Paths:** Civil Services (UPSC/IAS), Law, Journalism, Fine Arts, Psychology Counseling, Literature, Design, and Social Work. It is excellent if you want to pursue public service or creative fields!`;
        } else if (query.includes('document') || query.includes('upload') || query.includes('verify') || query.includes('marksheet') || query.includes('aadhaar')) {
          responseText = `For VidyaEnroll admissions, you will need to upload digital copies of the following documents:
          
1. **Academic Marksheet** (Class 10 marksheet for Class 11 admission; Class 12 marksheet for College graduation programs).
2. **Birth Certificate** or School Leaving Certificate (for Age Proof).
3. **Identity Proof** (Aadhaar Card, Passport, or Voter ID).
4. **Category Certificate** (If applying under OBC/SC/ST/EWS reservations for relaxation benefits).
5. **Passport Size Photograph** (Recent, light background).`;
        } else if (query.includes('scholarship') || query.includes('sc') || query.includes('st') || query.includes('obc') || query.includes('fee') || query.includes('concession')) {
          responseText = `Yes! VidyaEnroll institutions support multiple scholarship policies:

1. **Merit-Based Scholarship:** Up to 100% tuition fee waiver for students securing >95% in Class 10/12 board exams.
2. **Category Reserve Benefits:** Lower cutoffs and up to 50% fee concession for OBC, SC, and ST candidates (ensure you select your correct category and upload a government-verified certificate in the portal).
3. **Sports & Cultural Quotas:** Full scholarship options for state/national level athletes.
4. **EWS Concession:** For Economically Weaker Sections with valid income certificate.`;
        } else if (query.includes('ai') || query.includes('artificial') || query.includes('computer') || query.includes('coding')) {
          responseText = `To build a career in **Artificial Intelligence (AI), Machine Learning (ML), or Software Engineering**:
          
- **School Path:** Choose **Class 11 Science (PCM)** with Computer Science or Information Practices as the optional 5th subject.
- **College Path:** Apply for **B.Tech Computer Science Engineering (CSE)** or a specialised **B.Sc/B.Tech in Artificial Intelligence**.
- **Important Subjects:** Focus heavily on Mathematics (Linear Algebra, Calculus, Probability) and Computer programming (Python, C++).`;
        } else {
          responseText = `I understand you have a query about Indian board admissions.
          
- To calculate eligibility, please use the **Eligibility Calculator** widget on the home page.
- To apply, navigate to the **Apply Portal** where the multi-step registration forms are hosted.
- To check dates: registrations close on **July 31st, 2026**.
          
Please let me know if you would like me to detail **Science**, **Commerce**, **Arts** streams, or required **admission documents**!`;
        }
      }

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: responseText,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: 'Pardon me, I faced a minor latency issue. Could you repeat that query?',
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card glass-card h-100 chat-window" id="ai-counselor-widget">
      <div className="card-header bg-primary text-white d-flex align-items-center justify-content-between py-3 rounded-top-4 border-0">
        <div className="d-flex align-items-center gap-2">
          <Bot className="animate-float" />
          <div>
            <h5 className="mb-0 fw-bold" style={{ fontSize: '16px' }}>VidyaEnroll AI Counselor</h5>
            <span className="badge bg-success bg-opacity-70 text-white" style={{ fontSize: '9px', fontWeight: 'bold' }}>
              {apiKey ? 'GEMINI LIVE' : 'SIMULATOR MODE'}
            </span>
          </div>
        </div>
        <span title="Ask me about board streams, admissions or documents">
          <HelpCircle size={18} className="text-white-50 cursor-pointer" />
        </span>
      </div>

      <div className="chat-messages bg-light bg-opacity-25" id="chat-messages-container">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message-bubble ${msg.sender === 'user' ? 'message-user' : 'message-bot animate-fade-in'}`}
            style={{ whiteSpace: 'pre-line' }}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="message-bubble message-bot d-flex align-items-center gap-2">
            <span className="spinner-grow spinner-grow-sm text-primary" role="status"></span>
            <span style={{ fontSize: '13px', fontStyle: 'italic' }}>Counselor is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply Prompts */}
      <div className="px-3 pt-2 pb-1 border-top bg-light bg-opacity-10 d-flex gap-2 overflow-x-auto flex-nowrap" style={{ scrollbarWidth: 'none' }}>
        {quickPrompts.map((p, idx) => (
          <button 
            key={idx} 
            type="button" 
            className="btn btn-sm btn-outline-primary text-nowrap rounded-pill py-1 px-3 mb-1"
            style={{ fontSize: '12px', borderStyle: 'dashed' }}
            onClick={() => handleSend(p)}
            disabled={loading}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="card-footer border-top border-secondary border-opacity-10 bg-transparent py-3">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="input-group"
        >
          <input 
            id="chat-input"
            type="text" 
            className="form-control bg-transparent border-end-0 py-2" 
            placeholder="Type your admission question here..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            required
            autoComplete="off"
          />
          <button 
            id="chat-send-btn"
            type="submit" 
            className="btn btn-premium d-flex align-items-center justify-content-center px-4"
            disabled={loading}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
