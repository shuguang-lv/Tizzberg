import { isString } from 'lodash'

export default class Character {
  constructor(character = {}) {
    this.name = isString(character.name) ? character.name : ''
    this.picture = isString(character.picture) ? character.picture : ''
    this.userId = isString(character.userId) ? character.userId : ''
  }
}
