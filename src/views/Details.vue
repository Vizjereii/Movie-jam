<template>
  <v-layout>
    
  </v-layout>  
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {};
  },
  props: {
    movieId: {
      type: Number,
      required: true
    },
  },
  methods: {
    ...mapActions(["fetchMovieDetails"]),
  }
}
</script>

<style scoped>

</style>