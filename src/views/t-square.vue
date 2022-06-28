<script>
import Layout from '@/layouts/main.vue'
import IdentityEditor from '@/components/identity-editor.vue'
import PostEditor from '@/components/post-editor.vue'
import { authComputed } from '@/store/helpers'
import { getPostList, deletePost } from '@/api/post.js'
import { fetchUserMemo } from '@/api/user.js'
// import Post from '@/models/Post'

export default {
  name: 'TSquare',
  components: {
    Layout,
    IdentityEditor,
    PostEditor,
  },
  data() {
    return {
      flowWidth: '50vw',
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
      postActions: [
        {
          title: 'Pin Post',
          icon: 'mdi-pin-outline',
          privilege: 'self',
          action: () =>
            this.$dialog({
              title: 'Pin this post',
              content:
                'This will appear at the top of your blog and replace any previous pinned post. Are you sure?',
            }),
        },
        {
          title: 'Delete Post',
          icon: 'mdi-delete-outline',
          privilege: 'self',
          action: (id) =>
            this.$dialog({
              title: 'Delete this post',
              content: 'Are you sure you want to delete this post?',
              confirmButton: {
                action: (async (id, deletePost) => {
                  this.$overlay.open()
                  try {
                    await deletePost(id)
                    await this.getPostList()
                    this.$overlay.close()
                    this.$snackbar.warn('A post was deleted')
                  } catch (error) {
                    console.log(error)
                    this.$overlay.close()
                    this.$snackbar.error(error.rawMessage)
                  }
                }).bind(this, id, deletePost),
              },
            }),
        },
        {
          title: 'Save Post',
          icon: 'mdi-content-save-outline',
          privilege: 'both',
          action: 'error',
        },
        {
          title: 'Hide Post',
          icon: 'mdi-eye-off-outline',
          privilege: 'other',
          action: 'error',
        },
        {
          title: 'Report Post',
          icon: 'mdi-alert',
          privilege: 'other',
          action: 'error',
        },
        {
          title: 'Follow User',
          icon: 'mdi-account-star-outline',
          privilege: 'other',
          action: 'error',
        },
        {
          title: 'Block User',
          icon: 'mdi-account-cancel-outline',
          privilege: 'other',
          action: 'error',
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
          for (let post of this.postList) {
            const user = await fetchUserMemo(post.get('authorId'))
            this.$set(post, 'authorName', user ? user.getUsername() : '')
          }
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

    <v-card rounded class="pa-2" elevation="3" :width="flowWidth">
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
    <div class="mt-8" :style="{ width: flowWidth }">
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
          <v-card
            v-for="(post, index) in postList"
            :key="index"
            rounded
            class="px-2 py-4 my-8 mx-4"
            elevation="3"
            :width="flowWidth"
          >
            <div class="d-flex justify-space-between align-center">
              <div class="d-flex align-center pa-4">
                <v-avatar color="primary" size="50" class="mr-4">
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                /></v-avatar>
                <div class="text-subtitle-1">
                  {{ post.authorName }}
                </div>
              </div>
              <div>
                <v-icon color="secondary" class="mx-2">mdi-pin</v-icon>
                <v-menu :disabled="!$user.current()" bottom right rounded="lg">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn large icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                      v-for="item in postActions.filter(
                        (action) =>
                          action.privilege === 'both' ||
                          ($user.current().getObjectId() == post.get('authorId')
                            ? action.privilege === 'self'
                            : action.privilege === 'other')
                      )"
                      :key="item.title"
                      link
                      class="px-8"
                      color="primary"
                      @click="item.action(post.getObjectId())"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.title"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </div>
            <v-divider class="mb-2"></v-divider>
            <v-card-text
              class="d-flex align-center text-body-1"
              v-text="post.get('content')"
            >
            </v-card-text>
            <v-btn
              v-for="tag in post.get('tags')"
              :key="tag"
              color="primary"
              class="mb-4"
              style="text-transform: unset !important"
              text
            >
              #{{ tag }}
            </v-btn>
            <!-- <v-img
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            height="500px"
            class="mb-4"
            ></v-img> -->
            <div class="d-flex justify-space-between align-center px-4">
              <div>
                <v-btn
                  :disabled="!$user.current()"
                  fab
                  small
                  depressed
                  color="secondary"
                  class="mr-4"
                >
                  <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
                <span class="mr-4 secondary--text">120 Likes</span>
                <span class="secondary--text">2 Comments</span>
              </div>
              <div>
                <v-btn
                  :disabled="!$user.current()"
                  icon
                  color="secondary"
                  class="mr-2"
                >
                  <v-icon>mdi-share-variant-outline</v-icon>
                </v-btn>
                <span class="secondary--text">99 Share</span>
              </div>
            </div>
            <v-divider class="my-4"></v-divider>
            <div v-for="n in 2" :key="n" class="d-flex align-start mx-4">
              <v-avatar color="primary" size="50" class="mr-4">
                <img
                  src="https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1"
                  alt="John"
              /></v-avatar>
              <div>
                <div class="text-subtitle-1">Desmond</div>
                <div class="grey--text">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Doloribus unde harum, enim magnam recusandae beatae porro nemo
                  in itaque exercitationem incidunt minus alias maxime sed omnis
                  aliquam ratione. Consequatur, quo.
                </div>
                <div class="text-end">
                  <v-btn :disabled="!$user.current()" color="grey" text
                    >Unlike</v-btn
                  >
                  <v-btn :disabled="!$user.current()" color="primary" text
                    >Reply</v-btn
                  >
                </div>
              </div>
            </div>
            <v-text-field
              :disabled="!$user.current()"
              label="Leave your comments here"
              append-icon="mdi-send"
              hide-details
              outlined
              clearable
              type="text"
              class="ma-4"
            ></v-text-field>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-slide-y-transition>
  </Layout>
</template>

<style lang="scss" scoped></style>
