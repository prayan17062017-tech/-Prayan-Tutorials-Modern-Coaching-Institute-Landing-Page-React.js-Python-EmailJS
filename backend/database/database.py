from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import logging

from config.config import settings

logger = logging.getLogger(__name__)

engine = create_engine(
    settings.DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def run_migrations(engine):
    """
    Manually apply any new columns that SQLAlchemy's create_all won't add
    to an already-existing table (SQLite does not support ALTER TABLE in ORM).
    Safe to run on every startup — IF NOT EXISTS guards prevent double-adds.
    """
    new_columns = [
        ("enquiry_id",           "VARCHAR(20)  DEFAULT ''"),
        ("emailjs_admin_sent",   "BOOLEAN      DEFAULT 0 NOT NULL"),
        ("emailjs_student_sent", "BOOLEAN      DEFAULT 0 NOT NULL"),
        ("smtp_admin_sent",      "BOOLEAN      DEFAULT 0 NOT NULL"),
        ("smtp_student_sent",    "BOOLEAN      DEFAULT 0 NOT NULL"),
    ]

    with engine.connect() as conn:
        # Get the columns that already exist in the enquiries table (if it exists)
        try:
            result = conn.execute(text("PRAGMA table_info(enquiries)"))
            existing = {row[1] for row in result}  # row[1] is the column name
        except Exception:
            existing = set()

        for col_name, col_def in new_columns:
            if col_name not in existing:
                try:
                    conn.execute(
                        text(f"ALTER TABLE enquiries ADD COLUMN {col_name} {col_def}")
                    )
                    conn.commit()
                    logger.info("[DB MIGRATION] Added column '%s' to enquiries table.", col_name)
                except Exception as exc:
                    logger.warning(
                        "[DB MIGRATION] Could not add column '%s': %s", col_name, exc
                    )


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
