<template>
  <Layout><hello-world /></Layout>
</template>

<script>
import HelloWorld from '../components/HelloWorld'
import Layout from '@/layouts/main.vue'

export default {
  name: 'home-view',

  components: {
    Layout,
    HelloWorld,
  },
}
</script>
