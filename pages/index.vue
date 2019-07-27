<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6></v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  ...mapState({
    shop: state => state.shop.shop,
    products: state => state.shop.products.edit,
    cart: state => state.list
  })
};
</script>
