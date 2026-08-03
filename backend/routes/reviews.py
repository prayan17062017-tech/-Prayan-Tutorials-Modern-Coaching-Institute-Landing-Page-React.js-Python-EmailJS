from fastapi import APIRouter, HTTPException
import httpx
import time
from config.config import settings

router = APIRouter(prefix="/api/reviews", tags=["Reviews"])

# Simple in-memory cache
cache = {
    "data": None,
    "expiry": 0
}
CACHE_DURATION = 3600 # 1 hour

@router.get("")
async def get_reviews():
    current_time = time.time()
    if cache["data"] and current_time < cache["expiry"]:
        return cache["data"]

    if not settings.GOOGLE_API_KEY:
        # Fallback for development if API key is missing
        return {
            "rating": 4.9,
            "user_ratings_total": 184,
            "reviews": [
                {
                    "author_name": "Aditya Patil",
                    "rating": 5,
                    "text": "Best class in Dombivli West! The teachers are highly experienced and provide personal attention to every student. My results improved significantly.",
                    "relative_time_description": "a week ago",
                    "profile_photo_url": "https://i.pravatar.cc/150?u=aditya"
                },
                {
                    "author_name": "Riya Sharma",
                    "rating": 5,
                    "text": "Absolutely the students' favourite coaching classes. The teaching methods are very interactive and friendly. Best place for conceptual clarity in Science.",
                    "relative_time_description": "3 weeks ago",
                    "profile_photo_url": "https://i.pravatar.cc/150?u=riya"
                },
                {
                    "author_name": "Sneha Gupta",
                    "rating": 5,
                    "text": "Excellent coaching and support from all the faculty members. Highly recommended for XI, XII Science board and entrance exams (JEE/NEET) preparation!",
                    "relative_time_description": "a month ago",
                    "profile_photo_url": "https://i.pravatar.cc/150?u=sneha"
                },
                {
                    "author_name": "Prathamesh Shinde",
                    "rating": 5,
                    "text": "The best teaching and mentoring in Dombivli. Regular test series and individual feedback sessions helped me stay focused and achieve great scores.",
                    "relative_time_description": "2 months ago",
                    "profile_photo_url": "https://i.pravatar.cc/150?u=prathamesh"
                }
            ]
        }

    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={settings.GOOGLE_PLACE_ID}&fields=name,rating,reviews,user_ratings_total&sort=newest&key={settings.GOOGLE_API_KEY}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        data = response.json()
        
        if data.get("status") == "OK":
            result = data.get("result", {})
            cache["data"] = result
            cache["expiry"] = current_time + CACHE_DURATION
            return result
        else:
            raise HTTPException(status_code=500, detail=f"Google API error: {data.get('status')}")
