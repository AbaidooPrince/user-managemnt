import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import userThemes from './themes'
import { preset } from 'vue-cli-plugin-vuetify-preset-rally/preset'

Vue.use(Vuetify)
const options = {
  breakpoint: {
    scrollbarWidth: 5,
    thresholds: {
      xs: 600,
      sm: 900,
      md: 1280,
      lg: 1920
    }
  },
  theme: {
    themes: { userThemes }
  }
}
export default new Vuetify({
  preset,
  ...options
})
