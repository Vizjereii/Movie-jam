<template>
  <div class="selector-container">
    <div>Seats selected:</div>
    <div v-for="(item,index) in seatsSelected" :key="index">{{item}}</div>
    <v-btn>Buy Now</v-btn>
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
.selector-container {
  background-color: rgb(38, 46, 56);
  padding: 2em;
  border-radius: 10px;
}
</style>