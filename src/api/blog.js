import { deleteObj } from './common'
const AV = require('leancloud-storage')
const Blog = AV.Object.extend('Blog')

export async function createBlog(blogObj) {
  const blog = new Blog()
  blog.set(blogObj)
  return blog.save()
}

export async function getBlogList(filter = 'hot') {
  const query = new AV.Query('Blog')
  query.equalTo('deleted', false)
  query.equalTo('visibility', 'public')
  switch (filter) {
    case 'hot':
      break
    case 'following':
      break
    case 'latest':
      query.descending('createdAt')
      break
    default:
      break
  }
  return await query.find()
}

export async function deleteBlog(blogId = '') {
  return deleteObj(blogId, 'Blog')
}

/**
 * change the pinned status of blog
 * @returns
 */
export async function pinBlog() {
  // const user = AV.User.current();
  // user.add('pinned',blogId);
  // return user.save(null,config);
}

export async function editBlog(
  objectId,
  config,
  { title, content, deleted, author, view_count, likeUser, tag, visibility }
) {
  const query = new AV.Query('Blog')
  query.equalTo('objectId', objectId)
  query.find().then((res) => {
    const blog = res
    if (title) {
      blog.set('title', title)
    }
    if (content) {
      blog.set('content', content)
    }
    if (deleted) {
      blog.set('deleted', deleted)
    }
    if (author) {
      blog.set('author', author)
    }
    if (view_count) {
      blog.set('view_count', view_count)
    }
    if (likeUser) {
      blog.set('likeUser', likeUser)
    }
    if (tag) {
      blog.set('tag', tag)
    }
    if (visibility) {
      blog.set('visibility', visibility)
    }
    return blog.save(null, config)
  })
}

/**
 * like a blog
 * @returns
 */
export async function likeBlog(config, blogId, userId) {
  const query = new AV.Query('Blog')
  query.equalTo('objectId', blogId)
  query.find().then((res) => {
    const blog = res
    blog.add('likeUser', userId)
    blog.save(null, config)
  })
}

/**
 * unlike a blog
 * @returns
 */
export async function unlikeBlog(config, blogId, userId) {
  const query = new AV.Query('Blog')
  query.equalTo('objectId', blogId)
  query.find().then((res) => {
    const blog = res
    blog.remove('likeUser', userId)
    blog.save(null, config)
  })
}

/**
 * hide a blog
 * @returns
 */
export async function hideBlog(config, blogId) {
  const user = AV.User.current()
  user.add('hidedBlog', blogId)
  user.save(null, config)
}

/**
 * save a blog
 * @returns
 */
export async function saveBlog(config, blogId) {
  const user = AV.User.current()
  user.add('savedBlog', blogId)
  user.save(null, config)
}

/**
 *
 * @param {*} classify the blogs with different visibilities
 * @returns
 */
export async function getVisibityBlog(visibility) {
  const query = new AV.Query('Blog')
  query.equalTo('visibility', visibility)
  return query.find()
}
