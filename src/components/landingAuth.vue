<template>
  <div>
    <nav-bar :userSignedIn="true"></nav-bar>
    <!-- Todo: add a vh of 100 -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">Kek</div>
        <div class="col-md-9">Kek</div>
      </div>
    </div>
    <custom-footer></custom-footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import nav from "@/components/navbar.vue";
import footer from "@/components/footer.vue";
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from "graphql";
// Todo: import your schema from schema.ts. Then make a simple query
// Show the results in the html
export default Vue.extend({
  components: {
    "nav-bar": nav,
    "custom-footer": footer
  },
  data() {
    return {};
  },
  methods: {
    getTestData() {}
  }
});
</script>
<style lang="scss" scoped>
</style>