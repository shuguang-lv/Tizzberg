<script>
import Layout from '@/layouts/main.vue'

export default {
  name: 'Fiction',
  components: {
    Layout,
  },
  data() {
    return {
      flowWidth: '60vw',
      showFictionEditor: false,
      fiction: {
        title: '',
        description: '',
        content: '',
      },
      fictionTitleRules: [
        (v) => !v || v.trim().split(/\s+/).length <= 80 || 'Max 80 words',
      ],
      fictionDescriptionRules: [
        (v) => !v || v.trim().split(/\s+/).length <= 200 || 'Max 200 words',
      ],
      fictionContentRules: [
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
      fictionActions: [
        {
          title: 'Pin Fiction',
          icon: 'mdi-pin-outline',
          action: () =>
            this.$dialog({
              title: 'Pin this fiction',
              content:
                'This will appear at the top of your blog and replace any previous pinned fiction. Are you sure?',
            }),
        },
        {
          title: 'Delete Fiction',
          icon: 'mdi-delete-outline',
          action: () =>
            this.$dialog({
              title: 'Delete this fiction',
              content: 'Are you sure you want to delete this fiction?',
            }),
        },
        {
          title: 'Save Fiction',
          icon: 'mdi-content-save-outline',
          action: 'error',
        },
        {
          title: 'Hide Fiction',
          icon: 'mdi-eye-off-outline',
          action: 'error',
        },
        {
          title: 'Report Fiction',
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
      fictionAccess: [
        {
          text: 'Public',
          description: 'This fiction is visible to all users',
          icon: 'mdi-eye-outline',
          value: 'public',
        },
        {
          text: 'Cooperate',
          description: 'This fiction is visible to your followers',
          icon: 'mdi-account-multiple-outline',
          value: 'follower',
        },
        {
          text: 'Private',
          description: 'Only yourself can see this fiction',
          icon: 'mdi-lock-outline',
          value: 'private',
        },
      ],
      fictionTags: [
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
    const lastFiction = this.$storage.get('last-fiction')
    this.fiction = lastFiction || this.fiction
    window.addEventListener('beforeunload', () => {
      if (this.fiction.content.trim()) {
        this.$storage.set('last-fiction', this.fiction)
      } else {
        this.$storage.remove('last-fiction')
      }
    })
  },
  // beforeRouteLeave() {
  //   if (this.fiction && this.fiction.content.trim()) {
  //     this.$storage.set('last-fiction', JSON.stringify(this.fiction))
  //   } else {
  //     this.$storage.remove('last-fiction')
  //   }
  // },
  methods: {
    discardFiction() {
      if (!this.fiction.content.trim()) {
        this.showFictionEditor = false
        return
      }
      this.$dialog({
        title: 'Discard this fiction ?',
        cancelButton: {
          text: 'Nevermind',
          action: () => {},
        },
        confirmButton: {
          text: 'Discard',
          action: () => {
            this.fiction = {
              title: '',
              content: '',
            }
            this.showFictionEditor = false
          },
        },
      })
    },
  },
}
</script>

<template>
  <Layout>
    <div>
      <v-row>
        <v-col class="d-flex justify-center">
            <v-card rounded class="pa-2 mb-6" elevation="1" :width="flowWidth">
              <v-card-title class="text-h5 mb-2 primary--text font-weight-medium">
                Fiction
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
                  label="Create a new story"
                  append-icon="mdi-pencil"
                  hide-details
                  outlined
                  @click="showFictionEditor = !showFictionEditor"
                ></v-text-field>
              </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mb-6 mx-20" elevation="1">
        <v-col
          :width="flowWidth"
          class="d-flex justify-center"
          v-for="item in exploreInfo"
          :key="item"
          cols="12"
          sm="4"
          @click="$router.push({ name: 'fiction-content' })"
        >
          <v-card
            rounded
            elevation="2"
            :loading="loading"
            class="my-3"
            max-width="320"
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
            <v-card-text>
              <div class="pt-2 pb-2">
                <h2 class="text-center">{{ item.title }}</h2>
                <p class="text-center">{{ item.text }}</p>
              </div>
              <div class="d-flex justify-center d-inline-block pb-3">
                <div
                  v-for="(item, index) in item.otherinfo"
                  :key="index"
                  class="d-flex flex-column pl-3 pr-3"
                >
                  <p class="mb-0 text-center">
                    {{ item.info }}
                  </p>
                  <h6 class="mb-0 text-center">{{ item.value }}</h6>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- fiction editor -->
    <v-dialog v-model="showFictionEditor" persistent closable max-width="700">
      <v-card tile>
        <v-card-title class="text-h5 secondary--text">
          Create Fiction
          <v-spacer></v-spacer>
          <v-btn icon color="primary" @click="discardFiction">
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
            v-model="fiction.title"
            label="write your title here"
            :rules="fictionTitleRules"
            outlined
          >
            <!-- <template v-slot:counter="{}">
              {{ fiction.content ? fiction.content.trim().split(/\s+/).length : 0 }} /
              80</template
            > -->
          </v-text-field>
        </v-card-text>
        <v-card-text>
          <v-textarea
            v-model="fiction.description"
            label="write your fiction's description here"
            :rules="fictionDescriptionRules"
            rows="10"
            counter
            clearable
            outlined
          >
            <template v-slot:counter="{}">
              {{
                fiction.description
                  ? fiction.description.trim().split(/\s+/).length
                  : 0
              }}
              / 200</template
            >
          </v-textarea>
          <v-textarea
            v-model="fiction.content"
            label="write your fiction here"
            rows="10"
            counter
            :rules="fictionContentRules"
            clearable
            outlined
          >
            <template v-slot:counter="{}">
              {{
                fiction.content ? fiction.content.trim().split(/\s+/).length : 0
              }}
              / 800</template
            >
          </v-textarea>
        </v-card-text>

        <div class="d-flex px-4 mt-n4">
          <v-select
            :items="fictionTags"
            filled
            clearable
            hide-details
            chips
            deletable-chips
            multiple
            disable-lookup
            single-line
            label="Tags"
          >
          </v-select>
          <v-spacer class="mx-16"></v-spacer>
          <v-select
            :items="fictionAccess"
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
          <v-btn depressed large color="primary" width="200"> Fiction </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </Layout>
</template>
<style lang="scss" scoped></style>
