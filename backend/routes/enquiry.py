import logging

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from models.enquiry import Enquiry
from schemas.enquiry import EnquiryCreate
from utils.email import send_enquiry_emails

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/enquiry", tags=["Enquiry"])


def _send_and_log(enquiry_data: dict) -> None:
    success = send_enquiry_emails(enquiry_data)
    if not success:
        logger.error("One or more enquiry emails failed for %s", enquiry_data.get("email"))


@router.post("")
async def create_enquiry(
    enquiry: EnquiryCreate,
    background_tasks: BackgroundTasks,
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

        background_tasks.add_task(_send_and_log, enquiry.model_dump())

        return {"status": "success", "message": "Enquiry submitted successfully"}
    except Exception as error:
        db.rollback()
        logger.exception("Failed to save enquiry")
        raise HTTPException(status_code=500, detail="Unable to save your enquiry. Please try again.") from error
