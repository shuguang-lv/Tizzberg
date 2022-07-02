<script>
import { authComputed } from '@/store/helpers'

export default {
  name: 'PostCard',
  components: {
  },
  props: {
    articleActions: Array,
    article: Object,
    flowWidth: String,
  },
  data() {
    return {
    }
  },
  beforeMount() {
    const lastArticle = this.$storage.get('last-topic')
    this.article = lastArticle || this.article
    window.addEventListener('beforeunload', () => {
      if (this.article.content.trim()) {
        this.$storage.set('last-topic', this.article)
      } else {
        this.$storage.remove('last-topic')
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
            <div class="d-flex justify-space-between align-center">
                <div class="d-flex align-center pa-4">
                <v-avatar color="primary" size="50" class="mr-4">
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"
                /></v-avatar>
                <div class="text-subtitle-1">
                    {{ article.authorName }}
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
                        v-for="item in articleActions"
                        :key="item.title"
                        link
                        class="px-8"
                        color="primary"
                        @click="item.action(article.getObjectId())"
                    >
                        <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                        <v-list-item-title
                            v-text="item.title"
                        ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    </v-list>
                </v-menu>
                </div>
            </div>
            <v-divider class="mb-2"></v-divider>
            <v-card-text
                class="d-flex align-center text-body-1"
                v-text="article.get('content')"
            >
            </v-card-text>
            <v-chip
                v-for="tag in article.get('tags')"
                :key="tag"
                class="ml-4 mb-4"
                color="primary"
                outlined
            >
                {{ tag }}
            </v-chip>
            <v-img
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                height="500px"
                class="mb-4"
            ></v-img>
            <div class="d-flex justify-space-between align-center px-4">
                <div>
                <v-btn
                    :disabled="!$user.current()"
                    fab
                    small
                    depressed
                    color="secondary"
                    class="mr-4"
                >
                    <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
                <span class="mr-4 secondary--text">120 Likes</span>
                <span class="secondary--text">2 Comments</span>
                </div>
                <div>
                <v-btn
                    :disabled="!$user.current()"
                    icon
                    color="secondary"
                    class="mr-2"
                >
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
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Doloribus unde harum, enim magnam recusandae beatae porro nemo
                    in itaque exercitationem incidunt minus alias maxime sed omnis
                    aliquam ratione. Consequatur, quo.
                </div>
                <div class="text-end">
                    <v-btn :disabled="!$user.current()" color="grey" text
                    >Unlike</v-btn
                    >
                    <v-btn :disabled="!$user.current()" color="primary" text
                    >Reply</v-btn
                    >
                </div>
                </div>
            </div>
            <v-text-field
                :disabled="!$user.current()"
                label="Leave your comments here"
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