# VidyaEnroll | AI-Powered Indian School & College Admission Council Portal

🚀 **Live Deployment Link:** [https://vishallrawal.github.io/vidhyaenroll-admission-system/](https://vishallrawal.github.io/vidhyaenroll-admission-system/)

VidyaEnroll is an ultra-premium, AI-powered online admission council system customized for Indian schools and colleges (CBSE, ICSE, State Boards). Built using React, TypeScript, Vite, Bootstrap 5, and custom glassmorphism styles, it guides students from stream selection counseling to digital document submission and fee clearance.

---

## 🌟 Key Features

1. **AI Admissions Counselor**
   - Interactive counseling bot powered by the Google Gemini API.
   - Answers questions regarding subject combinations (PCM vs PCB), stream selections, boarding rules, and scholarships.
   - Automatically falls back to an offline rule-based counseling engine if no API key is specified.

2. **Stream Eligibility Calculator**
   - Evaluates CBSE, ICSE, or State Board scores against course criteria.
   - Computes aggregate percentages and flags qualifying streams (e.g. Science, Commerce, B.Tech Engineering, B.Com Honors).
   - Features one-click autofilling to export marks into the registration wizard.

3. **Multi-Step Admission Wizard**
   - **Step 1:** Profile Registration (validates 12-digit Aadhaar Card format).
   - **Step 2:** Academic History grid.
   - **Step 3:** Campus and Course Stream matching.
   - **Step 4:** Document Upload simulator (marksheet, identity, photo).
   - **Step 5:** Final verification checkout.

4. **Interactive Payment Gateway**
   - **UPI Scanner:** Displays a mock dynamic QR code and handles instant validation scanning.
   - **3D Credit Card:** Simulates credit card inputs on a 3D visual card that tilts on hover and flips to show CVV on focus.
   - Generates formal receipts with unique transaction references.

5. **Student & Admin Dashboard Hubs**
   - **Student Portal:** Real-time admission roadmap tracking, note board notifications, and provisional admission letter generation.
   - **Admin Council:** Roll list search filters, document audit tools, decision toggles (approve/decline), and CSS-rendered demand stream distribution charts.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 19, TypeScript
- **Bundler & Server:** Vite 8
- **Layout & Icons:** Bootstrap 5, Lucide React
- **Generative AI:** `@google/generative-ai` (Gemini API SDK)
- **Visual Micro-animations:** `canvas-confetti` (payment success celebrations)
- **Styling:** Custom glassmorphic tokens in Vanilla CSS (`src/index.css`)

---

## 🚀 Setup & Local Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 1. Clone or Extract the Project
Open your terminal in the project directory:
```bash
cd "C:\admission system"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will run locally at **[http://localhost:5173/](http://localhost:5173/)**.

### 4. Build for Production
To generate static optimized assets (`/dist`):
```bash
npm run build
```

---

## 🌐 Live Deployment Guide

You can deploy this React SPA with one click using these popular hosting platforms:

### Option A: Deploy to Netlify (Recommended)
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run production build: `npm run build`
3. Deploy assets: `netlify deploy --dir=dist --prod`

### Option B: Deploy to Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run deployment: `vercel` (point to the root project directory and select defaults)

### Option C: Deploy to GitHub Pages
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial release"
   ```
2. Install deploy helper: `npm install -D gh-pages`
3. Add deployment scripts in `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. Push to GitHub and run: `npm run deploy`
