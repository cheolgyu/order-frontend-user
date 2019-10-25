<template>
  <v-menu
    v-if="$store.state.user.id != null"
    bottom
    offset-y
    v-model="dialog"
    :close-on-content-click="false"
    :return-value="this.init()"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-avatar color="primary">
          <img :src="$store.state.user.img" :alt="$store.state.user.name" />
        </v-avatar>
      </v-btn>
    </template>
    <v-card class="mx-auto" max-width="344">
      <v-card-title primary-title>{{$store.state.user.name}} 님!</v-card-title>
      <v-card-text>
        <p>{{$store.state.user.type}}</p>
        <p>{{$store.state.user.email}}</p>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="logout" text color="primary">로그아웃</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    dialog: false
  }),
  created() {
    this.init();
  },
  computed: {},
  methods: {
    logout() {
      var t = this.$store.state.user.type;

      if (t == "google") {
        this.google_logout();
      } else if (t == "kakao") {
        this.kakao_logout();
      } else if (t == "naver") {
        this.naver_logout();
      } else {
        console.error("err", t);
      }
      this.$store.dispatch("user/out", null, { root: true }).then(res => {});
    },
    google_logout() {
      window.gapi.auth2.getAuthInstance().signOut();
    },
    kakao_logout() {
      window.Kakao.Auth.logout();
    },
    naver_logout() {
      window.naver = null;
      var aIframe = document.createElement("iframe");

      aIframe.setAttribute("id", "naver_logout_ifame");

      aIframe.style.width = "0px";
      aIframe.style.height = "0px";
      aIframe.src = "http://nid.naver.com/nidlogin.logout";
      document.getElementsByTagName("body")[0].appendChild(aIframe);
    },

    init() {}
  }
};
</script>
