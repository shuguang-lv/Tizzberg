export const AV = require('leancloud-storage');
const Post = AV.Status.extend('Post');

export async function addPost({title="",content="",deleted=false,author='',view_count=0,likes=0,tag=[],visibility=''}) {
    const post = new Post()
    post.set('title', title)
    post.set('content', content)
    post.set('deleted', deleted)
    post.set('author', author)
    post.set('view_count', view_count)
    post.set('likes', likes)
    post.set('tag', tag)
    post.set('visibility', visibility)
    return post.save()
}

export async function deletePost({objectId=''}) {
    const post = AV.Status.createWithoutData('Post', objectId);
    return post.destroy();
}

/**
 * change the pinned status of post
 * @returns 
 */
export async function pinPost(config,postId) {
    const user = AV.User.current();
    user.add('pinned',postId);
    return user.save(null,config);
}

export async function editPost(objectId,config,{title,content,deleted,author,view_count,likes,tag,visibility,pinned}) {
    const post = AV.Object.createWithoutData('Post', objectId);
    if (title) {post.set('title', title)}
    if (content) {post.set('content', content)}
    if (deleted) {post.set('deleted', deleted)}
    if (author) {post.set('author', author)}
    if (view_count) {post.set('view_count', view_count)}
    if (likes) {post.set('likes', likes)}
    if (tag) {post.set('tag', tag)}
    if (visibility) {post.set('visibility', visibility)}
    if (pinned) {post.set('pinned', pinned)}
    return post.save(null,config);
}

/**
 * like a post
 * @returns 
 */
 export async function likePost(config,postId) {
    const user = AV.User.current();
    const post = AV.Status.createWithoutData('Post', postId);
    user.add('like',postId);
    post.increment('likes',1)
    user.save(null,config);
    post.save(null,config);
}

/**
 * unlike a post
 * @returns 
 */
 export async function unlikePost(config,postId) {
    const user = AV.User.current();
    const post = AV.Status.createWithoutData('Post', postId);
    user.add('like',postId);
    post.increment('likes',-1)
    user.save(null,config);
    post.save(null,config);
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
    return query.find()
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