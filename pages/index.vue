<template>
  <v-layout column justify-center align-center>
    <v-card class="mx-auto" max-width="300" tile>
      <v-list shaped>
        <v-subheader>상점목록</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in shops" :key="i" :to="item.id">
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-layout>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: mapGetters({
    shops: "get_shops"
  }),
  fetch({ store, params }) {
    store.dispatch("get_shops", params).then(res => {
      console.log("fetch then");
      console.log(res);
    });
  }
};
</script>
