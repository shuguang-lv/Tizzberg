import { is } from 'ramda'

export default class Post {
  constructor (post = {}) {
    this.title = is(String, post.title) ? post.title : ''
    this.content = is(String, post.content) ? post.content : ''
    this.tag = is(String, post.tag) ? post.tag : []
    this.author = is(String, post.author) ? post.author : ''
    this.likeUser = is(String, post.likeUser) ? post.likeUser : []
    this.visibility = is(String, post.visibility) ? post.visibility : ''
    this.deleted = is(Boolean, post.deleted) ? post.deleted : false
    this.view_count = is(Number, post.view_count) ? post.view_count : 0
  }
}
