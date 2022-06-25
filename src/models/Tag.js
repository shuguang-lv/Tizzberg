import { isString, isBoolean, isNumber } from 'lodash'

export default class Tag {
  constructor(tag = {}) {
    this.title = isString(tag.title) ? tag.title : ''
    this.content = isString(tag.content) ? tag.content : ''
    this.creator = isString(tag.creator) ? tag.creator : ''
    this.visibility = isString(tag.visibility) ? tag.visibility : ''
    this.deleted = isBoolean(tag.deleted) ? tag.deleted : false
    this.view_count = isNumber(tag.view_count) ? tag.view_count : 0
    this.num_member = isNumber(tag.num_member) ? tag.num_member : 0
  }
}
