<template>
  <v-card dark class="my-1">
    <v-flex class="pa-1 d-flex">
      <v-img :src="profileImagePath" :width="100" contain></v-img>
      <v-card-text class="pa-1">
        <div class="d-flex">
          <div class="font-weight-bold">{{actorData.name}}</div>
          <span class="grey--text">Character: </span>
          <span>{{actorData.character}}</span>
        </div>
        <v-divider></v-divider>
        <v-btn text block>View profile on TMDB</v-btn>
      </v-card-text>
    </v-flex>
<!--    <slot></slot>-->
  </v-card>  
</template>

<script>
import {movieDbApiImageHumanProfileUrl} from "@/apiConstants"

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
    }
  }
}
</script>

<style scoped>

</style>