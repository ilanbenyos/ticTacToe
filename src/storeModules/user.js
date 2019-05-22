import axios from "axios";
import { baseApi } from "../../config";
export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    user: state => {
      return state.user;
    },
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem("jwtToken", token);
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async submit({ commit }, userName) {
      let res = await axios.post(`${baseApi}/user/submit`, userName);
      commit("setUser", res.user);
      commit("setToken", res.token);
    },
    async logout({ commit }) {
      commit("setUser", null);
      commit("setToken", null);
    }
  }
};
