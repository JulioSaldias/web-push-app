console.log('Service Worker Works');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log(data)
    console.log('Notification Recibida');
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'https://img.icons8.com/ios7/600/FFFFFF/appointment-reminders.png'
    });
});