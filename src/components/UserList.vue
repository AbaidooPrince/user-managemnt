<template>
    <div>

        <v-list>
            <v-virtual-scroll
            v-if="loaded"
            :items="users"
            item-height="50"
            height="300"
            >
              <template v-slot:default="{ item }">
          <v-list-item>
            <v-list-item-avatar>
              <v-img
              :src="item.picture.thumbnail"
              >
              </v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.name.first + ' ' + item.name.last }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
              </template>
            </v-virtual-scroll>
        <slot v-else-if="loading" name="loading">
          Loading...
        </slot>
        <slot name="error" v-else>
          Error...
        </slot>
        </v-list>
    </div>
</template>
<script>
export default {
  name: 'UserList',
  data () {
    return {

    }
  },
  computed: {
    loaded: {
      get () {
        return this.$store.state.loaded
      }
    },
    loading: {
      get () {
        return this.$store.state.loading
      }
    },
    users: {
      get () {
        return this.$store.state.users
      }
    }
  },
  created () {
    this.$store.dispatch('getUsers', 30)
  }
}
</script>
