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
    store.dispatch("get_shops", params).then(res => {});
  },
  methods: {
    gg() {
      var key =
        "AAAAX9-v24o:APA91bEkdPbIZ6ydVx_iKX2dTetDgvWvCCN06qCCE9cnjIKmHKeW5njSKc3T7WoIAlTVePc6TS_ko1bZZvNs8KbeJ0LhnoxF7KVVBeh7wooq6mgxnvHDjJ90twImM4c4GEl9nVML5c-9";
      var to =
        "fKK6yhzqovg:APA91bH3yoToZMJbKHwad0yge6CokVz1QprJIPkcZN7eTsD056U4xo8JkU71HC7awAqxOGjopA0CETuTigtuiTl6shiWm4PJIWQe-eEDb8ob6oEwepUvkMkwk_0yMGgWOGpMYalK2lSE";
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
          to: to,
          collapse_key: "type_a",
          notification: notification
        })
      })
        .then(function(response) {})
        .catch(function(error) {
          console.error(error);
        });
    }
  }
};
</script>
