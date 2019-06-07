<template>
  <div class="wrapper">
    <nav id="sidebar">
      <div class="sticky-top">
        <div class="sidebar-header">
          <h3>Filters</h3>
        </div>

        <ul class="list-unstyled components">
          <!-- Todo: make font bigger and have a seperator  -->
          <!-- I think it does not work because the bootstrap js is not imported -->
          <li class="active">
            <a
              href="#homeSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle"
            >Home</a>
            <ul class="collapse list-unstyled" id="homeSubmenu">
              <li>
                <a href="#">Home 1</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>

        <ul class="list-unstyled CTAs">
          <li>
            <a class="download">Other Filters</a>
          </li>
          <li>
            <a class="article">Other</a>
          </li>
        </ul>
      </div>
    </nav>

    <div id="content">
      <!-- Todo: will have to make this a sticky top navbar 
      on mobile it will be too annoying to go all the way to the top-->
      <!-- Top Navigation Bar -->
      <div class="sticky-top">
        <nav-bar :userSignedIn="true"></nav-bar>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <button type="button" id="sidebarCollapse" class="btn btn-primary">
              <i class="fas fa-align-left"></i>
              <span>Toggle Filters</span>
              <!-- Todo: have a search bar on the right side of this  -->
              <!-- Todo: have a button right here to want to find by primary language -->
            </button>
          </div>
        </nav>
      </div>
      <card-columns :cardsData="td.testData.data.search.edges"></card-columns>
      <custom-footer></custom-footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import axios from "axios";

import nav from "@/components/navbar.vue";
import footer from "@/components/footer.vue";
import cardColumnsVue from "@/components/cardColumns.vue";

import $ from "jquery";
import td from "@/components/testData.ts";

$(document).ready(function() {
  $("#sidebarCollapse").on("click", function() {
    $("#sidebar").toggleClass("active");
  });
});

export default Vue.extend({
  components: {
    "nav-bar": nav,
    "card-columns": cardColumnsVue,
    "custom-footer": footer
  },
  data() {
    return {
      td: td
    };
  },
  async created() {
    await axios
      .get("https://api.github.com/graphql", {
        headers: {
          Authorization: "Bearer ".concat(store.getters.getUserGitHubToken),
          "Content-type": "application/graphql"
        },
        data: {
          query: ``
        }
      })
      .then(githubResult => {
        console.log("TCL: created -> githubResult", githubResult);
      })
      .catch(err => {
        console.log(err);
      });
  }
});
</script>

<style lang='scss' scoped>
@import "./landingAuth.scss";
</style>