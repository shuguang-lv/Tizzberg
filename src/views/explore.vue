<script>
import Layout from '@/layouts/main.vue'

export default {
  components: {
    Layout,
  },
  data() {
    return {
      flowWidth: '50vw',
      showTopicEditor: false,
      topic: {
        title: '',
        description: '',
        content: '',
      },
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
          title: 'Following',
          value: 'tab-following',
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
          action: () =>
            this.$Dialog({
              title: 'Delete this topic',
              content: 'Are you sure you want to delete this topic?',
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
          description: 'This topic is visible to all users',
          icon: 'mdi-eye-outline',
          value: 'public',
        },
        {
          text: 'Cooperate',
          description: 'This topic is visible to your followers',
          icon: 'mdi-account-multiple-outline',
          value: 'follower',
        },
        {
          text: 'Private',
          description: 'Only yourself can see this topic',
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
      <v-row class="pa-2 mb-6" elevation="1">
        <v-col
          v-for="n in 9"
          :key="n"
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

            <v-card-title>Cafe Badilico</v-card-title>

            <v-card-text>
              <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
            </v-card-text>

            <v-row >
              <v-col class="d-flex justify-center">
                <v-btn width="90%" class="ma-4">
                  Collect
                </v-btn>
              </v-col>
            </v-row>

          </v-card>
        </v-col>
      </v-row>
    </v-container>


    <!-- topic editor -->
    <v-dialog v-model="showTopicEditor" persistent closable max-width="700">
      <v-card tile>
        <v-card-title class="text-h5 secondary--text">
          Create Topic
          <v-spacer></v-spacer>
          <v-btn icon color="primary" @click="discardTopic">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="d-flex align-center pt-4">
          <v-avatar color="primary" size="60" class="mr-6" >
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
              v-model="topic.description"
              label="write your topic's description here"
              :rules="topicDescriptionRules"
              rows="10"
              counter
              clearable
              outlined
          >
            <template v-slot:counter="{}">
              {{ topic.description ? topic.description.trim().split(/\s+/).length : 0 }} /
              200</template
            >
          </v-textarea>
          <v-textarea
              v-model="topic.content"
              label="write your topic here"
              rows="10"
              counter
              :rules="topicContentRules"
              clearable
              outlined
          >
            <template v-slot:counter="{}">
              {{ topic.content ? topic.content.trim().split(/\s+/).length : 0 }} /
              800</template
            >
          </v-textarea>
        </v-card-text>

        <div class="d-flex px-4 mt-n4">
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
                    v-text="item.description"
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
          <v-btn depressed large color="primary" width="200"> Topic </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </Layout>
</template>

<style lang="scss" scoped></style>
