<template>
  <div>
      <v-card rounded="lg">
                  <v-img src="../../assets/4148.jpg"
                    cover
                    position="center center"
                    height="70"
                  >
                  </v-img>
          <v-card-title class="pl-4 pr-4">Create New Group
          </v-card-title>
          <v-card-subtitle class="pl-4 pr-4">Enter details of new group you want to create</v-card-subtitle>
          <v-card-text class="pa-4">
      <v-form>
          <v-row justify="center">
            <v-col cols="12" md="6" sm="12" class="pb-0 pt-0">
                <label>Group Name</label>
                <v-text-field
                class="v-text-field"
                outlined
                dense
                v-model="newGroup.groupName"
                >
                </v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12" class="pb-0 pt-0">
                <label>URL</label>
                <v-text-field
                class="v-text-field"
                outlined
                dense
                v-model="newGroup.groupUrl"
                >
                </v-text-field>
            </v-col>
            <v-col cols="12" class="pb-0 pt-0">
                <label>About</label>
                <v-textarea
                class="v-text-field"
                outlined
                dense
                v-model="newGroup.groupDescription"
                >
                </v-textarea>
            </v-col>
          </v-row>
      </v-form>
          </v-card-text>
          <v-card-actions class="pa-4">
              <v-row justify="end">
                  <v-col cols="auto">
                      <v-btn @click="closeDialog" text>Cancel</v-btn>
                  </v-col>
                  <v-col cols="6">
                      <v-btn outlined>Create</v-btn>
                  </v-col>
              </v-row>
          </v-card-actions>
      </v-card>
  </div>
</template>

<script>
export default {
  name: 'NewGroupForm',
  props: ['editMode'],
  data () {
    return {
      // eslint-disable-next-line no-undef
      newGroup: new Form({
        groupName: null,
        groupDescription: null,
        groupUrl: null
      })
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close-dialog')
    }
  }
}
</script>

<style>

</style>
