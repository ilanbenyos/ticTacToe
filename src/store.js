import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import socket from "./storeModules/socket";
import games from "./storeModules/games";
import game from "./storeModules/game";
import user from "./storeModules/user";

Vue.use(Vuex);
let db;

export default new Vuex.Store({
  modules: { user, socket, game, games },
  state: {
    isLoading: false,
    dbStatus: "init",
    wordsObj: {},
    words: ["marketing", "affiliate", "influencer"]
  },
  getters: {
    wordsObj: state => {
      return state.wordsObj;
    },
    words: state => {
      return state.words;
    },
    dbStatus: state => {
      return state.dbStatus;
    },
    isLoading: state => {
      return state.isLoading;
    }
  },
  mutations: {
    setLoading(state, bool) {
      state.isLoading = bool;
    },
    setDbStatus(state, status) {
      state.dbStatus = status;
    },
    insertWordsToStore(state, obj) {
      state.wordsObj = obj;
    }
  },
  actions: {
    async emptyStore({ commit }) {
      commit("insertWordsToStore", {});
      commit("setDbStatus", "inDb");
    },
    async initStore({ dispatch }) {
      let token = localStorage.getItem("jwtToken");
      if (token) {
        await dispatch("user/getMe");
        await dispatch("socket/initSocket", null, { root: true });
      }
    },
    async dropAllTables({ getters, dispatch, commit }) {
      db.transaction(async function(tx) {
        let multiP = getters.words.map(word => {
          return new Promise(res => {
            tx.executeSql(`DROP TABLE ${word}`, [], function() {
              res("ok");
            });
          });
        });
        await Promise.all(multiP);
        await dispatch("emptyStore");
        commit("setDbStatus", "empty");
      });
    },
    async showReport({ getters, dispatch, commit }) {
      db.transaction(async function(tx) {
        let multiP = getters.words.map(word => {
          return new Promise(
            res => {
              let arr = [];
              tx.executeSql(`SELECT * FROM ${word}`, [], function(tx, results) {
                let len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  arr.push(results.rows.item(i).word);
                }
                res(arr);
              });
            },
            err => {
              console.error(err);
            }
          );
        });
        let resP = await Promise.all(multiP);
        let wordsObj = {};
        resP.forEach((wordArr, idx) => {
          let wordName = getters.words[idx];
          wordsObj[wordName] = wordArr;
        });
        commit("insertWordsToStore", wordsObj);
        commit("setDbStatus", "inStore");
      });
    },

    async fetchAllFromApi({ dispatch, getters, commit }) {
      await dispatch("dropAllTables");
      let multiPromise = getters.words.map(word => {
        return dispatch("getWordFromApi", word);
      });
      await Promise.all(multiPromise);
      commit("setDbStatus", "inDb");
    },
    async getWordFromApi({ dispatch, commit }, wordToFetch) {
      let res = await axios.get(
        `http://api.datamuse.com/words?max=1000&ml=${wordToFetch}`
      );
      let wordsArr = res.data.map(i => i.word);
      db.transaction(function(tx) {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS ${wordToFetch} (id INTEGER PRIMARY KEY AUTOINCREMENT, word)`
        );
        wordsArr.forEach(item => {
          tx.executeSql(
            `INSERT INTO ${wordToFetch} ( word ) VALUES ("${item}")`
          );
        });
      });
    }
  }
});
