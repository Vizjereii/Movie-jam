<template>
  <v-app>
    <header-component></header-component>
    <v-content>
      <router-view></router-view>
    </v-content>
    <footer-component></footer-component>
  </v-app>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    FooterComponent,
    HeaderComponent
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetchActiveMoviesList"])
  },
  created() {
    this.fetchActiveMoviesList();
  }
};
</script>
