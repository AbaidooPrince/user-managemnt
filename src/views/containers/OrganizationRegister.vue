<template>
  <div>
                <AlertComponent
                class="alert"
    v-on:close-dialog="closeDialog"
    :alert="alertDialog"
    :text="alertMessage"
    :type="alertType"
    />
    <v-container>
      <v-row justify-sm="center">
        <v-col cols="12" lg="7" md="7" sm="0" class="hidden-sm-and-down">
          <v-row class="mt-14">
            <v-col cols="12" class="pa-0">
              <v-img
                height="300"
                class="rounded-lg"
                src="../../assets/organization-banner.jpg"
                cover
              >
                <div class="d-flex justify-content-start">
                  <h2 class="d-flex align-items-center">Ayigya Circuit MYF</h2>
                  <label></label>
                </div>
              </v-img>
            </v-col>
            <v-col cols="12" class="pl-0">
              <v-card-subtitle class="pl-0 pr-0 pt-0">
                For secret code and other information
                <router-link to=""
                  ><b @click="sendAdminMessage"> contact</b>
                </router-link>
                circle admin
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="5" md="5" sm="8" v-show="!adminMessenger && !successfulRegistration">
          <div class="d-flex mt-14">
            <v-card class="pl-4 pr-4 pb-6" elevation="10" rounded="lg">
              <v-form @submit.prevent="validateCode" ref="userRegisterForm" v-model="register_valid">
                <div class="image1 d-flex hidden-md-and-up justify-center">
                  <v-avatar size="70" class="login-img hidden-md-and-up mb-4">
                    <v-img src="../../assets/2130.jpg"> </v-img>
                  </v-avatar>
                </div>
                <!-- <v-card-title class="d-flex justify-space-between">
                   Sign In
                   <span>
                <small>
                  <router-link :to="organizationUrl ? `/pages/${organizationUrl}/register` : '/sign-up'">
                  {{ organizationUrl ? 'Join Now' : 'Create Account' }}
                  </router-link></small>
                   </span>
                </v-card-title> -->
                <v-card-text class="mt-10">
                  <v-row>
                    <h3 class="hidden-sm-and-down ml-3">Join Us</h3>
                    <v-col cols="12" class="pb-0">
                      <label>Email * <span class="pl-4" v-show="this.disableEmail"><v-btn @click="changeEmail" color="accent"  x-small text link>Change email</v-btn> </span></label>
                      <v-text-field
                        :disabled="this.disableEmail"
                        :append-icon="this.checkMailIcon"
                        :loading="emailCheckLoading"
                        :rules="[required('Email'), validEmail()]"
                        @blur="checkMail"
                        class="v-text-field"
                        outlined
                        dense
                        v-model="registerForm.email"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" class="pb-0 pt-0" v-show="!existingUser">
                      <label>Username *</label>
                      <v-text-field
                      :rules="[required('First Name')]"
                        class="v-text-field"
                        outlined
                        dense
                        v-model="registerForm.firstName"
                      >
                      </v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" class="pb-0 pt-0" v-show="!existingUser">
                      <label>Last Name *</label>
                      <v-text-field
                      :rules="[required('Last Name')]"
                        class="v-text-field"
                        outlined
                        dense
                        v-model="registerForm.lastName"
                      >
                      </v-text-field>
                    </v-col> -->
                    <!-- <v-col cols="12" class="pb-0 pt-0" v-show="!existingUser">
                      <label>Other Names</label>
                      <v-text-field
                        class="v-text-field"
                        outlined
                        dense
                        v-model="registerForm.otherNames"
                      >
                      </v-text-field>
                    </v-col> -->
                    <v-col cols="12" class="pt-0 pb-0 pt-0" v-show="!existingUser">
                      <label>Password *</label>
                      <v-text-field
                      :rules="[required('Password'),minLength('Password', 8), maxLength('Password', 8)]"
                      :type="passwordVisible ? 'text' : 'password'"
                        class="v-text-field"
                        outlined
                        dense
                        @click:append="passwordVisible = !passwordVisible"
                        :append-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                        v-model="registerForm.password"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" class="pt-0 pb-0" v-show="!existingUser">
                      <label>Confirm Password *</label>
                      <v-text-field
                      :rules="[required('Confirm Password'), passwordMatch(this.registerForm.password), minLength('Password', 8), maxLength('Password', 8)]"
                      :type="passwordVisible2 ? 'text' : 'password'"
                        class="v-text-field"
                        outlined
                        dense
                        @click:append="passwordVisible2 = !passwordVisible2"
                        :append-icon="passwordVisible2 ? 'mdi-eye-off' : 'mdi-eye'"
                        v-model="registerForm.passwordConfirm"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" class="pt-0 pb-0">
                      <label>Secret Code</label>
                      <div class="d-flex justify-space-around">
                        <span class="">
                          <v-text-field
                          type="text"
                            id="code1"
                            class="v-text-field pl-4 pr-2"
                            outlined
                            dense
                            :rules="[required('-')]"
                            @keyup.prevent="toNextCode('code1', 'code2')"
                            maxlength="1"
                            v-model="registerForm.code[0]"
                          >
                          </v-text-field>
                        </span>
                        <span>
                          <v-text-field
                            id="code2"
                            class="v-text-field pl-2 pr-2"
                            outlined
                            dense
                            :rules="[required('-')]"
                            @keyup="toNextCode('code2', 'code3')"
                            maxlength="1"
                            v-model="registerForm.code[1]"
                          >
                          </v-text-field>
                        </span>
                        <span>
                          <v-text-field
                            id="code3"
                            class="v-text-field pl-2 pr-2 code"
                            outlined
                            :rules="[required('-')]"
                            dense
                            @keyup="toNextCode('code3', 'code4')"
                            maxlength="1"
                            v-model="registerForm.code[2]"
                          >
                          </v-text-field>
                        </span>
                        <span>
                          <v-text-field
                            id="code4"
                            class="v-text-field pl-2 pr-4"
                            outlined
                            dense
                            :rules="[required('-')]"
                            @keyup.prevent="toNextCode('code4', 'terms')"
                            maxlength="1"
                            v-model="registerForm.code[3]"
                          >
                          </v-text-field>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <div class="d-flex justify-space-between pt-0">
                        <v-checkbox
                        id="terms"
                        v-model="registerForm.terms"
                        :rules="[required('Terms & Conditions')]"
                          class="mt-0"
                          label="I agree to terms and conditions"
                        >
                        </v-checkbox>
                      </div>
                    </v-col>
                    <v-col cols="12" class="d-inline justify-center pt-0">
    <v-alert :value="this.invalidUrl" type="warning" text transition="linear"
    >
      You are registerting to a circle that does not exist.
    </v-alert>
                      <v-btn
                        block
                        v-text="this.buttonText"
                        :loading="registerLoading"
                        color="primary"
                        type="submit"
                      >
                      </v-btn>
                    </v-col>
                    <v-col cols="12" class="hidden-md-and-up">
              <v-card-subtitle class="pl-0 pr-0 pt-0">
                For secret code and other information
                <router-link to=""
                  ><b @click="sendAdminMessage"> contact</b>
                </router-link>
                circle admin
              </v-card-subtitle>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-form>
            </v-card>
          </div>
        </v-col>
        <v-col cols="12" lg="5" md="5" v-show="adminMessenger">
          <div class="mt-14">
              <v-card class="pl-4 pr-4 pb-6 pt-6" elevation="10" rounded="lg">
                <h3 class="ml-4 mb-2">Contact Admin</h3>
                <AdminMessengerForm
                @send-message="sendMessage"
                @cancel-admin-messenger="closeAdminMessengerForm"
                :form="adminMessengerForm"
                />
              </v-card>
          </div>
        </v-col>
        <v-col cols="12" lg="5" md="5" v-show="successfulRegistration && !adminMessenger">
          <div class="mt-14">
              <v-card class="pl-4 pr-4 pb-6 pt-6" elevation="10" rounded="lg">
                <!-- <h3 class="ml-4 mb-2 primary--text">Successful Registration...</h3> -->
                <div>
                  <v-alert type="info" border="left" color="success" text>
                  Your registration was successful. Please visit your mail to verify your account
                  </v-alert>
                </div>
              </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Api from '../../Services/api'
