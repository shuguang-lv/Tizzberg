const AV = require('leancloud-storage')
const Like = AV.Object.extend('Like')

export async function countLikes(postId = '') {
  const query = new AV.Query('Like');
  query.equalTo('targetId', postId);
  query.equalTo('targetClass', 'Post');
  return query.count();
}

export async function likePost(likeInfo) {
  const like = new Like()
  like.set(likeInfo)
  return like.save()
}

export async function unlikePost(likeId = '') {
  const like = AV.Object.createWithoutData('Like', likeId);
  return like.destroy()
}

export async function checkPostLiked(userId = '', postId = '') {
  const query = new AV.Query('Like');
  query.equalTo('userId', userId);
  query.equalTo('targetId', postId);
  query.equalTo('targetClass', 'Post');
  return query.first()
}