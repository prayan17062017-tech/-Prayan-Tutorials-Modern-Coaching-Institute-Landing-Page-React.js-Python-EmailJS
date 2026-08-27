"""
Run this ONCE locally to get your Gmail OAuth2 refresh token.
Steps:
  1. Go to https://console.cloud.google.com
  2. Create a project (or use existing)
  3. Enable "Gmail API"
  4. Go to APIs & Services > Credentials > Create Credentials > OAuth 2.0 Client ID
  5. Application type: Desktop app
  6. Download the JSON, rename it to client_secret.json, put it in backend/
  7. Run:  python get_gmail_token.py
  8. A browser opens — sign in as prayan17062017@gmail.com and allow access
  9. Copy the printed GMAIL_REFRESH_TOKEN value into your .env
"""

import json
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/gmail.send"]

flow = InstalledAppFlow.from_client_secrets_file("client_secret.json", SCOPES)
creds = flow.run_local_server(port=0)

print("\n" + "=" * 60)
print("Add these to your backend/.env and Render environment:")
print("=" * 60)
print(f"GMAIL_CLIENT_ID={creds.client_id}")
print(f"GMAIL_CLIENT_SECRET={creds.client_secret}")
print(f"GMAIL_REFRESH_TOKEN={creds.refresh_token}")
print("=" * 60)


