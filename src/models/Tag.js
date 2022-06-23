import { is } from 'ramda'

export default class Tag {
  constructor (tag = {}) {
    this.title = is(String, tag.title) ? tag.title : ''
    this.content = is(String, tag.content) ? tag.content : ''
    this.creator = is(String, tag.creator) ? tag.creator : ''
    this.visibility = is(String, tag.visibility) ? tag.visibility : ''
    this.deleted = is(Boolean, tag.deleted) ? tag.deleted : false
    this.view_count = is(Number, tag.view_count) ? tag.view_count : 0
    this.num_member = is(Number, tag.num_member) ? tag.num_member : 0
  }
}
