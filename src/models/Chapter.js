import { isString, isBoolean, isNumber } from 'lodash'

export default class Chapter {
  constructor(chapter = {}) {
    this.title = isString(chapter.title) ? chapter.title : ''
    this.content = isString(chapter.content) ? chapter.content : ''
    this.description = isString(chapter.description) ? chapter.description : ''
    this.fictionId = isString(chapter.fictionId) ? chapter.fictionId : []
    this.author = isString(chapter.author) ? chapter.author : []
    this.deleted = isBoolean(chapter.deleted) ? chapter.deleted : false
    this.view_count = isNumber(chapter.view_count) ? chapter.view_count : 0
  }
}
