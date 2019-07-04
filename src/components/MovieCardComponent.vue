<template>
  <v-card :color="'black'" class="even-height">
    <v-img :src="imgPath" :height="'100%'" :width="'100%'" class="hover-blur">
      <v-card-title primary-title>
        <h3 class="headline mb-0">{{cardData.original_title}}</h3>
      </v-card-title>
    </v-img>
  </v-card>
</template>

<script>
export default {
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
  }
};
</script>

<style scoped>
.even-height {
  height: 100%;
}

:hover.hover-blur {
  filter: blur(20px);
}
</style>