<template>
  <div>
    <v-card dark v-if="dialogData" class="dialog-card">
      <iframe v-if="isVideoProvided"
              class="video-frame"              
              :src="getVideoLink"
              allowfullscreen/>
      <div v-else>
        <v-img :src="getImageLink" max-height="80vh" contain alt=""/>
      </div>
      <img src="/img/modalCloseButton.png" @click="$emit('modalClose', true)" class="modal-close-button" alt="">
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
.dialog-card {
  padding: 1rem;
  overflow-y: hidden;
}

.video-frame {
  min-height: 80vh;
  min-width: 80vw;
  display: flex;
  margin: auto;
}

.modal-close-button {
  height: 40px;
  width: 40px;
  top: 8px;
  right: 8px;
  position: absolute;
  cursor: pointer;
}

.modal-close-button:hover {
  opacity: 0.6;
}
</style>