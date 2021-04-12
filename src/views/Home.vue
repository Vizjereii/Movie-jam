<template>
  <v-container class="container-width even-height px-0 py-2" grid-list-xl text-xs-center>
    <v-layout row justify-start class="even-height scrolling-wrapper" ref="cont">
      <v-flex
        xs4
        v-for="item in activeMoviesList"
        :key="item.id"
        class="even-height width-pacing px-0"
      >
        <transition appear>
          <movie-card-component :cardData="item"></movie-card-component>
        </transition>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import MovieCardComponent from "@/components/MovieCardComponent.vue";

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
  components: {
    MovieCardComponent
  },
  mounted() {
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
  background-color: black;
  font-family: "Roboto", sans-serif;
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

::-webkit-scrollbar {
  height: 0px;
}

.v-enter {
  opacity: 0;
  transform: translateY(20px);
}

.v-enter-to {
  opacity: 1;
  transition: all 0.8s ease;
}
</style>
