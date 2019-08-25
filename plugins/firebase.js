
import Vue from 'vue'

const firebaseConfig = {
    apiKey: "AIzaSyDeFOTllKAw1sHpK4OBFLOtmT4pFx5K3go",
    authDomain: "order-99f38.firebaseapp.com",
    databaseURL: "https://order-99f38.firebaseio.com",
    projectId: "order-99f38",
    storageBucket: "",
    messagingSenderId: "371794845174",
    appId: "1:371794845174:web:f0a19ab33f3ed85c"
};

var firebase = require("firebase/app");
require("firebase/messaging");
require("firebase/auth");
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
const YOUR_PUBLIC_VAPID_KEY_HERE = "BFE1Zmtf2K7IAo7WpUinwGUxpRgIg-cVYMPjYCgHYo7zlIfpsaA3dokWNqwtK_vVIosdGuqjrRZEe6fAz27EgZ0";
messaging.usePublicVapidKey(YOUR_PUBLIC_VAPID_KEY_HERE);

console.log(firebase, messaging);
Vue.prototype.$msg = messaging

let fb_registration = null;
navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
        fb_registration = registration;
        messaging.useServiceWorker(registration);
        return messaging.getToken();
    })
    .then((token) => {
        console.log('token::::::::::::::::::::. ', token);
    });


// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage((payload) => {
    console.log('Message received. ', payload);

    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Background Message Title22222';
    var notificationOptions = {
        body: '111111Background Message body22222.',
        icon: '/firebase-logo.png'
    };


    fb_registration.showNotification(notificationTitle,
        notificationOptions);

    // ...
});




