<template>
  <div>
      <v-row>
          <v-col cols="auto">
              <v-navigation-drawer mini-variant>
          <v-list v-model="link" nav dense>
              <v-list-item :to="{name: 'Members'}" exact>
                  <v-list-item-icon>
                      <v-icon>mdi-account-group</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Members
                  </v-list-item-title>
              </v-list-item>
              <v-list-item :to="{name: 'Branches'}" exact>
                  <v-list-item-icon>
                      <v-icon>mdi-network</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Branches
                  </v-list-item-title>
              </v-list-item>
          </v-list>
              </v-navigation-drawer>
          </v-col>
          <v-col class="pa-0">
      <v-container>
        <router-view></router-view>
      </v-container>
          </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
  name: 'AllAdminContainer',
  data () {
    return {
      link: null,
      middleColumn: {
        md: 7,
        sm: 3
      }
    }
  }

}
</script>

<style>

</style>
