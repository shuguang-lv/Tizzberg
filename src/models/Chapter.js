import { is } from 'ramda'

export default class Chapter {
  constructor (chapter = {}) {
    this.title = is(String, chapter.title) ? chapter.title : ''
    this.content = is(String, chapter.content) ? chapter.content : ''
    this.decription = is(String, chapter.decription) ? chapter.decription : ''
    this.fictionId = is(String, chapter.fictionId) ? chapter.fictionId : []
    this.author = is(String, chapter.author) ? chapter.author : []
    this.deleted = is(Boolean, chapter.deleted) ? chapter.deleted : false
    this.view_count = is(Number, chapter.view_count) ? chapter.view_count : 0
  }
}
