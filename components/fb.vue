<template></template>

<script>
export default {
  created() {
    let messaging = this.$msg;

    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...
      } else {
      }
    });

    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging
      .getToken()
      .then(currentToken => {
        if (currentToken) {
          sendTokenToServer(currentToken);
          updateUIForPushEnabled(currentToken);
        } else {
          // Show permission request.

          // Show permission UI.
          updateUIForPushPermissionRequired();
          setTokenSentToServer(false);
        }
      })
      .catch(err => {
        //showToken("Error retrieving Instance ID token. ", err);
        setTokenSentToServer(false);
      });

    // Callback fired if Instance ID token is updated.
  },
  mounted() {}
};
</script>

<style>
</style>