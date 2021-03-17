<template>
    <div>
      <v-container>
        <v-card rounded="xl" flat>
          <v-img
          height="300"
          src="../../assets/organization-banner.jpg"
          cover
          >
          <div class="org-logo d-flex justify-space-around">
            <v-avatar
            left
            class="d-flex mt-auto"
            size="50"
            color="white">
              <v-img
              ></v-img>
            </v-avatar>
            <div class="pl-2">
              <label>Username</label>
            </div>
          </div>
          </v-img>
        </v-card>
        <v-divider class="my-4"></v-divider>
        <v-row>
          <v-col cols="12"
          >
          <label class="font-weight-bold">Decription</label>
          <p> {{ organizationPage.Description }}</p>
          </v-col>

          <v-col cols="12">
            <label class="font-weight-bold">Connect with us</label>
            <div>
            </div>
            </v-col>
            <v-col cols="12">
              <label class="font-weight-bold">Created By</label>
              <v-row>
                <v-col cols="6" class="align-content-center">
                <div class="d-flex justify-start">
              <v-avatar color="blue"
              size="50"
              >
                <v-img></v-img>
              </v-avatar>
              <div class="d-inline pl-4 pr-4">
              <p class="small mb-0">username</p>
                <p class="small mb-0">Date
              </p>
              </div>
              <div class="">
                <v-btn
                @click="sendAdminMessage"
                outlined
                color="secondary"
                >Contact Admin</v-btn>
              </div>
              </div>
                </v-col>
                <v-col cols="4">
                  <div class="d-flex justify-end">
                <v-btn width="100"
                color="primary"
                :to="`/pages/${this.organizationUrl}/register`"
                >Join</v-btn>
              </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" v-show="contactAdmin">
              <AdminMessengerForm
                @cancel-admin-messenger="closeAdminMessengerForm"
                :form="adminMessengerForm"
              />
            </v-col>
        </v-row>
      </v-container>
    </div>
</template>
<script>
export default {
  name: 'OrganizationPage',
  props: ['organizationUrl'],
  data () {
    return {
      contactAdmin: false,
      // eslint-disable-next-line no-undef
      adminMessengerForm: new Form({
        senderEmail: '',
        message: '',
        senderName: '',
        senderContact: '',
        recepientAdmin: ''
      })
    }
  },
  methods: {
    fetchingOrganizationPage () {
      if (this.organizationPage.organizationUrl !== this.organizationUrl) {
        this.$store.dispatch('getOrganizationByUrl', this.organizationUrl)
      }
    },
    closeAdminMessengerForm () {
      this.$vuetify.goTo(0, {
        easing: 'linear',
        duration: 1200
      })
      this.adminMessengerForm.reset()
      this.contactAdmin = false
    },
    sendAdminMessage () {
      this.contactAdmin = true
      this.$vuetify.goTo(700, {
        easing: 'linear',
        duration: 1200
      })
    }
  },
  computed: {
    organizationPage: {
      get () {
        return this.$store.state.organizationPage
      }
    }
  },
  mounted () {
  },
  created () {
    this.fetchingOrganizationPage()
  }
}
</script>
<style scoped>
.org-logo {
  position: absolute;
  bottom: 3%;
  left: 2%;
  margin-top: auto;
}

</style>
