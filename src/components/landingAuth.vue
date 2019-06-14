<template>
  <div class="wrapper">
    <nav id="sidebar">
      <div class="sticky-top">
        <div class="sidebar-header">
          <h3>Filters</h3>
        </div>

        <ul class="list-unstyled components">
          <!-- I think it does not work because the bootstrap js is not imported 
          but if I import it it breaks the css-->
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
          <!-- Members  -->
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </div>
    </nav>

    <div id="content">
      <!-- Top Navigation Bar -->
      <div class="sticky-top">
        <nav-bar :userSignedIn="true"></nav-bar>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <button type="button" id="sidebarCollapse" class="btn btn-primary">
              <i class="fas fa-align-left"></i>
              <font-awesome-icon icon="user-secret"/>
            </button>
            <form @submit.prevent="startRepoQuery(repoQuery)">
              <div class="form-group">
                <div class="input-group-sm ml-0">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Repo Name"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    v-model.trim="repoQuery"
                  >
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <!-- Todo: have a button right here to want to find by primary language -->
          </div>
        </nav>
      </div>
      <!-- Todo: configure the location of the spinner  -->
      <div class="d-flex justify-content-center" v-if="loading">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <card-columns :cardsData="repoResults" :filters="queryFilters" v-else></card-columns>
      <custom-footer></custom-footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";

import nav from "@/components/navbar.vue";
import footer from "@/components/footer.vue";
import cardColumnsVue from "@/components/cardColumns.vue";

import $ from "jquery";
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
      repoQuery: "",
      repoResults: [],
      loading: false,
      queryFilters: {}
    };
  },
  async created() {
    if (store.getters.getUserGitHubToken.length != 0) {
      this.startRepoQuery(this.repoQuery);
    }
  },
  methods: {
    // Todo: move this operation into github module
    changeCardsData(newCardsData: []) {
      this.repoResults = newCardsData;
    },
    async startRepoQuery(searchQuery: string) {
      this.loading = true;
      await store
        .dispatch("repoQueryRequest", searchQuery)
        .then(data => {
          this.loading = false;
          if (data.data === undefined || data.data == null) {
            alert("There was an err");
          } else {
            this.changeCardsData(data.data.search.edges);
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(`received error ${error}`);
        });
    }
  }
});
</script>

<style lang='scss' scoped>
@import "./landingAuth.scss";
</style>