import io from "socket.io-client";
let $socket = null;

export default {
  namespaced: true,
  modules: {},
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async initSocket({ commit, dispatch, rootGetters }) {
      let userId = rootGetters["user/userId"];
      let token = localStorage.getItem("jwtToken");
      $socket = io.connect(
        `http://localhost:3001?token=${token}&userId=${userId}`
      );
      $socket.on("connect", async () => {
        console.log("$socket.on.connect => 7777777777777777777777777");
      });
      $socket.on("JOIN_REQUEST", async (game, user) => {
        await dispatch(
          "game/joinRequestEntered",
          { game, user },
          { root: true }
        );
      });
      $socket.on("GAME_STARTED", async ({game}) => {
        await dispatch("game/gameStarted", {game}, { root: true });
      });
      $socket.on("GAME_MOVE", async ({game}) => {
        await dispatch("game/gameMove", {game}, { root: true });
      });
      $socket.on("JOIN_REQUEST_REJECTED", async game => {
        vue.$notify("JOIN_REQUEST_REJECTED");
        await dispatch("games/fetchGames", game, { root: true });
      });
    }
  }
};
