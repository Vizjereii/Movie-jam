import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import seedRandom from "seedrandom";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    ]
  },
  mutations: {
    populateActiveMoviesList(state, payload) {
      state.activeMoviesList = payload;
    }
  },
  getters: {
    getShowtimes: state => seed => {
      const rng = new seedRandom(seed);
      return state.showtimesList.filter(() => {
        if (Math.round(rng()) === 1) return true;
      });
    }
  },
  actions: {
    fetchActiveMoviesList({ commit }) {
      axios
        .get(".netlify/functions/movieFetch")
        .then(response => {
          commit("populateActiveMoviesList", response.data);
        })
        .catch(err => console.log(err));
    }
  }
});
