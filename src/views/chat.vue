<script>
import Layout from '@/layouts/main.vue'
import { updateLastMessage, getLastMessage} from '@/api/lastMessage.js'
import {getMessageList, getFriendList, sendMessage, resetMessageIterator} from '@/api/message.js'

export default {
  data() {
    return {
      flowWidth: '80vw',
      sidebarWidth: '20vw',
      windowWidth: '60vw',
      friendList: [],
      activeChat: 1,
      messageList: [],
      lastMsgs: [],
      chatFriend: {},
      messageForm: {
        content: "",
      }
    }
  },
  name: 'Chat',
  components: {
    Layout,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  async mounted () {
    // followUser('62c434881054e678a0582656')
    // followUser('62b830201054e678a050d05c')
    // followUser('62b85a545f903a0feb5a6723')
    // followUser('62bb34251054e678a052c1f7')
    // sendMessage('62be9fbf5f903a0feb5e41a1', 'content 1')
    // sendMessage('62be9fbf5f903a0feb5e41a1', 'content 2')
    // sendMessage('62be9fbf5f903a0feb5e41a1', 'content 3')
    //getMessageList('62be9fbf5f903a0feb5e41a1')

    await this.getFriendList()
    await this.getAllLastMessage()
    this.timer = setInterval(() => {
       this.getAllLastMessage()
       if (this.chatFriend.objectId) this.getMessageList(this.chatFriend)
    }, 1000*1)
    // console.log(this.friendList)
  },
  methods: {
    async getMessageList(friend) {
      // set chatUser
      this.chatFriend = friend
      // resest messageIterator
      resetMessageIterator()
      //load messages
      let currentUserId = this.$user.current().get('objectId')
      let client = await this.$realtime.createIMClient(currentUserId)
      let conversationQuery = client.getQuery().containsAll('m', [friend.objectId,currentUserId])
      if ( conversationQuery ) {
        this.messageList = await getMessageList(conversationQuery)
        this.messageList = this.messageList.value
        //console.log(this.messageList)
      } else {
        this.$user.current().createConversation({
          // members of conversation
          members: [friend],
          // conversation's name
          name: currentUserId + ' & ' + friend.objectId,
          unique: true
        }).then();
      }
      
    },
    async updateMessageList(friend) {
      let currentUserId = this.$user.current().get('objectId')
      let client = await this.$realtime.createIMClient(currentUserId)
      let conversationQuery = client.getQuery().containsAll('m', [friend.objectId,currentUserId])
      let nextMessages = await getMessageList(conversationQuery)
      this.messageList = nextMessages.value.concat(this.messageList)
    },
    async getFriendList() {
      this.friendList = await getFriendList()
      this.friendList = this.friendList.map((friend) => friend.toJSON())
    },
    async sendMessage(userId, content) {
      this.messageForm.content = ""
      // console.log(this.$user.current().get('objectId') + " " + userId)
      updateLastMessage(this.$user.current().get('objectId'),userId,content)
      sendMessage(userId, content)
    },
    async getAllLastMessage() {
      this.lastMsgs = await Promise.all(this.friendList.map((friend) => (getLastMessage([friend.objectId]))))
      this.lastMsgs = this.lastMsgs.map((msg) => msg[0].attributes ? msg[0].attributes.message : "")
      // console.log(this.lastMsgs)
    },
    isSelfMsg(msg) {
      return (msg.from == this.$user.current().get('objectId'))
    },
    displayTime(timeStamp) {
      return timeStamp
    }
  }
}
</script>

<template>
  <Layout>
    <v-row class="d-flex align-center" rounded style="width: 1500px;">
      <v-col
        cols="3"
      >
          <v-card color="white">
            <v-list subheader height="1000" class="overflow-auto">
              <v-list-item-group v-model="activeChat">
                <template>
                  <div
                    v-for="(friend, index) in friendList"
                    :key="`parent${index}`"
                  >
                    <v-list-item
                      @click="getMessageList(friend)"
                      :value="friend.objectId"
                    >
                      <v-avatar
                        color="primary"
                        size="40"
                        class="mr-6 clickable"
                      >
                        <v-img
                          src="https://avatars.dicebear.com/api/micah/desmond.svg"
                          alt="John"
                        ></v-img>
                      </v-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-text="friend.username" />
                        <v-list-item-subtitle v-text="lastMsgs[index]" />
                      </v-list-item-content>
                      <!-- <v-list-item-icon>
                        <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">
                          User
                        </v-icon>
                      </v-list-item-icon> -->

                    </v-list-item>
                  </div>

                </template>
              </v-list-item-group>
            </v-list>
          </v-card>

      </v-col>
      <v-col
        cols="9"
      >
          <v-card
            flat
            class="d-flex flex-column"
            height="1000"
            color="white"
          >
            <v-card-text v-if="!chatFriend.objectId" class="d-flex align-center justify-center overflow-y-auto flex-grow-1">
              <h1>Start yout chat now!</h1>
            </v-card-text>
            <v-card-title>
              {{chatFriend.username}}
            </v-card-title>
            <v-card-text class="flex-grow-1 overflow-y-auto">
              <template>
                <div class="d-flex justify-center">
                  <v-btn
                    v-if="chatFriend.objectId"
                    outlined
                    large
                    color="tertiary"
                    class="mt-8"
                    @click="updateMessageList(chatFriend)"
                    >load more</v-btn
                  >
                </div>
                <div
                  v-for="(msg, i) in messageList" 
                  :key="i"
                  :class="{ 'd-flex flex-row-reverse': isSelfMsg(msg) }"
                >
                  <v-avatar
                    color="primary"
                    size="40"
                    class="ma-6 clickable"
                    @click="$refs['identity-editor'].show()"
                  >
                    <v-img
                      src="https://avatars.dicebear.com/api/micah/desmond.svg"
                      alt="John"
                    ></v-img>
                  </v-avatar>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-hover
                      >
                        <v-chip
                          :color="isSelfMsg(msg) ? 'primary' : ''"
                          dark
                          style="height:auto;white-space: normal;"
                          class="pa-4 mb-2"
                          v-on="on"
                        >
                          <div class="d-flex flex-column">
                            <div>{{ msg.text }}</div>
                            <sub
                              class="mt-2"
                              style="font-size: 0.4rem;"
                            >{{ msg.updatedAt.toJSON().toString().replace(/[A-Z]/,' ').replace(/[A-Z]/,' ').replace(/\.[0-9]*/,' ')}}</sub>
                          </div>
                        </v-chip>

                      </v-hover>
                    </template>
                    <!-- <v-list>
                      <v-list-item>
                        <v-list-item-title>delete</v-list-item-title>
                      </v-list-item>
                    </v-list> -->
                  </v-menu>
                </div>
              </template>
            </v-card-text>

            <div class="d-flex align-center" v-if="chatFriend.objectId">
              <v-card-text class="flex-shrink-1">
                  <v-text-field
                  v-model="messageForm.content"
                  label="type your message"
                  type="text"
                  no-details
                  outlined
                  hide-details
                />
              </v-card-text>
              <v-btn
                class="ma-2"
                color="primary"
                @click="sendMessage(chatFriend.objectId,messageForm.content)"
              >
                Send
              </v-btn>
            </div>
          </v-card>
      </v-col>
    </v-row>

  </Layout>
</template>

<style lang="scss" scoped></style>
