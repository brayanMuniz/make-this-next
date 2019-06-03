<template>
  <div>
    <nav-bar :userSignedIn="true"></nav-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import nav from "@/components/navbar.vue";
export default Vue.extend({
  components: {
    "nav-bar": nav
  }
});
</script>

<style lang="scss">
@import "../scss/creative.scss";
</style>