<template>
  <v-layout column justify-center align-center>
    <v-list>
      <v-list-tile avatar v-for="item in shops" :key="item.id">{{item.name}}</v-list-tile>
    </v-list>
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
