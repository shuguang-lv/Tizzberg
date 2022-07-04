import { deleteObj, sleep } from './common'

const AV = require('leancloud-storage')
const Reply = AV.Object.extend('Reply')

export async function fetchPostReplies(postId = '') {
  await sleep(100)
  const query = new AV.Query('Reply')
  query.equalTo('targetId', postId)
  query.equalTo('targetClass', 'Post')
  query.descending('createdAt')
  return query.find()
}

export async function replyToPost(replyObj) {
  const reply = new Reply()
  reply.set(replyObj)
  return reply.save()
}

export async function deleteComment({ objectId = '' }) {
  deleteObj(objectId, 'Comment')
}

export async function editComment(
  objectId,
  config,
  { parent, content, deleted, author, view_count, likeUser, tag, visibility }
) {
  console.log(likeUser, tag, visibility)
  const query = new AV.Query('Comment')
  query.equalTo('objectId', objectId)
  query.find().then((res) => {
    const comment = res
    if (parent) {
      comment.set('parent', parent)
    }
    if (content) {
      comment.set('content', content)
    }
    if (deleted) {
      comment.set('deleted', deleted)
    }
    if (author) {
      comment.set('author', author)
    }
    if (view_count) {
      comment.set('view_count', view_count)
    }
  })
}

/**
 * like a comment
 * @returns
 */
//  export async function likeComment(config,commentId,userId) {
//     const user = AV.User.current();
//     const query = new AV.Query('Comment');
//     query.equalTo('objectId', commentId);
//     query.find().then((res) => {
//         const comment = res
//         comment.add('likeUser',userId);
//         comment.save(null,config);
//       });
// }

/**
 * unlike a comment
 * @returns
 */
//  export async function unlikeComment(config,commentId,userId) {
//     const query = new AV.Query('Comment');
//     query.equalTo('objectId', commentId);
//     query.find().then((res) => {
//         const comment = res
//         comment.remove('likeUser',userId)
//         comment.save(null,config);
//       });
// }

/**
 * hide a comment
 * @returns
 */
//  export async function hideComment(config,commentId) {
//     const user = AV.User.current();
//     user.add('hidedComment',commentId);
//     user.save(null,config);
// }

/**
 * save a comment
 * @returns
 */
//  export async function saveComment(config,commentId) {
//     const user = AV.User.current();
//     user.add('savedComment',commentId);
//     user.save(null,config);
// }

/**
 *
 * @returns
 */
export async function getAllComment() {
  const query = new AV.Query('Comment')
  return query.find()
}

/**
 *
 * @returns
 */
export async function getChildComment(parentId) {
  const query = new AV.Query('Comment')
  query.equalTo('parent', parentId)
  return query.find()
}
