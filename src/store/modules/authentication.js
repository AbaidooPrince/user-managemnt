// import Api from '../../Services/api'

export default {
  namespaced: true,
  state: {
    authToken: '',
    currentUser: {},
    userRole: {}
  },
  getters: {},
  mutations: {
    SET_AUTH_TOKEN (state, data) {
      state.authToken = data
    },
    SET_CURRENT_USER_ROLE (state, data) {
      state.userRole = data
    },
    SET_CURRENT_USER (state, data) {
      state.currentUser = data
    },
    CLEAR_CURRENT_USER (state) {
      state.currentUser = null
      state.authToken = null
    }
  },
  actions: {
    clearCurrentUser ({ commit }) {
      commit('CLEAR_CURRENT_USER')
    },
    setCurrentUser ({ commit }, data) {
      commit('SET_CURRENT_USER', data.user)
      commit('SET_AUTH_TOKEN', data.jwt)
      commit('SET_CURRENT_USER_ROLE', data.user.role)
    }
  }
}
