<template>
  <div class="details-container">
    <router-link
        :to="{ path: 'details', query: { movieId: movieId }}"
        tag="v-btn"
        class="my-4, v-btn--round"
    >
      <v-icon medium>info</v-icon>
      Movie Details
    </router-link>
    <h4 class="headline pa-3 text-pop">Showtimes</h4>
    <v-layout align-center justify-center row wrap pa-5 mb-2>
      <v-flex v-for="time in getShowtimes" :key="time" xs3>
        <v-card-text
            class="px-0 py-2 headline font-weight-medium time-slot"
            :class="{'time-slot-active': isTimeslotValid(time)}"
            @click="navigateToBooking(time)"
        >{{ time }}
        </v-card-text>
      </v-flex>
    </v-layout>
    <v-card-title primary-title>
      <h3 class="headline mb-0 text-pop title-name font-weight-medium">{{ movieTitle }}</h3>
    </v-card-title>
  </div>
</template>

<script>

export default {
  props: {
    movieTitle: {
      type: String,
      required: true
    },
    movieId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      selectedDate: new Date().toISOString().substr(0, 10)
    };
  },
  computed: {
    getShowtimes() {
      return this.$store.getters.getShowtimes(this.movieId, this.selectedDate);
    }
  },
  methods: {
    isTimeslotValid(param) {
      const parsedParam = param.split(":");
      const currentTime = new Date();
      const slotTime = new Date();
      slotTime.setHours(parsedParam[0], parsedParam[1], 0);
      return slotTime > currentTime;
    },
    navigateToBooking(timeslotParam) {
      if (this.isTimeslotValid(timeslotParam)) {
        this.$router.push({
          name: "book",
          query: {id: this.movieId, t: timeslotParam}
        });
      }
    },
    navigateToDetails() {
      this.$router.push({
        name: "details",
        query: {movieId: this.movieId}
      })
    }
  }
};
</script>

<style scoped>
.details-container {
  position: absolute;
  height: 100%;
  width: 100%;
  color: #fff;
  top: 0;
}

.time-slot {
  color: rgb(125, 126, 141);
  filter: drop-shadow(0px 0px 1.5px rgba(20, 20, 20, 0.9));
}

.time-slot-active {
  color: #fb3635;
  filter: drop-shadow(3px 4px 3px #000);
  transition-duration: 300ms;
}

.time-slot-active:hover {
  cursor: pointer;
  color: #fff;
  filter: drop-shadow(-3px -2px 3px rgb(61, 70, 102));
}

.title-name {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
}

.text-pop {
  filter: drop-shadow(1px 1px 6px #000);
}
</style>