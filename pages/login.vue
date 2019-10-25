<template>
  <v-card>
    <v-card>
      <v-card-title primary-title>로그인</v-card-title>
      <v-card-text>
        <v-card>
          <v-card-text>
            <btn_google />
          </v-card-text>
          <v-card-text>
            <btn_kakao />
          </v-card-text>
          <v-card-text>
            <btn_naver />
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-card>
</template>
<script>
import btn_google from "~/components/btn/google.vue";
import btn_naver from "~/components/btn/naver.vue";
import btn_kakao from "~/components/btn/kakao.vue";
export default {
  mounted() {},
  components: { btn_google, btn_naver, btn_kakao },
  methods: {}
};
</script>

<style>
</style>