<template>
  <div class="card-columns">
    <!-- Todo: have an a tag around ll of this wiht the url emebded in there as a router link || send directly to github page  -->
    <!-- Todo: make the card a type in typescript  -->
    <!-- v-if="hasAllFilters(edge)" -->
    <div class="card" v-for="edge in cardsWithFilters" :key="edge.node.id">
      <!-- <img src="..." class="card-img-top" alt="..."> -->
      <div class="card-body">
        <h5 class="card-title">
          <!-- Add the # of forks and stars it has on the sides  -->
          <a :href="edge.node.url">{{edge.node.name}}</a>
        </h5>
        <!-- Add a ... if the text is too long. Aroung > 200 charactesrs -->
        <p class="card-text">{{edge.node.description}}</p>
        <div class="card-text row mx-md-n5">
          <small class="text-muted">{{toMomentTime(edge.node.createdAt)}}</small>
          <a
            href="#"
            class="badge badge-info mx-1"
            v-for="lang in edge.node.languages.nodes"
            :key="lang.name"
          >{{lang.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import { filters } from "../storeModules/githubTypes";

export default Vue.extend({
  props: {
    // Todo: change the any to a type
    cardsData: Array as () => any[],
    cardFilters: Object
  },
  data() {
    return {
      cardsWithFilters: <any>[]
    };
  },
  watch: {
    cardFilters: function() {
      this.cardsWithFilters = <any>[];
      this.cardsData.forEach((card: any) => {
        if (this.hasAllFilters(card)) {
          this.cardsWithFilters.push(card);
        }
      });
    }
  },
  // https://vuejs.org/v2/guide/components-props.html
  computed: {
    filteredCards: function() {}
  },
  mounted() {
    this.cardsWithFilters = <any>[];
    this.cardsData.forEach((card: any) => {
      if (this.hasAllFilters(card)) {
        this.cardsWithFilters.push(card);
      }
    });
  },
  methods: {
    toMomentTime(time: Date): string {
      return moment(time).format("MM-DD-YYYY");
    },
    hasAllFilters(cardData: any): boolean {
      let listOfNeededLanguages = this.cardFilters.languages;

      cardData.node.languages.nodes.forEach((language: any) => {
        if (listOfNeededLanguages.includes(language.name)) {
          listOfNeededLanguages.pop(language.name);
        }
      });
      if (listOfNeededLanguages.length > 1) {
        return false;
      }
      return true;
    }
    //  updatelanguages (value) {
    //   this.$emit('input', value);
    // }
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
