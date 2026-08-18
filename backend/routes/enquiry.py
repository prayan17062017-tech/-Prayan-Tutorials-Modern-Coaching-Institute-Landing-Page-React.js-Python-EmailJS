import logging

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from models.enquiry import Enquiry
from schemas.enquiry import EnquiryCreate
from utils.email import send_enquiry_emails

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/enquiry", tags=["Enquiry"])


@router.post("")
async def create_enquiry(
    enquiry: EnquiryCreate,
    db: Session = Depends(get_db),
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
            message=enquiry.message,
        )
        db.add(db_enquiry)
        db.commit()
        db.refresh(db_enquiry)
    except Exception as error:
        db.rollback()
        logger.exception("Failed to save enquiry to database")
        raise HTTPException(
            status_code=500,
            detail="Unable to save your enquiry. Please try again.",
        ) from error

    success, error_msg = send_enquiry_emails(enquiry.model_dump())
    if not success:
        logger.error("Enquiry %s saved but email failed: %s", db_enquiry.id, error_msg)
        raise HTTPException(
            status_code=500,
            detail="Enquiry was received, but email delivery failed. Please contact us directly.",
        )

    return {"success": True, "message": "Enquiry submitted successfully."}
