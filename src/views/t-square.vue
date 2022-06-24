<script>
import Layout from '@/layouts/main.vue'

export default {
  components: {
    Layout,
  },
  data() {
    return {
      flowWidth: '50vw',
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
      postActions: [
        {
          title: 'Pin Post',
          icon: 'mdi-pin-outline',
          action: () =>
            this.$Dialog({
              title: 'Pin this post',
              content:
                'This will appear at the top of your blog and replace any previous pinned post. Are you sure?',
            }),
        },
        {
          title: 'Delete Post',
          icon: 'mdi-delete-outline',
          action: () =>
            this.$Dialog({
              title: 'Delete this post',
              content: 'Are you sure you want to delete this post?',
            }),
        },
        {
          title: 'Save Post',
          icon: 'mdi-content-save-outline',
          action: 'error',
        },
        {
          title: 'Hide Post',
          icon: 'mdi-eye-off-outline',
          action: 'error',
        },
        {
          title: 'Report Post',
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
    }
  },
}
</script>

<template>
  <Layout>
    <v-card rounded class="pa-2 mb-6" elevation="1" :width="flowWidth">
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
        ></v-text-field>
      </v-card-text>
    </v-card>
    <div class="mb-6" :style="{ width: flowWidth }">
      <v-tabs
        v-model="selectedTab"
        grow
        active-class="white--text primary"
        slider-color="secondary"
        height="70"
      >
        <v-tab
          v-for="tab in tabs"
          :key="tab.value"
          class="text-subtitle-1"
          :href="`#${tab.value}`"
        >
          {{ tab.title }}
        </v-tab>
      </v-tabs>
    </div>
    <v-tabs-items v-model="selectedTab">
      <v-tab-item v-for="tab in tabs" :key="tab.value" :value="tab.value">
        <v-card
          v-for="n in 5"
          :key="n"
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
              <div class="text-subtitle-1">Nik Jon</div>
            </div>
            <div>
              <v-chip class="mr-4" color="primary" outlined> Tag </v-chip>
              <v-icon color="secondary" class="mx-2">mdi-pin</v-icon>
              <v-menu bottom left rounded="lg">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn large icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    v-for="(item, i) in postActions"
                    :key="i"
                    link
                    class="px-8"
                    color="primary"
                    @click="item.action"
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
          <v-card-text class="d-flex align-center text-body-1">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            illum nemo sunt totam repudiandae deserunt hic inventore. Voluptatum
            minus nobis fugiat praesentium doloremque illo voluptatem optio,
            eveniet voluptas? Ea, expedita?
          </v-card-text>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            height="500px"
            class="mb-4"
          ></v-img>
          <div class="d-flex justify-space-between align-center px-4">
            <div>
              <v-btn fab small depressed color="secondary" class="mr-4">
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
              <span class="mr-4 secondary--text">120 Likes</span>
              <span class="secondary--text">2 Comments</span>
            </div>
            <div>
              <v-btn icon color="secondary" class="mr-2">
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
                <v-btn color="grey" text>Unlike</v-btn>
                <v-btn color="primary" text>Reply</v-btn>
              </div>
            </div>
          </div>
          <v-text-field
            label="Leave your comments here"
            append-icon="mdi-send"
            hide-details
            outlined
            clearable
            type="text"
            class="mx-4 mt-4"
          ></v-text-field>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </Layout>
</template>

<style lang="scss" scoped></style>
