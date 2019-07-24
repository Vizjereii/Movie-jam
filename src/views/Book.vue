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
    <v-flex>
      <svg :viewBox="calcViewBox(chairsPerRow, chairRows)" preserveAspectRatio="xMidYMid meet">
        <g v-for="(row, rowIndex) in chairRows" :key="row">
          <path
            v-for="(chairInRow, chairIndex) in chairsPerRow"
            :key="chairInRow"
            :transform="calcTranslate(chairIndex, rowIndex)"
            fill="white"
            :d="chairSvg.path"
          />
        </g>
      </svg>
    </v-flex>
  </v-layout>
  <div v-else>Loading</div>
</template>

<script>
import chairSvg from "../assets/chairPath.js";
import { mapGetters, mapState } from "vuex";
import { format } from "date-fns";

export default {
  data() {
    return {
      chairRows: 11,
      chairsPerRow: 8,
      chairSvg
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
    ...mapState(["movieFetchFinished"]),
    ...mapGetters(["getMovieById"]),
    currentMovieData() {
      return this.getMovieById(this.movieId);
    },
    displayDate() {
      return format(new Date(), "dddd, MMMM Do");
    }
  },
  methods: {
    calcViewBox(numInRow, numRows) {
      return `0 0 ${numInRow * chairSvg.offsetX} ${numRows * chairSvg.offsetY}`;
    },
    calcTranslate(x, y) {
      return `translate(${x * chairSvg.offsetX}, ${y * chairSvg.offsetY})`;
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
  width: 70%;
  height: auto;
  max-height: 600px;
}
</style>