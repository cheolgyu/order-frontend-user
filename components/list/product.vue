<template>
  <v-flex xs12 sm8 md6 round>
    <v-card>
      <v-list shaped flat>
        <v-list-group v-for="(p,i) in list" :key="i" no-action>
          <template v-slot:prependIcon>
            <v-avatar color="light-blue darken-3" size="30">
              <span class="white--text BOLD" v-text="p.p_nm.charAt(0)"></span>
            </v-avatar>
          </template>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="p.p_nm"></v-list-item-title>
              <v-list-item-subtitle v-text="get_p_price(p)"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <!-- <v-list-item-action-text v-text="'상품기본가격: '+p.price+' 원'" /> -->

              <v-btn icon ripple @click.stop="obj.btn.fn(p,i)" sm>
                <v-icon color=" lighten-1">{{obj.btn.name}}</v-icon>
                <!--<v-list-item-action-text>{{get_price_with_option(product)}}</v-list-item-action-text>  -->
              </v-btn>
            </v-list-item-action>
          </template>

          <template v-slot:appendIcon></template>
          <v-list-item v-for="(og,i2) in p.og" :key="i+'_'+i2">
            <v-list-item-content>
              <v-select
                :items="og.o"
                :label="og.og_nm"
                :value="og.og_default"
                item-text="o_nm"
                item-value="o_id"
                @change="update_og(p.p_id,og,$event)"
                filled
                rounded
                return-object
              >
                <template v-slot:item="{ item, index }">{{ item.o_nm }} +{{ item.o_price }}원</template>
                <template v-slot:selection="{ item, index }">
                  <v-layout column>
                    <v-flex m-5>
                      <v-chip small>{{ item.o_nm }}</v-chip>
                      <v-list-item-action-text xsmall>+ {{ item.o_price }}원</v-list-item-action-text>
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
<style >
.v-list-group__header__append-icon {
  display: none !important;
}
</style>

<script>
import { mapState, mapGetters } from "vuex";

const props = {
  items: {
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
  data() {
    return {
      list: this.items //JSON.parse(JSON.stringify(this.items))
    };
  },
  watch: {
    list: {
      handler: function(val, oldVal) {
        //카트일경우
        // 1. 카트일 경우 에만 상품들의 총 가격 업데이트 기능
        // 2. 카트의 총합 ui 는/은 카트 총합 model 에서 불러오게 수정.

        console.log("new: %s, old: %s", val, oldVal);
      },
      deep: true
    }
  },
  computed: {
    test() {},
    get_price_with_option(item) {
      return item.select_p_price + "원";
    }
  },
  mounted() {
    //this.init();
  },

  methods: {
    // Fetch data about the movie
    update_price() {},
    update_og(p_id, og, o) {
      og.select_opt_id = o.o_id;
      og.select_opt_name = o.o_nm;
      og.select_opt_price = o.o_price;
      var p_obj = this.list.find(el => el.p_id == p_id);
      var og_obj = p_obj.og.find(el => el.og_id == og.p_id);

      this.update_total_og_price(p_obj);
    },
    update_total_og_price(p_obj) {
      var total_og_price = 0;
      for (var i in p_obj.og) {
        total_og_price = total_og_price + p_obj.og[i].select_opt_price;
      }
      p_obj.total_og_price = total_og_price;
      p_obj.total_p_price = p_obj.p_price + p_obj.total_og_price;
      return p_obj.total_p_price;
    },
    get_p_price(p_obj) {
      return this.update_total_og_price(p_obj) + " 원";
    }
  }
};
</script>
