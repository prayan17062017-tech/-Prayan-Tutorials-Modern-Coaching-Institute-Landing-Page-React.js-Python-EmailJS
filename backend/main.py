import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import engine, Base
from routes import enquiry, reviews

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Prayan Tutorials API")

# CORS — allow the deployed frontend origin plus localhost for development.
_frontend_url = os.getenv("FRONTEND_URL", "").strip().rstrip("/")
_allowed_origins = ["http://localhost:5173", "http://localhost:3000"]
if _frontend_url:
    _allowed_origins.append(_frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(enquiry.router)
app.include_router(reviews.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Prayan Tutorials API"}
