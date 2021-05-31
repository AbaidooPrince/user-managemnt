<template>
  <div>Members view
      <div contenteditable role="textbox">Prince Abaidoo</div>
      <component memberType="organization"  :is="membersComponent" />
  </div>
</template>

<script>
export default {
  name: 'MembersView',
  components: {
    MembersComponent: () => import('../../components/adminPages/MembersComponent')
  },
  data () {
    return {
      membersComponent: 'MembersComponent',
      name: ''
    }
  }

}
</script>

<style>

</style>
