<template>
  <v-layout
      v-if="!shouldFetchMovieDetails"
      row
      wrap
      align-start
      justify-start
      fill-height
      class="even-height scrolling-wrapper booking-container"
  >
    
    <v-flex xs3 class="component-wrap">
      <router-link
          :to="{ path: 'details', query: { movieId: movieId }}"
          tag="v-btn"
          class="my-4, v-btn--round"
      >
        <v-icon medium>info</v-icon>
        Movie Details
      </router-link>
      <v-img :src="imgPath" contain></v-img>      
    </v-flex>
    <v-flex xs6 class="component-wrap">
      <v-flex xs12 class="headline mb-0 font-weight-medium pa-2">
        <div>
          Booking tickets for
          <span class="prop-highlight">"{{ currentMovieData.title }}"</span>
        </div>
        <div>
          on
          <span class="prop-highlight">{{ displayDate }}</span>
        </div>
        <div>
          starts at
          <span class="prop-highlight">{{ timeslot }}</span>
        </div>
      </v-flex>
      <auditorium @seatSelected="selectionMade"></auditorium>
    </v-flex>
    <v-flex xs3 class="component-wrap">
      <tickets-component v-if="selectedSeats.length" :seatsSelected="selectedSeats"></tickets-component>
      <MovieDetailsOverviewComponent :movie-data="currentMovieData"/>
    </v-flex>
  </v-layout>
  <LoadingComponent v-else></LoadingComponent>
</template>

<script>
import Auditorium from "@/components/BookingPage/Auditorium.vue";
import TicketsComponent from "@/components/BookingPage/TicketSelectorComponent.vue";
import LoadingComponent from "@/components/LoadingComponent";
import {mapActions, mapGetters} from "vuex";
import {format} from "date-fns";
import {movieDbApiImageBaseUrl} from "@/apiConstants";
import MovieDetailsOverviewComponent from "@/components/MovieDetailsPage/MovieDetailsOverviewComponent";

export default {
  components: {MovieDetailsOverviewComponent, LoadingComponent, Auditorium, TicketsComponent},
  data() {
    return {
      selectedSeats: []
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
    ...mapGetters(["getMovieDetailsById"]),
    currentMovieData() {
      return this.getMovieDetailsById(this.movieId);
    },
    shouldFetchMovieDetails() {
      return !this.currentMovieData;
    },
    displayDate() {
      return format(new Date(), "dddd, MMMM Do");
    },
    imgPath() {
      return movieDbApiImageBaseUrl + this.currentMovieData.poster_path;
    }
  },
  methods: {
    ...mapActions(["fetchMovieDetails"]),
    selectionMade(event) {
      this.selectedSeats = event;
    }
  },
  created() {
    if (this.shouldFetchMovieDetails) {
      this.fetchMovieDetails(this.movieId);
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

.component-wrap {
  padding: 1vh 1vh 6vh 1vh;
  height: 85%;
}

.prop-highlight {
  color: rgb(100, 201, 97);
}
</style>