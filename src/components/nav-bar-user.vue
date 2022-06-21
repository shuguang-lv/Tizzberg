<script>
export default {}
</script>

<template>
  <div class="d-flex align-center">
    <v-avatar color="primary" size="56"
      ><img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"
    /></v-avatar>
    <div class="text-h5 mx-4">John Wick</div>
    <v-btn icon large :to="{ name: 'home' }" color="primary" class="mx-4">
      <v-icon>mdi-home-outline</v-icon>
    </v-btn>
    <v-btn icon large color="primary" class="mx-4">
      <v-badge dot color="warning">
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
    </v-btn>
    <v-btn icon large color="primary" class="mx-4">
      <v-badge dot color="warning">
        <v-icon>mdi-email-outline</v-icon>
      </v-badge>
    </v-btn>
  </div>
</template>

<style lang="scss" scoped></style>
