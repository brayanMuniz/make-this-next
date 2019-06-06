<template>
  <div class="wrapper">
    <nav id="sidebar">
      <div class="sticky-top">
        <div class="sidebar-header">
          <h3>Bootstrap Sidebar</h3>
        </div>

        <ul class="list-unstyled components">
          <!-- Todo: make font bigger and have a seperator  -->
          <p>Filters</p>
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
              <li>
                <a href="#">Home 2</a>
              </li>
              <li>
                <a href="#">Home 3</a>
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
            <button type="button" id="sidebarCollapse" class="btn btn-info">
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
import nav from "@/components/navbar.vue";
import footer from "@/components/footer.vue";
import cardColumnsVue from "@/components/cardColumns.vue";
import $ from "jquery";
import bootstrap from "bootstrap";
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
  }
});
</script>

<style lang='scss' scoped>
@import "../scss/creative.scss";

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-info {
  background-color: $primary;
  border-color: $primary;
}

.btn-info[data-v-3315e6ff]:hover {
  background-color: darken($primary, 5%);
  border-color: darken($primary, 5%);
  color: #fff;
}

.btn-info[data-v-3315e6ff]:active {
  background-color: darken($primary, 5%);
  border-color: darken($primary, 5%);
  color: #fff;
}

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  background: $primary;
  color: #fff;
  transition: all 0.3s;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: $primary;
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid $primary;
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}

#sidebar ul li a:hover {
  color: $primary;
  background: #fff;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: #fff;
  background: $primary;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}

a.article,
a.article:hover {
  background: $primary !important;
  color: #fff !important;
}

#content {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
}

/* Media Queries */
@media (max-width: 768px) {
  #sidebar {
    margin-left: -250px;
  }
  #sidebar.active {
    margin-left: 0;
  }

  #sidebarCollapse {
    width: 40px;
    height: 40px;
    // Todo: change this to primary color from imported vars
    background: $primary;
    cursor: pointer;
  }

  #sidebarCollapse span {
    width: 80%;
    height: 2px;
    margin: 0 auto;
    display: block;
    background: #555;
    transition: all 0.8s cubic-bezier(0.81, -0.33, 0.345, 1.375);
    transition-delay: 0.2s;
  }

  #sidebarCollapse span:first-of-type {
    transform: rotate(45deg) translate(2px, 2px);
  }
  #sidebarCollapse span:nth-of-type(2) {
    opacity: 0;
  }
  #sidebarCollapse span:last-of-type {
    transform: rotate(-45deg) translate(1px, -1px);
  }

  #sidebarCollapse.active span {
    transform: none;
    opacity: 1;
    margin: 5px auto;
  }
}
</style>