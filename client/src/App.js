import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Tabs, Tab, Snackbar, Box, Button,
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Card, CardContent
} from '@mui/material';

function App() {
  const [tab, setTab] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [medications, setMedications] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [location, setLocation] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', date: '', time: '', location: '' });
  const [offline, setOffline] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  // Network Information API
  useEffect(() => {
    if (navigator.connection) {
      navigator.connection.addEventListener('change', () => {
        setOffline(navigator.connection.effectiveType === '2g');
      });
      setOffline(navigator.connection.effectiveType === '2g');
    }
  }, []);

  // Fetch data after login
  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/api/appointments')
        .then(res => res.json())
        .then(setAppointments);
      fetch('http://localhost:5000/api/medications')
        .then(res => res.json())
        .then(setMedications);
      fetch('http://localhost:5000/api/clinics')
        .then(res => res.json())
        .then(setClinics);
    }
  }, [token]);

  // Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  const handleAddAppointment = () => {
    fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => setAppointments(prev => [...prev, data]));
    setOpen(false);
    setForm({ name: '', date: '', time: '', location: '' });
  };

  const getNearbyClinics = () => {
    if (!location) return [];
    return clinics.filter(c =>
      Math.abs(c.lat - location.lat) < 1 && Math.abs(c.lng - location.lng) < 1
    );
  };

  const handleLogin = () => {
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Invalid credentials');
        return res.json();
      })
      .then(data => {
        setToken(data.token);
        setRole(data.role);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
      })
      .catch(() => alert('Invalid credentials'));
  };

  if (!token) {
    return (
      <Container maxWidth="xs">
        <Box mt={10}>
          <Typography variant="h5">Login</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            value={loginData.username}
            onChange={e => setLoginData({ ...loginData, username: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={loginData.password}
            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
          />
          <Button fullWidth variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">MediTrack ({role})</Typography>
          <Button
            color="inherit"
            onClick={() => {
              setToken('');
              setRole('');
              localStorage.removeItem('token');
              localStorage.removeItem('role');
            }}
            style={{ marginLeft: 'auto' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Tabs value={tab} onChange={(_, val) => setTab(val)}>
        <Tab label="Appointments" />
        <Tab label="Medications" />
        <Tab label="Nearby Clinics" />
      </Tabs>

      {tab === 0 && (
        <Box p={2}>
          {role === 'patient' && (
            <Button variant="contained" onClick={() => setOpen(true)}>
              Add Appointment
            </Button>
          )}
          {appointments.map((a) => (
            <Card key={a.id} sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6">{a.name}</Typography>
                <Typography>
                  Date: {a.date} | Time: {a.time}
                </Typography>
                <Typography>Location: {a.location}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {tab === 1 && (
        <Box p={2}>
          {medications.map((m) => (
            <Card key={m.id} sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6">{m.name}</Typography>
                <Typography>Dose: {m.dose}</Typography>
                <Typography>Time: {m.time}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {tab === 2 && (
        <Box p={2}>
          {location ? (
            getNearbyClinics().map((c) => (
              <Card key={c.id} sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h6">{c.name}</Typography>
                  <Typography>
                    Lat: {c.lat}, Lng: {c.lng}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>Detecting your location...</Typography>
          )}
        </Box>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Appointment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Doctor"
            margin="dense"
            value={form.name}
            onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
          />
          <TextField
            fullWidth
            label="Date"
            margin="dense"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.date}
            onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))}
          />
          <TextField
            fullWidth
            label="Time"
            margin="dense"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={form.time}
            onChange={(e) => setForm(f => ({ ...f, time: e.target.value }))}
          />
          <TextField
            fullWidth
            label="Location"
            margin="dense"
            value={form.location}
            onChange={(e) => setForm(f => ({ ...f, location: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddAppointment}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={offline} message="You are on a slow network (2G). Some features may be limited." />
    </Container>
  );
}

export default App;
