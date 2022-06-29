import { isString, isBoolean, isNumber, isArray } from 'lodash'

export default class Blog {
  constructor(blog = {}) {
    this.title = isString(blog.title) ? blog.title : ''
    this.content = isString(blog.content) ? blog.content : ''
    this.tags = isArray(blog.tags) ? blog.tags : []
    this.authorId = isString(blog.authorId) ? blog.authorId : ''
    // this.likeUser = isString(blog.likeUser) ? blog.likeUser : []
    this.visibility = isString(blog.visibility) ? blog.visibility : ''
    this.deleted = isBoolean(blog.deleted) ? blog.deleted : false
    this.view_count = isNumber(blog.view_count) ? blog.view_count : 0
  }
}