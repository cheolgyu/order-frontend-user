
<template>
  <v-footer app dark height="auto" fixed>
    <v-layout align-center justify-start row fill-height>
      <v-badge right overlap color="orange" :key="item.id" v-for="item in cart_display.items">
        <template v-slot:badge>{{item.cnt}}</template>
        <v-avatar color="light-blue darken-3" @click="fn_dialog(item)">
          <span class="white--text headline">{{ item.p_nm.charAt(0) }}</span>
        </v-avatar>
      </v-badge>
    </v-layout>
    <v-spacer></v-spacer>

    <v-btn
      rounded
      color="primary"
      @click="fn_buy"
    >{{cart_display.total.cnt}}개 {{cart_display.total.price}}원 구매</v-btn>

    <v-dialog v-model="dialog.show">
      <v-layout align-center justify-center column fill-height>
        <listProduct :list="cart_list" :obj="obj"></listProduct>
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
      },
      obj: {
        btn: {
          name: "close",
          fn: this.update
        }
      }
    };
  },
  mounted() {},
  watch: {
    cart_list: {
      handler: function() {
        //When each event is needed after the common option modification function
        this.$store.dispatch("product/cart_update", null);
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      shop: state => state.shop.shop,
      cart_list: state => state.product.cart_list,
      cart_display: state => state.product.cart_display,
      cart: state => state.cart,
      ws: state => state.ws
    }),
    test() {}
  },
  fetch({ store, params }) {
    store.dispatch("shop/get", params.shop).then(res => {});
  },
  methods: {
    fn_dialog(item) {
      this.dialog.show = true;
    },
    fn_buy() {
      this.$store.dispatch("order/buy");
    },

    update(item, idx) {
      this.$store.dispatch("product/cart_item_remove", idx).then(res => {});
    }
  }
};
</script>
      

          
      