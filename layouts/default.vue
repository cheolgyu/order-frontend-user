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
    </v-app-bar>

    <v-content>
      <v-container fluid fill-height>
        <nuxt />
      </v-container>
    </v-content>
    <cart />
  </v-app>
</template>

<script>
import cart from "~/components/cart.vue";
import { mapState, mapGetters } from "vuex";
export default {
  components: { cart },
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