<template>
  <v-layout row justify-start class="even-height scrolling-wrapper booking-container">
    <v-flex class="headline mb-0 font-weight-medium pa-2">
      <div>Booking tickets for "{{currentMovieData.title}}"</div>
      <div>on {{displayDate}}</div>
      <div>starts at {{timeslot}}</div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { format } from "date-fns";

export default {
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
    ...mapGetters(["getMovieById"]),
    currentMovieData() {
      return this.getMovieById(this.movieId);
    },
    displayDate() {
      return format(new Date(), "dddd, MMMM Do");
    }
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