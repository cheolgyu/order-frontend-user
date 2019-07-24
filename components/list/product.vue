<template>
  <v-flex xs12 sm8 md6 round>
    <v-card>
      <v-list>
        <v-list-group v-for="product in show_items" :key="product.id" no-action>
          <template v-slot:activator>
            <v-list-item-action small>
              <v-avatar color="light-blue darken-3">
                <span class="white--text headline" v-text="product.name.charAt(0)"></span>
              </v-avatar>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="product.name" />
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text v-text="'상품기본가격: '+product.price+' 원'" />
              <v-list-item-action-text>옵션적용가: {{get_price_with_option(product)}}</v-list-item-action-text>
              <v-btn icon ripple @click.stop="btn_alert(product)">
                <v-icon color=" lighten-1">shopping_cart</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
          <v-list-item v-for="option_group in product.option_group_list" :key="option_group.id">
            <v-list-item-content>
              <v-select
                :items="option_group.option_list"
                :label="option_group.name"
                :value="option_group.default"
                item-text="name"
                item-value="id"
                @change="chg_option_group(product.id,option_group.id,$event)"
                filled
                rounded
                return-object
              >
                <template
                  v-slot:item="{ item, index }"
                >{{ item.name }} +{{ item.price }}원({{option_group.default}},{{item.id}})</template>
                <template v-slot:selection="{ item, index }">
                  <v-layout column>
                    <v-flex m-5>
                      <v-chip small>{{ item.name }}</v-chip>
                      <v-list-item-action-text xsmall>+ {{ item.price }}원</v-list-item-action-text>
                    </v-flex>
                    <v-flex mt-5 v-if="item.html_type=='i'">
                      <v-slider
                        m-5
                        thumb-label="always"
                        :max="6"
                        small-chips="true"
                        ticks="always"
                        tick-size="1"
                        :value="1"
                      ></v-slider>
                    </v-flex>
                  </v-layout>
                  <v-flex></v-flex>
                  <v-spacer></v-spacer>
                </template>
              </v-select>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import { mapState, mapGetters } from "vuex";

const props = {
  show_items: {
    type: Array,
    default: () => ({})
  }
};
export default {
  props,
  components: {},
  fetch({ store, params }) {
    store.dispatch("shop/get", params.shop).then(res => {
      console.log(res);
    });
  },
  data() {
    return {};
  },
  computed: {
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
    console.log("product.vue ", this.show_items);
    //this.init();
  },

  methods: {
    btn_alert(item) {
      console.log("btn_alert", item);
      this.$store.dispatch("cart/push", item).then(res => {});
    },
    chg_option_group(p_id, optg_id, params) {
      var _params = {
        p_id: p_id,
        optg_id: optg_id,
        option: params
      };

      this.$store.dispatch("shop/chg_option_group", _params).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
