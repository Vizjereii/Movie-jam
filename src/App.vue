<template>
  <v-app>
    <header-component></header-component>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
