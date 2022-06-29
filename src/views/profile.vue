<script>
import Layout from '@/layouts/main.vue'
import { authComputed } from '@/store/helpers'
import { getPostList, deletePost } from '@/api/post.js'
import { fetchUserMemo } from '@/api/user.js'
import PostCard from '@/components/post-card.vue'
export default {
  name: 'Profile',
  components: {
    PostCard,
    Layout,
  },
  data() {
    return {
      postList: [],
      flowWidth: '60vw',
      selectedTab: 'post',
      user: {
        name: 'Yunxuan',
        background: require('@/assets/profile-bg1.jpg'),
        currentIdentity: 'painter',
        about: [
          'Contact & Basic Info',
          'Details About You',
          'Work and Education'
        ],
        otherinfo: [
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
          title: 'Follow',
          value: 'follow',
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
  },
}
</script>

<template>
  <Layout>
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
                    v-for="(item, index) in user.otherinfo"
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
                      mdi-school
                    </v-icon>
                    {{user.about[2]}}
                  </v-tab>

                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <p class="mb-0">
                          Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut odio.
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <p class="mb-0">
                          Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <p class="mb-0">
                          Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </Layout>
</template>

<style lang="scss" scoped></style>
