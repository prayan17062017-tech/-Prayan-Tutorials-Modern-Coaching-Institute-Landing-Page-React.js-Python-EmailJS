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
def create_enquiry(
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
        logger.exception("Failed to save enquiry")
        raise HTTPException(status_code=500, detail="Unable to save your enquiry. Please try again.") from error

    # Keep this synchronous so the API only reports success after both emails
    # have been accepted by Gmail. The form can therefore show its existing
    # success state without masking an SMTP failure.
    try:
        emails_sent = send_enquiry_emails(enquiry.model_dump())
    except Exception:
        logger.exception("Unexpected enquiry email error for saved enquiry %s", db_enquiry.id)
        emails_sent = False

    if not emails_sent:
        logger.error(
            "Enquiry %s was saved, but one or more enquiry emails could not be delivered",
            db_enquiry.id,
        )
        raise HTTPException(
            status_code=503,
            detail="We could not send your enquiry right now. Please try again later.",
        )

    return {"status": "success", "message": "Enquiry submitted successfully"}
