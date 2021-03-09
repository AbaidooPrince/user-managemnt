<template>
    <div>
        Useer pasge
        <UserList />
    </div>
</template>
<script>
import UserList from '../components/UserList'
export default {
  name: 'Users',
  components: { UserList },
  data () {
    return {

    }
  },
  computed: {
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
<style scoped>

</style>
