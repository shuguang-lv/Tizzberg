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
import {
  fetchCharacter,
  fetchCharacters,
  setCurrentCharacter,
  createCharacter,
  deleteCharacter,
} from '@/api/user'

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

const AV = require('leancloud-storage')
AV.init({
  appId: process.env.VUE_APP_ID,
  appKey: process.env.VUE_APP_KEY,
  serverURL: process.env.VUE_APP_SERVER_URL,
})

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
  data() {
    return {
      currentUser: null,
      currentCharacter: {},
      characters: [],
    }
  },
  async created() {
    if (AV.User.current()) {
      await AV.User.current().fetch()
      this.currentUser = AV.User.current().toJSON()
    }

    let character = null
    let characters = null
    try {
      if (this.currentUser) {
        character = await fetchCharacter(this.currentUser.currentCharacter)
        characters = await fetchCharacters(this.currentUser.objectId)
      }
    } catch (error) {
      console.log(error)
      this.$snackbar.error(error.rawMessage)
    }
    this.currentCharacter = character ? character.toJSON() : {}
    this.characters =
      characters && characters.length > 0
        ? characters.map((c) => c.toJSON())
        : []
  },
  methods: {
    async getCharacters() {
      try {
        const characters = await fetchCharacters(this.currentUser.objectId)
        this.characters = characters.map((character) =>
          character ? character.toJSON() : null
        )
      } catch (error) {
        console.log(error)
      }
    },
    async switchCharacter(characterId) {
      try {
        await setCurrentCharacter(this.currentUser.objectId, characterId)
        const character = await fetchCharacter(characterId)
        this.currentCharacter = character ? character.toJSON() : {}
      } catch (error) {
        console.log(error)
      }
    },
    async createCharacter(characterObj) {
      try {
        await createCharacter(characterObj)
        await this.getCharacters(this.currentUser.objectId)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteCharacter(characterId) {
      try {
        await deleteCharacter(characterId)
        await this.getCharacters(this.currentUser.objectId)
      } catch (error) {
        console.log(error)
      }
    },
  },
}).$mount('#app')
