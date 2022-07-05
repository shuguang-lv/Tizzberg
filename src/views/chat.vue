<script>
import Layout from '@/layouts/main.vue'

export default {
  data() {
    return {
      flowWidth: '80vw',
      sidebarWidth: '20vw',
      windowWidth: '60vw',
      selectedItem: 1,
      messages: [
        { text: 'Hi Desmond. Long time no see. How do you do? ', time: '18:32'},
        { text: 'Hi Yunxuan. How are you doing?', time: '19:22'},
        { text: 'Hi Yunxuan. How are you doing?', time: '19:55'},
      ],
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
    <v-row :width="flowWidth" class="d-flex flex-column">
      <v-col cols="4">
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
      <v-col cols="8">
        <v-card max-width="400" max-height="500">
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
      </v-col>
    </v-row>
  </Layout>
</template>

<style lang="scss" scoped></style>
