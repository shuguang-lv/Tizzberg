import { is } from 'ramda'

export default class Fiction {
  constructor (fiction = {}) {
    this.title = is(String, fiction.title) ? fiction.title : ''
    this.content = is(String, fiction.content) ? fiction.content : ''
    this.chapterId = is(String, fiction.chapterId) ? fiction.chapterId : []
    this.tag = is(String, fiction.tag) ? fiction.tag : []
    this.author = is(String, fiction.author) ? fiction.author : []
    this.edit_access = is(String, fiction.edit_access) ? fiction.edit_access : ''
    this.deleted = is(Boolean, fiction.deleted) ? fiction.deleted : false
    this.view_count = is(Number, fiction.view_count) ? fiction.view_count : 0
  }
}
