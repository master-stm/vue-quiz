import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showResults: false,
    results: [],
    resultsScore:0
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    getResults(state) {
      return state.results
    }
  },
  modules: {
  }
})
