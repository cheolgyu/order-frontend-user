<template>
  <v-layout>
    <listProduct :items="products" :obj="obj"></listProduct>
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
        },
        event: {
          chg_option_group: this.chg_option_group
        }
      }
    };
  },
  computed: {
    ...mapState({
      products: state => {
        return state.shop.s_info.p;
      },
      cart: state => state.list
    }),
    test() {},
    get_price_with_option(item) {
      
      return item => {
        var option_value = 0;
        for (var i in item.option_group_list) {
          var option_group = item.option_group_list[i];
          var opt_id = option_group.default;
          var opt = option_group.option_list.find(function(element) {
            return element.id == opt_id;
          });

          option_value += opt.price;
        }

        return item.price + option_value + "원";
      };
    }
  },
  mounted() {
    
  },

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
      

      this.$store.dispatch("shop/chg_option_group", _params).then(res => {
       
      });
    }
  }
};
</script>
