import axios from "axios"
const baseApi = 'http://localhost:3333'
export default {
    namespaced: true,
  state: {
      report:null,
      wordsObj:null,
  },
    getters:{
        wordsObj: state => {
            return state.wordsObj
        },
        report: state => {
            return state.report
        },

    },
  mutations: {
      setWordsObj(state,wordsObj) {
          state.wordsObj = wordsObj
      },
      setTweetReport(state,report) {
          state.report = report
      },

  },
  actions: {
      async deleteLocal({commit}){
          commit('setWordsObj',null)
          commit('setTweetReport',null)
      },
      async testConnection(){
          let res =  await axios.get(`${baseApi}/testConnection`);
          return res.data
      },
      async deleteAll({dispatch}){
          await axios.get(`${baseApi}/deleteAll`);
          await dispatch('deleteLocal')
      },
      async tweetReport({dispatch,commit}){
          let res = await axios.get(`${baseApi}/tweet-report`);
          commit('setTweetReport',res.data)
      },
      async fetchWordsFromApi({dispatch,commit}){
          return await axios.get(`${baseApi}/fetch-words`);
      },
      async fetchWordsFromMongo({dispatch,commit}){
          let res = await axios.get(`${baseApi}/fetchWordsFromMongo`);
          commit('setWordsObj',res.data)
      },
  }
}
