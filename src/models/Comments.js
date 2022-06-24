import { is } from 'ramda'

export default class Comment {
  constructor (comment = {}) {
    this.parent = is(String, comment.parent) ? comment.parent : ''
    this.content = is(String, comment.content) ? comment.content : ''
    this.author = is(String, comment.author) ? comment.author : ''
    this.deleted = is(Boolean, comment.deleted) ? comment.deleted : false
    this.view_count = is(Number, comment.view_count) ? comment.view_count : 0
  }
}