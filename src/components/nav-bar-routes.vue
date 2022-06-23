<script>
export default {
  data() {
    return {
      routes: [
        {
          title: 'T-Square',
          path: 't-square',
          icon: 'mdi-post-outline',
        },
        {
          title: 'Explore',
          path: 'explore',
          icon: 'mdi-tag-multiple-outline',
        },
        {
          title: 'Fiction',
          path: 'fiction',
          icon: 'mdi-book-open-page-variant-outline',
        },
      ],
    }
  },
}
</script>

<template>
  <v-list nav>
    <v-list-item
      v-for="route in routes"
      :key="route.title"
      :to="{ name: route.path }"
      color="primary"
      two-line
      link
    >
      <v-list-item-icon class="my-auto mr-4">
        <v-icon>{{ route.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ route.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<style lang="scss" scoped></style>
