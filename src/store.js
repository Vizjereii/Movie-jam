import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeMoviesList: []
  },
  mutations: {
    populateActiveMoviesList(state, payload) {
      state.activeMoviesList = payload;
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
