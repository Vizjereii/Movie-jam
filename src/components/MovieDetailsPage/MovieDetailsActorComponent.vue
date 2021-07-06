<template>
  <v-card dark class="my-1 pa-2 d-flex">
    <div class="img-container">
      <v-img :src="profileImagePath" contain data-test-id="actorImage"></v-img>
    </div>
    <v-card-text class="pb-0 px-2 pt-0 actor-card-inner">
      <div>
        <div class="font-weight-bold">{{ actorData.name }}</div>
        <div>
          <span class="grey--text">Character: </span>
          <span>{{ actorData.character }}</span>
        </div>
      </div>
      <v-btn
          data-test-id="actorProfileLinkButton"
          class="pb-0 mb-0 actor-card-button"
          text
          block
          :href='profileTMDBLink'
          target="_blank">View on TMDB
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import {movieDbApiImageHumanProfileUrl, movieDbPersonPageUrl} from "@/apiConstants"

export default {
  props: {
    actorData: {
      type: Object,
      required: true
    }
  },
  computed: {
    profileImagePath() {
      if (this.actorData.profile_path) {
        return movieDbApiImageHumanProfileUrl + this.actorData.profile_path;
      }
      return "/img/avatar-anonymous.svg";
    },
    profileTMDBLink() {
      return movieDbPersonPageUrl + this.actorData.id;
    }
  }
}
</script>

<style scoped>
.actor-card-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}

.actor-card-button {
  max-height: 2em;
  min-height: 2em;
}

.img-container {
  min-width: 60px;
  align-self: center;
}
</style>