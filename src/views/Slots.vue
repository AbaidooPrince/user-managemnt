<template>
    <div>
      <label>
        Slots Lessons
      </label>
      <AppLayout>
      <template slot:header>
        <v-img
        height="300"
        src="https://lh3.googleusercontent.com/proxy/0FKGocRxffqJBXQsd2i1qY5wuK8gnZHWdWkH3YT9oJDug4bt1L-flNbeyC0YpC03cl5RnJTPNfcRoKYSA-tUj73j5d_DQOoXlcYHMwbcVuF4kqgrTJWhBngiRgavJmLJmdqvU-13Kzv9RdRkaP8maG4IBBx7mySYW_f3P6Nx"></v-img>
      </template>
      <div class="pa-4">
        What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?
        What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?

      </div>
      <div class="d-flex justify-space-between">
      <AppButton @click="log">
        Hello World
        <v-icon right>mdi-account</v-icon>
      </AppButton>
      <AppButton><v-icon left>mdi-account-plus</v-icon>
      Sloted button
      </AppButton>
      </div>
      <template slot:footer>
        <v-footer>
        <div class="d-inline justify-space-between">
          <span>Footer item 1
          </span>
          <span>Footer item 2
          </span>
          <span>Footer item 2
          </span>
        </div>
        </v-footer>
      </template>
      </AppLayout>
    </div>
</template>
<script>
import Api from '../Services/api'
import AppLayout from './../components/AppLayout'
import AppButton from './../components/AppButton'
export default {
  name: 'Slots',
  data () {
    return {
      data: 20
    }
  },
  components: { AppButton, AppLayout },
  methods: {
    log () {
      console.log('works...')
    },
    fetchUsers () {
      Api().get(`/?results=${this.data}`).then((response) => {
        console.log(response)
      })
    }
  },
  mounted () {
  },
  created () {
    // this.fetchUsers()
  }
}
</script>
<style scoped>
</style>
