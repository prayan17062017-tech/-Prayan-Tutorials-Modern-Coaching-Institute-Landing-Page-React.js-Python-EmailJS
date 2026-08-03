from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import engine, Base
from routes import enquiry, reviews

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Prayan Tutorials API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, specify frontend URL
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
