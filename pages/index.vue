<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>{{ $store.state.shops }}</v-flex>
    <v-flex xs12 sm8 md6>{{ shops }}</v-flex>
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
