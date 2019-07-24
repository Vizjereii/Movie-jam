import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import seedRandom from "seedrandom";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movieFetchInProgress: false,
    movieFetchFinished: false,
    movieFetchError: false,
    activeMoviesList: [],
    showtimesList: [
      "10:15",
      "10:55",
      "11:35",
      "12:15",
      "12:50",
      "13:30",
      "14:10",
      "14:50",
      "15:25",
      "16:05",
      "16:45",
      "17:25",
      "18:00",
      "18:20",
      "18:40",
      "19:20",
      "20:00",
      "20:35",
      "21:15",
      "21:55",
      "22:35",
      "23:10",
      "23:50"
    ],
    chairSvg:
      "M2263.8,4029.5c-149-54.9-321.4-211.7-412.9-378.9l-78.4-141.1l-7.8-723.9l-7.8-726.5h-541c-473,0-554-7.8-648.1-49.6c-154.2-70.6-316.2-224.8-397.2-378.9L100,1497.2V-488.9c0-1975.7,0-1986.1,54.9-2106.3c31.4-68,107.1-172.5,167.3-232.6c154.2-154.2,308.4-216.9,569.7-230l214.3-13.1v-389.4v-389.4l216.9,7.8l214.3,7.8l7.8,384.2l7.9,386.8h3447h3447l7.8-384.2l7.8-386.8l216.9-7.8l214.3-7.8v389.4v389.4l216.9,13.1c135.9,7.8,256.1,31.4,331.9,65.3c149,65.3,318.8,235.2,397.2,394.6l60.1,122.8v1986.1v1986.1l-70.6,133.3c-81,154.2-243,308.4-397.2,378.9c-94.1,41.8-175.1,49.6-648.1,49.6h-541l-7.8,713.4l-7.8,710.8l-73.2,149c-41.8,83.6-125.4,196-190.8,253.5c-224.8,196-52.3,185.5-2974,182.9C2749.9,4068.7,2357.9,4060.9,2263.8,4029.5z M7665.6,3587.9c52.3-26.1,83.6-70.6,101.9-138.5c15.7-60.1,26.1-784,26.1-1905.1l2.6-1811H5000H2206.3v1829.3c0,1220.4,7.8,1855.5,28.8,1907.7c54.9,162-83.6,154.2,2759.7,156.8C7257.9,3627.1,7600.3,3621.8,7665.6,3587.9z M1759.5,674v-940.8h-88.9c-211.7,0-316.2-250.9-159.4-384.2l67.9-60.1H5000h3420.9l70.5,62.7c156.8,133.3,52.3,381.5-162,381.5h-88.9V674v940.8H8771c593.2,0,624.6-7.8,671.6-177.7c15.7-62.7,26.1-755.3,26.1-1952.2c0-1714.3-2.6-1863.3-47-1946.9c-23.5-49.7-73.2-104.5-109.8-122.8c-52.3-26.1-956.5-31.4-4343.4-26.1L688-2605.7l-70.6,73.2l-73.2,70.6l-7.8,1889.4c-5.2,1037.5,0,1926,7.8,1975.7c10.4,47,44.4,115,78.4,149c62.7,62.7,67.9,62.7,601.1,62.7h535.7V674z"
  },
  mutations: {
    fetchMovieListStart(state) {
      state.movieFetchInProgress = true;
    },
    fetchMovieListSuccess(state, payload) {
      state.activeMoviesList = payload;
      state.movieFetchInProgress = false;
      state.movieFetchFinished = true;
    },
    fetchMovieListError(state) {
      console.log("something went wrong while fetching movie list from API");
      state.movieFetchError = true;
    }
  },
  getters: {
    getShowtimes: state => seed => {
      const rng = new seedRandom(seed);
      return state.showtimesList.filter(() => {
        if (Math.round(rng()) === 1) return true;
      });
    },
    getMovieById: state => param => {
      return state.activeMoviesList.find(e => e.id === param);
    }
  },
  actions: {
    fetchActiveMoviesList({ commit }) {
      commit("fetchMovieListStart");
      axios
        .get(".netlify/functions/movieFetch")
        .then(response => {
          commit("fetchMovieListSuccess", response.data);
        })
        .catch(err => commit("fetchMovieListError", err));
    }
  }
});
