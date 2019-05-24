import axios from "axios";
import { baseApi } from "../../config";
export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    isLogged: state => {
      return !!state.user;
    },
    getMe: state => {
      return state.user;
    },
    userId: state => {
      if (state.user) return state.user._id;
      return null;
    }
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem("jwtToken", token);
    },
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    }
  },
  actions: {
    async initModule({ dispatch }) {
      let token = localStorage.getItem("jwtToken");
      if (token) {
        dispatch("getMe", token);
        await dispatch("socket/initSocket", null, { root: true });
      }
    },
    async getMe({ commit }) {
      let { user } = await axios.post(`${baseApi}/users/getMe`);
      commit("setUser", user);
    },
    async register({ dispatch }, userData) {
      let res = await axios.post(`${baseApi}/users/register`, userData);
      dispatch("userFetched", res);
    },
    async login({ dispatch }, userData) {
      let res = await axios.post(`${baseApi}/users/login`, userData);
      dispatch("userFetched", res);
    },
    async logout({ dispatch }) {
      let res = await axios.post(`${baseApi}/users/logout`);
      dispatch("logout", res);
      localStorage.removeItem("jwtToken");
      await dispatch("socket/closeSocket", null, { root: true });
    },
    async userFetched({ commit, dispatch }, { user, token }) {
      commit("setUser", user);
      commit("setToken", token);
      await dispatch("socket/initSocket", null, { root: true });
    },
    async logout({ commit }) {
      commit("setUser", null);
      commit("setToken", null);
    }
  }
};
