from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class EnquiryCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    studentName: str = Field(..., min_length=2, max_length=120)
    parentName: str = Field(..., min_length=2, max_length=120)
    mobile: str = Field(..., pattern=r"^[6-9][0-9]{9}$")
    email: EmailStr
    className: str = Field(..., min_length=1, max_length=80)
    stream: str = Field(..., min_length=1, max_length=80)
    course: str = Field(..., min_length=1, max_length=120)
    school: str = Field(..., min_length=2, max_length=200)
    message: Optional[str] = Field(default=None, max_length=2000)


class EnquiryResponse(BaseModel):
    id: int
    student_name: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
