import axios from 'axios'
import config from '../../public/config'
// import * as Cookies from 'js-cookie'

export default () => {
  // const authToken = Cookies.get('authToken')
  // alert(authToken)
  return axios.create({
    baseURL: config.pemanApiUrl,
    withCredentials: false,
    headers: {
      Accept: 'Application/json',
      'Content-Type': 'Application/json'
    }
  })
}
