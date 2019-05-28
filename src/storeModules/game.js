import axios from "axios";
import { ROOT_API } from "../../config";
export default {
  namespaced: true,
  state: {
    game: null
  },
  getters: {
    isMyTurn: (state, getters, rootState, rootGetters) => {
      if (!getters.lastMove) return false;
      if (!rootGetters["user/getMe"]) return false;

      let myId = rootGetters["user/getMe"]._id;
      return !getters.lastMove.user === myId;
    },
    getGame: state => {
      return state.game;
    },
    board: state => {
      if (!state.game) return null;
      return state.game.board;
    },
    moves: state => {
      if (!state.game) return null;
      return state.game.moves;
    },
    lastMove: state => {
      if (!state.game) return null;
      if (!state.game.moves) return null;
      return state.game.moves[state.game.moves.length - 1];
    }
  },
  mutations: {
    setGame(state, game) {
      state.game = game;
    }
  },
  actions: {
    async deleteGame({ dispatch }, gameId) {
      await axios.post(`${ROOT_API}/games/deleteGame`, { gameId });
      await dispatch("games/fetchGames", null, { root: true });
    },
    async initGame({ dispatch }) {
      let { game } = await axios.post(`${ROOT_API}/games/initGame`);
      await dispatch("games/fetchGames", null, { root: true });
    },
    async joinRequest({ commit, dispatch }, gameId) {
      let { game } = await axios.post(`${ROOT_API}/games/joinRequest`, {
        gameId
      });
      await dispatch("games/fetchGames", null, { root: true });
    },
    async joinRequestEntered({ commit, dispatch }, { game, user }) {
      vue
        .$swal({
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Accept",
          confirmButtonColor: "#3085d6",
          cancelButtonText: "Reject",
          cancelButtonColor: "red",
          title: `${user.userName} sking to join your game `,
          text: "Do Yuo agree?"
        })
        .then(async res => {
          let obj = { memberId: user._id, gameId: game._id };
          if (res.dismiss === "cancel") {
            await dispatch("rejectJoinRequest", obj);
          } else {
            await dispatch("startGame", obj);
          }
        });

      await dispatch("games/fetchGames", game, { root: true });
    },
    async rejectJoinRequest({ commit, dispatch }, { memberId, gameId }) {
      await axios.post(`${ROOT_API}/games/rejectJoinRequest`, {
        memberId,
        gameId
      });
      await dispatch("games/fetchGames", null, { root: true });
    },
    async startGame({ commit, dispatch }, { memberId, gameId }) {
      await axios.post(`${ROOT_API}/games/startGame`, {
        memberId,
        gameId
      });
      await dispatch("games/fetchGames", null, { root: true });
    },
    async gameStarted({ commit }, game) {
      window.vue.$router.push({ name: "game", params: { gameId: game._id } });
    },
    async gameMove({ commit }, { game }) {
      commit("setGame", game);
    },
    async getGame({ commit }, gameId) {
      let { game } = await axios.post(`${ROOT_API}/games/getGame`, { gameId });
      commit("setGame", game);
    },
    async clicked(_, { gameId, square }) {
      await axios.post(`${ROOT_API}/games/gameMove`, { gameId, square });
    }
  }
};
