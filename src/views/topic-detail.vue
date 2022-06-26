<script>
import Layout from '@/layouts/main.vue'
// import IdentityEditor from '@/components/identity-editor.vue'
import { authComputed } from '@/store/helpers'
import * as topicAPI from '@/api/topic'
import Topic from '@/models/Topic'

export default {
  name: 'TopicDetail',
  components: {
    Layout,
  },
  data() {
    return {
      id: null,
      flowWidth: '50vw',
      topic: new Topic(),
      topicActions: [
        {
          title: 'Pin Post',
          icon: 'mdi-pin-outline',
          action: () =>
            this.$Dialog({
              title: 'Pin this post',
              content:
                'This will appear at the top of your blog and replace any previous pinned post. Are you sure?',
            }),
        },
        {
          title: 'Delete Post',
          icon: 'mdi-delete-outline',
          action: () =>
            this.$Dialog({
              title: 'Delete this post',
              content: 'Are you sure you want to delete this post?',
              confirmButton: {
                action: async () => {
                  await topicAPI.deletePost(this.post.id)
                },
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
  mounted() {
    console.log(this.$route.params.id)
    this.id = this.$route.params.id
    this.topic = this.getTopic(this.id)
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
    async getTopic(id) {
      let res = await topicAPI.getTopic(id)
      this.topic = res[0]
      console.log(this.topic)
    },
    deleteTopic(topicId) {
      return topicAPI.deleteTopic(topicId)
    },
  },
}
</script>

<template>
  <Layout>
    <v-card rounded class="px-2 py-4 mb-6" elevation="1" :width="flowWidth">
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
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <v-divider class="mb-2"></v-divider>
      <div v-if="topic">
        <v-card-text
          class="d-flex align-center text-h5"
          v-text="topic.attributes.title"
        >
        </v-card-text>
        <v-row>
          <v-chip class="ml-6 mb-4" color="primary" outlined> Tag </v-chip>
          <v-chip class="ml-6 mb-4" color="primary" outlined> Tag </v-chip>
          <v-chip class="ml-6 mb-4" color="primary" outlined> Tag </v-chip>
        </v-row>
        <v-card-text
          class="d-flex align-center text-h6"
          v-text="topic.attributes.content"
        >
        </v-card-text>
      </div>
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
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            unde harum, enim magnam recusandae beatae porro nemo in itaque
            exercitationem incidunt minus alias maxime sed omnis aliquam
            ratione. Consequatur, quo.
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
  </Layout>
</template>

<style lang="scss" scoped></style>
