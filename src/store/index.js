import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Api from '../Services/api'
// import themes from './../plugins/themes'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  state: {
    errorLoading: false,
    loading: false,
    loaded: false,
    theme: false,
    users: []
  },
  mutations: {
    SET_APP_THEME (state, data) {
      state.theme = data
    },
    SET_USERS (state, data) {
      state.users = data
    },
    SET_ERROR_LOADING (state, data) {
      state.errorLoading = data
    },
    SET_LOADED (state, data) {
      state.loaded = data
    },
    SET_LOADING (state, data) {
      state.loading = data
    }
  },
  actions: {
    getUsers ({ commit }, data) {
      commit('SET_LOADING', true)
      Api().get(`/?results=${data}`).then((response) => {
        if (response.status === 200) {
          commit('SET_USERS', response.data.results)
          commit('SET_LOADING', true)
          commit('SET_LOADED', true)
        }
      }).catch(() => {
        commit('SET_ERROR_LOADING', false)
      })
    }
  },
  modules: {
  }
})
