<template>
  <div class>
    <nav-bar :userSignedIn="false"></nav-bar>
    <!-- Masthead -->
    <header class="masthead">
      <div class="container h-100">
        <div class="row h-100 align-items-center justify-content-center text-center">
          <div class="col-lg-10 align-self-end">
            <h1
              class="text-uppercase text-white font-weight-bold"
            >Search github and find inspiration for your next project</h1>
            <hr class="divider my-4">
          </div>
          <div class="col-lg-8 align-self-baseline">
            <p
              class="text-white-75 font-weight-light mb-5"
            >Make This Next can help you find projects using public github repositories and help you sort through them to find the projects you need.</p>
            <button @click="signUpWithGithub" class="btn btn-primary btn-xl">Sign Up With Github</button>
          </div>
        </div>
      </div>
    </header>
    <custom-footer></custom-footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import nav from "@/components/navbar.vue";
import footer from "@/components/footer.vue";
import store from "@/store";
export default Vue.extend({
  components: {
    "nav-bar": nav,
    "custom-footer": footer
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