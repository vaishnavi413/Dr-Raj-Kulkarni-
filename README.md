# Doctor Billing System Installation and Usage

## Tech Stack
- Frontend: React (Vite), Framer Motion, Tailwind-like custom CSS, Axios, Lucide React
- Backend: Node.js, Express.js, MongoDB (Mongoose), Nodemailer, ExcelJS, Node-cron

## Key Features
- **Modern Premium Design:** Clean, dynamic "glassmorphism" design using custom gradient backgrounds, smooth animations via Framer Motion, and distinct print layouts.
- **Print Receipt Capability:** Converts the interface into a professional A4, printer-friendly document mirroring the exact requirements (with signature slots and QR codes).
- **Auto-Incrementing Invoice No:** Automatically calculates the next invoice number based on the latest database entry.
- **Automated Email Backups:** A cron job runs every week, compiles all receipts generated in the past 7 days into an `.xlsx` file, saves it to a `backups` folder, and emails it to the doctor's email address.

## Configuration Steps Required

Before generating live emails, you need to configure your email credentials so the server can send the automated Excel backups. 

1. Open the file: `server/.env`
2. Update the fields with your actual details:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/doctor_billing

# Your Email Settings used for sending the automated attachment
EMAIL_USER=your-email@gmail.com
# For Gmail, you must generate an "App Password" rather than your real password
EMAIL_PASS=your-app-password

# The destination email address where backups will be sent
DOCTOR_EMAIL=doctor-email@gmail.com
```

3. To get a Gmail App Password:
   - Go to your Google Account > Security.
   - Enable 2-Step Verification if not active.
   - Search for "App passwords" and generate a new one for "Mail" and "Windows Computer".
   - Paste the 16-character code into `EMAIL_PASS`.

## Restarting the Server
If you update the `.env` file or ever need to start the application again, you can run:

**Backend (API & Background Cron Job):**
```bash
cd server
npm start # or node server.js
```

**Frontend (React App):**
```bash
cd client
npm run dev
```

The system is currently running locally. You can access the UI at **http://localhost:5174/**.

*(Note: There is a "Force Weekly Backup" button near the title on the webpage that you can click to manually test the email/excel attachment integration without waiting a week).*
