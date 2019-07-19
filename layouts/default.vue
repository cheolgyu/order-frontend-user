<template>
  <v-app dark>
    <v-toolbar fixed app>
      <v-toolbar-title to="/" v-text="title" />
      <v-spacer />
      <v-btn to="/login" dark icon>
        <v-icon>person</v-icon>
      </v-btn>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <cart />
  </v-app>
</template>

<script>
import cart from "~/components/cart.vue";

export default {
  components: { cart },
  data() {
    return {
      items: [
        {
          icon: "apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "bubble_chart",
          title: "회원가입",
          to: "/join"
        },
        {
          icon: "bubble_chart",
          title: "로그인",
          to: "/login"
        }
      ],
      title: "사용자"
    };
  }
};
</script>
