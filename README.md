# MediTrack - Medical Tracker App

MediTrack is a full-stack medical tracking app built using **React.js**, **Node.js**, and **Express**, hosted on **Render** (backend) and **Vercel** (frontend). It helps patients manage appointments, medications, clinic discovery, and profile management, with secure login, role-based access, geolocation, offline support, and background reminders.

---

## 🌐 Live Deployment

- **Frontend (Vercel):** [https://medi-app-track.vercel.app](https://medical-app-track.vercel.app/)
- **Backend (Render):** [https://mediapptrack.onrender.com](https://mediapptrack.onrender.com)

---

## 🛠️ Tech Stack

- **Frontend:** React, Material-UI
- **Backend:** Node.js, Express
- **Database:** (In-memory for demo)
- **Hosting:** Vercel (frontend), Render (backend)
- **APIs Used:**
  - Geolocation API
  - Network Information API
  - Background Tasks API (via Service Worker + Notifications)
  - Intersection Observer API (optional for lazy loading)

---

## ✅ Features Implemented

### 🔐 Authentication
- Patient and Doctor login with username/password
- Token-based authentication with `Bearer` header
- Role stored securely in `localStorage`

### 👤 Role-Based Views
- Patients can:
  - View and add appointments
  - View medications
  - View nearby clinics
  - Access and edit profile
- Doctors can:
  - View appointments and medications only

### 📍 Geolocation + Nearby Clinics
- Uses **Geolocation API** to detect user location
- Filters clinics within ~1 degree latitude/longitude
- Displays nearby clinics dynamically

### 🔗 Network Information API
- Detects slow (2G) networks
- Shows a Snackbar warning for users on limited connections

### 🔔 Background Reminders
- Service Worker sends demo notifications
- Reminder: “Check your medications or upcoming appointments!”

### 📑 Patient Profile
- Profile tab for patients with fields:
  - Name
  - Email
  - Age
  - Gender
- Updates saved locally (mock profile persistence)

### 🌙 PWA Support (Partially)
- Service Worker registered via `/public/service-worker.js`
- Compatible with modern browsers

---

## 📂 Folder Structure
client/
├── public/
│ └── service-worker.js // For background notifications
├── src/
│ ├── App.js // Main app logic
│ └── ...
server/
├── index.js // Express backend
├── package.json

## 🚀 Running Locally

### Backend (Express):
```bash
cd server
npm install
npm start

cd client
npm install
npm run dev # or npm start

👨‍💻 Developer
Vivek Kumar

Full Stack Developer

Built as a real-world MERN stack project demo
