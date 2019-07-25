<template>
  <v-layout
    v-if="movieFetchFinished"
    row
    wrap
    justify-start
    class="even-height scrolling-wrapper booking-container"
  >
    <v-flex xs12 class="headline mb-0 font-weight-medium pa-2">
      <div>Booking tickets for "{{currentMovieData.title}}"</div>
      <div>on {{displayDate}}</div>
      <div>starts at {{timeslot}}</div>
    </v-flex>
    <auditorium></auditorium>
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
</style>