<template>
  <div>
    <div>{{ movieData.title }}</div>
    <div>{{ movieData.tagline }}</div>
    <div>{{ movieData.overview }}</div>
    <div>Runtime: {{ movieData.runtime }}</div>
    <template v-if="isOnDetailsPage">
      <div>Genres: {{ movieData.genres }}</div>
      <div>production companies:
        <div v-for="company in movieData.production_companies"
             :key="company.id">
          {{ company.name }}
        </div>
      </div>
      <div>Release date: {{ movieData.release_date }}</div>      
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
      console.log(this.movieData);
      return this.$route.name === "details";
    }
  }
}
</script>
