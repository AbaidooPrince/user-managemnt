<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <Header />
      </v-col>
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
         <v-btn light class="primary" @click="$vuetify.goTo('#down', 'linear')">Scroll down</v-btn>
      </v-col>
      <v-col cols="12">
        <v-hover v-slot="{ hover }"
        open-delay="100"
        translate="slide-x-transition"
        >
        <v-card width="400" max-width="400"
        flat
        :rounded="hover ? 'xl' : '0'"
        :elevation="hover ? 12 : 0"
        >
        <!-- <v-avatar
        :size="!hover ? '200' : ''"
        :tile="hover ? true : false"
        class="justify-center"
        > -->
            <v-img src="https://corp.evenium.com/wp-content/uploads/2020/01/Planner-LD.jpg"
            cover
            :class="!hover ? 'solution-image' : ''"
            >
            </v-img>
            <!-- </v-avatar> -->
        <div>
          <v-card-title class="justify-center mt-4">
            EVENT PLANNER
          </v-card-title>
          <v-card-subtitle class="ma-4 h3 justify-center font-weight-light">
            Free yourself from logistics to embrace your new strategic role. Be an evenium planner.
          </v-card-subtitle>
          <v-card-actions class="justify-center mt-8">
            <v-btn outlined
            large
            rounded
            class="px-4 mb-8"
            >Learn more
            </v-btn>
          </v-card-actions>
        </div>
        </v-card>
        </v-hover>
      </v-col>
      <v-col cols="12">
        <cropper :src="img" @change="change" />
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import Header from './Header'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
export default {
  name: 'HelloWorld',
  components: { Header, Cropper },
  data: () => ({
    data: 1,
    img: 'https://images.pexels.com/photos/4323307/pexels-photo-4323307.jpeg',
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader'
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify'
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify'
      }
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com'
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com'
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify'
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs'
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify'
      }
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer'
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/getting-started/pre-made-layouts'
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions'
      }
    ]
  }),
  methods: {
    change ({ coordinates, canvas }) {
      console.log(coordinates, canvas)
    },
    scrollMethod () {
      this.$vuetify.goTo(200, {
        easing: 'linear',
        offset: 0,
        duration: 3000
      })
    },
    singleUser () {
      this.$store.dispatch('getUsers', this.data)
    }
  },
  created () {
    console.log('token', localStorage)
    this.scrollMethod()
  }
}
</script>
<style scoped>
.v-btn {
  text-transform: none;
}
.solution-image {
  width: 200px;
  height: 200px;
  margin: 0 auto 65px;
  background-position: 50%;
  background-size: cover;
  -webkit-transition: width .4s, -webkit-clip-path .4s;
  transition: width .4s, -webkit-clip-path .4s;
  -o-transition: width .4s, clip-path .4s;
  clip-path: circle(50% at 50% 50%);
  transition-timing-function: ease-in-out;

}
.solution-image :hover {
  transition: 2s;
  width: 400px;
  height: 00px;
  margin: 0 auto 65px;
  background-position: 50%;
  background-size: cover;

}
</style>
