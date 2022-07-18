<script>
import { deleteBlog } from "@/api/blog.js";
import { fetchCharacterMemo } from "@/api/user.js";

export default {
  name: "BlogCard",
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      characterName: "",
      deleteBlogApi: deleteBlog,
      blogActions: [
        {
          title: "Pin Blog",
          icon: "mdi-pin-outline",
          privilege: "self",
          action: () =>
            this.$dialog({
              title: "Pin this blog",
              content:
                "This will appear at the top of your blog and replace any previous pinned blog. Are you sure?",
            }),
        },
        {
          title: "Delete Blog",
          icon: "mdi-delete-outline",
          privilege: "self",
          action: this.deleteBlog,
        },
        {
          title: "Hide Blog",
          icon: "mdi-eye-off-outline",
          privilege: "other",
          action: "error",
        },
      ],
    };
  },
  async created() {
    const character = await fetchCharacterMemo(this.blog.characterId);
    this.characterName = character ? character.toJSON().name : "";
  },
  methods: {
    async deleteBlog(id) {
      this.$dialog({
        title: "Delete this blog",
        content: "Are you sure you want to delete this blog?",
        confirmButton: {
          action: async () => {
            this.$overlay.open();
            try {
              await this.deleteBlogApi(id);
              this.$emit("refresh");
              this.$overlay.close();
              this.$snackbar.warn("A blog was deleted");
            } catch (error) {
              console.log(error);
              this.$overlay.close();
              this.$snackbar.error(error.rawMessage);
            }
          },
        },
      });
    },
  },
};
</script>

<template>
  <v-card rounded class="px-2 py-4 my-8 mx-4" elevation="3" width="50vw">
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex align-center pa-4">
        <v-avatar color="primary" size="50" class="mr-4">
          <v-img
            :src="`https://avatars.dicebear.com/api/micah/${blog.characterId}.svg`"
            alt="John"
          ></v-img
        ></v-avatar>
        <div class="text-subtitle-1">
          {{ characterName }}
        </div>
        <div class="mx-2">·</div>
        <div class="text-caption grey--text">
          {{ blog.createdAt.split("T")[0] }}
        </div>
      </div>
      <div>
        <v-icon color="secondary" class="mx-2">mdi-pin</v-icon>
        <v-menu :disabled="!$root.currentUser" bottom right rounded="lg">
          <template v-slot:activator="{ on, attrs }">
            <v-btn large icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="item in blogActions.filter(
                (action) =>
                  action.privilege === 'both' ||
                  ($root.currentUser &&
                  $root.currentUser.objectId == blog.authorId
                    ? action.privilege === 'self'
                    : action.privilege === 'other')
              )"
              :key="item.title"
              link
              class="px-8"
              color="primary"
              @click="item.action(blog.objectId)"
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
    <v-card-title v-text="blog.title"> </v-card-title>
    <v-card-text class="d-flex align-center text-body-1" v-text="blog.content">
    </v-card-text>
    <v-btn
      v-for="tag in blog.tags"
      :key="tag"
      color="primary"
      class="mb-4"
      style="text-transform: unset !important"
      text
    >
      #{{ tag }}
    </v-btn>
  </v-card>
</template>

<style lang="scss" scoped></style>
