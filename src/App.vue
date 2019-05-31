<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "@/firebaseConfig";
let auth = firebase.auth;

export default Vue.extend({
  async beforeCreate() {
    await auth.onAuthStateChanged(async user => {
      if (user) {
        console.log("TCL: created -> user", user);
        await this.$store.dispatch("getAndSetUserData").catch(err => {
          alert("There was a problem getting your data");
        });
      }
    });
  }
});
</script>


<style lang="less">
</style>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap";
</style>
