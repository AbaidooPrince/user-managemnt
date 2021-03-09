import Vue from 'vue'
import './styles.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import { Form } from 'vform'
import AlertComponent from './components/AlertComponent.vue'
// import config from '../public/config'

Vue.config.productionTip = false

// axios
window.axios = axios

// Components
Vue.component('ALertComponent', AlertComponent)

window.Form = Form

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
