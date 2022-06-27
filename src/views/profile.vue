<script>
import Layout from '@/layouts/main.vue'
import { authComputed } from '@/store/helpers'
import * as topicAPI from '@/api/topic'
import Topic from '@/models/Topic'

export default {
  name: 'Profile',
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
      selectedTab: 'hot',
      tabs: [
        {
          title: 'Hot',
          value: 'hot',
        },
        {
          title: 'Latest',
          value: 'latest',
        },
      ],
      topicActions: [
        {
          title: 'Pin Topic',
          icon: 'mdi-pin-outline',
          action: () =>
            this.$dialog({
              title: 'Pin this topic',
              content:
                'This will appear at the top of your blog and replace any previous pinned topic. Are you sure?',
            }),
        },
        {
          title: 'Delete Topic',
          icon: 'mdi-delete-outline',
          action: () =>
            this.$dialog({
              title: 'Delete this topic',
              content: 'Are you sure you want to delete this topic?',
              // topic_position: n,
              confirmButton: {
                // action: (async (n) => {
                //   await topicAPI.deleteTopic(this.topicList[n - 1].id)
                // }).bind(this, n),
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
          exploreMember: [],
        },
        {
          backgroundimg: '',
          exploreimg: '',
          title: 'Designer',
          text: 'Lorem Ipsum data',
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
          exploreMember: [],
        },
        {
          backgroundimg: '',
          exploreimg: '',
          title: 'Designer',
          text: 'Lorem Ipsum data',
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
          exploreMember: [],
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
  mounted() {
    this.topicList = this.getAllTopic()
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
      this.$dialog({
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
    async createTopic(topic) {
      const newTopic = new Topic()
      newTopic.title = topic.title
      newTopic.content = topic.content
      newTopic.authorId = this.$user.current().getObjectId()
      topicAPI.addTopic(newTopic)
    },
    async getAllTopic() {
      this.topicList = await topicAPI.getAllTopic()
    },
    deleteTopic(topicId) {
      return topicAPI.deleteTopic(topicId)
    },
    viewTopicDetail(n) {
      this.$router.push({ path: `/topic-detail/${this.topicList[n - 1].id}` })
    },
  },
}
</script>

<template>
  <Layout>

  </Layout>
</template>

<style lang="scss" scoped></style>
