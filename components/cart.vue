
<template>
  <v-footer app dark height="auto" fixed>
    <v-layout align-center justify-start row fill-height>
      <v-badge right overlap color="orange" :key="item.id" v-for="item in cart.items">
        <template v-slot:badge>{{item.cnt}}</template>
        <v-avatar color="light-blue darken-3" @click="fn_dialog(item)">
          <span class="white--text headline">{{ item.name.charAt(0) }}</span>
        </v-avatar>
      </v-badge>
    </v-layout>
    <v-spacer></v-spacer>

    <v-btn class="mx-3" dark icon>{{cart.total.cnt}}개 {{cart.total.price}}원 구매</v-btn>

    <v-dialog v-model="dialog.show">
      <v-layout align-center justify-center column fill-height>
        <listProduct :show_items="cart.items"></listProduct>
      </v-layout>
    </v-dialog>
  </v-footer>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import listProduct from "~/components/list/product.vue";
const props = {};

export default {
  props,
  components: { listProduct },
  data() {
    return {
      dialog: {
        show: false
      }
    };
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
  },
  methods: {
    fn_dialog(item) {
      this.dialog.show = true;
      console.log("dialog", item);
    }
  }
};
</script>
      

          
      