<template>
  <v-app>
    <v-app-bar
      app
      class="transparent"
      elevate-on-scroll
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="30"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn link :to="organizationUrl ? `/pages/${organizationUrl}/login` : '/login'">Login
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn link :to="organizationUrl ? `/pages/${organizationUrl}/register` : '/sign-up'">Register
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn to="/pages" link color="secondary">Users Page</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="gotToSlots">Slots</v-btn>
      <v-spacer></v-spacer>
      <v-btn class="primary" @click="gotToProfile">Profile</v-btn>
      <v-spacer></v-spacer>
      <ThemeChanger />
      <v-switch
      @change="changeTheme"
      v-model="selectedTheme"
      >
        <template v-slot:label>
          <v-icon :color="$vuetify.theme.dark ? 'white' : 'black'">mdi-theme-light-dark
          </v-icon>
        </template>
      </v-switch>
    </v-app-bar>

    <v-main class="">
      <v-container class="">
     <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
// import userThemes from './plugins/themes'
import ThemeChanger from './components/ThemeChanger'

export default {
  name: 'App',

  components: { ThemeChanger },
  data: () => ({
    theme: true
    //
  }),
  computed: {
    organizationUrl: {
      get () {
        return this.$route.params.organizationUrl
      }
    },
    selectedTheme: {
      get () {
        return this.$store.state.theme
      },
      set (val) {
        this.$store.commit('SET_APP_THEME', val)
      }
    }
  },
  methods: {
    changeTheme () {
      this.$vuetify.theme.dark = this.selectedTheme
    },
    gotToProfile () {
      this.$router.push('/profile')
    },
    toUsers () {
      this.$router.push('/users')
    },
    gotToSlots () {
      this.$router.push('/slots')
    },
    switchTheme () {
      if (this.selectedTheme === true) {
        this.$vuetify.theme.dark = true
      } else {
        this.$vuetify.theme.dark = false
      }
    }
  },
  created () {
    this.switchTheme()
    console.log(this.$vuetify.theme.defaults)
  }
}
</script>
<style>
.v-btn {
  text-transform: none;
}
</style>
