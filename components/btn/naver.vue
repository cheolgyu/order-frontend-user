 <template>
  <div>
    <div id="naverIdLogin"></div>
    <a href="#" @click="signOut">google Sign out</a>
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
          alert(nickName);
          //naverLogin.logout();
        } else {
          console.log("AccessToken이 올바르지 않습니다.");
        }
      });
    },
    setLoginStatus() {},
    signOut() {
      new window.naver.LoginWithNaverId({
        clientId: "5PuQOvRKDQe64zz4EEXF",
        callbackUrl: "http://localhost:3333/login",
        isPopup: true /* 팝업을 통한 연동처리 여부 */,
        callbackHandle: false,
        loginButton: {
          color: "green",
          type: 3,
          height: 60
        } /* 로그인 버튼의 타입을 지정 */
      }).logout();
    }
  }
};
</script>
 
 <style>
</style>