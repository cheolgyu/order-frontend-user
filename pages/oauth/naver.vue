<template>
  <v-card>callback 처리중입니다. 이 페이지에서는 callback을 처리하고 바로 main으로 redirect하기때문에 이 메시지가 보이면 안됩니다.</v-card>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      info: "5555555555"
    };
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    go() {
      var naverLogin = new window.naver.LoginWithNaverId({
        clientId: "5PuQOvRKDQe64zz4EEXF",
        callbackUrl: "http://localhost:3333/oauth/naver",
        isPopup: false /* 팝업을 통한 연동처리 여부 */,
        callbackHandle: false,
        loginButton: {
          color: "green",
          type: 3,
          height: 60
        } /* 로그인 버튼의 타입을 지정 */
      });

      /* 설정정보를 초기화하고 연동을 준비 */
      naverLogin.init();

      /* (4) Callback의 처리. 정상적으로 Callback 처리가 완료될 경우 main page로 redirect(또는 Popup close) */
      window.addEventListener("load", function() {
        naverLogin.getLoginStatus(function(status) {
          if (status) {
            /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
            var email = naverLogin.user.getEmail();
            if (email == undefined || email == null) {
              alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
              /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
              naverLogin.reprompt();
              return;
            }

            window.location.replace(
              "http://" +
                window.location.hostname +
                (location.port == "" || location.port == undefined
                  ? ""
                  : ":" + location.port) +
                "/login"
            );
          } else {
            console.log("callback 처리에 실패하였습니다.");
          }
        });
      });
    }
  }
};
</script>

<style>
</style>
