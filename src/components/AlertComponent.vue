<template>
    <div>
        <v-alert
        :value="alert"
      dismissible
      dense
      width="400"
      rounded="lg"
      :color="color"
      @input="closeDialog"
      class="alert"
      border="left"
      elevation="10"
      transition="scroll-x-reverse-transition"
      colored-border
    >
    <small>
      {{ text }}
    </small>
    </v-alert>
    </div>
</template>
<script>
export default {
  name: 'AlertComponent',
  props: {
    alert: {
      type: Boolean,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close-dialog')
    },
    hideAlert () {
      setTimeout(() => {
        this.alert = false
      }, 2500)
    }
  },
  computed: {
    color () {
      if (this.type === 'success') {
        return 'green lighten-2'
      } else if (this.type === 'error') {
        return 'error lighten-2'
      } else if (this.type === 'warning') {
        return 'warning lighten-2'
      } else {
        return 'primary'
      }
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss">
.alert {
    position: relative;
    right: 0;
    margin-left: auto;
    z-index: 100;
}

</style>
