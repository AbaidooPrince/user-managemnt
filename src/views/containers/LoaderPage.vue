<template>
<div>
 <v-card
 elevation="0"
 width="200"
 class="pa-3"
    color="grey"
    rounded="lg"
  >
  <label class="grey lighten-2--text">Loading...</label>
    <v-skeleton-loader
      class="mx-auto"
      type="paragraph"
    ></v-skeleton-loader>
  </v-card>
</div>
</template>
<script>
export default {
  name: 'LoaderPage',
  data () {
    return {
    }
  }

}
</script>
<style scoped>

</style>
