<template>
    <div>
                  <AlertComponent
                  class="alert"
                  :type="alertType"
                  :alert="alertDialog"
                  :text="alertMessage"
                  />
                  <v-form @submit.prevent="sendAdminMessage">
                <v-card-text class="pb-0 pt-0">
                    <div>
                        <label>Name</label>
                        <v-text-field
                          class="v-text-field"
                          outlined
                          dense
                          v-model="form.senderName"
                        >
                        </v-text-field>
                    </div>
                      <div class="d-inline">
                        <label>Email</label>
                        <v-text-field
                          class="v-text-field"
                          outlined
                          dense
                          v-model="form.senderEmail"
                        >
                        </v-text-field>
                      </div>
                      <div class="d-inline">
                        <label>Contact</label>
                        <v-text-field
                          class="v-text-field"
                          outlined
                          dense
                          v-model="form.senderContact"
                        >
                        </v-text-field>
                      </div>
                    <div class="">
                        <label>Message</label>
                        <v-textarea
                          class="v-text-field"
                          outlined
                          counter="500"
                          row-height="2"
                          dense
                          v-model="form.message"
                        >
                        </v-textarea>
                    </div>
                </v-card-text>
                <v-card-actions class="d-flex pl-5 pr-5 pt-0 pb-0 justify-end">
                  <v-btn color="secondary" @click="closeSendMessengeForm" text>Cancel</v-btn>
                  <v-btn class="primary" type="submit" width="100">Send</v-btn>
                </v-card-actions>
                  </v-form>
    </div>
</template>
<script>
export default {
  name: 'AdminMessengerForm',
  props: {
    form: {
      type: Object,
      default: null
    }

  },
  data () {
    return {
      alertMessage: '',
      alertType: '',
      alertDialog: false,
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
    sendAdminMessage () {
      console.log(this.form)
      this.alertMessage = 'Your message has been sent successfully.'
      this.alertType = 'success'
      this.alertDialog = true
      this.hideAlert()
    },
    closeSendMessengeForm () {
      this.$emit('cancel-admin-messenger')
    },
    hideAlert () {
      setTimeout(() => {
        this.alertDialog = false
        this.$emit('cancel-admin-messenger')
      }, 2000)
    },
    closeDialog () {
      this.alertDialog = false
    }
  }
}
</script>
