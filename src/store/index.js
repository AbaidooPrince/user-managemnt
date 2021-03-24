import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Api from '../Services/api'
import authentication from './modules/authentication'
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
    users: [],
    allOrganizations: [],
    organizationPage: {}
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
    },
    SET_ALL_ORGANIZATIONS (state, data) {
      state.allOrganizations = data
    },
    SET_SINGLE_ORGANIZATIONS (state, data) {
      state.organizationPage = data
    },
    SET_ORGANIZATION_TO_JOIN (state, data) {
      state.organizationPage = data
    }
  },
  actions: {
    getOrganizationByUrl ({ commit }, url) {
      Api().get(`/organizations?organizationUrl=${url}`).then((response) => {
        if (response.status === 200 && response.data !== []) {
          commit('SET_SINGLE_ORGANIZATIONS', response.data[0])
        } else if (response.status === 200 && response.data === []) {
          this.$router.push('/404')
        }
      }).catch()
    },
    getAllOrganizations ({ commit }) {
      Api().get('/organizations').then((response) => {
        if (response.status === 200) {
          commit('SET_ALL_ORGANIZATIONS', response.data)
        }
      }).catch()
    },
    getSingleOrganization ({ commit }, id) {
      commit('SET_LOADING', true)
      Api().get(`/organizations/${id}`).then((response) => {
        if (response.status === 200) {
          commit('SET_SINGLE_ORGANIZATIONS', response.data)
          commit('SET_LOADING', false)
        }
      }).catch()
    },
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
    authentication
  }
})
