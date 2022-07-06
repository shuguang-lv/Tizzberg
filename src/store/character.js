import { defineStore } from 'pinia'
import { fetchCharacter, fetchCharacters, setCurrentCharacter, createCharacter, deleteCharacter } from '@/api/user'

// const AV = require('leancloud-storage')
// const user = AV.User.current().toJSON()

export const useCharacterStore = defineStore('character', {
  persist: true,
  state: () => ({
    currentCharacter: null,
    characters: [
      {
        name: 'Painter',
        picture: 'mdi-palette-outline',
      },
      {
        name: 'Musician',
        picture: 'mdi-music-clef-treble',
      },
      {
        name: 'Scientist',
        picture: 'mdi-atom',
      },
    ],
  }),
  getters: {
    // doubleCounter(state) {
    //   return state.counter * 2
    // },
  },
  actions: {
    async getCharacters(userId) {
      try {
        const characters = await fetchCharacters(userId)
        this.characters = characters.map(character => character.toJSON())
      } catch (error) {
        console.log(error);
      }
    },
    async switchCharacter(userId, characterId) {
      try {
        await setCurrentCharacter(userId, characterId)
        const character = await fetchCharacter(characterId)
        this.currentCharacter = character.toJSON()
      } catch (error) {
        console.log(error);
      }
    },
    async createCharacter(userId, characterObj) {
      try {
        await createCharacter(characterObj)
        await this.getCharacters(userId)
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCharacter(userId, characterId) {
      try {
        await deleteCharacter(characterId)
        await this.getCharacters(userId)
      } catch (error) {
        console.log(error);
      }
    }
  },
})
