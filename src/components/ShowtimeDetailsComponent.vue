<template>
  <div class="details-container">
    <v-btn class="my-4" round>
      <v-icon medium>info</v-icon>Movie Details
    </v-btn>
    <v-layout align-center justify-center row wrap pa-3 mb-2>
      <v-flex v-for="time in getShowtimes" :key="time" xs3>
        <v-card dark color="#81C784">
          <v-card-text class="px-0 py-2">{{time}}</v-card-text>
        </v-card>
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

.title-name {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>