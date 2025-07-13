self.addEventListener('install', event => {
  console.log('[SW] Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Service Worker activated');
  return self.clients.claim();
});

// Background Reminder Check (every 60 seconds)
setInterval(() => {
  self.registration.showNotification('MediTrack Reminder', {
    body: 'Check your medications or upcoming appointments!',
    icon: '/icon.png'
  });
}, 60 * 1000); // runs every 60s
