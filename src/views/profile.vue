<script>
import Layout from '@/layouts/main.vue'
import { authComputed } from '@/store/helpers'
import { getPostList, deletePost } from '@/api/post.js'
import * as BlogAPI from '@/api/blog.js'
import { fetchUserMemo } from '@/api/user.js'
import { getAllProfileMessage, sendProfileMessage } from '@/api/profileMessage.js'
import BlogEditor from '@/components/blog-editor.vue'
import PostCard from '@/components/post-card.vue'
import MessageCard from '@/components/message-card.vue'
import IdentityEditor from '@/components/identity-editor.vue'
export default {
  name: 'Profile',
  components: {
    PostCard,
    MessageCard,
    BlogEditor,
    IdentityEditor,
    Layout,
  },
  data() {
    return {
      postList: [],
      blogList: [],
      messageList: [],
      inputMessage: '',
      flowWidth: '60vw',
      selectedTab: 'post',
      selectedTag:'',
      user: {
        name: 'Yunxuan',
        background: require('@/assets/profile-bg1.jpg'),
        currentIdentity: 'painter',
        about: [
          'Contact & Basic Info',
          'My identities',
          'My tags',
        ],
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
            content: '123345@gmail.com'
          },
          {
            title: 'Address',
            content: '123345@gmail.com'
          },
          {
            title: 'Personal website',
            content: 'https://github.com/jack'
          },
          {
            title: 'Mobile',
            content: '1234534646767'
          },
        ],
        experience: {
          education: [],
          work: []
        },
        tags: [
          'Reading',
          'Fishing',
          'Cooking',
          'Writer'
        ]
      },
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
      postActions: [
        {
          title: 'Pin Post',
          icon: 'mdi-pin-outline',
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
                    this.$snackbar.warning('A post was deleted')
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
          action: 'error',
        },
        {
          title: 'Hide Post',
          icon: 'mdi-eye-off-outline',
          action: 'error',
        },
        {
          title: 'Report Post',
          icon: 'mdi-alert',
          action: 'error',
        },
        {
          title: 'Follow User',
          icon: 'mdi-account-star-outline',
          action: 'error',
        },
        {
          title: 'Block User',
          icon: 'mdi-account-cancel-outline',
          action: 'error',
        },
      ],
      blogActions: [
        {
          title: 'Pin Blog',
          icon: 'mdi-pin-outline',
          action: () =>
            this.$dialog({
              title: 'Pin this blog',
              content:
                'This will appear at the top of your blog and replace any previous pinned blog. Are you sure?',
            }),
        },
        {
          title: 'Delete Blog',
          icon: 'mdi-delete-outline',
          action: (id) =>
            this.$dialog({
              title: 'Delete this blog',
              content: 'Are you sure you want to delete this blog?',
              confirmButton: {
                action: (async (id, deleteBlog) => {
                  this.$overlay.open()
                  try {
                    await deleteBlog(id)
                    await this.getBlogList()
                    this.$overlay.close()
                    this.$snackbar.warning('A blog was deleted')
                  } catch (error) {
                    console.log(error)
                    this.$overlay.close()
                    this.$snackbar.error(error.rawMessage)
                  }
                }).bind(this, id, BlogAPI.deleteBlog),
              },
            }),
        },
        {
          title: 'Save Blog',
          icon: 'mdi-content-save-outline',
          action: 'error',
        },
        {
          title: 'Hide Blog',
          icon: 'mdi-eye-off-outline',
          action: 'error',
        },
        {
          title: 'Report Blog',
          icon: 'mdi-alert',
          action: 'error',
        },
        {
          title: 'Follow User',
          icon: 'mdi-account-star-outline',
          action: 'error',
        },
        {
          title: 'Block User',
          icon: 'mdi-account-cancel-outline',
          action: 'error',
        },
      ],

    }
  },
  beforeMount() {
    const lastTopic = this.$storage.get('last-topic')
    this.topic = lastTopic || this.topic
    window.addEventListener('beforeunload', () => {
      if (this.topic.content.trim()) {
        this.$storage.set('last-topic', this.topic)
      } else {
        this.$storage.remove('last-topic')
      }
    })
  },
  // beforeRouteLeave() {
  //   if (this.topic && this.topic.content.trim()) {
  //     this.$storage.set('last-topic', JSON.stringify(this.topic))
  //   } else {
  //     this.$storage.remove('last-topic')
  //   }
  // },
  async mounted() {
      await this.getPostList()
      await this.getBlogList()
      await this.getAllProfileMessage()
  },
  computed: {
    ...authComputed,
  },
  methods: {
    async getPostList() {
      try {
        this.postList = await getPostList(this.selectedTab)
        this.$nextTick(async () => {
          for (let post of this.postList) {
            const user = await fetchUserMemo(post.get('authorId'))
            this.$set(post, 'authorName', user ? user.getUsername() : '')
          }
        })
      } catch (error) {
        console.log(error)
        this.$snackbar.error(error.rawMessage)
      }
    },
    async getBlogList() {
      try {
        this.blogList = await BlogAPI.getBlogList(this.selectedTab)
        this.$nextTick(async () => {
          for (let blog of this.blogList) {
            const user = await fetchUserMemo(blog.get('authorId'))
            this.$set(blog, 'authorName', user ? user.getUsername() : '')
          }
        })
      } catch (error) {
        console.log(error)
        this.$snackbar.error(error.rawMessage)
      }
    },
    async getAllProfileMessage() {
      try {
        this.messageList = await getAllProfileMessage()
        console.log(this.messageList)
      } catch (error) {
        console.log(error)
        this.$snackbar.error(error.rawMessage)
      }
    },
    async sendProfileMessage(content) {
      let receiverId = this.$route.query.id
      console.log(receiverId)
      try {
        sendProfileMessage(receiverId,content)
      } catch (error) {
        console.log(error)
        this.$snackbar.error(error.rawMessage)
      }
      this.savingPost = false
    },
  },
}
</script>

