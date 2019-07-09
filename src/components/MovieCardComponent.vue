<template>
  <v-card
    @mouseover="showDetails = true"
    @mouseleave="showDetails = false"
    :color="'black'"
    class="even-height"
  >
    <v-img :src="imgPath" :height="'100%'" :width="'100%'" :class="{'hover-blur': showDetails}"></v-img>
    <showtime-details
      v-if="showDetails"
      :showtimesTitle="cardData.original_title"
      :showtimesId="cardData.id"
    ></showtime-details>
  </v-card>
</template>

<script>
import ShowtimeDetails from "../components/ShowtimeDetailsComponent.vue";

export default {
  data() {
    return {
      showDetails: false
    };
  },
  props: {
    cardData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgPath() {
      return "https://image.tmdb.org/t/p/w780" + this.cardData.poster_path;
    }
  },
  components: {
    ShowtimeDetails
  }
};
</script>

<style scoped>
.even-height {
  height: 100%;
}

.even-height:hover .hover-blur {
  filter: blur(20px);
  opacity: 0.7;
  transform: scale(0.95);
  transition-duration: 300ms;
}
</style>