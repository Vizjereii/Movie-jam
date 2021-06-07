<template>
  <div>
    <v-card v-if="dialogData">
      <iframe v-if="isVideoProvided"
              height="540" width="480"
              :src="getVideoLink"
              allowfullscreen/>
      <div v-else>
        <img :src="getImageLink">
      </div>
<!--      <div>-->
<!--        {{ dialogData }}-->
<!--      </div>-->
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
  },
  computed: {
    isVideoProvided() {
      return !!(this.dialogData && this.dialogData.isVideo);      
    },
    getVideoLink() {
      return this.dialogData.videoLink;
    },
    getImageLink() {
      return this.dialogData.ImageHighQuality;
    }
  }
}
</script>

<style scoped>

</style>