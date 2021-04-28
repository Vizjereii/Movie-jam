<template>
  <v-layout
      v-if="!shouldFetchMovieDetails"
      row
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
        <h4> Cast: </h4>
        <template
          v-for="actor in currentMovieData.credits.cast">
            <v-divider v-if="actor.order > 0" dark></v-divider>
            <MovieDetailsActorComponent
              :key="actor.id"
              :actor-data="actor">
            </MovieDetailsActorComponent>
        </template>
      </v-flex>
    </transition>
  </v-layout>
  <LoadingComponent v-else></LoadingComponent>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {movieDbApiImageBaseUrl} from "@/apiConstants";
import LoadingComponent from "@/components/LoadingComponent";
import MovieDetailsOverviewComponent from "@/components/MovieDetailsPage/MovieDetailsOverviewComponent";
import MovieDetailsActorComponent from "@/components/MovieDetailsPage/MovieDetailsActorComponent";

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
      return !this.currentMovieData;
    },
    imgPath() {
      return movieDbApiImageBaseUrl + this.currentMovieData.poster_path;
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

.component-wrap {
  padding: 1vh 2vh 6vh 2vh;
  max-height: 80%;  
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