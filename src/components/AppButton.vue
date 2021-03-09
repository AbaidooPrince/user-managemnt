<template>
    <div>
        <v-btn v-on="$listeners">
            <slot>
            </slot>
        </v-btn>
    </div>
</template>
<script>
export default {
  name: 'AppButton',
  data () {
    return {

    }
  },
  methods: {
    action () {

    }
  }
}
</script>
<style scoped>

</style>
