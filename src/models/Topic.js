import { isString, isBoolean, isNumber } from 'lodash'

export default class Topic {
  constructor(topic = {}) {
    this.title = isString(topic.title) ? topic.title : ''
    this.content = isString(topic.content) ? topic.content : ''
    this.tag = isString(topic.tag) ? topic.tag : []
    this.author = isString(topic.author) ? topic.author : ''
    this.likeUser = isString(topic.likeUser) ? topic.likeUser : []
    this.visibility = isString(topic.visibility) ? topic.visibility : ''
    this.deleted = isBoolean(topic.deleted) ? topic.deleted : false
    this.view_count = isNumber(topic.view_count) ? topic.view_count : 0
  }
}
