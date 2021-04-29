<template>
  <div>
    <v-card>
      <v-card-title>This is a modal</v-card-title>
      <div>
        {{dialogData}}
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "MovieDetailsMediaDialogComponent",
  props: {
    dialogData: {
      type: Object
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>