<template>
  <div class="details-container">
    <v-btn class="my-4" round>
      <v-icon medium>info</v-icon>Movie Details
    </v-btn>
    <h4 class="headline pa-3">Showtimes</h4>
    <v-layout align-center justify-center row wrap pa-5 mb-2>
      <v-flex v-for="time in getShowtimes" :key="time" xs3>
        <v-card-text class="px-0 py-2 time-slot headline font-weight-medium">{{time}}</v-card-text>
      </v-flex>
    </v-layout>
    <v-card-title primary-title>
      <h3 class="headline mb-0 title-name">{{showtimesTitle}}</h3>
    </v-card-title>
    <v-btn @click="test()">test</v-btn>
  </div>
</template>

<script>
export default {
  props: {
    showtimesTitle: {
      type: String,
      required: true
    },
    showtimesId: {
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
      return this.$store.getters.getShowtimes(
        this.showtimesId + this.selectedDate
      );
    }
  },
  methods: {
    test() {
      console.log(this.getShowtimes);
      console.log(this.selectedDate);
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
  color: #fb3635;
  filter: drop-shadow(3px 4px 3px #000);
  transition-duration: 300ms;
}
.time-slot:hover {
  cursor: pointer;
  color: #fff;
  filter: drop-shadow(-3px -2px 3px rgb(61, 70, 102));
}

.title-name {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>