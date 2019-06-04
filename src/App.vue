<template>
  <v-app>
    <header-component></header-component>
    <v-btn @click="testApi">Test Api</v-btn>
  </v-app>
</template>

<script>
import axios from "axios";

import HeaderComponent from "./components/HeaderComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent
  },
  data() {
    return {
      //
    };
  },
  methods: {
    testApi() {
      axios
        .get(".netlify/functions/movieFetch")
        .then(response => {
          console.log(response);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
