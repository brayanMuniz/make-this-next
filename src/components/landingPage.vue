<template>
  <div>
    <navbar/>
    <!-- Masthead -->
    <header class="masthead">
      <div class="container h-100">
        <div class="row h-100 align-items-center justify-content-center text-center">
          <div class="col-lg-10 align-self-end">
            <h1
              class="text-uppercase text-white font-weight-bold"
            >Your Favorite Source of Free Bootstrap Themes</h1>
            <hr class="divider my-4">
          </div>
          <div class="col-lg-8 align-self-baseline">
            <p class="text-white-75 font-weight-light mb-5">
              Start Bootstrap can help you build better websites using the
              Bootstrap framework! Just download a theme and start customizing, no strings attached!
            </p>
            <button @click="signUpWithGithub" class="btn btn-primary btn-xl">Sign Up With Github</button>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import navbar from "./navbar.vue";
import store from "@/store";
export default Vue.extend({
  components: {
    navbar
  },
  methods: {
    signUpWithGithub() {
      store
        .dispatch("oauthWithGitHub")
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
</script>

<style lang="scss">
@import "../scss/creative.scss";
</style>