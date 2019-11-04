
import Vue from 'vue'



var firebase = require("firebase/app");
require("firebase/messaging");

const firebaseConfig = {
    apiKey: "AIzaSyAnXl3oOClLjsSEZOLpX3wVjvot6FZk13c",
    authDomain: "macro-parity-237003.firebaseapp.com",
    databaseURL: "https://macro-parity-237003.firebaseio.com",
    projectId: "macro-parity-237003",
    storageBucket: "macro-parity-237003.appspot.com",
    messagingSenderId: "411774737290",
    appId: "1:411774737290:web:168da462a8d07f467e8673",
    measurementId: "G-H4NYJSR149"
};



firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
const YOUR_PUBLIC_VAPID_KEY_HERE = "BCsmDhzVAsf2quJnbUwAmqeKVsXN-3GvnYqhX3zdWNNburJrZCPE572LqHwAV6NW0SkVG7aQRkyWCtfPC12Z5ZA";
messaging.usePublicVapidKey(YOUR_PUBLIC_VAPID_KEY_HERE);

Vue.prototype.$fb_sw_token = null;

let fb_registration = null;
navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
        fb_registration = registration;
        messaging.useServiceWorker(registration);
        return messaging.getToken();
    })
    .then((token) => {
        Vue.prototype.$fb_sw_token = token;

    });

messaging.onMessage((payload) => {


    // Customize notification here
    var notificationTitle = payload.data.title;
    var obj = JSON.parse(payload.data.my_options);
    var notificationOptions = obj;
    console.log("onMessage:", payload, notificationOptions);


    fb_registration.showNotification(notificationTitle,
        notificationOptions);

});




