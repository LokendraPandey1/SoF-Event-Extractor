<<<<<<< Updated upstream
# SoF Event Extractor – Laytime Intelligence  

An AI-powered tool that automates **Statement of Facts (SoF)** event extraction and **laytime calculation** for the maritime industry.  

---

## Problem  
Manual laytime calculation from SoF documents is **slow, error-prone, and leads to costly disputes** between shipowners and charterers.  

---

## Solution  
Our system:  
- Extracts key events (Arrival, NOR, Loading/Discharge, Delays).  
- Calculates laytime automatically.  
- Generates a **Laytime Statement** & **Visualization Dashboard**.  
- Exports results as PDF/Excel.  

---

## Demo Flow  
1. Upload SoF document.  
2. AI extracts timestamps & events.  
3. Engine computes laytime & financials.  
4. Dashboard + downloadable report.  

---

## Tech Stack  
- **Frontend:** React.js + TailwindCSS  
- **Backend:** Python (FastAPI)  
- **NLP/AI:** spaCy + Rule-based Parsing  
- **Database:** PostgreSQL  
- **Visualization:** Plotly / D3.js  

---

## Impact  
- Cuts manual effort by ~80%  
- Reduces disputes & financial loss  
- Boosts trust & transparency  

---

## Team  
- Lokendra Pandey
- Pratik Sharma
- Vivek Prajapati
- Sarthak Uniyal

---

## Live URL
 https://68ac9da75c26a229bb5ec87b--sof-event-extractor.netlify.app
=======
# SoF-Event-Extractor

A React + TypeScript + Vite application for extracting events.

## Development

```bash
npm install
npm run dev
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   npx vercel login
   ```

3. Deploy:
   ```bash
   npx vercel --prod
   ```

### Option 2: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Build command: `npm run build`
6. Publish directory: `dist`

### Option 3: GitHub Pages

1. Push your code to GitHub
2. Go to your repository settings
3. Navigate to "Pages" section
4. Select "GitHub Actions" as source
5. The workflow will automatically deploy on push to main branch

### Option 4: Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase:
   ```bash
   firebase init hosting
   ```

4. Deploy:
   ```bash
   firebase deploy
   ```

## Build

```bash
npm run build
```

The built files will be in the `dist` directory.
>>>>>>> Stashed changes
