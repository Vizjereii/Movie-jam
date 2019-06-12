<template>
  <v-container class="container-width even-height px-0" grid-list-xl text-xs-center>
    <v-layout row justify-start class="even-height scrolling-wrapper" ref="cont">
      <v-flex xs4 v-for="item in activeMoviesList" :key="item.id" class="even-height width-pacing">
        <v-card class="even-height">
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
    ...mapActions(["fetchActiveMoviesList"]),
    handleScroll(event) {
      const startTime = window.performance.now();
      const duration = 300;
      const vm = this;

      function scroll(timestamp) {
        const timeElapsed = timestamp - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        vm.$refs.cont.scrollLeft += event.deltaY * progress * 0.1;

        if (timeElapsed < duration) {
          window.requestAnimationFrame(scroll);
        } else {
          return;
        }
      }

      window.requestAnimationFrame(scroll);
    }
  },
  components: {},
  mounted() {
    //this.fetchActiveMoviesList();
    window.addEventListener("wheel", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("wheel", this.handleScroll);
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
  min-width: 23%;
}

.scrolling-wrapper {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
