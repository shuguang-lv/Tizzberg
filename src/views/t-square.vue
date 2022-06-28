<script>
import Layout from '@/layouts/main.vue'
import IdentityEditor from '@/components/identity-editor.vue'
import PostEditor from '@/components/post-editor.vue'
import PostCard from '@/components/post-card.vue'
import { authComputed } from '@/store/helpers'
import { getPostList } from '@/api/post.js'
// import Post from '@/models/Post'

export default {
  name: 'TSquare',
  components: {
    Layout,
    IdentityEditor,
    PostEditor,
    PostCard,
  },
  data() {
    return {
      postList: [],
      loadingPostList: false,
      selectedTab: 'hot',
      tabs: [
        {
          title: 'Hot',
          value: 'hot',
        },
        // {
        //   title: 'Following',
        //   value: 'following',
        // },
        {
          title: 'Latest',
          value: 'latest',
        },
      ],
    }
  },
  computed: {
    ...authComputed,
  },
  async mounted() {
    await this.getPostList()
  },
  methods: {
    async getPostList() {
      this.loadingPostList = true
      try {
        this.postList = await getPostList(this.selectedTab)
        this.$nextTick(async () => {
          this.loadingPostList = false
        })
      } catch (error) {
        console.log(error)
        this.$snackbar.error(error.rawMessage)
        this.loadingPostList = false
      }
    },
  },
}
</script>

<template>
  <Layout>
    <identity-editor ref="identity-editor"></identity-editor>
    <post-editor ref="post-editor" @created="getPostList"></post-editor>

    <v-card rounded class="pa-2" elevation="3" width="50vw">
      <v-card-title class="text-h5 mb-2 primary--text font-weight-medium">
        T-Square
      </v-card-title>
      <v-divider class="mb-2"></v-divider>
      <v-card-text v-if="$user.current()" class="d-flex align-center">
        <v-avatar
          color="primary"
          size="60"
          class="mr-6 clickable"
          @click="$refs['identity-editor'].show()"
        >
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"
        /></v-avatar>
        <v-text-field
          label="What happened in your world today?"
          append-icon="mdi-pencil"
          hide-details
          outlined
          @click="$refs['post-editor'].show()"
        ></v-text-field>
      </v-card-text>
    </v-card>
    <div class="mt-8" style="width: 50vw">
      <v-tabs
        v-model="selectedTab"
        grow
        active-class="white--text primary"
        slider-color="tertiary"
        height="50"
        @change="getPostList"
      >
        <v-tab
          v-for="tab in tabs"
          :key="tab.value"
          class="text-subtitle-1"
          :href="`#${tab.value}`"
        >
          {{ tab.title }}
        </v-tab>
      </v-tabs>
    </div>
    <v-fade-transition
      ><v-progress-circular
        v-if="loadingPostList"
        :size="100"
        color="primary"
        indeterminate
        style="
          z-index: 99;
          position: absolute;
          top: 40vh;
          left: 50%;
          transform: translate(-50%, 0);
        "
      ></v-progress-circular
    ></v-fade-transition>
    <v-slide-y-transition>
      <v-tabs-items v-if="!loadingPostList" v-model="selectedTab">
        <v-tab-item
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
          style="position: relative"
        >
          <post-card
            v-for="(post, index) in postList"
            :key="index"
            :post="post"
            @refresh="getPostList"
          ></post-card>
        </v-tab-item>
      </v-tabs-items>
    </v-slide-y-transition>
  </Layout>
</template>

<style lang="scss" scoped></style>
