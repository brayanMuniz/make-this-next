<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
    <div class="container">
      <!-- Change to logo -->
      <a class="navbar-brand" href="#page-top">Make This Next</a>
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto my-2 my-lg-0">
          <!-- Button to sign in If already made account. Make Font a bit bigger -->
          <li class="nav-item" v-if="!userSignedIn">
            <a class="nav-link js-scroll-trigger" href="#about">Sign In</a>
          </li>
          <li v-else class="nav-item">
            <!-- Change to router link for user page -->
            <a class="nav-link js-scroll-trigger">{{userName}}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
export default Vue.extend({
  computed: {
    userSignedIn() {
      return store.getters.isUserSignedIn;
    },
    userName() {
      return store.getters.getUserData.displayName;
    }
  }
});
</script>
