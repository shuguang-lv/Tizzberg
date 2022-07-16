const AV = require('leancloud-storage')
const { Realtime } = require('leancloud-realtime');

AV.init({
  appId: process.env.VUE_APP_ID,
  appKey: process.env.VUE_APP_KEY,
  serverURL: process.env.VUE_APP_SERVER_URL,
})

export const realtime = new Realtime({
  appId: process.env.VUE_APP_ID,
  appKey: process.env.VUE_APP_KEY,
  server: process.env.VUE_APP_SERVER_URL,
});

import Vue from 'vue'
import App from './app.vue'
import router from './router'
import pinia from './store'
import { PiniaVuePlugin } from 'pinia'
import vuetify from './plugins/vuetify'
import VueDayjs from 'vue-dayjs-plugin'
import { Plugin } from 'vue2-storage'
import VueCryptojs from 'vue-cryptojs'
import Dialog from './components/dialog'
import Snackbar from './components/snackbar'
import Overlay from './components/overlay'
import VueCompositionAPI from '@vue/composition-api'

Vue.config.productionTip = false

Vue.use(PiniaVuePlugin)
Vue.use(VueCompositionAPI)
Vue.use(VueDayjs)
Vue.use(Plugin)
Vue.use(Plugin, {
  prefix: 'tizzberg_',
  driver: 'local',
  // ttl: 60 * 60 * 24 * 1000, // 24 hours
  replacer: (key, value) => value,
})
Vue.use(VueCryptojs)

Vue.prototype.$appName = process.env.VUE_APP_NAME
Vue.prototype.$dialog = Dialog
Vue.prototype.$snackbar = Snackbar
Vue.prototype.$overlay = Overlay
Vue.prototype.$user = AV.User

new Vue({
  router,
  vuetify,
  pinia,
  render: (h) => h(App),
}).$mount('#app')
