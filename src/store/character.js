import { defineStore } from 'pinia'
import { fetchCharacter, fetchCharacters, setCurrentCharacter, createCharacter, deleteCharacter } from '@/api/user'

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
        this.characters = await fetchCharacters(userId)
      } catch (error) {
        console.log(error);
      }
    },
    async switchCharacter(userId, characterId) {
      try {
        await setCurrentCharacter(userId, characterId)
        this.currentCharacter = await fetchCharacter(characterId)
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
