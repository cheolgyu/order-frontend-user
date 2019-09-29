<template>
  <v-menu
    bottom
    offset-y
    v-model="dialog"
    :close-on-content-click="false"
    :return-value="this.init()"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon class="ma-2" v-on="on">
        <v-icon color=" lighten-1">{{icon}}</v-icon>
      </v-btn>
    </template>
    <v-card class="mx-auto" max-width="344">
      <v-card-title primary-title>알림표시</v-card-title>
      <v-card-text>
        알림표시 권한요청은 주문하신 상품에 대한 알림정보를 표시합니다.
        <v-spacer></v-spacer>
        <v-checkbox
          v-model="checkbox"
          v-if="this.permission() !=='granted'"
          label="알림 권한"
          @change="btn_notify"
        ></v-checkbox>
      </v-card-text>

      <v-card-actions>
        <v-btn text>서비스 약관</v-btn>
        <v-spacer></v-spacer>
        <v-btn text>권한 변경 방법</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import fb from "~/components/fb.vue";
import { mapState, mapGetters } from "vuex";

export default {
  data: () => ({
    icon: "error_outline",
    notify: "",
    dialog: false,
    checkbox: false
  }),
  created() {
    /*
    ok = granted;
    n = denied
    */
    this.init();
  },
  computed: {
    ...mapState({
      shop: state => state.shop.shop,
      products: state => state.shop.products,
      cart: state => state.list
    }),
    test() {}
  },
  methods: {
    permission: function(event) {
      if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
        // This is not how you would really do things if they aren't supported. :)
        return "";
      } else {
        return Notification.permission;
      }
    },
    init() {
      this.notify = this.permission();
      console.log("init:", this.notify);
      this.notify_icon();
    },
    notify_icon() {
      if (this.notify == "") {
        alert("222his browser does not support system notifications");
      } else if (this.notify == "granted") {
        this.icon = "notifications_none";
      } else if (this.notify == "denied") {
        this.icon = "notifications_off";
      } else if (this.notify == "default") {
        this.icon = "notification_important";
      }
    },
    btn_notify: function(event) {
      let check = this.permission();
      console.log("btn_notify", check);
      if (check == "granted") {
        // alert("알림표시가 허용됬습니다.");
      } else if (check == "denied") {
        //  alert("알림표시가 차단상태입니다. \n알림표시를 허용해주세요.");
        Notification.requestPermission();
      } else if (check == "default") {
        //   alert("알림표시가 기본상태입니다. \n알림표시를 허용해주세요.");
        Notification.requestPermission();
      }
      this.init();
    }
  }
};
</script>
