 <template>
  <div id="kakao-login-btn"></div>
</template>
 
 <script>
export default {
  mounted() {
    this.go2();
  },
  created() {},
  methods: {
    go2() {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.VUE_APP_OAUTH_KAKAO_CLIENT_ID);
      }

      window.Kakao.Auth.createLoginButton({
        container: "#kakao-login-btn",
        scope: "account_email",
        size: "medium",
        success: function(authObj) {
          var res = Kakao.API.request({
            url: "/v2/user/me",
            success: function(resp) {
              var user = {
                type: "kakao",
                id: resp.id,
                name: resp.kakao_account.profile.nickname,
                img: resp.kakao_account.profile.thumbnail_image_url,
                email: resp.kakao_account.email
              };
              window.$nuxt.$store
                .dispatch("user/in", user, { root: true })
                .then(res => {});
            },

            fail: function(error) {
              alert(JSON.stringify(error));
            }
          });
        },
        fail: function(err) {
          alert(JSON.stringify(err));
        }
      });
    }
  }
};
</script>
 
 <style>
</style>