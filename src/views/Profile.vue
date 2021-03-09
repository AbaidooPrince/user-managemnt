<template>
    <div>
        <v-row>
            <v-col cols="4">
        <v-list v-model="link">
            <v-list-item link
            active-class="primary"
            value="1"
            to="/profile"
            >
                <v-list-item-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title> General
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link
            value="2"
            to="/profile/education"
            >
                <v-list-item-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title> Education
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link
            value="2"
            to="/profile/employment"
            >
                <v-list-item-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title> Employment
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
            </v-col>
            <v-col cols="8">
                <router-view>
                </router-view>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
  name: 'Profile',
  data () {
    return {
      link: null
    }
  }
}
</script>
