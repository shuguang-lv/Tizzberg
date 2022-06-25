<script>
export default {
  name: 'App',
  data: () => ({}),
}
</script>

<template>
  <v-app>
    <router-view :key="$route.fullPath"></router-view>
  </v-app>
</template>

<style lang="scss">
/* @import url('~simpledotcss/simple.min.css'); */
// https://github.com/rstacruz/nprogress
@import '~nprogress/nprogress.css';

*,
*::before,
*::after {
  box-sizing: border-box;
}

#nprogress .bar {
  background: #8ab6c9;
}

// remove unnecessary scrollbar
html {
  overflow-y: auto !important;
}

.v-application {
  background: transparent !important;
}

.v-tabs-items {
  background: transparent !important;
}

.clickable {
  cursor: pointer;
  transition: 0.3s;
}

.clickable:hover {
  transform: scale(0.9);
  transition: 0.3s;
}
</style>
