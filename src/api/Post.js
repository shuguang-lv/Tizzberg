import { deleteObj } from '../api/common'
export const AV = require('leancloud-storage');
const Post = AV.Object.extend('Post');

export async function addPost(post_info) {
    const post = new Post()
    // post.set('title', title)
    // post.set('content', content)
    // post.set('deleted', deleted)
    // post.set('author', author)
    // post.set('view_count', view_count)
    // post.set('likeUser', likeUser)
    // post.set('tag', tag)
    // post.set('visibility', visibility)
    post.set(post_info)
    return post.save()
}

export async function deletePost(objectId='') {
    deleteObj(objectId,'Post')
}

/**
 * change the pinned status of post
 * @returns 
 */
export async function pinPost() {
    // const user = AV.User.current();
    // user.add('pinned',postId);
    // return user.save(null,config);
}

export async function editPost(objectId,config,{title,content,deleted,author,view_count,likeUser,tag,visibility}) {
    const query = new AV.Query('Post');
    query.equalTo('objectId', objectId);
    query.find().then((res) => {
        const post = res
        if (title) {post.set('title', title)}
        if (content) {post.set('content', content)}
        if (deleted) {post.set('deleted', deleted)}
        if (author) {post.set('author', author)}
        if (view_count) {post.set('view_count', view_count)}
        if (likeUser) {post.set('likeUser', likeUser)}
        if (tag) {post.set('tag', tag)}
        if (visibility) {post.set('visibility', visibility)}
        return post.save(null,config);
      });
}

/**
 * like a post
 * @returns 
 */
 export async function likePost(config,postId,userId) {
    const query = new AV.Query('Post');
    query.equalTo('objectId', postId);
    query.find().then((res) => {
        const post = res
        post.add('likeUser',userId);
        post.save(null,config);
      });
}

/**
 * unlike a post
 * @returns 
 */
 export async function unlikePost(config,postId,userId) {
    const query = new AV.Query('Post');
    query.equalTo('objectId', postId);
    query.find().then((res) => {
        const post = res
        post.remove('likeUser',userId)
        post.save(null,config);
      });
}

/**
 * hide a post
 * @returns 
 */
 export async function hidePost(config,postId) {
    const user = AV.User.current();
    user.add('hidedPost',postId);
    user.save(null,config);
}

/**
 * save a post
 * @returns 
 */
 export async function savePost(config,postId) {
    const user = AV.User.current();
    user.add('savedPost',postId);
    user.save(null,config);
}

/**
 * 
 * @returns 
 */
export async function getAllPost() {
    const query = new AV.Query('Post');
    return await query.find()
}

/**
 * 
 * @param {*} classify the posts with different visibilities
 * @returns 
 */
export async function getVisibityPost(visibility) {
    const query = new AV.Query('Post');
    query.equalTo('visibility', visibility);
    return query.find()
}