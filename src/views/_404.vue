<script>
export default {
  props: {
    resource: {
      type: String,
      default: 'Requested Page',
    },
  },
}
</script>

<template>
  <div class="d-flex flex-column justify-center align-center fill-height">
    <div class="text-h1 font-weight-bold secondary--text mb-16">404</div>
    <div class="text-h4 secondary--text mb-16">
      Oops! The {{ resource }} is Not Found.
    </div>
    <v-btn large depressed color="primary" :to="{ name: 'home' }">
      <v-icon left>mdi-home-outline</v-icon>
      Back to Home
    </v-btn>
  </div>
</template>

<style lang="scss" scoped></style>
