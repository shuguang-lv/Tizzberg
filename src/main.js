import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueDayjs from 'vue-dayjs-plugin'
import { Plugin } from 'vue2-storage'
import VueCryptojs from 'vue-cryptojs'

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

Vue.prototype.$appName = process.env.VUE_APP_NAME

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
