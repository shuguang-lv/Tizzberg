<template>
  <router-view :key="$route.fullPath" />
  <!-- <input v-model="""post.content"></input>
  <input v-model="post.title"></input> -->
</template>

<script>
import { socialvue } from './config/pluginInit'

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
    }
  },
  mounted () {
    socialvue.mainIndex()
    this.initializeConnection()
  },
  methods: {
    initializeConnection() {
      const AV = require('leancloud-storage');
      AV.init({ 
        appId: "5Y6XfcEGs057U6eBhhYiIBy0-MdYXbMMI",
        appKey: "QIt08R1MMkbnQuFO7TPtR6up",
        serverURL: "https://5y6xfceg.api.lncldglobal.com"
      });
    }
  }
}
</script>

<style lang="scss">
  @import "assets/scss/style.scss";
</style>
