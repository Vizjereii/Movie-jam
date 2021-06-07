<template>
  <div>
    <v-card-title>{{ movieData.title }}</v-card-title>
    <v-card-title class="pt-0 mb-0 mt-0 font-italic" v-if="movieData.tagline">"{{ movieData.tagline }}"</v-card-title>
    <v-divider dark></v-divider>
    <v-card-text class="text-xs-justify">{{ movieData.overview }}</v-card-text>
    <v-divider dark></v-divider>
    <v-flex class="d-flex justify-space-between mx-4 mt-3">
      <p class="text-xs-left" v-if="isOnDetailsPage">Release date: {{ movieData.release_date }}</p>
      <p class="text-xs-right">Runtime: {{ getRuntimeFormatted }}</p>      
    </v-flex>
    <template v-if="isOnDetailsPage">
      <v-flex class="d-flex justify-space-between mx-4">
        <p class="text-xs-left">Country: {{ getCountryList }}</p>
        <p class="text-xs-right">{{ getGenresList }}</p>        
      </v-flex>      
      <p class="text-xs-justify row text-truncate mx-4">{{getCompanyList}}</p>
      <v-divider dark></v-divider>
      <MovieDetailsMediaComponent :video-data="movieData.videos" :image-data="movieData.images"></MovieDetailsMediaComponent>
    </template>
  </div>
</template>

<script>
import MovieDetailsMediaComponent from "@/components/MovieDetailsPage/MovieDetailsMediaComponent";

export default {
  components: { MovieDetailsMediaComponent },
  props: {
    movieData: {
      type: Object,
      required: true
    }
  },
  computed: {
    isOnDetailsPage() {      
      return this.$route.name === "details";
    },
    getRuntimeFormatted() {
      const totalMinutes = this.movieData.runtime;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes - hours * 60;
      return `${hours}h ${minutes}m`;
    },
    getCountryList() {
      return this.shapeListDataToString(this.movieData.production_countries, 'iso_3166_1');
    },
    getGenresList() {
      return this.shapeListDataToString(this.movieData.genres, 'name');
    },
    getCompanyList() {
      return this.shapeListDataToString(this.movieData.production_companies, 'name');      
    }
  },
  methods: {
    shapeListDataToString(dataArray, propertyName) {      
      return dataArray.reduce((acc, cur) => {
        if (!acc) return cur[propertyName];
        return acc + ', ' + cur[propertyName];
      }, "");
    }
  }
}
</script>

<style scoped>

</style>