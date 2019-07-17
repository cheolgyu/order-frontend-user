<template>
  <v-layout>
    <v-flex xs12 sm8 md6 round>
      <v-card>
        <v-card-title class="headline">{{shop.name}}</v-card-title>
        <v-list two-line>
          <v-list-group
            v-for="item in products"
            :key="item.id"
            :prepend-icon="item.action"
            no-action
          >
            <template v-slot:activator>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <v-avatar color="light-blue darken-3">
                    <span class="white--text headline">{{ item.name.charAt(0) }}</span>
                  </v-avatar>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>aaaaaaa</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>{{ item.price }}원</v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
            </template>

            <v-list
              avatar
              two-line
              v-for="option_group in item.option_group_list"
              :key="option_group.id"
            >
              <v-list-tile avatar>
                <template v-if="option_group.option_list.length == 1">
                  <v-slider
                    thumb-label="always"
                    :max="3"
                    :label="option_group.option_list[0].name"
                    small-chips="true"
                    ticks="always"
                    tick-size="1"
                  ></v-slider>
                </template>
                <template v-else>
                  <v-select
                    :items="option_group.option_list"
                    :label="option_group.name"
                    return-object
                    item-text="name"
                  >
                    <template v-slot:selection="{ item, index }">
                      <v-chip v-if="index === 0">
                        <span>{{ item.name }}+{{ item.price }}원</span>
                      </v-chip>
                      <span
                        v-if="index === 1"
                        class="grey--text caption"
                      >(+{{ value.length - 1 }} others)</span>
                    </template>
                    <template v-slot:item="{ item, index }">{{ item.name }} +{{ item.price }}원</template>
                  </v-select>
                </template>
              </v-list-tile>
            </v-list>
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
      products: state => state.shop.products
    }),
    test() {}
  },
  mounted() {
    console.log(this.$route.params.shop);
    //this.init();
  },

  methods: {}
};
</script>
