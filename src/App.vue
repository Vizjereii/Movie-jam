<template>
  <v-app>
    <v-btn @click="testApi">Test Api</v-btn>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  components: {},
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
