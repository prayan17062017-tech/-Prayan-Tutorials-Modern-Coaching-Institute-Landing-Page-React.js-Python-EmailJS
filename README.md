# Prayan Tutorials - Educational Landing Page

A premium, modern, fully responsive educational landing page for "Prayan Tutorials".

## Tech Stack

- **Frontend:** React, Tailwind CSS v4, Framer Motion, Swiper.js, AOS, React Icons.
- **Backend:** Python FastAPI, SQLAlchemy, SQLite.
- **Features:** Glassmorphism, 3D Flip Cards, Auto-switching Results, Enquiry Form with Email & WhatsApp integration.

## Project Structure

```
.
├── frontend/          # React + Vite + Tailwind v4
├── backend/           # FastAPI + SQLAlchemy + SQLite
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Windows: `.\venv\Scripts\activate`
   - Unix/macOS: `source venv/bin/activate`
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Create a `.env` file based on `config/config.py`:
   ```env
   EMAIL_SENDER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ADMIN_EMAIL=admin@prayantutorials.com
   ```
6. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment Guides

### Frontend (Vercel)
1. Push the `frontend` folder to GitHub.
2. Link the repository to Vercel.
3. Set the Root Directory to `frontend`.
4. Add environment variables if any.

### Backend (Render)
1. Push the `backend` folder to GitHub.
2. Create a new Web Service on Render.
3. Use Build Command: `pip install -r requirements.txt`.
4. Use Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`.
5. Add Environment Variables.

## Features Checklist
- [x] Hero Section with animated counters
- [x] About Us with Mission/Vision
- [x] 12 Premium Feature Cards
- [x] 3D Flip Faculty Cards
- [x] Auto-switching Results System
- [x] Maps + QR Section
- [x] Enquiry Form with Validation
- [x] Responsive Design & Dark Mode
- [x] WhatsApp & Email Integration
