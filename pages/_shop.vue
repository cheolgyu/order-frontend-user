<template>
  <v-layout>
    <listProduct :list="list" :obj="obj"></listProduct>
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
  watch: {
    list: {
      handler: function() {},
      deep: true
    }
  },
  methods: {
    btn_alert(item) {
      this.$store.dispatch("product/cart_item_push", item).then(res => {});
    }
  }
};
</script>
