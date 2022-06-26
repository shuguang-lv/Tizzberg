import { isString, isBoolean, isNumber, isArray } from 'lodash'

export default class Post {
  constructor(post = {}) {
    this.title = isString(post.title) ? post.title : ''
    this.content = isString(post.content) ? post.content : ''
    this.tags = isArray(post.tags) ? post.tags : []
    this.authorId = isString(post.authorId) ? post.authorId : ''
    // this.likeUser = isString(post.likeUser) ? post.likeUser : []
    this.visibility = isString(post.visibility) ? post.visibility : ''
    this.deleted = isBoolean(post.deleted) ? post.deleted : false
    this.view_count = isNumber(post.view_count) ? post.view_count : 0
  }
}
