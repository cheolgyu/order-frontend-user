 <template>
  <div>
    <div id="naverIdLogin"></div>
  </div>
</template>
 
 <script>
export default {
  data() {
    return {
      naverLogin: null
    };
  },
  mounted() {
    this.go();
  },
  created() {},
  methods: {
    go() {
      var naverLogin = new window.naver.LoginWithNaverId({
        clientId: "5PuQOvRKDQe64zz4EEXF",
        callbackUrl: "http://localhost:3333/login",
        isPopup: true /* 팝업을 통한 연동처리 여부 */,
        callbackHandle: false,
        loginButton: {
          color: "green",
          type: 3,
          height: 60
        } /* 로그인 버튼의 타입을 지정 */
      });

      /* 설정정보를 초기화하고 연동을 준비 */
      naverLogin.init();
      this.naverLogin = naverLogin;

      naverLogin.getLoginStatus(function(status) {
        if (status) {
          var profileImage = naverLogin.user.getProfileImage();
          var nickName = naverLogin.user.getNickName();
          var user = {
            type: "naver",
            id: naverLogin.user.id,
            name: naverLogin.user.getNickName(),
            img: naverLogin.user.getProfileImage(),
            email: naverLogin.user.email
          };
          opener.$nuxt.$store
            .dispatch("user/in", user, { root: true })
            .then(res => {});
          window.close();
        } else {
          console.log("AccessToken이 올바르지 않습니다.");
        }
      });
    }
  }
};
</script>
 
 <style>
</style>