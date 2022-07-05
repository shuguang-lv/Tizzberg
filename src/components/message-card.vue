<script>
import { authComputed } from '@/store/helpers'

export default {
  name: 'MessageCard',
  components: {
  },
  props: {
    messageActions: Array,
    message: Array,
  },
  data() {
    return {
        flowWidth: '50vw',
    }
  },
  beforeMount() {
    const lastMessage = this.$storage.get('last-message')
    this.message = lastMessage || this.message
    window.addEventListener('beforeunload', () => {
      if (this.message.content.trim()) {
        this.$storage.set('last-message', this.message)
      } else {
        this.$storage.remove('last-message')
      }
    })
  },
  mounted() {

  },
  computed: {
    ...authComputed,
  },
  methods: {

  },
}
</script>

<template>
    <div class="mb-6" :style="{ width: flowWidth }">
        <v-card
            rounded
            class="px-2 py-4 mb-6"
            elevation="1"
            :width="flowWidth"
          >
            <v-avatar color="primary" size="50" class="mr-4">
              <img
                src="https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1"
                alt="John"
            /></v-avatar>
            <v-card-text
              class="d-flex align-center text-body-1"
              v-text="message.attributes.title"
              @click="viewMessageDetail()"
            >
            </v-card-text>
            <v-chip class="ml-4 mb-4" color="primary" outlined> Tag </v-chip>
            <v-divider class="my-4"></v-divider>
            <!-- <div v-for="n in 2" :key="n" class="d-flex align-start mx-4">
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
                  <v-btn :disabled="!loggedIn" color="primary" text
                    >Reply</v-btn
                  >
                </div>
              </div>
            </div> -->
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
    </div>
</template>

<style lang="scss" scoped></style>