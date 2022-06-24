import { is } from 'ramda'

export default class User {
  constructor (user = {}) {
    this.username = is(String, user.username) ? user.username : ''
    this.firstName = is(String, user.firstName) ? user.firstName : ''
    this.lastName = is(String, user.lastName) ? user.lastName : ''
    this.dob = is(String, user.dob) ? user.dob : ''
    this.currentIdentity = is(String, user.currentIdentity) ? user.currentIdentity : ''
    this.identity = is(String, user.identity) ? user.identity : []
    this.followedTag = is(String, user.followedTag) ? user.followedTag : []
    this.savedPost = is(String, user.savedPost) ? user.savedPost : []
  }
}
