<template>
  <div class="even-height">
    <v-card-title primary-title>
      <h3 class="headline mb-0">{{showtimesTitle}}</h3>
    </v-card-title>
  </div>
</template>

<script>
export default {
  props: {
    showtimesTitle: {
      type: String,
      required: true
    },
    showtimesId: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
.even-height {
  position: absolute;
  height: 100%;
  width: 100%;
  color: #fff;
  top: 0
}
</style>