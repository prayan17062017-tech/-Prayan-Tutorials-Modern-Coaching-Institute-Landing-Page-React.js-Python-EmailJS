from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class EnquiryCreate(BaseModel):
    studentName: str
    parentName: str
    mobile: str
    email: EmailStr
    className: str
    stream: str
    course: str
    school: str
    message: Optional[str] = None

class EnquiryResponse(BaseModel):
    id: int
    student_name: str
    created_at: datetime

    class Config:
        from_attributes = True
