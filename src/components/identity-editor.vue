<script>
import Character from '@/models/Character'

export default {
  name: 'IdentityEditor',
  data() {
    return {
      creatingCharacter: false,
      showDialog: false,
      newCharacter: new Character({
        userId: this.$root.currentUser ? this.$root.currentUser.objectId : '',
      }),
      nameRules: [
        (v) => !!v || 'Username is required',
        (v) =>
          /(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$/g.test(v) ||
          'Name must be 3-20 characters long and can only contain letters, numbers, underscores, dashes, and periods',
      ],
    }
  },
  computed: {},
  methods: {
    show() {
      this.showDialog = true
    },
    isCurrentCharacter(character) {
      return character.objectId === this.$root.currentCharacter.objectId
    },
    async createIdentity() {
      this.creatingCharacter = true
      if (this.$refs.form.validate()) {
        try {
          await this.$root.createCharacter(this.newCharacter)
          this.newCharacter = new Character({
            userId: this.$root.currentUser
              ? this.$root.currentUser.objectId
              : '',
          })
        } catch (error) {
          console.log(error)
          this.$snackbar.error(error.rawMessage)
        }
      }
      this.creatingCharacter = false
    },
    async switchIdentity(characterId) {
      this.$overlay.open()
      try {
        await this.$root.switchCharacter(characterId)
        this.$overlay.close()
      } catch (error) {
        console.log(error)
        this.$overlay.close()
        this.$snackbar.error(error.rawMessage)
      }
    },
    async deleteIdentity(characterId, characterName) {
      this.$dialog({
        title: 'Delete identity',
        content:
          'Are you sure you want to delete this identity? Everything of this identity would be deleted, included posts and comments.',
        cancelButton: {
          text: 'Nevermind',
        },
        confirmButton: {
          text: 'Sure',
          action: async () => {
            this.$overlay.open()
            try {
              await this.$root.deleteCharacter(characterId)
              this.$overlay.close()
              this.$snackbar.warn(`Character ${characterName} was deleted`)
            } catch (error) {
              console.log(error)
              this.$overlay.close()
              this.$snackbar.error(error.rawMessage)
            }
          },
        },
      })
    },
  },
}
</script>

<template>
  <v-dialog v-model="showDialog" max-width="500">
    <v-card tile>
      <v-card-title class="text-h5 secondary--text">
        Switch your identity (character)
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-8 pb-0">
        <v-sheet
          v-for="character in $root.characters"
          :key="character.name"
          class="d-flex justify-space-between align-center mb-6 pa-3"
          rounded
          :color="isCurrentCharacter(character) ? 'primary' : 'background'"
        >
          <div>
            <v-avatar color="primary" size="50" class="mr-4">
              <v-img
                src="https://avatars.dicebear.com/api/micah/character.svg"
              ></v-img
            ></v-avatar>
            <span
              class="text-subtitle-1"
              :class="[
                isCurrentCharacter(character)
                  ? 'white--text'
                  : 'tertiary--text',
              ]"
              >{{ character.name }}</span
            >
          </div>
          <div>
            <v-btn
              icon
              color="success"
              class="mr-4"
              :disabled="isCurrentCharacter(character)"
              @click="switchIdentity(character.objectId)"
            >
              <v-icon>mdi-swap-horizontal</v-icon>
            </v-btn>
            <v-btn
              icon
              color="warning"
              :disabled="isCurrentCharacter(character)"
              @click="deleteIdentity(character.objectId, character.name)"
            >
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </div>
        </v-sheet>
      </v-card-text>
      <v-divider></v-divider>
      <v-form
        ref="form"
        lazy-validation
        class="pa-6 d-flex flex-column align-center"
      >
        <v-text-field
          v-model="newCharacter.name"
          :rules="nameRules"
          :disabled="creatingCharacter || $root.characters.length >= 3"
          label="Enter name of your new identity"
          hide-details="auto"
          full-width
          outlined
          clearable
          style="width: 100%"
        ></v-text-field>
        <v-btn
          depressed
          large
          color="primary"
          class="px-4 mt-4"
          :disabled="$root.characters.length >= 3"
          :loading="creatingCharacter"
          @click="createIdentity"
        >
          Create
          <v-icon right class="ml-4">mdi-account-multiple-plus-outline</v-icon>
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
