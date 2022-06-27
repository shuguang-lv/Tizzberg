<script>
import IdentityEditor from '@/components/identity-editor.vue'
import { createPost } from '@/api/post.js'
import Post from '@/models/Post'

export default {
  name: 'PostEditor',
  components: {
    IdentityEditor,
  },
  props: {
    post: {
      type: Post,
      default: () => new Post(),
    },
  },
  data() {
    return {
      showPostEditor: false,
      savingPost: false,
      postRules: [
        (v) => !v || v.trim().split(/\s+/).length <= 800 || 'Max 800 words',
      ],
      visibility: [
        {
          text: 'Public',
          description: 'This post is visible to all users',
          icon: 'mdi-eye-outline',
          value: 'public',
        },
        {
          text: 'Follower',
          description: 'This post is visible to your followers',
          icon: 'mdi-account-multiple-outline',
          value: 'follower',
        },
        {
          text: 'Private',
          description: 'Only yourself can see this post',
          icon: 'mdi-lock-outline',
          value: 'private',
        },
      ],
    }
  },
  mounted() {
    const lastPost = this.$storage.get('last-post')
    if (lastPost) {
      Object.assign(this.post, lastPost)
    }
    window.addEventListener('beforeunload', () => {
      if (this.post.content.trim()) {
        this.$storage.set('last-post', this.post)
      } else {
        this.$storage.remove('last-post')
      }
    })
  },
  beforeRouteLeave() {
    if (this.post && this.post.content.trim()) {
      this.$storage.set('last-post', this.post)
    } else {
      this.$storage.remove('last-post')
    }
  },
  methods: {
    show() {
      this.showPostEditor = true
    },
    hide() {
      this.showPostEditor = false
    },
    async createPost() {
      this.savingPost = true
      this.post.authorId = this.$user.current().getObjectId()
      try {
        const post = await createPost(this.post)
        console.log(post)
        this.$snackbar.success('Post was created successfully')
        this.$storage.remove('last-post')
        Object.assign(this.post, new Post())
        this.hide()
        this.$emit('created')
      } catch (error) {
        console.log(error)
        this.$snackbar.error(error.rawMessage)
      }
      this.savingPost = false
    },
    discardPost() {
      if (!this.post.content.trim()) {
        this.hide()
        return
      }
      this.$dialog({
        title: 'Discard this post ?',
        cancelButton: {
          text: 'Nevermind',
          action: () => {},
        },
        confirmButton: {
          text: 'Discard',
          action: () => {
            Object.assign(this.post, new Post())
            this.hide()
          },
        },
      })
    },
  },
}
</script>

<template>
  <div>
    <identity-editor ref="identity"></identity-editor>
    <v-dialog v-model="showPostEditor" persistent closable max-width="700">
      <v-card tile>
        <v-card-title class="text-h5 secondary--text">
          Create Post
          <v-spacer></v-spacer>
          <v-btn icon color="primary" @click="discardPost">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="d-flex align-center pt-4">
          <v-avatar
            color="primary"
            size="70"
            class="mr-6 clickable"
            @click="$refs['identity'].show()"
          >
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"
          /></v-avatar>
          <v-textarea
            v-model="post.content"
            append-outer-icon="mdi-image"
            label="write your post here"
            rows="10"
            counter
            :rules="postRules"
            clearable
            outlined
          >
            <template v-slot:counter="{}">
              {{ post.content ? post.content.trim().split(/\s+/).length : 0 }} /
              800</template
            >
          </v-textarea>
        </v-card-text>
        <div class="d-flex px-4">
          <v-combobox
            v-model="post.tags"
            hide-selected
            label="Add some tags"
            multiple
            small-chips
            outlined
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Press <kbd>enter</kbd> to create a new tag
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-slot:selection="{ attrs, item, parent, selected }">
              <v-chip
                v-bind="attrs"
                color="primary"
                :input-value="selected"
                label
              >
                <span class="pr-2"> #{{ item }} </span>
                <v-icon small @click="parent.selectItem(item)">
                  $delete
                </v-icon>
              </v-chip>
            </template>
          </v-combobox>
          <v-spacer class="mx-16"></v-spacer>
          <v-select
            v-model="post.visibility"
            :items="visibility"
            outlined
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
        <v-divider class="mb-2"></v-divider>
        <v-card-actions class="pb-4">
          <v-btn depressed large outlined color="primary" width="200">
            Save as draft
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            large
            color="primary"
            width="200"
            :loading="savingPost"
            :disabled="savingPost"
            @click="createPost"
          >
            Post
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
