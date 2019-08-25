<template>
  <v-layout column justify-center align-center>
    <v-card class="mx-auto" max-width="300" tile>
      <v-list shaped>
        <v-btn color="success" @click="gg">text</v-btn>
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
  },
  methods: {
    gg() {
      var key =
        "AAAAVpCzHfY:APA91bFLY-EfGQCoECkl4eYb7g3cLxNSA4pVVcXkubHqSKk4BgcJ9zh9_WU93BnPSozmOxNyD2gibMAyQ3oavkaTDWhyYwYwysn6N9J_moUsz6Eff42u7nyJNa54QsbsNSyP2NqGOCWG";
      var to =
        "eAkT9GUIU-k:APA91bG7GECCto-PXIpNcRwu2h4gbpU8947IMuggXQJeA2OB4cxu7CEEK9yN0OPP-VOiNGWOi3NwTnU_rSYw2KHtD5BXVzKhBtfGnfl49L6EPFUGQO-6Ei4Gb0PfRrG2bnzaj-nMIRHh";
      var notification = {
        title: "Portugal vs. Denmark",
        body: "5 to 1",
        icon: "firebase-logo.png",
        click_action: "http://localhost:8081"
      };

      fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          Authorization: "key=" + key,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          notification: notification,
          to: to
        })
      })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  }
};
</script>
