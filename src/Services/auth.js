import store from '../store/index'
// import router from 'vue-router'
import * as Cookies from 'js-cookie'
import api from './api'

const AUTH_TOKEN_KEY = 'authToken'
// const SET_CURRENT_USER = 'currentUser'

// loggen in
export function login (data) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      // const currentPage = store.state.organizationPage.organizationUrl
      const res = await api().post('/auth/local', data)
      alert('sd')
      if (res.status === 200) {
        setAuthToken(res.data.jwt)
        await store.dispatch('authentication/setCurrentUser', res.data)
        alert('er..')
      } else {
        alert('resolve')
        resolve(res)
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
// Organizer
export function isOrganizer () {
  if (isLoggedIn()) {
    const role = store.state.authentication.userRole.type
    return role === 'organizer'
  } else return false
}

// set token
export function setAuthToken (token) {
  // sessionStorage.setItem(AUTH_TOKEN_KEY, token)
  Cookies.set(AUTH_TOKEN_KEY, token)
}
