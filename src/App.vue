<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-navigation-drawer
      absolute
      :mini-variant.sync="showNavDrawer"
      hide-overlay
    >
      <!-- -->
    </v-navigation-drawer>

    <v-app-bar app color="white" elevation="5" height="80px">
      <v-app-bar-nav-icon
        class="ml-2"
        @click="showNavDrawer = !showNavDrawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h4 secondary--text">{{
        $appName
      }}</v-toolbar-title>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="fill-height">
        <!-- If using vue-router -->
        <v-row class="fill-height">
          <v-col cols="11">
            <router-view :key="$route.fullPath"></router-view>
          </v-col>
          <v-col cols="1" align-self="center">
            <v-btn
              depressed
              large
              absolute
              right
              color="accent"
              @click="showFriendList = !showFriendList"
            >
              <v-icon v-if="showFriendList"> mdi-chevron-double-right </v-icon>
              <v-icon v-else> mdi-chevron-double-left </v-icon>
            </v-btn></v-col
          >
        </v-row>
      </v-container>
      <v-navigation-drawer v-model="showFriendList" app hide-overlay right>
        <!-- -->
      </v-navigation-drawer>
    </v-main>

    <v-footer padless elevation="3" color="white">
      <v-col class="text-center primary--text" cols="12">
        Copyright 2022 <strong>{{ $appName }}</strong> All Rights Reserved.
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    showNavDrawer: true,
    showFriendList: false,
  }),
}
</script>

<style>
/* @import url('~simpledotcss/simple.min.css'); */
</style>
