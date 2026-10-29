# Backend Setup Guide

This is the single complete guide to build, deploy, and run the backend on Google Cloud Run for ambassador and feedback forms.

## Scope
- Backend architecture and API contracts
- Cloud Run deployment from scratch
- SMTP configuration in Google Cloud Console
- End to end testing with curl
- Operations and troubleshooting

## Current App Integration
The mobile app calls two public POST endpoints from the environment file.

- `EXPO_PUBLIC_AMBASSADOR_FUNCTION_URL`
- `EXPO_PUBLIC_FEEDBACK_FUNCTION_URL`

Keep request contracts stable so the mobile app does not break.

## 1. Architecture Overview
Use two independent Cloud Run services.

- Service A: `ambassador`
- Service B: `feedback`

Each service should:
- Accept JSON POST requests
- Validate required fields
- Send email through SMTP
- Return clear JSON errors
- Log diagnostic details without exposing secrets

Data flow:
1. App sends request.
2. Cloud Run validates payload.
3. Cloud Run sends SMTP email.
4. Cloud Run returns success or error JSON.
5. Cloud Logging stores details for debugging.

## 2. API Contract

### Ambassador Endpoint
`POST /`

Request body:
```json
{
	"name": "Optional Name",
	"email": "Optional Email",
	"age": "Optional Age",
	"city": "Optional City",
	"state": "Optional State",
	"country": "Optional Country",
	"message": "Required message text"
}
```

Rules:
- `message` must be a non empty string.

Success response:
```json
{
	"ok": true,
	"message": "Ambassador request sent"
}
```

Validation error response:
```json
{
	"ok": false,
	"error": "message is required"
}
```

SMTP failure response:
```json
{
	"ok": false,
	"error": "Internal email delivery failure"
}
```

### Feedback Endpoint
`POST /`

Request body:
```json
{
	"name": "Optional Name",
	"email": "Optional Email",
	"message": "Required feedback text"
}
```

Rules:
- `message` must be a non empty string.

Success response:
```json
{
	"ok": true,
	"message": "Feedback sent"
}
```

Validation error response:
```json
{
	"ok": false,
	"error": "message is required"
}
```

SMTP failure response:
```json
{
	"ok": false,
	"error": "Internal email delivery failure"
}
```

## 3. Backend Starter Code
Use this as the baseline for both services.

```ts
import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json({ limit: "1mb" }));

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpSecure = (process.env.SMTP_SECURE || "true") === "true";
const toEmail = process.env.TO_EMAIL;

const transport = nodemailer.createTransport({
	host: smtpHost,
	port: smtpPort,
	secure: smtpSecure,
	auth: {
		user: smtpUser,
		pass: smtpPass,
	},
});

app.post("/", async (req, res) => {
	const { name, email, age, city, state, country, message } = req.body || {};

	if (typeof message !== "string" || !message.trim()) {
		return res.status(400).json({ ok: false, error: "message is required" });
	}

	if (!smtpUser || !smtpPass || !toEmail) {
		console.error("Missing SMTP env config", {
			hasUser: Boolean(smtpUser),
			hasPass: Boolean(smtpPass),
			hasToEmail: Boolean(toEmail),
		});
		return res.status(500).json({ ok: false, error: "Server is misconfigured" });
	}

	try {
		await transport.sendMail({
			from: smtpUser,
			to: toEmail,
			subject: "New Submission",
			text: [
				`name: ${name || ""}`,
				`email: ${email || ""}`,
				`age: ${age || ""}`,
				`city: ${city || ""}`,
				`state: ${state || ""}`,
				`country: ${country || ""}`,
				`message: ${message}`,
			].join("\\n"),
		});

		return res.status(200).json({ ok: true, message: "Submission sent" });
	} catch (error: any) {
		console.error("SMTP sendMail failed", {
			code: error?.code,
			responseCode: error?.responseCode,
			message: error?.message,
		});
		return res.status(500).json({ ok: false, error: "Internal email delivery failure" });
	}
});

app.get("/health", (_req, res) => {
	res.status(200).json({ ok: true });
});

const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
	console.log(`server listening on ${port}`);
});
```

## 4. Cloud Run Setup From Start

