 <template>
  <div id="my-signin2"></div>
</template>
 
 <script>
export default {
  mounted() {
    window.gapi.signin2.render("my-signin2", {
      scope: "profile email",
      width: 222,
      height: 49,
      longtitle: true,
      theme: "dark",
      onsuccess: this.onsuccess,
      onfailure: this.onfailure
    });
  },
  created() {},
  methods: {
    onsuccess(user) {
      const profile = user.getBasicProfile();

      var user = {
        type: "google",
        id: profile.getId(),
        name: profile.getName(),
        img: profile.getImageUrl(),
        email: profile.getEmail()
      };
      this.$store.dispatch("user/in", user, { root: true }).then(res => {});
    },
    onfailure(err) {
      console.error("google login onfailure", err);
    }
  }
};
</script>
 
 <style>
</style>