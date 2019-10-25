 <template>
  <div>
    <div>
      <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
    </div>
    <a href="#" @click="signOut">google Sign out</a>
  </div>
</template>
 
 <script>
export default {
  mounted() {
    window.gapi.signin2.render("google-signin-button", {
      onsuccess: this.onSignIn
    });
  },
  created() {},
  methods: {
    onSignIn(user) {
      console.log("call in after ===?");
      const profile = user.getBasicProfile();
      console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log("Name: " + profile.getName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    },
    signOut() {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
    }
  }
};
</script>
 
 <style>
</style>