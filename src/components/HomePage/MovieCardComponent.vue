<template>
  <v-card
    ref="movieCard"
    @mouseover="showDetails = true"
    @mouseleave="showDetails = false"
    :color="'black'"
    class="even-height"
  >
    <v-img :src="imgPath" :height="'100%'" :width="'100%'" data-test-id="movieImage" :class="{'hover-blur': showDetails}"></v-img>
    <showtime-details
      v-if="showDetails"
      :movieTitle="cardData.original_title"
      :movieId="cardData.id"
    ></showtime-details>
  </v-card>
</template>

<script>
import ShowtimeDetails from "@/components/HomePage/ShowtimeDetailsComponent.vue";
import {movieDbApiImageBaseUrl} from "@/apiConstants";

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
      return movieDbApiImageBaseUrl + this.cardData.poster_path;
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
  opacity: 0.6;
  transform: scale(0.95);
  transition-duration: 300ms;
  cursor: default;
}
</style>