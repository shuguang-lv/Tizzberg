import { isString, isArray } from 'lodash'

export default class User {
  constructor(user = {}) {
    this.username = isString(user.username) ? user.username : ''
    this.password = isString(user.password) ? user.password : ''
    this.firstName = isString(user.firstName) ? user.firstName : ''
    this.lastName = isString(user.lastName) ? user.lastName : ''
    this.picture = isString(user.picture) ? user.picture : ''
    this.email = isString(user.email) ? user.email : ''
    this.currentIdentity = isString(user.currentIdentity)
      ? user.currentIdentity
      : ''
    this.followedTags = isArray(user.followedTags) ? user.followedTags : []
    this.savedPosts = isArray(user.savedPosts) ? user.savedPosts : []
  }
}
