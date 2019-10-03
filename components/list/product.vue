<template>
<v-flex xs12 sm8 md6 round>
  <v-card>
    <v-list shaped flat>
      <v-list-group v-for="(product,idx) in show_items" :key="idx" no-action>
        <template v-slot:prependIcon>
          <v-avatar color="light-blue darken-3" size="30">
            <span class="white--text BOLD" v-text="product.name.charAt(0)"></span>
          </v-avatar>
        </template>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="product.name">{{product.name}}</v-list-item-title>
            <v-list-item-subtitle v-text="get_price_with_option(product)"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <!-- <v-list-item-action-text v-text="'상품기본가격: '+product.price+' 원'" /> -->

            <v-btn icon ripple @click.stop="obj.btn.fn(product,idx)" sm>
              <v-icon color=" lighten-1">{{obj.btn.name}}</v-icon>
              <!--<v-list-item-action-text>{{get_price_with_option(product)}}</v-list-item-action-text>  -->
            </v-btn>
          </v-list-item-action>
        </template>

        <template v-slot:appendIcon></template>
        <v-list-item v-for="(option_group,idx2) in product.option_group_list" :key="idx+'_'+idx2">
          <v-list-item-content>
            <v-select :items="option_group.option_list" :label="option_group.name" :value="option_group.default" item-text="name" item-value="id" @change="obj.event.chg_option_group(product.id,option_group.id,$event,idx,idx2)" filled rounded
              return-object>
              <template v-slot:item="{ item, index }">{{ item.name }} +{{ item.price }}원</template>
              <template v-slot:selection="{ item, index }">
                <v-layout column>
                  <v-flex m-5>
                    <v-chip small>{{ item.name }}</v-chip>
                    <v-list-item-action-text xsmall>+ {{ item.price }}원</v-list-item-action-text>
                  </v-flex>
                  <v-flex mt-5 v-if="item.html_type=='i'">
                    <v-slider m-5 thumb-label="always" :max="6" small-chips="true" ticks="always" tick-size="1" :value="1"></v-slider>
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
<style >
.v-list-group__header__append-icon {
  display: none !important;
}
</style>

<script>
import {
  mapState,
  mapGetters
} from "vuex";

const props = {
  show_items: {
    type: Array,
    default: () => ({})
  },
  obj: {
    type: Object,
    default: () => ({})
  }
};
export default {
  props,
  components: {},

  fetch({
    store,
    params
  }) {
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
      console.log(" 11 run get_price_with_option ", item);
      return item => {
        var option_value = 0;
        for (var i in item.option_group_list) {
          var option_group = item.option_group_list[i];
          var opt_id = option_group.select_opt_id;
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
    // Fetch data about the movie

  }
};
</script>
