<template>
  <div class="card-columns">
    <!-- Todo: have an a tag around ll of this wiht the url emebded in there as a router link || send directly to github page  -->
    <div class="card" v-for="edge in cardsData" :key="edge.node.id">
      <!-- <img src="..." class="card-img-top" alt="..."> -->
      <div class="card-body">
        <h5 class="card-title">
          <!-- Add the # of forks and stars it has on the sides  -->
          <a :href="edge.node.homepageUrl">K</a>
          <a :href="edge.node.url">{{edge.node.name}}</a>
        </h5>
        <p class="card-text">{{edge.node.description}}</p>
        <!-- Instead of all the pills have the icons displayed with an @click being able to add it to the filters -->
        <!-- Todo: have pills on the right side with first 5 languages. Try to figure out a way to minimize them like javascript => JS  -->
        <p class="card-text">
          <small class="text-muted">{{toMomentTime(edge.node.createdAt)}}</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
export default Vue.extend({
  props: {
    cardsData: Array
  },
  methods: {
    toMomentTime(time) {
      return moment(time).format("MM-DD-YYYY");
    }
  }
});
</script>

<style lang="scss" scoped>
a,
a:hover {
  color: black;
  text-decoration: none;
  transition: all 0.3s;
}
</style>
