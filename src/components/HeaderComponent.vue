<template>
  <v-toolbar dark class="toolbar-width ma-0">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-items>
      <v-btn flat class="title-button" @click="navigateToHome">Movie Jam</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateToHome() {
      this.$router.push({
        name: "home"
      });
    }
  }
};
</script>

<style scoped>
.title-button {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-transform: none;
  text-overflow: ellipsis;
}
</style>