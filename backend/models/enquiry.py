from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime
from database.database import Base

class Enquiry(Base):
    __tablename__ = "enquiries"

    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String)
    parent_name = Column(String)
    mobile = Column(String)
    email = Column(String)
    class_name = Column(String)
    stream = Column(String)
    course = Column(String)
    school = Column(String)
    message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
