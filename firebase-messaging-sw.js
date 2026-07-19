// firebase-messaging-sw.js
// [FEATURE-WEB-PUSH] Service Worker لإشعارات الويب — يستقبل الإشعارات حتى لو المتصفح مغلق تماماً
// أو بالخلفية. يجب أن يبقى بهذا الاسم بالضبط وبجذر الموقع (نفس مستوى index.html).

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// ── نفس إعدادات مشروع Firebase الحقيقي (shahin-cae73) — مطابقة لملف google-services.json ──
firebase.initializeApp({
  apiKey: "AIzaSyCqGnH7BOfOCt51B3bw3jCFua9zrjcOZ9Q",
  authDomain: "shahin-cae73.firebaseapp.com",
  projectId: "shahin-cae73",
  storageBucket: "shahin-cae73.firebasestorage.app",
  messagingSenderId: "330994496468",
  appId: "1:330994496468:android:a3ccffba5293e0e8fd1c41"
});

const messaging = firebase.messaging();

// استقبال الإشعار والتطبيق مغلق/بالخلفية — يعرضه Service Worker مباشرة
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'شاهين إكسبريس';
  const body = payload.notification?.body || 'لديك إشعار جديد';
  self.registration.showNotification(title, {
    body,
    icon: 'https://drive.google.com/uc?export=view&id=1KJOgQw-Fet-DBDVBQTUgNQ9Rq0nlWC_0',
    badge: 'https://drive.google.com/uc?export=view&id=1KJOgQw-Fet-DBDVBQTUgNQ9Rq0nlWC_0',
    vibrate: [200, 100, 200],
    dir: 'rtl',
    lang: 'ar',
    requireInteraction: true
  });
});

// عند الضغط على الإشعار — فتح/تركيز نافذة التطبيق
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
