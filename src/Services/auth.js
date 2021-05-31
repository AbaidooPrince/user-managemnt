import store from '../store/index'
// import router from 'vue-router'
import * as Cookies from 'js-cookie'
// import api from './api'

const AUTH_TOKEN_KEY = 'authToken'
// const SET_CURRENT_USER = 'currentUser'

// loggen in
export function login (data) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      // const currentPage = store.state.organizationPage.organizationUrl
      // const res = await api().post('/auth/local', data)
      if (data.status === 200) {
        if (data.data.user.confirmed === true) {
          setAuthToken(data.data.jwt)
          await store.dispatch('authentication/setCurrentUser', data.data)
        } else {
          resolve(data)
        }
      } else {
        reject(data)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export function isLoggedIn () {
  const authToken = store.state.authentication.authToken
  return !!authToken
}
// Member
export function isMember () {
  if (isLoggedIn()) {
    const role = store.state.authentication.userRole.type
    return role === 'authenticated'
  } else return false
}
// Organization Admin
export function isOrganizationAdmin () {
  if (isLoggedIn()) {
    const role = store.state.authentication.userRole.type
    return role === 'organizer' || role === 'branch_leader' || role === 'group_leader'
  } else return false
}
// Organizer
export function isOrganizer () {
  if (isLoggedIn()) {
    const role = store.state.authentication.userRole.type
    return role === 'organizer'
  } else return false
}

// Brnach Leader
export function isBranchLeader () {
  if (isLoggedIn()) {
    const role = store.state.authentication.userRole.type
    return role === 'branch_leader'
  } else return false
}
// Organizer
export function isGroupLeader () {
  if (isLoggedIn()) {
    const role = store.state.authentication.userRole.type
    return role === 'group_leader'
  } else return false
}

// set token
export function setAuthToken (token) {
  // sessionStorage.setItem(AUTH_TOKEN_KEY, token)
  Cookies.set(AUTH_TOKEN_KEY, token)
}
