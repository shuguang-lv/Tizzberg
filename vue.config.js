const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  publicPath:
    process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : '/',
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Tizzberg'
      return args
    })
  },
})
