<template>
  <div>
    <v-card-title>{{ movieData.title }}</v-card-title>
    <v-card-title class="pt-0 mb-0 mt-0 font-italic" v-if="movieData.tagline">"{{ movieData.tagline }}"</v-card-title>
    <v-divider dark></v-divider>
    <v-card-text class="text-xs-justify">{{ movieData.overview }}</v-card-text>
    <v-flex class="d-flex justify-space-between mx-5">
      <p class="text-xs-left" v-if="isOnDetailsPage">Release date: {{ movieData.release_date }}</p>
      <p class="text-xs-right">Runtime: {{ getRuntimeFormatted }}</p>      
    </v-flex>
    <template v-if="isOnDetailsPage">
      <div>Genres: {{ movieData.genres }}</div>
      <div>Country: {{ getCountryList }}</div>
      <div>production companies:
        <div v-for="company in movieData.production_companies"
             :key="company.id">
          {{ company.name }}
        </div>
      </div>            
      <div>Videos: {{ movieData.videos }}</div>
      <div>Images: {{ movieData.images }}</div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MovieDetailsOverviewComponent',
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
      return `${hours}h ${minutes}m`
    },
    getCountryList() {
      const countryList = this.movieData.production_countries;
      console.log(countryList)
      return countryList.reduce((acc, cur) => {
        return acc + ', ' + cur.iso_3166_1;
      }, countryList[0].iso_3166_1);
    }
  }
}
</script>
