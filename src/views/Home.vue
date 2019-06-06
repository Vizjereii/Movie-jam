<template>
  <v-container class="container-width even-height px-0" grid-list-xl text-xs-center>
    <v-layout row justify-start class="even-height scrolling-wrapper">
      <v-flex xs4 v-for="item in activeMoviesList" :key="item.id" class="even-height width-pacing card">
        <v-card class="even-height card">
          <v-card-title primary-title>
            <h3 class="headline mb-0">{{item.original_title}}</h3>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-btn @click="fetchActiveMoviesList"></v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "home",
  data() {
    return {
      width: "25%"
    };
  },
  computed: {
    ...mapState(["activeMoviesList"])
  },
  methods: {
    ...mapActions(["fetchActiveMoviesList"])
  },
  components: {},
  created() {
    //this.fetchActiveMoviesList();
  }
};
</script>

<style scoped>
.container-width {
  max-width: 100%;
}

.even-height {
  height: 100%;
}

.width-pacing {
  min-width: 20%;
}

.scrolling-wrapper {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.card {
  flex: 0 0 auto;
}
</style>
