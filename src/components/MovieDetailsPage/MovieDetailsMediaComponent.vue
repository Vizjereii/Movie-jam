<template>
  <div>
    <v-tabs v-model="activeTab" fixed-tabs grow dark>
      <v-tab>Videos</v-tab>
      <v-tab>Images</v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeTab">
      <v-tab-item class="pa-2">
        <v-carousel
            :cycle="false"
            :hide-delimiters="shouldHideVideoCarouselControls"
            :hide-controls="shouldHideVideoCarouselControls">
          <v-carousel-item
              v-for="(video,index) in getYouTubeVideoList"
              :key="index"
              :src="video.thumbnail"
          ></v-carousel-item>
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
            hide-delimiters
            v-model="activeImagePreviewIndex"
        >
          <v-carousel-item
              v-for="(image, index) in getImageLinksList"
              :key="index"
              :src="image.preview"
              :transition="false"
              :reverse-transition="false"
          ></v-carousel-item>
        </v-carousel>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import {getYouTubeEmbedUrl, getYouTubeThumbnailUrl, movieDbApiImageBaseUrl, movieDbApiImageHqUrl} from "@/apiConstants"

export default {
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
      activeImagePreviewIndex: null
    };
  },
  computed: {
    getYouTubeVideoList() {
      return this.videoData.results.map(cur => {
        if (cur.site === "YouTube") {
          return {
            link: getYouTubeEmbedUrl(cur.key),
            thumbnail: getYouTubeThumbnailUrl(cur.key),
            name: cur.name
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
          preview: movieDbApiImageBaseUrl + cur.file_path,
          highQuality: movieDbApiImageHqUrl + cur.file_path
        }
      });
    }
  },
  methods: {
    calculateImageProgressBarValue(currentIndex) {
      const maxValue = this.getImageLinksList.length - 1;
      const increment = 100 / maxValue;
      return currentIndex * increment;
    }
  }
}
</script>

<style scoped>

</style>