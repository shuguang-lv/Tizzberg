<script>
import NavBarUser from '@/components/nav-bar-user.vue'
import NavBarRoutes from '@/components/nav-bar-routes.vue'
import FriendList from '@/components/friend-list.vue'

export default {
  components: { NavBarUser, NavBarRoutes, FriendList },
  data() {
    return {
      showFriendList: false,
      showNavDrawer: true,
    }
  },
}
</script>

<template>
  <div class="fill-height">
    <v-navigation-drawer
      app
      :mini-variant.sync="showNavDrawer"
      hide-overlay
      expand-on-hover
      class="pt-6"
      width="300"
    >
      <v-app-bar-nav-icon class="ml-2"></v-app-bar-nav-icon>
      <NavBarRoutes class="mt-8"></NavBarRoutes>
    </v-navigation-drawer>

    <v-app-bar app color="white" elevation="5" height="80px">
      <v-toolbar-title class="text-h4 secondary--text ml-2">{{
        $appName
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <NavBarUser></NavBarUser>
      <v-btn
        depressed
        large
        absolute
        right
        color="accent"
        style="top: 100px"
        class="mt-2"
        @click="showFriendList = !showFriendList"
      >
        <v-icon v-if="showFriendList"> mdi-chevron-double-right </v-icon>
        <v-icon v-else> mdi-chevron-double-left </v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main
      class="fill-height"
      :style="{ background: $vuetify.theme.themes.light.background }"
    >
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="fill-height d-flex align-start pt-8">
        <!-- If using vue-router -->
        <v-row class="fill-height">
          <v-col cols="12" class="d-flex flex-column align-center">
            <!-- page main content -->
            <slot />
          </v-col>
        </v-row>
      </v-container>
      <v-footer padless elevation="3" color="white" width="100%">
        <v-col class="text-center primary--text" cols="12">
          Copyright 2022 <strong>{{ $appName }}</strong> All Rights Reserved.
        </v-col>
      </v-footer>
    </v-main>

    <v-navigation-drawer
      v-model="showFriendList"
      app
      hide-overlay
      right
      class="py-8"
      width="350"
    >
      <FriendList></FriendList>
    </v-navigation-drawer>
  </div>
</template>

<style lang="scss" scoped></style>
