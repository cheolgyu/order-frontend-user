console.log("push-sw.js===========================");
self.addEventListener('push', function (event) {
    const payload = event.data ? event.data.text() : 'no payload';
    console.log("3333333333:", payload);
    console.log("push-sw.js===========================");
    event.waitUntil(
        self.registration.showNotification('222222222', {
            body: payload,
        })
    );
});



