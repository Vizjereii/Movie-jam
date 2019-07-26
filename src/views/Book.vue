<template>
  <v-layout
    v-if="movieFetchFinished"
    row
    wrap
    align-start
    justify-start
    fill-height
    class="even-height scrolling-wrapper booking-container"
  >
    <v-flex xs12 class="headline mb-0 font-weight-medium pa-2">
      <div>
        Booking tickets for
        <span class="prop-highlight">"{{currentMovieData.title}}"</span>
      </div>
      <div>
        on
        <span class="prop-highlight">{{displayDate}}</span>
      </div>
      <div>
        starts at
        <span class="prop-highlight">{{timeslot}}</span>
      </div>
    </v-flex>
    <v-flex xs3 class="component-wrap">
      <v-img :src="imgPath" contain></v-img>
      <v-btn>
        <v-icon medium>info</v-icon>Movie Details
      </v-btn>
    </v-flex>
    <v-flex xs6 class="component-wrap">
      <auditorium></auditorium>
    </v-flex>
    <v-flex xs3 class="component-wrap">tickets selected</v-flex>
  </v-layout>
  <div v-else>Loading</div>
</template>

<script>
import Auditorium from "../components/Auditorium.vue";
import { mapGetters, mapState } from "vuex";
import { format } from "date-fns";

export default {
  data() {
    return {};
  },
  props: {
    movieId: {
      type: Number,
      required: true
    },
    timeslot: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(["movieFetchFinished"]),
    ...mapGetters(["getMovieById"]),
    currentMovieData() {
      return this.getMovieById(this.movieId);
    },
    displayDate() {
      return format(new Date(), "dddd, MMMM Do");
    },
    imgPath() {
      return (
        "https://image.tmdb.org/t/p/w780" + this.currentMovieData.poster_path
      );
    }
  },
  components: {
    Auditorium
  }
};
</script>

<style scoped>
.booking-container {
  text-align: center;
  background-color: black;
  height: 100%;
  width: 100%;
  color: #fff;
  font-family: "Roboto", sans-serif;
}

.component-wrap {
  padding: 1vh 1vh 6vh 1vh;
  height: 85%;
}

.prop-highlight {
  color: rgb(100, 201, 97);
}
</style>