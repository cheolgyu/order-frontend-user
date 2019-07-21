<template>
  <v-layout>
    <v-flex xs12 sm8 md6 round>
      <v-card>
        <v-card-title class="headline" v-if="shop != null">{{shop.name}}</v-card-title>
        <v-list>
          <v-list-group v-for="item in products" :key="item.id" no-action>
            <template v-slot:activator>
              <v-list-item-action>
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
                  v-model="option_group.default"
                  :items="option_group.option_list"
                  :label="option_group.name"
                  item-text="name"
                  item-value="id"
                  :change="chg_option_group(item)"
                  filled
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip>
                      <span>{{ item.name }}+{{ item.price }}원 {{item.html_type}}</span>
                    </v-chip>
                  </template>
                  <template v-slot:item="{ item, index }">{{ item.name }} +{{ item.price }}원</template>
                  <template v-if="item.html_type='i'">
                    <v-slider
                      thumb-label="always"
                      :max="6"
                      :label="option_group.option_list[0].name"
                      small-chips="true"
                      ticks="always"
                      tick-size="1"
                      :value="1"
                    ></v-slider>
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
