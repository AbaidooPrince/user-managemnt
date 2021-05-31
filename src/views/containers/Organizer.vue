<template>
<div>
  <v-container>
  <p>You have logged in as an Organizer</p>
  <v-row>
    <v-col align="center" cols="12">
      <v-btn @click="openNewGroupDialog">Create Group
      </v-btn>
    </v-col>
  </v-row>

  <v-row v-if="myOrganizations.length !== 0">
    <v-col cols="12" md="4" lg="3" sm="6" v-for="(organization, o) in myOrganizations" :key="o">
      <v-card height="100%" rounded="lg">

                  <v-img src="../../assets/group-banner.jpg"
                    cover
                    position="center center"
                    height="70"
                  >
                  </v-img>
                  <v-card-title>{{ organization.Name }}</v-card-title>
                  <v-card-subtitle style="height:25%;">{{ organization.Description }}</v-card-subtitle>
                  <v-divider></v-divider>
                  <!-- <v-card-text>
                    <div class="d-flex">
                      <div class="d-flex justify-space-between">
                        <label>Created</label>
                        <label>{{ dayFormat(organization.created_at) }} </label>
                      </div>
                    </div><div class="d-flex justify-space-between">
                        <label>Groups</label>
                        <label>{{ organization.groups.length }} </label>
                        </div>
                  </v-card-text> -->
                  <div align="end" class="w-50 px-4">
                    <div class="w-50 d-flex float-right">
                      <div class="d-flex mr-2">
                        <v-btn @click="deleteOrganization(organization.id)" small outlined icon>
                        <v-icon small>mdi-delete</v-icon>
                        </v-btn>
                      </div>
                      <div class="">
                    <v-btn class=""
                    rounded
                    @click="viewOrganization(organization.id)"
                    color="secondary"
                    depressed small
                    >
                      <v-icon small left>mdi-eye</v-icon>View
                    </v-btn>
                      </div>
                    </div>
                  </div>
      </v-card>
    </v-col>
  </v-row>
  </v-container>
  <v-dialog
  v-model="dialog"
  overlay-opacity="1"
  width="700"
  >
    <component @close-dialog="closeDialog" :is="dialogComponent" />
  </v-dialog>
</div>
</template>
<script>
import Api from '../../Services/api'
import { toDate } from 'date-fns'
export default {
  name: 'Organizer',
  components: {
    NewGroupForm: () => import('../../components/forms/NewGroupForm')
  },
  data () {
    return {
      dialog: false,
      dialogComponent: ''
    }
  },
  computed: {
    deleteStatus: {
      get () {
        return this.$store.state.organizationAdmin.deleteStatus
      }
    },
    myOrganizations: {
      get () {
        return this.$store.state.organizationAdmin.myOrganizations
      }
    },
    currentUser: {
      get () {
        return this.$store.state.authentication.currentUser
      }
    }
  },
  methods: {
    dayFormat (date) {
      return toDate(date)
    },
    deleteOrganization (id) {
      this.$store.dispatch('organizationAdmin/deleteOneOrganization', id)
      if (this.deleteStatus === true) {
        // show snackbar
      }
    },
    viewOrganization (id) {
      Api().get(`/organizations/${id}`).then((response) => {
        if (response.status === 200) {
          this.$store.commit('organizationAdmin/SET_SELECTED_ORGANIZATION', response.data)
          this.$router.push(`/admin/organizations/${id}`)
        }
      }).catch()
      // this.$store.dispatch('organizationAdmin/getOneOrganization', id)
    },
    getMyOrganizations () {
      this.$store.dispatch('organizationAdmin/getMyOrganizations')
    },
    openNewGroupDialog () {
      this.dialogComponent = 'NewGroupForm'
      this.dialog = true
    },
    closeDialog () {
      // this.dialogComponent = ''
      this.dialog = false
    }
  },
  created () {
    this.$store.dispatch('organizationAdmin/clearSelectedOrganization')
    this.getMyOrganizations()
  }

}
</script>
<style scoped>

</style>
