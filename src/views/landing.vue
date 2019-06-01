<template>
  <div class="home">
    <landing-auth v-if="userSignedIn"></landing-auth>
    <landing-page v-else></landing-page>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import landingPage from "@/components/landingPage.vue";
import landingAuth from "@/components/landingAuth.vue";
import store from "@/store";
export default Vue.extend({
  name: "home",
  components: {
    "landing-page": landingPage,
    "landing-auth": landingAuth
  },
  data() {
    return {};
  },
  computed: {
    userSignedIn() {
      return store.getters.isUserSignedIn;
    },
    userName() {
      console.log(store.getters.getUserData);
      return store.getters.getUserData.displayName;
    }
  }
});
</script>