import validation from '../../Services/validation'
// import AlertComponent from '../../components/AlertComponent.vue'
export default {
  name: 'OrganizationRegister',
  props: ['organizationUrl'],
  data () {
    return {
      successfulRegistration: false,
      buttonText: 'Join',
      passwordVisible2: false,
      passwordVisible: false,
      disableEmail: false,
      emailValid: true,
      checkMailIcon: '',
      existingUser: false,
      existingUserData: {},
      emailCheckLoading: false,
      register_valid: false,
      alertDialog: false,
      alertMessage: '',
      alertType: '',
      adminMessenger: false,
      registerLoading: false,
      validCode: false,
      invalidUrl: false,
      // eslint-disable-next-line no-undef
      adminMessengerForm: new Form({
        senderEmail: '',
        message: '',
        senderName: '',
        senderContact: '',
        recepientAdmin: ''
      }),
      // eslint-disable-next-line no-undef
      registerForm: new Form({
        email: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        otherNames: '',
        organizationSecret: '',
        code: [],
        terms: false
      }),
      ...validation
    }
  },
  methods: {
    validateCode () {
      if (!(this.$refs.userRegisterForm.validate())) return
      this.buttonText = 'Validating...'
      this.registerForm.organizationSecret = this.registerForm.code.join('').toUpperCase()
      Api().get(`/organizations?organizationSecret=${this.registerForm.organizationSecret}`).then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          this.buttonText = 'Registering...'
          if (response.data[0].organizationUrl === this.organizationUrl) {
            // console.log('checking url' + this.organi)
            this.$store.commit('SET_ORGANIZATION_TO_JOIN', response.data[0])
            this.validCode = true
            this.addUser()
          } else {
            this.invalidUrl = true
            this.buttonText = 'Join'
            setTimeout(() => {
              this.resetForm()
              this.invalidUrl = false
              // this.$router.push('/pages')
            }, 3000)
          }
        } else {
          this.buttonText = 'Join'
          this.alertMessage = 'Something went wrong. Please check your secret and try again'
          this.alertType = 'warning'
          this.alertDialog = true
          this.$vuetify.goTo(0)
          this.hideAlert()
        }
      }).catch(() => {
        this.buttonText = 'Join'
        this.alertMessage = 'Error Validating code. Please retry or enter valid code'
        this.alertType = 'error'
        this.alertDialog = true
        this.hideAlert()
      })
    },
    findIdByMail (email) {
      Api().get(`/users?email=${email}`).then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          this.addToOrganization(response.data[0].id, this.currentOrganizationPage.id)
          // this.existingUserData = response.data[0]
        }
      }).catch()
    },
    addUser () {
      if (this.existingUser) {
        this.addToOrganization(this.existingUserData.id, this.currentOrganizationPage.id)
      } else {
        this.registerUser()
      }
    },
    toNextCode (field, nextField) {
      if (document.getElementById(field).length === document.getElementById(field).maxlength) {
        document.getElementById(field).setAttribute('style', 'text-transform: uppercase')
        document.getElementById(nextField).focus()
      }
    },
    changeEmail () {
      this.disableEmail = false
      this.checkMailIcon = ''
      this.existingUser = false
    },
    checkMail () {
      const regex = /.+@.+\..+/
      if (this.registerForm.email !== '' && regex.test(this.registerForm.email)) {
        this.emailCheckLoading = true
        Api().get(`/users?email=${this.registerForm.email}`).then((response) => {
          const length = response.data.length
          if (response.status === 200 && length > 0) {
            this.existingUserData = response.data[0]
            this.existingUser = true
            this.emailCheckLoading = false
            this.checkMailIcon = 'mdi-check'
            this.disableEmail = true
          } else if (response.status === 200 && length <= 0) {
            this.existingUser = false
            this.emailCheckLoading = false
            this.checkMailIcon = 'mdi-check'
          }
        }).catch(() => {
          this.emailCheckLoading = false
        })
      }
    },
    registerUser () {
      if (!(this.$refs.userRegisterForm.validate())) return
      this.buttonText = 'Registering...'
      console.log(this.registerForm)
      const userData = {
        username: this.registerForm.username,
        email: this.registerForm.email,
        password: this.registerForm.password
      }
      Api().post('/auth/local/register', userData).then((response) => {
        if (response.status === 200) {
          this.addToOrganization(response.data.id, this.currentOrganizationPage.id)
        }
      }).catch((error) => {
        if (error.response.data.data.code === 'ESERVFAIL') {
          this.findIdByMail(this.registerForm.email)
        } else {
          this.alertMessage = error.response.data.message[0].messages[0].message
          this.alertType = 'error'
          this.alertDialog = true
          this.$vuetify.goTo(0)
          this.hideAlert()
          this.buttonText = 'Join'
        }
      })
    },
    resetForm () {
      this.$refs.userRegisterForm.reset()
      this.checkMailIcon = ''
    },
    addToOrganization (userId, organizationId) {
      if (!this.registerForm.terms || this.registerForm.organizationSecret === '') {
        this.$refs.userRegisterForm.validate()
      }
      const data = {
        organization: organizationId,
        users_permissions_user: userId
      }
      this.registerLoading = true
      Api().post('/members', data).then((response) => {
        if (response.status === 200) {
          this.registerLoading = false
          this.alertMessage = 'You registration was successful.'
          this.alertType = 'success'
          this.alertDialog = true
          this.$vuetify.goTo(0)
          this.hideAlert()
          this.buttonText = 'Join'
          setTimeout(() => {
            this.successfulRegistration = true
          }, 1500)
        }
      }).catch((error) => {
        this.registerLoading = false
        this.alertMessage = error.response.data.message[0].messages[0].message
        this.alertType = 'error'
        this.alertDialog = true
        this.$vuetify.goTo(0)
        this.hideAlert()
        this.buttonText = 'Join'
      })
    },
    sendMessage (e) {
      console.log('emitted..' + e.alertType)
      this.alertText = e.alertMessage
      this.alertColor = e.alertType
      this.alertDialog = true
    },
    sendAdminMessage () {
      this.adminMessenger = true
    },
    closeAdminMessengerForm () {
      this.adminMessengerForm.reset()
      this.adminMessenger = false
    },
    hideAlert () {
      setTimeout(() => {
        this.alertDialog = false
      }, 3000)
    },
    closeDialog () {
      this.alertDialog = false
    }
  },
  computed: {
    currentOrganizationPage: {
      get () {
        return this.$store.state.organizationPage
      }
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    // Fire.$on('send-message', (data) => {
    //   this.sendMessage(data)
    // })
  }
}
</script>
<style lang="scss" scoped>
.background {
  position: relative;
  height: 100%;
  background-image: url('./../../assets/4148.jpg');
  background-size: cover;
}
.alert {
    position: relative;
    right: 0;
    margin-left: auto;
    z-index: 100;
}
.parent {
  position: relative;
  top: 120px;
  left: 0;
  right: 0;
}
.login-img {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
}
.image1 {
  position: relative;
  top: -35px;
  left: 0;
}
.image2 {
  position: absolute;
  top: 20px;
  left: 30px;
}
</style>
