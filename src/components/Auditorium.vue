<template>
  <div class="auditorium">
    <div class="screen">Screen</div>
    <v-layout align-center justify-center row wrap pa-2 mb-2>
      <v-flex xs4 class="seat-container">
        <div v-for="(cX, iX) in seats.sideBlock.seatX" :key="cX">
          <span v-for="(cY, iY) in seats.sideBlock.seatY" :key="cY" class="seat">{{iY}}, {{iX}}</span>
        </div>
      </v-flex>
      <v-flex xs4 class="seat-container">
        <div v-for="(cX, iX) in seats.centralBlock.seatX" :key="cX">
          <span v-for="(cY, iY) in seats.centralBlock.seatY" :key="cY" class="seat">{{iY}}, {{iX}}</span>
        </div>
      </v-flex>
      <v-flex xs4 class="seat-container">
        <div v-for="(cX, iX) in seats.sideBlock.seatX" :key="cX">
          <span v-for="(cY, iY) in seats.sideBlock.seatY" :key="cY" class="seat">{{iY}}, {{iX}}</span>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seats: {
        centralBlock: { seatX: 10, seatY: 9 },
        sideBlock: { seatX: 4, seatY: 9 }
      }
    };
  },
  methods: {}
};
</script>

<style scoped>
.auditorium {
  width: 100%;
  height: 85%;
}

.screen {
  height: 60px;
}

.seat-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.seat {
  width: 28px;
  height: 38px;
  display: flex;
  border-radius: 7px;
  background: linear-gradient(
    0deg,
    #c5c5c5,
    #c5c5c5,
    #c5c5c5,
    #c5c5c5,
    #c5c5c5,
    #eee,
    #fff
  );
  margin: -30px 4px 12px 2px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease-in-out;
}
.seat:hover {
  transform: translateY(-7px);
  background: linear-gradient(0deg, #ffce26, #ffce26, #ffce26, #ff0);
  border-radius: 6px;
}
</style>