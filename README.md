# Nuv-backend (minimal)

This is a minimal Node.js backend that exposes POST /submit to accept form submissions, append them to a Google Sheet, and notify an admin via Gmail.

Files added:
- `index.js` - main server (also exports `handler` when used with `serverless-http`).
- `routes/form.js` - route wiring for POST /submit.
- `controllers/formController.js` - validation, Google Sheets append, and Nodemailer email logic.
- `.env.example` - template for environment variables.

Setup
1. Copy `.env.example` to `.env` and fill in values.
2. Install dependencies:

```
npm install
```

3. Start server:

```
npm start
```

Google Sheets notes
- Create a Google Cloud service account, grant it access to the target sheet (Share the sheet with the service account email).
- Provide the service account email in `GOOGLE_SERVICE_ACCOUNT_EMAIL` and the private key in `GOOGLE_PRIVATE_KEY`. Replace newlines with `\n`.
- Put your sheet ID in `SHEET_ID`.

Gmail notes
- For Gmail SMTP, it's recommended to use an App Password (if using Google Workspace / Gmail with 2FA). Set `GMAIL_USER` and `GMAIL_PASS` accordingly.

Serverless (optional)
- `index.js` exports `handler` via `serverless-http` when available. To deploy to AWS Lambda, install `serverless-http` and use the exported `handler`.

Security
- Don't commit `.env` or private keys to source control. Use a secrets manager in production.
