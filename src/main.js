const AV = require('leancloud-storage')
AV.init({ 
  appId: "5Y6XfcEGs057U6eBhhYiIBy0-MdYXbMMI",
  appKey: "QIt08R1MMkbnQuFO7TPtR6up",
  serverURL: "https://5y6xfceg.api.lncldglobal.com"
});

import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueDayjs from 'vue-dayjs-plugin'
import { Plugin } from 'vue2-storage'
import VueCryptojs from 'vue-cryptojs'
import Dialog from './components/dialog'
import Snackbar from './components/snackbar'
import Overlay from './components/overlay'

Vue.config.productionTip = false

Vue.use(VueDayjs)
Vue.use(Plugin)
Vue.use(Plugin, {
  prefix: 'tizzberg_',
  driver: 'local',
  // ttl: 60 * 60 * 24 * 1000, // 24 hours
  replacer: (key, value) => value,
})
Vue.use(VueCryptojs)

// event bus
export const eventBus = new Vue()
Vue.prototype.$emitter = eventBus
Vue.prototype.$appName = process.env.VUE_APP_NAME
Vue.prototype.$dialog = Dialog
Vue.prototype.$snackbar = Snackbar
Vue.prototype.$overlay = Overlay
Vue.prototype.$user = AV.User

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
