import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import { preset } from 'vue-cli-plugin-vuetify-preset-reply/preset'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  preset,
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#8ab6c9',
        secondary: '#1E4C5D',
        accent: '#00A5E6',
        background: colors.grey.lighten5,
      },
      dark: {
        primary: '#8ab6c9',
        secondary: '#1E4C5D',
        accent: '#00A5E6',
      },
    },
  },
})
