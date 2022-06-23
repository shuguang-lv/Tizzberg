import { is } from 'ramda'

export default class Ad {
  constructor (ad = {}) {
    this.title = is(String, ad.title) ? ad.title : ''
    this.URL = is(String, ad.URL) ? ad.URL : ''
    this.imgURL = is(String, ad.imgURL) ? ad.imgURL : ''
    this.description = is(String, ad.description) ? ad.description : ''
    this.num_click = is(Number, ad.num_click) ? ad.num_click : 0
  }
}
