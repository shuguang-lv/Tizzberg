import { isString, isBoolean, isNumber } from 'lodash'

export default class Post {
  constructor(post = {}) {
    this.title = isString(post.title) ? post.title : ''
    this.content = isString(post.content) ? post.content : ''
    this.tag = isString(post.tag) ? post.tag : []
    this.author = isString(post.author) ? post.author : ''
    this.likeUser = isString(post.likeUser) ? post.likeUser : []
    this.visibility = isString(post.visibility) ? post.visibility : ''
    this.deleted = isBoolean(post.deleted) ? post.deleted : false
    this.view_count = isNumber(post.view_count) ? post.view_count : 0
  }
}
