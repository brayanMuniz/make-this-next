<template>
  <div class="wrapper">
    <nav id="sidebar">
      <div class="sticky-top">
        <div class="sidebar-header">
          <h3>Filters</h3>
        </div>

        <ul class="list-unstyled components">
          <li class="active">
            <a
              href="#languagesSub"
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle"
            >Languages</a>
            <ul class="collapse list-unstyled" id="languagesSub">
              <!-- Todo: Divide these by the c languages, scripting languages etx -->
              <li v-for="language in languages" :key="language">
                <input type="checkbox" :value="language" v-model="queryFilters.languages">
                <label :for="language">{{language}}</label>
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
      <div class="sticky-top">
        <nav-bar :userSignedIn="true"></nav-bar>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <button type="button" id="sidebarCollapse" class="btn btn-primary">
              <i class="fas fa-align-left"></i>
              <font-awesome-icon icon="filter"/>
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
      <card-columns :cardsData="repoResults" :cardFilters="queryFilters" v-else></card-columns>
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

import "bootstrap";
import $ from "jquery";
import { filters } from "../storeModules/githubTypes";
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
      queryFilters: { languages: [] },
      languages: ["Python", "Javascript", "HTML", "CSS", "Java"]
    };
  },
  async created() {
    if (store.getters.getUserGitHubToken.length != 0) {
      this.startRepoQuery(this.repoQuery);
    } else {
      console.error("There was a problem getting token");
    }
  },
  methods: {
    changeCardsData(newCardsData: []) {
      this.repoResults = newCardsData;
    },
    async startRepoQuery(searchQuery: string, cursor: string) {
      this.loading = true;

      let payload = {
        searchQuery: searchQuery,
        cursor: cursor != null ? cursor : null
      };
      await store
        .dispatch("repoQueryRequest", payload)
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
    //     async paginateNextRepo(repoId: String) {
    //       await this.startRepoQuery()
    // }
  }
});
</script>

<style lang='scss' scoped>
@import "./landingAuth.scss";
</style>