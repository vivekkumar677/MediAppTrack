const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let users = [
  { id: 1, username: 'patient1', password: '1234', role: 'patient' },
  { id: 2, username: 'doctor1', password: 'abcd', role: 'doctor' }
];

let sessions = {};

let appointments = [
  { id: 1, name: 'Dr. Sharma', email: 'sharma@gmail.com' , date: '2025-07-12', time: '10:00 AM', location: 'Clinic A' },
  { id: 2, name: 'Dr. Patel', email: 'patel@gmail.com' ,date: '2025-07-13', time: '11:00 AM', location: 'Clinic B' },
  { id: 3, name: 'Dr. Tyagi', email: 'tyagi@gmail.com' ,date: '2025-07-14', time: '12:00 PM', location: 'Clinic C' },
  { id: 4, name: 'Dr. Gupta', email: 'gupta@gmail.com' ,date: '2025-07-15', time: '13:00 PM', location: 'Clinic D' },
  { id: 5, name: 'Dr. V.Kumar', email: 'V.kumar@gmail.com' ,date: '2025-07-16', time: '14:00 PM', location: 'Clinic E' },
];

let medications = [
  { id: 1, name: 'Paracetamol', dose: '500mg', time: '08:00 AM' },
  { id: 2, name: 'Ibuprofen', dose: '400mg', time: '12:00 PM' },
  { id: 3, name: 'Aspirin', dose: '75mg', time: '16:00 PM' },
  { id: 4, name: 'Omeprazole', dose: '20mg', time: '20:00 PM' },
  { id: 5, name: 'Cetirizine', dose: '10mg', time: '08:00 AM' },
];

let clinics = [
  { id: 1, name: 'Sunrise Clinic', lat: 28.6139, lng: 77.2090 },
  { id: 2, name: 'GreenCare Hospital', lat: 28.5355, lng: 77.3910 },
  { id: 99, name: 'Test Clinic Near Me', lat: 18.5204, lng: 73.8567 },
  { id: 3, name: 'City Hospital', lat: 28.7041, lng: 77.1025 },
  { id: 4, name: 'Metro Clinic', lat: 28.4595, lng: 77.0265 },
  { id: 5, name: 'Apollo Hospital', lat: 28.5355, lng: 77.3910 },
  { id: 6, name: 'Fortis Hospital', lat: 28.7041, lng: 77.1025 }
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = `${user.id}-${Date.now()}`;
    sessions[token] = user;
    res.json({ token, role: user.role });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Appointments endpoints
app.get('/api/appointments', (req, res) => res.json(appointments));
app.post('/api/appointments', (req, res) => {
  const newApp = { ...req.body, id: Date.now() };
  appointments.push(newApp);
  res.json(newApp);
});

// Medications endpoints
app.get('/api/medications', (req, res) => res.json(medications));
app.post('/api/medications', (req, res) => {
  const newMed = { ...req.body, id: Date.now() };
  medications.push(newMed);
  res.json(newMed);
});

// Clinics endpoint
app.get('/api/clinics', (req, res) => res.json(clinics));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
