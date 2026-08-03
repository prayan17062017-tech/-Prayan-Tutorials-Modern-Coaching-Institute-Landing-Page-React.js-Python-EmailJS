import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config.config import settings

def send_enquiry_email(enquiry_data: dict):
    try:
        msg = MIMEMultipart()
        msg['From'] = settings.EMAIL_SENDER
        msg['To'] = settings.ADMIN_EMAIL
        msg['Subject'] = f"New Admission Enquiry from {enquiry_data['studentName']}"

        body = f"""
        New enquiry received:
        
        Student Name: {enquiry_data['studentName']}
        Parent Name: {enquiry_data['parentName']}
        Mobile: {enquiry_data['mobile']}
        Email: {enquiry_data['email']}
        Class: {enquiry_data['className']}
        Stream: {enquiry_data['stream']}
        Course: {enquiry_data['course']}
        School: {enquiry_data['school']}
        Message: {enquiry_data.get('message', 'N/A')}
        """
        
        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT)
        server.starttls()
        server.login(settings.EMAIL_SENDER, settings.EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
