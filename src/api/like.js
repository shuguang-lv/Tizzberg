import { throttle } from 'lodash'
import { THROTTLE_WAIT, sleep, SLEEP_TIME } from './common'

const AV = require('leancloud-storage')
const Like = AV.Object.extend('Like')

export const countLikes = throttle(async (postId = '') => {
  await sleep(SLEEP_TIME)
  const query = new AV.Query('Like')
  query.equalTo('targetId', postId)
  query.equalTo('targetClass', 'Post')
  return query.count()
}, THROTTLE_WAIT)

export async function likePost(likeInfo) {
  const like = new Like()
  like.set(likeInfo)
  return like.save()
}

export async function unlikePost(likeId = '') {
  const like = AV.Object.createWithoutData('Like', likeId)
  return like.destroy()
}

export const checkPostLiked = throttle(async (characterId = '', postId = '') => {
  await sleep(SLEEP_TIME)
  const query = new AV.Query('Like')
  query.equalTo('characterId', characterId)
  query.equalTo('targetId', postId)
  query.equalTo('targetClass', 'Post')
  return query.first()
}, THROTTLE_WAIT)
