import { isString, isBoolean, isNumber } from 'lodash'

export default class Fiction {
  constructor(fiction = {}) {
    this.title = isString(fiction.title) ? fiction.title : ''
    this.description = isString(fiction.description) ? fiction.description : ''
    this.content = isString(fiction.content) ? fiction.content : ''
    this.chapterId = isString(fiction.chapterId) ? fiction.chapterId : []
    this.tag = isString(fiction.tag) ? fiction.tag : []
    this.author = isString(fiction.author) ? fiction.author : []
    this.edit_access = isString(fiction.edit_access) ? fiction.edit_access : ''
    this.deleted = isBoolean(fiction.deleted) ? fiction.deleted : false
    this.view_count = isNumber(fiction.view_count) ? fiction.view_count : 0
  }
}
