<template>
  <div class="home">
    <landing-auth v-if="userSignedIn"></landing-auth>
    <landing-page v-else></landing-page>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import firebase from "@/firebaseConfig";
export default Vue.extend({
  name: "home",
  components: {
    "landing-page": () => import("@/components/landingPage.vue"),
    "landing-auth": () => import("@/components/landingAuth.vue")
  },
  props: {
    userSignedIn: Boolean
  },
  data() {
    return {};
  },
  computed: {
    userName() {
      return store.getters.getUserData.displayName;
    }
  }
});
</script>
