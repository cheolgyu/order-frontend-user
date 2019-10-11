
<template>
  <v-footer app dark height="auto" fixed>
    <v-layout align-center justify-start row fill-height>
      <v-badge right overlap color="orange" :key="item.id" v-for="item in cart.show.items">
        <template v-slot:badge>{{item.cnt}}</template>
        <v-avatar color="light-blue darken-3" @click="fn_dialog(item)">
          <span class="white--text headline">{{ item.name }}</span>
        </v-avatar>
      </v-badge>
    </v-layout>
    <v-spacer></v-spacer>

    <v-btn
      rounded
      color="primary"
      @click="fn_buy"
    >{{cart.show.total.cnt}}개 {{cart.show.total.price}}원 구매</v-btn>

    <v-dialog v-model="dialog.show">
      <v-layout align-center justify-center column fill-height>
        <listProduct :items="cart_list" :obj="obj"></listProduct>
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
        },
        event: {
          chg_option_group: this.chg_option_group
        }
      }
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      shop: state => state.shop.shop,
      cart_list: state => state.product.cart_list,
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
      this.$store.dispatch("order/buy", this.$fb_sw_token);
    },

    update(item, idx) {
      this.$store.dispatch("cart/remove_product", idx).then(res => {
        this.$store.dispatch("cart/make_total", item).then(res => {
          this.$store.dispatch("cart/show_simple_list", item).then();
        });
      });
    },
    chg_option_group(p_id, optg_id, params, idx, idx2) {
      var _params = {
        p_id: p_id,
        optg_id: optg_id,
        option: params,
        idx: idx,
        idx2: idx2
      };

      this.$store.dispatch("cart/chg_option_group", _params).then(res => {
        this.$store.dispatch("cart/make_total", _params).then(res => {
          this.$store.dispatch("cart/show_simple_list", _params).then();
        });
      });
    }
  }
};
</script>
      

          
      