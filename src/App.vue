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

<style>
/* @import url('~simpledotcss/simple.min.css'); */
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