<template>
  <Layout>
    <identity-editor ref="identity-editor"></identity-editor>
    <blog-editor ref="blog-editor" @created="getBlogList"></blog-editor>   
    <contactInfo-editor ref="contactInfo-editor"></contactInfo-editor >   

    <v-row>
      <v-col md="12">
        <v-card
          rounded
          :loading="loading"
          class="mx-auto my-12"
          elevation="2"
          :style="{ width: flowWidth }"
        >
          <div>
            <v-img
              :src="user.background"
              alt="profile-bg"
              class="w-100"
            />
          </div>
          <v-row class="pt-5">
            <v-col md="4" class="d-flex align-center">
                <div class="d-flex justify-center d-inline-block pb-3 ml-6">
                  <div
                    v-for="(item, index) in user.statistic"
                    :key="index"
                    class="d-flex flex-column pl-3 pr-3"
                  >
                    <p class="mb-0 text-center">
                      {{ item.info }}
                    </p>
                    <h6 class="mb-0 text-center">{{ item.value }}</h6>
                  </div>
                </div>
            </v-col>
            <v-col md="4">
              <div class="d-flex flex-column align-center">
                  <v-avatar color="primary" size="120" >
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"
                  /></v-avatar>
                  <h3 class="font-weight-bold">{{ user.name }}</h3>
              </div>
            </v-col>
            <v-col md="4" class="d-flex align-center justify-end">
              <div class="mr-7">
                <v-btn>
                  <v-icon>mdi-pen</v-icon>
                  {{user.currentIdentity}}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>

        <v-card :style="{ width: flowWidth }" elevation="2" rounded>
          <v-tabs
            :style="{ width: flowWidth }"
            v-model="selectedTab"
            grow
            active-class="white--text primary"
            slider-color="secondary"
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
        </v-card>

        <v-card :style="{ width: flowWidth }" elevation="2" rounded>
          <v-tabs-items v-model="selectedTab" class="mt-4" elevation="2">
            <v-tab-item :value="tabs[0].value" :style="{ width: flowWidth }">      
              <div
                v-for="(post, index) in postList"
                :key="index"
              >
                <PostCard 
                  :articleActions="postActions" 
                  :article="post"  
                  :flowWidth="flowWidth"
                >
                </PostCard>
              </div>
            </v-tab-item>
            <v-tab-item :value="tabs[1].value" :style="{ width: flowWidth }">               
              <v-card rounded class="pa-2 mb-6" :width="flowWidth">
                <v-card-title class="text-h5 mb-2 primary--text font-weight-medium">
                  T-Square
                </v-card-title>
                <v-divider class="mb-2"></v-divider>
                <v-card-text v-if="$user.current()" class="d-flex align-center">
                  <v-avatar
                    color="primary"
                    size="60"
                    class="mr-6 clickable"
                  >
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"
                  /></v-avatar>
                  <v-text-field
                    label="What happened in your world today?"
                    append-icon="mdi-pencil"
                    hide-details
                    outlined
                    @click="$refs['blog-editor'].show()"
                  ></v-text-field>
                </v-card-text>
              </v-card>
              <div
                v-for="(blog, index) in blogList"
                :key="index"
              >
                <PostCard 
                  :articleActions="blogActions" 
                  :article="blog"  
                  :flowWidth="flowWidth"
                >
                </PostCard>
              </div>
            </v-tab-item>
            <v-tab-item :value="tabs[2].value" :style="{ width: flowWidth }">            
              <v-card>
                <v-tabs vertical>
                  <v-tab class="d-flex justify-start">
                    <v-icon left>
                      mdi-phone
                    </v-icon>
                    {{user.about[0]}}
                  </v-tab>
                  <v-tab class="d-flex justify-start">
                    <v-icon left>
                      mdi-account
                    </v-icon>
                    {{user.about[1]}}
                  </v-tab>
                  <v-tab class="d-flex justify-start">
                    <v-icon left>
                      mdi-tag
                    </v-icon>
                    {{user.about[2]}}
                  </v-tab>

                  <v-tab-item>
                    <v-card flat>
                      <v-list
                        two-line
                        subheader
                      >
                        <v-subheader class="d-flex justify-space-between">
                          <h2>Contact</h2> 
                          <!-- <v-btn 
                            small
                            @click="$refs['contactInfo-editor'].show()"
                          >
                            <v-icon small>mdi-pen</v-icon>
                            Edit info
                          </v-btn> -->
                        </v-subheader>
                        <v-list-item
                          v-for="(info,index) in user.contactInfo"
                          :key="index"
                        >
                          <v-list-item-content>
                            <v-list-item-title>{{info.title}}</v-list-item-title>
                            <v-list-item-subtitle>{{info.content}}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="d-flex flex-column align-start">
                        <v-card-title>My identities</v-card-title>
                        <v-chip-group
                          v-model="selectedTag"
                          class="ml-3"
                          color="#8ab6c9"
                          column
                        >
                          <v-chip
                            v-for="(tag,index) in user.tags"
                            :key="index"
                          >
                            {{tag}}
                          </v-chip>
                        </v-chip-group>
                        <v-btn 
                          class="ml-3 mt-3" 
                          @click="$refs['identity-editor'].show()"
                        >
                          Manage my identities
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="d-flex flex-column align-start">
                        <v-card-title>My Tags</v-card-title>
                        <v-chip-group
                          v-model="selectedTag"
                          class="ml-3"
                          color="#8ab6c9"
                          column
                        >
                          <v-chip
                            v-for="(tag,index) in user.tags"
                            :key="index"
                          >
                            {{tag}}
                          </v-chip>
                        </v-chip-group>
                        <v-btn 
                          class="ml-3 mt-3" 
                        >
                          Add a new tag
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </v-card>
            </v-tab-item>
            <v-tab-item :value="tabs[3].value" :style="{ width: flowWidth }">            
              <v-row>
                <v-col cols="3">
                  <v-card outlined rounded elevation="2" class="ma-3">
                    <v-card-title>
                      Welcome to your Ask & Message Board
                    </v-card-title>
                    <v-card-text>
                      This is your Ask & Message Board.
                      People will come here and choose to leave
                      any messages or ask you some questions.
                      Say something to people whoever come here!
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col class="d-flex flex-column">
                  <v-card rounded>
                    <v-form class="d-flex align-center ma-3">
                      <v-textarea
                        v-model="inputMessage"
                        height="5vw"
                        solo
                        label="Leave your message here..."
                      ></v-textarea>
                      <v-btn
                        class="mx-2 mb-6"
                        fab
                        dark
                        small
                        color="primary"
                        @click="sendProfileMessage(inputMessage)"
                      >
                        <v-icon dark>
                          mdi-send
                        </v-icon>
                      </v-btn>
                    </v-form>
                  </v-card>
                  <v-card outlined rounded elevation="2" class="mx-3 mb-3">
                    <v-card-title>
                      Message Board
                    </v-card-title>
                    <div
                      v-for="(message, index) in messageList"
                      :key="index"
                    >
                        <MessageCard     
                          :messageActions="messageActions" 
                          :message="message"
                        >
                        </MessageCard>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </Layout>
</template>

<style lang="scss" scoped></style>
