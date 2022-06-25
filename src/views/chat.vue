<script>
import Layout from '@/layouts/main.vue'

export default {
  components: {
    Layout,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <Layout></Layout>
</template>

<style lang="scss" scoped></style>
