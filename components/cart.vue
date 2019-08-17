
<template>
  <v-footer app dark height="auto" fixed>
    <v-layout align-center justify-start row fill-height>
      <v-badge right overlap color="orange" :key="item.id" v-for="item in cart.show.items">
        <template v-slot:badge>{{item.cnt}}</template>
        <v-avatar color="light-blue darken-3" @click="fn_dialog(item)">
          <span class="white--text headline">{{ item.name.charAt(0) }}</span>
        </v-avatar>
      </v-badge>
    </v-layout>
    <v-spacer></v-spacer>

    <v-btn
      class="mx-3"
      dark
      icon
      @click="fn_buy(item)"
    >{{cart.show.total.cnt}}개 {{cart.show.total.price}}원 구매</v-btn>

    <v-dialog v-model="dialog.show">
      <v-layout align-center justify-center column fill-height>
        <listProduct :show_items="cart.list" :obj="obj"></listProduct>
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
      products: state => state.shop.products,
      cart: state => state.cart,
      ws: state => state.ws
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
    },
    fn_buy() {
      console.log("fn_buy");
      this.$store.dispatch("ws/push", "1111");
    },

    update(item, idx) {
      console.log("상품삭제", item);
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
      

          
      