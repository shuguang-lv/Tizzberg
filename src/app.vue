<script>
export default {
  name: 'App',
  data: () => ({}),
  methods: {},
}
</script>

<template>
  <v-app class="custom-scrollbar">
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

*::-webkit-scrollbar {
  width: 10px;
}

*::-webkit-scrollbar-track {
  background: #8ab6c9;
}

*::-webkit-scrollbar-thumb {
  background: #648d9c;
  border-radius: 20px;
}
</style>
