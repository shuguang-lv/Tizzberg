import { isString, isBoolean, isNumber } from 'lodash'

export default class Comment {
  constructor(comment = {}) {
    this.parent = isString(comment.parent) ? comment.parent : ''
    this.content = isString(comment.content) ? comment.content : ''
    this.author = isString(comment.author) ? comment.author : ''
    this.deleted = isBoolean(comment.deleted) ? comment.deleted : false
    this.view_count = isNumber(comment.view_count) ? comment.view_count : 0
  }
}
