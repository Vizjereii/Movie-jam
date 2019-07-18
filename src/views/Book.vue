<template>
  <v-layout row wrap justify-start class="even-height scrolling-wrapper booking-container">
    <v-flex xs12 class="headline mb-0 font-weight-medium pa-2">
      <div>Booking tickets for "{{currentMovieData.title}}"</div>
      <div>on {{displayDate}}</div>
      <div>starts at {{timeslot}}</div>
    </v-flex>
    <svg width="600" height="600">
      <g v-for="(row, rowIndex) in chairRows" :key="row">
        <path
          v-for="(chairInRow, chairIndex) in chairsPerRow"
          :key="chairInRow"
          :transform="'translate(' + (1+chairIndex)*50 + ',' + (1+rowIndex)*50 + '.000000) scale(0.0035000,-0.005000)'"
          fill="white"
          :d="chairSvg"
        />
      </g>
    </svg>
  </v-layout>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { format } from "date-fns";

export default {
  data() {
    return {
      chairRows: 11,
      chairsPerRow: 8
    };
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
    ...mapState(["chairSvg"]),
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

svg {
  border: 4px #fff;
  left: 0;
  transform: translateX(50%);
}
</style>