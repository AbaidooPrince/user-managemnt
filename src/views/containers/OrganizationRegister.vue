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
        <v-col cols="12" lg="5" md="5" v-show="!adminMessenger">
          <div class="d-flex mt-14">
            <v-card class="pl-4 pr-4 pb-6" elevation="10" rounded="lg">
              <v-form @submit.prevent="registerUser" v-model="register_valid">
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
                    <v-col cols="12" class="pb-0 pt-0" v-show="!exisitngUser">
                      <label>First Name *</label>
                      <v-text-field
                      :rules="[required('First Name')]"
                        class="v-text-field"
                        outlined
                        dense
                        v-model="registerForm.firstName"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" class="pb-0 pt-0" v-show="!exisitngUser">
                      <label>Last Name *</label>
                      <v-text-field
                      :rules="[required('Last Name')]"
                        class="v-text-field"
                        outlined
                        dense
                        v-model="registerForm.lastName"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" class="pb-0 pt-0" v-show="!exisitngUser">
                      <label>Other Names</label>
                      <v-text-field
                        class="v-text-field"
                        outlined
                        dense
                        v-model="registerForm.otherNames"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" class="pt-0 pb-0 pt-0" v-show="!exisitngUser">
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
                    <v-col cols="12" class="pt-0 pb-0" v-show="!exisitngUser">
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
                            class="v-text-field pl-4 pr-2"
                            outlined
                            dense
                            v-model="registerForm.code[0]"
                          >
                          </v-text-field>
                        </span>
                        <span>
                          <v-text-field
                            class="v-text-field pl-2 pr-2"
                            outlined
                            dense
                            v-model="registerForm.code[1]"
                          >
                          </v-text-field>
                        </span>
                        <span>
                          <v-text-field
                            class="v-text-field pl-2 pr-2"
                            outlined
                            dense
                            v-model="registerForm.code[2]"
                          >
                          </v-text-field>
                        </span>
                        <span>
                          <v-text-field
                            class="v-text-field pl-2 pr-4"
                            outlined
                            dense
                            v-model="registerForm.code[3]"
                          >
                          </v-text-field>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <div class="d-flex justify-space-between pt-0">
                        <v-checkbox
                        :rules="[required('Terms & Conditions')]"
                          class="mt-0"
                          label="I agree to terms and conditions"
                        >
                        </v-checkbox>
                      </div>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center pt-0">
                      <v-btn
                        block
                        :loading="registerLoading"
                        color="primary"
                        type="submit"
                      >
                        Join
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
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Api from '../../Services/api'
import validations from '../../Services/validations'
// import AlertComponent from '../../components/AlertComponent.vue'
export default {
  name: 'OrganizationRegister',
  data () {
    return {
      passwordVisible2: false,
      passwordVisible: false,
      disableEmail: false,
      emailValid: true,
      checkMailIcon: '',
      exisitngUser: false,
      emailCheckLoading: false,
      register_valid: false,
      alertDialog: false,
      alertMessage: '',
      alertType: '',
      adminMessenger: false,
      registerLoading: false,
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
        organizationCode: '',
        code: []
      }),
      ...validations
    }
  },
  methods: {
    changeEmail () {
      this.disableEmail = false
      this.checkMailIcon = ''
      this.exisitngUser = false
    },
    checkMail () {
      const regex = /.+@.+\..+/
      if (this.registerForm.email !== '' && regex.test(this.registerForm.email)) {
        this.emailCheckLoading = true
        Api().get(`/users?email=${this.registerForm.email}`).then((response) => {
          const length = response.data.length
          if (response.status === 200 && length > 0) {
            console.log('sdsd...' + length)
            this.exisitngUser = true
            this.emailCheckLoading = false
            this.checkMailIcon = 'mdi-check'
            this.disableEmail = true
          } else if (response.status === 200 && length <= 0) {
            this.exisitngUser = false
            this.emailCheckLoading = false
            this.checkMailIcon = 'mdi-check'
          }
        }).catch(() => {
          this.emailCheckLoading = false
        })
      }
    },
    registerUser () {
      console.log(this.registerForm)
      this.alertMessage = 'Your message has been sent successfully.'
      this.alertType = 'success'
      this.alertDialog = true
      this.$vuetify.goTo(0)
      this.hideAlert()
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
      }, 2000)
    },
    closeDialog () {
      this.alertDialog = false
    }
  },
  computed: {
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
