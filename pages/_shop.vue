<template>
  <v-layout>
    <listProduct list_type="shop" :list="list" :obj="obj"></listProduct>
  </v-layout>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import listProduct from "~/components/list/product.vue";

export default {
  components: { listProduct },
  async fetch({ store, params }) {
    await store.dispatch("shop/info", params.shop).then(res => {});
  },
  data() {
    return {
      obj: {
        btn: {
          name: "shopping_cart",
          fn: this.btn_alert
        }
      }
    };
  },
  computed: {
    ...mapState({
      list: state => state.product.list,
      cart: state => state.list
    })
  },
  mounted() {},

  methods: {
    btn_alert(item) {
      this.$store.dispatch("cart/push", item).then(res => {
        this.$store.dispatch("cart/make_total", item).then(res => {
          this.$store.dispatch("cart/show_simple_list", item);
        });
      });
    },
    chg_option_group(p_id, optg_id, params) {
      var _params = {
        p_id: p_id,
        optg_id: optg_id,
        option: params
      };

      this.$store.dispatch("shop/chg_option_group", _params).then(res => {});
    }
  }
};
</script>
