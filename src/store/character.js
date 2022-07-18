import { defineStore } from 'pinia'
import {
  fetchCharacter,
  fetchCharacters,
  setCurrentCharacter,
  createCharacter,
  deleteCharacter,
} from '@/api/user'

const AV = require('leancloud-storage')
const user = AV.User.current() ? AV.User.current().toJSON() : null

export const useCharacterStore = defineStore('character', {
  persist: true,
  state: async () => {
    const character = user ? await fetchCharacter(user.currentCharacter) : null
    const characters = user ? await fetchCharacters(user.objectId) : null
    return {
      currentCharacter: character ? character.toJSON() : {},
      characters:
        characters && characters.length > 0
          ? characters.map((c) => c.toJSON())
          : [],
    }
  },
  getters: {
    // doubleCounter(state) {
    //   return state.counter * 2
    // },
  },
  actions: {
    async getCharacters(userId) {
      try {
        const characters = await fetchCharacters(userId)
        this.characters = characters.map((character) => character ? character.toJSON() : null)
      } catch (error) {
        console.log(error)
      }
    },
    async switchCharacter(userId, characterId) {
      try {
        await setCurrentCharacter(userId, characterId)
        const character = await fetchCharacter(characterId)
        this.currentCharacter = character ? character.toJSON() : {}
      } catch (error) {
        console.log(error)
      }
    },
    async createCharacter(userId, characterObj) {
      try {
        await createCharacter(characterObj)
        await this.getCharacters(userId)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteCharacter(userId, characterId) {
      try {
        await deleteCharacter(characterId)
        await this.getCharacters(userId)
      } catch (error) {
        console.log(error)
      }
    },
  },
})
