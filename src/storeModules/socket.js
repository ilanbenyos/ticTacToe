import io from "socket.io-client";
import { baseApi } from "../../config";

let $socket = null;

export default {
  namespaced: true,
  modules: { },
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async initModule({ dispatch }) {
      await dispatch("initSocket");
    },

    async initSocket({ commit, dispatch, rootGetters }) {
      // if(!rootGetters['user/isLogged']) return;
      let userId = rootGetters["user/getMe"];
      userId = userId._id;
      let token = localStorage.getItem("jwtToken");
      $socket = io.connect(
        `http://localhost:3000?token=${token}&userId=${userId}`
      );
      $socket.on("connect", async () => {
        console.log("$socket.on.connect => 7777777777777777777777777");
        await dispatch("chat/messages/getAllNewMsgs", null, { root: true });
      });
      $socket.on("newMsg", ({ msgData, user }) => {
        dispatch("chat/messages/newMsg", { msgData, user }, { root: true });
      });
      $socket.on("newSystemMsg", data => {
        if (data.actionType === "activeGameStarted") {
          dispatch("activeGames/activeGameStarted", data.activeGameCard, {
            root: true
          });
        }
      });
    }
  }
};
