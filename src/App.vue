<template>
  <router-view :key="$route.fullPath" />
</template>

<script>
import { socialvue } from './config/pluginInit'

export default {
  name: 'App',
  components: {
  },
  mounted () {
    socialvue.mainIndex()
  },
  methods: {
  }
}
</script>

<style lang="scss">
  @import "assets/scss/style.scss";
</style>
