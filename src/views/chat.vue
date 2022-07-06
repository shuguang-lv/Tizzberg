<script>
import Layout from '@/layouts/main.vue'

export default {
  data() {
    return {
      flowWidth: '80vw',
      sidebarWidth: '20vw',
      windowWidth: '60vw',
  //     selectedItem: 1,
  //     messages: [
  //       { text: 'Hi Desmond. Long time no see. How do you do? ', time: '18:32'},
  //       { text: 'Hi Yunxuan. How are you doing?', time: '19:22'},
  //       { text: 'Hi Yunxuan. How are you doing?', time: '19:55'},
  //     ],
      activeChat: 1,
      contacts: [
        {
          id: 1,
          title: "john doe",
          active: true
        },
        {
          id: 3,
          title: "scarlett",
          active: false
        },
        {
          id: 4,
          title: "scarlett",
          active: false
        },
        {
          id: 5,
          title: "scarlett",
          active: false
        },
        {
          id: 6,
          title: "scarlett",
          active: false
        },
        {
          id: 7,
          title: "scarlett",
          active: false
        },
        {
          id: 8,
          title: "scarlett",
          active: false
        },
        {
          id: 9,
          title: "scarlett",
          active: false
        },
        {
          id: 10,
          title: "scarlett",
          active: false
        },
        {
          id: 11,
          title: "scarlett",
          active: false
        },
        {
          id: 12,
          title: "scarlett",
          active: false
        },
        {
          id: 13,
          title: "scarlett",
          active: false
        },
        {
          id: 14,
          title: "scarlett",
          active: false
        }
      ],
      messages: [
        {
          content: "lorem ipsum",
          me: true,
          created_at: "11:11am"
        },
        {
          content: "I’m going to learn dynamic Magic English.",
          me: false,
          created_at: "11:11am"
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:11am"
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:11am"
        },
        {
          content: "dolor",
          me: true,
          created_at: "11:11am"
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:12am"
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:14am"
        }
      ],
      messageForm: {
        content: "",
        me: true,
        created_at: "11:11am"
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
}
</script>

<template>
  <Layout>

      <!-- <v-col cols="4">
        <v-list flat>
          <v-subheader class="text-h5 mb-2 primary--text font-weight-medium">Messages</v-subheader>
          <v-list-item-group
            v-model="selectedItem"
            color="primary"
          >
            <v-list-item
              class="my-2"
              v-for="(message, index) in messages"
              :key="index"
            >
              <v-avatar
                color="primary"
                size="40"
                class="mr-6 clickable"
                @click="$refs['identity-editor'].show()"
              >
                <v-img
                  src="https://avatars.dicebear.com/api/micah/desmond.svg"
                  alt="John"
                ></v-img>
              </v-avatar>
              <v-list-item-content class="d-flex justify-center">
                <v-list-item-title v-text="message.text"></v-list-item-title>
                <v-list-item-subtitle v-text="message.time"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="8" height="auto">
        <v-card max-width="400" height="auto">
          <v-card-title>
              <v-avatar
                color="primary"
                size="60"
                class="mr-6 clickable"
                @click="$refs['identity-editor'].show()"
              >
                <v-img
                  src="https://avatars.dicebear.com/api/micah/desmond.svg"
                  alt="John"
                ></v-img>
              </v-avatar>
              <v-text>User Name</v-text>
          </v-card-title>
        </v-card>
      </v-col> -->
    <v-row class="no-gutters elevation-4" rounded>
      <v-col
        class="no-gutters fill-height"
      >
        <v-responsive
          class="overflow-y-auto no-gutters fill-height"
        >
          <v-list subheader :width="sidebarWidth" class="fill-height">
            <v-list-item-group v-model="activeChat">
              <template>
                <div
                  v-for="(item, index) in contacts"
                  :key="`parent${index}`"
                >
                  <v-list-item
                    :value="item.id"
                  >
                    <v-avatar
                      color="primary"
                      size="40"
                      class="mr-6 clickable"
                      @click="$refs['identity-editor'].show()"
                    >
                      <v-img
                        src="https://avatars.dicebear.com/api/micah/desmond.svg"
                        alt="John"
                      ></v-img>
                    </v-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title" />
                      <v-list-item-subtitle v-text="'hi'" />
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
        </v-responsive>

      </v-col>
      <v-col>
        <div class="mx-1"></div>
      </v-col>
      <v-col
        class="no-gutters fill-height flex-grow-1 flex-shrink-0"
      >
        <v-responsive
          v-if="activeChat"
          class="no-gutters overflow-y-hidden fill-height"
        >
          <v-card
            flat
            :width="windowWidth"
            class="d-flex flex-column fill-height"
          >
            <v-card-title>
              john doe
            </v-card-title>
            <v-card-text class="flex-grow-1 overflow-y-auto">
              <template>
                <div
                  v-for="(msg, i) in messages" 
                  :key="i"
                  :class="{ 'd-flex flex-row-reverse': msg.me }"
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
                          :color="msg.me ? 'primary' : ''"
                          dark
                          style="height:auto;white-space: normal;"
                          class="pa-4 mb-2"
                          v-on="on"
                        >
                          <div class="d-flex flex-column">
                            <div>{{ msg.content }}</div>
                            <sub
                              class="mt-2"
                              style="font-size: 0.4rem;"
                            >{{ msg.created_at }}</sub>
                          </div>
                        </v-chip>

                      </v-hover>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>delete</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </template>
            </v-card-text>
            <div class="d-flex align-center">
              <v-card-text class="flex-shrink-1">
                  <v-text-field
                  v-model="messageForm.content"
                  label="type_a_message"
                  type="text"
                  no-details
                  outlined
                  hide-details
                />
              </v-card-text>
              <v-btn
                class="ma-2"
                color="primary"
                @click="sendMessage(messageForm.content)"
              >
                Send
              </v-btn>
            </div>
          </v-card>
        </v-responsive>
      </v-col>
    </v-row>

  </Layout>
</template>

<style lang="scss" scoped></style>
