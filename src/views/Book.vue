<template>
  <div>
    <span>{{movieId}}</span>
    <br />
    <span>{{timeslot}}</span>
  </div>
</template>

<script>
export default {
  props: {
    movieId: {
      type: Number,
      required: true
    },
    timeslot: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
</style>