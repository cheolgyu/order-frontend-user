<template>
  <v-card>
    <v-card>
      <div>
        <btn_google />
        <btn_kakao />
        <btn_naver />
      </div>
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