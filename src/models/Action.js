import { isString } from 'lodash'

export default class Action {
  constructor(action = {}) {
    this.userId = isString(action.userId) ? action.userId : ''
    this.characterId = isString(action.characterId) ? action.characterId : ''
    this.targetId = isString(action.targetId) ? action.targetId : ''
    this.targetClass = isString(action.targetClass) ? action.targetClass : ''
    this.type = isString(action.type) ? action.type : ''
    this.content = isString(action.content) ? action.content : ''
    this.status = isString(action.status) ? action.status : ''
  }
}
