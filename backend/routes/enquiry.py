from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from database.database import get_db
from models.enquiry import Enquiry
from schemas.enquiry import EnquiryCreate
from utils.email import send_enquiry_email

router = APIRouter(prefix="/api/enquiry", tags=["Enquiry"])

@router.post("")
async def create_enquiry(
    enquiry: EnquiryCreate, 
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    try:
        db_enquiry = Enquiry(
            student_name=enquiry.studentName,
            parent_name=enquiry.parentName,
            mobile=enquiry.mobile,
            email=enquiry.email,
            class_name=enquiry.className,
            stream=enquiry.stream,
            course=enquiry.course,
            school=enquiry.school,
            message=enquiry.message
        )
        db.add(db_enquiry)
        db.commit()
        db.refresh(db_enquiry)
        
        # Send email in background
        background_tasks.add_task(send_enquiry_email, enquiry.dict())
        
        return {"status": "success", "message": "Enquiry submitted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
