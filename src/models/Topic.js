import { is } from 'ramda'

export default class Topic {
  constructor (topic = {}) {
    this.title = is(String, topic.title) ? topic.title : ''
    this.content = is(String, topic.content) ? topic.content : ''
    this.tag = is(String, topic.tag) ? topic.tag : []
    this.author = is(String, topic.author) ? topic.author : ''
    this.likeUser = is(String, topic.likeUser) ? topic.likeUser : []
    this.visibility = is(String, topic.visibility) ? topic.visibility : ''
    this.deleted = is(Boolean, topic.deleted) ? topic.deleted : false
    this.view_count = is(Number, topic.view_count) ? topic.view_count : 0
  }
}