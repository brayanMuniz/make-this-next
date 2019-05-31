<template>
  <div class="home">
    <!-- if logged in use noAuth landing template else use auth landing -->
    <landing-page></landing-page>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import landingPage from "@/components/landingPage.vue";
export default Vue.extend({
  name: "home",
  components: {
    "landing-page": landingPage
  }
});
</script>
