<script>
import Layout from '@/layouts/main.vue'
// import IdentityEditor from '@/components/identity-editor.vue'
import { authComputed } from '@/store/helpers'
import * as userAPI from  '@/api/User'
import * as topicAPI from  '@/api/Topic'
import Topic from '@/models/Topic'

export default {
  name: 'Explore',
  components: {
    Layout,
  },
  data() {
    return {
      flowWidth: '50vw',
      showTopicEditor: false,
      topic: new Topic(),
      topicList: [],
      topicTitleRules: [
        (v) => !v || v.trim().split(/\s+/).length <= 80 || 'Max 80 words',
      ],
      topicDescriptionRules: [
        (v) => !v || v.trim().split(/\s+/).length <= 200 || 'Max 200 words',
      ],
      topicContentRules: [
        (v) => !v || v.trim().split(/\s+/).length <= 800 || 'Max 800 words',
      ],
      selectedTab: 'tab-hot',
      tabs: [
        {
          title: 'Hot',
          value: 'tab-hot',
        },
        {
          title: 'Latest',
          value: 'tab-latest',
        },
      ],
      topicActions: [
        {
          title: 'Pin Topic',
          icon: 'mdi-pin-outline',
          action: () =>
            this.$Dialog({
              title: 'Pin this topic',
              content:
                'This will appear at the top of your blog and replace any previous pinned topic. Are you sure?',
            }),
        },
        {
          title: 'Delete Topic',
          icon: 'mdi-delete-outline',
          action: (n) =>
            this.$Dialog({
              title: 'Delete this topic',
              content: 'Are you sure you want to delete this topic?',
              topic_position: n,
              confirmButton: {
                action: (async (n) => {
                  await topicAPI.deleteTopic(this.topicList[n - 1].id)
                }).bind(this, n),
              },
            }),
        },
        {
          title: 'Save Topic',
          icon: 'mdi-content-save-outline',
          action: 'error',
        },
        {
          title: 'Hide Topic',
          icon: 'mdi-eye-off-outline',
          action: 'error',
        },
        {
          title: 'Report Topic',
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
      topicAccess: [
        {
          text: 'Public',
          content: 'This topic is visible to all users',
          icon: 'mdi-eye-outline',
          value: 'public',
        },
        {
          text: 'Follower',
          content: 'This topic is visible to your followers',
          icon: 'mdi-account-multiple-outline',
          value: 'follower',
        },
        {
          text: 'Private',
          content: 'Only yourself can see this topic',
          icon: 'mdi-lock-outline',
          value: 'private',
        },
      ],
      topicTags: [
        {
          text: 'TagA',
          value: 'a',
        },
        {
          text: 'TagB',
          value: 'b',
        },
        {
          text: 'TagC',
          value: 'c',
        },
      ],
      exploreInfo: [
        {
          backgroundimg: '',
          exploreimg: '',
          title: 'Designer',
          text: 'Lorem Ipsum data',
          otherinfo: [
            {
              info: 'Like',
              value: '600'
            },
            {
              info: 'Member',
              value: '320'
            },
            {
              info: 'Visit',
              value: '1.2k'
            }
          ],
          exploreMember: [
          ]
        },
        {
          backgroundimg: '',
          exploreimg: '',
          title: 'Designer',
          text: 'Lorem Ipsum data',
          otherinfo: [
            {
              info: 'Like',
              value: '600'
            },
            {
              info: 'Member',
              value: '320'
            },
            {
              info: 'Visit',
              value: '1.2k'
            }
          ],
          exploreMember: [
          ]
        },        
        {
          backgroundimg: '',
          exploreimg: '',
          title: 'Designer',
          text: 'Lorem Ipsum data',
          otherinfo: [
            {
              info: 'Like',
              value: '600'
            },
            {
              info: 'Member',
              value: '320'
            },
            {
              info: 'Visit',
              value: '1.2k'
            }
          ],
          exploreMember: [
          ]
        }
      ]
    }
  },
  beforeMount() {
    const lastTopic = JSON.parse(window.localStorage.getItem('last-topic'))
    this.topic = lastTopic || this.topic
    window.addEventListener('beforeunload', () => {
      if (this.topic.content.trim()) {
        window.localStorage.setItem('last-topic', JSON.stringify(this.topic))
      } else {
        window.localStorage.removeItem('last-topic')
      }
    })
  },
  // beforeRouteLeave() {
  //   if (this.topic && this.topic.content.trim()) {
  //     window.localStorage.setItem('last-topic', JSON.stringify(this.topic))
  //   } else {
  //     window.localStorage.removeItem('last-topic')
  //   }
  // },
  mounted () {
    this.topicList = this.getAllTopic();
  },
  computed: {
    ...authComputed,
  },
  methods: {
    discardTopic() {
      if (!this.topic.content.trim()) {
        this.showTopicEditor = false
        return
      }
      this.$Dialog({
        title: 'Discard this topic ?',
        cancelButton: {
          text: 'Nevermind',
          action: () => {},
        },
        confirmButton: {
          text: 'Discard',
          action: () => {
            this.topic = {
              title: '',
              content: '',
            }
            this.showTopicEditor = false
          },
        },
      })
    },
    async addTopic(topic) {
      topic.author = await userAPI.getCurrentUser()
      topicAPI.addTopic(topic)
    },
    async getAllTopic() {
      this.topicList = await topicAPI.getAllTopic()
    },
    deleteTopic(topicId) {
      return topicAPI.deleteTopic(topicId)
    },
    viewTopicDetail (n) {
      this.$router.push({path:`/topic-detail/${this.topicList[n - 1].id}`})
    }
  },
}
</script>

<template>
  <Layout>
    <v-container>
      <v-card rounded class="pa-2 mb-6" elevation="1">
        <v-card-title class="text-h4 mb-2 primary--text font-weight-medium">
          T-Square
        </v-card-title>
        <v-divider class="mb-2"></v-divider>
        <v-card-text class="d-flex align-center">
          <v-avatar color="primary" size="80" class="mr-6">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"
          /></v-avatar>
          <v-text-field
            label="What happened in your world today?"
            append-icon="mdi-pencil"
            hide-details
            outlined
            @click="showTopicEditor = !showTopicEditor"
          ></v-text-field>
        </v-card-text>
      </v-card>

      <div class="mb-6" :style="{ }">
        <v-tabs
          v-model="selectedTab"
          grow
          active-class="white--text primary"
          slider-color="secondary"
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
        <v-tab-item v-for="tab in tabs" :key="tab.value" :value="tab.value">
          <v-card
            v-for="n in topicList.length"
            :key="n"
            rounded
            class="px-2 py-4 mb-6"
            elevation="1"
          >
            <div class="d-flex justify-space-between align-center">
              <div class="d-flex align-center pa-4">
                <v-avatar color="primary" size="50" class="mr-4">
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"
                /></v-avatar>
                <div class="text-subtitle-1">Nik Jon</div>
              </div>
              <div>
                <v-icon color="secondary" class="mx-2">mdi-pin</v-icon>
                <v-menu :disabled="!loggedIn" bottom right rounded="lg">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn large icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                      v-for="(item, i) in topicActions"
                      :key="i"
                      link
                      class="px-8"
                      color="primary"
                      @click="item.action(n)"
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
            <v-card-text class="d-flex align-center text-h5"  v-text="topicList[n-1].attributes.title" @click="viewTopicDetail(n)">
            </v-card-text>
            <v-chip class="ml-4 mb-4" color="primary" outlined> Tag </v-chip>
            <!-- <v-img
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              height="500px"
              class="mb-4"
            ></v-img> -->
            <div class="d-flex justify-space-between align-center px-4">
              <div>
                <v-btn
                  :disabled="!loggedIn"
                  fab
                  small
                  depressed
                  color="secondary"
                  class="mr-4"
                >
                  <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
                <span class="mr-4 secondary--text">120 Likes</span>
                <span class="secondary--text">2 Replies</span>
              </div>
              <div>
                <v-btn :disabled="!loggedIn" icon color="secondary" class="mr-2">
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
                  <v-btn :disabled="!loggedIn" color="grey" text>Unlike</v-btn>
                  <v-btn :disabled="!loggedIn" color="primary" text>Reply</v-btn>
                </div>
              </div>
            </div>
            <v-text-field
              :disabled="!loggedIn"
              label="Leave your replies here"
              append-icon="mdi-send"
              hide-details
              outlined
              clearable
              type="text"
              class="mx-4 mt-4"
            ></v-text-field>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <!-- <v-row class="pa-2 mb-6" elevation="1">
        <v-col
          v-for="item in exploreInfo"
          :key="item"
          cols="12"
          sm="4"
        >
          <v-card
            :loading="loading"
            rounded
            elevation="2"
            class="mx-auto my-12"
            max-width="374"
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img
              height="250"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>


            <div class="pt-3 pb-3">
              <h2 class="text-center">{{ item.title }}</h2>
              <p class="text-center">{{ item.text }}</p>
            </div>
            <div class="d-flex justify-center d-inline-block pb-3">
                <div
                  v-for="(item,index) in item.otherinfo"
                  :key="index"
                  class="d-flex flex-column pl-3 pr-3"
                >
                  <p class="mb-0 text-center">
                    {{ item.info }}
                  </p>
                  <h6 class="mb-0 text-center">{{ item.value }}</h6>
                </div>
            </div>

            <v-row>
              <v-col class="d-flex justify-center">
                <v-btn width="90%" class="ma-4"> Collect </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row> -->
    </v-container>

    <!-- topic editor -->
    <v-dialog v-model="showTopicEditor" persistent closable max-width="700">
      <v-card tile class="d-flex flex-column ">
        <v-card-title class="text-h5 secondary--text">
          Edit Topic
          <v-spacer></v-spacer>
          <v-btn icon color="primary" @click="discardTopic">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="d-flex align-center pt-4">
          <v-avatar color="primary" size="60" class="mr-6">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"
          /></v-avatar>
          <v-text-field
            class="d-flex align-center pt-6"
            v-model="topic.title"
            label="write your title here"
            :rules="topicTitleRules"
            outlined
          >
            <!-- <template v-slot:counter="{}">
              {{ topic.content ? topic.content.trim().split(/\s+/).length : 0 }} /
              80</template
            > -->
          </v-text-field>
        </v-card-text>
        <v-card-text>
          <v-textarea
            v-model="topic.content"
            label="write your topic's content here"
            :rules="topicDescriptionRules"
            rows="10"
            counter
            clearable
            outlined
          >
            <template v-slot:counter="{}">
              {{
                topic.content
                  ? topic.content.trim().split(/\s+/).length
                  : 0
              }}
              / 200</template
            >
          </v-textarea>
          <!-- <v-textarea
              v-model="topic.content"
              label="write your topic here"
              rows="10"
              counter
              :rules="topicContentRules"
              clearable
              outlined
          >
            <template v-slot:counter="{}">
              {{
                topic.content ? topic.content.trim().split(/\s+/).length : 0
              }}
              / 800</template
            >
          </v-textarea> -->
        </v-card-text>

        <div class="d-flex pl-6 mt-n4">
          <v-checkbox
            v-model="checkbox"
            label="Send me topic reply notifications"
          ></v-checkbox>
          <v-spacer class="mx-16"></v-spacer>
          <v-select
            :items="topicAccess"
            filled
            disable-lookup
            hide-details
            label="Access"
          >
            <template v-slot:item="{ item, on, attrs }">
              <v-list-item link class="px-8" v-bind="attrs" v-on="on">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="item.content"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
        </div>
        <v-divider class="mb-2 mt-4"></v-divider>
        <v-card-actions class="pb-4">
          <v-btn depressed large outlined color="primary" width="200">
            Save as draft
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn depressed large color="primary" width="200" @click="addTopic(topic)"> Topic </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </Layout>
</template>

<style lang="scss" scoped></style>
