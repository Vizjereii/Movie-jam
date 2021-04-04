<template>
  <v-layout
      v-if="!shouldFetchMovieDetails"
      row
      wrap
      align-start
      justify-start
      fill-height
      class="details-container"
  >
    <transition appear>
      <v-flex xs3 class="component-wrap">
        <v-img :src="imgPath" contain :alt="currentMovieData.title"></v-img>
      </v-flex>
    </transition>
    <transition appear>
      <v-flex xs6 class="component-wrap">
        <MovieDetailsOverviewComponent :movie-data="currentMovieData"/>
      </v-flex>
    </transition>
    <transition appear>
      <v-flex xs3 class="component-wrap">
        <h5> Cast: </h5>
        <MovieDetailsActorComponent v-for="actor in currentMovieData.credits.cast"
             :key="actor.id">{{ actor }}</MovieDetailsActorComponent>
      </v-flex>
    </transition>
  </v-layout>
  <LoadingComponent v-else></LoadingComponent>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {movieDbApiImageBaseUrl} from "@/apiConstants";
import LoadingComponent from "@/components/LoadingComponent";
import MovieDetailsOverviewComponent from "@/components/MovieDetailsOverviewComponent";
import MovieDetailsActorComponent from "@/components/MovieDetailsActorComponent";

export default {
  components: {MovieDetailsActorComponent, MovieDetailsOverviewComponent, LoadingComponent},
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
    ...mapGetters(["getMovieDetailsById"]),
    currentMovieData() {
      return this.getMovieDetailsById(this.movieId);
    },
    shouldFetchMovieDetails() {
      return !this.currentMovieData
    },
    imgPath() {
      return (
          movieDbApiImageBaseUrl + this.currentMovieData.poster_path
      );
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
.details-container {
  text-align: center;
  background-color: black;
  height: 100%;
  width: 100%;
  color: #fff;
  font-family: "Roboto", sans-serif;
}

.v-enter {
  opacity: 0;
  transform: translateY(20px);
}

.v-enter-to {
  opacity: 1;
  transition: all 0.8s ease;
}
</style>