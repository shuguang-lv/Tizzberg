import { memoize, throttle } from 'lodash'
import { THROTTLE_WAIT, sleep, SLEEP_TIME } from './common'

const AV = require('leancloud-storage')
const Character = AV.Object.extend('Character')

// memoize.Cache = WeakMap

export async function signUpUser(userObj) {
  const user = new AV.User()
  user.set(userObj)
  user.setUsername(userObj.username)
  user.setEmail(userObj.email)
  user.setPassword(userObj.password)
  return user.signUp()
}

export async function logInUser(identifier, password) {
  if (/.+@.+\..+/.test(identifier)) {
    // email
    return AV.User.loginWithEmail(identifier, password)
  } else {
    // username
    return AV.User.logIn(identifier, password)
  }
}

const _fetchUser = throttle(async (userId = 'random') => {
  await sleep(SLEEP_TIME)
  const query = new AV.Query('_User')
  try {
    const user = await query.get(userId)
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}, THROTTLE_WAIT)

export const fetchUserMemo = memoize(_fetchUser)

export const fetchUser = _fetchUser

export async function deleteCurrentUser(userId) {
  const user = AV.User.current()
  if (user.get('objectId') !== userId) {
    return Promise.reject('user not match')
  }
  // delete all characters of this user
  try {
    const characters = await fetchCharacters(userId)
    await AV.Object.destroyAll(characters)
  } catch (error) {
    return Promise.reject(error)
  }
  return user.destroy()
}

const _fetchCharacter = throttle(async (characterId) => {
  await sleep(SLEEP_TIME)
  const query = new AV.Query('Character')
  try {
    const character = await query.get(characterId)
    return character
  } catch (error) {
    console.log(error)
    return null
  }
}, THROTTLE_WAIT)

export const fetchCharacterMemo = memoize(_fetchCharacter)

export const fetchCharacter = _fetchCharacter

export async function fetchCharacters(userId) {
  const query = new AV.Query('Character')
  query.equalTo('userId', userId)
  return query.find()
}

export async function setCurrentCharacter(userId, characterId) {
  const user = await _fetchUser(userId)
  user.set('currentCharacter', characterId)
  return user.save()
}

export async function createCharacter(characterObj) {
  const character = new Character()
  character.set(characterObj)
  return character.save()
  // const currentUserId = AV.User.current().get('objectId')
  // if (character.get('userId') === currentUserId) {
  //   return character.save()
  // } else {
  //   return Promise.reject('user not match')
  // }
}

export async function deleteCharacter(characterId) {
  const character = AV.Object.createWithoutData('Character', characterId)
  return character.destroy()
}

/************************************************************************* */

//TODO: authentication ?
export async function editUser(
  config,
  {
    username,
    firstName,
    lastName,
    identity,
    currentIdentity,
    email,
    emailVerified,
    mobilePhoneNumber,
    followedTag,
    savedPost,
  }
) {
  const user = AV.User.current()
  if (username) {
    user.set('username', username)
  }
  if (firstName) {
    user.set('firstName', firstName)
  }
  if (lastName) {
    user.set('lastName', lastName)
  }
  if (identity) {
    user.set('identity', identity)
  }
  if (currentIdentity) {
    user.set('currentIdentity', currentIdentity)
  }
  if (email) {
    user.set('email', email)
  }
  if (emailVerified) {
    user.set('emailVerified', emailVerified)
  }
  if (mobilePhoneNumber) {
    user.set('mobilePhoneNumber', mobilePhoneNumber)
  }
  if (followedTag) {
    user.set('followedTag', followedTag)
  }
  if (savedPost) {
    user.set('followedTag', savedPost)
  }
  return user.save(null, config)
}

export async function emailVerify(email) {
  return AV.User.requestEmailVerify(email)
}

export async function passwordResetByEmail(email) {
  return AV.User.requestPasswordReset(email)
}

export async function createIdentity(identity, config) {
  const user = AV.User.current()
  if (identity) {
    identity.add('identity', identity)
  }
  return user.save(null, config)
}

export async function changeIdentity(identity, config) {
  const user = AV.User.current()
  if (identity) {
    user.set('currentIdentity', identity)
  }
  return user.save(null, config)
}

export async function getUserPost(objectId) {
  const query_user = new AV.Query('_User')
  const author = query_user.equalTo('objectId', objectId)
  const query_post = new AV.Query('Post')
  query_post.equalTo('author', author)
  return query_post.find()
}

export async function getUserFiction() {
  const author = AV.User.current()
  const query = new AV.Query('Fiction')
  query.equalTo('author', author)
  return query.find()
}

export async function getAllMessage() {
  let query = AV.Status.inboxQuery(AV.User.current(), 'private')
  return query.find()
}

export async function getUnreadMessageCount() {
  let res = AV.Status.countUnreadStatuses(AV.User.current(), 'private')
  return res
}

export async function followUser(user_object_id) {
  //TODO: verify user id
  return AV.User.current().follow(user_object_id)
}

export async function unfollowUser(user_object_id) {
  return AV.User.current().unfollow(user_object_id)
}

export async function getAllFollower() {
  var query = AV.User.current().followerQuery()
  query.include('follower')
  return query.find()
}

export async function getAllFollowee() {
  var query = AV.User.current().followeeQuery()
  query.include('followee')
  return query.find()
}

export async function getCurrentUser() {
  console.log(AV.User.current())
  return await AV.User.current()
}
