import { isString } from 'lodash'

export default class Action {
  constructor(action = {}) {
    this.userId = isString(action.userId) ? action.userId : ''
    this.userCharacterId = isString(action.userCharacterId) ? action.userCharacterId : ''
    this.targetId = isString(action.targetId) ? action.targetId : ''
    this.targetClass = isString(action.targetClass) ? action.targetClass : ''
    this.content = isString(action.content) ? action.content : ''
    this.status = isString(action.status) ? action.status : ''
  }
}
