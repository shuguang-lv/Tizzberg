<script>
import { deletePost } from '@/api/post.js'
import { fetchUserMemo } from '@/api/user.js'
import { checkPostLiked, likePost, unlikePost, countLikes } from '@/api/like.js'
import { replyToPost, fetchPostReplies } from '@/api/comment.js'
import Action from '@/models/Action'

export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLiked: false,
      liking: false,
      likeCount: 0,
      deletePostApi: deletePost,
      replying: false,
      replies: [],
      newReply: new Action({
        userId: this.$user.current() ? this.$user.current().getObjectId() : '',
        targetId: this.post.objectId,
        targetClass: 'Post',
      }),
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
          action: this.deletePost,
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
  async mounted() {
    try {
      const user = await fetchUserMemo(this.post.authorId)
      this.post.authorName = user ? user.toJSON().username : ''
      this.isLiked = this.$user.current()
        ? await checkPostLiked(
            this.$user.current().getObjectId(),
            this.post.objectId
          )
        : false
      if (this.isLiked) {
        this.isLiked = this.isLiked.toJSON()
      }
      this.likeCount = await countLikes(this.post.objectId)
      await this.updateReplyList()
    } catch (error) {
      console.log(error)
      this.$snackbar.error(error.rawMessage)
    }
  },
  methods: {
    async deletePost(id) {
      this.$dialog({
        title: 'Delete this post',
        content: 'Are you sure you want to delete this post?',
        confirmButton: {
          action: async () => {
            this.$overlay.open()
            try {
              await this.deletePostApi(id)
              this.$emit('refresh')
              this.$overlay.close()
              this.$snackbar.warn('A post was deleted')
            } catch (error) {
              console.log(error)
              this.$overlay.close()
              this.$snackbar.error(error.rawMessage)
            }
          },
        },
      })
    },
    async likePost() {
      this.liking = true
      try {
        const res = await likePost(
          new Action({
            userId: this.$user.current().getObjectId(),
            targetId: this.post.objectId,
            targetClass: 'Post',
          })
        )
        this.isLiked = res.toJSON()
        this.likeCount++
      } catch (error) {
        console.log(error)
        this.$snackbar.error(error.rawMessage)
      }
      this.liking = false
    },
    async unlikePost() {
      this.liking = true
      try {
        await unlikePost(this.isLiked.objectId)
        this.isLiked = false
        this.likeCount--
      } catch (error) {
        console.log(error)
        this.$snackbar.error(error.rawMessage)
      }
      this.liking = false
    },
    async replyToPost() {
      if (!this.newReply.content.trim()) {
        return
      }
      this.replying = true
      try {
        await replyToPost(this.newReply)
        this.newReply.content = ''
        await this.updateReplyList()
      } catch (error) {
        console.log(error)
        this.$snackbar.error(error.rawMessage)
      }
      this.replying = false
    },
    async updateReplyList() {
      try {
        this.replies = []
        let replies = await fetchPostReplies(this.post.objectId)
        if (replies.length > 0) {
          replies = replies.map((reply) => reply.toJSON())
        }
        this.$nextTick(async () => {
          for (let reply of replies) {
            const user = await fetchUserMemo(reply.userId)
            reply.userName = user ? user.toJSON().username : ''
            this.replies.push(reply)
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
  <v-card rounded class="px-2 py-4 my-8 mx-4" elevation="3" width="50vw">
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex align-center pa-4">
        <v-avatar color="primary" size="50" class="mr-4">
          <v-img
            src="https://avatars.dicebear.com/api/micah/desmond.svg"
            alt="John"
          ></v-img
        ></v-avatar>
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
                  ($user.current() &&
                  $user.current().getObjectId() == post.authorId
                    ? action.privilege === 'self'
                    : action.privilege === 'other')
              )"
              :key="item.title"
              link
              class="px-8"
              color="primary"
              @click="item.action(post.objectId)"
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
    <v-card-text class="d-flex align-center text-body-1" v-text="post.content">
    </v-card-text>
    <v-btn
      v-for="tag in post.tags"
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
          v-if="isLiked"
          :disabled="!$user.current() || liking"
          fab
          small
          depressed
          color="secondary"
          class="mr-4"
          @click="unlikePost"
        >
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>
        <v-btn
          v-else
          :disabled="!$user.current() || liking"
          fab
          small
          depressed
          color="background"
          class="mr-4"
          @click="likePost"
        >
          <v-icon color="white">mdi-thumb-up</v-icon>
        </v-btn>
        <span class="mr-4 secondary--text">{{ likeCount }} Likes</span>
        <span class="secondary--text">{{ replies.length }} Replies</span>
      </div>
      <div>
        <v-btn :disabled="!$user.current()" icon color="secondary" class="mr-2">
          <v-icon>mdi-share-variant-outline</v-icon>
        </v-btn>
        <span class="secondary--text">99 Share</span>
      </div>
    </div>
    <v-divider class="my-4"></v-divider>
    <div
      v-for="reply in replies"
      :key="reply.objectId"
      class="d-flex align-start mx-4"
    >
      <v-avatar color="primary" size="50" class="mr-4">
        <v-img
          src="https://avatars.dicebear.com/api/micah/comment.svg"
          alt="John"
        ></v-img
      ></v-avatar>
      <div style="width: 100%">
        <div class="text-subtitle-1">{{ reply.userName }}</div>
        <div class="grey--text">
          {{ reply.content }}
        </div>
        <div class="text-end">
          <v-btn :disabled="!$user.current()" color="grey" text>Unlike</v-btn>
          <v-btn :disabled="!$user.current()" color="primary" text>Reply</v-btn>
        </div>
      </div>
    </div>
    <v-textarea
      v-model="newReply.content"
      :disabled="!$user.current() || replying"
      label="Reply to this post"
      hide-details
      outlined
      clearable
      auto-grow
      rows="1"
      type="text"
      class="ma-4"
      color="primary"
      :ref="post.objectId"
      @click="
        $vuetify.goTo($refs[post.objectId], {
          duration: 500,
          offset: 400,
          easing: 'easeInOutCubic',
        })
      "
    >
      <template #append-outer>
        <v-btn icon height="100%" color="tertiary" @click="replyToPost"
          ><v-icon>mdi-send</v-icon></v-btn
        >
      </template>
    </v-textarea>
  </v-card>
</template>

<style lang="scss" scoped></style>
