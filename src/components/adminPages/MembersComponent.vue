<template>
  <div>
      members
                <v-data-table
                  :headers="headers"
                  :items="members"
                  :search="search"
                  no-data-text="No results found"
                  selectable-key="item"
                >
                  <template v-slot:body="{ items }">
                    <tbody>
                      <tr
                      v-for="(item, i) in items" :key="i"
                        class=""
                        style="cursor: pointer"
                      >
                        <!--<td>{{ item.UserAccount.User.name }}</td>-->

                        <td
                          class="mr-0 pr-0 pl-0 pt-2 pb-2 text-center"
                        >
                          <v-avatar size="40">
                            <v-img
                              :lazy-src="require('@/assets/profile.png')"
                              src=""
                            ></v-img>
                          </v-avatar>
                        </td>
                        <td
                          class="pl-2 ml-0 pr-0 hover-list"
                        >
                          <div class="pt-0 pb-0">
                            <label class="cropText w-100" contenteditablec>
                      {{ item.users_permissions_user.username }}</label>
                          </div>
                        </td>
                        <td class="pl-2 ml-0 py-2 text-center">
                        </td>

                        <td class="pl-2 ml-0 py-2 text-center">
                            {{ item.users_permissions_user.lastName }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                  <!-- Table footer slot -->
                  <!-- <template v-slot:footer v-if="groupLastPage > 1">
                    <div class="text-center mt-16">
                      <v-container class="pb-0 pt-0">
                        <v-row justify="center" class="pt-0 mt-0 pb-0 mb-0">
                          <v-col cols="12" class="mt-0 pt-0 pb-0 mb-0">
                            <v-container class="max-width">
                              <v-pagination
                                v-model="groupCurrentPage"
                                :length="10"
                                :total-visible="7"
                                circle
                              ></v-pagination>
                            </v-container>
                          </v-col>
                        </v-row>
                      </v-container>
                    </div>
                  </template> -->
                </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'MembersComponent',
  props: {
    memberType: {
      type: String,
      default: 'organization'
    }
  },
  data () {
    return {
      search: '',
      headers: [
        {
          text: '',
          value: 'username',
          width: 20
        },
        {
          text: '',
          value: 'firstName',
          width: 20
        },
        {
          text: '',
          value: 'lastName',
          width: 40
        },
        {
          text: '',
          value: 'city',
          width: 50
        },
        {
          text: '',
          value: 'country'
        }
      ]
    }
  },
  methods: {
    fetchData () {
      switch (this.memberType) {
        case 'organization': this.$store.dispatch('organizationAdmin/getOrganizationMembers')
          break
        default:
          break
      }
    }
  },
  computed: {
    members: {
      get () {
        return this.$store.state.organizationAdmin.members
      }
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style>

</style>
