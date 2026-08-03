# Run Instructions (Frontend + Backend)

This file contains manual steps to start **both** the backend (FastAPI) and the frontend (React/Vite).

---

## 1) Start Backend (FastAPI)

1. Open a terminal.
2. Go to backend folder:
   ```bat
   cd backend
   ```
3. Create and activate a virtual environment (if not already created):
   ```bat
   python -m venv venv
   venv\Scripts\activate
   ```
4. Install backend dependencies:
   ```bat
   pip install -r requirements.txt
   ```
5. Start the server:
   ```bat
   uvicorn main:app --reload
   ```
cd backend
python -m venv venv
venv\Scripts\activate
uvicorn main:app --reload
Backend will run at:
- `http://127.0.0.1:8000`

---

## 2) Start Frontend (React + Vite)

1. Open a **new** terminal.
2. Go to frontend folder:
   ```bat
   cd frontend
   ```
3. Install frontend dependencies:
   ```bat
   npm install
   ```
4. Start the development server:
   ```bat
   npm run dev
   ```

Frontend will run at:
- `http://127.0.0.1:5173`

---

## 3) Using the App Together

- Keep both terminals running.
- The frontend proxies API calls to the backend via `/api`.
- If the backend port is not `8000`, update the proxy target in `frontend/vite.config.js`.

---

## Notes

- If you are using email/WhatsApp features, ensure the required environment variables are set (see `backend/config/config.py` and/or `README.md` for values).
- If backend uses a SQLite database file, it will be created automatically (default: `./prayan.db`).