Prerequisites:
- Google Cloud project with billing
- APIs enabled: Cloud Run, Cloud Build, Artifact Registry
- IAM access: Cloud Run Admin, Service Account User, Logs Viewer

Suggested backend structure:
```text
backend/
	ambassador/
		src/index.ts
		package.json
		Dockerfile
	feedback/
		src/index.ts
		package.json
		Dockerfile
```

Example `package.json`:
```json
{
	"name": "cloud-run-mail-service",
	"version": "1.0.0",
	"type": "module",
	"scripts": {
		"start": "node src/index.js"
	},
	"dependencies": {
		"express": "^4.19.2",
		"nodemailer": "^6.9.13"
	}
}
```

Example `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]
```

Deploy ambassador:
```bash
gcloud run deploy ambassador \
	--source . \
	--region us-central1 \
	--allow-unauthenticated \
	--set-env-vars SMTP_HOST=smtp.gmail.com,SMTP_PORT=465,SMTP_SECURE=true,TO_EMAIL=team@example.com \
	--set-secrets SMTP_USER=SMTP_USER:latest,SMTP_PASS=SMTP_PASS:latest
```

Deploy feedback:
```bash
gcloud run deploy feedback \
	--source . \
	--region us-central1 \
	--allow-unauthenticated \
	--set-env-vars SMTP_HOST=smtp.gmail.com,SMTP_PORT=465,SMTP_SECURE=true,TO_EMAIL=team@example.com \
	--set-secrets SMTP_USER=SMTP_USER:latest,SMTP_PASS=SMTP_PASS:latest
```

## 5. Google Cloud Console SMTP Variables
For each service:
1. Open Cloud Run.
2. Select the service.
3. Click Edit and Deploy New Revision.
4. Open Container, Variables and Secrets.
5. Set values:
	 - `SMTP_USER`
	 - `SMTP_PASS`
	 - `SMTP_HOST`
	 - `SMTP_PORT`
	 - `SMTP_SECURE`
	 - `TO_EMAIL`
6. Deploy.

Use Secret Manager for `SMTP_PASS` and preferably `SMTP_USER`.

## 6. Connect Mobile App
Update app environment values:
- `EXPO_PUBLIC_AMBASSADOR_FUNCTION_URL=https://<ambassador-service-url>`
- `EXPO_PUBLIC_FEEDBACK_FUNCTION_URL=https://<feedback-service-url>`

## 7. End to End Testing
Ambassador test:
```bash
curl -X POST "https://<ambassador-service-url>" \
	-H "Content-Type: application/json" \
	-d '{
		"name": "Test User",
		"email": "test@example.com",
		"city": "San Jose",
		"country": "US",
		"message": "I want to join"
	}'
```

Feedback test:
```bash
curl -X POST "https://<feedback-service-url>" \
	-H "Content-Type: application/json" \
	-d '{
		"name": "Test User",
		"email": "test@example.com",
		"message": "This is product feedback"
	}'
```

Expected results:
- Missing `message`: HTTP 400
- Valid payload: HTTP 200
- SMTP issue: HTTP 500

Health check:
```bash
curl "https://<service-url>/health"
```

## 8. Troubleshooting

### 400 Bad Request
Cause:
- Missing or empty `message`

Fix:
- Send `message` as non empty string
- Ensure `Content-Type: application/json`

### 500 Internal Server Error
Cause:
- Missing SMTP credentials
- Invalid SMTP credentials
- Host or TLS mismatch

Fix:
- Verify `SMTP_USER` and `SMTP_PASS`
- If Gmail, use App Password
- Verify `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`
- Check Cloud Run logs for provider response code

Safe log pattern:
```ts
console.error("SMTP failure", {
	hasUser: Boolean(process.env.SMTP_USER),
	hasPass: Boolean(process.env.SMTP_PASS),
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: process.env.SMTP_SECURE,
	code: error?.code,
	responseCode: error?.responseCode,
	message: error?.message,
});
```

## 9. Incident Response
1. Check latest Cloud Run revision.
2. Roll back if current revision is broken.
3. Verify Secret Manager versions.
4. Re test with known good curl payload.
5. Promote fixed revision after validation.

## 10. Production Hardening
- Add API key based request auth
- Add request rate limiting
- Add structured JSON logs with request IDs
- Add monitoring and alerting for 5xx spikes
