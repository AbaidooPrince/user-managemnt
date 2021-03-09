<template>
<div>
    <v-container>
        <v-row justify="center">
          <v-col cols="12" class="col-lg-6 col-md-8 col-sm-12">
          <div class="parent d-flex">
            <v-card class="image2 pl-4 pr-4 pb-6" rounded="lg">
            <v-form @submit.prevent="loginUser">
              <div class="image1 d-flex justify-center">
               <v-avatar
               size="150"
               class="login-img"
               >
                 <v-img
                 src="../assets/2130.jpg"
                 >
                 </v-img>
               </v-avatar>
              </div>
                <v-card-title class="mt-14 d-flex justify-space-between">
                   Sign In
                   <span>
                <small>
                  <router-link to="">
                  Create Account
                  </router-link></small>
                   </span>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" class="pb-0">
                            <label>Email or Username</label>
                            <v-text-field
                            class="v-text-field"
                            outlined
                            dense
                            v-model="login.identifier"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" class="pt-0 pb-0">
                            <label>Password</label>
                            <v-text-field
                            class="v-text-field"
                            outlined
                            dense
                            v-model="login.password"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <div class="d-flex justify-space-between">
                            <v-checkbox
                            class="mt-0"
                            label="Keep me signed in"
                            >
                            </v-checkbox>
                            <span>
                              <router-link to="">
                               Forget Password
                              </router-link>
                            </span>
                          </div>
                        </v-col>
                        <v-col cols="12" class="d-flex justify-center pt-0">
                          <v-btn block
                          :loading="loginLoading"
                          color="primary"
                          type="submit"
                          > Login
                          </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
                </v-form>
            </v-card>
          </div>
          </v-col>
        </v-row>
    </v-container>
    <alert-component
    v-on:close-dialog="closeDialog"
    :alert="alertDialog"
    :text="alertText"
    :color="alertColor">
    </alert-component>
</div>
</template>
<script>
import AlertComponent from '../components/AlertComponent.vue'
import { setAuthToken, login } from '../Services/auth'
// import * as Cookies from 'js-cookies'
// import Api from '../Services/api'
export default {
  components: { AlertComponent },
  name: 'Login',
  data () {
    return {
      loginLoading: false,
      alertText: '',
      alertDialog: false,
      alertColor: 'primary',
      // eslint-disable-next-line no-undef
      login: new Form({
        indentifier: '',
        password: ''
      })
    }
  },
  methods: {
    loginUser () {
      this.loginLoading = true
      login(this.login).then((response) => {
        console.log(response)
        // if (response.status === 200) {
        setAuthToken(response.data.jwt)
        // Cookies.set(response.jwt)
        this.alertColor = 'green lighten-2'
        this.alertText = 'Successful'
        this.alertDialog = true
        this.loginLoading = false
        this.hideAlert()
        setTimeout(() => {
          this.$router.push('/slots')
        }, 1000)
        // }
      }).catch((error) => {
        console.log(error.response)
        this.loginLoading = false
        this.alertColor = 'error lighten-2'
        this.alertText = error.response.data.message[0].messages[0].message
        this.alertDialog = true
        this.hideAlert()
      })
    },
    hideAlert () {
      setTimeout(() => {
        this.alertDialog = false
      }, 2000)
    },
    closeDialog () {
      this.alertDialog = false
    },
    alert () {
      this.alertDialog = true
    }
  }
}
</script>
<style scoped>
.background {
  position: relative;
  height: 100%;
  background-image: url('./../assets/4148.jpg');
  background-size: cover;
}
input .v-text-field {
    border-top-style: none;
}
.login-img {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
}
.parent {
        position: relative;
        top: 120px;
        left: 0;
        right: 0;
      }
      .image1 {
        position: relative;
        top: -70px;
        left: 0;
      }
      .image2 {
        position: absolute;
        top: 20px;
        left: 30px;
      }
</style>
