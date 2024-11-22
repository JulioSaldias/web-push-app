const PUBLIC_VAPID_KEY =
  'BD7qqZ-dADTmG4_CEx5-oW6S6N47zOU2vFTNwNvYNnfZpHeF8CGcIC0TJAbwh7tmDz_O-N-keFTyI9FSc5EFB0M';

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  const subscription = async () => {
  // Service Worker
  console.log("Registering a Service worker");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });
  console.log("Nuevo servicio Worker");

  // Escuchar Notificacion Push
  console.log("Escuchando Notificaciones Push");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  });

  console.log(subscription);

  // Enviar Notificacion
  await fetch("/subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log("Suscrito...!");
};

// UI
const form = document.querySelector('#myform');
const message = document.querySelector('#message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch('/new-message', {
    method: 'POST',
    body: JSON.stringify({message: message.value}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  form.reset();
});

// Servicio Worker Support
if ("serviceWorker" in navigator) {
  subscription().catch(err => console.log(err));
}
