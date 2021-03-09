<template>
    <div>
        <v-toolbar class="header">
            <slot name="header"></slot>
        </v-toolbar>
        <v-main class="">
            <slot>
            </slot>
        </v-main>
        <v-footer>
            <slot name="footer">
            </slot>
        </v-footer>
    </div>
</template>
<script>
export default {
  name: 'AppLayout'
}
</script>
<style>
.header {
    height: 10vh;
    max-height: 20vh;
    width: 30vw;
}
.footer {
    position: absolute;
}

</style>
