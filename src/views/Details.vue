<template>
  <v-layout
      v-if="!shouldFetchMovieDetails"
  >
    
  </v-layout>
  <div v-else>TODO: Loading Component goes here</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {};
  },
  props: {
    movieId: {
      type: Number,
      required: true
    },
  },
  computed: {
    ...mapGetters(["getMovieById"]),
    currentMovieData() {
      return this.getMovieById(this.movieId);
    },
    shouldFetchMovieDetails() {
      return !this.currentMovieData || !this.currentMovieData.videos
    }
  },
  methods: {
    ...mapActions(["fetchMovieDetails"]),
  },
  created() {
    if (this.shouldFetchMovieDetails) {
      this.fetchMovieDetails(this.movieId);
    }    
  }
}
</script>

<style scoped>

</style>