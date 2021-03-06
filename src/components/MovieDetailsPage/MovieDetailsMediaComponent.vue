﻿<template>
  <div>
    <v-tabs v-model="activeTab" fixed-tabs grow dark>
      <v-tab>Videos</v-tab>
      <v-tab>Images</v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeTab">
      <v-tab-item class="pa-2">        
        <v-carousel
            :cycle="false"
            height="420"
            :hide-delimiters="shouldHideVideoCarouselControls"
            :hide-controls="shouldHideVideoCarouselControls">
          <v-carousel-item
              v-for="(video,index) in getYouTubeVideoList"
              :key="index"
              :src="video.videoThumbnail"
          >
            <img src="/img/youtubeButton.svg" @click.stop="sendDataToMediaDialog(video)" class="dialog-open-button" alt=""/>
          </v-carousel-item>          
        </v-carousel>
      </v-tab-item>
      <v-tab-item class="pa-2">
        <v-progress-linear 
            class="pa-0 ma-0" 
            dark 
            :value="calculateImageProgressBarValue(activeImagePreviewIndex)"
        ></v-progress-linear>
        <v-carousel
            :cycle="false"
            height="420"
            hide-delimiters
            v-model="activeImagePreviewIndex"
        >
          <v-carousel-item
              v-for="(image, index) in getImageLinksList"
              :key="index"
              :src="image.ImagePreview"
              :transition="false"
              :reverse-transition="false"
          >
            <img src="/img/zoomInIcon.svg" @click.stop="sendDataToMediaDialog(image)" class="dialog-open-button" alt=""/>
          </v-carousel-item>
        </v-carousel>
      </v-tab-item>
    </v-tabs-items>
    <v-dialog v-model="showMediaDialog" v-if="showMediaDialog">
      <MovieDetailsMediaDialogComponent :dialog-data="mediaDialogPayload" @modalClose="showMediaDialog=false"></MovieDetailsMediaDialogComponent>
    </v-dialog>
  </div>
</template>

<script>
import {getYouTubeEmbedUrl, getYouTubeThumbnailUrl, movieDbApiImageBaseUrl, movieDbApiImageHqUrl} from "@/apiConstants"
import MovieDetailsMediaDialogComponent from "@/components/MovieDetailsPage/MovieDetailsMediaDialogComponent";

export default {
  components: {MovieDetailsMediaDialogComponent},
  props: {
    videoData: {
      type: Object,
      required: true
    },
    imageData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeTab: null,
      activeImagePreviewIndex: null,
      showMediaDialog: false,
      mediaDialogPayload: null
    };
  },
  computed: {
    getYouTubeVideoList() {
      return this.videoData.results.map(cur => {
        if (cur.site === "YouTube") {
          return {
            isVideo: true,
            videoLink: getYouTubeEmbedUrl(cur.key),
            videoThumbnail: getYouTubeThumbnailUrl(cur.key),
            videoName: cur.name
          }
        }
      });
    },
    shouldHideVideoCarouselControls() {
      return this.getYouTubeVideoList.length <= 1;
    },
    getImageLinksList() {
      const fullImageList = this.imageData.backdrops.concat(this.imageData.posters);
      return fullImageList.map(cur => {
        return {
          isVideo: false,
          ImagePreview: movieDbApiImageBaseUrl + cur.file_path,
          ImageHighQuality: movieDbApiImageHqUrl + cur.file_path
        }
      });
    }
  },
  methods: {
    calculateImageProgressBarValue(currentIndex) {
      const maxValue = this.getImageLinksList.length - 1;
      const increment = 100 / maxValue;
      return currentIndex * increment;
    },
    sendDataToMediaDialog(mediaObject) {
      this.mediaDialogPayload = mediaObject;
      this.showMediaDialog = true;
    }
  }
}
</script>

<style scoped>
>>>.v-responsive__content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-open-button {
  position: absolute;
  height: 9vh;
  z-index: 10;
  opacity: 0.8;
}

.dialog-open-button:hover {
  opacity: 1;
}
</style>