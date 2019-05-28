import axios from "axios";
import { ROOT_API } from "../../config";
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
        await dispatch("getMe");
        console.log("socket/initSocket ppppppppppppppppppppppppppppppp");
      }
    },
    async testConnection() {
      await axios.post(`${ROOT_API}/users/testConnection`, {
        msg: "test success!!"
      });
      // await axios.post(`${ROOT_API}/games/testV`, {msg: 'test success!!'});
    },
    async getMe({ commit }) {
      let { user } = await axios.post(`${ROOT_API}/users/getMe`);
      commit("setUser", user);
    },
    async register({ dispatch }, userData) {
      let res = await axios.post(`${ROOT_API}/users/register`, userData);
      dispatch("userFetched", res);
    },
    async login({ dispatch }, userData) {
      let res = await axios.post(`${ROOT_API}/users/login`, userData);
      dispatch("userFetched", res);
    },
    async logout({ dispatch, commit }) {
      await axios.post(`${ROOT_API}/users/logout`);
      localStorage.removeItem("jwtToken");
      commit("setUser", null);

      await dispatch("socket/closeSocket", null, { root: true });
    },
    async userFetched({ commit, dispatch }, { user, token }) {
      commit("setUser", user);
      localStorage.setItem("jwtToken", token);
      await dispatch("socket/initSocket", null, { root: true });
    }
  }
};
