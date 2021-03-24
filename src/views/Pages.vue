<template>
    <div>
      <v-container>
        <v-row class="justify">
          <v-col cols="12" lg="3" md="3" sm="4"
          v-for="(organ, o) in allOrganizations"
          :key="o"
          >
        <v-hover v-slot="{ hover }"
        open-delay="100"
        translate="slide-x-transition"
        >
        <v-card
        width="450"
        flat
        :rounded="hover ? 'xl' : '0'"
        :elevation="hover ? 12 : 0"
        >
        <!-- <v-avatar
        :size="!hover ? '200' : ''"
        :tile="hover ? true : false"
        class="justify-center"
        > -->
            <v-img
            src="../assets/organization-banner.jpg"
            cover
            >
            </v-img>
            <!-- </v-avatar> -->
        <div>
          <v-card-title class="justify-center mt-2">
            {{ organ.Name }}
          </v-card-title>
          <v-card-subtitle class="ma-2 subtitle justify-center font-weight-light">
              {{ organ.Description }}
          </v-card-subtitle>
          <v-card-actions class="justify-center mt-6">
            <v-btn outlined
            :loading="fetchLoading[o]"
            large
            @click="goToPage(organ.organizationUrl, organ.id, o)"
            class="px-4 mb-8"
            >Learn more
            </v-btn>
          </v-card-actions>
        </div>
        </v-card>
        </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>
<script>
import Api from '../Services/api'
export default {
  name: 'Pages',
  data () {
    return {
      fetchLoading: []
    }
  },
  computed: {
    fetchingPage: {
      get () {
        return this.$store.state.loading
      }
    },
    allOrganizations: {
      get () {
        return this.$store.state.allOrganizations
      }
    }
  },
  methods: {
    initializeLoading () {
      for (var i = 0, value = false, size = this.allOrganizations.length, array = this.fetchLoading; i < size; i++) array[i] = value
    },
    goToPage (url, id, i) {
      this.fetchLoading[i] = true
      Api().get(`/organizations/${id}`).then((response) => {
        if (response.status === 200) {
          this.$store.commit('SET_SINGLE_ORGANIZATIONS', response.data)
          setTimeout(() => {
            this.fetchLoading = false
            this.$router.push(`/pages/${url}`)
          }, 1500)
        }
      }).catch()
      // this.$store.dispatch('getSingleOrganization', id)
      // setTimeout(() => {
      //   this.$router.push(`/pages/${url}`)
      // }, 1000)
    },
    getAllOrganizations () {
      this.$store.dispatch('getAllOrganizations')
    }
  },
  created () {
    this.initializeLoading()
    this.$store.commit('SET_LOADING', false)
    this.getAllOrganizations()
  }
//   beforeRouteEnter (to, from, next) {
//     this.$store.dispatch('getAllOrganizations')
//     next()
//   }
}
</script>
<style lang="scss" scoped>

</style>
