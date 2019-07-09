<template>
  <div class="details-container">
    <v-card-title primary-title>
      <h3 class="headline mb-0">{{showtimesTitle}}</h3>
    </v-card-title>
    <v-btn @click="test()">push</v-btn>
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
</style>