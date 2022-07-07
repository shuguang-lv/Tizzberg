import { isString, isNumber, isArray } from 'lodash'

export default class Post {
  constructor(post = {}) {
    this.title = isString(post.title) ? post.title : ''
    this.content = isString(post.content) ? post.content : ''
    this.tags = isArray(post.tags) ? post.tags : []
    this.authorId = isString(post.authorId) ? post.authorId : ''
    this.characterId = isString(post.characterId) ? post.characterId : ''
    this.visibility = isString(post.visibility) ? post.visibility : 'public'
    this.status = isString(post.status) ? post.status : '' // deleted, draft
    this.view_count = isNumber(post.view_count) ? post.view_count : 0
  }
}
