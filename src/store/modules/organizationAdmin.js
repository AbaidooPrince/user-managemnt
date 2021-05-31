// import { roundToNearestMinutes } from 'date-fns'
import Api from '../../Services/api'
import router from 'vue-router'
import Vue from 'vue'

Vue.use(router)

export default {
  namespaced: true,
  state: {
    members: [],
    deleteStatus: false,
    myOrganizations: [],
    selectedOrganization: {}
  },
  mutations: {
    SET_ORGANIZATION_MEMBERS (state, data) {
      state.members = data
      state.organizationMembers = data
    },
    SET_DELETE_STATUS (state, data) {
      state.deleteStatus = data
    },
    SET_SELECTED_ORGANIZATION (state, data) {
      state.selectedOrganization = data
    },
    CLEAR_SELECTED_ORGANIZATION (state) {
      state.selectedOrganization = {}
    },
    SET_MY_ORGANIZATIONS (state, data) {
      state.myOrganizations = data
    }
  },
  actions: {
    getOrganizationMembers ({ commit, state }) {
      Api().get(`/members?organization=${state.selectedOrganization.id}`).then((response) => {
        if (response.status === 200) {
          commit('SET_ORGANIZATION_MEMBERS', response.data)
        }
      })
    },
    clearSelectedOrganization ({ commit }) {
      commit('CLEAR_SELECTED_ORGANIZATION')
    },
    deleteOneOrganization ({ commit }, id) {
      Api().delete(`/organizations/${id}`).then((response) => {
        if (response.status === 200) {
          console.log(response.data)
          commit('SET_DELETE_STATUS', true)
        }
      })
    },
    getMyOrganizations ({ commit, rootState }) {
      console.log(rootState)
      Api().get(`/organizations?users_permissions_user=${rootState.authentication.currentUser.id}`).then((response) => {
        if (response.status === 200) { commit('SET_MY_ORGANIZATIONS', response.data) }
      }).catch(() => {
      })
    }

  }
}
