# Prayan Tutorials - Educational Landing Page

A premium, modern, fully responsive educational landing page for "Prayan Tutorials".

## Tech Stack

- **Frontend:** React, Tailwind CSS v4, Framer Motion, Swiper.js, AOS, React Icons.
- **Serverless API:** Python (Vercel Serverless Function) — handles email via Gmail SMTP.
- **Features:** Glassmorphism, 3D Flip Cards, Auto-switching Results, Enquiry Form with Email & WhatsApp integration.

## Project Structure

```
.
├── frontend/
│   ├── api/
│   │   └── enquiry.py     # Vercel Python serverless function (email sending)
│   ├── src/               # React + Vite + Tailwind v4
│   ├── vercel.json        # Vercel routing config
│   └── ...
└── README.md
```

## Setup Instructions

### Frontend + API Setup (All-in-One)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Vercel CLI globally (needed for local dev with serverless functions):
   ```bash
   npm install -g vercel
   ```
4. Add environment variables in Vercel Dashboard (or create a `.env.local` for local dev):
   ```env
   EMAIL_USER=prayan17062017@gmail.com
   EMAIL_PASSWORD=YOUR_GMAIL_APP_PASSWORD
   ADMIN_EMAIL=prayan17062017@gmail.com
   SMTP_SERVER=smtp.gmail.com
   SMTP_PORT=587
   SMTP_TIMEOUT=15
   SMTP_USE_SSL=false
   ```
   Use a Gmail App Password for `EMAIL_PASSWORD` (16 chars, no spaces).

5. Run locally with Vercel CLI (serves React + `/api/enquiry` together):
   ```bash
   vercel dev
   ```
   Or run just the React app (form will fail without the API):
   ```bash
   npm run dev
   ```

## Deployment (Vercel)

1. Push the `frontend` folder to GitHub.
2. Link the repository to Vercel.
3. Set the **Root Directory** to `frontend`.
4. Add the environment variables above in Vercel → Settings → Environment Variables.
5. Deploy — Vercel automatically serves:
   - React app at `/`
   - Python serverless function at `/api/enquiry`

## Features Checklist
- [x] Hero Section with animated counters
- [x] About Us with Mission/Vision
- [x] 12 Premium Feature Cards
- [x] 3D Flip Faculty Cards
- [x] Auto-switching Results System
- [x] Maps + QR Section
- [x] Enquiry Form with Validation
- [x] Responsive Design & Dark Mode
- [x] WhatsApp & Gmail SMTP Integration
