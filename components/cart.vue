
<template>
  <v-footer app dark height="auto" fixed>
    <v-badge right overlap color="orange" :key="item.id" v-for="item in cart.items">
      <span slot="badge">{{item.cnt}}</span>
      <v-avatar color="light-blue darken-3">
        <span class="white--text headline">{{ item.name.charAt(0) }}</span>
      </v-avatar>
    </v-badge>
    <v-spacer></v-spacer>

    <v-btn class="mx-3" dark icon>{{cart.total.cnt}}개 {{cart.total.price}}원 구매</v-btn>
  </v-footer>
</template>
<script>
import { mapState, mapGetters } from "vuex";
const props = {};

export default {
  props,
  data() {
    return {};
  },
  computed: {
    ...mapState({
      shop: state => state.shop.shop,
      products: state => state.shop.products,
      cart: state => state.cart.show
    }),
    test() {}
  },
  fetch({ store, params }) {
    store.dispatch("shop/get", params.shop).then(res => {
      console.log(res);
    });
  }
};
</script>
      

          
      