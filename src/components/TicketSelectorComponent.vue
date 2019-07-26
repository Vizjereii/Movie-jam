<template>
  <div>
    <div>Seats selected:</div>
    <div v-for="(item,index) in seatsSelected" :key="index">{{item}}</div>
  </div>
</template>

<script>
export default {
  props: {
    seatsSelected: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
</style>