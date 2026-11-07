from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text
from datetime import datetime, timezone
from database.database import Base


class Enquiry(Base):
    __tablename__ = "enquiries"

    id = Column(Integer, primary_key=True, index=True)
    enquiry_id = Column(String(20), unique=True, index=True, nullable=False)

    # Enquiry fields
    student_name = Column(String(120), nullable=False)
    parent_name = Column(String(120), nullable=False)
    mobile = Column(String(15), nullable=False)
    email = Column(String(254), nullable=False)
    class_name = Column(String(80), nullable=False)
    stream = Column(String(80), nullable=False)
    course = Column(String(120), nullable=False)
    school = Column(String(200), nullable=False)
    message = Column(Text, nullable=True)

    # Delivery tracking
    emailjs_admin_sent = Column(Boolean, default=False, nullable=False)
    emailjs_student_sent = Column(Boolean, default=False, nullable=False)
    smtp_admin_sent = Column(Boolean, default=False, nullable=False)
    smtp_student_sent = Column(Boolean, default=False, nullable=False)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
