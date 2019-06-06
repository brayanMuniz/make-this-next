<template>
  <div class="wrapper">
    <nav id="sidebar">
      <div class="sidebar-header">
        <h3>Bootstrap Sidebar</h3>
      </div>

      <ul class="list-unstyled components">
        <p>Dummy Heading</p>
        <!-- I think it does not work because the bootstrap js is not importe -->
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
    </nav>

    <div id="content">
      <!-- Top Navigation Bar -->
      <nav-bar :userSignedIn="true"></nav-bar>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button type="button" id="sidebarCollapse" class="btn btn-info">
            <i class="fas fa-align-left"></i>
            <span>Toggle Filters</span>
          </button>
        </div>
      </nav>
      <custom-footer></custom-footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import nav from "@/components/navbar.vue";
import footer from "@/components/footer.vue";
import $ from "jquery";
import bootstrap from "bootstrap";
$(document).ready(function() {
  $("#sidebarCollapse").on("click", function() {
    $("#sidebar").toggleClass("active");
  });
});
export default Vue.extend({
  components: {
    "nav-bar": nav,
    "custom-footer": footer
  }
});
</script>
<style lang='scss' scoped>
a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  background: #7386d5;
  color: #fff;
  transition: all 0.3s;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #6d7fcc;
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid #47748b;
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
  color: #7386d5;
  background: #fff;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: #fff;
  background: #6d7fcc;
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

a.download {
  background: #fff;
  color: #7386d5;
}

a.article,
a.article:hover {
  background: #6d7fcc !important;
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
    background: #f5f5f5;
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