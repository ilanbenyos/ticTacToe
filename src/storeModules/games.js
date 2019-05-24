import axios from "axios";
import { baseApi } from "../../config";
export default {
  namespaced: true,
  state: {
    initialGames: null
  },
  getters: {
    initialGames: state => {
      return state.initialGames;
    }
  },
  mutations: {
    setInitialGames(state, games) {
      state.initialGames = games;
    }
  },
  actions: {
    async fetchGames({ commit }) {
      let { games } = await axios.post(`${baseApi}/games/fetchGames`);
      commit("setInitialGames", games);
    }
  }
};
