import { isString, isNumber } from 'lodash'

export default class Ad {
  constructor(ad = {}) {
    this.title = isString(ad.title) ? ad.title : ''
    this.URL = isString(ad.URL) ? ad.URL : ''
    this.imgURL = isString(ad.imgURL) ? ad.imgURL : ''
    this.description = isString(ad.description) ? ad.description : ''
    this.num_click = isNumber(ad.num_click) ? ad.num_click : 0
  }
}
