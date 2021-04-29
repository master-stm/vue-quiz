import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questionsStore:[],
    showResults: false,
    results: [],
    resultsScore: 0,
    fetchedLanguages: [],
    fetchedCategories:[],
    language: '',
    category: ''
  },
  mutations: {
    
    setResultsMutation(state, payload) {
      state.results[payload.index] = payload
    },
    loadLanguagesCategoriesMutation(state, payload) {
        state.fetchedLanguages = JSON.parse(JSON.stringify(payload.data)).languages,
        state.fetchedCategories = JSON.parse(JSON.stringify(payload.data)).categories
    },
    setQuestionsStoreMutation(state,payload) {
      state.questionsStore = payload
    }
  },
  actions: {
    setResultsAction({ commit }, payload) {
      commit('setResultsMutation', payload)
    },
    async loadLanguagesCategoriesAction({commit}) {
      let payload = await axios.get('http://localhost:3000/getLanguagesAndCategories')
       commit('loadLanguagesCategoriesMutation', payload)
    },
    setQuestionsStoreAction({commit}, payload) {
      commit('setQuestionsStoreMutation', payload)
    }
  },
  getters: {
    getResults(state) {
      return state.results
    },
    fetchedLanguages(state){
      return state.fetchedLanguages
    },
    fetchedCategories(state){
      return state.fetchedCategories
    },
    fetchedQuestions(state) {
      return state.questionsStore.sort((a, b) => 0.5 - Math.random())
    }
  },
  modules: {
  }
})
