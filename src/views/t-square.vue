<script>
import Layout from '@/layouts/main.vue'

export default {
  components: {
    Layout,
  },
  data() {
    return {
      flowWidth: '50vw',
    }
  },
}
</script>

<template>
  <Layout>
    <v-card rounded elevation="3" :width="flowWidth">
      <v-card-title> T-square </v-card-title>
    </v-card>
  </Layout>
</template>

<style lang="scss" scoped></style>
