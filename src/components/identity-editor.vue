<script>
import { mapState, mapActions } from 'pinia'
import { useCharacterStore } from '@/store/character'
import Character from '@/models/Character'

export default {
  name: 'IdentityEditor',
  data() {
    return {
      showDialog: false,
      newCharacter: new Character({
        userId: this.$root.currentUser ? this.$root.currentUser.objectId : '',
      }),
    }
  },
  computed: {
    ...mapState(useCharacterStore, ['currentCharacter', 'characters']),
  },
  methods: {
    ...mapActions(useCharacterStore, [
      'getCharacters',
      'switchCharacter',
      'createCharacter',
      'deleteCharacter',
    ]),
    show() {
      this.showDialog = true
    },
    async deleteCharacter() {
      this.$dialog({
        title: 'Delete identity',
        content:
          'Are you sure you want to delete this identity? Everything of this identity would be deleted, included posts and comments.',
        cancelButton: {
          text: 'Nevermind',
          action: () => {},
        },
        confirmButton: {
          text: 'Sure',
          action: () => {},
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
        <div
          v-for="character in characters"
          :key="character.name"
          class="d-flex justify-space-between align-center mb-8"
        >
          <div>
            <v-avatar color="primary" size="50" class="mr-4">
              <v-img
                src="https://avatars.dicebear.com/api/micah/character.svg"
              ></v-img
            ></v-avatar>
            <span class="text-subtitle-1 tertiary--text">{{
              character.name
            }}</span>
          </div>
          <v-btn icon color="grey" @click="deleteCharacter">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="py-4 d-flex justify-center">
        <v-text-field
          label="Enter name of your new identity"
          hide-details
          outlined
        ></v-text-field>
        <v-btn depressed large color="primary" class="px-4 ml-4">
          Create
          <v-icon right class="ml-4">mdi-account-multiple-plus-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
