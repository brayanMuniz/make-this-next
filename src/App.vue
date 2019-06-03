<template>
  <div id="app">
    <router-view :userSignedIn="isTheUserSignedIn"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import firebase from "@/firebaseConfig";
export default Vue.extend({
  data() {
    return {
      isTheUserSignedIn: false
    };
  },
  created() {
    firebase.firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.isTheUserSignedIn = true;
        store.commit("updateAuthData", user);
        await store.dispatch("getAndSetUserData").catch(err => {
          alert("There was a problem getting your data");
        });
      } else {
        this.isTheUserSignedIn = false;
        store.commit("clearUserData");
      }
    });
  }
});
</script>
