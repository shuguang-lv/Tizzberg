// import {
//   fetchCharacter,
//   fetchCharacters,
//   setCurrentCharacter,
//   createCharacter,
//   deleteCharacter,
// } from '@/api/user'

// export default {
//   data() {
//     return {
//       currentCharacter: {},
//       characters: {},
//     }
//   },
//   methods: {
//     async getCharacters() {
//       try {
//         const characters = await fetchCharacters(this.currentUser.objectId)
//         this.characters = characters.map((character) => character ? character.toJSON() : null)
//       } catch (error) {
//         console.log(error)
//       }
//     },
//     async switchCharacter(characterId) {
//       try {
//         await setCurrentCharacter(this.currentUser.objectId, characterId)
//         const character = await fetchCharacter(characterId)
//         this.currentCharacter = character ? character.toJSON() : {}
//       } catch (error) {
//         console.log(error)
//       }
//     },
//     async createCharacter(characterObj) {
//       try {
//         await createCharacter(characterObj)
//         await this.getCharacters(this.currentUser.objectId)
//       } catch (error) {
//         console.log(error)
//       }
//     },
//     async deleteCharacter(characterId) {
//       try {
//         await deleteCharacter(characterId)
//         await this.getCharacters(this.currentUser.objectId)
//       } catch (error) {
//         console.log(error)
//       }
//     },
//   }
// }