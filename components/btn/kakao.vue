 <template>
  <div>
    <div>
      <div id="kakao-login-btn"></div>
    </div>
    <a href="#" @click="signOut">google Sign out</a>
  </div>
</template>
 
 <script>
export default {
  mounted() {
    this.go();
  },
  created() {},
  methods: {
    go() {
      if (window.Kakao != undefined) {
        window.Kakao.init("d2d9de95761c8199102ae1b822359fe4");
        // 카카오 로그인 버튼을 생성합니다.
        window.Kakao.Auth.createLoginButton({
          container: "#kakao-login-btn",
          success: function(authObj) {
            // 로그인 성공시, API를 호출합니다.
            Kakao.API.request({
              url: "/v2/user/me",
              success: function(res) {
                alert(JSON.stringify(res));
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
      } else {
        console.log("btn initial err", window.Kakao);
      }
    },
    signOut() {
      window.Kakao.Auth.logout(function(obj) {
        console.log("window.Kakao.Auth.logout:", obj);
        if (obj == true) {
        } else {
        }
        // location.href = "로그아웃후 이동할 주소";
      });
    }
  }
};
</script>
 
 <style>
</style>