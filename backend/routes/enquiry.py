import logging

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from database.database import get_db
from models.enquiry import Enquiry
from schemas.enquiry import EnquiryCreate
from utils.email import send_enquiry_emails

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/enquiry", tags=["Enquiry"])


@router.post("")
def create_enquiry(
    enquiry: EnquiryCreate,
    db: Session = Depends(get_db),
):
    logger.info("[ENQUIRY] Received enquiry from %s", enquiry.email)

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
        logger.info("[ENQUIRY] Saved to database with id=%s", db_enquiry.id)
    except Exception as error:
        db.rollback()
        logger.exception("[ENQUIRY] Failed to save enquiry to database")
        raise HTTPException(
            status_code=500,
            detail="Unable to save your enquiry. Please try again.",
        ) from error

    success, error_msg = send_enquiry_emails(enquiry.model_dump())
    if not success:
        logger.error("[ENQUIRY] Email delivery failed for id=%s: %s", db_enquiry.id, error_msg)
        return JSONResponse(
            status_code=502,
            content={"success": False, "message": error_msg},
        )

    logger.info("[ENQUIRY] Completed successfully for id=%s", db_enquiry.id)
    return {"success": True, "message": "Enquiry submitted successfully."}
