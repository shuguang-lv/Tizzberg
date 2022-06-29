<script>

export default {
  name: 'NavBarRoutes',
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
        {
          title: 'Chat',
          path: 'chat',
          icon: 'mdi-chat-processing-outline',
        },
        {
          title: 'Profile',
          path: 'Profile',
          icon: 'mdi-account-box-outline',
        },
      ],
    }
  },
  methods : {
    toPage (route) {
      if (route.title === 'Profile') {
        let id = this.$user.current().getObjectId()
        this.$router.push({ name: route.path, query: { id: id } }) 
      }
      else {
        this.$router.push({ name: route.path }) 
      }
    }
  },
  beforeCreate () {
    this.getUserId()
  }
}
</script>

<template>
  <v-list nav>
    <v-list-item
      v-for="route in routes"
      :key="route.title"
      color="primary"
      two-line
      link
      @click="toPage(route)"
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
