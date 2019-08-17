<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.id" :to="item.to">
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="shop != null">{{shop.name}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn icon ripple>
          <v-icon color=" lighten-1">add_alert</v-icon>
          <!--

            1. 친구가 선택한 물품 공유 해서 결재자 장바구니에 추가시키기
            1-1 현재 가게에 접속중이고 비슷 한 위치에 있는 사람들의 집합.
            1-2 사용자 그룹을 만들어서 그룹에서 사용자 선택해서 보내기
            1-1 보낼 사람을 어떻게 선택하지 ?
            1-1-1 비슷한 위치.? 여러명 결제자는 누구 ?
            
            2. 결제 는 방문 결제로 .. 이 사용자는 단골임으로 방문결제 허용 .
            
          -->
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container fluid fill-height>
        <nuxt />
      </v-container>
    </v-content>
    <cart />
    <ws />
  </v-app>
</template>

<script>
import cart from "~/components/cart.vue";
import ws from "~/components/ws.vue";
import { mapState, mapGetters } from "vuex";
export default {
  components: { cart, ws },
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      {
        icon: "home",
        title: "Welcome",
        to: "/"
      },
      {
        icon: "settings",
        title: "회원가입",
        to: "/join"
      },
      {
        icon: "dashboard",
        title: "로그인",
        to: "/login"
      }
    ],
    title: "사용자"
  }),
  created() {
    this.$vuetify.theme.dark = true;
    console.log("layout created");
  },
  computed: {
    ...mapState({
      shop: state => state.shop.shop,
      products: state => state.shop.products,
      cart: state => state.list
    }),
    test() {}
  }
};
</script>