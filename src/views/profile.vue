<script>
import Layout from '@/layouts/main.vue'
import Flow from '@/layouts/flow.vue'
import IdentityEditor from '@/components/identity-editor.vue'
import PostCard from '@/components/post-card.vue'
import { getPostList } from '@/api/post.js'

export default {
  name: 'Profile',
  components: {
    Layout,
    Flow,
    IdentityEditor,
    PostCard,
  },
  props: {
    // user: {
    //   type: Object,
    //   required: true,
    // },
  },
  data() {
    return {
      getPostList: getPostList,
      selectedTab: 'post',
      tabs: [
        {
          title: 'Post',
          value: 'post',
        },
        {
          title: 'Blog',
          value: 'blog',
        },
        {
          title: 'About',
          value: 'about',
        },
        {
          title: 'Ask & Message Board',
          value: 'ask & Message Board',
        },
      ],
      user: {
        statistic: [
          {
            info: 'Like',
            value: '600',
          },
          {
            info: 'Member',
            value: '320',
          },
          {
            info: 'Visit',
            value: '1.2k',
          },
        ],
        contactInfo: [
          {
            title: 'Email',
            content: '123345@gmail.com',
          },
          {
            title: 'Address',
            content: '123345@gmail.com',
          },
          {
            title: 'Personal website',
            content: 'https://github.com/jack',
          },
          {
            title: 'Mobile',
            content: '1234534646767',
          },
        ],
        experience: {
          education: [],
          work: [],
        },
        tags: ['Reading', 'Fishing', 'Cooking', 'Writer'],
      },
    }
  },
  methods: {},
}
</script>

<template>
  <Layout>
    <identity-editor ref="identity-editor"></identity-editor>
    <blog-editor ref="blog-editor"></blog-editor>

    <v-card rounded class="mx-auto mb-8" elevation="3" width="50vw">
      <div class="w-100 overflow-hidden">
        <v-img
          src="@/assets/images/profile-bg1.jpg"
          alt="profile-bg"
          class="w-100"
        />
      </div>
      <div
        class="d-flex justify-space-between pa-10"
        style="position: relative"
      >
        <div class="d-flex">
          <div
            v-for="(item, index) in user.statistic"
            :key="index"
            class="d-flex flex-column align-center mr-8"
          >
            <div class="mb-0 text-subtitle-1">
              {{ item.info }}
            </div>
            <div>{{ item.value }}</div>
          </div>
        </div>
        <div
          class="d-flex flex-column align-center"
          style="
            position: absolute;
            top: -120px;
            left: 50%;
            transform: translateX(-50%);
          "
        >
          <v-avatar color="primary" size="150">
            <img
              :src="`https://avatars.dicebear.com/api/micah/${$root.currentCharacter.objectId}.svg`"
              alt="John"
          /></v-avatar>
          <div class="text-h4 mt-2">
            {{ $root.currentCharacter.name }}
          </div>
        </div>
        <v-btn
          depressed
          large
          color="primary"
          @click="$refs['identity-editor'].show()"
        >
          <v-icon left>mdi-account-switch-outline</v-icon>
          Switch
        </v-btn>
      </div>
    </v-card>
    <div style="width: 50vw">
      <v-tabs
        v-model="selectedTab"
        grow
        active-class="white--text primary"
        slider-color="secondary"
        height="70"
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
      <v-tab-item value="post" style="position: relative">
        <Flow
          v-if="selectedTab === 'post'"
          :fetchListApi="getPostList"
          :fetchListApiOptions="{}"
          ref="post"
          v-slot="{ list, updateList }"
        >
          <v-slide-y-transition group
            ><post-card
              v-for="post in list"
              :key="post.objectId"
              :post="post"
              @refresh="updateList('refresh')"
            ></post-card
          ></v-slide-y-transition>
        </Flow>
      </v-tab-item>
      <v-tab-item value="blog">
        <v-card rounded class="pa-2 my-6" width="50vw">
          <v-card-text v-if="$root.currentUser" class="d-flex align-center">
            <v-text-field
              label="Write a new blog"
              append-icon="mdi-pencil"
              hide-details
              outlined
              @click="$refs['blog-editor'].show()"
            ></v-text-field>
          </v-card-text>
        </v-card>
        <!-- <div v-for="(blog, index) in blogList" :key="index">
            <PostCard
              :articleActions="blogActions"
              :article="blog"
              :flowWidth="flowWidth"
            >
            </PostCard>
          </div> -->
      </v-tab-item>
    </v-tabs-items>
  </Layout>
</template>

<style lang="scss" scoped></style>
