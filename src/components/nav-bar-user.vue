<script>
import IdentityEditor from './identity-editor.vue'

export default {
  name: 'NavBarUser',
  components: {
    IdentityEditor,
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    openLogoutDialog() {
      this.$dialog({
        title: 'Logout',
        content: 'Are you sure you want to log out?',
        confirmButton: {
          action: (async () => {
            try {
              await this.$user.logOut()
              this.$root.currentUser = null
              this.$root.currentCharacter = {}
              this.$root.characters = []
              this.$router.push({ name: 'login' })
            } catch (error) {
              console.log(error)
            }
          }).bind(this),
        },
      })
    },
  },
}
</script>

<template>
  <div class="d-flex align-center">
    <identity-editor ref="identity"></identity-editor>

    <v-btn
      v-if="!$root.currentUser"
      depressed
      large
      color="primary"
      width="100"
      :to="{ name: 'login' }"
      >Login</v-btn
    >
    <v-btn
      v-if="!$root.currentUser"
      class="mr-4 ml-8"
      depressed
      large
      outlined
      color="primary"
      width="100"
      :to="{ name: 'signup' }"
      >Signup</v-btn
    >

    <v-menu
      v-if="$root.currentUser"
      offset-y
      left
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-avatar color="primary" size="56" v-bind="attrs" v-on="on"
          ><v-img
            :src="`https://avatars.dicebear.com/api/micah/${$root.currentCharacter.objectId}.svg`"
            alt="John"
          ></v-img
        ></v-avatar>
      </template>

      <v-card class="pb-2" width="350" flat>
        <v-sheet color="primary" class="white--text">
          <v-card-title> {{ $root.currentCharacter.name }} </v-card-title>
          <v-card-subtitle> a cool man </v-card-subtitle>
        </v-sheet>

        <v-list>
          <v-list-item color="primary" :to="{ name: 'profile' }" two-line>
            <v-list-item-icon class="ma-auto mr-4">
              <v-icon color="primary" large>mdi-account-eye-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>My Profile</v-list-item-title>
              <v-list-item-subtitle
                >view personal profile details</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item color="primary" link two-line>
            <v-list-item-icon class="ma-auto mr-4">
              <v-icon color="primary" large>mdi-account-edit-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Account Settings</v-list-item-title>
              <v-list-item-subtitle
                >manage your account parameters</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            color="primary"
            link
            two-line
            @click="$refs['identity'].show()"
          >
            <v-list-item-icon class="ma-auto mr-4">
              <v-icon color="primary" large>mdi-account-switch-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Character</v-list-item-title>
              <v-list-item-subtitle>switch your character</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>

        <v-card-actions class="d-flex justify-center">
          <v-btn
            color="primary"
            depressed
            class="pa-4"
            link
            @click="openLogoutDialog"
          >
            Sign out <v-icon class="ml-2">mdi-logout</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>

    <div v-if="$root.currentUser" class="text-h5 mx-4">
      {{ $root.currentCharacter.name }}
    </div>

    <v-btn icon large :to="{ name: 't-square' }" color="primary" class="mx-4">
      <v-icon>mdi-home-outline</v-icon>
    </v-btn>

    <v-menu
      v-if="$root.currentUser"
      offset-y
      left
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon large color="primary" class="mx-4" v-bind="attrs" v-on="on">
          <v-badge dot color="warning">
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-card width="350" flat>
        <v-sheet
          color="primary"
          class="white--text d-flex justify-space-between align-center pr-4"
        >
          <v-card-title> All Notifications </v-card-title>
          <v-sheet
            color="white"
            height="25"
            rounded
            width="25"
            class="secondary--text text-center font-weight-bold"
            >3</v-sheet
          >
        </v-sheet>

        <v-list>
          <div v-for="n in 3" :key="n">
            <v-list-item color="primary" two-line>
              <v-list-item-icon class="ma-auto mr-4">
                <v-avatar color="primary" size="40" rounded="lg"
                  ><v-img
                    src="https://avatars.dicebear.com/api/micah/user.svg"
                  ></v-img
                ></v-avatar>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-wrap"
                  >some kind of event</v-list-item-title
                >
                <v-list-item-subtitle class="d-flex justify-space-between">
                  <div>Michael</div>
                  <div>10min</div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list>
      </v-card>
    </v-menu>

    <v-menu
      v-if="$root.currentUser"
      offset-y
      left
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon large color="primary" class="mx-4" v-bind="attrs" v-on="on">
          <v-badge dot color="warning">
            <v-icon>mdi-email-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-card width="350" flat>
        <v-sheet
          color="primary"
          class="white--text d-flex justify-space-between align-center pr-4"
        >
          <v-card-title> All Messages </v-card-title>
          <v-sheet
            color="white"
            height="25"
            rounded
            width="25"
            class="secondary--text text-center font-weight-bold"
            >3</v-sheet
          >
        </v-sheet>

        <v-list>
          <div v-for="n in 3" :key="n">
            <v-list-item color="primary" two-line>
              <v-list-item-icon class="ma-auto mr-4">
                <v-avatar color="primary" size="40" rounded="lg"
                  ><v-img
                    src="https://avatars.dicebear.com/api/micah/user.svg"
                  ></v-img
                ></v-avatar>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>some messages</v-list-item-title>
                <v-list-item-subtitle class="d-flex justify-space-between">
                  <div>Michael</div>
                  <div>10min</div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<style lang="scss" scoped></style>
