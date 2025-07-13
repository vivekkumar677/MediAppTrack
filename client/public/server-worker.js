self.addEventListener('install', event => {
  console.log('[SW] Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Service Worker activated');
  self.clients.claim();

  // ⚠️ Fake periodic reminder (runs only once after activation, just for demo)
  setTimeout(() => {
    self.registration.showNotification('MediTrack Reminder', {
      body: 'Check your medications or upcoming appointments!',
      icon: '/icon.png'
    });
  }, 10000); // 10 seconds after activate
});
