<script>
import Layout from '@/layouts/main.vue'
import Flow from '@/layouts/flow.vue'
import IdentityEditor from '@/components/identity-editor.vue'
import PostEditor from '@/components/post-editor.vue'
import PostCard from '@/components/post-card.vue'
import { getPostList } from '@/api/post.js'
// import Post from '@/models/Post'

export default {
  name: 'TSquare',
  components: {
    Layout,
    Flow,
    IdentityEditor,
    PostEditor,
    PostCard,
  },
  data() {
    return {
      getPostList: getPostList,
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
  computed: {},
  methods: {},
}
</script>

<template>
  <Layout>
    <identity-editor ref="identity-editor"></identity-editor>
    <post-editor
      ref="post-editor"
      @created="$refs[selectedTab][0].updateList()"
    ></post-editor>

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
          <v-img
            src="https://avatars.dicebear.com/api/micah/desmond.svg"
            alt="John"
          ></v-img
        ></v-avatar>
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
    <v-tabs-items v-model="selectedTab">
      <v-tab-item
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        style="position: relative"
      >
        <Flow
          v-if="selectedTab === tab.value"
          :fetchListApi="getPostList"
          :fetchListApiOptions="{ filter: selectedTab }"
          :ref="tab.value"
          v-slot="{ list, updateList }"
        >
          <v-slide-y-transition group
            ><post-card
              v-for="(post, index) in list"
              :key="index"
              :post="post"
              @refresh="updateList('refresh')"
            ></post-card
          ></v-slide-y-transition>
        </Flow>
      </v-tab-item>
    </v-tabs-items>
  </Layout>
</template>

<style lang="scss" scoped></style>
