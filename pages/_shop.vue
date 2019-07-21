<template>
  <v-layout>
    <v-flex xs12 sm8 md6 round>
      <v-card>
        <v-list>
          <v-list-group v-for="item in products" :key="item.id" no-action>
            <template v-slot:activator>
              <v-list-item-action small>
                <v-avatar color="light-blue darken-3">
                  <span class="white--text headline" v-text="item.name.charAt(0)"></span>
                </v-avatar>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.name" />
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text v-text="item.price+' 원'" />
                <v-btn icon ripple @click.stop="btn_alert(item)">
                  <v-icon color=" lighten-1">shopping_cart</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
            <v-list-item v-for="option_group in item.option_group_list" :key="option_group.id">
              <v-list-item-content>
                <v-select
                  :items="option_group.option_list"
                  :label="option_group.name"
                  item-text="name"
                  item-value="id"
                  :change="chg_option_group(item)"
                  filled
                  rounded
                  attach
                >
                  <template v-slot:item="{ item, index }">{{ item.name }} +{{ item.price }}원</template>
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
  </v-layout>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
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
    ...mapState({
      shop: state => state.shop.shop,
      products: state => state.shop.products,
      cart: state => state.list
    }),
    test() {}
  },
  mounted() {
    console.log(this.$route.params.shop);
    //this.init();
  },

  methods: {
    btn_alert(item) {
      console.log("btn_alert", item);
      this.$store.dispatch("cart/push", item).then(res => {});
    },
    chg_option_group(item) {
      console.log("chg_option_group", item);
    }
  }
};
</script>
